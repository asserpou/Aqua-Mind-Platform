<?php
session_start();
header('Content-Type: application/json; charset=UTF-8');

$conn = mysqli_connect('localhost', 'root', '', 'nilevo');
if (!$conn) { echo json_encode(['error' => 'DB failed']); exit; }
mysqli_set_charset($conn, 'utf8mb4');

$isLoggedIn = isset($_SESSION['user_id']);
$uid = $isLoggedIn ? (int)$_SESSION['user_id'] : 0;
$action = $_GET['action'] ?? $_POST['action'] ?? '';

// ══════════════════════════════════════
// GET posts
// ══════════════════════════════════════
if ($action === 'get_posts') {
    $page   = max(1, (int)($_GET['page'] ?? 1));
    $limit  = 10;
    $offset = ($page - 1) * $limit;
    $sort   = (isset($_GET['sort']) && $_GET['sort'] === 'top') ? 'likes DESC, p.created_at DESC' : 'p.created_at DESC';

    $sql = "
        SELECT p.id, p.title, p.body, p.image_path, p.created_at, p.edited_at,
               u.first_name, u.last_name, u.account_type, u.user_id AS post_owner_id,
               (SELECT COUNT(*) FROM post_likes pl WHERE pl.post_id = p.id) AS likes,
               (SELECT COUNT(*) FROM replies r WHERE r.post_id = p.id) AS reply_count,
               " . ($uid ? "(SELECT COUNT(*) FROM post_likes pl2 WHERE pl2.post_id = p.id AND pl2.user_id = $uid)" : "0") . " AS i_liked
        FROM posts p
        JOIN user u ON u.user_id = p.user_id
        ORDER BY $sort
        LIMIT $limit OFFSET $offset
    ";
    $res   = mysqli_query($conn, $sql);
    $posts = [];
    while ($row = mysqli_fetch_assoc($res)) {
        $row['likes']       = (int)$row['likes'];
        $row['reply_count'] = (int)$row['reply_count'];
        $row['i_liked']     = (bool)$row['i_liked'];
        $row['author']      = trim($row['first_name'] . ' ' . $row['last_name']);
        $row['is_premium']  = strtolower($row['account_type'] ?? '') === 'premium';
        $row['is_mine']     = $uid > 0 && (int)$row['post_owner_id'] === $uid;
        unset($row['first_name'], $row['last_name'], $row['account_type'], $row['post_owner_id']);
        $posts[] = $row;
    }
    $total = (int)mysqli_fetch_assoc(mysqli_query($conn, "SELECT COUNT(*) as t FROM posts"))['t'];
    echo json_encode(['posts' => $posts, 'total' => $total, 'pages' => ceil($total / $limit)]);
    exit;
}

// ══════════════════════════════════════
// GET replies
// ══════════════════════════════════════
if ($action === 'get_replies') {
    $post_id = (int)($_GET['post_id'] ?? 0);
    if (!$post_id) { echo json_encode(['replies' => []]); exit; }

    $res = mysqli_query($conn,
        "SELECT r.id, r.parent_id, r.body, r.created_at,
                u.first_name, u.last_name, u.account_type
         FROM replies r
         JOIN user u ON u.user_id = r.user_id
         WHERE r.post_id = $post_id
         ORDER BY r.created_at ASC"
    );
    $replies = [];
    while ($row = mysqli_fetch_assoc($res)) {
        $row['author']     = trim($row['first_name'] . ' ' . $row['last_name']);
        $row['parent_id']  = $row['parent_id'] ? (int)$row['parent_id'] : null;
        $row['is_premium'] = strtolower($row['account_type'] ?? '') === 'premium';
        unset($row['first_name'], $row['last_name'], $row['account_type']);
        $replies[] = $row;
    }
    echo json_encode(['replies' => $replies]);
    exit;
}

// ── محتاج login ──
if (!$isLoggedIn) { echo json_encode(['error' => 'not_logged_in']); exit; }

// ══════════════════════════════════════
// POST: إنشاء بوست جديد
// ══════════════════════════════════════
if ($action === 'create_post') {
    $title = trim($_POST['title'] ?? '');
    $body  = trim($_POST['body']  ?? '');
    if (!$title || !$body) { echo json_encode(['error' => 'empty_fields']); exit; }

    // ── Handle image upload ──
    $image_path = null;
    $image_b64  = $_POST['image'] ?? '';
    if ($image_b64) {
        // Strip data URI prefix
        $image_b64 = preg_replace('/^data:image\/\w+;base64,/', '', $image_b64);
        $image_data = base64_decode($image_b64);
        if ($image_data && strlen($image_data) < 5 * 1024 * 1024) {
            $upload_dir = 'uploads/community/';
            if (!is_dir($upload_dir)) mkdir($upload_dir, 0755, true);
            $filename   = 'post_' . $uid . '_' . time() . '_' . bin2hex(random_bytes(4)) . '.jpg';
            $full_path  = $upload_dir . $filename;
            if (file_put_contents($full_path, $image_data) !== false) {
                $image_path = $full_path;
            }
        }
    }

    $stmt = mysqli_prepare($conn, "INSERT INTO posts (user_id, title, body, image_path) VALUES (?, ?, ?, ?)");
    mysqli_stmt_bind_param($stmt, 'isss', $uid, $title, $body, $image_path);
    mysqli_stmt_execute($stmt);
    $new_id = mysqli_insert_id($conn);

    $res = mysqli_query($conn,
        "SELECT p.id, p.title, p.body, p.image_path, p.created_at, u.first_name, u.last_name, u.account_type
         FROM posts p JOIN user u ON u.user_id = p.user_id WHERE p.id = $new_id"
    );
    $row = mysqli_fetch_assoc($res);
    $row['likes']      = 0;
    $row['reply_count']= 0;
    $row['i_liked']    = false;
    $row['author']     = trim($row['first_name'] . ' ' . $row['last_name']);
    $row['is_premium'] = strtolower($row['account_type'] ?? '') === 'premium';
    unset($row['first_name'], $row['last_name'], $row['account_type']);
    echo json_encode(['ok' => true, 'post' => $row]);
    exit;
}

// ══════════════════════════════════════
// POST: إنشاء رد
// ══════════════════════════════════════
if ($action === 'create_reply') {
    $post_id   = (int)($_POST['post_id']   ?? 0);
    $parent_id = (int)($_POST['parent_id'] ?? 0);
    $body      = trim($_POST['body'] ?? '');
    if (!$post_id || !$body) { echo json_encode(['error' => 'empty_fields']); exit; }

    $pid_val = $parent_id ?: null;
    $stmt = mysqli_prepare($conn, "INSERT INTO replies (post_id, user_id, parent_id, body) VALUES (?, ?, ?, ?)");
    mysqli_stmt_bind_param($stmt, 'iiis', $post_id, $uid, $pid_val, $body);
    mysqli_stmt_execute($stmt);
    $new_id = mysqli_insert_id($conn);

    $res = mysqli_query($conn,
        "SELECT r.id, r.parent_id, r.body, r.created_at, u.first_name, u.last_name, u.account_type
         FROM replies r JOIN user u ON u.user_id = r.user_id WHERE r.id = $new_id"
    );
    $row = mysqli_fetch_assoc($res);
    $row['author']     = trim($row['first_name'] . ' ' . $row['last_name']);
    $row['parent_id']  = $row['parent_id'] ? (int)$row['parent_id'] : null;
    $row['is_premium'] = strtolower($row['account_type'] ?? '') === 'premium';
    unset($row['first_name'], $row['last_name'], $row['account_type']);
    // إشعار لصاحب البوست
    $owner = mysqli_fetch_assoc(mysqli_query($conn, "SELECT user_id FROM posts WHERE id=$post_id LIMIT 1"));
    if ($owner && (int)$owner['user_id'] !== $uid) {
        $owner_id = (int)$owner['user_id'];
        mysqli_query($conn, "INSERT INTO notifications (user_id, actor_id, type, post_id, reply_id) VALUES ($owner_id, $uid, 'reply', $post_id, $new_id)");
    }
    echo json_encode(['ok' => true, 'reply' => $row]);
    exit;
}

// ══════════════════════════════════════
// POST: toggle like
// ══════════════════════════════════════
if ($action === 'toggle_like') {
    $post_id = (int)($_POST['post_id'] ?? 0);
    if (!$post_id) { echo json_encode(['error' => 'no_post']); exit; }

    $chk = mysqli_query($conn, "SELECT id FROM post_likes WHERE post_id=$post_id AND user_id=$uid LIMIT 1");
    if (mysqli_num_rows($chk) > 0) {
        mysqli_query($conn, "DELETE FROM post_likes WHERE post_id=$post_id AND user_id=$uid");
        $liked = false;
    } else {
        mysqli_query($conn, "INSERT INTO post_likes (post_id, user_id) VALUES ($post_id, $uid)");
        $liked = true;
        // إشعار للصاحب (مش نفسه)
        $owner = mysqli_fetch_assoc(mysqli_query($conn, "SELECT user_id FROM posts WHERE id=$post_id LIMIT 1"));
        if ($owner && (int)$owner['user_id'] !== $uid) {
            $owner_id = (int)$owner['user_id'];
            // امسح إشعار لايك قديم من نفس الشخص على نفس البوست لو موجود
            mysqli_query($conn, "DELETE FROM notifications WHERE user_id=$owner_id AND actor_id=$uid AND type='like' AND post_id=$post_id");
            mysqli_query($conn, "INSERT INTO notifications (user_id, actor_id, type, post_id) VALUES ($owner_id, $uid, 'like', $post_id)");
        }
    }
    $cnt = (int)mysqli_fetch_assoc(mysqli_query($conn, "SELECT COUNT(*) as c FROM post_likes WHERE post_id=$post_id"))['c'];
    echo json_encode(['ok' => true, 'liked' => $liked, 'likes' => $cnt]);
    exit;
}

// ══════════════════════════════════════
// POST: تعديل بوست
// ══════════════════════════════════════
// NOTE: تأكد إن جدول posts عنده عمود edited_at:
// ALTER TABLE posts ADD COLUMN edited_at DATETIME NULL DEFAULT NULL;
if ($action === 'edit_post') {
    $post_id = (int)($_POST['post_id'] ?? 0);
    $title   = trim($_POST['title'] ?? '');
    $body    = trim($_POST['body']  ?? '');
    if (!$post_id || !$title || !$body) { echo json_encode(['error' => 'empty_fields']); exit; }

    // تأكد إن البوست ده بتاع اليوزر الحالي
    $own = mysqli_fetch_assoc(mysqli_query($conn, "SELECT user_id FROM posts WHERE id=$post_id LIMIT 1"));
    if (!$own || (int)$own['user_id'] !== $uid) { echo json_encode(['error' => 'not_owner']); exit; }

    $stmt = mysqli_prepare($conn, "UPDATE posts SET title=?, body=?, edited_at=NOW() WHERE id=?");
    mysqli_stmt_bind_param($stmt, 'ssi', $title, $body, $post_id);
    mysqli_stmt_execute($stmt);
    echo json_encode(['ok' => true, 'title' => $title, 'body' => $body]);
    exit;
}

// ══════════════════════════════════════
// POST: حذف بوست
// ══════════════════════════════════════
if ($action === 'delete_post') {
    $post_id = (int)($_POST['post_id'] ?? 0);
    if (!$post_id) { echo json_encode(['error' => 'no_post']); exit; }

    // تأكد إن البوست ده بتاع اليوزر الحالي
    $own = mysqli_fetch_assoc(mysqli_query($conn, "SELECT user_id, image_path FROM posts WHERE id=$post_id LIMIT 1"));
    if (!$own || (int)$own['user_id'] !== $uid) { echo json_encode(['error' => 'not_owner']); exit; }

    // امسح الصورة من السيرفر لو موجودة
    if ($own['image_path'] && file_exists($own['image_path'])) {
        @unlink($own['image_path']);
    }

    // امسح الـ likes والـ replies والـ notifications والبوست نفسه
    mysqli_query($conn, "DELETE FROM post_likes WHERE post_id=$post_id");
    mysqli_query($conn, "DELETE FROM notifications WHERE post_id=$post_id");
    mysqli_query($conn, "DELETE FROM replies WHERE post_id=$post_id");
    mysqli_query($conn, "DELETE FROM posts WHERE id=$post_id AND user_id=$uid");

    echo json_encode(['ok' => true]);
    exit;
}

echo json_encode(['error' => 'unknown_action']);
mysqli_close($conn);

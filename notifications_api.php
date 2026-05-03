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
// GET: عدد الإشعارات الغير مقروءة
// ══════════════════════════════════════
if ($action === 'get_count') {
    if (!$uid) { echo json_encode(['count' => 0]); exit; }
    $res = mysqli_query($conn, "SELECT COUNT(*) as c FROM notifications WHERE user_id=$uid AND is_read=0");
    $count = (int)mysqli_fetch_assoc($res)['c'];
    echo json_encode(['count' => $count]);
    exit;
}

// ══════════════════════════════════════
// GET: قائمة الإشعارات
// ══════════════════════════════════════
if ($action === 'get_list') {
    if (!$uid) { echo json_encode(['notifications' => []]); exit; }
    $res = mysqli_query($conn,
        "SELECT n.id, n.type, n.is_read, n.created_at,
                n.post_id, n.reply_id,
                u.first_name, u.last_name, u.account_type,
                p.title as post_title
         FROM notifications n
         JOIN user u ON u.user_id = n.actor_id
         JOIN posts p ON p.id = n.post_id
         WHERE n.user_id = $uid
         ORDER BY n.created_at DESC
         LIMIT 20"
    );
    $notifs = [];
    while ($row = mysqli_fetch_assoc($res)) {
        $row['actor']      = trim($row['first_name'] . ' ' . $row['last_name']);
        $row['is_premium'] = strtolower($row['account_type'] ?? '') === 'premium';
        $row['is_read']    = (bool)$row['is_read'];
        unset($row['first_name'], $row['last_name'], $row['account_type']);
        $notifs[] = $row;
    }
    echo json_encode(['notifications' => $notifs]);
    exit;
}

// ══════════════════════════════════════
// POST: mark all as read
// ══════════════════════════════════════
if ($action === 'mark_read') {
    if (!$uid) { echo json_encode(['ok' => false]); exit; }
    mysqli_query($conn, "UPDATE notifications SET is_read=1 WHERE user_id=$uid");
    echo json_encode(['ok' => true]);
    exit;
}

echo json_encode(['error' => 'unknown_action']);
mysqli_close($conn);

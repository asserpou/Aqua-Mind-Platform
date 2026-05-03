<?php
session_start();
header('Content-Type: application/json; charset=UTF-8');

$conn = mysqli_connect('localhost', 'root', '', 'nilevo');
if (!$conn) { echo json_encode(['error' => 'DB failed']); exit; }
mysqli_set_charset($conn, 'utf8mb4');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'not_logged_in']); exit;
}
$uid = (int) $_SESSION['user_id'];

// ══════════════════════════════════════
// GET: تحقق لو سبق واستخدم قسيمة قبل كده
// ══════════════════════════════════════
if (isset($_GET['api']) && $_GET['api'] === 'history') {
    $res = mysqli_query($conn,
        "SELECT id FROM vouchers WHERE user_id = $uid AND used = 1 LIMIT 1"
    );
    $hasUsed = ($res && mysqli_num_rows($res) > 0);
    echo json_encode(['hasUsed' => $hasUsed]);
    exit;
}

// ══════════════════════════════════════
// GET: تحقق لو عنده قسيمة نشطة
// ══════════════════════════════════════
if (isset($_GET['api']) && $_GET['api'] === 'check') {
    $res = mysqli_query($conn,
        "SELECT * FROM vouchers
         WHERE user_id = $uid AND used = 0 AND expires_at > NOW()
         ORDER BY created_at DESC LIMIT 1"
    );
    if ($res && $row = mysqli_fetch_assoc($res)) {
        echo json_encode(['hasVoucher' => true, 'voucher' => [
            'code'       => $row['code'],
            'discount'   => (int)$row['discount'],
            'expires_at' => $row['expires_at']
        ]]);
    } else {
        echo json_encode(['hasVoucher' => false]);
    }
    exit;
}

// ══════════════════════════════════════
// POST api=save: احفظ قسيمة جديدة
// ══════════════════════════════════════
if (isset($_POST['api']) && $_POST['api'] === 'save') {
    $discount = (int) ($_POST['discount'] ?? 0);
    if (!in_array($discount, [5, 10, 15, 20])) {
        echo json_encode(['error' => 'invalid_discount']); exit;
    }

    // تأكد مفيش قسيمة نشطة خلاص
    $chk = mysqli_query($conn,
        "SELECT id FROM vouchers WHERE user_id=$uid AND used=0 AND expires_at > NOW() LIMIT 1"
    );
    if ($chk && mysqli_num_rows($chk) > 0) {
        $row = mysqli_fetch_assoc($chk);
        // رجّع القسيمة الموجودة
        $existing = mysqli_query($conn,
            "SELECT * FROM vouchers WHERE user_id=$uid AND used=0 AND expires_at > NOW() LIMIT 1"
        );
        $v = mysqli_fetch_assoc($existing);
        echo json_encode(['ok' => true, 'voucher' => [
            'code'       => $v['code'],
            'discount'   => (int)$v['discount'],
            'expires_at' => $v['expires_at']
        ]]);
        exit;
    }

    // توليد كود فريد
    $code = 'AQ-' . strtoupper(substr(md5(uniqid($uid, true)), 0, 8));

    // تأكد الكود مش موجود
    $codeCheck = mysqli_query($conn, "SELECT id FROM vouchers WHERE code='$code' LIMIT 1");
    if ($codeCheck && mysqli_num_rows($codeCheck) > 0) {
        $code = 'AQ-' . strtoupper(substr(md5(uniqid($uid . time(), true)), 0, 8));
    }

    $expires = date('Y-m-d H:i:s', strtotime('+3 days'));

    $stmt = mysqli_prepare($conn,
        "INSERT INTO vouchers (user_id, code, discount, expires_at) VALUES (?, ?, ?, ?)"
    );
    mysqli_stmt_bind_param($stmt, 'isis', $uid, $code, $discount, $expires);
    mysqli_stmt_execute($stmt);

    echo json_encode(['ok' => true, 'voucher' => [
        'code'       => $code,
        'discount'   => $discount,
        'expires_at' => $expires
    ]]);
    exit;
}

// ══════════════════════════════════════
// POST api=expire: امسح القسايم المنتهية
// ══════════════════════════════════════
if (isset($_POST['api']) && $_POST['api'] === 'expire') {
    mysqli_query($conn,
        "DELETE FROM vouchers WHERE user_id=$uid AND expires_at <= NOW()"
    );
    echo json_encode(['ok' => true]);
    exit;
}

// ══════════════════════════════════════
// POST api=use: استخدام القسيمة في الماركتبليس
// ══════════════════════════════════════
if (isset($_POST['api']) && $_POST['api'] === 'use') {
    $code = mysqli_real_escape_string($conn, $_POST['code'] ?? '');
    $res  = mysqli_query($conn,
        "SELECT * FROM vouchers
         WHERE user_id=$uid AND code='$code' AND used=0 AND expires_at > NOW() LIMIT 1"
    );
    if ($res && $row = mysqli_fetch_assoc($res)) {
        mysqli_query($conn,
            "UPDATE vouchers SET used=1 WHERE id=" . (int)$row['id']
        );
        echo json_encode(['ok' => true, 'discount' => (int)$row['discount']]);
    } else {
        echo json_encode(['error' => 'invalid_or_expired']);
    }
    exit;
}

// ══════════════════════════════════════
// POST api=challenge_win: منح قسيمة 5% من التحدي اليومي
// ══════════════════════════════════════
if (isset($_POST['api']) && $_POST['api'] === 'challenge_win') {
    $code    = 'AQUA5OFF';
    $discount = 5;

    // تأكد مفيش قسيمة نشطة لنفس الكود
    $chk = mysqli_query($conn,
        "SELECT id FROM vouchers WHERE user_id=$uid AND code='$code' AND used=0 AND expires_at > NOW() LIMIT 1"
    );
    if ($chk && mysqli_num_rows($chk) > 0) {
        $v = mysqli_fetch_assoc($chk);
        echo json_encode(['ok' => true, 'already_exists' => true, 'code' => $code, 'discount' => $discount]);
        exit;
    }

    // امسح أي نسخة قديمة منتهية لنفس الكود
    mysqli_query($conn, "DELETE FROM vouchers WHERE user_id=$uid AND code='$code'");

    $expires = date('Y-m-d H:i:s', strtotime('+7 days'));
    $stmt = mysqli_prepare($conn,
        "INSERT INTO vouchers (user_id, code, discount, expires_at) VALUES (?, ?, ?, ?)"
    );
    mysqli_stmt_bind_param($stmt, 'isis', $uid, $code, $discount, $expires);

    if (mysqli_stmt_execute($stmt)) {
        echo json_encode(['ok' => true, 'code' => $code, 'discount' => $discount, 'expires_at' => $expires]);
    } else {
        echo json_encode(['error' => 'db_error']);
    }
    exit;
}

echo json_encode(['error' => 'unknown_action']);
mysqli_close($conn);

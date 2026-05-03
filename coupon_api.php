<?php
/**
 * coupon_api.php
 * Handles coupon code redemption for the AquaGuard game.
 * 
 * Valid coupon codes (each gives 5% discount):
 * DR1P42, H2OFIX, P1P3RUN, LE4KX, FLOW77, T4P911
 * 
 * Rules:
 * - User must be logged in
 * - Each coupon code can only be used once per user
 * - Generates a unique voucher code for the marketplace
 */
session_start();
header('Content-Type: application/json; charset=UTF-8');

// Valid coupon codes
$VALID_COUPONS = ['DR1P42', 'H2OFIX', 'P1P3RUN', 'LE4KX', 'FLOW77', 'T4P911'];

$conn = mysqli_connect('localhost', 'root', '', 'nilevo');
if (!$conn) { echo json_encode(['error' => 'DB failed']); exit; }
mysqli_set_charset($conn, 'utf8mb4');

// ══════════════════════════════════════
// POST api=redeem: Redeem a coupon code
// ══════════════════════════════════════
if (isset($_POST['api']) && $_POST['api'] === 'redeem') {
    // Must be logged in
    if (!isset($_SESSION['user_id'])) {
        echo json_encode(['error' => 'not_logged_in', 'message' => 'You must be logged in to redeem a coupon']);
        exit;
    }

    $uid = (int) $_SESSION['user_id'];
    $coupon = strtoupper(trim($_POST['coupon_code'] ?? ''));

    // Validate coupon code
    if (!in_array($coupon, $VALID_COUPONS)) {
        echo json_encode(['error' => 'invalid_coupon', 'message' => 'Invalid coupon code']);
        exit;
    }

    // Check if user already redeemed this coupon
    $check = mysqli_prepare($conn, "SELECT id FROM coupon_redemptions WHERE user_id = ? AND coupon_code = ?");
    mysqli_stmt_bind_param($check, 'is', $uid, $coupon);
    mysqli_stmt_execute($check);
    $result = mysqli_stmt_get_result($check);

    if (mysqli_num_rows($result) > 0) {
        echo json_encode(['error' => 'already_used', 'message' => 'You have already used this coupon code']);
        exit;
    }

    // Generate unique voucher code
    $voucher_code = 'AQ-' . strtoupper(substr(md5(uniqid($uid . $coupon, true)), 0, 8));

    // Double-check voucher code uniqueness
    $vc_check = mysqli_query($conn, "SELECT id FROM vouchers WHERE code='" . mysqli_real_escape_string($conn, $voucher_code) . "' LIMIT 1");
    if ($vc_check && mysqli_num_rows($vc_check) > 0) {
        $voucher_code = 'AQ-' . strtoupper(substr(md5(uniqid($uid . time() . $coupon, true)), 0, 8));
    }

    $discount = 5;
    $expires = date('Y-m-d H:i:s', strtotime('+7 days'));

    // Save the voucher
    $stmt = mysqli_prepare($conn, "INSERT INTO vouchers (user_id, code, discount, expires_at) VALUES (?, ?, ?, ?)");
    mysqli_stmt_bind_param($stmt, 'isis', $uid, $voucher_code, $discount, $expires);

    if (!mysqli_stmt_execute($stmt)) {
        echo json_encode(['error' => 'db_error', 'message' => 'Failed to generate voucher']);
        exit;
    }

    // Record the coupon redemption
    $stmt2 = mysqli_prepare($conn, "INSERT INTO coupon_redemptions (user_id, coupon_code, voucher_code, discount) VALUES (?, ?, ?, ?)");
    mysqli_stmt_bind_param($stmt2, 'issi', $uid, $coupon, $voucher_code, $discount);
    mysqli_stmt_execute($stmt2);

    echo json_encode([
        'ok' => true,
        'voucher' => [
            'code'       => $voucher_code,
            'discount'   => $discount,
            'expires_at' => $expires
        ],
        'message' => 'Coupon redeemed successfully! 5% discount voucher generated.'
    ]);
    exit;
}

// ══════════════════════════════════════
// GET api=check_coupon: Check if a coupon was already used by this user
// ══════════════════════════════════════
if (isset($_GET['api']) && $_GET['api'] === 'check_coupon') {
    if (!isset($_SESSION['user_id'])) {
        echo json_encode(['error' => 'not_logged_in']);
        exit;
    }

    $uid = (int) $_SESSION['user_id'];
    $coupon = strtoupper(trim($_GET['coupon_code'] ?? ''));

    $check = mysqli_prepare($conn, "SELECT id FROM coupon_redemptions WHERE user_id = ? AND coupon_code = ?");
    mysqli_stmt_bind_param($check, 'is', $uid, $coupon);
    mysqli_stmt_execute($check);
    $result = mysqli_stmt_get_result($check);

    echo json_encode(['used' => (mysqli_num_rows($result) > 0)]);
    exit;
}

// ══════════════════════════════════════
// GET api=my_redemptions: Get all coupons used by this user
// ══════════════════════════════════════
if (isset($_GET['api']) && $_GET['api'] === 'my_redemptions') {
    if (!isset($_SESSION['user_id'])) {
        echo json_encode(['error' => 'not_logged_in']);
        exit;
    }

    $uid = (int) $_SESSION['user_id'];
    $res = mysqli_query($conn, "SELECT coupon_code FROM coupon_redemptions WHERE user_id = $uid");
    $used = [];
    while ($row = mysqli_fetch_assoc($res)) {
        $used[] = $row['coupon_code'];
    }
    echo json_encode(['used_coupons' => $used]);
    exit;
}

echo json_encode(['error' => 'unknown_action']);
mysqli_close($conn);

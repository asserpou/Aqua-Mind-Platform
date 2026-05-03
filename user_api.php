<?php
/**
 * user_api.php
 * REST-style API for User Accounts management (used by admin-dashboard.js)
 * Supports: list, update
 * Password is NEVER returned or modified through this API.
 */

session_start();
header('Content-Type: application/json');

// ─── DB Config ────────────────────────────────────────────────────────────────
$host = 'localhost';
$user = 'root';
$pass = '';
$db   = 'nilevo';

$conn = mysqli_connect($host, $user, $pass, $db);
if (!$conn) {
    echo json_encode(['success' => false, 'message' => 'DB connection failed: ' . mysqli_connect_error()]);
    exit;
}
mysqli_set_charset($conn, 'utf8mb4');

$action = $_GET['action'] ?? $_POST['action'] ?? '';

switch ($action) {

    // ── LIST all users (password is excluded) ─────────────────────────────────
    case 'list':
        $result = mysqli_query($conn,
            "SELECT user_id, first_name, last_name, email, phone, account_type, created_at
             FROM user
             ORDER BY user_id ASC"
        );
        if (!$result) {
            echo json_encode(['success' => false, 'message' => mysqli_error($conn)]);
            exit;
        }
        $users = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $users[] = $row; // password column is NOT selected
        }
        echo json_encode(['success' => true, 'users' => $users]);
        break;

    // ── UPDATE user info (password NOT touched) ───────────────────────────────
    case 'update':
        $user_id      = intval($_POST['user_id']      ?? 0);
        $first_name   = trim(mysqli_real_escape_string($conn, $_POST['first_name']   ?? ''));
        $last_name    = trim(mysqli_real_escape_string($conn, $_POST['last_name']    ?? ''));
        $email        = trim(mysqli_real_escape_string($conn, $_POST['email']        ?? ''));
        $phone        = trim(mysqli_real_escape_string($conn, $_POST['phone']        ?? ''));
        $account_type = trim(mysqli_real_escape_string($conn, $_POST['account_type'] ?? 'Free'));

        // ── Validation ────────────────────────────────────────────────────────
        if (!$user_id) {
            echo json_encode(['success' => false, 'message' => 'Invalid user ID.']);
            exit;
        }

        if (!$first_name || !$last_name) {
            echo json_encode(['success' => false, 'message' => 'First and last name are required.']);
            exit;
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo json_encode(['success' => false, 'message' => 'Invalid email format.']);
            exit;
        }

        // Allowed subscription plans
        $allowed_plans = ['standard', 'premium'];
        // Case-insensitive match
        $matched_plan = null;
        foreach ($allowed_plans as $p) {
            if (strtolower($p) === strtolower($account_type)) {
                $matched_plan = $p;
                break;
            }
        }
        if (!$matched_plan) {
            echo json_encode(['success' => false, 'message' => 'Invalid account type. Must be standard or premium.']);
            exit;
        }

        // Check email uniqueness (exclude current user)
        $check = mysqli_query($conn,
            "SELECT user_id FROM user WHERE email='$email' AND user_id != $user_id"
        );
        if (mysqli_num_rows($check) > 0) {
            echo json_encode(['success' => false, 'message' => 'This email is already used by another user.']);
            exit;
        }

        // ── Execute update (password column is intentionally excluded) ────────
        $sql = "UPDATE user
                SET first_name   = '$first_name',
                    last_name    = '$last_name',
                    email        = '$email',
                    phone        = '$phone',
                    account_type = '$matched_plan'
                WHERE user_id = $user_id";

        if (mysqli_query($conn, $sql)) {
            if (mysqli_affected_rows($conn) === 0) {
                // Could mean nothing changed OR user not found
                echo json_encode(['success' => true, 'message' => 'No changes detected.']);
            } else {
                echo json_encode(['success' => true]);
            }
        } else {
            echo json_encode(['success' => false, 'message' => mysqli_error($conn)]);
        }
        break;

    // ── UNKNOWN ───────────────────────────────────────────────────────────────
    default:
        echo json_encode(['success' => false, 'message' => 'Unknown action.']);
        break;
}

mysqli_close($conn);
?>

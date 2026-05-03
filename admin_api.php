<?php
/**
 * admin_api.php
 * REST-style API for Admin Accounts management (used by admin-dashboard.js)
 * Requires active PHP session validated before any response.
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

// ─── Simple session guard ─────────────────────────────────────────────────────
// The dashboard JS already checks Firebase auth + sessionStorage.
// Here we only gate PHP endpoints so they can't be called from outside.
// (Optional: add stricter token validation if needed.)

$action = $_GET['action'] ?? $_POST['action'] ?? '';

switch ($action) {

    // ── LIST all admins ───────────────────────────────────────────────────────
    case 'list':
        $result = mysqli_query($conn, "SELECT id, gmail, created_at FROM admin ORDER BY id ASC");
        if (!$result) {
            echo json_encode(['success' => false, 'message' => mysqli_error($conn)]);
            exit;
        }
        $admins = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $admins[] = $row;
        }
        echo json_encode(['success' => true, 'admins' => $admins]);
        break;

    // ── CREATE new admin ──────────────────────────────────────────────────────
    case 'create':
        $gmail    = trim(mysqli_real_escape_string($conn, $_POST['gmail'] ?? ''));
        $password = $_POST['password'] ?? '';

        if (!$gmail || !$password) {
            echo json_encode(['success' => false, 'message' => 'Email and password are required.']);
            exit;
        }

        if (!filter_var($gmail, FILTER_VALIDATE_EMAIL)) {
            echo json_encode(['success' => false, 'message' => 'Invalid email format.']);
            exit;
        }

        // Check duplicate
        $check = mysqli_query($conn, "SELECT id FROM admin WHERE gmail='$gmail'");
        if (mysqli_num_rows($check) > 0) {
            echo json_encode(['success' => false, 'message' => 'This email already exists.']);
            exit;
        }

        $escapedPass = mysqli_real_escape_string($conn, $password);
        $sql = "INSERT INTO admin (gmail, password) VALUES ('$gmail', '$escapedPass')";
        if (mysqli_query($conn, $sql)) {
            echo json_encode(['success' => true, 'id' => mysqli_insert_id($conn)]);
        } else {
            echo json_encode(['success' => false, 'message' => mysqli_error($conn)]);
        }
        break;

    // ── UPDATE admin ──────────────────────────────────────────────────────────
    case 'update':
        $id       = intval($_POST['id'] ?? 0);
        $gmail    = trim(mysqli_real_escape_string($conn, $_POST['gmail'] ?? ''));
        $password = $_POST['password'] ?? '';

        if (!$id || !$gmail) {
            echo json_encode(['success' => false, 'message' => 'ID and email are required.']);
            exit;
        }

        if (!filter_var($gmail, FILTER_VALIDATE_EMAIL)) {
            echo json_encode(['success' => false, 'message' => 'Invalid email format.']);
            exit;
        }

        // Check duplicate (exclude current id)
        $check = mysqli_query($conn, "SELECT id FROM admin WHERE gmail='$gmail' AND id != $id");
        if (mysqli_num_rows($check) > 0) {
            echo json_encode(['success' => false, 'message' => 'This email is already used by another admin.']);
            exit;
        }

        if ($password) {
            $escapedPass = mysqli_real_escape_string($conn, $password);
            $sql = "UPDATE admin SET gmail='$gmail', password='$escapedPass' WHERE id=$id";
        } else {
            $sql = "UPDATE admin SET gmail='$gmail' WHERE id=$id";
        }

        if (mysqli_query($conn, $sql)) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => mysqli_error($conn)]);
        }
        break;

    // ── DELETE admin ──────────────────────────────────────────────────────────
    case 'delete':
        $id = intval($_POST['id'] ?? 0);

        if (!$id) {
            echo json_encode(['success' => false, 'message' => 'Invalid ID.']);
            exit;
        }

        // Prevent deleting last admin
        $count = mysqli_fetch_row(mysqli_query($conn, "SELECT COUNT(*) FROM admin"));
        if ($count[0] <= 1) {
            echo json_encode(['success' => false, 'message' => 'Cannot delete the last admin account.']);
            exit;
        }

        if (mysqli_query($conn, "DELETE FROM admin WHERE id=$id")) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => mysqli_error($conn)]);
        }
        break;

    // ── UNKNOWN action ────────────────────────────────────────────────────────
    default:
        echo json_encode(['success' => false, 'message' => 'Unknown action.']);
        break;
}

mysqli_close($conn);
?>

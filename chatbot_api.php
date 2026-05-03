<?php
// =============================================================
//  chatbot_api.php — AquaMind Chatbot DB Limit & User Info API
//  Actions:
//    GET  ?action=get_count  → returns today's message count + user info
//    POST ?action=increment  → increments today's count by 1
// =============================================================

session_start();
header('Content-Type: application/json');
header('Cache-Control: no-store');

// ── DB connection ─────────────────────────────────────────────
// Adjust host / db / user / pass to match your config
$host   = 'localhost';
$db     = 'nilevo';
$user   = 'root';
$pass   = '';
$charset = 'utf8mb4';

try {
    $pdo = new PDO(
        "mysql:host={$host};dbname={$db};charset={$charset}",
        $user,
        $pass,
        [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'db_connection_failed']);
    exit;
}

// ── Auth guard ────────────────────────────────────────────────
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'not_logged_in']);
    exit;
}

$userId = (int) $_SESSION['user_id'];
$today  = date('Y-m-d');
$action = $_GET['action'] ?? '';

// ── Helper: get or create today's usage row ───────────────────
function getTodayCount(PDO $pdo, int $userId, string $today): int {
    $stmt = $pdo->prepare(
        "SELECT message_count FROM chatbot_usage WHERE user_id = ? AND usage_date = ?"
    );
    $stmt->execute([$userId, $today]);
    $row = $stmt->fetch();
    return $row ? (int) $row['message_count'] : 0;
}

// ── GET count + user name ─────────────────────────────────────
if ($action === 'get_count') {

    $count = getTodayCount($pdo, $userId, $today);

    // Fetch first name from user table
    $stmt = $pdo->prepare(
        "SELECT first_name, user_id, account_type FROM user WHERE user_id = ?"
    );
    $stmt->execute([$userId]);
    $userRow = $stmt->fetch();

    echo json_encode([
        'count'        => $count,
        'first_name'   => $userRow['first_name']   ?? null,
        'user_id'      => $userRow['user_id']       ?? null,
        'account_type' => $userRow['account_type']  ?? 'Free',
    ]);
    exit;
}

// ── POST increment ────────────────────────────────────────────
if ($action === 'increment' && $_SERVER['REQUEST_METHOD'] === 'POST') {

    // Upsert: insert row if not exists, else increment
    $stmt = $pdo->prepare("
        INSERT INTO chatbot_usage (user_id, usage_date, message_count)
        VALUES (?, ?, 1)
        ON DUPLICATE KEY UPDATE message_count = message_count + 1
    ");
    $stmt->execute([$userId, $today]);

    $newCount = getTodayCount($pdo, $userId, $today);

    echo json_encode(['count' => $newCount]);
    exit;
}

// ── Unknown action ────────────────────────────────────────────
http_response_code(400);
echo json_encode(['error' => 'unknown_action']);

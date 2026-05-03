<?php
/**
 * aquaguard_auth.php
 * Returns JSON: { isLoggedIn, name, email, accountType }
 * Used by aquaguard.js to check if user is logged in before game starts.
 */
session_start();
header('Content-Type: application/json; charset=UTF-8');

$response = ['isLoggedIn' => false];

if (isset($_SESSION['user_id'])) {
    $conn = @mysqli_connect('localhost', 'root', '', 'nilevo');
    if ($conn) {
        mysqli_set_charset($conn, 'utf8mb4');
        $uid = (int) $_SESSION['user_id'];
        $res = mysqli_query($conn,
            "SELECT first_name, last_name, email, account_type
             FROM user WHERE user_id = $uid LIMIT 1"
        );
        if ($res && $row = mysqli_fetch_assoc($res)) {
            $response = [
                'isLoggedIn'  => true,
                'name'        => $row['first_name'] . ' ' . $row['last_name'],
                'email'       => $row['email'],
                'accountType' => $row['account_type']   // 'standard' | 'premium'
            ];
        }
        mysqli_close($conn);
    }
}

echo json_encode($response, JSON_UNESCAPED_UNICODE);

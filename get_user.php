<?php
session_start();
$response = ['isLoggedIn' => false];

if (isset($_SESSION['user_id'])) {
    $conn = @mysqli_connect('localhost', 'root', '', 'nilevo');
    if ($conn) {
        $uid = (int) $_SESSION['user_id'];
        $res = mysqli_query($conn, "SELECT first_name, last_name, email, account_type FROM user WHERE user_id=$uid LIMIT 1");
        if ($res && $row = mysqli_fetch_assoc($res)) {
            $response = [
                'isLoggedIn' => true,
                'name' => $row['first_name'] . ' ' . $row['last_name'],
                'email' => $row['email'],
                'type' => ucfirst($row['account_type'])
            ];
        }
        mysqli_close($conn);
    }
}
echo json_encode($response);

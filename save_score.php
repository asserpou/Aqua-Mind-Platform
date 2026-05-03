<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

$servername = "localhost";
$username   = "root";           // الافتراضي في XAMPP
$password   = "";               // الافتراضي فاضي
$dbname     = "nilevo";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Connection failed"]);
    exit();
}

$player_name    = isset($_POST['player_name']) ? trim($_POST['player_name']) : 'Unknown';
$time_remaining = isset($_POST['time_remaining']) ? floatval($_POST['time_remaining']) : 0;

$stmt = $conn->prepare("INSERT INTO scores (player_name, time_remaining, date) VALUES (?, ?, NOW())");
$stmt->bind_param("sd", $player_name, $time_remaining);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "تم الحفظ"]);
} else {
    echo json_encode(["status" => "error", "message" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>

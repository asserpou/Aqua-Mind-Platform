<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

$servername = "localhost";
$username   = "root";
$password   = "";
$dbname     = "nilevo";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Connection failed"]);
    exit();
}

// جيب أعلى 10 لاعبين مرتبين حسب time_remaining (الـ score)
$sql = "SELECT player_name, time_remaining, date 
        FROM scores 
        ORDER BY time_remaining DESC 
        LIMIT 10";

$result = $conn->query($sql);

$data = [];
$rank = 1;
while ($row = $result->fetch_assoc()) {
    $data[] = [
        "rank"  => $rank++,
        "name"  => $row["player_name"],
        "score" => $row["time_remaining"],
        "date"  => $row["date"]
    ];
}

echo json_encode(["status" => "success", "data" => $data]);

$conn->close();
?>

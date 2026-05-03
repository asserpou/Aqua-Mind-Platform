<?php
session_start();

$host = 'localhost';
$user = 'root';
$pass = '';
$db   = 'nilevo';

echo "<style>
body { font-family: monospace; background: #0d1117; color: #c9d1d9; padding: 30px; }
.ok  { color: #3fb950; font-weight: bold; }
.err { color: #f85149; font-weight: bold; }
.box { background: #161b22; border: 1px solid #30363d; border-radius: 8px; padding: 16px; margin-bottom: 16px; }
h2   { color: #58a6ff; border-bottom: 1px solid #30363d; padding-bottom: 8px; }
</style>";

echo "<div class='box'><h2>1. Session Data</h2>";
if (empty($_SESSION)) {
    echo "<span class='err'>❌ Session is EMPTY — user is not logged in</span>";
} else {
    echo "<span class='ok'>✅ Session found:</span><pre>" . print_r($_SESSION, true) . "</pre>";
}
echo "</div>";

echo "<div class='box'><h2>2. Database Connection</h2>";
$conn = @mysqli_connect($host, $user, $pass, $db);
if (!$conn) {
    echo "<span class='err'>❌ DB Connection FAILED: " . mysqli_connect_error() . "</span>";
} else {
    echo "<span class='ok'>✅ DB Connected successfully</span>";

    echo "<h2 style='margin-top:16px'>3. Table Check</h2>";
    $res = mysqli_query($conn, "SHOW TABLES LIKE 'user'");
    if (mysqli_num_rows($res) == 0) {
        echo "<span class='err'>❌ Table 'user' does NOT exist</span>";
    } else {
        echo "<span class='ok'>✅ Table 'user' exists</span>";

        echo "<h2 style='margin-top:16px'>4. Columns in 'user' table</h2>";
        $cols = mysqli_query($conn, "DESCRIBE user");
        echo "<pre>";
        while ($col = mysqli_fetch_assoc($cols)) {
            echo $col['Field'] . " (" . $col['Type'] . ")\n";
        }
        echo "</pre>";

        if (isset($_SESSION['user_id'])) {
            echo "<h2 style='margin-top:16px'>5. User Row from DB</h2>";
            $uid = (int) $_SESSION['user_id'];
            $q   = mysqli_query($conn, "SELECT * FROM user WHERE id=$uid LIMIT 1");
            if ($q && $row = mysqli_fetch_assoc($q)) {
                echo "<span class='ok'>✅ User found:</span><pre>" . print_r($row, true) . "</pre>";
            } else {
                echo "<span class='err'>❌ No user found with id=$uid</span>";
            }
        } else {
            echo "<h2 style='margin-top:16px'>5. User Row</h2>";
            echo "<span class='err'>❌ No user_id in session — can't query user</span>";
        }
    }
    mysqli_close($conn);
}
echo "</div>";

echo "<div class='box'><h2>6. PHP Info</h2>";
echo "PHP Version: <span class='ok'>" . phpversion() . "</span><br>";
echo "Session ID: " . session_id() . "<br>";
echo "Session Name: " . session_name() . "<br>";
echo "</div>";
?>

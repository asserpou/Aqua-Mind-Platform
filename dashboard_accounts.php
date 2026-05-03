<?php
session_start();

// الحارس: لو مفيش session مسجل للأدمن، رجعه لصفحة اللوجين
if (!isset($_SESSION['admin_id'])) {
    header("Location: admin_acount.php");
    exit();
}

$host = 'localhost';
$user = 'root';
$pass = '';
$db   = 'nilevo';
$conn = mysqli_connect($host, $user, $pass, $db);

$search = '';
if(isset($_GET['search'])) {
    $search = mysqli_real_escape_string($conn, $_GET['search']);
    $sql = "SELECT * FROM user WHERE email LIKE '%$search%' ORDER BY user_id DESC";
} else {
    $sql = "SELECT * FROM user ORDER BY user_id DESC";
}

$result = mysqli_query($conn, $sql);
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>User Management Dashboard</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&display=swap" rel="stylesheet">
<style>
:root {
  --card-bg: rgba(255,255,255,0.15);
  --card-border: rgba(255,255,255,0.25);
  --card-blur: 24px;
  --card-radius: 20px;
  --btn-bg: rgba(255,255,255,0.9);
  --btn-color: #1a3a5c;
  --btn-radius: 999px;
  --text-white: #fff;
  --text-muted: rgba(255,255,255,0.65);
  --bg-blur: blur(6px);
  --bg-brightness: brightness(0.78);
}

body {
  font-family:'DM Sans',sans-serif;
  background: linear-gradient(135deg,#1a3a5c,#00c6ff);
  min-height:100vh;
  padding:40px;
  color:var(--text-white);
}

.bg {
  position:fixed;
  inset:0;
  background-image:url('https://images.unsplash.com/photo-1526378727943-d47e0503d30e');
  background-size:cover;
  background-position:center;
  filter: var(--bg-blur) var(--bg-brightness);
  z-index:-1;
}

h1 {
  text-align:center;
  margin-bottom:30px;
  font-size:32px;
  text-shadow:0 2px 12px rgba(0,0,0,.4);
}

.search-bar {
  text-align:center;
  margin-bottom:30px;
}

.search-bar input {
  padding:12px 20px;
  border-radius:30px;
  border:none;
  width:300px;
  max-width:90%;
  outline:none;
}

.search-bar button {
  padding:12px 20px;
  border-radius:30px;
  border:none;
  background:#fff;
  color:#1a3a5c;
  cursor:pointer;
  margin-left:8px;
  font-weight:700;
  transition:0.3s;
}

.search-bar button:hover { background:#e0e0e0; }

.cards-container {
  display:grid;
  grid-template-columns: repeat(auto-fill,minmax(280px,1fr));
  gap:24px;
}

.card {
  background:var(--card-bg);
  backdrop-filter: blur(var(--card-blur));
  -webkit-backdrop-filter: blur(var(--card-blur));
  border:1px solid var(--card-border);
  border-radius:var(--card-radius);
  padding:24px 20px;
  box-shadow:0 20px 50px rgba(0,0,0,0.35);
  transition:transform .3s, box-shadow .3s;
}

.card:hover { transform:translateY(-5px); box-shadow:0 30px 60px rgba(0,0,0,0.45); }

.card h3 {
  margin-bottom:8px;
}

.card p {
  margin:4px 0;
  font-size:14px;
  color:var(--text-muted);
}

.btn-edit {
  margin-top:12px;
  display:inline-block;
  padding:10px 20px;
  background:var(--btn-bg);
  color:var(--btn-color);
  border-radius:var(--btn-radius);
  text-decoration:none;
  font-weight:700;
  transition:transform .2s, box-shadow .2s;
}

.btn-edit:hover {
  transform:translateY(-2px);
  box-shadow:0 10px 28px rgba(0,0,0,.28);
}
</style>
</head>
<body>
<div class="bg"></div>
<h1>User Management Dashboard</h1>

<div class="search-bar">
  <form method="GET">
    <input type="text" name="search" placeholder="Search by Gmail" value="<?php echo htmlspecialchars($search); ?>">
    <button type="submit">Search</button>
  </form>
</div>

<div class="cards-container">
<?php while($row = mysqli_fetch_assoc($result)): ?>
  <div class="card">
    <h3><?php echo htmlspecialchars($row['first_name'].' '.$row['last_name']); ?></h3>
    <p>Email: <?php echo htmlspecialchars($row['email']); ?></p>
    <p>Phone: <?php echo htmlspecialchars($row['phone']); ?></p>
    <p>Account: <?php echo $row['account_type']; ?></p>
    <p>Created: <?php echo $row['created_at']; ?></p>
    <a class="btn-edit" href="edit_user.php?id=<?php echo $row['user_id']; ?>">Edit</a>
  </div>
<?php endwhile; ?>
</div>

</body>
</html>

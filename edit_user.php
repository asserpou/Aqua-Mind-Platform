<?php
session_start();

$conn = mysqli_connect("localhost","root","","nilevo");
if(!$conn){
    die("Database Connection Failed");
}

if(!isset($_GET['id'])){
    die("No ID Provided");
}

$id = intval($_GET['id']);

$stmt = mysqli_prepare($conn,"SELECT * FROM user WHERE user_id=?");
mysqli_stmt_bind_param($stmt,"i",$id);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

if(mysqli_num_rows($result) != 1){
    die("User Not Found");
}

$user = mysqli_fetch_assoc($result);
$success = "";

if(isset($_POST['update'])){

    $first_name   = trim($_POST['first_name']);
    $last_name    = trim($_POST['last_name']);
    $email        = trim($_POST['email']);
    $phone        = trim($_POST['phone']);
    $account_type = $_POST['account_type'];

    if($account_type !== 'free' && $account_type !== 'premium'){
        die("Invalid Account Type");
    }

    $update = mysqli_prepare($conn,"UPDATE user SET 
        first_name=?,
        last_name=?,
        email=?,
        phone=?,
        account_type=?
        WHERE user_id=?");

    mysqli_stmt_bind_param($update,"sssssi",
        $first_name,
        $last_name,
        $email,
        $phone,
        $account_type,
        $id
    );

    mysqli_stmt_execute($update);

    $success = "Updated Successfully ✅";

    $user['first_name']   = $first_name;
    $user['last_name']    = $last_name;
    $user['email']        = $email;
    $user['phone']        = $phone;
    $user['account_type'] = $account_type;
}
?>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Edit User</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&display=swap" rel="stylesheet">
<style>

body{
    font-family:'DM Sans',sans-serif;
    background:linear-gradient(135deg,#1a3a5c,#00c6ff);
    display:flex;
    align-items:center;
    justify-content:center;
    height:100vh;
    color:white;
}

.card{
    background:rgba(255,255,255,0.15);
    backdrop-filter:blur(20px);
    padding:30px;
    border-radius:20px;
    width:380px;
    box-shadow:0 25px 60px rgba(0,0,0,0.4);
}

h2{
    text-align:center;
    margin-bottom:20px;
}

input, select{
    width:100%;
    padding:12px;
    margin-bottom:15px;
    border:none;
    border-radius:14px;
    background:rgba(255,255,255,0.2);
    color:white;
    font-weight:bold;
}

select{
    cursor:pointer;
}

select option{
    color:black;
    font-weight:bold;
}

input:focus, select:focus{
    outline:none;
    box-shadow:0 0 10px #00c6ff;
}

button{
    width:100%;
    padding:12px;
    border:none;
    border-radius:30px;
    background:white;
    color:#1a3a5c;
    font-weight:bold;
    cursor:pointer;
    transition:0.3s;
}

button:hover{
    transform:translateY(-2px);
}

.success{
    text-align:center;
    margin-bottom:15px;
    color:#00ff9d;
    font-weight:bold;
}

</style>
</head>
<body>

<div class="card">

<h2>Edit User</h2>

<?php if($success != "") echo "<div class='success'>$success</div>"; ?>

<form method="POST">

<input type="text" name="first_name" 
value="<?php echo htmlspecialchars($user['first_name']); ?>" required>

<input type="text" name="last_name" 
value="<?php echo htmlspecialchars($user['last_name']); ?>" required>

<input type="email" name="email" 
value="<?php echo htmlspecialchars($user['email']); ?>" required>

<input type="text" name="phone" 
value="<?php echo htmlspecialchars($user['phone']); ?>">

<select name="account_type" required>
    <option value="free" 
    <?php if($user['account_type']=='free') echo 'selected'; ?>>
        Free Account
    </option>

    <option value="premium" 
    <?php if($user['account_type']=='premium') echo 'selected'; ?>>
        Premium Account
    </option>
</select>

<button type="submit" name="update">Update</button>

</form>
</div>

</body>
</html>

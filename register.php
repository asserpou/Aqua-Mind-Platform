<?php
session_start();

$host = 'localhost';
$user = 'root';
$pass = '';
$db = 'nilevo';

$conn = mysqli_connect($host, $user, $pass, $db);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$error = '';

if (isset($_GET['redirect'])) {
    $_SESSION['redirect_after_login'] = $_GET['redirect'];
} elseif (!isset($_SESSION['redirect_after_login']) && isset($_SERVER['HTTP_REFERER'])) {
    $referer = $_SERVER['HTTP_REFERER'];
    if (strpos($referer, 'login.php') === false && strpos($referer, 'register.php') === false) {
        $_SESSION['redirect_after_login'] = $referer;
    }
}

if (isset($_POST['register'])) {
    $firstName = mysqli_real_escape_string($conn, $_POST['first_name']);
    $lastName  = mysqli_real_escape_string($conn, $_POST['last_name']);
    $email     = mysqli_real_escape_string($conn, $_POST['email']);
    $phone     = mysqli_real_escape_string($conn, $_POST['phone']);
    $password  = $_POST['password'];
    $confirmPassword = $_POST['confirm_password'];

    if ($password !== $confirmPassword) {
        $error = "Passwords do not match!";
    } else {
        $checkSql = "SELECT * FROM user WHERE email='$email' LIMIT 1";
        $checkRes = mysqli_query($conn, $checkSql);

        if (mysqli_num_rows($checkRes) > 0) {
            $error = "Email already exists!";
        } else {
            // حفظ البيانات
            $insertSql = "INSERT INTO user (first_name, last_name, email, phone, password, account_type)
                          VALUES ('$firstName','$lastName','$email','$phone','$password','Standard')";
            if (mysqli_query($conn, $insertSql)) {
                $_SESSION['user_id'] = mysqli_insert_id($conn);
                $_SESSION['user_email'] = $email;
                $_SESSION['account_type'] = 'Standard';

                // ── Redirect لآخر صفحة أو index.php ──
                $redirectTo = isset($_SESSION['redirect_after_login']) ? $_SESSION['redirect_after_login'] : 'index.php';
                unset($_SESSION['redirect_after_login']);

                header("Location: " . $redirectTo);
                exit;
            } else {
                $error = "Failed to register: " . mysqli_error($conn);
            }
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Register</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
<style>
:root {
  --card-bg           : rgba(255, 255, 255, 0.15);
  --card-border       : rgba(255, 255, 255, 0.25);
  --card-blur         : 22px;
  --card-radius       : 24px;
  --field-bg          : rgba(255, 255, 255, 0.13);
  --field-border      : rgba(255, 255, 255, 0.22);
  --field-focus-bg    : rgba(255, 255, 255, 0.22);
  --field-focus-border: rgba(255, 255, 255, 0.55);
  --field-radius      : 14px;
  --field-padding     : 16px 50px;
  --text-white        : #ffffff;
  --text-muted        : rgba(255, 255, 255, 0.55);
  --btn-bg            : rgba(255, 255, 255, 0.90);
  --btn-color         : #1a3a5c;
  --btn-radius        : 999px;
  --bg-blur           : blur(6px);
  --bg-brightness     : brightness(0.78);
}
*, *::before, *::after { box-sizing: border-box; margin:0; padding:0; }
body { min-height:100vh; display:flex; align-items:center; justify-content:center; font-family:'DM Sans',sans-serif; overflow:hidden; }
.bg { position:fixed; inset:0; z-index:0; background-image:url('hero.png'); background-size:cover; background-position:center; filter: var(--bg-blur) var(--bg-brightness); }
.card { position:relative; z-index:1; width:460px; background:var(--card-bg); backdrop-filter: blur(var(--card-blur)); -webkit-backdrop-filter: blur(var(--card-blur)); border:1px solid var(--card-border); border-radius:var(--card-radius); padding:48px 48px 52px; box-shadow: 0 24px 64px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.3); animation: fadeUp .65s cubic-bezier(.22,1,.36,1) both; }
@keyframes fadeUp { from {opacity:0; transform:translateY(28px);} to {opacity:1; transform:translateY(0);} }
.avatar { width:70px; height:70px; background:rgba(255,255,255,.18); border:1px solid rgba(255,255,255,.3); border-radius:18px; display:flex; align-items:center; justify-content:center; margin:0 auto 26px; box-shadow:0 6px 20px rgba(0,0,0,.18); }
.avatar svg { width:32px; height:32px; stroke: rgba(255,255,255,.85); }
h1 { text-align:center; font-size:22px; font-weight:700; color:var(--text-white); letter-spacing:.3px; margin-bottom:32px; text-shadow:0 2px 10px rgba(0,0,0,.25); }
.field { position:relative; margin-bottom:16px; }
.field input { width:100%; padding:var(--field-padding); background:var(--field-bg); border:1px solid var(--field-border); border-radius:var(--field-radius); font-family:inherit; font-size:15px; color:var(--text-white); outline:none; transition: background .2s, border-color .2s, box-shadow .2s; }
.field input::placeholder { color:var(--text-muted); }
.field input:focus { background:var(--field-focus-bg); border-color:var(--field-focus-border); box-shadow:0 0 0 3px rgba(255,255,255,.08); }
.field-password { display:flex; align-items:center; position:relative; }
.field-password input { flex:1; }
.toggle-password { position:absolute; right:16px; top:50%; transform:translateY(-50%); background:none; border:none; cursor:pointer; color:var(--text-muted); font-size:14px; }
.row { display:flex; gap:10px; }
.row .field { flex:1; margin-bottom:16px; }
.btn { width:100%; padding:16px; background:var(--btn-bg); border:none; border-radius:var(--btn-radius); font-family:inherit; font-size:15px; font-weight:700; color:var(--btn-color); cursor:pointer; letter-spacing:.3px; transition: background .2s, transform .2s, box-shadow .2s; box-shadow:0 6px 20px rgba(0,0,0,.22); }
.btn:hover  { background:#fff; transform:translateY(-2px); box-shadow:0 10px 28px rgba(0,0,0,.28); }
.btn:active { transform:translateY(0); }
.register { margin-top:15px; text-align:center; font-size:14px; color:#ccc; }
.register a { color:#00c6ff; text-decoration:none; font-weight:600; transition:0.3s; }
.register a:hover { text-decoration:underline; color:#fff; }

/* =============================================
   📱 RESPONSIVE — Mobile & Tablet
============================================= */

/* ── Tablet (≤768px) ── */
@media (max-width: 768px) {
  .card {
    width: 90%;
    max-width: 460px;
    padding: 40px 36px 44px;
  }
  h1 { font-size: 20px; margin-bottom: 26px; }
}

/* ── Mobile (≤480px) ── */
@media (max-width: 480px) {
  body {
    padding: 24px 0;
    overflow-y: auto;
    align-items: flex-start;
    min-height: 100dvh;
  }

  .bg {
    position: fixed;
  }

  .card {
    width: 92%;
    max-width: 420px;
    padding: 32px 22px 36px;
    border-radius: 20px;
    margin: auto;
  }

  .avatar {
    width: 58px; height: 58px;
    border-radius: 15px;
    margin-bottom: 20px;
  }
  .avatar svg { width: 26px; height: 26px; }

  h1 {
    font-size: 18px;
    margin-bottom: 24px;
  }

  /* Stack first/last name fields on mobile */
  .row {
    flex-direction: column;
    gap: 0;
  }
  .row .field { margin-bottom: 16px; }

  .field input {
    padding: 14px 16px;
    font-size: 14px;
    border-radius: 12px;
  }

  .toggle-password { font-size: 13px; right: 12px; }

  .btn {
    padding: 14px;
    font-size: 14px;
  }

  .register { font-size: 13px; }
}

/* ── Very small phones (≤360px) ── */
@media (max-width: 360px) {
  .card {
    width: 95%;
    padding: 26px 18px 30px;
    border-radius: 18px;
  }
  h1 { font-size: 16px; }
  .field input { padding: 12px 14px; font-size: 13px; }
  .btn { padding: 12px; font-size: 13px; }
}

/* ── Landscape phones ── */
@media (max-height: 500px) and (orientation: landscape) {
  body {
    padding: 16px 0;
    overflow-y: auto;
    align-items: flex-start;
  }

  .card {
    width: 70%;
    max-width: 460px;
    padding: 24px 32px 28px;
    margin: auto;
  }

  .avatar {
    width: 48px; height: 48px;
    margin-bottom: 14px;
  }
  .avatar svg { width: 22px; height: 22px; }

  h1 { font-size: 17px; margin-bottom: 18px; }
  .field { margin-bottom: 10px; }
  .field input { padding: 10px 16px; font-size: 13px; }
  .row { gap: 8px; }
  .row .field { margin-bottom: 10px; }
  .btn { padding: 10px; font-size: 13px; }
  .register { margin-top: 10px; font-size: 12px; }
}
</style>
</head>
<body>

<div class="bg"></div>

<div class="card">
  <div class="avatar">
    <svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
  </div>

  <h1>Create Account</h1>

  <?php if($error): ?>
    <p style="color:#ff6961; text-align:center; margin-bottom:16px;"><?php echo $error; ?></p>
  <?php endif; ?>

  <form method="POST">
    <div class="row">
      <div class="field"><input type="text" name="first_name" placeholder="First Name" required /></div>
      <div class="field"><input type="text" name="last_name" placeholder="Last Name" required /></div>
    </div>
    <div class="field"><input type="email" name="email" placeholder="Email" required /></div>
    <div class="field"><input type="text" name="phone" placeholder="Phone Number" required /></div>
    <div class="field field-password">
      <input type="password" name="password" id="password" placeholder="Password" required />
      <button type="button" class="toggle-password" onclick="togglePassword('password')">Show</button>
    </div>
    <div class="field field-password">
      <input type="password" name="confirm_password" id="confirm_password" placeholder="Confirm Password" required />
      <button type="button" class="toggle-password" onclick="togglePassword('confirm_password')">Show</button>
    </div>

    <button class="btn" type="submit" name="register">Register</button>

    <p class="register">
      Already have an account? <a href="login.php">Sign in</a>
    </p>
  </form>
</div>

<script>
function togglePassword(id){
  const input = document.getElementById(id);
  if(input.type === "password"){
    input.type = "text";
  } else {
    input.type = "password";
  }
}
</script>

</body>
</html>

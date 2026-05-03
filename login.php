<?php
session_start();


if (isset($_GET['action']) && $_GET['action'] === 'check_auth') {
    header('Content-Type: application/json');
    
    if (isset($_SESSION['user_id'])) {
        echo json_encode([
            'isLoggedIn' => true,
            'userId' => $_SESSION['user_id'],
            'email' => $_SESSION['user_email'],
            'accountType' => $_SESSION['account_type'] ?? 'Standard' 
        ]);
    } else {
        echo json_encode([
            'isLoggedIn' => false
        ]);
    }
    exit; 
}


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

if (isset($_POST['sign'])) {
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = $_POST['password'];

    
    $sql = "SELECT * FROM user WHERE email='$email' LIMIT 1";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) == 1) {
        $user = mysqli_fetch_assoc($result);

     
        if ($password === $user['password']) {
            
            $_SESSION['user_id'] = $user['user_id'];
            $_SESSION['user_email'] = $user['email'];
            $_SESSION['account_type'] = $user['account_type'];

            $redirectTo = isset($_SESSION['redirect_after_login']) ? $_SESSION['redirect_after_login'] : 'index.php';
            unset($_SESSION['redirect_after_login']); 
            
            header("Location: " . $redirectTo);
            exit;
        } else {
            $error = "Incorrect password!";
        }
    } else {
        $error = "Email not found!";
    }
}
?>



<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sign In</title>

  <!-- =============================================
       🎨 FONTS — غيّر الخط من هنا بسهولة
  ============================================= -->
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />

  <style>
    /* =============================================
       🌈 VARIABLES — كل الألوان والأرقام هنا
    ============================================= */
    :root {
      /* ── البطاقة ── */
      --card-bg           : rgba(255, 255, 255, 0.15);
      --card-border       : rgba(255, 255, 255, 0.25);
      --card-blur         : 22px;
      --card-radius       : 24px;

      /* ── الحقول ── */
      --field-bg          : rgba(255, 255, 255, 0.13);
      --field-border      : rgba(255, 255, 255, 0.22);
      --field-focus-bg    : rgba(255, 255, 255, 0.22);
      --field-focus-border: rgba(255, 255, 255, 0.55);
      --field-radius      : 14px;
      --field-padding     : 16px 50px;

      /* ── النصوص ── */
      --text-white        : #ffffff;
      --text-muted        : rgba(255, 255, 255, 0.55);
      --text-forgot       : rgba(255, 255, 255, 0.65);

      /* ── الزر ── */
      --btn-bg            : rgba(255, 255, 255, 0.90);
      --btn-color         : #1a3a5c;
      --btn-radius        : 999px;

      /* ── الخلفية ── */
      --bg-blur           : blur(6px);        /* ضبابية صورة الخلفية */
      --bg-brightness     : brightness(0.78); /* إضاءة الخلفية       */
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'DM Sans', sans-serif;
      overflow: hidden;
    }

    /* =============================================
       🖼️ BACKGROUND
       ضع مسار صورتك بدل  "YOUR_IMAGE.jpg"
    ============================================= */
    .bg {
      position: fixed;
      inset: 0;
      z-index: 0;
      background-image: url('hero.png');
      background-size   : cover;
      background-position: center;
      filter: var(--bg-blur) var(--bg-brightness);
    }

    /* =============================================
       CARD
    ============================================= */
    .card {
      position: relative;
      z-index: 1;
      width: 460px;
      background: var(--card-bg);
      backdrop-filter: blur(var(--card-blur));
      -webkit-backdrop-filter: blur(var(--card-blur));
      border: 1px solid var(--card-border);
      border-radius: var(--card-radius);
      padding: 48px 48px 52px;
      box-shadow: 0 24px 64px rgba(0, 0, 0, 0.35),
                  inset 0 1px 0 rgba(255, 255, 255, 0.3);
      animation: fadeUp .65s cubic-bezier(.22, 1, .36, 1) both;
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(28px); }
      to   { opacity: 1; transform: translateY(0);    }
    }

    .avatar {
      width: 70px; height: 70px;
      background: rgba(255, 255, 255, 0.18);
      border: 1px solid rgba(255, 255, 255, 0.30);
      border-radius: 18px;
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 26px;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18);
    }

    .avatar svg { width: 32px; height: 32px; stroke: rgba(255,255,255,.85); }

    h1 {
      text-align: center;
      font-size: 22px;
      font-weight: 700;
      color: var(--text-white);
      letter-spacing: .3px;
      margin-bottom: 32px;
      text-shadow: 0 2px 10px rgba(0,0,0,.25);
    }

    .field {
      position: relative;
      margin-bottom: 16px;
    }

    .field input {
      width: 100%;
      padding: var(--field-padding);
      background: var(--field-bg);
      border: 1px solid var(--field-border);
      border-radius: var(--field-radius);
      font-family: inherit;
      font-size: 15px;
      color: var(--text-white);
      outline: none;
      transition: background .2s, border-color .2s, box-shadow .2s;
    }

    .field input::placeholder { color: var(--text-muted); }

    .field input:focus {
      background: var(--field-focus-bg);
      border-color: var(--field-focus-border);
      box-shadow: 0 0 0 3px rgba(255,255,255,.08);
    }

    .icon-left {
      position: absolute;
      left: 16px; top: 50%;
      transform: translateY(-50%);
      opacity: .55;
      pointer-events: none;
      display: flex;
    }

    .icon-right {
      position: absolute;
      right: 14px; top: 50%;
      transform: translateY(-50%);
      background: none; border: none; cursor: pointer;
      opacity: .55; transition: opacity .2s;
      padding: 4px; display: flex;
    }
    .icon-right:hover { opacity: .9; }

    .forgot {
      display: block;
      text-align: right;
      font-size: 13px;
      font-weight: 500;
      color: var(--text-forgot);
      text-decoration: none;
      margin-top: 8px;
      margin-bottom: 30px;
      transition: color .2s;
    }
    .forgot:hover { color: #fff; }

    .btn {
      width: 100%;
      padding: 16px;
      background: var(--btn-bg);
      border: none;
      border-radius: var(--btn-radius);
      font-family: inherit;
      font-size: 15px;
      font-weight: 700;
      color: var(--btn-color);
      cursor: pointer;
      letter-spacing: .3px;
      transition: background .2s, transform .2s, box-shadow .2s;
      box-shadow: 0 6px 20px rgba(0,0,0,.22);
    }
    .btn:hover  { background: #fff; transform: translateY(-2px); box-shadow: 0 10px 28px rgba(0,0,0,.28); }
    .btn:active { transform: translateY(0); 
    
    }
.register {
  margin-top: 15px;
  text-align: center;
  font-size: 14px;
  color: #ccc;
}

.register a {
  color: #00c6ff;
  text-decoration: none;
  font-weight: 600;
  transition: 0.3s;
}

.register a:hover {
  text-decoration: underline;
  color: #fff;
}

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

      .field input {
        padding: 14px 44px;
        font-size: 14px;
        border-radius: 12px;
      }

      .icon-left { left: 14px; }
      .icon-left svg { width: 16px; height: 16px; }

      .icon-right { right: 12px; }
      .icon-right svg { width: 16px; height: 16px; }

      .forgot { font-size: 12px; margin-bottom: 24px; }

      .btn {
        padding: 14px;
        font-size: 14px;
      }
    }

    /* ── Very small phones (≤360px) ── */
    @media (max-width: 360px) {
      .card {
        width: 95%;
        padding: 26px 18px 30px;
        border-radius: 18px;
      }
      h1 { font-size: 16px; }
      .field input { padding: 12px 40px; font-size: 13px; }
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
      .field input { padding: 10px 44px; font-size: 13px; }
      .forgot { margin-top: 4px; margin-bottom: 16px; }
      .btn { padding: 10px; font-size: 13px; }
    }

  </style>
</head>
<body>

  <div class="bg"></div>

  <div class="card">

    <div class="avatar">
      <svg viewBox="0 0 24 24" fill="none" stroke-width="1.8"
           stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="8" r="4"/>
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
      </svg>
    </div>

    <h1>Sign in with Email</h1>

    <?php if ($error): ?>
      <p style="
        background: rgba(255,80,80,0.15);
        border: 1px solid rgba(255,80,80,0.4);
        color: #ff6b6b;
        text-align: center;
        padding: 10px 16px;
        border-radius: 10px;
        font-size: 14px;
        margin-bottom: 20px;
      ">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle; margin-right:5px;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <?php echo htmlspecialchars($error); ?>
      </p>
    <?php endif; ?>

    <form method="POST">
    <div class="field">
      <span class="icon-left">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
             stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="3"/>
          <path d="m2 7 10 7 10-7"/>
        </svg>
      </span>
      <input type="email" id="email" placeholder="Email" name="email" autocomplete="email" />
    </div>

    <div class="field">
      <span class="icon-left">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
             stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      </span>
      <input type="password" id="password" placeholder="Password" name="password" autocomplete="current-password" />
      <button type="button" class="icon-right" id="togglePassword" onclick="togglePass()">
        <svg id="eyeIcon" width="18" height="18" viewBox="0 0 24 24" fill="none"
             stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      </button>
    </div>

    <a href="#" class="forgot">Forgot password?</a>

    <button class="btn"   name="sign"   type="submit">Sign in</button>
  
 <p style="margin-top:15px; text-align:center; font-size:14px; color:#ccc;">
  Don't have an account?
  <a href="register.php"
     style="color:#00c6ff; text-decoration:none; font-weight:600; transition:0.3s;"
     onmouseover="this.style.color='#ffffff'; this.style.textDecoration='underline';"
     onmouseout="this.style.color='#00c6ff'; this.style.textDecoration='none';">
     Create Account
  </a>
</p>

</form>

<script>
function togglePass() {
  const input = document.getElementById('password');
  const icon  = document.getElementById('eyeIcon');
  const show  = input.type === 'password';
  input.type  = show ? 'text' : 'password';
  icon.innerHTML = show
    ? '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>'
    : '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
}
</script>
</body>
</html>

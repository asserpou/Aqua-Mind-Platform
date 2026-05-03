<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}


// Logout logic
if (isset($_GET['logout'])) {
    session_unset();
    session_destroy();
    header("Location: index.php");
    exit;
}

// Check if user is logged in
$isLoggedIn = isset($_SESSION['user_id']);

// Fetch user data from DB if logged in
$userFirstName = '';
$userLastName  = '';
$userEmail     = '';
$accountType   = 'standard';

if ($isLoggedIn) {
    $conn = @mysqli_connect('localhost', 'root', '', 'nilevo');
    if ($conn) {
        $uid = (int) $_SESSION['user_id'];
        $res = mysqli_query($conn, "SELECT first_name, last_name, email, account_type FROM user WHERE user_id=$uid LIMIT 1");
        if ($res && $row = mysqli_fetch_assoc($res)) {
            $userFirstName = $row['first_name'];
            $userLastName  = $row['last_name'];
            $userEmail     = $row['email'];
            $accountType   = strtolower(trim($row['account_type']));
        }
        mysqli_close($conn);
    }
}

// Check if Premium
$isPremium = $isLoggedIn && ($accountType === 'premium');
?>
<!doctype html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="UTF-8" />
    <title>AquaMind</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- CSS -->
    <link rel="stylesheet" href="style.css?v=<?php echo time(); ?>" />
    <link rel="stylesheet" href="chatbot.css?v=<?php echo time(); ?>">

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="AquaMind_logo.png" />

    <!-- ✅ Sync User Role in LocalStorage -->
    <script>
        localStorage.setItem('aquamind_user_role', <?php echo json_encode($isPremium ? 'premium' : 'standard'); ?>);
    </script>

    <!-- ✅ Apply saved theme BEFORE page renders — prevents white flash -->
    <script>
        if (localStorage.getItem('theme') === 'dark') {
            document.documentElement.classList.add('dark-mode');
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    </script>
  </head>
  <style>
    
.user-dropdown {
  position: relative;
}

.user-dropdown > i {
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: 0.3s;
}

.user-dropdown > i:hover {
  color: #2dd4ff;
  transform: scale(1.1);
}

.user-menu {
  position: absolute;
  top: 130%;
  right: 0;
  background: #ffffff;
  border-radius: 10px;
  padding: 8px;
  display: none;
  min-width: 200px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1001;
}

.user-menu.show {
  display: block;
}

.user-menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  cursor: default;
  color: #333;
  border-radius: 6px;
  font-size: 14px;
  text-decoration: none;
  transition: 0.2s;
}

.user-menu-item i {
  color: #2dd4ff;
  width: 16px;
  text-align: center;
}

.user-menu-info-row {
  cursor: default;
  font-size: 13px;
  color: #555;
}

.user-menu-info-row:hover {
  background: transparent;
}

a.user-menu-item:hover {
  background: #e8f4f8;
  color: #2dd4ff;
}

.user-menu-signout {
  color: #e53e3e !important;
  cursor: pointer;
}

.user-menu-signout i {
  color: #e53e3e !important;
}

.user-menu-signout:hover {
  background: #fff5f5 !important;
  color: #c53030 !important;
}

.user-menu-divider {
  height: 1px;
  background: #eee;
  margin: 4px 8px;
}

/* Dark mode */
body.dark-mode .user-menu {
  background: #1a2333;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
}

body.dark-mode .user-menu-item {
  color: #c8dff0;
}

body.dark-mode .user-menu-info-row {
  color: #7a9ab5;
}

body.dark-mode a.user-menu-item:hover {
  background: #243048;
  color: #2dd4ff;
}

body.dark-mode .user-menu-divider {
  background: #243048;
}

body.dark-mode .user-menu-signout {
  color: #fc8181 !important;
}

body.dark-mode .user-menu-signout i {
  color: #fc8181 !important;
}

body.dark-mode .user-menu-signout:hover {
  background: rgba(229, 62, 62, 0.12) !important;
}

    </style>
  <body>

    <!-- NAVBAR -->
    <div class="navbar">
      <a href="index.php" class="logo-container">
        <img src="CAquaMind_logo.png" class="logo-img" alt="AquaMind Logo" />
        <span class="logo-text">AquaMind</span>
      </a>

      <div class="menu">
        <a href="index.php"                data-key="home">Home</a>
        <a href="stories.php"             data-key="stories">Stories&Charts</a>
        <a href="aquaguard.php"           data-key="aquaguard">AquaGuard</a>
        <a href="interactive-house.php"   data-key="interactive">InteractiveHouse</a>
        <a href="marketplace.php"         data-key="marketplace">MarketPlace</a>
        <a href="community.php"           data-key="community">Community</a>
        
        <?php if ($isLoggedIn): ?>
          <a href="index.php?logout=1" class="mobile-action-btn">Sign Out</a>
        <?php else: ?>
          <a href="login.php" class="mobile-action-btn">Sign In</a>
        <?php endif; ?>
      </div>

      <div class="nav-icons">
        <div class="divider"></div>
        
        <!-- User Profile Dropdown -->
        <div class="user-dropdown">
          <i class="fas fa-user" id="user-toggle"></i>
          <div class="user-menu" id="user-menu">
            <?php if ($isLoggedIn): ?>
              <div class="user-menu-item user-menu-info-row">
                <i class="fas fa-user-circle"></i>
                <span><?php echo htmlspecialchars($userFirstName . ' ' . $userLastName); ?></span>
              </div>
              <div class="user-menu-item user-menu-info-row">
                <i class="fas fa-envelope"></i>
                <span><?php echo htmlspecialchars($userEmail); ?></span>
              </div>
              <div class="user-menu-item user-menu-info-row">
                <i class="fas <?php echo $isPremium ? 'fa-crown' : 'fa-star'; ?>"></i>
                <span><?php echo ucfirst($accountType); ?> <span data-key="plan">Plan</span></span>
              </div>
              <div class="user-menu-divider"></div>
              <a href="index.php?logout=1" class="user-menu-item user-menu-signout">
                <i class="fas fa-sign-out-alt"></i>
                <span data-key="signOut">Sign Out</span>
              </a>
            <?php else: ?>
              <a href="login.php" class="user-menu-item">
                <i class="fas fa-sign-in-alt"></i>
                <span data-key="signIn">Sign In / Log In</span>
              </a>
              <a href="register.php" class="user-menu-item">
                <i class="fas fa-user-plus"></i>
                <span data-key="createAccount">Create Account</span>
              </a>
            <?php endif; ?>
          </div>
        </div>


        <?php if ($isLoggedIn): ?>
        <div class="notif-dropdown" id="notifDropdown">
            <button class="notif-bell-btn" id="notifBellBtn" aria-label="Notifications">
                <i class="fas fa-bell"></i>
                <span class="notif-badge" id="notifBadge" style="display:none">0</span>
            </button>
            <div class="notif-menu" id="notifMenu">
                <div class="notif-menu-header">
                    <span>Notifications</span>
                    <button class="notif-mark-all" id="notifMarkAll">Mark all read</button>
                </div>
                <div class="notif-list" id="notifList">
                    <div class="notif-empty">No notifications yet</div>
                </div>
            </div>
        </div>
        <?php endif; ?>

        <!-- Language -->
        <div class="lang-dropdown">
          <i class="fas fa-globe" id="lang-toggle"></i>
          <div class="lang-menu" id="lang-menu">
            <div class="lang-option" data-lang="en">🇬🇧 English</div>
            <div class="lang-option" data-lang="ar">🇸🇦 عربي</div>
          </div>
        </div>

        <i class="fas fa-sun" id="theme-toggle"></i>

        <div class="hamburger" id="hamburger">
          <span></span><span></span><span></span>
        </div>
      </div>
    </div>


<?php
session_start();

if (isset($_GET['logout'])) {
    session_unset();
    session_destroy();
    header("Location: index.php");
    exit;
}

$isLoggedIn = isset($_SESSION['user_id']);

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

    <script>
        localStorage.setItem('aquamind_user_role', <?php echo json_encode($isPremium ? 'premium' : 'standard'); ?>);
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

    <!-- HERO -->
    <section class="hero scroll-reveal">
      <div class="wave-header">
        <div class="overlay"></div>
        <div class="hero-content">
          <h1>
            <span data-key="hero1">Smarter Water</span><br />
            <span data-key="hero2">Solutions for a Greener</span><br />
            <span data-key="hero3">Tomorrow</span>
          </h1>
          <div class="buttons">
            <button class="btn" data-key="btn1" onclick="window.location.href='aquaguard.php'">AquaGuard</button>
            <button class="btn" data-key="btn2" onclick="window.location.href='interactive-house.php'">InteractiveHouse</button>
          </div>
        </div>
        <svg class="waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none">
          <defs>
            <path id="wave-path" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"/>
          </defs>
          <g class="moving-waves">
            <use href="#wave-path" x="48" y="0" fill="#def2fc" fill-opacity="0.6"/>
            <use href="#wave-path" x="48" y="3" fill="#caeafa" fill-opacity="0.6"/>
            <use href="#wave-path" x="48" y="7" fill="#c0e7fa" fill-opacity="0.6"/>
          </g>
        </svg>
      </div>
    </section>

    <!-- WATER ALERT POPUP -->
    <div class="water-alert-overlay" id="waterAlertOverlay">
        <div class="water-alert-popup">
            <button class="close-alert" onclick="closeWaterAlert()"><i class="fas fa-times"></i></button>
            <div class="alert-icon"><i class="fas fa-exclamation-triangle"></i></div>
            <h2 class="alert-title" data-key="alertTitle">Water is Running Out!</h2>
            <div class="countdown-container">
                <div class="countdown-circle">
                    <svg class="countdown-svg" viewBox="0 0 100 100">
                        <defs>
                            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%"   style="stop-color:#42a5f5;stop-opacity:1"/>
                                <stop offset="100%" style="stop-color:#2196f3;stop-opacity:1"/>
                            </linearGradient>
                            <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%"   style="stop-color:#ff5252;stop-opacity:1"/>
                                <stop offset="100%" style="stop-color:#f44336;stop-opacity:1"/>
                            </linearGradient>
                        </defs>
                        <circle class="countdown-bg"       cx="50" cy="50" r="45"></circle>
                        <circle class="countdown-progress" cx="50" cy="50" r="45" id="countdownCircle"></circle>
                    </svg>
                    <div class="countdown-number" id="countdownNumber">10</div>
                </div>
            </div>
            <p class="alert-message" data-key="alertMessage">Take action now to save water and protect our future!</p>
            <button class="alert-action-btn" onclick="goToAquaGuard()">
                <i class="fas fa-gamepad"></i>
                <span data-key="alertButton">Play AquaGuard Game</span>
            </button>
        </div>
    </div>

    <!-- MAIN SECTION -->
    <section class="main-section">

      <!-- WHO WE ARE -->
      <section class="about-section scroll-reveal">
        <div class="about-container">
          <div class="about-text">
            <h2 data-key="aboutTitle">What is AquaMind</h2>
            <p data-key="aboutText">
              AquaMind delivers an interactive experience through a gamified learning journey
              and a virtual smart house, helping users understand how daily actions affect water
              consumption. By combining fun challenges with real-life simulations, the platform
              builds awareness, encourages responsible behavior, and promotes sustainable water
              use in a simple and engaging way.
            </p>
          </div>
          <div class="about-card">
            <div class="feature">
              <i class="fas fa-lightbulb"></i>
              <div>
                <h4 data-key="feature1Title">Raise Awareness</h4>
                <p data-key="feature1Text">Educate communities about water scarcity</p>
              </div>
            </div>
            <div class="feature">
              <i class="fas fa-gamepad"></i>
              <div>
                <h4 data-key="feature2Title">Gamified Learning</h4>
                <p data-key="feature2Text">Engage users with fun challenges & rewards.</p>
              </div>
            </div>
            <div class="feature">
              <i class="fas fa-chart-line"></i>
              <div>
                <h4 data-key="feature3Title">Sustainable Impact</h4>
                <p data-key="feature3Text">Drive positive change and responsible use.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- TIPS SECTION -->
      <section class="tips-section scroll-reveal">
        <div class="overlay-light"></div>
        <div class="overlay-dark"></div>
        <h2 class="tips-title" data-key="tipsTitle">AquaMind's Saving Tips</h2>
        <div class="tips-card">
          <div class="tip-content">
            <div class="tip-icon"><i class="fa-solid fa-hand-holding-droplet"></i></div>
            <div class="tip-text">
              <p>Fixing leaks can save up to <span>10%</span> of water usage</p>
              <div class="progress-bar"><div class="progress"></div></div>
              <div class="dots">
                <span class="active"></span><span></span><span></span><span></span><span></span>
              </div>
            </div>
            <div class="arrows">
              <i class="fa-solid fa-chevron-left prev-tip"></i>
              <i class="fa-solid fa-chevron-right next-tip"></i>
            </div>
          </div>
        </div>
      </section>

      <!-- WHAT WE OFFER -->
      <section class="what-we-offer-section scroll-reveal">
        <h2 class="section-title">
          <img src="new-product.png" alt="icon" class="title-icon title-icon-left"/>
          <span data-key="offerTitle">What We Offer</span>
          <img src="reverse.png" alt="icon" class="title-icon title-icon-right"/>
        </h2>
        <div class="cards-container">
          <a href="aquaguard.php" class="offer-card-link">
            <div class="offer-card">
              <img src="console.png" alt="AquaGuard Icon" class="offer-icon"/>
              <h3 data-key="offer1Title">AquaGuard</h3>
              <p data-key="offer1Text">Game-based experience that teaches water conservation through challenges.</p>
            </div>
          </a>
          <a href="interactive-house.php" class="offer-card-link">
            <div class="offer-card">
              <img src="home.png" alt="Interactive House Icon" class="offer-icon"/>
              <h3 data-key="offer2Title">Interactive House</h3>
              <p data-key="offer2Text">Explore a virtual home and learn how daily actions affect water usage.</p>
            </div>
          </a>
          <a href="stories.php" class="offer-card-link">
            <div class="offer-card">
              <img src="impact.png" alt="Stories & Charts Icon" class="offer-icon"/>
              <h3 data-key="offer3Title">Stories & Charts</h3>
              <p data-key="offer3Text">Visual insights and real stories showing the impact of water consumption.</p>
            </div>
          </a>
          <a href="marketplace.php" class="offer-card-link">
            <div class="offer-card">
              <img src="shopping-cart.png" alt="Market Place Icon" class="offer-icon"/>
              <h3 data-key="offer4Title">Market Place</h3>
              <p data-key="offer4Text">Browse eco-friendly products that help reduce water consumption daily.</p>
            </div>
          </a>
        </div>
      </section>

    </section><!-- END main-section -->

    <!-- PRICING TEASER -->
    <section class="pricing-teaser scroll-reveal">
      <div class="pricing-teaser-inner">

        <div class="pricing-teaser-left">
          <div class="pricing-teaser-tag"><i class="fas fa-crown"></i> <span data-key="pricingTeaserTag">Plans & Pricing</span></div>
          <h2 class="pricing-teaser-title">
            <span data-key="pricingTeaserTitle1">Unlock the Full</span><br>
            <span class="pricing-teaser-highlight" data-key="pricingTeaserTitle2">AquaMind Experience</span>
          </h2>
          <p class="pricing-teaser-sub" data-key="pricingTeaserSub">
            From free stories to premium deep-dives — find the plan that fits your journey.
          </p>
          <a href="pricing.php" class="pricing-teaser-btn">
            <span data-key="pricingTeaserBtn">See All Plans</span>
            <i class="fas fa-arrow-right"></i>
          </a>
        </div>

        <div class="pricing-teaser-right">

          <!-- Free Plan -->
          <div class="pt-card pt-card--free">
            <div class="pt-card-top">
              <div class="pt-icon pt-icon--free">💧</div>
              <div>
                <div class="pt-plan-name" data-key="ptStdName">Standard</div>
                <div class="pt-plan-tag pt-tag--free" data-key="ptFree">Free</div>
              </div>
            </div>
            <div class="pt-price">EGP <span>0</span></div>
            <ul class="pt-features">
              <li><i class="fas fa-check"></i> <span data-key="ptFree1">4 Free stories & charts</span></li>
              <li><i class="fas fa-check"></i> <span data-key="ptFree2">AquaGuard basic levels</span></li>
              <li><i class="fas fa-check"></i> <span data-key="ptFree3">6 AI messages / day</span></li>
            </ul>
          </div>

          <!-- Premium Plan -->
          <div class="pt-card pt-card--premium">
            <div class="pt-popular" data-key="ptMostPop">✦ Most Popular</div>
            <div class="pt-card-top">
              <div class="pt-icon pt-icon--premium">⚡</div>
              <div>
                <div class="pt-plan-name">Premium</div>
                <div class="pt-plan-tag pt-tag--premium" data-key="ptPremiumOnly">Members Only</div>
              </div>
            </div>
            <div class="pt-price">EGP <span>99</span><small data-key="ptPerMo">/mo</small></div>
            <ul class="pt-features">
              <li><i class="fas fa-check"></i> <span data-key="ptPrem1">All 6 premium story books</span></li>
              <li><i class="fas fa-check"></i> <span data-key="ptPrem2">Advanced AquaGuard levels</span></li>
              <li><i class="fas fa-check"></i> <span data-key="ptPrem3">Unlimited AI chatbot</span></li>
            </ul>
            <a href="pricing.php" class="pt-cta-btn">
              <i class="fas fa-bolt"></i> <span data-key="ptUpgrade">Upgrade Now</span>
            </a>
          </div>

        </div>
      </div>
    </section>
    <!-- END PRICING TEASER -->

    <!-- COMMUNITY TEASER -->
    <section class="cm-teaser-section scroll-reveal">
      <div class="cm-teaser-inner">

        <!-- LEFT TEXT -->
        <div class="cm-teaser-text">
          <div class="cm-teaser-tag" data-key="cmTeaserTag">💬 Community</div>
          <h2 class="cm-teaser-title">
            <span data-key="cmTeaserTitle1">Join the</span><br>
            <span class="cm-teaser-highlight" data-key="cmTeaserTitle2">Conversation</span>
          </h2>
          <p class="cm-teaser-sub" data-key="cmTeaserSub">
            Ask questions, share water-saving tips, and connect with people who care about the Nile.
          </p>
          <a href="community.php" class="cm-teaser-btn">
            <span data-key="cmTeaserBtn">Explore Community</span>
            <i class="fas fa-arrow-right"></i>
          </a>
        </div>

        <!-- RIGHT PREVIEW CARDS (static mockup) -->
        <div class="cm-teaser-preview">
          <div class="cm-tp-card cm-tp-card--1">
            <div class="cm-tp-top">
              <div class="cm-tp-avatar">A</div>
              <div>
                <div class="cm-tp-author">Ahmed K.</div>
                <div class="cm-tp-time">2h ago</div>
              </div>
            </div>
            <div class="cm-tp-title" data-key="cmTp1Title">How much water does a dripping tap waste per day?</div>
            <div class="cm-tp-actions">
              <span><i class="fas fa-heart"></i> 14</span>
              <span><i class="fas fa-comment-alt"></i> 6 <span data-key="cmTpReplies">replies</span></span>
            </div>
          </div>

          <div class="cm-tp-card cm-tp-card--2">
            <div class="cm-tp-top">
              <div class="cm-tp-avatar" style="background:linear-gradient(135deg,#0891b2,#06b6d4)">S</div>
              <div>
                <div class="cm-tp-author">Sara M.</div>
                <div class="cm-tp-time">5h ago</div>
              </div>
            </div>
            <div class="cm-tp-title" data-key="cmTp2Title">Best practices for rainwater harvesting at home</div>
            <div class="cm-tp-actions">
              <span><i class="fas fa-heart"></i> 31</span>
              <span><i class="fas fa-comment-alt"></i> 12 <span data-key="cmTpReplies">replies</span></span>
            </div>
          </div>

          <div class="cm-tp-card cm-tp-card--3">
            <div class="cm-tp-top">
              <div class="cm-tp-avatar" style="background:linear-gradient(135deg,#0d9488,#14b8a6)">N</div>
              <div>
                <div class="cm-tp-author">Nour H.</div>
                <div class="cm-tp-time">1d ago</div>
              </div>
            </div>
            <div class="cm-tp-title" data-key="cmTp3Title">Why is the Nile water level dropping every year?</div>
            <div class="cm-tp-actions">
              <span><i class="fas fa-heart"></i> 48</span>
              <span><i class="fas fa-comment-alt"></i> 23 <span data-key="cmTpReplies">replies</span></span>
            </div>
          </div>

          <a href="community.php" class="cm-tp-join-btn" data-key="cmTeaserJoin">
            + Join the discussion
          </a>
        </div>

      </div>
    </section>
   
    <!-- END COMMUNITY TEASER -->
    <!-- CHATBOT HTML -->
    <!-- 💬 Community Float Button — Home Page Only -->
    
    <div id="chatbot-container">
        <div id="chatbot-bubble" class="chatbot-bubble">
            <img src="AquaMind_logo.png" alt="Chat">
        </div>
        <div id="chatbot-window" class="chatbot-window">
            <div class="chatbot-header">
                <div class="chatbot-header-info">
                    <img src="AquaMind_logo.png" alt="Logo" class="chatbot-logo-small">
                    <div>
                        <h4 class="chatbot-title" data-key="chatbotTitle">AquaMind Assistant</h4>
                        <p class="chatbot-subtitle" data-key="chatbotSubtitle">Online | Ask me anything!</p>
                    </div>
                </div>
                <button id="chatbot-close" class="chatbot-close">&times;</button>
            </div>
            <div id="chatbot-messages" class="chatbot-messages">
                <div class="message bot" data-key="chatbotWelcome">
                    Hello! 👋 I'm your AquaMind assistant. How can I help you save water today?
                </div>
            </div>
            <div class="chatbot-input-area">
                <input type="text" id="chatbot-input" class="chatbot-input" data-key="chatbotPlaceholder" placeholder="Type your question...">
                <button id="chatbot-send-btn" class="chatbot-send-btn">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    </div>

    <!-- ✅ JS FILES — مرة واحدة بس وفي الآخر -->
    <script src="script.js?v=<?php echo time(); ?>"></script>
    <script src="chatbot.js?v=<?php echo time(); ?>"></script>
    <?php include 'includes/footer.php'; ?>

    <!-- FOOTER -->
    <footer class="site-footer">
      <div class="footer-content">
        <div class="footer-col logo-col">
          <img src="nave pm.png" alt="AquaMind Logo" class="footer-logo"/>
          <p data-key="footerText">Empowering communities with smart water solutions for a sustainable future.</p>
        </div>
        <div class="footer-col links-col">
          <h4 data-key="footerLinks">Quick Links</h4>
          <ul>
            <li><a href="index.php"              data-key="home">Home</a></li>
            <li><a href="stories.php"            data-key="stories">Stories & Charts</a></li>
            <li><a href="aquaguard.php"          data-key="aquaguard">AquaGuard</a></li>
            <li><a href="interactive-house.php"  data-key="interactive">Interactive House</a></li>
            <li><a href="marketplace.php"        data-key="marketplace">Market Place</a></li>
            <li><a href="community.php"          data-key="community">Community</a></li>
          </ul>
        </div>
        <div class="footer-col social-col">
          <span class="social-label" data-key="followUs">Follow Us</span>
          <div class="social-icons-row">
            <a href="https://facebook.com"  target="_blank"><i class="fab fa-facebook-f"></i></a>
            <a href="https://instagram.com" target="_blank"><i class="fab fa-instagram"></i></a>
            <a href="https://tiktok.com"    target="_blank"><i class="fab fa-tiktok"></i></a>
            <a href="https://linkedin.com"  target="_blank"><i class="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        © 2026 AquaMind. <span data-key="footerRights">All rights reserved.</span>
      </div>
    </footer>
              <script>

const userToggle = document.getElementById("user-toggle");
const userMenu   = document.getElementById("user-menu");

if (userToggle && userMenu) {
    userToggle.addEventListener("click", e => {
        e.stopPropagation();
        userMenu.classList.toggle("show");
        langMenu.classList.remove("show");
    });
}

document.addEventListener("click", () => {
    if (userMenu) userMenu.classList.remove("show");
});

                </script>
  </body>
</html>

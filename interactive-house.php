<?php
if (session_status() === PHP_SESSION_NONE) session_start();
$isPremium = strtolower($_SESSION['account_type'] ?? '') === 'premium';
include 'includes/header.php'; 
?>

  <link rel="stylesheet" href="style.css?v=<?php echo time(); ?>">
  <link rel="stylesheet" href="interactive-house.css">
  <link rel="stylesheet" href="chatbot.css?v=<?php echo time(); ?>">
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Cairo:wght@400;600;700&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link rel="icon" type="image/png" href="AquaMind_logo.png" />

<!-- HERO -->
<section class="ih-hero">
  <div class="ih-hero-overlay"></div>
  <div class="ih-hero-particles" id="particles"></div>
  <div class="ih-hero-content">
    
<button type="button" class="ih-badge-btn"
  onclick="document.getElementById('interactive').scrollIntoView({behavior:'smooth'})">

  <span class="btn-label">
    <i class="fas fa-home"></i>
    <span data-key="ih_badge">Interactive Experience</span>
  </span>

  <span class="btn-arrows">
    <span></span>
    <span></span>
    <span></span>
  </span>

</button>
    <h1><span data-key="ih_hero_title_1">Your</span> <span class="ih-gradient-text" data-key="ih_hero_title_2">Smart Home</span><br><span data-key="ih_hero_title_3">Water Journey</span></h1>
    <p data-key="ih_hero_desc">Explore every room and discover how your daily habits impact water consumption. Click on a room to learn, save, and make a difference.</p>
    <div class="ih-hero-stats">
      <div class="ih-stat">
        <span class="ih-stat-num" data-target="340">0</span><span>L</span>
        <p data-key="ih_stat_1">Avg. daily usage per person</p>
      </div>
      <div class="ih-stat-divider"></div>
      <div class="ih-stat">
        <span class="ih-stat-num" data-target="40">0</span><span>%</span>
        <p data-key="ih_stat_2">Can be saved with smart habits</p>
      </div>
      <div class="ih-stat-divider"></div>
      <div class="ih-stat">
        <span class="ih-stat-num" data-target="3">0</span><span></span>
        <p data-key="ih_stat_3">Sections to explore</p>
      </div>
    </div>
  </div>
</section>

<!-- INTERACTIVE MAP SECTION -->
<section id="interactive" class="ih-interactive-map-section">

  <header class="ih-map-header">
    <h1 data-key="ih_map_title">Interactive Home</h1>
    <p data-key="ih_map_subtitle">Click a room · then hover or select an item to explore</p>
  </header>

  <div class="ih-stage" id="stage">

    <div class="ih-map-wrapper" id="imgWrapper">
      <img src="upscalemedia-transformed.png" alt="House cross-section" draggable="false">
    </div>

    <div class="ih-hotspots-layer" id="overlayAreas"></div>
    <div class="ih-items-layer"    id="itemLayer"></div>
    <div class="ih-vignette"></div>

    <!-- Side info panel -->
    <div class="ih-info-panel" id="infoPanel">
      <div class="ih-panel-header">
        <div class="ih-panel-room-name" id="panelRoomName"></div>
        <div class="ih-panel-subtitle" data-key="ih_panel_hint">Select an item to learn tips</div>
      </div>
      <div class="ih-panel-items" id="panelItems"></div>
    </div>

    <!-- Tip card -->
    <div class="ih-tip-card" id="tipCard">
      <div class="ih-tip-badge" data-key="ih_tip_badge">💡 Water Conservation Tip</div>
      <div class="ih-tip-title" id="tipTitle"></div>
      <p class="ih-tip-text" id="tipText"></p>
    </div>

    <!-- View More button -->
    <button class="ih-view-more-btn" id="viewMoreBtn">
      <span data-key="ih_btn_more">View More Details</span> <span class="arr">↓</span>
    </button>

  </div><!-- /.ih-stage -->

  <div class="ih-map-controls">
    <button class="ih-btn-reset" id="resetBtn">↩ <span data-key="ih_btn_reset">Reset View</span></button>
    <span class="ih-hint" data-key="ih_zoom_hint">Click any room to zoom in</span>
  </div>

  <div class="ih-room-details" id="roomDetails"></div>

</section>

<!-- PREMIUM INTERACTIVE HOUSES SECTION -->
<section class="ih-premium-section scroll-reveal">
  <div class="ih-premium-header">
    <div class="ih-section-label">
      <i class="fas fa-crown"></i> <span data-key="ih_prem_section">Premium Interactive Houses</span>
      <span class="ih-label-badge" data-key="ih_members_only">Members Only</span>
    </div>
    <p class="ih-premium-sub" data-key="ih_prem_sub">Explore specialized environments and learn advanced water conservation techniques from around the globe.</p>
  </div>

  <div class="ih-premium-grid">
    <?php
    $lang = $_SESSION['lang'] ?? 'en';
    $isAr = $lang === 'ar';
    $premiumHouses = [
      [
        'image' => 'assets/premium/eco-villa.jpg',
        'icon' => '🏡',
        'title' => $isAr ? 'الفيلا الذكية المستدامة' : 'Eco-Smart Villa',
        'title_key' => 'ih_house_eco_title',
        'sub' => $isAr ? 'أنظمة تدوير المياه الرمادية والري الذكي' : 'Greywater Recycling Systems & Smart Irrigation',
        'sub_key' => 'ih_house_eco_sub',
        'delay' => '0.1s'
      ],
      [
        'image' => 'assets/premium/desert-house.webp',
        'icon' => '🏜️',
        'title' => $isAr ? 'واحة الصحراء' : 'Desert Oasis',
        'title_key' => 'ih_house_desert_title',
        'sub' => $isAr ? 'الحفاظ على المياه في المناخات الجافة وتنسيق الحدائق الجافة' : 'Arid Climate Conservation & Xeriscaping',
        'sub_key' => 'ih_house_desert_sub',
        'delay' => '0.2s'
      ],
      [
        'image' => 'assets/premium/urban-apartment.webp',
        'icon' => '🏙️',
        'title' => $isAr ? 'الشقة العصرية' : 'Urban Apartment',
        'title_key' => 'ih_house_urban_title',
        'sub' => $isAr ? 'توفير المياه في ناطحات السحاب والحدائق الرأسية' : 'High-Rise Water Savings & Vertical Gardens',
        'sub_key' => 'ih_house_urban_sub',
        'delay' => '0.3s'
      ],
    ];

    foreach ($premiumHouses as $house): ?>
    <div class="ih-premium-card" style="animation-delay:<?= $house['delay'] ?>" onclick="<?= $isPremium ? 'showIhComingSoon()' : 'goToPricing()' ?>">
      <div class="ih-card-image" style="background-image: url('<?= $house['image'] ?>'); background-size: cover; background-position: center;">
        <div class="ih-lock-overlay">
          <div class="ih-lock-icon"><i class="fas fa-lock"></i></div>
          <div class="ih-lock-text" data-key="ih_unlock_overlay">Unlock House</div>
        </div>
      </div>
      <div class="ih-card-info">
        <div class="ih-card-tag"><i class="fas fa-crown"></i> <span data-key="ih_prem_tag">Premium</span></div>
        <h3 class="ih-card-title" data-key="<?= $house['title_key'] ?>"><?= $house['title'] ?></h3>
        <p class="ih-card-desc" data-key="<?= $house['sub_key'] ?>"><?= $house['sub'] ?></p>
        <button class="ih-read-btn">
          <i class="fas fa-lock"></i> <span data-key="ih_unlock_btn">Unlock Experience</span>
        </button>
      </div>
    </div>
    <?php endforeach; ?>
  </div>
</section>

<!-- Coming Soon Modal for Premium Houses -->
<div class="ih-modal-overlay" id="ihComingSoonModal" onclick="hideIhComingSoon(event)">
  <div class="ih-modal-box">
    <div class="ih-modal-icon"><i class="fas fa-crown"></i></div>
    <div class="ih-modal-badge" data-key="ih_modal_badge">Coming Soon</div>
    <h2 class="ih-modal-title" data-key="ih_modal_title">This House Is Under Construction</h2>
    <p class="ih-modal-text">
      <span data-key="ih_modal_text">We're working hard to bring you this interactive experience. Thank you for being a</span>
      <span class="ih-modal-gold" data-key="ih_modal_gold">Premium</span>
      <span data-key="ih_modal_text2">member — you'll be the first to explore it! 💧</span>
    </p>
    <div class="ih-modal-divider"></div>
    <p class="ih-modal-sub" data-key="ih_modal_stay">Stay tuned — new houses drop soon.</p>
    <button class="ih-modal-close-btn" onclick="hideIhComingSoon()">
      <i class="fas fa-check"></i> <span data-key="ih_modal_btn">Got it, thanks!</span>
    </button>
  </div>
</div>



<!-- 2. Chatbot HTML Structure -->
<div id="chatbot-container">
    <!-- Floating Bubble -->
    <div id="chatbot-bubble" class="chatbot-bubble">
        <!-- Replace 'AquaMind_logo.png' with your actual logo path if different -->
        <img src="AquaMind_logo.png" alt="Chat">
    </div>

    <!-- Chat Window -->
    <div id="chatbot-window" class="chatbot-window">
        <!-- Header -->
        <div class="chatbot-header">
            <div class="chatbot-header-info">
                <img src="AquaMind_logo.png" alt="Logo" class="chatbot-logo-small">
                <div>
                    <h4 class="chatbot-title">AquaMind Assistant</h4>
                    <p class="chatbot-subtitle">Online | Ask me anything!</p>
                </div>
            </div>
            <button id="chatbot-close" class="chatbot-close">&times;</button>
        </div>

        <!-- Messages Area -->
        <div id="chatbot-messages" class="chatbot-messages">
            <!-- Welcome Message -->
            <div class="message bot">
                Hello! 👋 I'm your AquaMind assistant. How can I help you save water today?
            </div>
        </div>

        <!-- Input Area -->
        <div class="chatbot-input-area">
            <input type="text" id="chatbot-input" class="chatbot-input" placeholder="Type your question...">
            <button id="chatbot-send-btn" class="chatbot-send-btn">
                <i class="fas fa-paper-plane"></i>
            </button>
        </div>
    </div>
</div>

<!-- 3. Chatbot Logic -->
<script src="chatbot.js"></script>
    

<!-- FOOTER -->
<footer class="site-footer">
  <div class="footer-content">
    <div class="footer-col logo-col">
      <img src="nave pm.png" alt="AquaMind Logo" class="footer-logo">
      <p data-key="footerText">Empowering communities with smart water solutions for a sustainable future.</p>
    </div>
    <div class="footer-col links-col">
      <h4 data-key="footerLinks">Quick Links</h4>
      <ul>
        <li><a href="index.php" data-key="home">Home</a></li>
        <li><a href="stories.php" data-key="stories">Stories &amp; Charts</a></li>
        <li><a href="aquaguard.php" data-key="aquaguard">AquaGuard</a></li>
        <li><a href="interactive-house.php" data-key="interactive">Interactive House</a></li>
        <li><a href="marketplace.php" data-key="marketplace">Market Place</a></li>
        <li><a href="community.php" data-key="community">Community</a></li>
      </ul>
    </div>
    <div class="footer-col social-col">
      <span class="social-label" data-key="followUs">Follow Us</span>
      <div class="social-icons-row">
        <a href="https://facebook.com" target="_blank"><i class="fab fa-facebook-f"></i></a>
        <a href="https://instagram.com" target="_blank"><i class="fab fa-instagram"></i></a>
        <a href="https://tiktok.com"    target="_blank"><i class="fab fa-tiktok"></i></a>
        <a href="https://linkedin.com"  target="_blank"><i class="fab fa-linkedin-in"></i></a>
      </div>
    </div>
  </div>
  <div class="footer-bottom">©2026 AquaMind. <span data-key="footerRights">All rights reserved.</span></div>
</footer>

<script src="script.js?v=<?php echo time(); ?>"></script>
<script src="Interactive.js"></script>
<script>
  // ── Go to pricing page ──
  function goToPricing() {
    window.location.href = 'pricing.php';
  }

  // ── Coming Soon Modal (for premium users) ──
  function showIhComingSoon() {
    const modal = document.getElementById('ihComingSoonModal');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function hideIhComingSoon(e) {
    if (e && e.target !== document.getElementById('ihComingSoonModal')) return;
    const modal = document.getElementById('ihComingSoonModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hideIhComingSoon();
  });
</script>
<?php include 'includes/footer.php'; ?>
</body>
</html>

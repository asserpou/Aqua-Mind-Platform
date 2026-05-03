<?php
if (session_status() === PHP_SESSION_NONE) session_start();
$isPremium = strtolower($_SESSION['account_type'] ?? '') === 'premium';
include 'includes/header.php';
?>
<link rel="stylesheet" href="style.css?v=<?php echo time(); ?>">
<link rel="stylesheet" href="premium-stories.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
<title>Premium Stories — AquaMind</title>

<!-- Hero -->
<section class="ps-hero">
  <div class="ps-hero-bg"></div>

  <div class="ps-hero-content">
    <div class="ps-crown-badge"><i class="fas fa-crown"></i> <span data-key="ps_crown_badge">Premium</span></div>
    <h1 class="ps-hero-title"><span data-key="ps_hero_title1">More Stories,</span><br><span class="ps-hero-grad" data-key="ps_hero_title2">More Impact</span></h1>
    <p class="ps-hero-sub" data-key="ps_hero_sub">Unlock deeper water crisis stories from around the world — backed by real data.</p>
  </div>
  <div class="ps-hero-wave">
    <svg viewBox="0 0 1200 80" preserveAspectRatio="none">
      <path d="M0,0 C300,60 600,60 900,30 L1200,15 L1200,80 L0,80 Z" fill="var(--ps-wave-fill)"/>
    </svg>
  </div>
</section>

<!-- Books Grid -->
<main class="ps-main">
  <div class="ps-container">

    <!-- Free story (unlocked) -->
    <div class="ps-section-label">
      <i class="fas fa-unlock"></i> <span data-key="ps_already_read">Already Read</span>
    </div>
    <div class="ps-books-grid ps-free-grid">
      <div class="ps-book ps-book--unlocked">
        <div class="ps-book-3d">
          <div class="ps-book-cover" style="background: linear-gradient(160deg,#0c4a6e,#0ea5e9)">
            <div class="ps-book-spine"></div>
            <div class="ps-book-cover-content">
              <div class="ps-book-icon">💧</div>
              <div class="ps-book-cover-title">Water Crisis<br>Stories & Data</div>
              <div class="ps-book-cover-sub">Egypt — Nile Drop</div>
            </div>
          </div>
          <div class="ps-book-shadow"></div>
        </div>
        <div class="ps-book-info">
          <div class="ps-book-tag ps-tag-free"><i class="fas fa-check"></i> <span data-key="ps_read_tag">Read</span></div>
          <h3 class="ps-book-title">Nile Drop: Volume I</h3>
          <p class="ps-book-desc">4 stories from Egypt — sinai, delta, cairo and the summer crisis.</p>
          <a href="stories.php" class="ps-read-btn ps-read-btn--free">
            <i class="fas fa-book-open"></i> <span data-key="ps_read_again">Read Again</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Premium stories (locked) -->
    <div class="ps-section-label ps-label-premium">
      <i class="fas fa-crown"></i> <span data-key="ps_prem_section">Premium Stories</span>
      <span class="ps-label-badge" data-key="ps_members_only">Members Only</span>
    </div>

    <div class="ps-books-grid">
      <?php
      $lang = $_SESSION['lang'] ?? 'en';
      $isAr = $lang === 'ar';
      $premiumBooks = [
        [
          'gradient'=>'linear-gradient(160deg,#4a1942,#9333ea)',
          'icon'=>'🌊',
          'title'=> $isAr ? 'صعود الأمازون' : 'Amazon Rising',
          'sub'=>   $isAr ? 'البرازيل — حروب المياه' : 'Brazil — Water Wars',
          'name'=>  $isAr ? 'صعود الأمازون: الجزء الأول' : 'Amazon Rising: Vol I',
          'desc'=>  $isAr ? '5 قصص من حوض الأمازون — الجفاف والصمود.' : '5 stories from the Amazon basin — drought, and resilience.',
          'pages'=>48,'delay'=>'0.1s'
        ],
        [
          'gradient'=>'linear-gradient(160deg,#064e3b,#10b981)',
          'icon'=>'🏔️',
          'title'=> $isAr ? 'مراقبة الجليد' : 'Glacier Watch',
          'sub'=>   $isAr ? 'جبال الهيمالايا — أزمة الذوبان' : 'Himalayas — Melting Crisis',
          'name'=>  $isAr ? 'مراقبة الجليد' : 'Glacier Watch',
          'desc'=>  $isAr ? '6 قصص من قرى الهيمالايا تفقد خزاناتها المائية.' : '6 stories of Himalayan villages losing their water towers.',
          'pages'=>60,'delay'=>'0.2s'
        ],
        [
          'gradient'=>'linear-gradient(160deg,#7c2d12,#f97316)',
          'icon'=>'🌵',
          'title'=> $isAr ? 'عطش الصحراء' : 'Sahara Thirst',
          'sub'=>   $isAr ? 'أفريقيا جنوب الصحراء' : 'Sub-Saharan Africa',
          'name'=>  $isAr ? 'عطش الصحراء' : 'Sahara Thirst',
          'desc'=>  $isAr ? '7 قصص من 5 دول أفريقية تواجه التصحر.' : '7 stories across 5 African countries battling desertification.',
          'pages'=>72,'delay'=>'0.3s'
        ],
        [
          'gradient'=>'linear-gradient(160deg,#1e3a5f,#3b82f6)',
          'icon'=>'🐋',
          'title'=> $isAr ? 'البحر الميت يرتفع' : 'Dead Sea Rising',
          'sub'=>   $isAr ? 'الشرق الأوسط — أزمة الملح' : 'Middle East — Salt Crisis',
          'name'=>  $isAr ? 'البحر الميت يرتفع' : 'Dead Sea Rising',
          'desc'=>  $isAr ? '4 قصص عن تقلص البحر الميت وتأثيراته.' : '4 stories about the shrinking of the Dead Sea and its effects.',
          'pages'=>40,'delay'=>'0.4s'
        ],
        [
          'gradient'=>'linear-gradient(160deg,#134e4a,#14b8a6)',
          'icon'=>'🌏',
          'title'=> $isAr ? 'صمت ميكونج' : 'Mekong Silence',
          'sub'=>   $isAr ? 'جنوب شرق آسيا' : 'Southeast Asia',
          'name'=>  $isAr ? 'صمت ميكونج' : 'Mekong Silence',
          'desc'=>  $isAr ? '5 قصص عن السياسة ومجتمعات الصيد على نهر ميكونج.' : '5 stories about politics and fishing communities along the Mekong.',
          'pages'=>55,'delay'=>'0.5s'
        ],
        [
          'gradient'=>'linear-gradient(160deg,#312e81,#6366f1)',
          'icon'=>'🏙️',
          'title'=> $isAr ? 'كيب تاون: اليوم صفر' : 'Cape Town: Day Zero',
          'sub'=>   $isAr ? 'جنوب أفريقيا' : 'South Africa',
          'name'=>  $isAr ? 'كيب تاون: اليوم صفر' : 'Cape Town: Day Zero',
          'desc'=>  $isAr ? '3 قصص من المدينة التي كادت تنفد منها المياه عام 2018.' : '3 stories from the city that nearly ran out of water in 2018.',
          'pages'=>36,'delay'=>'0.6s'
        ],
      ];
      foreach ($premiumBooks as $book): ?>
      <div class="ps-book ps-book--locked" style="animation-delay:<?= $book['delay'] ?>" onclick="<?= $isPremium ? 'showComingSoon()' : 'goToPricing()' ?>">
        <div class="ps-book-3d">
          <div class="ps-book-cover" style="background: <?= $book['gradient'] ?>">
            <div class="ps-book-spine"></div>
            <div class="ps-book-cover-content">
              <div class="ps-book-icon"><?= $book['icon'] ?></div>
              <div class="ps-book-cover-title"><?= $book['title'] ?></div>
              <div class="ps-book-cover-sub"><?= $book['sub'] ?></div>
            </div>
            <div class="ps-lock-overlay">
              <div class="ps-lock-icon"><i class="fas fa-lock"></i></div>
              <div class="ps-lock-text" data-key="ps_unlock_overlay">Unlock</div>
            </div>
          </div>
          <div class="ps-book-shadow"></div>
        </div>
        <div class="ps-book-info">
          <div class="ps-book-tag ps-tag-premium"><i class="fas fa-crown"></i> <span data-key="ps_prem_tag">Premium</span></div>
          <h3 class="ps-book-title"><?= $book['name'] ?></h3>
          <p class="ps-book-desc"><?= $book['desc'] ?></p>
          <div class="ps-book-meta"><?= $book['pages'] ?> <span data-key="ps_pages">pages</span></div>
          <button class="ps-read-btn ps-read-btn--locked">
            <i class="fas fa-lock"></i> <span data-key="ps_unlock_btn">Unlock Story</span>
          </button>
        </div>
      </div>
      <?php endforeach; ?>

    </div><!-- end books grid -->
  </div><!-- end container -->
</main>

<!-- Coming Soon Modal -->
<div class="ps-modal-overlay" id="psComingSoonModal" onclick="hideComingSoon(event)">
  <div class="ps-modal-box">
    <div class="ps-modal-icon"><i class="fas fa-crown"></i></div>
    <div class="ps-modal-badge" data-key="ps_modal_badge">Coming Soon</div>
    <h2 class="ps-modal-title" data-key="ps_modal_title">This Story Is On Its Way</h2>
    <p class="ps-modal-text">
      <span data-key="ps_modal_text">We're working hard to bring you this story. Thank you for being a</span>
      <span class="ps-modal-gold" data-key="ps_modal_gold">Premium</span>
      <span data-key="ps_modal_text2">member — you'll be the first to access it! 🌊</span>
    </p>
    <div class="ps-modal-divider"></div>
    <p class="ps-modal-sub" data-key="ps_modal_stay">Stay tuned — new stories drop every month.</p>
    <button class="ps-modal-close-btn" onclick="hideComingSoon()">
      <i class="fas fa-check"></i> <span data-key="ps_modal_btn">Got it, thanks!</span>
    </button>
  </div>
</div>

<!-- Footer -->
<footer class="site-footer">
  <div class="footer-content">
    <div class="footer-col logo-col">
      <img src="nave pm.png" alt="AquaMind Logo" class="footer-logo"/>
      <p data-key="footerText">Empowering communities with smart water solutions for a sustainable future.</p>
    </div>
    <div class="footer-col links-col">
      <h4 data-key="footerLinks">Quick Links</h4>
      <ul>
        <li><a href="index.php" data-key="home">Home</a></li>
        <li><a href="stories.php" data-key="stories">Stories & Charts</a></li>
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
        <a href="https://tiktok.com" target="_blank"><i class="fab fa-tiktok"></i></a>
        <a href="https://linkedin.com" target="_blank"><i class="fab fa-linkedin-in"></i></a>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    ©
    2026 AquaMind. <span data-key="footerRights">All rights reserved.</span>
  </div>
</footer>

<script src="script.js?v=<?php echo time(); ?>"></script>
<script>
  // ── Go to pricing page ──
  function goToPricing() {
    window.location.href = 'pricing.php';
  }

  // ── Coming Soon Modal (for premium users) ──
  function showComingSoon() {
    const modal = document.getElementById('psComingSoonModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function hideComingSoon(e) {
    if (e && e.target !== document.getElementById('psComingSoonModal')) return;
    const modal = document.getElementById('psComingSoonModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hideComingSoon();
  });

  // ── Theme — syncs with navbar (body.dark-mode) ─────
  (function() {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  })();
</script>

<?php include 'includes/footer.php'; ?>
</body>
</html>

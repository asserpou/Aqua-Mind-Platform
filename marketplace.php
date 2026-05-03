<?php include 'includes/header.php'; ?>


    <meta charset="UTF-8">
    <title>MarketPlace - AquaMind</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- CSS -->
    <link rel="stylesheet" href="style.css?v=<?php echo time(); ?>">
    <link rel="stylesheet" href="marketplace.css">
    <link rel="stylesheet" href="chatbot.css?v=<?php echo time(); ?>">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="AquaMind_logo.png" />


    <!-- HERO -->
    <section class="marketplace-hero">
        <div class="wave-header">
            <div class="overlay"></div>

            <div class="hero-content">
                <h1>
                    <span data-i18n="heroTitle1">Smart Water Solutions</span><br>
                    <span data-i18n="heroTitle2">FOR SMART LIVING</span>
                </h1>
                <p class="hero-subtitle" data-i18n="heroSubtitle">Discover innovative products designed to help you save water and protect the environment</p>
            </div>

        </div>
    </section>



    <!-- MAIN CONTENT -->
    <section class="products-section" id="products-section">
        <div class="container">
            <div class="section-header-row">
                <div class="titles">
                    <h2 class="section-title" data-i18n="productsSectionTitle">Our Products</h2>
                    <p class="section-subtitle" data-i18n="productsSectionSubtitle">Discover our range of innovative water solutions</p>
                </div>
                
                <!-- AI Search Bar -->
                <div class="ai-search-container">
                    <div class="ai-search-box">
                        <input type="text" id="aiSearchInput" data-i18n-placeholder="aiSearchPlaceholder" placeholder="Ask AI to find a product...">
                        <button id="aiSearchBtn" class="ai-search-btn"><i class="fas fa-search"></i></button>
                    </div>
                    <div id="aiSearchStatus" class="ai-search-status"></div>
                </div>
            </div>

            <div class="carousel-wrapper">
                <button id="prevBtn" class="carousel-btn prev-btn"><i class="fas fa-chevron-left"></i></button>
                <div class="carousel-viewport">
                    <div class="products-grid" id="productsGrid">
                        <!-- Products will be loaded here by JavaScript -->
                    </div>
                </div>
                <button id="nextBtn" class="carousel-btn next-btn"><i class="fas fa-chevron-right"></i></button>
            </div>
        </div>
    </section>



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
        <!-- Logo -->
        <div class="footer-col logo-col">
          <img src="nave pm.png" alt="AquaMind Logo" class="footer-logo" />
          <p data-key="footerText">
            Empowering communities with smart water solutions for a sustainable future.
          </p>
        </div>

        <!-- Quick Links -->
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

        <!-- Social -->
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
    <script type="module" src="marketplace.js"></script>
    <?php include 'includes/footer.php'; ?>

</body>

</html>

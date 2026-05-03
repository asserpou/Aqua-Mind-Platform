<?php include 'includes/header.php'; 

$host = 'localhost';
$user = 'root';
$pass = '';
$db = 'nilevo';

$conn = mysqli_connect($host, $user, $pass, $db);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$isLoggedIn = isset($_SESSION['user_id']);
$userData = [];

if ($isLoggedIn) {
    $userId = $_SESSION['user_id'];
    $sql = "SELECT first_name, last_name, email FROM user WHERE user_id = '$userId' LIMIT 1";
    $result = mysqli_query($conn, $sql);
    if ($result && mysqli_num_rows($result) > 0) {
        $userData = mysqli_fetch_assoc($result);
    }
}
?>

    <meta charset="UTF-8">
    <title>Product Details - AquaMind</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- CSS -->
    <link rel="stylesheet" href="style.css?v=<?php echo time(); ?>">
    <link rel="stylesheet" href="product-details.css">
    <link rel="stylesheet" href="chatbot.css?v=<?php echo time(); ?>">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="AquaMind_logo.png" />
    
    <!-- Pass PHP Data to JS -->
    <script>
        const USER_DATA = {
            isLoggedIn: <?php echo json_encode($isLoggedIn); ?>,
            firstName: <?php echo json_encode($userData['first_name'] ?? ''); ?>,
            lastName: <?php echo json_encode($userData['last_name'] ?? ''); ?>,
            email: <?php echo json_encode($userData['email'] ?? ''); ?>
        };
    </script>

    <!-- MAIN CONTENT -->
    <section class="product-details-section">
        <div class="container">
            <div class="product-header">
                <h1 class="product-title" id="productTitle"></h1>
                <div class="product-price-rating">
                    <span class="product-price" id="productPrice"></span>
                    <div class="product-rating" id="productRating"></div>
                </div>
            </div>

            <div class="product-content">
                <div class="product-gallery">
                    <div class="main-image">
                        <img id="mainImage" src="" alt="Product Image">
                    </div>
                    <div class="thumbnail-images" id="thumbnailImages">
                        <!-- Thumbnails will be loaded here -->
                    </div>
                </div>

                <div class="product-info-panel">
                    <div class="info-section">
                        <h2 data-i18n="descriptionTitle">Description</h2>
                        <p id="productDescription"></p>
                    </div>

                    <div class="info-section">
                        <h2 data-i18n="usesTitle">Uses</h2>
                        <ul id="productUses"></ul>
                    </div>

                    <div class="purchase-section">
                        <div class="price-quantity">
                            <span class="price-large" id="priceLarge"></span>
                            <div class="quantity-control">
                                <button class="qty-btn" onclick="decreaseQuantity()">−</button>
                                <input type="number" id="quantity" value="1" min="1" readonly>
                                <button class="qty-btn" onclick="increaseQuantity()">+</button>
                            </div>
                        </div>
                        
                        <?php if ($isLoggedIn): ?>
                            <!-- حقل القسيمة -->
                            <div class="pd-voucher-row">
                                <input
                                    type="text"
                                    id="pdVoucherInput"
                                    class="pd-voucher-input"
                                    placeholder="Have a voucher? Enter code"
                                    maxlength="20"
                                    style="text-transform:uppercase"
                                >
                                <button class="pd-voucher-btn" onclick="applyVoucher()" data-i18n-placeholder="voucherPlaceholder">
                                    Apply
                                </button>
                            </div>
                            <p class="pd-voucher-msg" id="pdVoucherMsg"></p>
                            <button class="buy-now-btn" onclick="buyNow()" data-i18n="buyNowBtn">Buy Now</button>
                        <?php else: ?>
                            <div class="login-prompt">
                                <p data-i18n="loginToBuy">Please login to purchase</p>
                                <a href="login.php" class="login-btn-small" data-i18n="loginBtn">Login</a>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>

            <div class="back-button-container">
                <button class="back-to-products-btn" onclick="window.location.href='marketplace.php#products-section'">
                    <i class="fas fa-arrow-left"></i> <span data-i18n="backToProducts">Back to Products</span>
                </button>
            </div>
        </div>
    </section>

    <!-- Chatbot -->
    <div id="chatbot-container">
        <div id="chatbot-bubble" class="chatbot-bubble">
            <img src="AquaMind_logo.png" alt="Chat">
        </div>
        <div id="chatbot-window" class="chatbot-window">
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
            <div id="chatbot-messages" class="chatbot-messages">
                <div class="message bot">
                    Hello! 👋 I'm your AquaMind assistant. How can I help you save water today?
                </div>
            </div>
            <div class="chatbot-input-area">
                <input type="text" id="chatbot-input" class="chatbot-input" placeholder="Type your question...">
                <button id="chatbot-send-btn" class="chatbot-send-btn">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    </div>
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
    <script type="module" src="product-details.js"></script>
    <?php include 'includes/footer.php'; ?>
</body>

</html>

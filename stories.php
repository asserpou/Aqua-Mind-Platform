<?php include 'includes/header.php'; ?>

<link rel="stylesheet" href="stories.css" />
<script src="https://cdn.jsdelivr.net/npm/page-flip@2.0.7/dist/js/page-flip.browser.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

    <section class="stories-hero">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 data-key="pageTitle">Stories & Charts</h1>
        <p class="breadcrumb">
          <a href="index.php" data-key="home">Home</a>
          <span class="separator">></span>
          <span data-key="stories">Stories & Charts</span>
        </p>
      </div>
      <div class="wave-divider">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,0 C300,80 600,80 900,40 L1200,20 L1200,120 L0,120 Z"
            fill="#f0f5fb"
          ></path>
        </svg>
      </div>
    </section>

    <section class="main-section">
      <div class="flipbook-side">
        <div id="book-container"></div>
        <div class="book-controls" id="book-controls">
          <button class="book-btn" id="btn-prev">PREVIOUS</button>
          <span id="page-info">Loading Nile Drop Book...</span>
          <button class="book-btn" id="btn-next">NEXT</button>
        </div>
      </div>

      <div class="charts-side">
        <div id="slide-cover" class="active">
          <div class="cover-icon">💧</div>
          <h2 class="cover-title">Water Crisis<br />Stories & Data</h2>
          <p class="cover-subtitle">Egypt — Nile Drop Initiative</p>
          <div class="cover-stats">
            <div class="cover-stat">
              <span class="num">4</span><span class="lbl">Stories</span>
            </div>
            <div class="cover-stat">
              <span class="num">40M+</span><span class="lbl">Affected</span>
            </div>
            <div class="cover-stat">
              <span class="num">2B L</span><span class="lbl">Saved</span>
            </div>
          </div>
          <p class="cover-hint">
            <i class="fas fa-hand-point-right"></i> Flip the book to explore
            data
          </p>
        </div>

        <div class="story-slide" id="slide-1">
          <div class="story-label">
            The Day the Wells Ran Dry<small>Sinai, Egypt</small>
          </div>
          <div class="charts-grid">
            <div class="chart-card">
              <h3>Groundwater Levels (2010–2017)</h3>
              <div class="chart-container">
                <canvas id="groundwaterChart1"></canvas>
              </div>
              <div class="chart-stat">
                <span class="stat-value">40%</span
                ><span class="stat-label">decrease in 7 years</span>
              </div>
            </div>
            <div class="chart-card">
              <h3>Water Usage: Before &amp; After</h3>
              <div class="chart-container">
                <canvas id="usageChart1"></canvas>
              </div>
              <div class="chart-stat">
                <span class="stat-value">30%</span
                ><span class="stat-label">Reduction</span>
              </div>
            </div>
            <div class="chart-card pools-card">
              <div class="pools-grid">
                <div class="pool-icon full">
                  <i class="fas fa-swimming-pool"></i>
                </div>
                <div class="pool-icon full">
                  <i class="fas fa-swimming-pool"></i>
                </div>
                <div class="pool-icon full">
                  <i class="fas fa-swimming-pool"></i>
                </div>
                <div class="pool-icon full">
                  <i class="fas fa-swimming-pool"></i>
                </div>
                <div class="pool-icon empty">
                  <i class="fas fa-swimming-pool"></i>
                </div>
                <div class="pool-icon empty">
                  <i class="fas fa-swimming-pool"></i>
                </div>
                <div class="pool-icon empty">
                  <i class="fas fa-swimming-pool"></i>
                </div>
                <div class="pool-icon empty">
                  <i class="fas fa-swimming-pool"></i>
                </div>
              </div>
              <p class="pools-text">
                Equivalent to <strong>8</strong> Olympic pools lost
              </p>
            </div>
            <div class="chart-card">
              <h3>Daily Consumption per Person</h3>
              <div class="chart-container">
                <canvas id="consumptionChart1"></canvas>
              </div>
              <div class="chart-stat">
                <span class="stat-value">50L</span
                ><span class="stat-label">rationed per person/day</span>
              </div>
            </div>
          </div>
        </div>

        <div class="story-slide" id="slide-2">
          <div class="story-label">
            The River That Forgot to Flow<small>Nile Delta, Egypt</small>
          </div>
          <div class="charts-grid">
            <div class="chart-card">
              <h3>Nile River Flow (2015–2020)</h3>
              <div class="chart-container">
                <canvas id="riverFlowChart2"></canvas>
              </div>
              <div class="chart-stat">
                <span class="stat-value">35%</span
                ><span class="stat-label">decrease in flow</span>
              </div>
            </div>
            <div class="chart-card">
              <h3>Crop Yields Impact</h3>
              <div class="chart-container">
                <canvas id="cropChart2"></canvas>
              </div>
              <div class="chart-stat">
                <span class="stat-value">45%</span
                ><span class="stat-label">Yield Reduction</span>
              </div>
            </div>
            <div class="chart-card">
              <h3>Smart Irrigation Savings</h3>
              <div class="chart-container">
                <canvas id="irrigationChart2"></canvas>
              </div>
              <div class="chart-stat">
                <span class="stat-value">25%</span
                ><span class="stat-label">Water Saved</span>
              </div>
            </div>
            <div class="chart-card pools-card">
              <div class="people-stats-wrap">
                <div class="people-stat">
                  <i class="fas fa-users"></i>
                  <h2>15M</h2>
                  <p>People Affected</p>
                </div>
                <div class="people-stat">
                  <i class="fas fa-tint"></i>
                  <h2>25%</h2>
                  <p>Water Saved</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="story-slide" id="slide-3">
          <div class="story-label">
            The City That Learned to Save<small>Cairo, Egypt</small>
          </div>
          <div class="charts-grid">
            <div class="chart-card">
              <h3>Household Water Use (2018–2021)</h3>
              <div class="chart-container">
                <canvas id="householdChart3"></canvas>
              </div>
              <div class="chart-stat">
                <span class="stat-value">28%</span
                ><span class="stat-label">reduction achieved</span>
              </div>
            </div>
            <div class="chart-card">
              <h3>Infrastructure Improvements</h3>
              <div class="chart-container">
                <canvas id="infrastructureChart3"></canvas>
              </div>
              <div class="chart-stat">
                <span class="stat-value">12K</span
                ><span class="stat-label">Leaks Fixed</span>
              </div>
            </div>
            <div class="chart-card pools-card">
              <div class="people-stats-wrap">
                <div class="people-stat">
                  <i class="fas fa-water"></i>
                  <h2>2B</h2>
                  <p>Liters Saved</p>
                </div>
                <div class="people-stat">
                  <i class="fas fa-check-circle"></i>
                  <h2>500K</h2>
                  <p>Smart Meters</p>
                </div>
              </div>
            </div>
            <div class="chart-card">
              <h3>Annual Water Savings (Billion L)</h3>
              <div class="chart-container">
                <canvas id="savingsChart3"></canvas>
              </div>
              <div class="chart-stat">
                <span class="stat-value">2B</span
                ><span class="stat-label">liters/year saved</span>
              </div>
            </div>
          </div>
        </div>

        <div class="story-slide" id="slide-4">
          <div class="story-label">
            The Summer Cairo Almost Ran Dry<small
              >Cairo, Egypt — Summer 2018</small
            >
          </div>
          <div class="charts-grid">
            <div class="chart-card">
              <h3>Waste Reduction After Campaign</h3>
              <div class="chart-container">
                <canvas id="reductionChart4"></canvas>
              </div>
              <div class="chart-stat">
                <span class="stat-value">15%</span
                ><span class="stat-label">waste reduced in 1 year</span>
              </div>
            </div>
            <div class="chart-card">
              <h3>Daily Water Consumption (M m³)</h3>
              <div class="chart-container">
                <canvas id="consumptionChart4"></canvas>
              </div>
              <div class="chart-stat">
                <span class="stat-value">25%</span
                ><span class="stat-label">surge in consumption</span>
              </div>
            </div>
            <div class="chart-card">
              <h3>Water Lost to Leaks</h3>
              <div class="chart-container">
                <canvas id="leaksChart4"></canvas>
              </div>
              <div class="chart-stat">
                <span class="stat-value">20%</span
                ><span class="stat-label">of treated water wasted</span>
              </div>
            </div>

            <div class="chart-card pools-card">
              <div class="people-stats-wrap">
                <div class="people-stat">
                  <i class="fas fa-swimming-pool"></i>
                  <h2>4K</h2>
                  <p>Pools/Day Used</p>
                </div>
                <div class="people-stat">
                  <i class="fas fa-users"></i>
                  <h2>1M</h2>
                  <p>Citizens at Risk</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- SLIDE END — يظهر لما الكتاب يخلص -->
        <div class="story-slide" id="slide-end">
          <div class="slide-end-wrap">
            <div class="slide-end-icon">📖</div>
            <h2 class="slide-end-title" data-key="endTitle">You've reached the end!</h2>
            <p class="slide-end-sub" data-key="endSub">Want to explore more water stories from around the world?</p>
            <a href="premium-stories.php" class="slide-end-btn">
              <i class="fas fa-crown"></i>
              <span data-key="endBtn">Explore More Stories</span>
            </a>
            <p class="slide-end-hint" data-key="endHint">Premium content • Unlock all stories</p>
          </div>
        </div>

        <div class="charts-indicators">
          <div class="charts-dot active" data-slide="cover"></div>
          <div class="charts-dot" data-slide="1"></div>
          <div class="charts-dot" data-slide="2"></div>
          <div class="charts-dot" data-slide="3"></div>
          <div class="charts-dot" data-slide="4"></div>
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
            <a href="https://tiktok.com" target="_blank"><i class="fab fa-tiktok"a></i></a>
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
    <script src="stories.js"></script>
    <?php include 'includes/footer.php'; ?>
  </body>
</html>

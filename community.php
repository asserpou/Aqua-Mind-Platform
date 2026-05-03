<?php
include 'includes/header.php';

$conn = mysqli_connect('localhost', 'root', '', 'nilevo');
$isLoggedIn = isset($_SESSION['user_id']);
$userData = [];
if ($isLoggedIn) {
    $uid = (int)$_SESSION['user_id'];
    $res = mysqli_query($conn, "SELECT first_name, last_name, email FROM user WHERE user_id=$uid LIMIT 1");
    if ($res) $userData = mysqli_fetch_assoc($res);
}
?>
    <meta charset="UTF-8">
    <title>Community - AquaMind</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css?v=<?php echo time(); ?>">
    <link rel="stylesheet" href="community.css?v=<?php echo time(); ?>">
    <link rel="stylesheet" href="chatbot.css?v=<?php echo time(); ?>">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="icon" type="image/png" href="AquaMind_logo.png">
    <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap" rel="stylesheet">

    <script>
    const CM_USER = {
        isLoggedIn: <?= json_encode($isLoggedIn) ?>,
        name: <?= json_encode(trim(($userData['first_name']??'').' '.($userData['last_name']??''))) ?>,
        email: <?= json_encode($userData['email'] ?? '') ?>
    };
    </script>

    <!-- HERO -->
    <section class="cm-hero">
        <div class="cm-hero-bg"></div>
        <div class="cm-hero-content">
            <div class="cm-hero-tag" data-key="cm_hero_tag">💧 AquaMind</div>
            <h1 class="cm-hero-title" data-key="cm_hero_title">Community</h1>
            <p class="cm-hero-sub" data-key="cm_hero_sub">Ask questions, share ideas, protect the Nile together</p>
        </div>
        <div class="cm-waves">
            <svg viewBox="0 24 150 28" preserveAspectRatio="none">
                <defs><path id="cp" d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z"/></defs>
                <g class="cm-moving-waves">
                    <use href="#cp" x="48" y="0" />
                    <use href="#cp" x="48" y="3" />
                    <use href="#cp" x="48" y="6" />
                </g>
            </svg>
        </div>
    </section>

    <!-- MAIN -->
    <main class="cm-main">
        <div class="cm-layout">

            <!-- LEFT: New Post + Feed -->
            <div class="cm-feed-col">

                <!-- Daily Challenge Section -->
                <div class="cm-challenge-card" id="dailyChallengeCard">
                    <div class="cm-challenge-header">
                        <div class="cm-ch-icon"><i class="fas fa-trophy"></i></div>
                        <div>
                            <h3 data-key="cm_challenge_title">تحدي المياه اليومي</h3>
                            <p data-key="cm_challenge_sub">أجب على 10 أسئلة بشكل صحيح لتفوز بخصم 5% في المتجر!</p>
                        </div>
                    </div>
                    <div class="cm-challenge-body" id="challengeBody">
                        <button class="cm-ch-start-btn" id="startChallengeBtn" data-key="cm_challenge_start">ابدأ التحدي</button>
                    </div>
                </div>

                <!-- New Post Box -->
                <?php if ($isLoggedIn): ?>
                <div class="cm-new-post" id="cmNewPost">
                    <div class="cm-np-header" id="cmNpToggle">
                        <div class="cm-np-avatar"><?= strtoupper(substr($userData['first_name']??'A',0,1)) ?></div>
                        <div class="cm-np-placeholder" data-key="cm_np_placeholder">What's on your mind? Start a discussion...</div>
                        <button class="cm-np-expand-btn"><i class="fas fa-pen"></i> <span data-key="cm_np_btn">New Post</span></button>
                    </div>
                    <div class="cm-np-form" id="cmNpForm" style="display:none">
                        <input type="text" id="cmPostTitle" class="cm-post-title-input" placeholder="Post title — make it clear and specific" maxlength="255" data-key-ph="cm_np_title_ph">
                        <textarea id="cmPostBody" class="cm-post-body-input" placeholder="Describe your question or idea in detail..." rows="5" data-key-ph="cm_np_body_ph"></textarea>
                        <!-- Image Upload -->
                        <div class="cm-img-upload-row">
                            <label class="cm-img-upload-label" for="cmPostImage">
                                <i class="fas fa-image"></i>
                                <span data-key="cm_add_image">Add Image</span>
                            </label>
                            <input type="file" id="cmPostImage" accept="image/*" style="display:none">
                            <div class="cm-img-preview-wrap" id="cmImgPreviewWrap" style="display:none">
                                <img id="cmImgPreview" class="cm-img-preview" src="" alt="preview">
                                <button class="cm-img-remove" id="cmImgRemove" type="button">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
                        <div class="cm-np-actions">
                            <span class="cm-char-count" id="cmTitleCount">0/255</span>
                            <button class="cm-cancel-btn" id="cmCancelPost" data-key="cm_np_cancel">Cancel</button>
                            <button class="cm-submit-btn" id="cmSubmitPost"><i class="fas fa-paper-plane"></i> <span data-key="cm_np_submit">Post</span></button>
                        </div>
                    </div>
                </div>
                <?php else: ?>
                <div class="cm-login-nudge">
                    <span>💬</span>
                    <p>Join the conversation — <a href="login.php">sign in</a> to post or reply</p>
                </div>
                <?php endif; ?>

                <!-- Sort Bar -->
                <div class="cm-sort-bar">
                    <span class="cm-sort-label" data-key="cm_sort_label">Sort by:</span>
                    <button class="cm-sort-btn active" data-sort="new" data-key="cm_sort_new">🕐 New</button>
                    <button class="cm-sort-btn" data-sort="top" data-key="cm_sort_top">🔥 Top</button>
                </div>

                <!-- Posts Feed -->
                <div id="cmFeed" class="cm-feed">
                    <div class="cm-loading"><div class="cm-spinner"></div></div>
                </div>

                <!-- Pagination -->
                <div class="cm-pagination" id="cmPagination"></div>
            </div>

            <!-- RIGHT: Sidebar -->
            <aside class="cm-sidebar">
                <div class="cm-sidebar-card cm-about-card">
                    <h3 data-key="cm_about_title">🌊 About Community</h3>
                    <p data-key="cm_about_text">A space for AquaMind users to ask questions, share water-saving tips, and discuss environmental topics.</p>
                    <div class="cm-rules">
                        <div class="cm-rule"><span>1</span> <span data-key="cm_rule1">Be respectful</span></div>
                        <div class="cm-rule"><span>2</span> <span data-key="cm_rule2">Stay on topic</span></div>
                        <div class="cm-rule"><span>3</span> <span data-key="cm_rule3">No spam</span></div>
                        <div class="cm-rule"><span>4</span> <span data-key="cm_rule4">Share knowledge</span></div>
                    </div>
                </div>
                <div class="cm-sidebar-card cm-stats-card" id="cmStats">
                    <h3 data-key="cm_stats_title">📊 Stats</h3>
                    <div class="cm-stat-row"><i class="fas fa-scroll"></i> <span id="statPosts">–</span> <span data-key="cm_stats_posts">posts</span></div>
                </div>
                <?php if ($isLoggedIn): ?>
                <div class="cm-sidebar-card cm-user-card">
                    <div class="cm-uc-avatar"><?= strtoupper(substr($userData['first_name']??'A',0,1)) ?></div>
                    <div class="cm-uc-name"><?= htmlspecialchars(trim($userData['first_name'].' '.$userData['last_name'])) ?></div>
                    <div class="cm-uc-email"><?= htmlspecialchars($userData['email']) ?></div>
                </div>
                <?php endif; ?>
            </aside>
        </div>
    </main>

    <!-- Reply Modal -->
    <div id="cmReplyModal" class="cm-modal-overlay" style="display:none">
        <div class="cm-modal">
            <div class="cm-modal-header">
                <h3 id="cmModalTitle" data-key="cm_reply_modal_title">Replies</h3>
                <button class="cm-modal-close" id="cmModalClose">✕</button>
            </div>
            <div class="cm-modal-post-preview" id="cmModalPostPreview"></div>
            <div class="cm-modal-replies" id="cmModalReplies">
                <div class="cm-loading"><div class="cm-spinner"></div></div>
            </div>
            <?php if ($isLoggedIn): ?>
            <div class="cm-modal-reply-box">
                <div class="cm-reply-avatar"><?= strtoupper(substr($userData['first_name']??'A',0,1)) ?></div>
                <div class="cm-reply-input-wrap">
                    <textarea id="cmReplyBody" class="cm-reply-input" placeholder="Write a reply..." rows="3" data-key-ph="cm_reply_ph"></textarea>
                    <button class="cm-submit-btn cm-reply-submit" id="cmSubmitReply"><i class="fas fa-reply"></i> <span data-key="cm_reply_submit">Reply</span></button>
                </div>
            </div>
            <?php else: ?>
            <div class="cm-login-nudge cm-modal-nudge">
                <a href="login.php">Sign in to reply</a>
            </div>
            <?php endif; ?>
        </div>
    </div>

    <!-- Chatbot -->
    <div id="chatbot-container">
        <div id="chatbot-bubble" class="chatbot-bubble"><img src="AquaMind_logo.png" alt="Chat"></div>
        <div id="chatbot-window" class="chatbot-window">
            <div class="chatbot-header">
                <div class="chatbot-header-info">
                    <img src="AquaMind_logo.png" alt="Logo" class="chatbot-logo-small">
                    <div><h4 class="chatbot-title">AquaMind Assistant</h4><p class="chatbot-subtitle">Online | Ask me anything!</p></div>
                </div>
                <button id="chatbot-close" class="chatbot-close">&times;</button>
            </div>
            <div id="chatbot-messages" class="chatbot-messages">
                <div class="message bot">Hello! 👋 I'm your AquaMind assistant. How can I help you save water today?</div>
            </div>
            <div class="chatbot-input-area">
                <input type="text" id="chatbot-input" class="chatbot-input" placeholder="Type your question...">
                <button id="chatbot-send-btn" class="chatbot-send-btn"><i class="fas fa-paper-plane"></i></button>
            </div>
        </div>
    </div>
    <script src="chatbot.js"></script>

    <!-- FOOTER -->
    <footer class="site-footer">
        <div class="footer-content">
            <div class="footer-col logo-col">
                <img src="nave pm.png" alt="AquaMind Logo" class="footer-logo">
                <p>Empowering communities with smart water solutions for a sustainable future.</p>
            </div>
            <div class="footer-col links-col">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="index.php">Home</a></li>
                    <li><a href="stories.php">Stories & Charts</a></li>
                    <li><a href="aquaguard.php">AquaGuard</a></li>
                    <li><a href="interactive-house.php">Interactive House</a></li>
                    <li><a href="marketplace.php">Market Place</a></li>
                    <li><a href="community.php">Community</a></li>
                </ul>
            </div>
            <div class="footer-col social-col">
                <span class="social-label">Follow Us</span>
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
            2026 AquaMind. All rights reserved.
        </div>
    </footer>

    <script src="script.js?v=<?php echo time(); ?>"></script>
    <script src="community.js"></script>
    <?php include 'includes/footer.php'; ?>
</body>
</html>

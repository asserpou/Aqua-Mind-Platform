<?php
// ── AJAX: save score (called from game via postMessage relay) ──────────────
session_start();
if (isset($_POST['api']) && $_POST['api'] === 'save_score') {
    header('Content-Type: application/json; charset=UTF-8');

    $player_name = trim($_POST['player_name'] ?? '');
    if (empty($player_name)) {
        echo json_encode(['error' => 'no_name']); exit;
    }

    $conn = mysqli_connect("localhost", "root", "", "nilevo");
    if (!$conn) { echo json_encode(['error' => 'DB connection failed']); exit; }
    mysqli_set_charset($conn, 'utf8mb4');

    $player_name_esc = mysqli_real_escape_string($conn, $player_name);
    $time_remaining  = floatval($_POST['time_remaining'] ?? 0);

    // If user is logged in, link with user_id
    $user_id = isset($_SESSION['user_id']) ? (int) $_SESSION['user_id'] : null;

    // Delete existing score for this player name OR this user_id
    mysqli_query($conn, "DELETE FROM scores WHERE player_name = '$player_name_esc'");
    if ($user_id) {
        mysqli_query($conn, "DELETE FROM scores WHERE user_id = $user_id");
    }

    // Insert new score (time_remaining is float → use 'd' for double)
    if ($user_id) {
        $stmt = mysqli_prepare($conn, "INSERT INTO scores (user_id, player_name, time_remaining, date) VALUES (?, ?, ?, NOW())");
        mysqli_stmt_bind_param($stmt, 'isd', $user_id, $player_name, $time_remaining);
    } else {
        $stmt = mysqli_prepare($conn, "INSERT INTO scores (player_name, time_remaining, date) VALUES (?, ?, NOW())");
        mysqli_stmt_bind_param($stmt, 'sd', $player_name, $time_remaining);
    }
    $ok = mysqli_stmt_execute($stmt);

    if (!$ok) {
        echo json_encode(['error' => mysqli_stmt_error($stmt)]); 
        mysqli_close($conn);
        exit;
    }

    mysqli_close($conn);
    echo json_encode(['ok' => true, 'score' => $time_remaining]); exit;

}

// ── AJAX: return JSON leaderboard data ─────────────────────────────────────
if (isset($_GET['api']) && $_GET['api'] === 'leaderboard') {
    header('Content-Type: application/json; charset=UTF-8');

    $conn = mysqli_connect("localhost", "root", "", "nilevo");
    if (!$conn) { echo json_encode(['error' => 'DB connection failed']); exit; }
    mysqli_set_charset($conn, 'utf8mb4');

    $tab = isset($_GET['tab']) ? $_GET['tab'] : 'alltime';
    if (!in_array($tab, ['alltime','weekly','daily'])) $tab = 'alltime';

    $where = '';
    if ($tab === 'weekly') $where = "WHERE s.date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)";
    if ($tab === 'daily')  $where = "WHERE DATE(s.date) = CURDATE()";

    // Use player_name directly from scores table
    $sql = "SELECT
                s.player_name,
                s.time_remaining,
                s.date
            FROM scores s
            $where
            ORDER BY s.time_remaining DESC
            LIMIT 10";

    $res = mysqli_query($conn, $sql);
    if (!$res) { echo json_encode(['error' => mysqli_error($conn)]); exit; }

    $rows = []; $rank = 1;
    while ($row = mysqli_fetch_assoc($res)) {
        $rows[] = [
            'rank'           => $rank++,
            'player_name'    => htmlspecialchars($row['player_name'], ENT_QUOTES, 'UTF-8'),
            'time_remaining' => (int)$row['time_remaining'],
            'date'           => $row['date'],
        ];
    }
    mysqli_close($conn);
    echo json_encode([
        'tab'        => $tab,
        'rows'       => $rows,
        'updated_at' => date('Y-m-d H:i:s')
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

include 'includes/header.php';
?>
  <title>AquaGuard – AquaMind</title>
  <link rel="stylesheet" href="style.css?v=<?php echo time(); ?>">
  <link rel="stylesheet" href="aquaguard.css?v=<?php echo time(); ?>">
  <link rel="stylesheet" href="chatbot.css?v=<?php echo time(); ?>">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link rel="icon" type="image/png" href="AquaMind_logo.png" />
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&family=Press+Start+2P&family=VT323&display=swap" rel="stylesheet">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
</head>
<body>

<!--  GAME SECTION  -->
<section class="ag-game-section" id="gameSection">
  <div class="ag-stars" id="agStars"></div>
  <div class="ag-river"></div>
  <div class="ag-title-area">
    <h1 class="ag-game-title">
      <span data-key="ag_title_1">AQUA</span><span class="hl" data-key="ag_title_2">GUARD</span>
    </h1>
    <p class="ag-game-tagline" data-key="ag_tagline">PROTECT THE NILE · SAVE THE VILLAGE · GUARD THE WATER</p>
  </div>
  <div class="ag-frame-wrapper">
    <div class="ag-corner-tr"></div>
    <div class="ag-corner-bl"></div>
    <div class="ag-frame-outer">
      <button class="ag-fs-btn" id="fsBtn">
        <i class="fas fa-expand" id="fsIcon"></i>
        <span id="fsLabel" data-key="ag_fullscreen">FULLSCREEN</span>
      </button>
      <iframe id="gameFrame" class="ag-iframe" src="Build/index.html"
        allowfullscreen allow="fullscreen; keyboard-map" title="AquaGuard Game" scrolling="no"
        style="touch-action:none;"></iframe>
    </div>
    <div class="ag-hud">
      <div class="ag-hud-left"><span data-key="ag_hud_title">AQUAGUARD</span> <span>Alpha V0.3</span> — AquaMind</div>
      <div class="ag-hud-right">
        <div class="ag-dot"></div><div class="ag-dot"></div><div class="ag-dot"></div>
        <span class="ag-hud-status" data-key="ag_live">LIVE</span>
      </div>
    </div>
  </div>
</section>



<!--  LEADERBOARD  -->
<section class="ag-leaderboard-section" id="leaderboardSection">
  <div class="ag-lb-header">
    <span class="ag-lb-trophy">🏆</span>
    <h2 class="ag-lb-title" data-key="lb_title">HALL OF GUARDIANS</h2>
    <p class="ag-lb-subtitle" data-key="lb_subtitle">TOP DEFENDERS OF THE NILE · LIVE RANKINGS</p>
  </div>
  <div class="ag-lb-tabs">
    <button class="ag-lb-tab active" data-tab="alltime" onclick="switchTab('alltime')" data-key="lb_tab_all">ALL TIME</button>
    <button class="ag-lb-tab" data-tab="weekly" onclick="switchTab('weekly')" data-key="lb_tab_weekly">THIS WEEK</button>
    <button class="ag-lb-tab" data-tab="daily" onclick="switchTab('daily')" data-key="lb_tab_daily">TODAY</button>
  </div>
  <div class="ag-lb-container">
    <table class="ag-lb-table" id="lbTable">
      <thead>
        <tr>
          <th class="center" style="width:60px;" data-key="lb_h_rank">#</th>
          <th data-key="lb_h_guardian">GUARDIAN</th>
          <th class="right" data-key="lb_h_score">SCORE</th>
        </tr>
      </thead>
      <tbody id="lbBody"></tbody>
    </table>
  </div>
  <div class="ag-lb-footer">
    <span class="ag-lb-updated" id="lbUpdatedAt">UPDATED: —</span>
    <button class="ag-lb-refresh-btn" onclick="refreshLeaderboard()">
      <i class="fas fa-sync-alt" id="refreshIcon"></i>
      <span data-key="lb_refresh">REFRESH</span>
    </button>
  </div>
  <div class="ag-my-rank" id="myRankStrip" style="display:none;">
    <span class="ag-my-rank-label" data-key="my_rank">YOUR RANK</span>
    <span class="ag-my-rank-value" id="myRankValue">#—</span>
    <span class="ag-my-rank-label" data-key="best_score">BEST SCORE</span>
    <span class="ag-my-rank-score" id="myBestScore">—</span>
  </div>
</section>

<!--  COUPON CODES SECTION  -->
<section class="ag-coupon-section" id="couponSection">
  <div class="ag-coupon-header">
    <span class="ag-coupon-icon">🎟️</span>
    <h2 class="ag-coupon-title" data-key="coupon_title">REDEEM COUPON CODE</h2>
    <p class="ag-coupon-subtitle" data-key="coupon_subtitle">ENTER YOUR CODE · GET 5% OFF IN THE MARKETPLACE</p>
  </div>
  <div class="ag-coupon-box">
    <div class="ag-coupon-input-wrap">
      <input type="text" id="couponInput" class="ag-coupon-input" placeholder="ENTER COUPON CODE" maxlength="10" autocomplete="off" spellcheck="false">
      <button class="ag-coupon-btn" id="couponRedeemBtn" onclick="redeemCoupon()">
        <i class="fas fa-gift"></i>
        <span data-key="coupon_btn">REDEEM</span>
      </button>
    </div>
    <div class="ag-coupon-msg" id="couponMsg"></div>
    <div class="ag-coupon-hint">
      <span class="ag-coupon-hint-icon">🔒</span>
      <span data-key="coupon_hint">You must be logged in to redeem coupons · Each code can only be used once</span>
    </div>
  </div>
</section>

<!-- ══════════ CHATBOT ══════════ -->
<div id="chatbot-container">
  <div id="chatbot-bubble" class="chatbot-bubble"><img src="AquaMind_logo.png" alt="Chat"></div>
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
      <div class="message bot">Hello! 👋 I'm your AquaMind assistant. How can I help you save water today?</div>
    </div>
    <div class="chatbot-input-area">
      <input type="text" id="chatbot-input" class="chatbot-input" placeholder="Type your question...">
      <button id="chatbot-send-btn" class="chatbot-send-btn"><i class="fas fa-paper-plane"></i></button>
    </div>
  </div>
</div>
<script src="chatbot.js"></script>

<!-- ══════════ FOOTER ══════════ -->
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
  <div class="footer-bottom">©2026 AquaMind. <span data-key="footerRights">All rights reserved.</span></div>
</footer>

<!-- ══════════ SCRIPTS ══════════ -->
<script src="script.js?v=<?php echo time(); ?>"></script>
<script src="aquaguard.js?v=<?php echo time(); ?>"></script>

<script>
/* ── LEADERBOARD (inline, same as before) ─── */
var agCurrentTab = 'alltime';

function switchTab(tab) {
  agCurrentTab = tab;
  document.querySelectorAll('.ag-lb-tab').forEach(function(b) {
    b.classList.toggle('active', b.getAttribute('data-tab') === tab);
  });
  agLoadLeaderboard(tab);
}

function refreshLeaderboard() {
  var ico = document.getElementById('refreshIcon');
  if (ico) { ico.style.transform = 'rotate(360deg)'; ico.style.transition = 'transform 0.5s'; }
  setTimeout(function() { if(ico){ico.style.transform='';ico.style.transition='';} }, 600);
  agLoadLeaderboard(agCurrentTab);
}

function agLoadLeaderboard(tab) {
  var tbody = document.getElementById('lbBody');
  if (!tbody) return;
  tbody.innerHTML = '<tr><td colspan="3" style="text-align:center;padding:20px;">LOADING…</td></tr>';

  fetch('aquaguard.php?api=leaderboard&tab=' + encodeURIComponent(tab))
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (data.error) { tbody.innerHTML = '<tr><td colspan="3">Error: ' + data.error + '</td></tr>'; return; }
      agRenderRows(data.rows);
      var upd = document.getElementById('lbUpdatedAt');
      if (upd && data.updated_at) upd.textContent = 'UPDATED: ' + data.updated_at.slice(11,16);
    })
    .catch(function(err) {
      tbody.innerHTML = '<tr><td colspan="3" style="text-align:center;color:red;">⚠ ' + err.message + '</td></tr>';
    });
}

function agRenderRows(rows) {
  var tbody = document.getElementById('lbBody');
  if (!rows || !rows.length) {
    tbody.innerHTML = [
      '<tr><td colspan="3">',
      '<div class="ag-lb-empty-wrap">',
      '<div class="ag-lb-empty-icon">🏆</div>',
      '<div class="ag-lb-empty-title">NO GUARDIANS YET</div>',
      '<div class="ag-lb-empty-sub">BE THE FIRST TO CLAIM THE THRONE</div>',
      '</div></td></tr>'
    ].join('');
    return;
  }
  var medals = ['🥇','🥈','🥉'];
  var html = '';
  rows.forEach(function(r, i) {
    var medal = i < 3 ? medals[i] : '#' + r.rank;
    var cls = i===0 ? 'rank-1' : i===1 ? 'rank-2' : i===2 ? 'rank-3' : '';
    html += '<tr class="' + cls + '">'
      + '<td class="center"><span class="ag-rank-badge">' + medal + '</span></td>'
      + '<td><span class="ag-avatar"></span>' + r.player_name + '</td>'
      + '<td class="right"><span class="ag-score-value">' + Number(r.time_remaining).toLocaleString() + '</span></td>'
      + '</tr>';
  });
  tbody.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', function() {
  agLoadLeaderboard('alltime');
});

/* ── COUPON REDEEM ─── */
function redeemCoupon() {
  var input = document.getElementById('couponInput');
  var msg   = document.getElementById('couponMsg');
  var code  = (input.value || '').trim().toUpperCase();

  if (!code) {
    showCouponMsg('⚠ Please enter a coupon code', 'error');
    return;
  }

  var btn = document.getElementById('couponRedeemBtn');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>CHECKING...</span>';

  fetch('coupon_api.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'api=redeem&coupon_code=' + encodeURIComponent(code)
  })
  .then(function(r) { return r.json(); })
  .then(function(res) {
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-gift"></i> <span data-key="coupon_btn">REDEEM</span>';

    if (res.error === 'not_logged_in') {
      showCouponMsg('🔒 You must be logged in to redeem coupons. <a href="login.php" style="color:var(--gold);text-decoration:underline;">Sign In</a>', 'error');
      return;
    }
    if (res.error === 'invalid_coupon') {
      showCouponMsg('❌ Invalid coupon code. Please try again.', 'error');
      return;
    }
    if (res.error === 'already_used') {
      showCouponMsg('⚠ You have already used this coupon code!', 'warning');
      return;
    }
    if (res.ok) {
      showCouponMsg(
        '🎉 Success! Your 5% discount voucher: <span class="ag-coupon-code-result">' + res.voucher.code + '</span><br>Use it in the <a href="marketplace.php" style="color:var(--gold);text-decoration:underline;">Marketplace</a>!',
        'success'
      );
      input.value = '';
    }
  })
  .catch(function(err) {
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-gift"></i> <span data-key="coupon_btn">REDEEM</span>';
    showCouponMsg('⚠ Error: ' + err.message, 'error');
  });
}

function showCouponMsg(html, type) {
  var msg = document.getElementById('couponMsg');
  msg.className = 'ag-coupon-msg ' + type;
  msg.innerHTML = html;
  msg.style.display = 'block';
  setTimeout(function() {
    if (type !== 'success') msg.style.display = 'none';
  }, 8000);
}

// Allow Enter key to redeem
document.getElementById('couponInput').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') redeemCoupon();
});
</script>

<?php include 'includes/footer.php'; ?>
</body>
</html>

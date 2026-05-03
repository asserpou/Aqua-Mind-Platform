/* ══════════════════════════════════════
   AQUAGUARD TRANSLATIONS
══════════════════════════════════════ */
const agTranslations = {
  en: {
    ag_title_1: "AQUA", ag_title_2: "GUARD",
    ag_tagline: "PROTECT THE NILE · SAVE THE VILLAGE · GUARD THE WATER",
    ag_fullscreen: "FULLSCREEN", ag_exit: "EXIT",
    ag_hud_title: "AQUAGUARD", ag_live: "LIVE",
    lb_title: "HALL OF GUARDIANS",
    lb_subtitle: "TOP DEFENDERS OF THE NILE · LIVE RANKINGS",
    lb_tab_all: "ALL TIME", lb_tab_weekly: "THIS WEEK", lb_tab_daily: "TODAY",
    lb_h_rank: "#", lb_h_guardian: "GUARDIAN", lb_h_score: "SCORE",
    lb_updated: "UPDATED:", lb_refresh: "REFRESH",
    lb_empty_title: "NO GUARDIANS YET", lb_empty_sub: "BE THE FIRST TO CLAIM THE THRONE",
    lb_empty_hint: "🎮 &nbsp; PLAY THE GAME · SUBMIT YOUR SCORE",
    my_rank: "YOUR RANK", best_score: "BEST SCORE",
    name_title: "ENTER YOUR NAME", name_sub: "TO PLAY AQUAGUARD",
    name_body: "Enter your guardian name to play the game and appear on the leaderboard.",
    name_btn: "PLAY NOW", name_placeholder: "Your name...",
    name_hint: "PROTECT THE NILE · GUARD THE WATER",
    coupon_title: "REDEEM COUPON CODE",
    coupon_subtitle: "ENTER YOUR CODE · GET 5% OFF IN THE MARKETPLACE",
    coupon_btn: "REDEEM",
    coupon_hint: "You must be logged in to redeem coupons · Each code can only be used once"
  },
  ar: {
    ag_title_1: "أكوا", ag_title_2: "جارد",
    ag_tagline: "احمِ النيل · أنقذ القرية · احرس المياه",
    ag_fullscreen: "ملء الشاشة", ag_exit: "خروج",
    ag_hud_title: "أكوا جارد", ag_live: "مباشر",
    lb_title: "قاعة الحراس",
    lb_subtitle: "أفضل المدافعين عن النيل · تصنيفات مباشرة",
    lb_tab_all: "كل الوقت", lb_tab_weekly: "هذا الأسبوع", lb_tab_daily: "اليوم",
    lb_h_rank: "#", lb_h_guardian: "الحارس", lb_h_score: "النقاط",
    lb_updated: "تم التحديث:", lb_refresh: "تحديث",
    lb_empty_title: "لا يوجد حراس بعد", lb_empty_sub: "كن أول من يعتلي العرش",
    lb_empty_hint: "🎮 &nbsp; العب اللعبة · سجل نقاطك",
    my_rank: "ترتيبك", best_score: "أفضل نقاط",
    name_title: "أدخل اسمك", name_sub: "لتلعب أكوا جارد",
    name_body: "أدخل اسم الحارس الخاص بك للعب والظهور في قائمة المتصدرين.",
    name_btn: "ابدأ اللعب", name_placeholder: "اسمك...",
    name_hint: "احمِ النيل · احرس المياه",
    coupon_title: "استبدال كوبون",
    coupon_subtitle: "أدخل الكود · احصل على خصم 5% في المتجر",
    coupon_btn: "استبدال",
    coupon_hint: "يجب تسجيل الدخول لاستبدال الكوبونات · كل كود يُستخدم مرة واحدة فقط"
  }
};

if (typeof translations !== 'undefined') {
  Object.assign(translations.en, agTranslations.en);
  Object.assign(translations.ar, agTranslations.ar);
  const currentLang = localStorage.getItem("language") || "en";
  if (typeof setLanguage === 'function') setLanguage(currentLang);
}

/* ══════════════════════════════════════
   THEME SYNC
══════════════════════════════════════ */
(function syncAquaguardTheme() {
  var html = document.documentElement;
  function applyTheme() {
    var isDark = document.body.classList.contains('dark-mode');
    html.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }
  applyTheme();
  new MutationObserver(applyTheme).observe(document.body, { attributes: true, attributeFilter: ['class'] });
})();

/* ══════════════════════════════════════
   NAME ENTRY / AUTO-LOGIN
   - Logged-in users: name auto-fetched from DB, no overlay
   - Guests: must enter their name to play
══════════════════════════════════════ */
var agCurrentUser = { isLoggedIn: false, name: '', email: '' };
var agPlayerName = '';

(function() {
  var frameWrapper = document.querySelector('.ag-frame-wrapper');
  if (!frameWrapper) return;

  var iframe = document.getElementById('gameFrame');
  var fsBtn = document.getElementById('fsBtn');
  var frameOuter = frameWrapper.querySelector('.ag-frame-outer');

  // Step 1: block game until we know who the player is
  if (iframe) { iframe.style.pointerEvents = 'none'; iframe.style.opacity = '0'; }
  if (fsBtn) fsBtn.style.display = 'none';

  // Step 2: check auth
  fetch('aquaguard_auth.php')
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (data.isLoggedIn) {
        // ✅ Logged in — use DB name, skip overlay
        agCurrentUser.isLoggedIn = true;
        agCurrentUser.name  = data.name  || 'PLAYER';
        agCurrentUser.email = data.email || '';
        agPlayerName = agCurrentUser.name;
        sessionStorage.setItem('ag_player_name', agPlayerName);
        enableGame();
        // Check for existing vouchers or top-3 rank voucher eligibility
        checkVoucherOnLoad();
      } else {
        // Not logged in — check if already entered name this session
        var savedName = sessionStorage.getItem('ag_player_name');
        if (savedName) {
          agPlayerName = savedName;
          enableGame();
        } else {
          showNameOverlay();
        }
      }
    })
    .catch(function() {
      // On error, check session or show overlay
      var savedName = sessionStorage.getItem('ag_player_name');
      if (savedName) {
        agPlayerName = savedName;
        enableGame();
      } else {
        showNameOverlay();
      }
    });

  function enableGame() {
    if (iframe) { iframe.style.pointerEvents = ''; iframe.style.opacity = '1'; }
    if (fsBtn) fsBtn.style.display = '';
    // Send player name to iframe
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage({ type: 'AQUAGUARD_USER', name: agPlayerName }, '*');
    }
    // Also send on iframe load (in case it hasn't loaded yet)
    if (iframe) {
      iframe.addEventListener('load', function() {
        iframe.contentWindow.postMessage({ type: 'AQUAGUARD_USER', name: agPlayerName }, '*');
      });
    }
  }

  function showNameOverlay() {
    frameWrapper.style.position = 'relative';
    if (frameOuter) frameOuter.style.position = 'relative';

    var overlay = document.createElement('div');
    overlay.id = 'ag-auth-overlay';

    function buildHTML() {
      var lang = localStorage.getItem("language") || "en";
      var t = agTranslations[lang] || agTranslations.en;
      return [
        '<div class="ag-mo-box ag-auth-box">',
        '  <div class="ag-mo-pixels" aria-hidden="true">',
        '    <div class="ag-mo-pixel p1"></div><div class="ag-mo-pixel p2"></div>',
        '    <div class="ag-mo-pixel p3"></div><div class="ag-mo-pixel p4"></div>',
        '    <div class="ag-mo-pixel p5"></div>',
        '  </div>',
        '  <div class="ag-mo-icon">🎮</div>',
        '  <h2 class="ag-mo-title">' + t.name_title + '</h2>',
        '  <p class="ag-mo-sub">' + t.name_sub + '</p>',
        '  <div class="ag-mo-divider"></div>',
        '  <p class="ag-mo-body">' + t.name_body + '</p>',
        '  <input type="text" id="agNameInput" class="ag-name-input" placeholder="' + t.name_placeholder + '" maxlength="30" autocomplete="off" spellcheck="false">',
        '  <button id="agNameBtn" class="ag-auth-signin-btn" style="border:none;cursor:pointer;">' + t.name_btn + '</button>',
        '  <div class="ag-mo-hint">',
        '    <span class="ag-mo-key">💧</span>',
        '    <span>' + t.name_hint + '</span>',
        '  </div>',
        '</div>'
      ].join('');
    }

    overlay.innerHTML = buildHTML();
    var target = frameOuter || frameWrapper;
    target.appendChild(overlay);

    setTimeout(function() {
      var inp = document.getElementById('agNameInput');
      if (inp) inp.focus();
    }, 500);

    function submitName() {
      var inp = document.getElementById('agNameInput');
      var name = (inp ? inp.value : '').trim();
      if (!name || name.length < 2) {
        inp.style.borderColor = '#ff4444';
        inp.style.animation = 'shake 0.4s ease';
        setTimeout(function() { inp.style.animation = ''; }, 400);
        return;
      }
      agPlayerName = name;
      sessionStorage.setItem('ag_player_name', name);

      overlay.style.transition = 'opacity 0.4s ease';
      overlay.style.opacity = '0';
      setTimeout(function() {
        overlay.remove();
        enableGame();
      }, 400);
    }

    document.addEventListener('click', function(e) {
      if (e.target && e.target.id === 'agNameBtn') submitName();
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && document.getElementById('agNameInput')) submitName();
    });

    document.querySelectorAll('.lang-option').forEach(function(opt) {
      opt.addEventListener('click', function() {
        setTimeout(function() { overlay.innerHTML = buildHTML(); }, 60);
      });
    });
  }
})();

/* ══════════════════════════════════════
   STARS
══════════════════════════════════════ */
(function() {
  var c = document.getElementById('agStars');
  if (!c) return;
  // Reduce stars on mobile for performance
  var isMob = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
  var count = isMob ? 8 : 70;
  for (var i = 0; i < count; i++) {
    var s = document.createElement('div');
    s.className = 'ag-star';
    var sz = Math.random() < 0.25 ? 3 : 2;
    s.style.cssText = 'width:'+sz+'px;height:'+sz+'px;left:'+(Math.random()*100)+'%;top:'+(Math.random()*55)+'%;animation-duration:'+(Math.random()*2+1)+'s;animation-delay:'+(Math.random()*3)+'s;';
    c.appendChild(s);
  }
})();

/* ══════════════════════════════════════
   FULLSCREEN TOGGLE (fsBtn only)
   Fullscreen is applied to the IFRAME (game only).
   No popups, no overlays, no tap-interception.
══════════════════════════════════════ */

/* Go fullscreen on the IFRAME element */
function agGoFullscreen() {
  var el = document.getElementById('gameFrame');
  if (!el) return;
  var p;
  if (el.requestFullscreen) p = el.requestFullscreen();
  else if (el.webkitRequestFullscreen) p = el.webkitRequestFullscreen();
  else if (el.msRequestFullscreen) p = el.msRequestFullscreen();
  else return;

  (p || Promise.resolve()).then(function() {
    if (screen.orientation && screen.orientation.lock) {
      screen.orientation.lock('landscape').catch(function(){});
    }
  }).catch(function() {});
}

/* Fullscreen toggle button (works for both mobile & desktop) */
document.getElementById('fsBtn').addEventListener('click', function() {
  var fsEl = document.fullscreenElement || document.webkitFullscreenElement;
  if (fsEl) {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
  } else {
    agGoFullscreen();
  }
});

function updateFsIcon() {
  var isFs = document.fullscreenElement || document.webkitFullscreenElement;
  var lang = localStorage.getItem("language") || "en";
  var label = isFs ? (lang === 'ar' ? 'خروج' : 'EXIT') : (lang === 'ar' ? 'ملء الشاشة' : 'FULLSCREEN');
  document.getElementById('fsIcon').className = isFs ? 'fas fa-compress' : 'fas fa-expand';
  var fsLabel = document.getElementById('fsLabel');
  if (fsLabel) { fsLabel.textContent = label; fsLabel.setAttribute('data-key', isFs ? 'ag_exit' : 'ag_fullscreen'); }
}
document.addEventListener('fullscreenchange', function() {
  updateFsIcon();
  /* Unlock orientation on exit */
  if (!document.fullscreenElement && !document.webkitFullscreenElement) {
    if (screen.orientation && screen.orientation.unlock) {
      screen.orientation.unlock();
    }
  }
});
document.addEventListener('webkitfullscreenchange', updateFsIcon);

/* ══════════════════════════════════════
   NAVBAR SCROLL
══════════════════════════════════════ */
window.addEventListener('scroll', function() {
  var nb = document.querySelector('.navbar');
  if (nb) nb.classList.toggle('scrolled', window.scrollY > 30);
});

/* ══════════════════════════════════════
   LEADERBOARD
══════════════════════════════════════ */
var currentTab = 'alltime';

function renderLeaderboard(data) {
  var tbody = document.getElementById('lbBody');
  if (!tbody) return;
  var lang = localStorage.getItem("language") || "en";
  var t = agTranslations[lang] || agTranslations.en;

  if (!data || data.length === 0) {
    tbody.innerHTML = '<tr><td colspan="3"><div class="ag-lb-empty-wrap"><div class="ag-lb-empty-icon">🏆</div><div class="ag-lb-empty-bars"><div class="ag-lb-empty-bar"></div><div class="ag-lb-empty-bar"></div><div class="ag-lb-empty-bar"></div><div class="ag-lb-empty-bar"></div><div class="ag-lb-empty-bar"></div></div><div class="ag-lb-empty-title">' + t.lb_empty_title + '</div><div class="ag-lb-empty-sub">' + t.lb_empty_sub + '</div><div class="ag-lb-empty-hint">' + t.lb_empty_hint + '</div></div></td></tr>';
    return;
  }

  var rows = '';
  data.forEach(function(e, i) {
    var rank = e.rank || i + 1;
    var rc = rank === 1 ? 'rank-1' : rank === 2 ? 'rank-2' : rank === 3 ? 'rank-3' : '';
    var medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '#' + rank;
    rows += '<tr class="' + rc + '"><td class="center"><span class="ag-rank-badge">' + medal + '</span></td><td><span class="ag-avatar"></span>' + e.name + '</td><td class="right"><span class="ag-score-value">' + Number(e.score).toLocaleString() + '</span></td></tr>';
  });
  tbody.innerHTML = rows;

  var upd = document.getElementById('lbUpdatedAt');
  if (upd) {
    var now = new Date();
    upd.innerHTML = '<span data-key="lb_updated">' + t.lb_updated + '</span> ' + now.toTimeString().slice(0,5);
  }
}

function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.ag-lb-tab').forEach(function(btn) {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tab);
  });
  loadLeaderboard(tab);
}

function loadLeaderboard(tab) {
  tab = tab || currentTab;
  fetch('aquaguard.php?api=leaderboard&tab=' + encodeURIComponent(tab))
    .then(function(res) { return res.json(); })
    .then(function(json) {
      if (json.error) { renderLeaderboard([]); return; }
      var data = (json.rows || []).map(function(r) {
        return { rank: r.rank, name: r.player_name, score: r.time_remaining };
      });
      renderLeaderboard(data);
    })
    .catch(function() { renderLeaderboard([]); });
}

function refreshLeaderboard() {
  var icon = document.getElementById('refreshIcon');
  if (icon) { icon.style.transition = 'transform 0.5s ease'; icon.style.transform = 'rotate(360deg)'; }
  loadLeaderboard(currentTab);
  setTimeout(function() { if (icon) { icon.style.transform = ''; icon.style.transition = ''; } }, 600);
}

document.querySelectorAll('.lang-option').forEach(function(opt) {
  opt.addEventListener('click', function() {
    setTimeout(function() { loadLeaderboard(currentTab); updateFsIcon(); }, 50);
  });
});

loadLeaderboard('alltime');

/* ══════════════════════════════════════
   RECEIVE SCORE FROM GAME
   Uses player_name instead of session user_id
══════════════════════════════════════ */
window.addEventListener('message', function(event) {
  var msg = event.data;
  if (!msg || msg.type !== 'AQUAGUARD_SCORE') return;

  var score = parseInt(msg.score) || 0;
  var playerName = agPlayerName || sessionStorage.getItem('ag_player_name') || 'PLAYER';

  // Save to DB using player_name
  fetch('aquaguard.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'api=save_score&player_name=' + encodeURIComponent(playerName) + '&time_remaining=' + score
  })
  .then(function(r) { return r.json(); })
  .then(function(res) {
    console.log('Score saved:', res);
    loadLeaderboard(currentTab);

    // After saving, check rank for voucher (logged-in only)
    if (agCurrentUser.isLoggedIn) {
      setTimeout(function() {
        fetch('aquaguard.php?api=leaderboard&tab=alltime')
          .then(function(r) { return r.json(); })
          .then(function(json) {
            var rows = json.rows || [];
            var myRank = -1;
            rows.forEach(function(r, i) {
              if (r.player_name === playerName) myRank = i + 1;
            });
            if (myRank >= 1 && myRank <= 3) {
              checkAndShowVoucherOverlay(myRank, score);
            }
          });
      }, 800);
    }
  })
  .catch(function(err) { console.error('Save error:', err); });

  // Update "Your Rank" strip
  var strip = document.getElementById('myRankStrip');
  if (strip) {
    strip.style.display = 'flex';
    document.getElementById('myRankValue').textContent = '#—';
    document.getElementById('myBestScore').textContent = Number(score).toLocaleString();
  }

  // Reload leaderboard to get updated rank
  setTimeout(function() {
    fetch('aquaguard.php?api=leaderboard&tab=alltime')
      .then(function(r) { return r.json(); })
      .then(function(json) {
        var rows = json.rows || [];
        var myRank = -1;
        rows.forEach(function(r, i) {
          if (r.player_name === playerName) myRank = i + 1;
        });
        if (myRank >= 1 && strip) {
          document.getElementById('myRankValue').textContent = '#' + myRank;
        }
      });
  }, 500);

  loadLeaderboard(currentTab);
});

/* ══════════════════════════════════════
   VOUCHER SYSTEM — TOP 3 LEADERBOARD
   1st = 20%, 2nd = 10%, 3rd = 5%
   Only for logged-in users
══════════════════════════════════════ */
function checkAndShowVoucherOverlay(rank, score) {
  if (!agCurrentUser.isLoggedIn) return;

  fetch('voucher.php?api=check')
    .then(function(r) { return r.json(); })
    .then(function(res) {
      if (res.hasVoucher) {
        showVoucherBtn(res.voucher);
        return;
      }
      var discount = rank === 1 ? 20 : rank === 2 ? 10 : 5;
      showVoucherOverlay(rank, discount, score);
    })
    .catch(function() {});
}

function showVoucherOverlay(rank, discount, score) {
  var lang   = localStorage.getItem('language') || 'en';
  var isAr   = lang === 'ar';
  var medals = ['🥇','🥈','🥉'];
  var medal  = medals[rank - 1];

  var title = isAr ? 'مبروك! كسبت قسيمة خصم' : 'Congratulations! You earned a voucher';
  var body = isAr
    ? ('أنت في المركز ' + rank + ' على الليدربورد! احفظ قسيمتك للاستخدام في الماركت بليس.')
    : ('You ranked #' + rank + ' on the leaderboard! Save your voucher to use in the Marketplace.');
  var btnText   = isAr ? 'احفظ القسيمة' : 'Save Voucher';
  var closeText = isAr ? 'لاحقاً' : 'Later';

  var overlay = document.createElement('div');
  overlay.id  = 'ag-voucher-overlay';
  overlay.innerHTML = [
    '<div class="ag-voucher-box">',
    '  <div class="ag-voucher-medal">' + medal + '</div>',
    '  <h2 class="ag-voucher-title">' + title + '</h2>',
    '  <div class="ag-voucher-badge">',
    '    <span class="ag-voucher-pct">' + discount + '%</span>',
    '    <span class="ag-voucher-off">' + (isAr ? 'خصم' : 'OFF') + '</span>',
    '  </div>',
    '  <p class="ag-voucher-body">' + body + '</p>',
    '  <p class="ag-voucher-exp">' + (isAr ? '⏳ صالحة لمدة 3 أيام فقط' : '⏳ Valid for 3 days only') + '</p>',
    '  <button class="ag-voucher-save-btn" id="agVoucherSaveBtn">' + btnText + '</button>',
    '  <button class="ag-voucher-close-btn" id="agVoucherCloseBtn">' + closeText + '</button>',
    '</div>'
  ].join('');

  document.body.appendChild(overlay);

  document.getElementById('agVoucherSaveBtn').addEventListener('click', function() {
    saveVoucher(discount, overlay);
  });
  document.getElementById('agVoucherCloseBtn').addEventListener('click', function() {
    overlay.remove();
  });
}

function saveVoucher(discount, overlay) {
  fetch('voucher.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'api=save&discount=' + discount
  })
  .then(function(r) { return r.json(); })
  .then(function(res) {
    if (res.ok) {
      overlay.remove();
      showVoucherBtn(res.voucher);
    }
  })
  .catch(function(err) { console.error('Voucher save error:', err); });
}

function showVoucherBtn(voucher) {
  var existing = document.getElementById('agVoucherFloatBtn');
  if (existing) existing.remove();

  var lang = localStorage.getItem('language') || 'en';
  var isAr = lang === 'ar';

  var btn = document.createElement('div');
  btn.id  = 'agVoucherFloatBtn';
  btn.innerHTML = [
    '<div class="ag-vf-icon">🎟️</div>',
    '<div class="ag-vf-text">',
    '  <span class="ag-vf-label">' + (isAr ? 'قسيمتي' : 'My Voucher') + '</span>',
    '  <span class="ag-vf-disc">' + voucher.discount + '% OFF</span>',
    '</div>'
  ].join('');
  document.body.appendChild(btn);

  btn.addEventListener('click', function() {
    showVoucherDetails(voucher);
  });
}

function showVoucherDetails(voucher) {
  var existing = document.getElementById('ag-voucher-detail-overlay');
  if (existing) { existing.remove(); return; }

  var lang   = localStorage.getItem('language') || 'en';
  var isAr   = lang === 'ar';
  var expiry = new Date(voucher.expires_at);
  var now    = new Date();
  var diffMs = expiry - now;
  var diffHr = Math.max(0, Math.floor(diffMs / 3600000));
  var diffDy = Math.floor(diffHr / 24);
  var remHr  = diffHr % 24;

  var timeLeft = diffDy > 0
    ? (isAr ? diffDy + ' يوم و' + remHr + ' ساعة' : diffDy + 'd ' + remHr + 'h remaining')
    : (isAr ? remHr + ' ساعة متبقية' : remHr + 'h remaining');

  if (diffMs <= 0) {
    var floatBtn = document.getElementById('agVoucherFloatBtn');
    if (floatBtn) floatBtn.remove();
    fetch('voucher.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'api=expire'
    });
    return;
  }

  var ov = document.createElement('div');
  ov.id  = 'ag-voucher-detail-overlay';
  ov.innerHTML = [
    '<div class="ag-vd-box">',
    '  <button class="ag-vd-close" id="agVdClose">✕</button>',
    '  <div class="ag-vd-icon">🎟️</div>',
    '  <h3 class="ag-vd-title">' + (isAr ? 'قسيمة الخصم بتاعتك' : 'Your Discount Voucher') + '</h3>',
    '  <div class="ag-vd-code">' + voucher.code + '</div>',
    '  <div class="ag-vd-disc">' + voucher.discount + '% ' + (isAr ? 'خصم' : 'OFF') + '</div>',
    '  <div class="ag-vd-timer">⏳ ' + timeLeft + '</div>',
    '  <p class="ag-vd-hint">' + (isAr ? 'استخدم الكود ده في الماركت بليس (السوق) عند الشراء' : 'Use this code at checkout in the Marketplace') + '</p>',
    '  <a href="marketplace.php" class="ag-vd-go">' + (isAr ? 'اذهب للمتجر →' : 'Go to Marketplace →') + '</a>',
    '</div>'
  ].join('');
  document.body.appendChild(ov);

  document.getElementById('agVdClose').addEventListener('click', function() { ov.remove(); });
  ov.addEventListener('click', function(e) { if (e.target === ov) ov.remove(); });
}

/* ══════════════════════════════════════
   CHECK VOUCHER ON PAGE LOAD
   (called after auth completes for logged-in users)
══════════════════════════════════════ */
function checkVoucherOnLoad() {
  if (!agCurrentUser.isLoggedIn) return;

  fetch('voucher.php?api=check')
    .then(function(r) { return r.json(); })
    .then(function(res) {
      if (res.hasVoucher) {
        showVoucherBtn(res.voucher);
      } else {
        checkRankForVoucher();
      }
    })
    .catch(function() { checkRankForVoucher(); });
}

function checkRankForVoucher() {
  if (!agCurrentUser.isLoggedIn) return;

  fetch('voucher.php?api=history')
    .then(function(r) { return r.json(); })
    .then(function(hist) {
      if (hist.hasUsed) return;
      fetch('aquaguard.php?api=leaderboard&tab=alltime')
        .then(function(r) { return r.json(); })
        .then(function(json) {
          var rows = json.rows || [];
          var myRank = -1;
          rows.forEach(function(r, i) {
            if (r.player_name === agCurrentUser.name) myRank = i + 1;
          });
          if (myRank >= 1 && myRank <= 3) {
            var discount = myRank === 1 ? 20 : myRank === 2 ? 10 : 5;
            showVoucherOverlay(myRank, discount, 0);
          }
        });
    })
    .catch(function() {});
}
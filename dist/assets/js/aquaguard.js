/* ══════════════════════════════════════
   AQUAGUARD TRANSLATIONS
══════════════════════════════════════ */
const agTranslations = {
  en: {
    ag_title_1: "AQUA",
    ag_title_2: "GUARD",
    ag_tagline: "PROTECT THE NILE · SAVE THE VILLAGE · GUARD THE WATER",
    ag_fullscreen: "FULLSCREEN",
    ag_exit: "EXIT",
    ag_hud_title: "AQUAGUARD",
    ag_live: "LIVE",
    lb_title: "HALL OF GUARDIANS",
    lb_subtitle: "TOP DEFENDERS OF THE NILE · LIVE RANKINGS",
    lb_tab_all: "ALL TIME",
    lb_tab_weekly: "THIS WEEK",
    lb_tab_daily: "TODAY",
    lb_h_rank: "#",
    lb_h_guardian: "GUARDIAN",
    lb_h_level: "LEVEL",
    lb_h_score: "SCORE",
    lb_h_date: "DATE",
    lb_updated: "UPDATED:",
    lb_refresh: "REFRESH",
    lb_empty_title: "NO GUARDIANS YET",
    lb_empty_sub: "BE THE FIRST TO CLAIM THE THRONE",
    lb_empty_hint: "🎮 &nbsp; PLAY THE GAME · SUBMIT YOUR SCORE",
    my_rank: "YOUR RANK",
    best_score: "BEST SCORE",
    mo_title: "GAME NOT AVAILABLE",
    mo_sub: "ON MOBILE DEVICES",
    mo_body: "AquaGuard requires a keyboard & mouse.<br>Please open on a desktop or laptop.",
    mo_hint: "DESKTOP ONLY EXPERIENCE",
    mo_scroll: "▼ SCROLL FOR LEADERBOARD ▼"
  },
  ar: {
    ag_title_1: "أكوا",
    ag_title_2: "جارد",
    ag_tagline: "احمِ النيل · أنقذ القرية · احرس المياه",
    ag_fullscreen: "ملء الشاشة",
    ag_exit: "خروج",
    ag_hud_title: "أكوا جارد",
    ag_live: "مباشر",
    lb_title: "قاعة الحراس",
    lb_subtitle: "أفضل المدافعين عن النيل · تصنيفات مباشرة",
    lb_tab_all: "كل الوقت",
    lb_tab_weekly: "هذا الأسبوع",
    lb_tab_daily: "اليوم",
    lb_h_rank: "#",
    lb_h_guardian: "الحارس",
    lb_h_level: "المستوى",
    lb_h_score: "النقاط",
    lb_h_date: "التاريخ",
    lb_updated: "تم التحديث:",
    lb_refresh: "تحديث",
    lb_empty_title: "لا يوجد حراس بعد",
    lb_empty_sub: "كن أول من يعتلي العرش",
    lb_empty_hint: "🎮 &nbsp; العب اللعبة · سجل نقاطك",
    my_rank: "ترتيبك",
    best_score: "أفضل نقاط",
    mo_title: "اللعبة غير متاحة",
    mo_sub: "على الهواتف المحمولة",
    mo_body: "تتطلب أكوا جارد لوحة مفاتيح وفأرة.<br>يرجى الفتح على جهاز كمبيوتر أو لابتوب.",
    mo_hint: "تجربة للكمبيوتر فقط",
    mo_scroll: "▼ مرر لأسفل لقائمة المتصدرين ▼"
  }
};

// Merge translations if global object exists
if (typeof translations !== 'undefined') {
  Object.assign(translations.en, agTranslations.en);
  Object.assign(translations.ar, agTranslations.ar);
  
  // Re-apply language to update new keys
  const currentLang = localStorage.getItem("language") || "en";
  if (typeof setLanguage === 'function') {
    setLanguage(currentLang);
  }
}

/* ══════════════════════════════════════
   THEME TOGGLE
══════════════════════════════════════ */
var themeBtn = document.getElementById('theme-toggle');
var html     = document.documentElement;

function setTheme(t) {
  html.setAttribute('data-theme', t);
  themeBtn.className = t === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  localStorage.setItem('ag-theme', t);
}
setTheme(localStorage.getItem('ag-theme') || 'dark');
themeBtn.addEventListener('click', function() {
  setTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

/* ══════════════════════════════════════
   MOBILE DEVICE DETECTION
══════════════════════════════════════ */
(function() {
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    || window.innerWidth < 768;

  if (!isMobile) return;

  // Build the overlay with data-keys for translation
  var overlay = document.createElement('div');
  overlay.id = 'ag-mobile-overlay';
  overlay.innerHTML = [
    '<div class="ag-mo-box">',
    '  <div class="ag-mo-pixels" aria-hidden="true">',
    '    <div class="ag-mo-pixel p1"></div>',
    '    <div class="ag-mo-pixel p2"></div>',
    '    <div class="ag-mo-pixel p3"></div>',
    '    <div class="ag-mo-pixel p4"></div>',
    '    <div class="ag-mo-pixel p5"></div>',
    '  </div>',
    '  <div class="ag-mo-icon">🎮</div>',
    '  <h2 class="ag-mo-title" data-key="mo_title">GAME NOT AVAILABLE</h2>',
    '  <p class="ag-mo-sub" data-key="mo_sub">ON MOBILE DEVICES</p>',
    '  <div class="ag-mo-divider"></div>',
    '  <p class="ag-mo-body" data-key="mo_body">AquaGuard requires a keyboard &amp; mouse.<br>Please open on a desktop or laptop.</p>',
    '  <div class="ag-mo-hint">',
    '    <span class="ag-mo-key">💻</span>',
    '    <span data-key="mo_hint">DESKTOP ONLY EXPERIENCE</span>',
    '  </div>',
    '  <div class="ag-mo-blink" data-key="mo_scroll">▼ SCROLL FOR LEADERBOARD ▼</div>',
    '</div>'
  ].join('');

  // Inject CSS (Already in CSS file, but keeping dynamic injection if needed for specific overlay styles not in CSS)
  // Since we moved styles to CSS file, we don't need to inject them here.
  
  // Hide the game section content, replace with overlay
  var gameSection = document.getElementById('gameSection');
  if (gameSection) {
    var frameWrapper = gameSection.querySelector('.ag-frame-wrapper');
    var titleArea    = gameSection.querySelector('.ag-title-area');
    if (frameWrapper) frameWrapper.style.display = 'none';
    if (titleArea)    titleArea.style.display    = 'none';
    gameSection.appendChild(overlay);
    
    // Trigger translation for the new elements
    const currentLang = localStorage.getItem("language") || "en";
    if (typeof setLanguage === 'function') {
      setLanguage(currentLang);
    }
  }
})();

/* ══════════════════════════════════════
   STARS
══════════════════════════════════════ */
(function() {
  var c = document.getElementById('agStars');
  if (!c) return;
  for (var i = 0; i < 70; i++) {
    var s = document.createElement('div');
    s.className = 'ag-star';
    var sz = Math.random() < 0.25 ? 3 : 2;
    s.style.cssText =
      'width:'+sz+'px;height:'+sz+'px;' +
      'left:'+(Math.random()*100)+'%;' +
      'top:'+(Math.random()*55)+'%;' +
      'animation-duration:'+(Math.random()*2+1)+'s;' +
      'animation-delay:'+(Math.random()*3)+'s;';
    c.appendChild(s);
  }
})();

/* ══════════════════════════════════════
   FULLSCREEN
══════════════════════════════════════ */
document.getElementById('fsBtn').addEventListener('click', function() {
  var frame = document.getElementById('gameFrame');
  var isFs  = document.fullscreenElement || document.webkitFullscreenElement;
  if (!isFs) {
    (frame.requestFullscreen || frame.webkitRequestFullscreen).call(frame);
  } else {
    (document.exitFullscreen || document.webkitExitFullscreen).call(document);
  }
});

function updateFsIcon() {
  var isFs = document.fullscreenElement || document.webkitFullscreenElement;
  var lang = localStorage.getItem("language") || "en";
  var label = isFs ? (lang === 'ar' ? 'خروج' : 'EXIT') : (lang === 'ar' ? 'ملء الشاشة' : 'FULLSCREEN');
  
  document.getElementById('fsIcon').className   = isFs ? 'fas fa-compress' : 'fas fa-expand';
  var fsLabel = document.getElementById('fsLabel');
  if (fsLabel) {
      fsLabel.textContent = label;
      // Update data-key so setLanguage can pick it up later if language changes while in FS
      fsLabel.setAttribute('data-key', isFs ? 'ag_exit' : 'ag_fullscreen');
  }
}
document.addEventListener('fullscreenchange',       updateFsIcon);
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
var DEMO_DATA = { alltime: [], weekly: [], daily: [] };

function renderLeaderboard(data) {
  var tbody = document.getElementById('lbBody');
  if (!tbody) return;
  
  var lang = localStorage.getItem("language") || "en";
  var t = agTranslations[lang] || agTranslations.en;

  if (!data || data.length === 0) {
    tbody.innerHTML = [
      '<tr><td colspan="5">',
      '  <div class="ag-lb-empty-wrap">',
      '    <div class="ag-lb-empty-icon">🏆</div>',
      '    <div class="ag-lb-empty-bars">',
      '      <div class="ag-lb-empty-bar"></div>',
      '      <div class="ag-lb-empty-bar"></div>',
      '      <div class="ag-lb-empty-bar"></div>',
      '      <div class="ag-lb-empty-bar"></div>',
      '      <div class="ag-lb-empty-bar"></div>',
      '    </div>',
      '    <div class="ag-lb-empty-title" data-key="lb_empty_title">' + t.lb_empty_title + '</div>',
      '    <div class="ag-lb-empty-sub" data-key="lb_empty_sub">' + t.lb_empty_sub + '</div>',
      '    <div class="ag-lb-empty-hint" data-key="lb_empty_hint">' + t.lb_empty_hint + '</div>',
      '  </div>',
      '</td></tr>'
    ].join('');
    return;
  }

  var rows = '';
  data.forEach(function(e, i) {
    var rank   = e.rank || i + 1;
    var rc     = rank === 1 ? 'rank-1' : rank === 2 ? 'rank-2' : rank === 3 ? 'rank-3' : '';
    var medal  = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '#' + rank;
    var dateS  = e.date ? e.date.slice(5).replace('-','/') : '—';
    
    // Level label translation
    var lvlLabel = lang === 'ar' ? 'مستوى' : 'LVL';
    
    rows += '<tr class="'+rc+'">'
      + '<td class="center"><span class="ag-rank-badge">'+medal+'</span></td>'
      + '<td><span class="ag-avatar"></span>'+e.name+'</td>'
      + '<td class="center"><span class="ag-level-tag">'+lvlLabel+' '+(e.level||1)+'</span></td>'
      + '<td class="right"><span class="ag-score-value">'+Number(e.score).toLocaleString()+'</span></td>'
      + '<td class="right" style="font-size:16px;opacity:0.6;">'+dateS+'</td>'
      + '</tr>';
  });

  tbody.innerHTML = rows;

  var upd = document.getElementById('lbUpdatedAt');
  if (upd) {
    var now = new Date();
    var timeStr = now.toTimeString().slice(0,5);
    upd.innerHTML = '<span data-key="lb_updated">' + t.lb_updated + '</span> ' + timeStr;
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
  var stored = localStorage.getItem('ag_lb_' + tab);
  var data   = stored ? JSON.parse(stored) : DEMO_DATA[tab] || [];
  renderLeaderboard(data);
}

function refreshLeaderboard() {
  var icon = document.getElementById('refreshIcon');
  if (icon) icon.style.transform = 'rotate(360deg)';
  if (icon) icon.style.transition = 'transform 0.5s ease';
  loadLeaderboard(currentTab);
  setTimeout(function() {
    if (icon) { icon.style.transform = ''; icon.style.transition = ''; }
  }, 600);
}

// Hook into the global setLanguage to re-render leaderboard when language changes
// We can overwrite the global setLanguage or add a listener if possible.
// Since we can't easily overwrite without potentially breaking things, 
// we'll add a click listener to the language options to trigger a re-render.
document.querySelectorAll('.lang-option').forEach(function(opt) {
    opt.addEventListener('click', function() {
        setTimeout(function() {
            loadLeaderboard(currentTab);
            updateFsIcon();
        }, 50);
    });
});

// Initial load
loadLeaderboard('alltime');

/* ══════════════════════════════════════
   RECEIVE SCORE FROM GAME
══════════════════════════════════════ */
window.addEventListener('message', function(event) {
  var msg = event.data;
  if (!msg || msg.type !== 'AQUAGUARD_SCORE') return;

  var playerName = msg.player || 'PLAYER';
  var score      = parseInt(msg.score)  || 0;
  var level      = parseInt(msg.level)  || 1;
  var dateStr    = new Date().toISOString().slice(0,10);

  ['alltime','weekly','daily'].forEach(function(tab) {
    var stored = localStorage.getItem('ag_lb_'+tab);
    var data   = stored ? JSON.parse(stored) : [];
    data.push({ name: playerName, score: score, level: level, date: dateStr });
    data.sort(function(a,b){ return b.score - a.score; });
    data = data.slice(0, 10);
    data.forEach(function(e,i){ e.rank = i+1; });
    localStorage.setItem('ag_lb_'+tab, JSON.stringify(data));
  });

  // Show "Your Rank" strip
  var allData = JSON.parse(localStorage.getItem('ag_lb_alltime') || '[]');
  var myIdx   = allData.findIndex(function(e){ return e.name === playerName; });
  if (myIdx !== -1) {
    var strip = document.getElementById('myRankStrip');
    if (strip) {
      strip.style.display = 'flex';
      document.getElementById('myRankValue').textContent = '#' + (myIdx+1);
      document.getElementById('myBestScore').textContent = Number(allData[myIdx].score).toLocaleString();
    }
  }

  loadLeaderboard(currentTab);
});

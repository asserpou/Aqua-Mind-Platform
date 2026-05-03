/* ===================================================
   Interactive.js — AquaMind Interactive House
   =================================================== */

/* ══════════════════════════════════════
   TRANSLATIONS
══════════════════════════════════════ */
const ihTranslations = {
  en: {
    ih_badge: "Interactive Experience",
    ih_hero_title_1: "Your",
    ih_hero_title_2: "Smart Home",
    ih_hero_title_3: "Water Journey",
    ih_hero_desc: "Explore every room and discover how your daily habits impact water consumption. Click on a room to learn, save, and make a difference.",
    ih_stat_1: "Avg. daily usage per person",
    ih_stat_2: "Can be saved with smart habits",
    ih_stat_3: "Sections to explore",
    ih_map_title: "Interactive Home",
    ih_map_subtitle: "Click a room · then hover or select an item to explore",
    ih_panel_hint: "Select an item to learn tips",
    ih_tip_badge: "💡 Water Conservation Tip",
    ih_btn_more: "View More Details",
    ih_btn_reset: "Reset View",
    ih_zoom_hint: "Click any room to zoom in",
    
    // Room Names
    room_bathroom: "Bathroom 🚿",
    room_kitchen: "Kitchen 🍳",
    room_garden: "Garden 🌱",
    
    // Items
    item_shower: "Shower",
    item_bathtub: "Bathtub",
    item_toilet: "Toilet",
    item_sink: "Kitchen Tap",
    item_hose: "Garden Hose",
    
    // Tips
    tip_shower: "Limit showers to 5 minutes instead of 15 — saves 25 gallons each time. Install a low-flow showerhead (2 gpm or less) to cut water use by 40% with no loss of pressure.",
    tip_bathtub: "A full bath uses 36–50 gallons. Switching to a 5-minute shower saves roughly half that amount. If you do use the tub, fill it only halfway to cut water use significantly.",
    tip_toilet: "Older toilets use 6 gallons per flush. Replace with a WaterSense-certified dual-flush model (1.1–1.6 gal). Check for leaks — a silent leak can waste 200 gallons a day!",
    tip_sink: "Turn off the tap while scrubbing dishes — saves 8 gallons a minute. Install a 1.5 gpm aerator to cut flow by 30% without any noticeable difference.",
    tip_hose: "Water in the early morning or after sunset to cut evaporation by 30%. Switch to drip irrigation to save up to 50% of outdoor water use.",
    
    // Details
    det_bath_badge: "~120 L / day",
    det_bath_sub: "Highest water-use room in the home",
    det_bath_footer: "Bathroom habits account for over 35% of total home water use.",
    det_kit_badge: "~80 L / day",
    det_kit_sub: "Smart habits here save big every day",
    det_kit_footer: "A full dishwasher load uses 60% less water than hand-washing the same dishes.",
    det_gard_badge: "~100 L / day",
    det_gard_sub: "Outdoor watering can exceed all indoor use combined",
    det_gard_footer: "Drip irrigation delivers water directly to roots — cutting outdoor use by up to 50%.",
    
    // Detailed Tips
    dtip_shower: "A standard shower runs at ~8 L/min. Cutting from 15 to 5 minutes saves ~80 L per shower. A low-flow showerhead cuts use by 40% with no pressure loss.",
    dtip_bathtub: "A full tub uses 140–200 L. Filling only halfway halves this instantly. Reserve baths for once or twice a week.",
    dtip_toilet: "Upgrading to a WaterSense dual-flush toilet saves a family of four over 16,000 L per year. Always check for silent leaks.",
    dtip_sink: "Running the tap while washing dishes uses up to 40 L per session. Filling a basin drops this to just 5 L — an 87% reduction.",
    dtip_hose: "A garden hose flows at ~1000 L/hour. Switching to drip irrigation at the right time of day halves outdoor consumption and keeps plants healthier.",
    
    // Premium Section
    ih_prem_section: "Premium Interactive Houses",
    ih_prem_sub: "Explore specialized environments and learn advanced water conservation techniques from around the globe.",
    ih_prem_tag: "Premium",
    ih_unlock_overlay: "Unlock House",
    ih_unlock_btn: "Unlock Experience",
    ih_members_only: "Members Only",

    // Premium Houses
    ih_house_eco_title: "Eco-Smart Villa",
    ih_house_eco_sub: "Greywater Recycling Systems & Smart Irrigation",
    ih_house_desert_title: "Desert Oasis",
    ih_house_desert_sub: "Arid Climate Conservation & Xeriscaping",
    ih_house_urban_title: "Urban Apartment",
    ih_house_urban_sub: "High-Rise Water Savings & Vertical Gardens",

    // Modal
    ih_modal_badge: "Coming Soon",
    ih_modal_title: "This House is Under Construction",
    ih_modal_text: "We're working hard to bring you this immersive interactive experience. Thank you for being a ",
    ih_modal_gold: "Premium",
    ih_modal_text2: " member — you'll be the first to explore it! 💧",
    ih_modal_stay: "Stay tuned — new specialized environments drop soon.",
    ih_modal_btn: "Got it, thanks!",
  },
  ar: {
    ih_badge: "تجربة تفاعلية",
    ih_hero_title_1: "رحلتك",
    ih_hero_title_2: "في المنزل الذكي",
    ih_hero_title_3: "لتوفير المياه",
    ih_hero_desc: "استكشف كل غرفة واكتشف كيف تؤثر عاداتك اليومية على استهلاك المياه. انقر على الغرفة للتعلم، التوفير، وإحداث فرق.",
    ih_stat_1: "متوسط الاستهلاك اليومي للفرد",
    ih_stat_2: "يمكن توفيرها بعادات ذكية",
    ih_stat_3: "أقسام للاستكشاف",
    ih_map_title: "المنزل التفاعلي",
    ih_map_subtitle: "انقر على غرفة · ثم مرر أو اختر عنصراً للاستكشاف",
    ih_panel_hint: "اختر عنصراً لمعرفة النصائح",
    ih_tip_badge: "💡 نصيحة لتوفير المياه",
    ih_btn_more: "عرض المزيد من التفاصيل",
    ih_btn_reset: "إعادة تعيين العرض",
    ih_zoom_hint: "انقر على أي غرفة للتكبير",
    
    // Room Names
    room_bathroom: "الحمام 🚿",
    room_kitchen: "المطبخ 🍳",
    room_garden: "الحديقة 🌱",
    
    // Items
    item_shower: "الدش",
    item_bathtub: "حوض الاستحمام",
    item_toilet: "المرحاض",
    item_sink: "صنبور المطبخ",
    item_hose: "خرطوم الحديقة",
    
    // Tips
    tip_shower: "قلل وقت الاستحمام إلى 5 دقائق بدلاً من 15 — يوفر 25 جالوناً في كل مرة. ركب رأس دش منخفض التدفق لتقليل الاستهلاك بنسبة 40%.",
    tip_bathtub: "يستهلك الحمام الكامل 36-50 جالوناً. التحول لدش مدته 5 دقائق يوفر النصف تقريباً. إذا استخدمت الحوض، املأه للنصف فقط.",
    tip_toilet: "المراحيض القديمة تستهلك 6 جالونات لكل دافقة. استبدلها بموديل مزدوج التدفق. تحقق من التسريبات — التسريب الصامت يهدر 200 جالون يومياً!",
    tip_sink: "أغلق الصنبور أثناء فرك الأطباق — يوفر 8 جالونات في الدقيقة. ركب مهوية لتقليل التدفق بنسبة 30% دون فرق ملحوظ.",
    tip_hose: "اسقِ في الصباح الباكر أو بعد الغروب لتقليل التبخر بنسبة 30%. تحول للري بالتنقيط لتوفير حتى 50% من مياه الري.",
    
    // Details
    det_bath_badge: "~120 لتر / يوم",
    det_bath_sub: "أعلى غرفة استهلاكاً للمياه في المنزل",
    det_bath_footer: "عادات الحمام تمثل أكثر من 35% من إجمالي استهلاك المنزل للمياه.",
    det_kit_badge: "~80 لتر / يوم",
    det_kit_sub: "عادات ذكية هنا توفر الكثير كل يوم",
    det_kit_footer: "غسالة الأطباق الممتلئة تستهلك مياهاً أقل بنسبة 60% من الغسيل اليدوي لنفس الأطباق.",
    det_gard_badge: "~100 لتر / يوم",
    det_gard_sub: "الري الخارجي قد يتجاوز كل الاستهلاك الداخلي مجتمعاً",
    det_gard_footer: "الري بالتنقيط يوصل الماء للجذور مباشرة — مما يقلل الاستهلاك الخارجي بنسبة تصل إلى 50%.",
    
    // Detailed Tips
    dtip_shower: "الدش العادي يضخ ~8 لتر/دقيقة. التقليل من 15 إلى 5 دقائق يوفر ~80 لتر. رأس الدش الموفر يقلل الاستهلاك 40%.",
    dtip_bathtub: "الحوض الممتلئ يستهلك 140-200 لتر. ملؤه للنصف يقلل this فوراً. اجعل الاستحمام في الحوض لمرة أو مرتين أسبوعياً.",
    dtip_toilet: "الترقية لمرحاض مزدوج التدفق يوفر لعائلة من 4 أفراد أكثر من 16,000 لتر سنوياً. تحقق دائماً من التسريبات.",
    dtip_sink: "ترك الصنبور مفتوحاً أثناء غسل الأطباق يستهلك حتى 40 لتر. ملء حوض الغسيل يخفض هذا إلى 5 لترات فقط — توفير 87%.",
    dtip_hose: "خرطوم الحديقة يضخ ~1000 لتر/ساعة. التحول للري بالتنقيط في الوقت المناسب يقلل الاستهلاك للنصف ويحافظ على صحة النباتات.",

    // Premium Section
    ih_prem_section: "منازل تفاعلية حصرية",
    ih_prem_sub: "استكشف بيئات متخصصة وتعرف على تقنيات متقدمة للحفاظ على المياه من جميع أنحاء العالم.",
    ih_prem_tag: "مميز",
    ih_unlock_overlay: "فتح المنزل",
    ih_unlock_btn: "فتح التجربة",
    ih_members_only: "للأعضاء فقط",

    // Premium Houses
    ih_house_eco_title: "الفيلا الذكية المستدامة",
    ih_house_eco_sub: "أنظمة تدوير المياه الرمادية والري الذكي",
    ih_house_desert_title: "واحة الصحراء",
    ih_house_desert_sub: "الحفاظ على المياه في المناخات الجافة وتنسيق الحدائق الجافة",
    ih_house_urban_title: "الشقة العصرية",
    ih_house_urban_sub: "توفير المياه في ناطحات السحاب والحدائق الرأسية",

    // Modal
    ih_modal_badge: "قريباً",
    ih_modal_title: "هذا المنزل قيد الإنشاء",
    ih_modal_text: "نحن نعمل بجد لنقدم لك هذه التجربة التفاعلية الغامرة. شكراً لكونك عضواً ",
    ih_modal_gold: "مميزاً (Premium)",
    ih_modal_text2: " — ستكون أول من يستكشفها! 💧",
    ih_modal_stay: "ابقَ على اطلاع — بيئات متخصصة جديدة ستتوفر قريباً.",
    ih_modal_btn: "فهمت، شكراً!",
  }
};

// Merge translations if global object exists
if (typeof translations !== 'undefined') {
  Object.assign(translations.en, ihTranslations.en);
  Object.assign(translations.ar, ihTranslations.ar);
  
  // Re-apply language to update new keys
  const currentLang = localStorage.getItem("language") || "en";
  if (typeof setLanguage === 'function') {
    setLanguage(currentLang);
  }
}

// Helper to get text
function t(key) {
  const lang = localStorage.getItem("language") || "en";
  return (ihTranslations[lang] && ihTranslations[lang][key]) || ihTranslations.en[key] || key;
}

const IMAGE_W = 1013, IMAGE_H = 862, DEFAULT_PADDING = 0.18;

// Updated rooms data to use translation keys
const rooms = [
  {
    id: 'bathroom', nameKey: 'room_bathroom', padding: 0.15,
    bbox: { x: 590, y: 348, w: 220, h: 160 },
    items: [
      { id: 'shower',  icon: '🚿', labelKey: 'item_shower',
        bbox: { x: 600, y: 376, w: 50, h: 80 },
        tipTitleKey: 'item_shower',
        tipKey: 'tip_shower' },
      { id: 'bathtub', icon: '🛁', labelKey: 'item_bathtub',
        bbox: { x: 595, y: 450, w: 128, h: 54 },
        tipTitleKey: 'item_bathtub',
        tipKey: 'tip_bathtub' },
      { id: 'toilet',  icon: '🚽', labelKey: 'item_toilet',
        bbox: { x: 745, y: 430, w: 65, h: 70 },
        tipTitleKey: 'item_toilet',
        tipKey: 'tip_toilet' }
    ]
  },
  {
    id: 'kitchen', nameKey: 'room_kitchen', padding: 0.18,
    bbox: { x: 265, y: 522, w: 220, h: 160 },
    items: [
      { id: 'sink', icon: '🚰', labelKey: 'item_sink',
        bbox: { x: 340, y: 580, w: 66, h: 35 },
        tipTitleKey: 'item_sink',
        tipKey: 'tip_sink' }
    ]
  },
  {
    id: 'garden', nameKey: 'room_garden', padding: 0.12,
    bbox: { x: 30, y: 680, w: 435, h: 145 },
    items: [
      { id: 'hose', icon: '💧', labelKey: 'item_hose',
        bbox: { x: 190, y: 750, w: 180, h: 55 },
        tipTitleKey: 'item_hose',
        tipKey: 'tip_hose' }
    ]
  }
];

const roomDetailsData = {
  bathroom: {
    icon: '🚿', titleKey: 'room_bathroom', badgeKey: 'det_bath_badge',
    subKey: 'det_bath_sub',
    footerKey: 'det_bath_footer',
    items: [
      { icon: '🚿', titleKey: 'item_shower', tipKey: 'dtip_shower' },
      { icon: '🛁', titleKey: 'item_bathtub', tipKey: 'dtip_bathtub' },
      { icon: '🚽', titleKey: 'item_toilet', tipKey: 'dtip_toilet' }
    ]
  },
  kitchen: {
    icon: '🍳', titleKey: 'room_kitchen', badgeKey: 'det_kit_badge',
    subKey: 'det_kit_sub',
    footerKey: 'det_kit_footer',
    items: [
      { icon: '🚰', titleKey: 'item_sink', tipKey: 'dtip_sink' }
    ]
  },
  garden: {
    icon: '🌱', titleKey: 'room_garden', badgeKey: 'det_gard_badge',
    subKey: 'det_gard_sub',
    footerKey: 'det_gard_footer',
    items: [
      { icon: '💧', titleKey: 'item_hose', tipKey: 'dtip_hose' }
    ]
  }
};

/* ═══════════════════════════════════════
   EVERYTHING RUNS AFTER DOM IS READY
═══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {

  /* ── DOM refs ── */
  const stage         = document.getElementById('stage');
  const imgWrapper    = document.getElementById('imgWrapper');
  const overlayEl     = document.getElementById('overlayAreas');
  const itemLayer     = document.getElementById('itemLayer');
  const infoPanel     = document.getElementById('infoPanel');
  const panelName     = document.getElementById('panelRoomName');
  const panelItems    = document.getElementById('panelItems');
  const tipCard       = document.getElementById('tipCard');
  const tipTitle      = document.getElementById('tipTitle');
  const tipText       = document.getElementById('tipText');
  const resetBtn      = document.getElementById('resetBtn');
  const viewMoreBtn   = document.getElementById('viewMoreBtn');
  const roomDetailsEl = document.getElementById('roomDetails');
  const themeToggle   = document.getElementById('theme-toggle'); // handled by script.js
  const htmlEl        = document.documentElement;

  let isZoomed    = false;
  let activeRoom  = null;
  let activeItem  = null;
  let currentZoom = { S: 1, tx: 0, ty: 0 };

  /* ══════════════════════════════
     HERO COUNTER ANIMATION
  ══════════════════════════════ */
  function animateCounter(el, target) {
    var duration = 1600;
    var startTime = null;
    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      // ease-out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(step);
  }

  /* Use IntersectionObserver so counters animate when scrolled into view */
  var statEls = document.querySelectorAll('.ih-stat-num[data-target]');
  if (statEls.length) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target, parseInt(entry.target.getAttribute('data-target'), 10));
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });
      statEls.forEach(function(el) { io.observe(el); });
    } else {
      statEls.forEach(function(el) {
        animateCounter(el, parseInt(el.getAttribute('data-target'), 10));
      });
    }
  }

  /* ══════════════════════════════
     HERO PARTICLES
  ══════════════════════════════ */
  var particlesEl = document.getElementById('particles');
  if (particlesEl) {
    for (var i = 0; i < 18; i++) {
      var p    = document.createElement('div');
      p.className = 'ih-particle';
      var size = Math.random() * 6 + 3;
      p.style.width            = size + 'px';
      p.style.height           = size + 'px';
      p.style.left             = (Math.random() * 100) + '%';
      p.style.top              = (Math.random() * 100) + '%';
      p.style.animationDuration= (Math.random() * 6 + 4) + 's';
      p.style.animationDelay   = (Math.random() * 4)     + 's';
      p.style.opacity          = (Math.random() * 0.5 + 0.2).toFixed(2);
      particlesEl.appendChild(p);
    }
  }

  /* ══════════════════════════════
     ZOOM MATH
  ══════════════════════════════ */
  function computeZoom(bbox, padding) {
    var sw  = stage.offsetWidth,  sh  = stage.offsetHeight;
    var scx = sw / IMAGE_W,       scy = sh / IMAGE_H;
    var rx  = bbox.x * scx,       ry  = bbox.y * scy;
    var rw  = bbox.w * scx,       rh  = bbox.h * scy;
    var ph  = rw * padding,       pv  = rh * padding;
    var padX = rx - ph,  padY = ry - pv;
    var padW = rw + ph*2, padH = rh + pv*2;
    var S   = Math.min(sw / padW, sh / padH);
    var cx  = padX + padW / 2,   cy  = padY + padH / 2;
    return { S: S, tx: sw/2 - cx*S, ty: sh/2 - cy*S };
  }

  function applyZoom(bbox, padding) {
    var z = computeZoom(bbox, padding);
    currentZoom = z;
    imgWrapper.style.transform = 'translate(' + z.tx + 'px, ' + z.ty + 'px) scale(' + z.S + ')';
    return z;
  }

  function imageToScreen(ix, iy, iw, ih) {
    var sw  = stage.offsetWidth,  sh  = stage.offsetHeight;
    var scx = sw / IMAGE_W,       scy = sh / IMAGE_H;
    var S = currentZoom.S, tx = currentZoom.tx, ty = currentZoom.ty;
    return {
      left:   ix * scx * S + tx,
      top:    iy * scy * S + ty,
      width:  iw * scx * S,
      height: ih * scy * S
    };
  }

  /* ══════════════════════════════
     ROOM OVERLAYS
  ══════════════════════════════ */
  function buildRoomOverlays() {
    overlayEl.innerHTML = '';
    var sw  = stage.offsetWidth,  sh  = stage.offsetHeight;
    var scx = sw / IMAGE_W,       scy = sh / IMAGE_H;

    rooms.forEach(function(room) {
      var div = document.createElement('div');
      div.className  = 'room-hit';
      div.dataset.id = room.id;
      div.style.left   = (room.bbox.x * scx) + 'px';
      div.style.top    = (room.bbox.y * scy) + 'px';
      div.style.width  = (room.bbox.w * scx) + 'px';
      div.style.height = (room.bbox.h * scy) + 'px';

      var tag = document.createElement('div');
      tag.className   = 'room-tag';
      tag.textContent = t(room.nameKey); // Translate
      div.appendChild(tag);

      div.addEventListener('click', function(e) {
        e.preventDefault();
        if (!isZoomed) zoomToRoom(room);
      });
      overlayEl.appendChild(div);
    });
  }

  /* ══════════════════════════════
     ITEM OVERLAYS
  ══════════════════════════════ */
  function makeItemDiv(item, idx, fadeIn) {
    var div = document.createElement('div');
    div.className  = 'item-hit' + (fadeIn ? '' : ' active');
    div.dataset.id = item.id;

    var pos = imageToScreen(item.bbox.x, item.bbox.y, item.bbox.w, item.bbox.h);
    div.style.left   = pos.left   + 'px';
    div.style.top    = pos.top    + 'px';
    div.style.width  = pos.width  + 'px';
    div.style.height = pos.height + 'px';
    if (fadeIn) div.style.transitionDelay = (0.45 + idx * 0.08) + 's';

    var inner = document.createElement('div'); inner.className = 'item-inner';
    var pulse = document.createElement('div'); pulse.className = 'item-pulse';
    var emoji = document.createElement('div'); emoji.className = 'item-emoji'; emoji.textContent = item.icon;
    var nm    = document.createElement('div'); nm.className    = 'item-name-label'; nm.textContent = t(item.labelKey); // Translate

    inner.appendChild(pulse);
    inner.appendChild(emoji);
    div.appendChild(inner);
    div.appendChild(nm);

    div.addEventListener('click', function(e) { e.preventDefault(); selectItem(item); });
    return div;
  }

  function buildItemOverlays(room) {
    itemLayer.innerHTML = '';
    room.items.forEach(function(item, idx) {
      var div = makeItemDiv(item, idx, true);
      itemLayer.appendChild(div);
      requestAnimationFrame(function() { requestAnimationFrame(function() { div.classList.add('active'); }); });
    });
  }

  function buildItemOverlaysKeepSelected(selectedItem) {
    if (!activeRoom) return;
    itemLayer.innerHTML = '';
    activeRoom.items.forEach(function(item, idx) {
      var div = makeItemDiv(item, idx, false);
      if (item.id === selectedItem.id) div.classList.add('selected');
      itemLayer.appendChild(div);
    });
  }

  /* ══════════════════════════════
     ZOOM TO ROOM
  ══════════════════════════════ */
  function zoomToRoom(room) {
    isZoomed   = true;
    activeRoom = room;
    activeItem = null;

    applyZoom(room.bbox, room.padding != null ? room.padding : DEFAULT_PADDING);
    overlayEl.querySelectorAll('.room-hit').forEach(function(h) { h.style.pointerEvents = 'none'; });

    /* Side panel */
    panelName.textContent = t(room.nameKey); // Translate
    panelItems.innerHTML  = '';
    room.items.forEach(function(item) {
      var btn = document.createElement('button');
      btn.className  = 'panel-item-btn';
      btn.dataset.id = item.id;
      btn.innerHTML  = '<span class="btn-icon">' + item.icon + '</span><span class="btn-label">' + t(item.labelKey) + '</span>'; // Translate
      btn.addEventListener('click', function() { selectItem(item); });
      panelItems.appendChild(btn);
    });

    infoPanel.classList.add('visible');
    viewMoreBtn.classList.add('visible');
    renderDetails(room);

    setTimeout(function() { buildItemOverlays(room); }, 720);
  }

  /* ══════════════════════════════
     SELECT ITEM
  ══════════════════════════════ */
  function selectItem(item) {
    if (activeItem && activeItem.id === item.id) { reset(); return; }
    activeItem = item;

    panelItems.querySelectorAll('.panel-item-btn').forEach(function(b) {
      b.classList.toggle('selected', b.dataset.id === item.id);
    });
    itemLayer.querySelectorAll('.item-hit').forEach(function(d) {
      d.classList.toggle('selected', d.dataset.id === item.id);
    });

    applyZoom(item.bbox, 0.95);
    setTimeout(function() { buildItemOverlaysKeepSelected(item); }, 720);

    tipTitle.textContent = item.icon + '  ' + t(item.tipTitleKey); // Translate
    tipText.textContent  = t(item.tipKey); // Translate
    tipCard.classList.add('visible');
  }

  /* ══════════════════════════════
     RENDER VIEW MORE PANEL
  ══════════════════════════════ */
  function renderDetails(room) {
    var d = roomDetailsData[room.id];
    if (!d) return;
    roomDetailsEl.classList.remove('visible');

    var itemsHTML = d.items.map(function(it) {
      return '<div class="rd-item">' +
        '<div class="rd-item-icon">' + it.icon + '</div>' +
        '<div>' +
          '<div class="rd-item-title">' + t(it.titleKey) + '</div>' + // Translate
          '<div class="rd-item-tip">'   + t(it.tipKey)   + '</div>' + // Translate
        '</div>' +
      '</div>';
    }).join('');

    roomDetailsEl.innerHTML =
      '<div class="rd-header">' +
        '<div class="rd-icon">'  + d.icon  + '</div>' +
        '<div>' +
          '<div class="rd-title">' + t(d.titleKey) + '</div>' + // Translate
          '<div class="rd-sub">'   + t(d.subKey)   + '</div>' + // Translate
        '</div>' +
        '<span class="rd-badge">' + t(d.badgeKey) + '</span>' + // Translate
      '</div>' +
      '<div class="rd-items">' + itemsHTML + '</div>' +
      '<div class="rd-footer"><div class="rd-footer-text">💡 ' + t(d.footerKey) + '</div></div>'; // Translate
  }

  viewMoreBtn.addEventListener('click', function() {
    roomDetailsEl.classList.add('visible');
    setTimeout(function() {
      var top = roomDetailsEl.getBoundingClientRect().top + window.scrollY - 230;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }, 20);
  });

  // ==============================
  //  DARK / LIGHT MODE — handled by script.js
  // ==============================
  // Dark mode is managed globally by script.js
  // Sync html[data-theme] with body.dark-mode set by script.js
  (function syncTheme() {
    var saved = localStorage.getItem('theme') || 'light';
    htmlEl.setAttribute('data-theme', saved);
    if (saved === 'dark') document.body.classList.add('dark-mode');
    // Re-sync whenever script.js toggles the theme
    document.body.addEventListener('classChange', function() {
      htmlEl.setAttribute('data-theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    });
    // Watch for class changes on body via MutationObserver
    var obs = new MutationObserver(function() {
      htmlEl.setAttribute('data-theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    });
    obs.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  })();

  /* ══════════════════════════════
     RESET
  ══════════════════════════════ */
  function reset() {
    currentZoom = { S: 1, tx: 0, ty: 0 };
    imgWrapper.style.transform = 'translate(0px, 0px) scale(1)';
    infoPanel.classList.remove('visible');
    tipCard.classList.remove('visible');
    itemLayer.innerHTML = '';
    viewMoreBtn.classList.remove('visible');
    roomDetailsEl.classList.remove('visible');
    isZoomed = false; activeRoom = null; activeItem = null;
    setTimeout(function() {
      overlayEl.querySelectorAll('.room-hit').forEach(function(h) { h.style.pointerEvents = 'all'; });
    }, 750);
  }

  resetBtn.addEventListener('click', reset);

  /* ══════════════════════════════
     NAVBAR SCROLL
  ══════════════════════════════ */
  window.addEventListener('scroll', function() {
    var nb = document.querySelector('.navbar');
    if (nb) nb.classList.toggle('scrolled', window.scrollY > 30);
  });

  /* ══════════════════════════════
     RESIZE HANDLER
  ══════════════════════════════ */
  var resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      if (isZoomed) { reset(); setTimeout(buildRoomOverlays, 800); }
      else buildRoomOverlays();
    }, 120);
  });

  /* ══════════════════════════════
     LANGUAGE CHANGE LISTENER
  ══════════════════════════════ */
  // Hook into language options to re-render dynamic content
  document.querySelectorAll('.lang-option').forEach(function(opt) {
    opt.addEventListener('click', function() {
        setTimeout(function() {
            buildRoomOverlays();
            if (activeRoom) {
               // Re-render side panel and details if a room is active
               panelName.textContent = t(activeRoom.nameKey);
               panelItems.innerHTML = '';
               activeRoom.items.forEach(function(item) {
                  var btn = document.createElement('button');
                  btn.className  = 'panel-item-btn';
                  if (activeItem && activeItem.id === item.id) btn.classList.add('selected');
                  btn.dataset.id = item.id;
                  btn.innerHTML  = '<span class="btn-icon">' + item.icon + '</span><span class="btn-label">' + t(item.labelKey) + '</span>';
                  btn.addEventListener('click', function() { selectItem(item); });
                  panelItems.appendChild(btn);
               });
               renderDetails(activeRoom);
               
               // Re-render item overlays to update labels
               if (activeItem) {
                   buildItemOverlaysKeepSelected(activeItem);
                   tipTitle.textContent = activeItem.icon + '  ' + t(activeItem.tipTitleKey);
                   tipText.textContent  = t(activeItem.tipKey);
               } else {
                   buildItemOverlays(activeRoom);
               }
            }
        }, 50);
    });
  });

  /* ══════════════════════════════
     INIT
  ══════════════════════════════ */
  buildRoomOverlays();

}); /* end DOMContentLoaded */
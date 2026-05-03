pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";

const PDF_FILES = {
  en: "WaterStories_FlipBook.pdf",
  ar: "WaterStories_FlipBook_AR.pdf",
};

const STORIES_LANG = {
  en: {
    dir: "ltr",
    btnPrev: "PREVIOUS",
    btnNext: "NEXT",
    loading: "Loading Book...",
    page: "Page",
    of: "of",
    coverTitle: "Water Crisis<br>Stories & Data",
    coverSubtitle: "Egypt — Nile Drop Initiative",
    cS1n: "4",
    cS1l: "Stories",
    cS2n: "40M+",
    cS2l: "Affected",
    cS3n: "2B L",
    cS3l: "Saved",
    coverHint: "Flip the book to explore data",
    endTitle: "You've reached the end!",
    endSub: "Want to explore more water stories from around the world?",
    endBtn: "Explore More Stories",
    endHint: "Premium content • Unlock all stories",
    s1lb: "The Day the Wells Ran Dry",
    s1sb: "Sinai, Egypt",
    s1c1: "Groundwater Levels (2010–2017)",
    s1v1: "40%",
    s1l1: "decrease in 7 years",
    s1c2: "Water Usage: Before & After",
    s1v2: "30%",
    s1l2: "Reduction",
    s1pools: "Equivalent to <strong>8</strong> Olympic pools lost",
    s1c4: "Daily Consumption per Person",
    s1v4: "50L",
    s1l4: "rationed per person/day",
    s2lb: "The River That Forgot to Flow",
    s2sb: "Nile Delta, Egypt",
    s2c1: "Nile River Flow (2015–2020)",
    s2v1: "35%",
    s2l1: "decrease in flow",
    s2c2: "Crop Yields Impact",
    s2v2: "45%",
    s2l2: "Yield Reduction",
    s2c3: "Smart Irrigation Savings",
    s2v3: "25%",
    s2l3: "Water Saved",
    s2p1n: "15M",
    s2p1l: "People Affected",
    s2p2n: "25%",
    s2p2l: "Water Saved",
    s3lb: "The City That Learned to Save",
    s3sb: "Cairo, Egypt",
    s3c1: "Household Water Use (2018–2021)",
    s3v1: "28%",
    s3l1: "reduction achieved",
    s3c2: "Infrastructure Improvements",
    s3v2: "12K",
    s3l2: "Leaks Fixed",
    s3p1n: "2B",
    s3p1l: "Liters Saved",
    s3p2n: "500K",
    s3p2l: "Smart Meters",
    s3c4: "Annual Water Savings (Billion L)",
    s3v4: "2B",
    s3l4: "liters/year saved",
    s4lb: "The Summer Cairo Almost Ran Dry",
    s4sb: "Cairo, Egypt — Summer 2018",
    s4c1: "Waste Reduction After Campaign",
    s4v1: "15%",
    s4l1: "waste reduced in 1 year",
    s4c2: "Daily Water Consumption (M m³)",
    s4v2: "25%",
    s4l2: "surge in consumption",
    s4c3: "Water Lost to Leaks",
    s4v3: "20%",
    s4l3: "of treated water wasted",
    s4p1n: "4K",
    s4p1l: "Pools/Day Used",
    s4p2n: "1M",
    s4p2l: "Citizens at Risk",
    xGW: ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017"],
    xUse: ["Before", "After"],
    xCon: ["Safe", "Rationed", "Crisis"],
    xRiv: ["2015", "2016", "2017", "2018", "2019", "2020"],
    xCrp: ["2015", "2017", "2020"],
    xIrr: ["Saved", "Used"],
    xHH: ["2018", "2019", "2020", "2021"],
    xInf: ["Meters", "Leaks"],
    xSav: ["2018", "2019", "2020", "2021"],
    xC4c: ["Normal", "Summer 2018"],
    xC4k: ["Lost to Leaks", "Delivered"],
    xC4r: ["Before", "3M", "6M", "12M"],
    pageTitle: "Stories & Charts",
    home: "Home",
    stories: "Stories & Charts",
  },
  ar: {
    dir: "rtl",
    btnPrev: "السابق",
    btnNext: "التالي",
    loading: "جارٍ تحميل الكتاب...",
    page: "صفحة",
    of: "من",
    coverTitle: "أزمة المياه<br>قصص وبيانات",
    coverSubtitle: "مصر — مبادرة قطرة النيل",
    cS1n: "4",
    cS1l: "قصص",
    cS2n: "+40م",
    cS2l: "متضرر",
    cS3n: "2م ل",
    cS3l: "تم توفيره",
    coverHint: "اقلب الكتاب لاستكشاف البيانات",
    endTitle: "وصلت للنهاية!",
    endSub: "عايز تستكشف قصص مياه أكتر من حول العالم؟",
    endBtn: "استكشف قصص أكتر",
    endHint: "محتوى بريميوم • افتح كل القصص",
    s1lb: "اليوم الذي جفّت فيه الآبار",
    s1sb: "سيناء، مصر",
    s1c1: "مستويات المياه الجوفية (2010–2017)",
    s1v1: "40%",
    s1l1: "انخفاض في 7 سنوات",
    s1c2: "استخدام المياه: قبل وبعد",
    s1v2: "30%",
    s1l2: "تخفيض",
    s1pools: "ما يعادل <strong>8</strong> حمامات سباحة أولمبية مفقودة",
    s1c4: "الاستهلاك اليومي للفرد",
    s1v4: "50ل",
    s1l4: "حصة يومية للفرد",
    s2lb: "النهر الذي نسي أن يجري",
    s2sb: "دلتا النيل، مصر",
    s2c1: "تدفق نهر النيل (2015–2020)",
    s2v1: "35%",
    s2l1: "انخفاض في التدفق",
    s2c2: "تأثير على محاصيل الغلال",
    s2v2: "45%",
    s2l2: "انخفاض في الإنتاج",
    s2c3: "وفورات الري الذكي",
    s2v3: "25%",
    s2l3: "مياه موفّرة",
    s2p1n: "15م",
    s2p1l: "شخص متضرر",
    s2p2n: "25%",
    s2p2l: "مياه موفّرة",
    s3lb: "المدينة التي تعلّمت الادخار",
    s3sb: "القاهرة، مصر",
    s3c1: "استهلاك المياه المنزلية (2018–2021)",
    s3v1: "28%",
    s3l1: "تخفيض تم تحقيقه",
    s3c2: "تحسينات البنية التحتية",
    s3v2: "12ك",
    s3l2: "تسرب تم إصلاحه",
    s3p1n: "2م ل",
    s3p1l: "لتر موفّر",
    s3p2n: "500ك",
    s3p2l: "عداد ذكي",
    s3c4: "وفورات المياه السنوية (مليار لتر)",
    s3v4: "2م ل",
    s3l4: "لتر/سنة موفّر",
    s4lb: "الصيف الذي كادت فيه القاهرة تجفّ",
    s4sb: "القاهرة، مصر — صيف 2018",
    s4c1: "تقليل الهدر بعد الحملة",
    s4v1: "15%",
    s4l1: "تقليل في سنة واحدة",
    s4c2: "الاستهلاك اليومي للمياه (م م³)",
    s4v2: "25%",
    s4l2: "ارتفاع مفاجئ",
    s4c3: "مياه ضائعة بسبب التسربات",
    s4v3: "20%",
    s4l3: "من المياه المعالجة مهدرة",
    s4p1n: "4ك",
    s4p1l: "حمام/يوم",
    s4p2n: "1م",
    s4p2l: "مواطن في خطر",
    xGW: ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017"],
    xUse: ["قبل", "بعد"],
    xCon: ["آمن", "محدود", "أزمة"],
    xRiv: ["2015", "2016", "2017", "2018", "2019", "2020"],
    xCrp: ["2015", "2017", "2020"],
    xIrr: ["موفّر", "مستخدم"],
    xHH: ["2018", "2019", "2020", "2021"],
    xInf: ["عدادات", "تسربات"],
    xSav: ["2018", "2019", "2020", "2021"],
    xC4c: ["طبيعي", "صيف 2018"],
    xC4k: ["ضائع بالتسرب", "موصّل"],
    xC4r: ["قبل", "3 أشهر", "6 أشهر", "12 شهر"],
    pageTitle: "القصص والبيانات",
    home: "الرئيسية",
    stories: "القصص والبيانات",
  },
};

let chartsBuilt = false;
const chartInst = {};

function getCurrentLang() {
  const lang = localStorage.getItem("language") || "en";
  return STORIES_LANG[lang] ? lang : "en";
}

function isDark() {
  return document.body.classList.contains("dark-mode");
}
function cTick() {
  return isDark() ? "#777" : "#aaa";
}
function cGrid() {
  return isDark() ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
}
function cLegend() {
  return isDark() ? "#999" : "#888";
}

function syncChartTheme() {
  Object.values(chartInst).forEach((inst) => {
    if (!inst) return;
    const sc = inst.options.scales;
    if (sc) {
      if (sc.x?.ticks) sc.x.ticks.color = cTick();
      if (sc.y) {
        if (sc.y.grid) sc.y.grid.color = cGrid();
        if (sc.y.ticks) sc.y.ticks.color = cTick();
      }
    }
    const leg = inst.options?.plugins?.legend?.labels;
    if (leg) leg.color = cLegend();
    inst.update("none");
  });
}

new MutationObserver(() => {
  if (chartsBuilt) syncChartTheme();
}).observe(document.body, { attributes: true, attributeFilter: ["class"] });

function applyTranslations(lang) {
  // تعريف المتغير مرة واحدة في البداية
  const t = STORIES_LANG[lang] || STORIES_LANG.en;
  if (!t) return;

  // end slide translations
  const endTitle = document.querySelector("#slide-end .slide-end-title");
  const endSub   = document.querySelector("#slide-end .slide-end-sub");
  const endBtn   = document.querySelector("#slide-end .slide-end-btn span");
  const endHint  = document.querySelector("#slide-end .slide-end-hint");
  
  if (endTitle) endTitle.textContent = t.endTitle || "You've reached the end!";
  if (endSub)   endSub.textContent   = t.endSub   || "Want to explore more?";
  if (endBtn)   endBtn.textContent   = t.endBtn   || "Explore More Stories";
  if (endHint)  endHint.textContent  = t.endHint  || "Premium content";

  document.documentElement.setAttribute("dir", t.dir);
  document.documentElement.setAttribute("lang", lang);

  const bp = document.getElementById("btn-prev");
  if (bp) bp.textContent = t.btnPrev;
  const bn = document.getElementById("btn-next");
  if (bn) bn.textContent = t.btnNext;

  // Hero Text Translations
  const pt = document.querySelector('[data-key="pageTitle"]');
  if (pt) pt.textContent = t.pageTitle;
  const hm = document.querySelector('[data-key="home"]');
  if (hm) hm.textContent = t.home;
  const st = document.querySelectorAll('[data-key="stories"]');
  st.forEach((el) => (el.textContent = t.stories));

  const ct = document.querySelector(".cover-title");
  if (ct) ct.innerHTML = t.coverTitle;
  const csu = document.querySelector(".cover-subtitle");
  if (csu) csu.textContent = t.coverSubtitle;
  const ch = document.querySelector(".cover-hint");
  if (ch) ch.innerHTML = '<i class="fas fa-hand-point-right"></i> ' + t.coverHint;
  
  const cvs = document.querySelectorAll(".cover-stat");
  [
    [0, t.cS1n, t.cS1l],
    [1, t.cS2n, t.cS2l],
    [2, t.cS3n, t.cS3l],
  ].forEach(([i, n, l]) => {
    if (!cvs[i]) return;
    const nm = cvs[i].querySelector(".num");
    if (nm) nm.textContent = n;
    const lb = cvs[i].querySelector(".lbl");
    if (lb) lb.textContent = l;
  });

  function setSL(sid, lb, sb) {
    const el = document.querySelector("#" + sid + " .story-label");
    if (!el) return;
    for (let i = 0; i < el.childNodes.length; i++) {
      const n = el.childNodes[i];
      if (n.nodeType === 3 && n.textContent.trim()) {
        n.textContent = lb + " ";
        break;
      }
    }
    const sm = el.querySelector("small");
    if (sm) sm.textContent = sb;
  }
  function setCC(sid, idx, title, val, lbl) {
    const cards = document.querySelectorAll("#" + sid + " .chart-card");
    const c = cards[idx];
    if (!c) return;
    const h3 = c.querySelector("h3");
    if (h3) h3.textContent = title;
    const sv = c.querySelector(".stat-value");
    if (sv) sv.textContent = val;
    const sl = c.querySelector(".stat-label");
    if (sl) sl.textContent = lbl;
  }
  function setPS(sid, idx, num, lbl) {
    const ps = document.querySelectorAll("#" + sid + " .people-stat");
    if (!ps[idx]) return;
    const h2 = ps[idx].querySelector("h2");
    if (h2) h2.textContent = num;
    const p = ps[idx].querySelector("p");
    if (p) p.textContent = lbl;
  }

  setSL("slide-1", t.s1lb, t.s1sb);
  setCC("slide-1", 0, t.s1c1, t.s1v1, t.s1l1);
  setCC("slide-1", 1, t.s1c2, t.s1v2, t.s1l2);
  const poolsText = document.querySelector("#slide-1 .pools-text");
  if (poolsText) poolsText.innerHTML = t.s1pools;
  setCC("slide-1", 3, t.s1c4, t.s1v4, t.s1l4);

  setSL("slide-2", t.s2lb, t.s2sb);
  setCC("slide-2", 0, t.s2c1, t.s2v1, t.s2l1);
  setCC("slide-2", 1, t.s2c2, t.s2v2, t.s2l2);
  setCC("slide-2", 2, t.s2c3, t.s2v3, t.s2l3);
  setPS("slide-2", 0, t.s2p1n, t.s2p1l);
  setPS("slide-2", 1, t.s2p2n, t.s2p2l);

  setSL("slide-3", t.s3lb, t.s3sb);
  setCC("slide-3", 0, t.s3c1, t.s3v1, t.s3l1);
  setCC("slide-3", 1, t.s3c2, t.s3v2, t.s3l2);
  setPS("slide-3", 0, t.s3p1n, t.s3p1l);
  setPS("slide-3", 1, t.s3p2n, t.s3p2l);
  setCC("slide-3", 3, t.s3c4, t.s3v4, t.s3l4);

  setSL("slide-4", t.s4lb, t.s4sb);
  setCC("slide-4", 0, t.s4c1, t.s4v1, t.s4l1);
  setCC("slide-4", 1, t.s4c2, t.s4v2, t.s4l2);
  setCC("slide-4", 2, t.s4c3, t.s4v3, t.s4l3);
  setPS("slide-4", 0, t.s4p1n, t.s4p1l);
  setPS("slide-4", 1, t.s4p2n, t.s4p2l);

  if (chartsBuilt) updateChartLabels(lang);
}

window.addEventListener("storage", (e) => {
  if (e.key === "language") {
    const lang = getCurrentLang();
    applyTranslations(lang);
    showSlide("cover");
    currentSlide = null;
    initNileEvoFlip(lang);
  }
});

function updateChartLabels(lang) {
  const t = STORIES_LANG[lang];
  const map = {
    groundwaterChart1: t.xGW,
    usageChart1: t.xUse,
    consumptionChart1: t.xCon,
    riverFlowChart2: t.xRiv,
    cropChart2: t.xCrp,
    irrigationChart2: t.xIrr,
    householdChart3: t.xHH,
    infrastructureChart3: t.xInf,
    savingsChart3: t.xSav,
    consumptionChart4: t.xC4c,
    leaksChart4: t.xC4k,
    reductionChart4: t.xC4r,
  };
  Object.entries(map).forEach(([id, labels]) => {
    const inst = chartInst[id];
    if (!inst) return;
    inst.data.labels = labels;
    inst.update("none");
  });
}

document.querySelectorAll(".lang-option").forEach((opt) => {
  opt.addEventListener("click", () => {
    const lang = opt.getAttribute("data-lang");
    if (!STORIES_LANG[lang]) return;
    setTimeout(() => {
      applyTranslations(lang);
      currentSlide = null;
      showSlide("cover");
      initNileEvoFlip(lang);
    }, 50);
  });
});

/* ═══════════════════════════
    FLIPBOOK
  ═══════════════════════════ */
let pageFlip = null;
let currentSlide = null;
const bookParent = document.querySelector(".flipbook-side");

function getSlideForPage(p) {
  // p = رقم الصفحة الفعلي المقروء
  if (p <= 3) return "cover";
  if (p <= 5) return 1;
  if (p <= 7) return 2;
  if (p <= 9) return 3;
  if (p <= 11) return 4;
  return "cover";
}

function showSlide(id) {
  if (currentSlide === id) return;
  currentSlide = id;
  document.getElementById("slide-cover").classList.remove("active");
  document
    .querySelectorAll(".story-slide")
    .forEach((s) => s.classList.remove("active"));
  document
    .querySelectorAll(".charts-dot")
    .forEach((d) => d.classList.remove("active"));

  // slide-end is a story-slide with id="slide-end"
  const el =
    id === "cover"
      ? document.getElementById("slide-cover")
      : document.getElementById("slide-" + id);
  if (el) {
    void el.offsetWidth;
    el.classList.add("active");
  }
  const dot = document.querySelector(".charts-dot[data-slide='" + id + "']");
  if (dot) dot.classList.add("active");
}

function setBookOpen(open, isLast, bc) {
  bc.classList.remove("is-open", "is-cover-first", "is-cover-last");
  if (open) bc.classList.add("is-open");
  else if (isLast) bc.classList.add("is-cover-last");
  else bc.classList.add("is-cover-first");
}

function getBookDimensions() {
  const sw = window.innerWidth;
  const side = document.querySelector(".flipbook-side");
  const cw = side ? side.offsetWidth : sw;
  let w;
  if (sw <= 380) w = Math.min(cw - 24, 260);
  else if (sw <= 480) w = Math.min(cw - 20, 300);
  else if (sw <= 768) w = Math.min(cw - 24, 340);
  else if (sw <= 1100) w = Math.min(cw - 40, 400);
  else w = 400;
  return { width: w, height: Math.round(w * 1.375) };
}

async function initNileEvoFlip(lang) {
  lang = lang || getCurrentLang();
  const isRtl = lang === "ar";
  const t = STORIES_LANG[lang] || STORIES_LANG.en;
  const pdfUrl = PDF_FILES[lang] || PDF_FILES.en;

  if (pageFlip) {
    try {
      pageFlip.off("flip");
    } catch (e) {}
    pageFlip = null;
  }

  const oldBC = document.getElementById("book-container");
  if (oldBC) oldBC.remove();

  const bc = document.createElement("div");
  bc.id = "book-container";
  const controls = document.getElementById("book-controls");
  bookParent.insertBefore(bc, controls);

  document.getElementById("page-info").innerText = t.loading;

  let pdf;
  try {
    pdf = await pdfjsLib.getDocument(pdfUrl).promise;
  } catch (err) {
    console.warn("PDF not found:", pdfUrl, "→ fallback EN");
    pdf = await pdfjsLib.getDocument(PDF_FILES.en).promise;
  }

  const totalPages = pdf.numPages;
  const { width, height } = getBookDimensions();
  const renderScale = Math.max(1.5, width / 200);

  const pagesElements = [];
  for (let i = 1; i <= totalPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: renderScale });
    const canvas = document.createElement("canvas");
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    await page.render({ canvasContext: canvas.getContext("2d"), viewport })
      .promise;

    const div = document.createElement("div");
    div.className = "page";
    div.setAttribute("data-density", "soft");
    div.appendChild(canvas);
    pagesElements.push(div);
  }

  // المنطق الجديد: عكس ترتيب الصفحات إذا كانت اللغة عربية
  if (isRtl) {
    pagesElements.reverse();
    // إضافة صفحة فارغة للحفاظ على الغلاف في جهة اليسار للفتح من الشمال لليمين
    if (pagesElements.length % 2 !== 0) {
      const blank = document.createElement("div");
      blank.className = "page";
      blank.setAttribute("data-density", "soft");
      pagesElements.unshift(blank);
    }
  } else {
    if (pagesElements.length % 2 !== 0) {
      const blank = document.createElement("div");
      blank.className = "page";
      blank.setAttribute("data-density", "soft");
      pagesElements.push(blank);
    }
  }

  pagesElements.forEach((div) => bc.appendChild(div));
  const finalTotalPages = pagesElements.length;

  bc.style.visibility = "visible";
  const isMobile = window.innerWidth <= 768;

  pageFlip = new St.PageFlip(bc, {
    width,
    height,
    size: "fixed",
    showCover: true,
    usePortrait: isMobile,
    autoCenter: true,
    maxShadowOpacity: 0.5,
    clickEventForward: true,
    interactive: true,
    flippingTime: 800,
    showPageCorners: false,
    // تحديد صفحة البداية (من اليمين في الانجليزي ومن الشمال في العربي)
    startPage: isRtl ? finalTotalPages - 1 : 0,
  });

  pageFlip.loadFromHTML(bc.querySelectorAll(".page"));

  bc.classList.add("is-cover-first");
  document.getElementById("page-info").innerText =
    t.page + " 1 " + t.of + " " + finalTotalPages;

  // توجيه الأزرار لتتماشى مع الاتجاه العكسي
  document.getElementById("btn-prev").onclick = () => {
    if (isRtl) pageFlip.flipNext();
    else pageFlip.flipPrev();
  };
  document.getElementById("btn-next").onclick = () => {
    if (isRtl) pageFlip.flipPrev();
    else pageFlip.flipNext();
  };

  pageFlip.on("flip", (e) => {
    const idx = e.data;
    const tCur = STORIES_LANG[getCurrentLang()] || STORIES_LANG.en;

    // منطق حساب الصفحة الفعلي للغتين
    const isLast = isRtl ? idx === 0 : idx >= finalTotalPages - 1;
    const isCov = isRtl ? idx >= finalTotalPages - 1 : idx === 0;
    const logicalPage = isRtl ? finalTotalPages - idx : idx + 1;

    document.getElementById("page-info").innerText =
      tCur.page + " " + logicalPage + " " + tCur.of + " " + finalTotalPages;

    if (isLast) {
      showSlide("end");
    } else {
      showSlide(isCov ? "cover" : getSlideForPage(logicalPage));
    }
    setBookOpen(!isCov && !isLast, isLast, bc);
  });
}

/* ═══════════════════════════
    INIT
  ═══════════════════════════ */
const initLang = getCurrentLang();
applyTranslations(initLang);
initNileEvoFlip(initLang);

let _rt;
window.addEventListener("resize", () => {
  clearTimeout(_rt);
  _rt = setTimeout(() => {
    if (!pageFlip) return;
    try {
      pageFlip.updateState(getBookDimensions());
    } catch (e) {}
  }, 300);
});

/* ═══════════════════════════
    CHARTS
  ═══════════════════════════ */
function mkBase() {
  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 900, easing: "easeOutQuart" },
    plugins: { legend: { display: false } },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 9 }, color: cTick() },
      },
      y: {
        grid: { color: cGrid() },
        ticks: { font: { size: 9 }, color: cTick() },
        beginAtZero: true,
      },
    },
  };
}
function mkLine(id, labels, data, color, bg) {
  chartInst[id] = new Chart(document.getElementById(id), {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          data,
          borderColor: color,
          backgroundColor: bg,
          borderWidth: 2.5,
          pointRadius: 3,
          pointBackgroundColor: color,
          fill: true,
          tension: 0.45,
        },
      ],
    },
    options: mkBase(),
  });
}
function mkBar(id, labels, data, colors) {
  chartInst[id] = new Chart(document.getElementById(id), {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          data,
          backgroundColor: colors,
          borderRadius: 7,
          borderSkipped: false,
        },
      ],
    },
    options: mkBase(),
  });
}
function mkDoughnut(id, labels, data, colors) {
  chartInst[id] = new Chart(document.getElementById(id), {
    type: "doughnut",
    data: {
      labels,
      datasets: [
        { data, backgroundColor: colors, borderWidth: 0, hoverOffset: 6 },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 900, easing: "easeOutQuart" },
      plugins: {
        legend: {
          display: true,
          position: "bottom",
          labels: {
            font: { size: 9 },
            color: cLegend(),
            boxWidth: 10,
            padding: 8,
          },
        },
      },
      cutout: "62%",
    },
  });
}

const t0 = STORIES_LANG[initLang];
mkLine(
  "groundwaterChart1",
  t0.xGW,
  [100, 96, 90, 82, 74, 67, 62, 60],
  "#3498db",
  "rgba(52,152,219,0.12)",
);
mkBar(
  "usageChart1",
  t0.xUse,
  [100, 70],
  ["rgba(231,76,60,0.85)", "rgba(0,184,148,0.85)"],
);
mkBar(
  "consumptionChart1",
  t0.xCon,
  [150, 50, 20],
  ["rgb(162,155,254)", "rgba(253,203,110,0.85)", "rgba(231,76,60,0.85)"],
);
mkLine(
  "riverFlowChart2",
  t0.xRiv,
  [100, 94, 86, 78, 70, 65],
  "#e17055",
  "rgba(225,112,85,0.12)",
);
mkBar(
  "cropChart2",
  t0.xCrp,
  [100, 72, 55],
  ["rgba(52,152,219,0.8)", "rgba(253,203,110,0.85)", "rgba(231,76,60,0.85)"],
);
mkDoughnut(
  "irrigationChart2",
  t0.xIrr,
  [25, 75],
  ["rgba(0,184,148,0.85)", "rgba(220,235,245,0.9)"],
);
mkLine(
  "householdChart3",
  t0.xHH,
  [100, 90, 80, 72],
  "#00b894",
  "rgba(0,184,148,0.12)",
);
mkBar(
  "infrastructureChart3",
  t0.xInf,
  [500, 120],
  ["#a29bfed9", "rgba(253,121,168,0.85)"],
);
mkLine(
  "savingsChart3",
  t0.xSav,
  [0.3, 0.8, 1.4, 2.0],
  "#a29bfe",
  "rgba(162,155,254,0.12)",
);
mkBar(
  "consumptionChart4",
  t0.xC4c,
  [8, 10],
  ["rgba(6,74,120,0.8)", "rgba(231,76,60,0.85)"],
);
mkDoughnut(
  "leaksChart4",
  t0.xC4k,
  [20, 80],
  ["rgba(36,56,170,0.85)", "rgba(52,152,219,0.15)"],
);
mkLine(
  "reductionChart4",
  t0.xC4r,
  [100, 96, 92, 85],
  "#ff8c00",
  "rgba(184,141,0,0.12)",
);

chartsBuilt = true;
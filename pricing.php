<?php
if (session_status() === PHP_SESSION_NONE) session_start();

$isLoggedIn = isset($_SESSION['user_id']);

// ── Fetch user data from DB (more reliable than session alone) ──
$firstName   = '';
$lastName    = '';
$userEmail   = '';
$accountType = 'standard';

if ($isLoggedIn) {
    $conn = @mysqli_connect('localhost', 'root', '', 'nilevo');
    if ($conn) {
        $uid = (int) $_SESSION['user_id'];
        $res = mysqli_query($conn, "SELECT first_name, last_name, email, account_type FROM user WHERE user_id = $uid LIMIT 1");
        if ($res && $row = mysqli_fetch_assoc($res)) {
            $firstName   = $row['first_name'];
            $lastName    = $row['last_name'];
            $userEmail   = $row['email'];
            $accountType = strtolower(trim($row['account_type']));
        }
        mysqli_close($conn);
    }
}

$currentUserType = $accountType;
$isPremium       = ($currentUserType === 'premium');
$userName        = trim($firstName . ' ' . $lastName);

// ── Build personalized WhatsApp message — Business ──
$waMsg  = "Hello AquaMind Team! 👋\n\n";
$waMsg .= "I'm interested in a Business plan for my organization.\n";
if ($userName)  $waMsg .= "Name: "  . $userName  . "\n";
if ($userEmail) $waMsg .= "Email: " . $userEmail . "\n";
$waMsg .= "\nPlease contact me to discuss Business plan options.";
$waLink = "https://wa.me/+201152292951?text=" . rawurlencode($waMsg);

// ── Build personalized WhatsApp message — Premium ──
$waPremMsg  = "Hello AquaMind Team! 👋\n\n";
$waPremMsg .= "I'd like to upgrade to Premium on AquaMind.\n";
if ($userName)  $waPremMsg .= "Name: "  . $userName  . "\n";
if ($userEmail) $waPremMsg .= "Email: " . $userEmail . "\n";
$waPremMsg .= "\nPlease help me activate my Premium subscription.";
$waPremLink = "https://wa.me/+201152292951?text=" . rawurlencode($waPremMsg);

include 'includes/header.php';
?>
<link rel="stylesheet" href="style.css?v=<?php echo time(); ?>">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">
<title>Pricing — AquaMind</title>

<style>
/* ═══════════════════════════════════════════
   Pricing Page — AquaMind  (Redesigned)
═══════════════════════════════════════════ */

:root {
  --pr-bg:      #f0f6ff;
  --pr-surface: #e4eeff;
  --pr-card:    #ffffff;
  --pr-border:  #c8d9f0;
  --pr-text:    #0b1a31;
  --pr-sub:     #4a6fa0;
  --pr-gold:    #f59e0b;
  --pr-blue:    #2563eb;
  --pr-teal:    #14b8a6;
  --pr-radius:  22px;
  --pr-shadow:  0 4px 32px rgba(37,99,235,0.08);
}

body.dark-mode {
  --pr-bg:      #060d1c;
  --pr-surface: #0b1525;
  --pr-card:    #0f1e36;
  --pr-border:  #1a2d4a;
  --pr-text:    #e6f0ff;
  --pr-sub:     #7090b8;
  --pr-shadow:  0 4px 32px rgba(0,0,0,0.4);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background: var(--pr-bg);
  color: var(--pr-text);
  font-family: 'DM Sans', sans-serif;
  transition: background 0.35s, color 0.35s;
}

/* ── HERO ── */
.pr-hero {
  position: relative;
  padding: 120px 2rem 100px;
  text-align: center;
  background: linear-gradient(150deg, #0d2461 0%, #1540c8 55%, #0e2fa0 100%);
  overflow: hidden;
}
body.dark-mode .pr-hero {
  background: linear-gradient(150deg, #030b1e 0%, #071535 55%, #050f28 100%);
}
.pr-hero::before {
  content: '';
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse 70% 60% at 10% 40%, rgba(59,130,246,0.22) 0%, transparent 60%),
    radial-gradient(ellipse 55% 65% at 90% 55%, rgba(245,158,11,0.16) 0%, transparent 60%),
    radial-gradient(ellipse 45% 35% at 50% 90%, rgba(20,184,166,0.12) 0%, transparent 55%);
  pointer-events: none;
}
.pr-orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  animation: orbFloat 8s ease-in-out infinite;
}
.pr-orb-1 {
  width: 280px; height: 280px;
  top: -80px; left: -60px;
  background: radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%);
}
.pr-orb-2 {
  width: 200px; height: 200px;
  bottom: 20px; right: -40px;
  background: radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%);
  animation-delay: -3s;
}
@keyframes orbFloat {
  0%, 100% { transform: translateY(0) scale(1); }
  50%       { transform: translateY(-25px) scale(1.04); }
}
.pr-hero-content { position: relative; z-index: 2; }

.pr-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 3.5px;
  text-transform: uppercase;
  color: var(--pr-gold);
  background: rgba(245,158,11,0.1);
  border: 1px solid rgba(245,158,11,0.28);
  padding: 7px 22px;
  border-radius: 40px;
  margin-bottom: 24px;
  backdrop-filter: blur(8px);
}

.pr-hero-title {
  font-family: 'Syne', sans-serif;
  font-size: clamp(3rem, 7.5vw, 6rem);
  font-weight: 900;
  color: #fff;
  line-height: 1.0;
  letter-spacing: -3px;
  margin-bottom: 22px;
}
.pr-hero-title .grad {
  background: linear-gradient(120deg, #60a5fa 0%, #38bdf8 40%, #34d399 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.pr-hero-sub {
  font-size: 1.05rem;
  color: rgba(255,255,255,0.6);
  max-width: 460px;
  margin: 0 auto 38px;
  line-height: 1.8;
}

/* Billing Toggle */
.pr-billing-toggle {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.12);
  padding: 7px 8px 7px 20px;
  border-radius: 50px;
  font-size: 0.88rem;
  color: rgba(255,255,255,0.7);
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: background 0.2s;
}
.pr-billing-toggle:hover { background: rgba(255,255,255,0.1); }

.pr-toggle-pill {
  position: relative;
  width: 50px; height: 26px;
  background: var(--pr-blue);
  border-radius: 20px;
  cursor: pointer;
  transition: background 0.2s;
  flex-shrink: 0;
}
.pr-toggle-pill::after {
  content: '';
  position: absolute;
  top: 3px; left: 3px;
  width: 20px; height: 20px;
  background: #fff;
  border-radius: 50%;
  transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
  box-shadow: 0 2px 6px rgba(0,0,0,0.25);
}
.pr-toggle-pill.yearly::after { transform: translateX(24px); }

.pr-save-badge {
  background: linear-gradient(135deg, #10b981, #059669);
  color: #fff;
  font-size: 0.68rem;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 20px;
}

.pr-hero-wave {
  position: absolute; bottom: -1px; left: 0; width: 100%; height: 80px; z-index: 3;
}
.pr-hero-wave svg { width: 100%; height: 100%; }


/* ── PLANS SECTION ── */
.pr-plans-section {
  background: var(--pr-bg);
  padding: 5rem 2rem 4rem;
  transition: background 0.35s;
}

.pr-plans-label {
  text-align: center;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--pr-sub);
  margin-bottom: 2rem;
  transition: color 0.35s;
}

.pr-plans-wrap {
  max-width: 820px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.6rem;
  align-items: start;
}

/* Plan Card */
.pr-card {
  background: var(--pr-card);
  border: 1px solid var(--pr-border);
  border-radius: var(--pr-radius);
  padding: 36px 30px 32px;
  position: relative;
  transition: transform 0.3s, box-shadow 0.3s, background 0.35s, border-color 0.35s;
  display: flex;
  flex-direction: column;
  box-shadow: var(--pr-shadow);
}
.pr-card:hover {
  transform: translateY(-7px);
  box-shadow: 0 28px 64px rgba(37,99,235,0.14);
}
body:not(.dark-mode) .pr-card--standard {
  background: #ffffff;
  border-color: #c0d4ee;
}

/* Premium card */
.pr-card--featured {
  background: linear-gradient(160deg, #133080 0%, #1840b0 55%, #0f288e 100%);
  border-color: rgba(59,130,246,0.45);
  box-shadow: 0 0 0 1px rgba(59,130,246,0.18), 0 20px 55px rgba(59,130,246,0.2);
  padding-top: 52px;
}
body.dark-mode .pr-card--featured {
  background: linear-gradient(160deg, #0a1e50 0%, #112050 55%, #091840 100%);
}
.pr-card--featured:hover {
  transform: translateY(-7px);
  box-shadow: 0 0 0 1px rgba(59,130,246,0.4), 0 32px 72px rgba(59,130,246,0.28);
}

.pr-popular-badge {
  position: absolute;
  top: -13px; left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #2563eb, #38bdf8);
  color: #fff;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  padding: 5px 22px;
  border-radius: 20px;
  white-space: nowrap;
  box-shadow: 0 4px 18px rgba(37,99,235,0.45);
}

.pr-plan-icon {
  width: 50px; height: 50px;
  border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.4rem;
  margin-bottom: 16px;
}
.pr-icon-standard { background: rgba(20,184,166,0.13); border: 1px solid rgba(20,184,166,0.28); }
.pr-icon-premium  { background: rgba(59,130,246,0.14); border: 1px solid rgba(59,130,246,0.28); }

.pr-plan-name {
  font-family: 'Syne', sans-serif;
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--pr-text);
  margin-bottom: 5px;
  transition: color 0.35s;
}
.pr-plan-tagline {
  font-size: 0.84rem;
  color: var(--pr-sub);
  margin-bottom: 26px;
  line-height: 1.55;
  transition: color 0.35s;
}

.pr-price-block { margin-bottom: 26px; }
.pr-price-amount {
  font-family: 'Syne', sans-serif;
  font-size: 3.2rem;
  font-weight: 900;
  color: var(--pr-text);
  line-height: 1;
  letter-spacing: -2.5px;
  transition: color 0.35s;
}
.pr-price-amount sup {
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0;
  vertical-align: super;
}
.pr-price-period {
  font-size: 0.8rem;
  color: var(--pr-sub);
  margin-top: 6px;
  transition: color 0.35s;
}
.pr-price-yearly {
  display: none;
  font-size: 0.76rem;
  color: #10b981;
  margin-top: 4px;
  font-weight: 600;
}
.yearly-active .pr-price-yearly { display: block; }

.pr-cta-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 13px 20px;
  border-radius: 30px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  border: none;
  transition: all 0.22s;
  margin-bottom: 26px;
  text-decoration: none;
}
.pr-cta-btn--standard {
  background: rgba(20,184,166,0.1);
  color: #0d9488;
  border: 1.5px solid rgba(20,184,166,0.35);
}
body.dark-mode .pr-cta-btn--standard { color: #2dd4bf; }
.pr-cta-btn--standard:hover {
  background: rgba(20,184,166,0.2);
  transform: translateY(-2px);
  box-shadow: 0 6px 22px rgba(20,184,166,0.2);
}
.pr-cta-btn--premium {
  background: linear-gradient(135deg, #1d4ed8, #38bdf8);
  color: #fff;
  box-shadow: 0 6px 26px rgba(29,78,216,0.42);
}
.pr-cta-btn--premium:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 34px rgba(29,78,216,0.55);
}

.pr-features-title {
  font-size: 0.69rem;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--pr-sub);
  margin-bottom: 14px;
  transition: color 0.35s;
}
.pr-features {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 11px;
  flex: 1;
}
.pr-feature {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 0.86rem;
  color: var(--pr-text);
  line-height: 1.45;
  transition: color 0.35s;
}
.pr-feature-icon {
  width: 19px; height: 19px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.62rem;
  flex-shrink: 0;
  margin-top: 1px;
}
.pr-icon-check    { background: rgba(16,185,129,0.13); color: #10b981; border: 1px solid rgba(16,185,129,0.28); }
.pr-icon-check-bl { background: rgba(96,165,250,0.15); color: #60a5fa; border: 1px solid rgba(96,165,250,0.3); }

.pr-already-premium {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  width: 100%;
  padding: 13px 20px;
  border-radius: 30px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  margin-bottom: 26px;
  background: rgba(16,185,129,0.12);
  border: 1.5px solid rgba(16,185,129,0.45);
  color: #10b981;
  cursor: default;
}

/* Featured card — always white text */
.pr-card--featured .pr-plan-name,
.pr-card--featured .pr-plan-tagline,
.pr-card--featured .pr-feature,
.pr-card--featured .pr-features-title,
.pr-card--featured .pr-price-amount,
.pr-card--featured .pr-price-period,
.pr-card--featured .pr-price-yearly { color: #fff !important; }
.pr-card--featured .pr-plan-tagline,
.pr-card--featured .pr-features-title,
.pr-card--featured .pr-price-period { opacity: 0.75; }


/* ── BUSINESS BANNER ── */
.pr-biz-banner {
  max-width: 820px;
  margin: 2rem auto 0;
  border-radius: var(--pr-radius);
  background: linear-gradient(120deg, #1e1060 0%, #2d1a80 40%, #3a1e6e 70%, #1a0e55 100%);
  border: 1px solid rgba(245,158,11,0.28);
  box-shadow: 0 8px 48px rgba(245,158,11,0.08), 0 0 0 1px rgba(245,158,11,0.1);
  padding: 42px 48px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 2.5rem;
  align-items: center;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}
.pr-biz-banner:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 60px rgba(245,158,11,0.14), 0 0 0 1px rgba(245,158,11,0.2);
}
body.dark-mode .pr-biz-banner {
  background: linear-gradient(120deg, #100830 0%, #190f40 40%, #1e1035 70%, #0d0825 100%);
}
.pr-biz-banner::before {
  content: '';
  position: absolute;
  top: -70px; right: 100px;
  width: 280px; height: 280px;
  background: radial-gradient(circle, rgba(245,158,11,0.13) 0%, transparent 65%);
  pointer-events: none;
}
.pr-biz-banner::after {
  content: '';
  position: absolute;
  bottom: -50px; left: -40px;
  width: 200px; height: 200px;
  background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 65%);
  pointer-events: none;
}

.pr-biz-label {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--pr-gold);
  background: rgba(245,158,11,0.12);
  border: 1px solid rgba(245,158,11,0.28);
  padding: 5px 16px;
  border-radius: 30px;
  margin-bottom: 14px;
}

.pr-biz-title {
  font-family: 'Syne', sans-serif;
  font-size: clamp(1.4rem, 3vw, 2rem);
  font-weight: 900;
  color: #fff;
  letter-spacing: -1px;
  margin-bottom: 10px;
  line-height: 1.15;
}
.pr-biz-title span {
  background: linear-gradient(120deg, var(--pr-gold), #fde68a, #fbbf24);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.pr-biz-desc {
  font-size: 0.88rem;
  color: rgba(255,255,255,0.58);
  line-height: 1.75;
  max-width: 480px;
  margin-bottom: 22px;
}

.pr-biz-perks-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 22px;
}
.pr-biz-perk {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 0.8rem;
  color: rgba(255,255,255,0.7);
}
.pr-biz-perk .perk-dot {
  width: 16px; height: 16px;
  background: rgba(245,158,11,0.18);
  border: 1px solid rgba(245,158,11,0.35);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.52rem;
  color: var(--pr-gold);
  flex-shrink: 0;
}

.pr-biz-cta-side {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}
.pr-biz-icon-wrap {
  width: 68px; height: 68px;
  background: rgba(245,158,11,0.12);
  border: 1px solid rgba(245,158,11,0.28);
  border-radius: 18px;
  display: flex; align-items: center; justify-content: center;
  font-size: 2rem;
}
.pr-wa-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 13px 28px;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: #fff;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  border-radius: 30px;
  text-decoration: none;
  white-space: nowrap;
  box-shadow: 0 6px 26px rgba(34,197,94,0.38);
  transition: transform 0.2s, box-shadow 0.2s;
}
.pr-wa-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 34px rgba(34,197,94,0.52);
}
.pr-wa-btn i { font-size: 1.05rem; }
.pr-biz-note {
  font-size: 0.72rem;
  color: rgba(255,255,255,0.38);
  text-align: center;
}


/* ── FAQ ── */
.pr-faq-section {
  background: var(--pr-surface);
  padding: 5rem 2rem;
  transition: background 0.35s;
}
.pr-faq-wrap { max-width: 660px; margin: 0 auto; }

.pr-section-heading {
  font-family: 'Syne', sans-serif;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 800;
  color: var(--pr-text);
  text-align: center;
  margin-bottom: 0.6rem;
  letter-spacing: -1.2px;
  transition: color 0.35s;
}
.pr-section-sub {
  text-align: center;
  font-size: 0.92rem;
  color: var(--pr-sub);
  margin-bottom: 3rem;
  transition: color 0.35s;
}

.pr-faq-item { border-bottom: 1px solid var(--pr-border); transition: border-color 0.35s; }
.pr-faq-q {
  width: 100%;
  background: none;
  border: none;
  text-align: left;
  color: var(--pr-text);
  font-family: 'DM Sans', sans-serif;
  font-size: 0.93rem;
  font-weight: 600;
  padding: 20px 0;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  transition: color 0.2s;
}
.pr-faq-q:hover { color: var(--pr-blue); }
.pr-faq-arrow {
  font-size: 0.72rem;
  color: var(--pr-sub);
  transition: transform 0.3s;
  flex-shrink: 0;
}
.pr-faq-item.open .pr-faq-arrow { transform: rotate(180deg); }
.pr-faq-a {
  font-size: 0.87rem;
  color: var(--pr-sub);
  line-height: 1.8;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease, padding 0.3s;
}
.pr-faq-item.open .pr-faq-a { max-height: 200px; padding-bottom: 20px; }


/* ── CTA BANNER ── */
.pr-cta-banner {
  background: linear-gradient(140deg, #0f2780 0%, #1540c8 50%, #0d228a 100%);
  padding: 5.5rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}
body.dark-mode .pr-cta-banner {
  background: linear-gradient(140deg, #060f30 0%, #0b1e5a 50%, #04102a 100%);
}
.pr-cta-banner::before {
  content: '';
  position: absolute; inset: 0;
  background: radial-gradient(ellipse 65% 80% at 50% 50%, rgba(59,130,246,0.22) 0%, transparent 65%);
  pointer-events: none;
}
.pr-cta-banner h2 {
  font-family: 'Syne', sans-serif;
  font-size: clamp(2rem, 5.5vw, 3.4rem);
  font-weight: 900;
  color: #fff;
  letter-spacing: -1.8px;
  margin-bottom: 14px;
  position: relative;
}
.pr-cta-banner p {
  font-size: 1rem;
  color: rgba(255,255,255,0.65);
  margin-bottom: 34px;
  position: relative;
}
.pr-cta-banner-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 15px 42px;
  background: linear-gradient(135deg, var(--pr-gold), #fbbf24);
  color: #0f172a;
  font-family: 'DM Sans', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 40px;
  text-decoration: none;
  box-shadow: 0 8px 34px rgba(245,158,11,0.42);
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
}
.pr-cta-banner-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 44px rgba(245,158,11,0.58);
}


/* ── RESPONSIVE ── */
@media (max-width: 820px) {
  .pr-biz-banner {
    grid-template-columns: 1fr;
    padding: 36px 28px;
  }
  .pr-biz-cta-side {
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
}
@media (max-width: 680px) {
  .pr-plans-wrap {
    grid-template-columns: 1fr;
    max-width: 400px;
  }
}
@media (max-width: 480px) {
  .pr-hero { padding: 95px 1.2rem 85px; }
  .pr-plans-section { padding: 3rem 1rem 2.5rem; }
  .pr-biz-banner { padding: 28px 22px; margin: 1.2rem 0 0; }
}
</style>


<!-- HERO -->
<section class="pr-hero">
  <div class="pr-orb pr-orb-1"></div>
  <div class="pr-orb pr-orb-2"></div>
  <div class="pr-hero-content">
    <div class="pr-eyebrow"><i class="fas fa-water"></i> AquaMind Plans</div>
    <h1 class="pr-hero-title">Choose Your<br><span class="grad">Water Journey</span></h1>
    <p class="pr-hero-sub">Start free, upgrade when ready. Every plan helps Egypt save water — smarter.</p>
    <div class="pr-billing-toggle" id="prBillingToggle">
      <span>Monthly</span>
      <div class="pr-toggle-pill" id="prTogglePill"></div>
      <span>Yearly</span>
      <span class="pr-save-badge">Save 25%</span>
    </div>
  </div>
  <div class="pr-hero-wave">
    <svg viewBox="0 0 1200 80" preserveAspectRatio="none">
      <path d="M0,0 C300,65 700,65 1200,25 L1200,80 L0,80 Z" fill="var(--pr-bg)"/>
    </svg>
  </div>
</section>


<!-- PLANS + BUSINESS -->
<section class="pr-plans-section" id="prPlansSection">

  <p class="pr-plans-label">Individual Plans</p>

  <div class="pr-plans-wrap">

    <!-- Standard -->
    <div class="pr-card pr-card--standard">
      <div class="pr-plan-icon pr-icon-standard">💧</div>
      <div class="pr-plan-name">Standard</div>
      <div class="pr-plan-tagline">Perfect for individuals learning water-saving habits at home.</div>
      <div class="pr-price-block">
        <div class="pr-price-amount">
          <sup>EGP</sup>
          <span class="pr-monthly-price">0</span>
          <span class="pr-yearly-price" style="display:none">0</span>
        </div>
        <div class="pr-price-period">Free forever — no credit card needed</div>
      </div>
      <a href="register.php" class="pr-cta-btn pr-cta-btn--standard">
        <i class="fas fa-user-plus"></i> Get Started Free
      </a>
      <div class="pr-features-title">What's included</div>
      <ul class="pr-features">
        <li class="pr-feature"><span class="pr-feature-icon pr-icon-check"><i class="fas fa-check"></i></span>Access to all 4 free stories & charts</li>
        <li class="pr-feature"><span class="pr-feature-icon pr-icon-check"><i class="fas fa-check"></i></span>Play AquaGuard game — all basic levels</li>
        <li class="pr-feature"><span class="pr-feature-icon pr-icon-check"><i class="fas fa-check"></i></span>Interactive House — all rooms</li>
        <li class="pr-feature"><span class="pr-feature-icon pr-icon-check"><i class="fas fa-check"></i></span>Marketplace browsing & purchases</li>
        <li class="pr-feature"><span class="pr-feature-icon pr-icon-check"><i class="fas fa-check"></i></span>Community posts & replies</li>
        <li class="pr-feature"><span class="pr-feature-icon pr-icon-check"><i class="fas fa-check"></i></span>6 AI chatbot messages / day</li>
      </ul>
    </div>

    <!-- Premium -->
    <div class="pr-card pr-card--featured">
      <div class="pr-popular-badge">✦ Most Popular</div>
      <div class="pr-plan-icon pr-icon-premium">⚡</div>
      <div class="pr-plan-name">Premium</div>
      <div class="pr-plan-tagline">For water-savers who want the full AquaMind experience.</div>
      <div class="pr-price-block">
        <div class="pr-price-amount">
          <sup>EGP</sup>
          <span class="pr-monthly-price">99</span>
          <span class="pr-yearly-price" style="display:none">1000</span>
        </div>
        <div class="pr-price-period">
          <span class="pr-period-label">per month</span>
        </div>
        <div class="pr-price-yearly">Billed yearly — save EGP 200/yr</div>
      </div>
      <?php if ($isPremium): ?>
      <div class="pr-already-premium">
        <i class="fas fa-crown"></i> You're already Premium ✓
      </div>
      <?php else: ?>
      <a href="<?= htmlspecialchars($waPremLink) ?>" target="_blank" class="pr-cta-btn pr-cta-btn--premium">
        <i class="fas fa-bolt"></i> Upgrade to Premium
      </a>
      <?php endif; ?>
      <div class="pr-features-title">Everything in Standard, plus</div>
      <ul class="pr-features">
        <li class="pr-feature"><span class="pr-feature-icon pr-icon-check-bl"><i class="fas fa-check"></i></span>All 6 premium story books (new monthly)</li>
        <li class="pr-feature"><span class="pr-feature-icon pr-icon-check-bl"><i class="fas fa-check"></i></span>Advanced AquaGuard levels</li>
        <li class="pr-feature"><span class="pr-feature-icon pr-icon-check-bl"><i class="fas fa-check"></i></span>Interactive House — all rooms</li>
        <li class="pr-feature"><span class="pr-feature-icon pr-icon-check-bl"><i class="fas fa-check"></i></span>Marketplace browsing & purchases</li>
        <li class="pr-feature"><span class="pr-feature-icon pr-icon-check-bl"><i class="fas fa-check"></i></span>Unlimited AI chatbot messages</li>
        <li class="pr-feature"><span class="pr-feature-icon pr-icon-check-bl"><i class="fas fa-check"></i></span>Priority community badge 👑</li>
        <li class="pr-feature"><span class="pr-feature-icon pr-icon-check-bl"><i class="fas fa-check"></i></span>Early access to new features</li>
      </ul>
    </div>

  </div><!-- end .pr-plans-wrap -->


  <!-- BUSINESS BANNER — same section, directly below cards -->
  <div class="pr-biz-banner">

    <div class="pr-biz-info">
      <div class="pr-biz-label"><i class="fas fa-building"></i> For Organizations &amp; Schools</div>
      <h2 class="pr-biz-title">Scale AquaMind for Your <span>Team or School</span></h2>
      <p class="pr-biz-desc">Designed for schools, NGOs &amp; enterprises ready to drive real water change. Custom-built plans with full admin control and dedicated support.</p>
    </div>

    <div class="pr-biz-cta-side">
      <div class="pr-biz-icon-wrap">👑</div>
      <a href="<?= htmlspecialchars($waLink) ?>" target="_blank" class="pr-wa-btn">
        <i class="fab fa-whatsapp"></i> Contact Us on WhatsApp
      </a>
      <p class="pr-biz-note">We reply within a few hours ⚡</p>
    </div>

  </div><!-- end .pr-biz-banner -->

</section><!-- end .pr-plans-section -->


<!-- FAQ -->
<section class="pr-faq-section">
  <div class="pr-faq-wrap">
    <h2 class="pr-section-heading">Common Questions</h2>
    <p class="pr-section-sub">Everything you need to know about AquaMind plans.</p>

    <?php
    $faqs = [
      ['q'=>'Can I upgrade or downgrade anytime?',   'a'=>'Yes — you can switch plans at any time. If you upgrade mid-month, you only pay the difference. Downgrading takes effect at the end of your current billing cycle.'],
      ['q'=>'How do I pay?',                          'a'=>"Currently we accept payments via WhatsApp coordination. Contact us and we'll walk you through the process. Online payment gateway is coming soon."],
      ['q'=>'What happens to my data if I cancel?',  'a'=>'Your account, game scores, and community posts stay with you. You simply lose access to premium features and your chatbot limit resets to 6 messages/day.'],
      ['q'=>'Can I get a refund?',                    'a'=>"If you're not satisfied within the first 7 days of a paid plan, contact us on WhatsApp and we'll issue a full refund — no questions asked."],
      ['q'=>'Is Business right for schools?',        'a'=>'Absolutely. Business is designed specifically with Egyptian schools in mind. We offer special pricing for public schools — contact us on WhatsApp to get a custom quote.'],
    ];
    foreach ($faqs as $i => $faq):
    ?>
    <div class="pr-faq-item" id="faq<?= $i ?>">
      <button class="pr-faq-q" onclick="toggleFaq(<?= $i ?>)">
        <span><?= $faq['q'] ?></span>
        <i class="fas fa-chevron-down pr-faq-arrow"></i>
      </button>
      <div class="pr-faq-a"><?= $faq['a'] ?></div>
    </div>
    <?php endforeach; ?>
  </div>
</section>


<!-- CTA Banner (guests only) -->
<?php if (!$isLoggedIn): ?>
<section class="pr-cta-banner">
  <h2>Still unsure? Start free.</h2>
  <p>Join thousands of Egyptians already saving water with AquaMind.</p>
  <a href="register.php" class="pr-cta-banner-btn">
    <i class="fas fa-droplet"></i> Create Free Account
  </a>
</section>
<?php endif; ?>


<!-- Footer -->
<footer class="site-footer">
  <div class="footer-content">
    <div class="footer-col logo-col">
      <img src="nave pm.png" alt="AquaMind Logo" class="footer-logo"/>
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
<script>
(function() {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') document.body.classList.add('dark-mode');
  else document.body.classList.remove('dark-mode');
})();

let isYearly = false;
const togglePill   = document.getElementById('prTogglePill');
const plansSection = document.getElementById('prPlansSection');

document.getElementById('prBillingToggle').addEventListener('click', () => {
  isYearly = !isYearly;
  togglePill.classList.toggle('yearly', isYearly);
  plansSection.classList.toggle('yearly-active', isYearly);
  document.querySelectorAll('.pr-monthly-price').forEach(el => el.style.display = isYearly ? 'none' : 'inline');
  document.querySelectorAll('.pr-yearly-price').forEach(el => el.style.display = isYearly ? 'inline' : 'none');
  document.querySelectorAll('.pr-period-label').forEach(el => el.textContent = isYearly ? 'per month, billed yearly' : 'per month');
});

function toggleFaq(i) {
  const item = document.getElementById('faq' + i);
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.pr-faq-item').forEach(el => el.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}
</script>

<?php include 'includes/footer.php'; ?>
</body>
</html>

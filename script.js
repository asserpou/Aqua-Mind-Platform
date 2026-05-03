// ==============================
// 🌍 TRANSLATIONS
// ==============================
const translations = (window.translations = {
  en: {
    home: "Home",
    stories: "Stories & Charts",
    aquaguard: "AquaGuard",
    interactive: "InteractiveHouse",
    marketplace: "MarketPlace",
    community: "Community",
    hero1: "Smarter Water",
    hero2: "Solutions for a Greener",
    hero3: "Tomorrow",
    btn1: "AquaGuard",
    btn2: "InteractiveHouse",
    aboutTitle: "What is AquaMind",
    aboutText:
      "AquaMind delivers an interactive experience through a gamified learning journey and a virtual smart house, helping users understand how daily actions affect water consumption. By combining fun challenges with real-life simulations, the platform builds awareness, encourages responsible behavior, and promotes sustainable water use in a simple and engaging way.",
    feature1Title: "Raise Awareness",
    feature1Text: "Educate communities about water scarcity",
    feature2Title: "Gamified Learning",
    feature2Text: "Engage users with fun challenges & rewards.",
    feature3Title: "Sustainable Impact",
    feature3Text: "Drive positive change and responsible use.",
    tipsTitle: "AquaMind's Saving Tips",
    offerTitle: "What We Offer",
    offer1Title: "AquaGuard",
    offer1Text:
      "Game-based experience that teaches water conservation through challenges.",
    offer2Title: "Interactive House",
    offer2Text:
      "Explore a virtual home and learn how daily actions affect water usage.",
    offer3Title: "Stories & Charts",
    offer3Text:
      "Visual insights and real stories showing the impact of water consumption.",
    offer4Title: "Market Place",
    offer4Text:
      "Browse eco-friendly products that help reduce water consumption daily.",
    footerText:
      "Empowering communities with smart water solutions for a sustainable future.",
    footerLinks: "Quick Links",
    footerRights: "All rights reserved.",
    followUs: "Follow Us",
    alertTitle: "Water is Running Out!",
    alertMessage: "Take action now to save water and protect our future!",
    alertButton: "Play AquaGuard Game",
    plan: "Plan",
    signOut: "Sign Out",
    signIn: "Sign In / Log In",
    createAccount: "Create Account",
    chatbotTitle: "AquaMind Assistant",
    chatbotSubtitle: "Online | Ask me anything!",
    chatbotWelcome:
      "Hello! 👋 I'm your AquaMind assistant. How can I help you save water today?",
    chatbotPlaceholder: "Type your question...",
    notif_title: "Notifications",
    notif_mark_all: "Mark all read",
    notif_empty: "No notifications yet",
    // Pricing Teaser (index.php)
    pricingTeaserTag: "Plans & Pricing",
    pricingTeaserTitle1: "Unlock the Full",
    pricingTeaserTitle2: "AquaMind Experience",
    pricingTeaserSub:
      "From free stories to premium deep-dives — find the plan that fits your journey.",
    pricingTeaserBtn: "See All Plans",
    ptStdName: "Standard",
    ptFree: "Free",
    ptPremiumOnly: "Members Only",
    ptMostPop: "✦ Most Popular",
    ptUpgrade: "Upgrade Now",
    ptPerMo: "/mo",
    ptFree1: "4 Free stories & charts",
    ptFree2: "AquaGuard basic levels",
    ptFree3: "6 AI messages / day",
    ptPrem1: "All 6 premium story books",
    ptPrem2: "Advanced AquaGuard levels",
    ptPrem3: "Unlimited AI chatbot",
    // Community Teaser (index.php)
    cmTeaserTag: "💬 Community",
    cmTeaserTitle1: "Join the",
    cmTeaserTitle2: "Conversation",
    cmTeaserSub:
      "Ask questions, share water-saving tips, and connect with people who care about the Nile.",
    cmTeaserBtn: "Explore Community",
    cmTeaserJoin: "+ Join the discussion",
    cmTp1Title: "How much water does a dripping tap waste per day?",
    cmTp2Title: "Best practices for rainwater harvesting at home",
    cmTp3Title: "Why is the Nile water level dropping every year?",
    cmTpReplies: "replies",
    // Pricing Page
    pr_eyebrow: "AquaMind Plans",
    pr_hero_title1: "Choose Your",
    pr_hero_title2: "Water Journey",
    pr_hero_sub:
      "Start free, upgrade when ready. Every plan helps Egypt save water — smarter.",
    pr_monthly: "Monthly",
    pr_yearly: "Yearly",
    pr_save25: "Save 25%",
    pr_std_name: "Standard",
    pr_std_tagline:
      "Perfect for individuals learning water-saving habits at home.",
    pr_std_period: "Free forever — no credit card needed",
    pr_std_cta: "Get Started Free",
    pr_included: "What's included",
    pr_std_f1: "Access to all 4 free stories & charts",
    pr_std_f2: "Play AquaGuard game — all basic levels",
    pr_std_f3: "Interactive House — all rooms",
    pr_std_f4: "Marketplace browsing & purchases",
    pr_std_f5: "Community posts & replies",
    pr_std_f6: "6 AI chatbot messages / day",
    pr_prem_badge: "✦ Most Popular",
    pr_prem_name: "Premium",
    pr_prem_tagline: "For water-savers who want the full AquaMind experience.",
    pr_per_month: "per month",
    pr_billed_yr_prem: "Billed yearly — save EGP 400/yr",
    pr_already_prem: "You're already Premium ✓",
    pr_upgrade_cta: "Upgrade to Premium",
    pr_prem_features_title: "Everything in Standard, plus",
    pr_prem_f1: "All 6 premium story books (new monthly)",
    pr_prem_f2: "Advanced AquaGuard levels",
    pr_prem_f3: "Interactive House — all rooms",
    pr_prem_f4: "Marketplace browsing & purchases",
    pr_prem_f5: "Unlimited AI chatbot messages",
    pr_prem_f6: "Priority community badge 👑",
    pr_prem_f7: "Early access to new features",
    pr_biz_name: "Business",
    pr_biz_tagline:
      "For schools, organizations & teams driving real water change.",
    pr_biz_period: "per month · up to 50 users",
    pr_billed_yr_biz: "Billed yearly — save EGP 2,000/yr",
    pr_biz_cta: "Contact Us",
    pr_biz_features_title: "Everything in Premium, plus",
    pr_biz_f1: "Up to 50 team / student accounts",
    pr_biz_f2: "Admin dashboard & usage analytics",
    pr_biz_f3: "Custom branding for your school/org",
    pr_biz_f4: "Dedicated account manager",
    pr_biz_f5: "Monthly impact reports (PDF)",
    pr_biz_f6: "Custom game scenarios on request",
    pr_faq_title: "Common Questions",
    pr_faq_sub: "Everything you need to know about AquaMind plans.",
    pr_faq_q1: "Can I upgrade or downgrade anytime?",
    pr_faq_a1:
      "Yes — you can switch plans at any time. If you upgrade mid-month, you only pay the difference. Downgrading takes effect at the end of your current billing cycle.",
    pr_faq_q2: "How do I pay?",
    pr_faq_a2:
      "Currently we accept payments via WhatsApp coordination. Contact us and we'll walk you through the process. Online payment gateway is coming soon.",
    pr_faq_q3: "Is there a free trial for Premium?",
    pr_faq_a3:
      "Yes! New users get a 7-day free trial of Premium features automatically after registering. No credit card required.",
    pr_faq_q4: "What happens to my data if I cancel?",
    pr_faq_a4:
      "Your account, game scores, and community posts stay with you. You simply lose access to premium features and your chatbot limit resets to 6 messages/day.",
    pr_faq_q5: "Can I get a refund?",
    pr_faq_a5:
      "If you're not satisfied within the first 7 days of a paid plan, contact us on WhatsApp and we'll issue a full refund — no questions asked.",
    pr_faq_q6: "Is Business right for schools?",
    pr_faq_a6:
      "Absolutely. Business is designed specifically with Egyptian schools in mind. We offer special pricing for public schools — contact us to learn more.",
    pr_cta_title: "Still unsure? Start free.",
    pr_cta_sub:
      "Join thousands of Egyptians already saving water with AquaMind.",
    pr_cta_btn: "Create Free Account",
    // Premium Stories Page
    ps_crown_badge: "Premium",
    ps_hero_title1: "More Stories,",
    ps_hero_title2: "More Impact",
    ps_hero_sub:
      "Unlock deeper water crisis stories from around the world — backed by real data.",
    ps_already_read: "Already Read",
    ps_read_tag: "Read",
    ps_read_again: "Read Again",
    ps_prem_section: "Premium Stories",
    ps_members_only: "Members Only",
    ps_unlock_overlay: "Unlock",
    ps_prem_tag: "Premium",
    ps_unlock_btn: "Unlock Story",
    ps_pages: "pages",
    ps_modal_badge: "Coming Soon",
    ps_modal_title: "This Story Is On Its Way",
    ps_modal_text:
      "We're working hard to bring you this story. Thank you for being a",
    ps_modal_gold: "Premium",
    ps_modal_text2: "member — you'll be the first to access it! 🌊",
    ps_modal_stay: "Stay tuned — new stories drop every month.",
    ps_modal_btn: "Got it, thanks!",
    // Community
    cm_hero_tag: "💧 AquaMind",
    cm_hero_title: "Community",
    cm_hero_sub: "Ask questions, share ideas, protect the Nile together",
    cm_about_title: "🌊 About Community",
    cm_about_text:
      "A space for AquaMind users to ask questions, share water-saving tips, and discuss environmental topics.",
    cm_rule1: "Be respectful",
    cm_rule2: "Stay on topic",
    cm_rule3: "No spam",
    cm_rule4: "Share knowledge",
    cm_stats_title: "📊 Stats",
    cm_stats_posts: "posts",
    cm_sort_label: "Sort by:",
    cm_sort_new: "🕐 New",
    cm_sort_top: "🔥 Top",
    cm_np_placeholder: "What's on your mind? Start a discussion...",
    cm_np_btn: "New Post",
    cm_np_title_ph: "Post title — make it clear and specific",
    cm_np_body_ph: "Describe your question or idea in detail...",
    cm_np_cancel: "Cancel",
    cm_np_submit: "Post",
    cm_login_nudge: "Join the conversation —",
    cm_login_link: "sign in to post or reply",
    cm_replying_to: "Replying to",
    cm_reply_ph_inline: "Write your reply... (Ctrl+Enter to send)",
    cm_reply_cancel: "Cancel",
    cm_modal_login: "Sign in to reply",
    cm_empty: "No posts yet — start the conversation!",
    cm_loading: "Loading...",
    cm_ago_s: "just now",
    cm_ago_m: "m ago",
    cm_ago_h: "h ago",
    cm_ago_d: "d ago",
    cm_likes: "likes",
    cm_replies: "replies",
    cm_premium_badge: "Premium",
    cm_challenge_title: "Daily Water Challenge",
    cm_challenge_sub: "Answer 10 questions correctly to win a 5% Marketplace discount!",
    cm_challenge_start: "Start Challenge",
  },
  ar: {
    home: "الرئيسية",
    stories: "قصص ورسوم",
    aquaguard: "أكوا جارد",
    interactive: "المنزل التفاعلي",
    marketplace: "السوق",
    community: "المجتمع",
    hero1: "مياه أذكى",
    hero2: "حلول من أجل غدٍ أكثر خضرة",
    hero3: "مستقبل أفضل",
    btn1: "أكوا جارد",
    btn2: "المنزل التفاعلي",
    aboutTitle: "ما هو أكوا مايند",
    aboutText:
      "يقدم أكوا مايند تجربة تفاعلية من خلال رحلة تعليمية ممتعة ومنزل ذكي افتراضي، مما يساعد المستخدمين على فهم كيفية تأثير الإجراءات اليومية على استهلاك المياه. من خلال الجمع بين التحديات الممتعة والمحاكاة الواقعية، تبني المنصة الوعي وتشجع السلوك المسؤول وتعزز الاستخدام المستدام للمياه بطريقة بسيطة وجذابة.",
    feature1Title: "رفع الوعي",
    feature1Text: "تثقيف المجتمعات حول ندرة المياه",
    feature2Title: "التعلم الممتع",
    feature2Text: "إشراك المستخدمين بتحديات ومكافآت ممتعة",
    feature3Title: "تأثير مستدام",
    feature3Text: "دفع التغيير الإيجابي والاستخدام المسؤول",
    tipsTitle: "نصائح أكوا مايند للتوفير",
    offerTitle: "ما نقدمه",
    offer1Title: "أكوا جارد",
    offer1Text:
      "تجربة قائمة على الألعاب تعلم الحفاظ على المياه من خلال التحديات.",
    offer2Title: "المنزل التفاعلي",
    offer2Text:
      "استكشف منزلاً افتراضياً وتعلم كيف تؤثر الإجراءات اليومية على استخدام المياه.",
    offer3Title: "قصص ورسوم بيانية",
    offer3Text: "رؤى بصرية وقصص حقيقية توضح تأثير استهلاك المياه.",
    offer4Title: "السوق",
    offer4Text:
      "تصفح المنتجات الصديقة للبيئة التي تساعد على تقليل استهلاك المياه يومياً.",
    footerText: "تمكين المجتمعات بحلول مياه ذكية من أجل مستقبل مستدام.",
    footerLinks: "روابط سريعة",
    footerRights: "جميع الحقوق محفوظة.",
    followUs: "تابعنا",
    alertTitle: "المياه تنفد!",
    alertMessage: "اتخذ إجراءً الآن لتوفير المياه وحماية مستقبلنا!",
    alertButton: "العب لعبة أكوا جارد",
    plan: "خطة",
    signOut: "تسجيل الخروج",
    signIn: "تسجيل الدخول",
    createAccount: "إنشاء حساب",
    chatbotTitle: "مساعد أكوا مايند",
    chatbotSubtitle: "متصل | اسألني أي شيء!",
    chatbotWelcome:
      "أهلاً! 👋 أنا مساعد أكوا مايند. كيف يمكنني مساعدتك في توفير المياه اليوم؟",
    chatbotPlaceholder: "اكتب سؤالك هنا...",
    notif_title: "الإشعارات",
    notif_mark_all: "تحديد الكل كمقروء",
    notif_empty: "لا توجد إشعارات بعد",
    // Pricing Teaser (index.php)
    pricingTeaserTag: "الباقات والأسعار",
    pricingTeaserTitle1: "اكتشف التجربة",
    pricingTeaserTitle2: "الكاملة لأكوا مايند",
    pricingTeaserSub:
      "من القصص المجانية إلى التحليلات المعمّقة — اختر الباقة التي تناسب رحلتك.",
    pricingTeaserBtn: "عرض كل الباقات",
    ptStdName: "العادية",
    ptFree: "مجاني",
    ptPremiumOnly: "للأعضاء فقط",
    ptMostPop: "✦ الأكثر شهرة",
    ptUpgrade: "الترقية الآن",
    ptPerMo: "/شهر",
    ptFree1: "4 قصص ورسوم مجانية",
    ptFree2: "مستويات أكوا جارد الأساسية",
    ptFree3: "6 رسائل ذكاء اصطناعي / يوم",
    ptPrem1: "كل 6 كتب قصص مميزة",
    ptPrem2: "مستويات أكوا جارد المتقدمة",
    ptPrem3: "محادثة ذكاء اصطناعي غير محدودة",
    // Community Teaser (index.php)
    cmTeaserTag: "💬 المجتمع",
    cmTeaserTitle1: "انضم إلى",
    cmTeaserTitle2: "النقاش",
    cmTeaserSub:
      "اطرح أسئلة، شارك نصائح توفير المياه، وتواصل مع من يهتمون بالنيل.",
    cmTeaserBtn: "استكشف المجتمع",
    cmTeaserJoin: "+ انضم للنقاش",
    cmTp1Title: "كم لتراً يهدر الصنبور المتسرب يومياً؟",
    cmTp2Title: "أفضل طرق تجميع مياه الأمطار في المنزل",
    cmTp3Title: "لماذا ينخفض منسوب النيل كل عام؟",
    cmTpReplies: "رد",
    // Pricing Page
    pr_eyebrow: "باقات أكوا مايند",
    pr_hero_title1: "اختر",
    pr_hero_title2: "رحلتك المائية",
    pr_hero_sub:
      "ابدأ مجاناً، قم بالترقية عندما تكون مستعداً. كل باقة تساعد مصر على توفير المياه بشكل أذكى.",
    pr_monthly: "شهري",
    pr_yearly: "سنوي",
    pr_save25: "وفر 25%",
    pr_std_name: "العادية",
    pr_std_tagline:
      "مثالية للأفراد الذين يتعلمون عادات توفير المياه في المنزل.",
    pr_std_period: "مجاني للأبد — لا حاجة لبطاقة ائتمان",
    pr_std_cta: "ابدأ مجاناً",
    pr_included: "ما هو مشمول",
    pr_std_f1: "الوصول إلى 4 قصص ورسوم مجانية",
    pr_std_f2: "لعب أكوا جارد — جميع المستويات الأساسية",
    pr_std_f3: "المنزل التفاعلي — جميع الغرف",
    pr_std_f4: "تصفح السوق والشراء",
    pr_std_f5: "منشورات ومشاركات المجتمع",
    pr_std_f6: "6 رسائل روبوت الدردشة / يوم",
    pr_prem_badge: "✦ الأكثر شهرة",
    pr_prem_name: "المميزة",
    pr_prem_tagline: "لمن يريدون التجربة الكاملة لأكوا مايند.",
    pr_per_month: "في الشهر",
    pr_billed_yr_prem: "فوترة سنوية — وفر 400 جنيه / سنة",
    pr_already_prem: "أنت بالفعل عضو مميز ✓",
    pr_upgrade_cta: "الترقية إلى المميزة",
    pr_prem_features_title: "كل ما في العادية، بالإضافة إلى",
    pr_prem_f1: "كل 6 كتب قصص مميزة (جديدة شهرياً)",
    pr_prem_f2: "مستويات أكوا جارد المتقدمة",
    pr_prem_f3: "المنزل التفاعلي — جميع الغرف",
    pr_prem_f4: "تصفح السوق والشراء",
    pr_prem_f5: "رسائل روبوت دردشة غير محدودة",
    pr_prem_f6: "شارة مجتمع مميزة 👑",
    pr_prem_f7: "وصول مبكر للمميزات الجديدة",
    pr_biz_name: "الأعمال",
    pr_biz_tagline:
      "للمدارس والمنظمات والفرق التي تقود التغيير المائي الحقيقي.",
    pr_biz_period: "في الشهر · حتى 50 مستخدم",
    pr_billed_yr_biz: "فوترة سنوية — وفر 2,000 جنيه / سنة",
    pr_biz_cta: "تواصل معنا",
    pr_biz_features_title: "كل ما في المميزة، بالإضافة إلى",
    pr_biz_f1: "حتى 50 حساب فريق / طالب",
    pr_biz_f2: "لوحة تحكم وتحليلات الاستخدام",
    pr_biz_f3: "علامة تجارية مخصصة لمدرستك/مؤسستك",
    pr_biz_f4: "مدير حساب مخصص",
    pr_biz_f5: "تقارير أثر شهرية (PDF)",
    pr_biz_f6: "سيناريوهات لعب مخصصة عند الطلب",
    pr_faq_title: "الأسئلة الشائعة",
    pr_faq_sub: "كل ما تحتاج معرفته عن باقات أكوا مايند.",
    pr_faq_q1: "هل يمكنني الترقية أو التخفيض في أي وقت؟",
    pr_faq_a1:
      "نعم — يمكنك تغيير الباقة في أي وقت. إذا قمت بالترقية في منتصف الشهر، فأنت تدفع الفرق فقط. يسري التخفيض في نهاية دورة الفوترة الحالية.",
    pr_faq_q2: "كيف أدفع؟",
    pr_faq_a2:
      "نقبل حالياً المدفوعات عبر التنسيق على واتساب. تواصل معنا وسنرشدك خلال العملية. بوابة الدفع الإلكتروني قادمة قريباً.",
    pr_faq_q3: "هل يوجد تجربة مجانية للباقة المميزة؟",
    pr_faq_a3:
      "نعم! يحصل المستخدمون الجدد تلقائياً على تجربة مجانية لمدة 7 أيام لمميزات الباقة المميزة بعد التسجيل. لا حاجة لبطاقة ائتمان.",
    pr_faq_q4: "ماذا يحدث لبياناتي إذا ألغيت الاشتراك؟",
    pr_faq_a4:
      "حسابك ونقاط اللعبة ومنشورات المجتمع تبقى معك. تفقد فقط الوصول للمميزات المدفوعة ويعود حد الدردشة إلى 6 رسائل/يوم.",
    pr_faq_q5: "هل يمكنني استرداد المبلغ؟",
    pr_faq_a5:
      "إذا لم تكن راضياً خلال أول 7 أيام من الباقة المدفوعة، تواصل معنا على واتساب وسنعيد لك المبلغ كاملاً — بدون أسئلة.",
    pr_faq_q6: "هل باقة الأعمال مناسبة للمدارس؟",
    pr_faq_a6:
      "بالتأكيد. صُممت باقة الأعمال خصيصاً مع وضع المدارس المصرية في الاعتبار. نقدم أسعاراً خاصة للمدارس الحكومية — تواصل معنا لمعرفة المزيد.",
    pr_cta_title: "ما زلت غير متأكد؟ ابدأ مجاناً.",
    pr_cta_sub: "انضم إلى آلاف المصريين الذين يوفرون المياه مع أكوا مايند.",
    pr_cta_btn: "إنشاء حساب مجاني",
    // Premium Stories Page
    ps_crown_badge: "مميز",
    ps_hero_title1: "المزيد من القصص،",
    ps_hero_title2: "تأثير أكبر",
    ps_hero_sub:
      "افتح قصصاً أعمق عن أزمات المياه حول العالم — مدعومة ببيانات حقيقية.",
    ps_already_read: "تمت القراءة",
    ps_read_tag: "مقروءة",
    ps_read_again: "اقرأ مجدداً",
    ps_prem_section: "قصص مميزة",
    ps_members_only: "للأعضاء فقط",
    ps_unlock_overlay: "افتح",
    ps_prem_tag: "مميزة",
    ps_unlock_btn: "افتح القصة",
    ps_pages: "صفحة",
    ps_modal_badge: "قريباً",
    ps_modal_title: "هذه القصة في الطريق",
    ps_modal_text: "نعمل بجد لإحضار هذه القصة إليك. شكراً لكونك عضواً",
    ps_modal_gold: "مميزاً",
    ps_modal_text2: "— ستكون أول من يصل إليها! 🌊",
    ps_modal_stay: "ترقب — قصص جديدة تُضاف كل شهر.",
    ps_modal_btn: "فهمت، شكراً!",
    // Community
    cm_hero_tag: "💧 أكوا مايند",
    cm_hero_title: "المجتمع",
    cm_hero_sub: "اطرح أسئلة، شارك أفكارك، احمِ النيل معاً",
    cm_about_title: "🌊 عن المجتمع",
    cm_about_text:
      "مساحة لمستخدمي أكوا مايند لطرح الأسئلة ومشاركة نصائح توفير المياه ومناقشة الموضوعات البيئية.",
    cm_rule1: "كن محترماً",
    cm_rule2: "ابقَ في الموضوع",
    cm_rule3: "لا للإزعاج",
    cm_rule4: "شارك المعرفة",
    cm_stats_title: "📊 إحصائيات",
    cm_stats_posts: "منشور",
    cm_sort_label: "ترتيب حسب:",
    cm_sort_new: "🕐 الأحدث",
    cm_sort_top: "🔥 الأعلى",
    cm_np_placeholder: "ما الذي يدور في ذهنك؟ ابدأ نقاشاً...",
    cm_np_btn: "منشور جديد",
    cm_np_title_ph: "عنوان المنشور — اجعله واضحاً ومحدداً",
    cm_np_body_ph: "اشرح سؤالك أو فكرتك بالتفصيل...",
    cm_np_cancel: "إلغاء",
    cm_np_submit: "نشر",
    cm_login_nudge: "انضم إلى النقاش —",
    cm_login_link: "سجّل دخولك للنشر أو الرد",
    cm_replying_to: "رداً على",
    cm_reply_ph_inline: "اكتب ردك... (Ctrl+Enter للإرسال)",
    cm_reply_cancel: "إلغاء",
    cm_modal_login: "سجّل دخولك للرد",
    cm_empty: "لا توجد منشورات بعد — ابدأ النقاش!",
    cm_loading: "جاري التحميل...",
    cm_ago_s: "الآن",
    cm_ago_m: "د",
    cm_ago_h: "س",
    cm_ago_d: "ي",
    cm_likes: "إعجاب",
    cm_replies: "رد",
    cm_premium_badge: "مميز",
    cm_challenge_title: "تحدي المياه اليومي",
    cm_challenge_sub: "أجب على 10 أسئلة بشكل صحيح لتفوز بخصم 5% في المتجر!",
    cm_challenge_start: "ابدأ التحدي",
  },
});

// ==============================
// 💧 TIPS DATA — فوق عشان setLanguage تلاقيهم
// ==============================
const tipsData = {
  en: [
    { text: "Fixing leaks can save up to <span>10%</span> of water usage" },
    { text: "Taking shorter showers saves <span>25 gallons</span> per day" },
    { text: "Using a dishwasher is <span>50%</span> more efficient than hand washing" },
    { text: "Turning off the tap while brushing saves up to <span>8 gallons</span> daily" },
    { text: "Harvesting rainwater can reduce mains water use by up to <span>40%</span>" },
    { text: "Watering plants in the early morning prevents <span>30%</span> evaporation" },
    { text: "Installing a low-flow toilet saves <span>13,000 gallons</span> per year" },
    { text: "Washing only full loads of laundry saves up to <span>3,400 gallons</span> a year" },
  ],
  ar: [
    { text: "إصلاح التسريبات يوفّر حتى <span>10%</span> من استهلاك المياه" },
    { text: "الاستحمام القصير يوفّر <span>95 لتراً</span> يومياً" },
    { text: "غسالة الأطباق <span>أكثر كفاءة بنسبة 50%</span> من الغسيل اليدوي" },
    { text: "إغلاق الصنبور أثناء غسل الأسنان يوفر حتى <span>30 لتراً</span> يومياً" },
    { text: "تجميع مياه الأمطار يمكن أن يقلل من استخدام مياه الشبكة حتى <span>40%</span>" },
    { text: "ري النباتات في الصباح الباكر يمنع <span>30%</span> من التبخر" },
    { text: "تركيب مرحاض موفر للمياه يوفر <span>49,000 لتر</span> سنوياً" },
    { text: "تشغيل الغسالة بحمولة كاملة فقط يوفر حتى <span>13,000 لتر</span> سنوياً" },
  ],
};

// ==============================
// STATE VARIABLES — كلهم فوق
// ==============================
let tips = tipsData.en;
let currentTipIndex = 0;
let tipInterval;

// ==============================
// ELEMENTS
// ==============================
const langToggle = document.getElementById("lang-toggle");
const langMenu = document.getElementById("lang-menu");
const langOptions = document.querySelectorAll(".lang-option");
const htmlEl = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");

const tipText = document.querySelector(".tip-text p");
const progressFill = document.querySelector(".progress");
let dots = document.querySelectorAll(".dots span");
const dotsContainer = document.querySelector(".dots");
const prevBtn = document.querySelector(".prev-tip");
const nextBtn = document.querySelector(".next-tip");

// ==============================
// 🌍 LANGUAGE
// ==============================
let currentLang = localStorage.getItem("language") || "en";
if (!translations[currentLang]) currentLang = "en";

const userToggle = document.getElementById("user-toggle");
const userMenu = document.getElementById("user-menu");

function setLanguage(lang) {
  const isAr = lang === "ar";
  htmlEl.setAttribute("dir", isAr ? "rtl" : "ltr");

  document.body.style.fontFamily = isAr
    ? "'Cairo','Segoe UI','Tahoma',Arial,sans-serif"
    : "'Segoe UI',Arial,sans-serif";

  document.querySelectorAll("[data-key]").forEach((el) => {
    const key = el.dataset.key;
    if (translations[lang] && translations[lang][key]) {
      if (el.tagName === "INPUT" && el.placeholder) {
        el.placeholder = translations[lang][key];
      } else {
        el.textContent = translations[lang][key];
      }
    }
  });

  if (prevBtn) prevBtn.style.transform = isAr ? "scaleX(-1)" : "scaleX(1)";
  if (nextBtn) nextBtn.style.transform = isAr ? "scaleX(-1)" : "scaleX(1)";
  document
    .querySelectorAll(".title-icon-left,.title-icon-right")
    .forEach((img) => {
      img.style.transform = isAr ? "scaleX(-1)" : "scaleX(1)";
    });

  // تحديث نصوص التيبس
  tips = tipsData[lang] || tipsData.en;
  currentTipIndex = 0;
  
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    tips.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.addEventListener('click', () => {
        clearInterval(tipInterval);
        currentTipIndex = i;
        updateTip(currentTipIndex);
        startTipRotation();
      });
      dotsContainer.appendChild(dot);
    });
    dots = document.querySelectorAll(".dots span");
  }

  if (tipText && progressFill && dots.length > 0) {
    tipText.innerHTML = tips[0].text;
    const progressPct = (1 / tips.length) * 100;
    progressFill.style.width = progressPct + "%";
    dots.forEach((d, i) => d.classList.toggle("active", i === 0));
  }

  // تحديث Community لو موجودة
  if (typeof cmSetLanguage === "function")
    cmSetLanguage(lang, translations[lang]);
}

setLanguage(currentLang);

langToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  langMenu.classList.toggle("show");
  if (userMenu) userMenu.classList.remove("show");
});

if (userToggle && userMenu) {
  userToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    userMenu.classList.toggle("show");
    if (langMenu) langMenu.classList.remove("show");
  });
}

document.addEventListener("click", () => {
  if (langMenu) langMenu.classList.remove("show");
  if (userMenu) userMenu.classList.remove("show");
});

langOptions.forEach((opt) => {
  opt.addEventListener("click", () => {
    const lang = opt.dataset.lang;
    if (!translations[lang]) return;
    currentLang = lang;
    localStorage.setItem("language", lang);
    setLanguage(lang);
    langMenu.classList.remove("show");
  });
});

// ==============================
// 🌊 WAVE COLORS
// ==============================
function updateWaveColors(isDark) {
  const uses = document.querySelectorAll(".moving-waves use");
  const colors = isDark
    ? ["#0d2137", "#091828", "#050f1a"]
    : ["#def2fc", "#caeafa", "#c0e7fa"];
  uses.forEach((u, i) => {
    if (colors[i]) u.setAttribute("fill", colors[i]);
  });
}

// ==============================
// 🌙 DARK MODE
// ==============================
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
  themeToggle.classList.replace("fa-sun", "fa-moon");
  updateWaveColors(true);
} else {
  updateWaveColors(false);
}

themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  if (isDark) {
    themeToggle.classList.replace("fa-sun", "fa-moon");
  } else {
    themeToggle.classList.replace("fa-moon", "fa-sun");
  }
  updateWaveColors(isDark);
});

// ==============================
// 📜 NAVBAR SCROLL
// ==============================
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// ==============================
// 🍔 HAMBURGER MENU
// ==============================
const hamburger = document.getElementById("hamburger");
const menu = document.querySelector(".menu");

if (hamburger && menu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    menu.classList.toggle("active");
  });
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      menu.classList.remove("active");
    });
  });
  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !menu.contains(e.target)) {
      hamburger.classList.remove("active");
      menu.classList.remove("active");
    }
  });
}

// ==============================
// 👁️ SCROLL REVEAL
// ==============================
function initScrollReveal() {
  const els = document.querySelectorAll(".scroll-reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
  );
  els.forEach((el) => observer.observe(el));
}
initScrollReveal();

// ==============================
// 💧 TIPS CAROUSEL
// ==============================
function updateTip(index) {
  if (!tipText) return;
  tipText.style.opacity = "0";
  setTimeout(() => {
    tipText.innerHTML = tips[index].text;
    if (progressFill) {
      const progressPct = ((index + 1) / tips.length) * 100;
      progressFill.style.width = progressPct + "%";
    }
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
    tipText.style.opacity = "1";
  }, 300);
}

function nextTip() {
  currentTipIndex = (currentTipIndex + 1) % tips.length;
  updateTip(currentTipIndex);
}

function prevTip() {
  currentTipIndex = (currentTipIndex - 1 + tips.length) % tips.length;
  updateTip(currentTipIndex);
}

function startTipRotation() {
  tipInterval = setInterval(nextTip, 8000);
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    clearInterval(tipInterval);
    nextTip();
    startTipRotation();
  });
}

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    clearInterval(tipInterval);
    prevTip();
    startTipRotation();
  });
}

if (tipText && progressFill && dots.length > 0) {
  startTipRotation();
}

// ==============================
// 💧 WATER ALERT POPUP
// ==============================
let countdownValue = 10;
let countdownInterval;

function showWaterAlert() {
  const overlay = document.getElementById("waterAlertOverlay");
  if (overlay) {
    overlay.classList.add("show");
    startCountdown();
  }
}

function closeWaterAlert() {
  const overlay = document.getElementById("waterAlertOverlay");
  if (overlay) {
    overlay.classList.remove("show");
    clearInterval(countdownInterval);
    resetCountdown();
    sessionStorage.setItem("waterAlertShown", "true");
  }
}

function goToAquaGuard() {
  sessionStorage.setItem("waterAlertShown", "true");
  clearInterval(countdownInterval);
  window.location.href = "aquaguard.php";
}

function startCountdown() {
  countdownValue = 10;
  const numberEl = document.getElementById("countdownNumber");
  const circleEl = document.getElementById("countdownCircle");
  const circumference = 2 * Math.PI * 45;
  if (circleEl) {
    circleEl.style.strokeDasharray = circumference;
    circleEl.style.strokeDashoffset = 0;
  }
  countdownInterval = setInterval(() => {
    countdownValue--;
    if (numberEl) numberEl.textContent = countdownValue;
    if (countdownValue <= 5) {
      if (numberEl) numberEl.classList.add("danger");
      if (circleEl) circleEl.classList.add("danger");
    }
    if (circleEl) {
      circleEl.style.strokeDashoffset =
        circumference - (countdownValue / 10) * circumference;
    }
    if (countdownValue <= 0) {
      clearInterval(countdownInterval);
      setTimeout(() => {
        sessionStorage.setItem("waterAlertShown", "true");
        window.location.href = "aquaguard.php";
      }, 500);
    }
  }, 1000);
}

function resetCountdown() {
  countdownValue = 10;
  const numberEl = document.getElementById("countdownNumber");
  const circleEl = document.getElementById("countdownCircle");
  if (numberEl) {
    numberEl.textContent = "10";
    numberEl.classList.remove("danger");
  }
  if (circleEl) {
    circleEl.style.strokeDashoffset = 0;
    circleEl.classList.remove("danger");
  }
}

window.addEventListener("load", () => {
  const isHome =
    window.location.pathname.endsWith("index.html") ||
    window.location.pathname.endsWith("/") ||
    window.location.pathname === "" ||
    window.location.pathname.endsWith("index.php");
  if (isHome && !sessionStorage.getItem("waterAlertShown")) showWaterAlert();
});

const alertOverlay = document.getElementById("waterAlertOverlay");
if (alertOverlay) {
  alertOverlay.addEventListener("click", (e) => {
    if (e.target.id === "waterAlertOverlay") closeWaterAlert();
  });
}

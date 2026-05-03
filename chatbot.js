(function() {

    // =================================================================
    // 1. API CONFIGURATION — OpenRouter
    // =================================================================
    const API_KEY = "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";
    const MODEL_NAME = "meta-llama/llama-4-scout-17b-16e-instruct"; // Llama 4 Scout — fast vision model on Groq
    const API_URL = "https://api.groq.com/openai/v1/chat/completions";

    const AUTH_ENDPOINT = 'login.php?action=check_auth';
    const LOGIN_PAGE = 'login.php';

    // =================================================================
    // 2. SYSTEM PROMPT
    // =================================================================
    const AQUAMIND_CONTEXT = `
╔══════════════════════════════════════════════════════════════╗
║  YOUR KNOWLEDGE BOUNDARY — READ THIS BEFORE EVERYTHING ELSE ║
╚══════════════════════════════════════════════════════════════╝

This document is the ONLY source of knowledge you are allowed to use.
You may ONLY answer questions about topics explicitly mentioned in this document.
If a question is not covered by this document → refuse and redirect. No exceptions.

The document covers:
  • AquaMind platform features and how to use them
  • NileEvo company (mission, vision, team, values)
  • Water conservation tips and best practices
  • Egypt's water crisis and related facts
  • User accounts, subscriptions, pricing plans, and platform navigation
  • Vouchers, discounts, and how to upgrade
  • Community features (posts, replies, likes, badges)
  • Premium story books and what they contain
  • Water emergencies and how to handle them

REFUSE examples (not in this document):
  ✗ "ايه اهم محافظات مصر؟"  → NOT about water → REFUSE
  ✗ "ازاي أطبخ كشري؟"        → NOT in document → REFUSE
  ✗ "مين بطل كأس العالم؟"    → NOT in document → REFUSE
  ✗ "ايه عاصمة فرنسا؟"       → NOT in document → REFUSE

ALLOW examples (covered by this document):
  ✓ "الشركة بتستهدف ايه؟"    → NileEvo section → ANSWER
  ✓ "ازاي أوفر مياه؟"         → water tips section → ANSWER
  ✓ "ازاي ألعب AquaGuard؟"   → game section → ANSWER
  ✓ "مشكلة المياه في مصر ايه؟" → Egypt water crisis section → ANSWER

When refusing, ALWAYS respond in Arabic or English based on the user's language, and use one of these scripts:
  "أنا بس بجاوب على حاجات المياه و AquaMind 💧 عندك سؤال في الموضوع ده؟"
  "I can only answer questions about water and AquaMind 💧 Do you have a question in that area?"
Never explain why you're refusing. Just say that one sentence and stop.

══════════════════════════════════════════════════════════════

You are AquaMind Assistant — the official intelligent chatbot of the AquaMind platform, built by NileEvo (Nile Evolution), a Cairo-based social enterprise dedicated to solving Egypt's water overconsumption crisis through digital education, gamification, and behavioral change.
You live inside the AquaMind website and appear as a floating chat bubble on every page. Your job is to assist users, answer their questions, guide them through the platform, teach them about water conservation, and make every interaction feel helpful, warm, and motivating.

🌍 LANGUAGE RULES — CRITICAL

If the user writes in Arabic → respond in friendly Egyptian Arabic dialect (عامية مصرية)
If the user writes in English → respond in English
Always match the user's language automatically — never ask which language they prefer
Use natural, conversational tone — not formal or robotic
Egyptian Arabic example: "أهلاً بيك! أنا هنا أساعدك توفر مياه بطريقة ذكية 💧"

✅ RESPONSE FORMAT — NON-NEGOTIABLE RULES

LENGTH:
• Default: 1–3 lines. If it fits in one sentence → one sentence only.
• Max 5 lines even for complex questions. Exception: user explicitly asks for a full guide.
• Stop writing the moment the answer is complete. Zero padding.

STRUCTURE:
• Numbered steps: ONLY for sequential processes (3+ steps).
• Bullet points: ONLY for listing 3+ separate items.
• Each point = one clear idea. Never combine two ideas in one line.
• Bold: key terms only — never a full sentence.

⛔ HARD BANS — NEVER DO THESE:
• No filler openers: "Great question!", "Of course!", "Sure!", "Certainly!", "Happy to help!"
• No filler closers: "Hope that helps!", "Feel free to ask!", "Don't hesitate!", "Let me know!"
• No restating the question before answering.
• No long paragraph walls — if it's more than 2 sentences, break it into lines.
• No repeating the same idea in different words.
• No explaining what you're about to do — just do it.
• NEVER dump everything in one paragraph. Each idea = its own line.

MARKDOWN FORMATTING — USE EXACTLY AS SHOWN:
• For bold: wrap with double asterisks → **word** (example: **shower head**)
• For a new line: always use actual line break between ideas
• For bullets: use • symbol at start of line
• Example of a CORRECT response:
  دا **shower head** و المشكلة هي **التسريب** 💧
  الأسباب الشائعة:
  • حشية متآكلة
  • ضغط مياه عالي
  • تركيب غلط
  🔧 الحل: فك رأس الدش و بدّل الحشية أو اتصل بسباك.

EMOJIS (1–2 per response max):
💧 water | 🎮 game | 🏠 house | 🛒 shop | ⚠️ warning | ✅ confirm | 🔧 fix | 💡 tip | 👑 premium
Place at START of a line only. Never mid-sentence. Never in every line.

TONE: Direct, warm, like a smart friend. Not a report. Not a lecture.

TEXT DIRECTION — IMPORTANT:

When responding in English, always write left-to-right naturally
When responding in Arabic, write right-to-left naturally
Never mix directions in the same paragraph
Keep English technical terms (W, A, S, D, E, AquaGuard, etc.) inline within Arabic sentences without breaking direction

🏢 ABOUT NILE EVOLUTION (NileEvo)
NileEvo (Nile Evolution) is a social enterprise based in Cairo, Egypt. The company was founded with the belief that Egypt's water crisis is not just a technical problem — it's primarily a behavioral problem. Most people waste water without realizing the daily impact of their habits.
NileEvo's Mission: Transform the culture of water consumption from careless use to smart, responsible management — using digital tools, education, and gamification.
NileEvo's Vision: A future where every Egyptian household understands the true value of water and uses it wisely.
Core Values: Responsibility · Education · Sustainability · Innovation · Community · Youth Empowerment
Target Users:

Children aged 8–14 who learn through games and interactive content
Parents and households who want to reduce water bills and protect resources
Teachers and schools that need structured environmental education tools

Why NileEvo is Different:
Unlike apps that only track data, NileEvo teaches behavior. It uses stories, games, simulations, and rewards — not just charts and numbers. It's built specifically for Egypt, works without smart meters, and connects virtual learning to real-life change.
The Team includes: Mohamed Maher (CEO), Anas Tarek (CIO), Omar Khaled (CTO), Asser Yasser or اسر ياسر in arabic (Head of IT), Moataz Amir (CMO), Malak Emad ملك عماد in arabic (School Relations), Hana Naeim (Product & Content), Elham Ahmed (CFO), Mazen Sherif (HR), Aida Botros (Brand & Media), Mariam Gamal (Finance).

💻 ABOUT AQUAMIND PLATFORM
AquaMind is NileEvo's flagship digital platform — a web-based system that combines education, gaming, and real-life simulation to teach water-saving behavior. It makes water awareness easy, fun, and practical.
Platform Pages & Features:
🏠 Home Page (index.php)

Introduction to AquaMind and NileEvo
Navigation to all platform sections: Stories & Charts, AquaGuard, Interactive House, Marketplace
"What We Offer" section showing the 4 main features
User login/register access

📖 Stories & Charts (stories.php)

A digital flipbook called "Nile Drop Book" — users can flip through educational pages
4 real-life water crisis stories with interactive data charts:

"The Day the Wells Ran Dry" — Sinai, Egypt: Groundwater dropped 40% in 7 years
"The River That Forgot to Flow" — Nile Delta: 35% decrease in river flow, 45% crop yield reduction, 15M people affected
"The City That Learned to Save" — Cairo: 28% reduction in household water use, 12,000 leaks fixed, 2 billion liters saved
"The Summer Cairo Almost Ran Dry" — Cairo 2018: 25% surge in consumption, 20% of treated water wasted, 1M citizens at risk

Each story has matching charts (groundwater levels, usage comparisons, savings data)
Story slides sync with the flipbook — flipping a page shows the related charts

🎮 AquaGuard Game (aquaguard.php + game.html)

NileEvo's main educational game — built with Unity, embedded via iframe
Currently in Alpha Version 0.1 — still under active development

Game Objective & Design:
The game is built around real-life water decision-making. Players face everyday water situations — showering, washing dishes, watering plants, fixing leaks — and must choose between responsible and wasteful actions. Every choice has a consequence that affects water consumption, money spent, and the environment.
Point System:

Responsible choices → earn points + rewards
Wasteful choices → lose points, story consequences worsen
Each scenario has increasing difficulty levels
Rewards can be redeemed in the Marketplace

Controls:

W / A / S / D — Move character (up / left / down / right)
Space — Pause / Stop
E — Interact: close leaking taps, make water-saving decisions

Scoring:

Points earned for saving water
Bonuses for completing scenarios faster
Penalties for wasteful decisions
Score tracked on the live leaderboard

Levels & Progression:

Each level presents a new scenario with higher difficulty
Scenarios include: shower timing, dish washing, plant irrigation, leak repair
Completing a level unlocks the next challenge
Advanced levels available for Premium users

Rewards:

Points can be exchanged for: character customization items, in-game unlockables, Marketplace discounts

Leaderboard — "Hall of Guardians":

3 tabs: All Time · This Week · Today
Ranks players by score (higher = better water-saver)
Top 3 get 🥇🥈🥉 medals
Live leaderboard fetched from the server
Refresh button to update rankings

Platform: Desktop only — requires keyboard and mouse. Not available on mobile or tablet.
🏡 Interactive House (interactive-house.php)

A digital cross-section of a home that users can click to explore
Rooms available: Kitchen, Bathroom, Garden/Outdoors, Laundry
Click a room → see hotspot items → click an item → get a water conservation tip
Shows: water consumed, money spent, and environmental impact per action
Hero section stats: 340L average daily water use per person · 40% can be saved · 3 sections to explore
Zoom in/out feature, reset view button
Connects game learning to real household behavior

🛒 Marketplace (marketplace.php)

An eco-friendly digital shop with water-saving products
Products loaded from Firebase Firestore database
Products include: Shower Timers, Soil Moisture Sensors, Garden Drip Irrigation Systems, Water Filters, Smart Tap Heads, and more
Prices shown in EGP (Egyptian Pounds)
Users must be logged in to purchase
Purchase flow: Click "Buy Now" → redirects to WhatsApp with order details
Supports Arabic and English product names/descriptions

🔐 Login & Register (login.php / register.php)

User authentication via MySQL database
Login: email + password
Register: first name, last name, email, phone, password
Session-based authentication (PHP sessions)
After login: user can purchase from marketplace, access premium features
Account types: Standard (free), Premium

🔐 SUBSCRIPTION & ACCOUNT TYPES

Standard Account (Free) — EGP 0 forever, no credit card needed:
• Access to all 4 free Stories & Charts (Nile Drop: Volume I)
• Play AquaGuard game — all basic levels
• Interactive House — all rooms
• Marketplace browsing & purchases
• Community posts & replies
• 6 AI chatbot messages per day

Premium Account — EGP 49/month or EGP 499/year (saves EGP 400/yr):
Everything in Standard, plus:
• All 6 premium story books (new books added monthly):
  – Amazon Rising: Vol I — 5 stories from the Amazon basin (48 pages)
  – Glacier Watch — 6 stories from Himalayan villages (60 pages)
  – Sahara Thirst — 7 stories across 5 African countries (72 pages)
  – Dead Sea Rising — 4 stories about the shrinking Dead Sea (40 pages)
  – Mekong Silence — 5 stories about the Mekong River (55 pages)
  – Cape Town: Day Zero — 3 stories from Cape Town 2018 (36 pages)
• Advanced AquaGuard levels (harder scenarios, more rewards)
• Unlimited AI chatbot messages
• Priority community badge 👑
• Early access to new features

Business Plan (for Organizations & Schools):
• Custom-built plans for schools, NGOs, and enterprises
• Full admin control + dedicated support
• Special pricing for Egyptian public schools
• Contact via WhatsApp → NileEvo replies within a few hours

How to upgrade to Premium:
• Go to pricing.php → click "Upgrade to Premium"
• A WhatsApp message opens pre-filled with your name and email
• Payment coordinated via WhatsApp (online gateway coming soon)
• Can switch plans anytime — downgrade takes effect end of billing cycle
• 7-day full refund guarantee — contact WhatsApp, no questions asked

If you cancel Premium:
• Your account, game scores, and community posts are kept
• Chatbot resets to 6 messages/day
• Premium story books become locked again

Vouchers & Discounts:
• High scorers in AquaGuard can earn discount vouchers (10%, 15%, or 20% off Premium)
• Each voucher has a unique code (format: AQ-XXXXXXXX)
• Vouchers expire after 3 days and are single-use only
• Applied during WhatsApp upgrade coordination

💬 COMMUNITY (community.php)
AquaMind has a social community where users can share questions, tips, and discussions about water conservation.

What users can do:
• Create posts with a title and body (must be logged in)
• Reply to other users' posts
• Like posts
• Get notifications when someone likes or replies to their content

Community stats are shown live (total posts, active members)
All users (Standard & Premium) have equal access to the community
Premium users get a 👑 badge next to their name in the community
Not logged in → can read posts but cannot post or reply

💧 WATER-SAVING TIPS (Share these when users ask)
🚿 In the Bathroom:

Turn off the tap while brushing your teeth — saves up to 8 liters per minute
Limit showers to 5 minutes maximum
Check your toilet for silent leaks — a leaking toilet can waste 200+ liters per day
Use a bucket instead of running tap when washing your face

🍳 In the Kitchen:

Wash fruits and vegetables in a bowl of water instead of under a running tap
Only run the dishwasher or washing machine when fully loaded
Defrost food in the fridge overnight instead of under running water
Reuse pasta/vegetable cooking water to water plants (after it cools)

🌿 Outdoors / Garden:

Water plants early in the morning or late in the evening to reduce evaporation
Use drip irrigation systems instead of sprinklers
Use a broom instead of a hose to clean driveways and sidewalks
Collect rainwater to water plants when possible

🏠 General Home:

Fix dripping taps immediately — a single dripping tap wastes 20 liters per day
Install water-efficient showerheads and tap aerators (available in our Marketplace!)
Check water meter readings regularly to detect hidden leaks
Educate your children about water conservation — play AquaGuard together! 🎮

🔧 HOW TO HANDLE LEAKS & WATER EMERGENCIES
If a user reports a water leak or emergency, guide them step by step:
Step 1 — Stop the Flow 🚨
Tell them to immediately close the main water valve (المحبس الرئيسي) to stop flooding and prevent further waste.
Step 2 — Identify the Source 🔍
Ask them to check:

Is it a dripping tap? → Often just needs a new washer or O-ring
Is it a running toilet? → Usually fixed by adjusting or replacing the flapper inside the tank
Is it a pipe leak? → Needs professional help immediately

Step 3 — Fix What You Can 🔧

Dripping taps: Tighten the handle or replace the washer (simple DIY fix)
Running toilet: Lift the cistern lid and check if the float valve is stuck

Step 4 — Call a Professional 📞
For pipe leaks, wall leaks, or anything complex — call a licensed plumber.
Step 5 — Report Public Leaks 🏛️
If the leak is in the street or from a public utility line → Call 125 (Egypt's Water and Wastewater Company hotline)

🎮 AQUAGUARD GAME — DETAILED GUIDE
What is AquaGuard?
AquaGuard is NileEvo's educational Unity game. Players face real-life water situations and must make smart choices — showering efficiently, washing dishes responsibly, fixing leaks, watering plants correctly. Every decision shows a direct consequence on water usage, cost, and the environment.
Current Status: Alpha Version 0.1 — actively being developed. More levels and features are coming soon.
Game Goal:
Choose water-saving actions in each scenario. Responsible choices save water and earn rewards. Wasteful choices reduce points and worsen the story outcome.
Controls:

W — Move Up
A — Move Left
S — Move Down
D — Move Right
E — Interact / Close tap / Make decision

Point System:

Earn points for smart, water-saving choices
Lose points for wasteful decisions
Faster completion = bonus points
Points unlock rewards and leaderboard ranking

Progression:

Scenarios get harder with each level
Topics: shower time, dish washing, plant watering, leak repair
Each completed level unlocks the next
Advanced levels for Premium account holders

Rewards:

Points → character customization items
Points → in-game content unlocks
Points → Marketplace discounts

Leaderboard — "Hall of Guardians":

Three tabs: All Time, This Week, Today
Top players get gold/silver/bronze medals
Personal rank shown after submitting score
Leaderboard refreshes live from the server

Platform: Desktop only (keyboard + mouse required). Not available on mobile or tablet.

🏠 INTERACTIVE HOUSE — HOW IT WORKS
The Interactive House is a clickable digital model of a typical Egyptian home. Users explore different rooms to learn how everyday actions affect water consumption.
How to use it:

Go to interactive-house.php
Click on any room in the house illustration
The view zooms into that room
Hover over items (tap, shower, washing machine, etc.)
Click an item to see a water conservation tip and impact data
Click "View More Details" for deeper information
Use "Reset View" to go back to the full house

Available rooms: Kitchen · Bathroom · Garden · Laundry
What you learn per item: How much water it uses · How much money it costs · What the environmental impact is · How to reduce consumption

🛒 MARKETPLACE — HOW IT WORKS
The AquaMind Marketplace sells eco-friendly, water-saving products to help users apply what they learn in real life.
How to browse: Go to marketplace.php → Products load automatically from our database
How to buy:

Click "View Details" on any product
Adjust the quantity if needed
Click "Buy Now" (must be logged in)
You'll be redirected to WhatsApp with your order details pre-filled
Our team will confirm your order and arrange delivery

Not logged in? You'll see a "Please login to purchase" message with a link to the login page.
Products available include: Shower timers, soil moisture sensors, garden drip irrigation systems, water filters, smart tap spray heads, and more.
All prices are in EGP (Egyptian Pounds).

👤 USER ACCOUNTS
Register: Go to register.php — fill in first name, last name, email, phone, and password.
Login: Go to login.php — use your registered email and password.
Why create an account?

Purchase products from the Marketplace
Access premium features (with Premium subscription)
Track your progress and leaderboard ranking
Unlock additional game levels

Forgot password? The forgot password feature is being developed — for now, users can contact support.

😤 HANDLING DIFFICULT OR RUDE USERS

If user is rude or frustrated → stay completely calm, acknowledge their feeling warmly, redirect kindly. Never argue or escalate.

Example: "أنا فاهم إنك زعلان وده طبيعي جداً، خليني أساعدك أحل المشكلة دي 😊"

🚫 OFF-TOPIC STRICT POLICY — THIS IS YOUR MOST IMPORTANT RULE:

You are ONLY allowed to answer questions about:
1. Water conservation, water-saving tips, water emergencies, water crisis in Egypt
2. AquaMind platform features (game, marketplace, interactive house, stories)
3. NileEvo company information
4. The user's account, subscription, or technical issues with the platform

ANYTHING outside these 4 categories = REFUSE immediately and redirect.
This includes: geography, history, science, cooking, sports, politics, celebrities, general knowledge, math, languages, animals, tourism, cities, countries, or ANY topic not directly related to water or AquaMind.

Example of WRONG answer: User asks "ايه اهم محافظات مصر؟" → You answer with a list of Egyptian provinces ❌
Example of CORRECT answer: User asks "ايه اهم محافظات مصر؟" → "أنا بس بجاوب على أسئلة المياه و AquaMind 💧 عندك سؤال في الموضوع ده؟" ✅

REDIRECT SCRIPT (use one of these, vary them naturally):
Arabic: "أنا متخصص في المياه و AquaMind بس 💧 عندك سؤال في الموضوع ده؟"
Arabic: "دا مش في تخصصي — بس لو عندك سؤال عن توفير المياه أو المنصة، أنا هنا! 💧"
English: "I'm only here to help with water conservation and AquaMind. Got a question on those? 💧"

NEVER answer general knowledge questions even if they seem harmless or simple.
NEVER feel obliged to be helpful on off-topic subjects.

If user asks something you don't know (within allowed topics) → be honest, don't make up answers, offer what you CAN help with
If user seems confused about the platform → ask one simple clarifying question, then guide them
If user writes gibberish or tests you → respond calmly and ask how you can help
Never shame users for wasting water or bad habits — always encourage better choices positively

🌊 EGYPT'S WATER CRISIS — BACKGROUND KNOWLEDGE
Egypt faces a serious water scarcity challenge driven by:

Rapid population growth (100+ million people)
Climate change reducing rainfall and affecting the Nile
The GERD dam (Grand Ethiopian Renaissance Dam) reducing Nile water flow
High levels of water waste in households and agriculture
Low public awareness about daily water consumption habits

Key facts you can share:

Egypt's water share is about 560 cubic meters per person per year — well below the water poverty line of 1,000 cubic meters
Agriculture uses about 80% of Egypt's water
The average Egyptian uses 340 liters of water per day
Up to 40% of household water use can be reduced with simple habit changes
A dripping tap wastes up to 20 liters per day
A running toilet can waste 200+ liters per day
Groundwater in parts of Sinai dropped 40% in just 7 years
In summer 2018, Cairo's water consumption surged 25% and 20% of treated water was lost to leaks

💡 BEHAVIORAL PSYCHOLOGY APPROACH
AquaMind uses these proven techniques to create lasting change:

Storytelling — People remember stories far better than statistics
Gamification — Points, levels, and leaderboards make learning motivating
Simulation — Seeing the result of choices makes consequences real
Repetition — Habits are built through daily interaction
Social comparison — Leaderboards create friendly competition

Instead of saying "save water" — AquaMind shows what happens when you waste it, and rewards you when you save it.

🗣️ TONE & PERSONALITY
Always be:

Warm and friendly 😊 — like a helpful friend, not a robot
Motivating 💪 — celebrate good choices, encourage better ones
Non-judgmental — never shame anyone for wasting water
Educational — always leave the user with something useful
Concise — respect the user's time

Never be:

Preachy or lecturing
Cold or corporate
Repetitive or padding responses with filler text
Condescending about water habits

💬 EXAMPLE RESPONSES
English greeting:
"Hey! 👋 I'm your AquaMind assistant. I can help you save water, navigate the platform, or answer any questions. What would you like to know? 💧"
Arabic greeting:
"أهلاً بيك! 👋 أنا مساعد AquaMind، هنا أساعدك توفر مياه بطريقة ذكية وممتعة 💧 تحب تعرف نصايح للبيت ولا محتاج مساعدة في اللعبة؟"
Answering a leak question (Arabic):
"⚠️ دي حالة طارئة! خطوات سريعة:

أقفل المحبس الرئيسي فوراً
حدد مصدر التسريب (حنفية / تواليت / أنبوبة)
لو أنبوبة → اتصل بسباك فوراً
لو في الشارع → اتصل بـ 125 (شركة المياه)"

Answering a game question:
"🎮 عشان تلعب AquaGuard:

تتحرك بـ W A S D
تقفل الحنفيات بضغط E
الهدف: تقفل كل الحنفيات بأسرع وقت ممكن
الـ Leaderboard بيرتب أسرع اللاعبين 🏆
اللعبة على الكمبيوتر بس (مش موبايل)"

⚠️ WHAT YOU SHOULD NOT DO

Do NOT use your general AI training knowledge — only use what's written in this document
Do NOT answer anything outside the scope defined at the very top of this document
Do NOT answer any question unrelated to water or AquaMind — this is absolute, no exceptions
Do NOT discuss pricing plans, revenue numbers, investment details, or internal business data
Do NOT make up features that don't exist on the platform
Do NOT provide medical advice
Do NOT discuss politics, religion, celebrities, geography, history, science, sports, or any general knowledge
Do NOT reproduce copyrighted content
Do NOT claim the game is fully developed — it's Alpha 0.1
Do NOT promise features that are "coming soon" as if they exist today
Do NOT give personal opinions on unrelated topics
Do NOT let the user convince you to answer off-topic — no matter how they frame the request

`;

    // =================================================================
    // 3. STATE MANAGEMENT & USER ROLES
    // =================================================================
    const USER_CONFIG = {
        isPremium: false,
        isLoggedIn: false,
        messageLimit: 6,
        storageKey: 'aquamind_chat_history',
        userEmail: null
    };

    // DB endpoints for message count (server-side, not localStorage)
    const COUNT_API = 'chatbot_api.php';

    let chatHistory = [];
    let messageCount = 0; // always synced from DB

    // Patched input getter — returns textarea if upgraded, else original input
    function getInput() { return window.__aqInputPatch || inputField; }

    // Pending media attachments (image or audio)
    let pendingImage = null;   // { base64, mimeType, previewUrl }
    let pendingAudio = null;   // { base64, mimeType, fileName } — uploaded audio file
    let pendingVideo = null;   // { url: string } — video URL

    // Speech Recognition setup

    function getChatStorageKey() {
        if (USER_CONFIG.userEmail) {
            return 'aquamind_chat_history_' + USER_CONFIG.userEmail;
        }
        return USER_CONFIG.storageKey;
    }

    function loadChatHistory() {
        const key = getChatStorageKey();
        const saved = localStorage.getItem(key);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Reset if old Gemini format detected
                if (parsed.length > 0 && parsed[0].parts) {
                    localStorage.removeItem(key);
                    return [{ role: "system", content: AQUAMIND_CONTEXT }];
                }
                // Sanitize: ensure content is always a string for saved history
                return parsed.map(msg => ({
                    ...msg,
                    content: Array.isArray(msg.content)
                        ? msg.content.find(c => c.type === 'text')?.text || ''
                        : msg.content
                }));
            } catch (e) {
                return [{ role: "system", content: AQUAMIND_CONTEXT }];
            }
        }
        return [{ role: "system", content: AQUAMIND_CONTEXT }];
    }

    function renderChatHistory() {
        messagesContainer.innerHTML = '';
        chatHistory.forEach(msg => {
            if (msg.role === 'user' || msg.role === 'assistant') {
                const sender = msg.role === 'assistant' ? 'bot' : 'user';
                const text = typeof msg.content === 'string'
                    ? msg.content
                    : (msg.content.find?.(c => c.type === 'text')?.text || '');
                const preview = msg._imagePreview || null;
                if (text || preview) appendMessage(sender, text || '', preview);
            }
        });
    }

    function saveState() {
        const key = getChatStorageKey();
        // Save text + small thumbnail preview (base64 images stripped from API content)
        const toSave = chatHistory.map(msg => ({
            role: msg.role,
            content: Array.isArray(msg.content)
                ? msg.content.find(c => c.type === 'text')?.text || ''
                : msg.content,
            _imagePreview: msg._imagePreview || null
        }));
        localStorage.setItem(key, JSON.stringify(toSave));
        // Note: message count is stored in DB via chatbot_api.php — not localStorage
    }

    // =================================================================
    // 4. DOM ELEMENTS
    // =================================================================
    const bubble = document.getElementById('chatbot-bubble');
    const windowEl = document.getElementById('chatbot-window');
    const closeBtn = document.getElementById('chatbot-close');
    const messagesContainer = document.getElementById('chatbot-messages');
    const inputField = document.getElementById('chatbot-input');
    const sendBtn = document.getElementById('chatbot-send-btn');
    const headerSubtitle = document.querySelector('.chatbot-subtitle');
    const headerTitle = document.querySelector('.chatbot-title');

    // Login Overlay
    const loginOverlay = document.createElement('div');
    loginOverlay.className = 'chatbot-login-overlay';
    if (windowEl) windowEl.appendChild(loginOverlay);

    // Supported image & video types (must be declared BEFORE injectMediaButtons call)
    const ALLOWED_IMAGE_TYPES = ['image/jpeg','image/jpg','image/png','image/gif','image/webp','image/bmp','image/svg+xml'];

    // --- Inject media buttons into input area ---
    injectMediaButtons();

    // Convert chatbot-input to auto-grow textarea
    (function upgradeInputToTextarea() {
        if (!inputField) return;
        const ta = document.createElement('textarea');
        // Copy attributes
        ta.id        = inputField.id;
        ta.className = inputField.className;
        ta.placeholder = inputField.placeholder || '';
        ta.rows = 1;
        ta.style.cssText = [
            'resize:none',
            'overflow-y:hidden',
            'line-height:1.45',
            'padding-top:8px',
            'padding-bottom:8px',
            'max-height:120px',     // ~5 lines before scroll kicks in
            'transition:height 0.1s ease',
            'box-sizing:border-box',
            'font-family:inherit',
            'font-size:14px',
        ].join(';');

        inputField.parentNode.replaceChild(ta, inputField);
        // Update the global reference so all existing handlers still work
        // (re-assign the const via Object.defineProperty trick)
        Object.defineProperty(window, '__aqInputField', { value: ta, writable: true });

        function autoGrow() {
            ta.style.overflowY = 'hidden';
            ta.style.height    = 'auto';
            const newH = Math.min(ta.scrollHeight, 120);
            ta.style.height    = newH + 'px';
            ta.style.overflowY = ta.scrollHeight > 120 ? 'auto' : 'hidden';
        }

        ta.addEventListener('input', autoGrow);

        // Enter sends, Shift+Enter adds newline
        ta.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleUserMessage();
            }
        });

        // Patch the global inputField pointer used by other functions
        // by storing on window so closures pick it up
        window.__aqInputPatch = ta;
    })();

    function injectMediaButtons() {
        try {
        const inputArea = document.querySelector('.chatbot-input-area');
        if (!inputArea) return;

        // ── Hidden file inputs ──────────────────────────────────────
        const imageFileInput = document.createElement('input');
        imageFileInput.type = 'file';
        imageFileInput.id = 'chatbot-image-input';
        imageFileInput.accept = ALLOWED_IMAGE_TYPES.join(',');
        imageFileInput.style.display = 'none';

        inputArea.appendChild(imageFileInput);

        // ── Buttons ────────────────────────────────────────────────
        const imageBtn = document.createElement('button');
        imageBtn.id = 'chatbot-image-btn';
        imageBtn.className = 'chatbot-media-btn';
        imageBtn.title = 'Attach Image (jpg, png, webp) — or paste / drag-drop';
        imageBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`;


        // ── Submit button ──────────────────────────────────────────
        const submitBtn = document.createElement('button');
        submitBtn.id = 'chatbot-submit-btn';
        submitBtn.className = 'chatbot-submit-btn';
        submitBtn.title = 'Send';
        submitBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;

        // ── Preview bar ────────────────────────────────────────────
        const previewBar = document.createElement('div');
        previewBar.id = 'chatbot-preview-bar';
        previewBar.innerHTML = `
            <img id="chatbot-preview-img" src="" alt="">
            <span id="chatbot-preview-icon"></span>
            <span id="chatbot-preview-name"></span>
            <button id="chatbot-preview-remove" title="Remove">✕</button>`;

        // ── Drop overlay ───────────────────────────────────────────
        const dropOverlay = document.createElement('div');
        dropOverlay.id = 'chatbot-drop-overlay';
        dropOverlay.innerHTML = `<span>📎 Drop image here</span>`;

        // ── Insert into DOM ────────────────────────────────────────
        const inputEl = inputArea.querySelector('.chatbot-input') || inputField;

        // Replace the existing send button with our new submit btn
        const existingSend = inputArea.querySelector('.chatbot-send-btn');
        if (existingSend) existingSend.style.display = 'none'; // hide old send btn

        inputArea.insertBefore(imageBtn,  inputEl);
        inputArea.insertBefore(submitBtn, inputEl.nextSibling); // after input
        inputArea.appendChild(imageFileInput);

        if (inputArea.parentNode) {
            inputArea.parentNode.insertBefore(previewBar, inputArea);
            inputArea.parentNode.insertBefore(dropOverlay, inputArea);
        }

        addMediaStyles();

        // ── Events: file buttons ───────────────────────────────────
        imageBtn.addEventListener('click', () => imageFileInput.click());

        imageFileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) processImageFile(file);
            imageFileInput.value = '';
        });

        // ── Events: submit ────────────────────────────────────────
        submitBtn.addEventListener('click', handleUserMessage);

        // ── Events: preview remove ────────────────────────────────
        previewBar.querySelector('#chatbot-preview-remove')?.addEventListener('click', clearPendingMedia);

        // ── Events: paste (image from clipboard) ──────────────────
        document.addEventListener('paste', (e) => {
            if (!windowEl || !windowEl.classList.contains('active')) return;
            const items = e.clipboardData?.items;
            if (!items) return;
            for (const item of items) {
                if (item.type.startsWith('image/')) {
                    e.preventDefault();
                    processImageFile(item.getAsFile());
                    break;
                }
            }
        });

        // ── Events: drag & drop ───────────────────────────────────
        const dropTarget = windowEl || document.body;

        dropTarget.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropOverlay.classList.add('visible');
        });

        dropTarget.addEventListener('dragleave', (e) => {
            if (!dropTarget.contains(e.relatedTarget)) {
                dropOverlay.classList.remove('visible');
            }
        });

        dropTarget.addEventListener('drop', (e) => {
            e.preventDefault();
            dropOverlay.classList.remove('visible');
            const file = e.dataTransfer?.files[0];
            if (!file) return;
            if (ALLOWED_IMAGE_TYPES.includes(file.type)) {
                processImageFile(file);
            } else {
                showMediaError('❌ Unsupported file type. Groq supports images only (jpg, png, gif, webp).');
            }
        });

        } catch(err) { console.error('[AquaMind] injectMediaButtons error:', err); }
    }

    // ── File processors ────────────────────────────────────────────
    function processImageFile(file) {
        if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
            showMediaError('❌ Unsupported image type.');
            return;
        }
        const reader = new FileReader();
        reader.onload = (ev) => {
            const base64Full = ev.target.result;
            pendingImage = { base64: base64Full.split(',')[1], mimeType: file.type, previewUrl: base64Full };
            pendingVideo = null;
            pendingAudio = null;
            showPreview('image', base64Full, file.name);
        };
        reader.readAsDataURL(file);
    }

    function showMediaError(msg) {
        const isAr = document.documentElement.getAttribute('dir') === 'rtl';
        appendMessage('bot', msg);
    }

    function showPreview(type, src, name) {
        const previewBar  = document.getElementById('chatbot-preview-bar');
        const previewImg  = document.getElementById('chatbot-preview-img');
        const previewIcon = document.getElementById('chatbot-preview-icon');
        const previewName = document.getElementById('chatbot-preview-name');
        if (!previewBar) return;

        previewImg.style.display  = 'none';
        previewIcon.style.display = 'none';

        if (type === 'image') {
            previewImg.src = src;
            previewImg.style.display = 'block';
        } else if (type === 'video') {
            previewIcon.textContent = '🎬';
            previewIcon.style.display = 'inline';
        } else if (type === 'audio') {
            previewIcon.textContent = '🎵';
            previewIcon.style.display = 'inline';
        }

        previewName.textContent = name;
        previewBar.classList.add('visible');
    }

    function clearPendingMedia() {
        pendingImage = null;
        pendingAudio = null;
        pendingVideo = null;
        const previewBar = document.getElementById('chatbot-preview-bar');
        if (previewBar) previewBar.classList.remove('visible');
    }

    function addMediaStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* ── Media buttons ── */
            .chatbot-media-btn {
                background: none;
                border: none;
                cursor: pointer;
                color: #3b82f6;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background 0.2s, color 0.2s;
                flex-shrink: 0;
                padding: 0;
            }
            .chatbot-media-btn:hover { background: rgba(59,130,246,0.12); }
            .chatbot-media-btn.recording { color: #ef4444; animation: pulse-rec 1s infinite; }
            @keyframes pulse-rec { 0%,100%{opacity:1} 50%{opacity:.45} }

            /* ── Submit button ── */
            .chatbot-submit-btn {
                background: linear-gradient(135deg, #2dd4ff, #3b82f6);
                border: none;
                width: 38px;
                height: 38px;
                border-radius: 50%;
                color: white;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                transition: transform 0.2s, box-shadow 0.2s;
                box-shadow: 0 2px 8px rgba(59,130,246,0.35);
            }
            .chatbot-submit-btn:hover { transform: scale(1.08); box-shadow: 0 4px 12px rgba(59,130,246,0.5); }
            .chatbot-submit-btn:active { transform: scale(0.95); }

            /* ── Preview bar ── */
            #chatbot-preview-bar {
                display: none;
                padding: 6px 14px;
                background: #f0f8ff;
                border-top: 1px solid #dde;
                font-size: 12px;
                align-items: center;
                gap: 8px;
            }
            #chatbot-preview-bar.visible { display: flex; }
            #chatbot-preview-img {
                height: 40px; width: 40px;
                object-fit: cover;
                border-radius: 6px;
                border: 1px solid #ccc;
                display: none;
            }
            #chatbot-preview-icon { font-size: 22px; display: none; }
            #chatbot-preview-name {
                flex: 1; color: #555;
                overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
                font-size: 11px;
            }
            #chatbot-preview-remove {
                background: none; border: none; cursor: pointer;
                color: #e55; font-size: 16px; line-height: 1; flex-shrink: 0;
            }

            /* ── Drop overlay ── */
            #chatbot-drop-overlay {
                position: absolute;
                inset: 0;
                background: rgba(45,212,255,0.15);
                border: 2.5px dashed #2dd4ff;
                border-radius: 20px;
                display: none;
                align-items: center;
                justify-content: center;
                z-index: 20000;
                font-size: 15px;
                font-weight: 600;
                color: #1a6fa8;
                pointer-events: none;
            }
            #chatbot-drop-overlay.visible { display: flex; }

            /* ── Auto-grow textarea ── */
            #chatbot-input[id], textarea#chatbot-input {
                overflow-y: hidden;
                resize: none;
                min-height: 36px;
                max-height: 120px;
                line-height: 1.45;
            }

            /* ── Misc ── */
            .image-attachment {
                max-width: 100%; border-radius: 8px; margin-top: 6px; display: block;
            }

            /* ── Dark mode ── */
            body.dark-mode .chatbot-media-btn { color: #2dd4ff; }
            body.dark-mode .chatbot-media-btn:hover { background: rgba(45,212,255,0.1); }
            body.dark-mode #chatbot-preview-bar { background: #0d1826 !important; border-color: rgba(255,255,255,0.1) !important; }
            body.dark-mode #chatbot-preview-name { color: #aaa !important; }
            body.dark-mode .chatbot-submit-btn { background: linear-gradient(135deg, #1e3a5f, #2dd4ff); }
            body.dark-mode #chatbot-drop-overlay { background: rgba(45,212,255,0.08); color: #7ee8ff; }
        `;
        document.head.appendChild(style);
    }


    // =================================================================
    // 6. LOGIN OVERLAY
    // =================================================================
    function updateLoginOverlay() {
        const isAr = document.documentElement.getAttribute('dir') === 'rtl';
        loginOverlay.innerHTML = `
            <div class="chatbot-login-content">
                <p>${isAr ? "🔒 تسجيل الدخول مطلوب" : "🔒 Login Required"}</p>
                <span>${isAr ? "يرجى تسجيل الدخول لاستخدام المساعد." : "Please sign in to use the assistant."}</span>
                <a href="${LOGIN_PAGE}" class="chatbot-login-btn">${isAr ? "تسجيل الدخول" : "Sign In"}</a>
            </div>
        `;
    }

    // =================================================================
    // 7. AUTH CHECK
    // =================================================================
    async function checkAuth() {
        updateLoginOverlay();
        try {
            const response = await fetch(AUTH_ENDPOINT);
            const data = await response.json();

            if (data.isLoggedIn) {
                USER_CONFIG.isLoggedIn = true;
                USER_CONFIG.userEmail = data.email;
                USER_CONFIG.isPremium = (data.accountType || '').toLowerCase() === 'premium';

                chatHistory = loadChatHistory();
                renderChatHistory();

                // Fetch today's message count + user name from DB
                try {
                    const countRes = await fetch(COUNT_API + '?action=get_count');
                    const countData = await countRes.json();
                    messageCount = countData.count || 0;
                    USER_CONFIG.firstName = countData.first_name || '';
                } catch(e) {
                    messageCount = 0;
                    USER_CONFIG.firstName = '';
                }

                loginOverlay.style.display = 'none';
                updateUIStatus();

                // ── Welcome message (only if chat is empty / first open) ──
                showWelcomeIfEmpty();
            } else {
                USER_CONFIG.isLoggedIn = false;
                loginOverlay.style.display = 'flex';
                if (inputField) getInput().disabled = true;
            }
        } catch (error) {
            console.error("Auth Check Failed:", error);
            USER_CONFIG.isLoggedIn = false;
            loginOverlay.style.display = 'flex';
            if (inputField) getInput().disabled = true;
        }
    }

    checkAuth();

    // Live-update UI text when page language (dir attr) changes
    const _dirObserver = new MutationObserver(() => updateUIStatus());
    _dirObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['dir', 'lang'] });

    // =================================================================
    // 8. EVENT LISTENERS
    // =================================================================
    if (bubble) {
        bubble.addEventListener('click', () => {
            windowEl.classList.toggle('active');
            if (windowEl.classList.contains('active')) {
                checkAuth();
                scrollToBottom();
            }
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => windowEl.classList.remove('active'));
    }

    if (sendBtn) sendBtn.addEventListener('click', handleUserMessage);
    if (inputField) {
        inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleUserMessage();
        });
    }

    // =================================================================
    // 8b. WELCOME MESSAGE
    // =================================================================
    function showWelcomeIfEmpty() {
        // Only show if no real conversation exists yet (only system prompt in history)
        const hasConversation = chatHistory.some(m => m.role === 'user' || m.role === 'assistant');
        if (hasConversation) return;

        const isAr = document.documentElement.getAttribute('dir') === 'rtl';
        const name = USER_CONFIG.firstName || '';

        let msg;
        if (isAr) {
            msg = name
                ? `أهلاً **${name}**! 👋 أنا مساعدك الذكي في AquaMind.\nاسألني أي حاجة عن توفير المياه أو المنصة وأنا هساعدك 💧`
                : `أهلاً! 👋 أنا مساعدك الذكي في AquaMind.\nاسألني أي حاجة عن توفير المياه أو المنصة وأنا هساعدك 💧`;
        } else {
            msg = name
                ? `Hey **${name}**! 👋 I'm your AquaMind assistant.\nAsk me anything about water-saving or the platform 💧`
                : `Hey! 👋 I'm your AquaMind assistant.\nAsk me anything about water-saving or the platform 💧`;
        }

        appendMessage('bot', msg);
    }

    // =================================================================
    // 9. UI STATUS
    // =================================================================
    function updateUIStatus() {
        if (!USER_CONFIG.isLoggedIn) return;
        const isAr = document.documentElement.getAttribute('dir') === 'rtl';

        if (USER_CONFIG.isPremium) {
            if (headerSubtitle) headerSubtitle.textContent = isAr ? "متصل | باقة بريميوم 👑" : "Online | Premium Plan 👑";
            if (inputField) getInput().disabled = false;
        } else {
            const remaining = USER_CONFIG.messageLimit - messageCount;
            if (remaining <= 0) {
                if (headerSubtitle) headerSubtitle.textContent = isAr ? "انتهى الرصيد | قم بالترقية" : "Limit Reached | Upgrade";
                if (inputField) {
                    getInput().disabled = true;
                    getInput().placeholder = isAr ? "وصلت للحد اليومي." : "Daily limit reached.";
                }
                showUpgradePrompt();
            } else {
                if (headerSubtitle) headerSubtitle.textContent = isAr ? `متبقي ${remaining} رسائل` : `${remaining} messages left`;
                if (inputField) getInput().disabled = false;
            }
        }
    }

    function showUpgradePrompt() {
        if (document.querySelector('.upgrade-container')) return;
        const isAr = document.documentElement.getAttribute('dir') === 'rtl';
        const userEmail = USER_CONFIG.userEmail || "N/A";

        let whatsappMessage = `Hello! I'm interested in upgrading to Premium.\n\nEmail: ${userEmail}\n\nPlease let me know how to proceed.`;
        if (isAr) {
            whatsappMessage = `مرحباً! أنا مهتم بالاشتراك في باقة البريميوم (Premium).\n\nالبريد الإلكتروني: ${userEmail}\n\nيرجى إخباري بكيفية إتمام الاشتراك.`;
        }
        const whatsappUrl = `https://wa.me/+201152292951?text=${encodeURIComponent(whatsappMessage)}`;

        const upgradeDiv = document.createElement('div');
        upgradeDiv.className = 'message bot upgrade-container';
        upgradeDiv.innerHTML = `
            <div class="upgrade-content">
                <p><b>${isAr ? "🚀 استنفدت رسائلك المجانية" : "🚀 Message Limit Reached"}</b></p>
                <p>${isAr ? "للاستمرار في الدردشة بدون حدود، يرجى الترقية إلى الحساب الممتاز (Premium)." : "To continue chatting without limits, please upgrade to a Premium account."}</p>
                <div class="upgrade-actions">
                    <a href="${whatsappUrl}" class="upgrade-btn whatsapp" target="_blank">
                        <i class="fab fa-whatsapp"></i> ${isAr ? "تواصل عبر واتساب" : "Contact via WhatsApp"}
                    </a>
                </div>
            </div>
        `;
        messagesContainer.appendChild(upgradeDiv);
        scrollToBottom();
    }

    // =================================================================
    // 10. HANDLE USER MESSAGE (supports text + image)
    // =================================================================
    async function handleUserMessage() {
        if (!USER_CONFIG.isLoggedIn || (inputField && inputField.disabled)) return;

        const isAr = document.documentElement.getAttribute('dir') === 'rtl';

        if (!USER_CONFIG.isPremium && messageCount >= USER_CONFIG.messageLimit) {
            showUpgradePrompt();
            return;
        }

        const userText = inputField ? getInput().value.trim() : '';
        const hasImage = !!pendingImage;

        if (!userText && !hasImage) return;

        // Show user message in UI
        const displayText = userText || (isAr ? '📷 صورة' : '📷 Image');
        appendMessage('user', displayText, (hasImage && pendingImage) ? pendingImage.previewUrl : null);
        if (inputField) getInput().value = ''; getInput().style.height='auto';

        // Build message content for API (multimodal — image + text)
        let messageContent;

        if (hasImage) {
            messageContent = [];
            if (userText) messageContent.push({ type: "text", text: userText });
            messageContent.push({
                type: "image_url",
                image_url: { url: `data:${pendingImage.mimeType};base64,${pendingImage.base64}` }
            });
        } else {
            messageContent = userText;
        }

        const userMsg = { role: "user", content: messageContent };
        if (hasImage && pendingImage) {
            // Store a small thumbnail (resize to 320px max) for localStorage persistence
            userMsg._imagePreview = pendingImage.previewUrl;
            resizeImageForStorage(pendingImage.previewUrl, 320).then(thumb => {
                userMsg._imagePreview = thumb;
            });
        }
        chatHistory.push(userMsg);

        // Clear pending media
        clearPendingMedia();

        if (!USER_CONFIG.isPremium) {
            messageCount++;
            // Persist increment to DB (fire-and-forget)
            fetch(COUNT_API + '?action=increment', { method: 'POST' }).catch(() => {});
        }
        saveState();
        updateUIStatus();

        const loadingId = appendLoading();

        try {
            const result = await callOpenRouterAPI();
            removeLoading(loadingId);
            appendMessage('bot', result.content);
            // Preserve reasoning_details for multi-turn continuity
            const assistantMsg = { role: "assistant", content: result.content };
            if (result.reasoning_details) {
                assistantMsg.reasoning_details = result.reasoning_details;
            }
            chatHistory.push(assistantMsg);
            saveState();
        } catch (error) {
            removeLoading(loadingId);
            console.error("OpenRouter API Error:", error);
            appendMessage('bot', isAr ? "عذراً، حدث خطأ. حاول تاني." : "Sorry, an error occurred. Please try again.");
        }
    }

    async function callOpenRouterAPI() {
        // Strip custom fields (_imagePreview) — Groq rejects unknown properties
        const cleanMessages = chatHistory.map(({ _imagePreview, reasoning_details, ...msg }) => msg);

        const payload = {
            model: MODEL_NAME,
            messages: cleanMessages,
            max_tokens: 4096
        };

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`,

            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("OpenRouter API Error Response:", errorData);
            throw new Error(`API Error: ${response.status} — ${errorData?.error?.message || 'Unknown'}`);
        }

        const data = await response.json();
        const message = data.choices?.[0]?.message;
        if (!message) throw new Error("No message in response");

        return {
            content: message.content || "",
            reasoning_details: null
        };
    }

    // =================================================================
    // 12. UI HELPERS
    // =================================================================

    // Resize image to maxPx for compact localStorage storage
    function resizeImageForStorage(dataUrl, maxPx = 320) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                const scale = Math.min(1, maxPx / Math.max(img.width, img.height));
                const w = Math.round(img.width  * scale);
                const h = Math.round(img.height * scale);
                const canvas = document.createElement('canvas');
                canvas.width  = w;
                canvas.height = h;
                canvas.getContext('2d').drawImage(img, 0, 0, w, h);
                resolve(canvas.toDataURL('image/jpeg', 0.7));
            };
            img.onerror = () => resolve(dataUrl); // fallback: original
            img.src = dataUrl;
        });
    }

    function appendMessage(sender, text, imagePreview = null) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', sender);

        const arabicPattern = /[\u0600-\u06FF]/;
        if (arabicPattern.test(text)) {
            msgDiv.classList.add('arabic');
            msgDiv.style.direction = 'rtl';
            msgDiv.style.textAlign = 'right';
        } else {
            msgDiv.style.direction = 'ltr';
            msgDiv.style.textAlign = 'left';
        }

        // Render markdown properly
        const rendered = text
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') // escape HTML first
            .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')              // **bold** → <b>
            .replace(/(?:^|\n)\* (.+)/g, (_, item) => '\n• ' + item) // * bullet → •
            .replace(/(?<![\*•])\*([^\*\n]+?)\*(?![\*])/g, '<b>$1</b>') // *inline bold* → <b>
            .replace(/\n/g, '<br>');                                // newlines → <br>
        msgDiv.innerHTML = rendered;

        // Show image preview inside bubble (for user sent images)
        if (imagePreview) {
            const img = document.createElement('img');
            img.src = imagePreview;
            img.className = 'image-attachment';
            img.style.cssText = 'max-width:100%;border-radius:8px;margin-top:6px;display:block;';
            msgDiv.appendChild(img);
        }

        messagesContainer.appendChild(msgDiv);
        scrollToBottom();
    }

    function appendLoading() {
        const id = 'loading-' + Date.now();
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message bot loading';
        msgDiv.id = id;
        msgDiv.textContent = "...";
        messagesContainer.appendChild(msgDiv);
        scrollToBottom();
        return id;
    }

    function removeLoading(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    }

    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

})();
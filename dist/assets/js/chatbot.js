/**
 * AquaMind Chatbot Logic
 * Integrates with Google Gemini API (Vanilla JS)
 */

(function() {
    // =================================================================
    // 1. CONFIGURATION & API SETUP
    // =================================================================
    
    // 🔑 API Key (As provided)
    const API_KEY = "AIzaSyA5AvBzTmQx1b0NP4x5vsDx4-WXR-x3S-c";
    
    // 🤖 Gemini Model

    const MODEL_NAME = "gemini-3-flash-preview";
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;

    // 📝 KNOWLEDGE BASE / CONTEXT (Rich Text)
    // -----------------------------------------------------------------
    // PASTE YOUR WEBSITE INFO BELOW inside the backticks (` `).
    // This is the "brain" of your chatbot.
    // -----------------------------------------------------------------
    const AQUAMIND_CONTEXT = `
You are the intelligent assistant for AquaMind, a platform dedicated to water conservation and sustainability.

**ABOUT AQUAMIND:**
AquaMind delivers an interactive experience through a gamified learning journey and a virtual smart house.
We help users understand how daily actions affect water consumption.
Our mission is to build awareness, encourage responsible behavior, and promote sustainable water use.

**KEY FEATURES:**
1. **AquaGuard:** A game-based experience teaching water conservation through challenges.
2. **Interactive House:** A virtual home simulation to explore daily water usage.
3. **Stories & Charts:** Visual insights and real stories about water impact.
4. **MarketPlace:** Eco-friendly products to reduce water consumption.

**YOUR ROLE:**
- Act as a friendly, helpful, and knowledgeable guide.
- ONLY answer questions based on the context of AquaMind and water conservation.
- If asked about unrelated topics (like sports, politics, or coding), politely steer the conversation back to water saving or AquaMind features.
- Keep answers concise (under 3-4 sentences) unless asked for details.
- Use emojis occasionally to be engaging (💧, 🌍, 🌱).

**TONE:**
- Professional yet approachable.
- Encouraging and educational.

**FORMATTING & RICH TEXT:**
1. What is NileEvo?
NileEvo is a social enterprise based in Cairo, Egypt, focused on solving the problem of water overconsumption using digital technology and education. The company believes that Egypt’s water crisis is not only a technical problem, but mainly a behavioral one. Many people waste water without realizing the impact of their daily habits. NileEvo works to change this behavior by creating digital tools that educate users, especially children and families, and help them adopt responsible water usage habits.
NileEvo’s mission is to transform the culture of water consumption from careless use to smart and responsible management. The company targets households, students, and schools by providing interactive and engaging digital solutions that turn learning into action.
2. What is AquaMind?
AquaMind is NileEvo’s main digital platform. It is a web-based system that combines education, gaming, and real-life simulations to teach water-saving behavior. AquaMind is designed to make water awareness easy, fun, and practical.
The platform includes:
An educational game called AquaGuard
Interactive charts about water risks
Educational stories
An interactive house simulation
A reward and leaderboard system
A chatbot (this assistant)
A digital marketplace
AquaMind does not only provide information. It helps users understand how their daily choices affect water consumption and encourages them to make better decisions.
3. What is AquaGuard?
AquaGuard is an educational game inside the AquaMind platform. It is based on storytelling and decision-making. Players face real-life water usage situations such as washing dishes, showering, watering plants, or fixing leaks. In each situation, the player must choose between different actions.
Each decision leads to different consequences:
Responsible choices save water and earn rewards
Wasteful choices cause problems in the story and reduce points
The game teaches that every small action matters. It builds responsibility by showing cause-and-effect relationships between actions and water resources.
AquaGuard is designed mainly for:
Children aged 8–14
Families
Schools
It can be used individually at home or as part of classroom activities.
4. What problem does NileEvo solve?
Egypt faces serious water scarcity challenges due to population growth, climate change, and limited water resources. Many people are not aware of how much water they waste daily. Even when people know about water problems, they often do not change their habits.
The main problems NileEvo addresses are:
Low awareness of water risks
Boring traditional awareness methods
Lack of tools that connect learning to real behavior
Weak engagement of children in environmental education
No system that tracks or motivates water-saving actions
NileEvo solves these problems by:
Using games instead of lectures
Using stories instead of long texts
Using rewards instead of punishment
Using simulations instead of abstract advice
5. Who are NileEvo’s users?
NileEvo targets three main user groups:
1. Children (8–14 years)
They love games and interactive content. AquaGuard teaches them water-saving habits in a fun way without feeling like school.
2. Parents and households
They want to reduce water bills and protect future water resources. AquaMind gives them practical tips, charts, and simulations that show how their actions affect consumption.
3. Teachers and schools
They need educational tools about the environment. AquaMind provides structured content, classroom-friendly games, and dashboards for tracking student progress.
6. How does AquaMind teach responsibility?
AquaMind uses behavioral psychology principles:
Storytelling: People remember stories more than facts
Gamification: Points, levels, and rewards motivate action
Simulation: Users see the result of their choices
Repetition: Habits are built through daily use
Social comparison: Leaderboards create motivation
Instead of saying “Save water”, AquaMind shows:
What happens if you waste water
What happens if you save water
How your behavior affects your family and community
7. What is the Interactive House?
The Interactive House is a digital model of a normal home. Users can click on rooms like:
Kitchen
Bathroom
Garden
Laundry
Each room contains activities related to water usage. For example:
Shower time
Washing dishes
Fixing leaks
Watering plants
Users choose actions and see:
Water consumed
Money spent
Environmental impact
This connects game learning with real household behavior.
8. What is the Rewards & Leaderboard System?
Users earn points by:
Completing game levels
Making responsible choices
Finishing educational tasks
Participating in challenges
Points can be used for:
Unlocking new game levels
Customizing characters
Getting discounts from marketplace partners
Competing with friends
Leaderboards show:
Top savers
Most active players
Best schools
This builds motivation and long-term engagement.
9. What is the Marketplace?
The marketplace is a digital shop inside AquaMind. It offers eco-friendly and water-saving products such as:
Low-flow shower heads
Water-saving taps
Reusable bottles
Educational kits
NileEvo earns revenue by taking a small commission from sales.
This system connects: Education → Action → Real tools
10. What is the chatbot’s role?
The chatbot is the user’s assistant inside AquaMind. It helps by:
Answering questions
Explaining water risks
Guiding users inside the game
Teaching saving tips
Supporting parents and teachers
Explaining subscriptions
Explaining rewards
Explaining school programs
The chatbot should:
Speak clearly
Be friendly
Encourage responsibility
Promote smart choices
Never shame users
Always educate
11. Example chatbot tone
The chatbot should sound:
Helpful
Friendly
Educational
Non-judgmental
Motivating
Example: “I’m here to help you save water in smart and fun ways 🌊
Would you like tips for your home or help inside the game?”
12. Core values of NileEvo
Responsibility
Education
Sustainability
Innovation
Community
Youth empowerment
The chatbot must always reflect these values.
13. Why NileEvo is different
Unlike other water apps that only:
Track data
Show numbers
NileEvo:
Teaches behavior
Uses stories
Focuses on Egypt
Targets children
Works without smart meters
Connects learning with action
14. What is NileEvo’s mission?
To raise awareness about water scarcity in Egypt and encourage responsible water usage through digital education, gamification, and behavioral change tools.
15. What is NileEvo’s vision?
A future where every Egyptian household understands the value of water and uses it wisely.
`;

    // =================================================================
    // 2. STATE MANAGEMENT & USER ROLES
    // =================================================================
    
    // User Configuration
    const USER_CONFIG = {
        isPremium: false, // Default to Standard User
        messageLimit: 6,  // Limit for Standard Users
        storageKey: 'aquamind_chat_history',
        roleKey: 'aquamind_user_role',
        countKey: 'aquamind_message_count'
    };

    // Load State from LocalStorage
    let chatHistory = loadChatHistory();
    let messageCount = parseInt(localStorage.getItem(USER_CONFIG.countKey) || '0');
    let isPremium = localStorage.getItem(USER_CONFIG.roleKey) === 'premium';

    function loadChatHistory() {
        const saved = localStorage.getItem(USER_CONFIG.storageKey);
        if (saved) {
            return JSON.parse(saved);
        }
        // Default Initial State
        return [
            {
                role: "user",
                parts: [{ text: AQUAMIND_CONTEXT }]
            },
            {
                role: "model",
                parts: [{ text: "Understood. I am ready to assist AquaMind users." }]
            }
        ];
    }

    function saveState() {
        localStorage.setItem(USER_CONFIG.storageKey, JSON.stringify(chatHistory));
        localStorage.setItem(USER_CONFIG.countKey, messageCount.toString());
    }

    // =================================================================
    // 3. DOM ELEMENTS SELECTION
    // =================================================================
    const bubble = document.getElementById('chatbot-bubble');
    const windowEl = document.getElementById('chatbot-window');
    const closeBtn = document.getElementById('chatbot-close');
    const messagesContainer = document.getElementById('chatbot-messages');
    const inputField = document.getElementById('chatbot-input');
    const sendBtn = document.getElementById('chatbot-send-btn');
    const headerSubtitle = document.querySelector('.chatbot-subtitle');
    const headerTitle = document.querySelector('.chatbot-title');

    // Add Role Toggle Button (For Demo Purposes)
    const headerInfo = document.querySelector('.chatbot-header-info');
    const roleToggleBtn = document.createElement('button');
    roleToggleBtn.style.cssText = "margin-left: 10px; font-size: 10px; padding: 2px 5px; border: 1px solid white; background: transparent; color: white; border-radius: 4px; cursor: pointer;";
    roleToggleBtn.textContent = isPremium ? "👑 Premium" : "👤 Standard";
    headerInfo.appendChild(roleToggleBtn);

    // Update UI based on role and language
    updateUIStatus();

    // =================================================================
    // 4. EVENT LISTENERS
    // =================================================================
    
    // Listen for language changes from main script
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === "attributes" && mutation.attributeName === "dir") {
                updateUIStatus();
            }
        });
    });
    observer.observe(document.documentElement, { attributes: true });

    // Toggle Role (Demo Feature)
    roleToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        isPremium = !isPremium;
        localStorage.setItem(USER_CONFIG.roleKey, isPremium ? 'premium' : 'standard');
        roleToggleBtn.textContent = isPremium ? "👑 Premium" : "👤 Standard";
        updateUIStatus();
        const isAr = document.documentElement.getAttribute('dir') === 'rtl';
        const msg = isAr 
            ? `تم تغيير العضوية إلى: ${isPremium ? 'بريميوم (غير محدود)' : 'عادية (محدودة)'}`
            : `User role switched to: ${isPremium ? 'Premium (Unlimited)' : 'Standard (Limited)'}`;
        alert(msg);
    });

    // Toggle Chat Window
    if (bubble) {
        bubble.addEventListener('click', () => {
            windowEl.classList.add('active');
            setTimeout(() => inputField.focus(), 300);
            // Scroll to bottom on open
            scrollToBottom();
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            windowEl.classList.remove('active');
        });
    }

    if (sendBtn) {
        sendBtn.addEventListener('click', handleUserMessage);
    }

    if (inputField) {
        inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleUserMessage();
            }
        });
    }

    // Load existing messages into UI on startup
    // Skip the first 2 system messages (Context + Confirmation)
    if (chatHistory.length > 2) {
        chatHistory.slice(2).forEach(msg => {
            const sender = msg.role === 'user' ? 'user' : 'bot';
            appendMessage(sender, msg.parts[0].text, false); // false = don't save again
        });
    }

    // =================================================================
    // 5. CORE FUNCTIONS
    // =================================================================

    function updateUIStatus() {
        const isAr = document.documentElement.getAttribute('dir') === 'rtl';
        
        // Update static text
        if (headerTitle) headerTitle.textContent = isAr ? "مساعد أكوا مايند" : "AquaMind Assistant";
        
        if (isPremium) {
            headerSubtitle.textContent = isAr ? "متصل | باقة بريميوم 👑" : "Online | Premium Plan 👑";
            inputField.disabled = false;
            inputField.placeholder = isAr ? "اكتب سؤالك هنا..." : "Type your question...";
        } else {
            const remaining = USER_CONFIG.messageLimit - messageCount;
            if (remaining <= 0) {
                headerSubtitle.textContent = isAr ? "انتهى الرصيد | قم بالترقية" : "Limit Reached | Upgrade to Chat";
                inputField.disabled = true;
                inputField.placeholder = isAr ? "وصلت للحد اليومي." : "Daily limit reached.";
            } else {
                headerSubtitle.textContent = isAr 
                    ? `متصل | متبقي ${remaining} رسائل` 
                    : `Online | ${remaining} messages left`;
                inputField.disabled = false;
                inputField.placeholder = isAr ? "اكتب سؤالك هنا..." : "Type your question...";
            }
        }
    }

    async function handleUserMessage() {
        const isAr = document.documentElement.getAttribute('dir') === 'rtl';

        // Check Limits
        if (!isPremium && messageCount >= USER_CONFIG.messageLimit) {
            alert(isAr 
                ? "لقد وصلت للحد اليومي للرسائل. يرجى الترقية للنسخة البريميوم." 
                : "You have reached your daily message limit. Please upgrade to Premium for unlimited access.");
            return;
        }

        const userText = inputField.value.trim();
        if (!userText) return;

        // 1. Display User Message
        appendMessage('user', userText);
        inputField.value = '';

        // 2. Add to History
        chatHistory.push({
            role: "user",
            parts: [{ text: userText }]
        });
        
        // Increment count for standard users
        if (!isPremium) {
            messageCount++;
        }
        saveState();
        updateUIStatus();

        // 3. Show Loading Indicator
        const loadingId = appendLoading();

        try {
            // 4. Call Gemini API
            const responseText = await callGeminiAPI();
            
            // 5. Remove Loading & Display Bot Message
            removeLoading(loadingId);
            appendMessage('bot', responseText);

            // 6. Add Bot Response to History
            chatHistory.push({
                role: "model",
                parts: [{ text: responseText }]
            });
            saveState();

        } catch (error) {
            console.error("Chatbot Error Details:", error);
            
            chatHistory.pop(); // Remove failed user message
            if (!isPremium) messageCount--; // Revert count on failure
            saveState();
            updateUIStatus();

            removeLoading(loadingId);
            
            let errorMessage = isAr 
                ? "عذراً، أواجه مشكلة في الاتصال حالياً. 💧 يرجى المحاولة لاحقاً."
                : "Sorry, I'm having trouble connecting to the water grid right now. 💧 Please try again later.";
            
            if (error.message.includes("400")) {
                errorMessage = isAr 
                    ? "لم أفهم ذلك جيداً. هل يمكنك إعادة الصياغة؟ (خطأ 400)"
                    : "I'm a bit confused. Could you rephrase that? (400 Error)";
            } else if (error.message.includes("403") || error.message.includes("Key")) {
                errorMessage = isAr
                    ? "مفتاح API غير صالح أو مقيد. (خطأ 403)"
                    : "My API Key seems to be invalid or restricted. Please check the configuration. (403 Error)";
            } else if (error.message.includes("404")) {
                errorMessage = isAr
                    ? "لم أتمكن من العثور على نموذج الذكاء الاصطناعي. (خطأ 404)"
                    : "I couldn't find the AI model. Please check the MODEL_NAME in chatbot.js. (404 Error)";
            }

            appendMessage('bot', errorMessage);
        }
    }

    async function callGeminiAPI() {
        const payload = {
            contents: chatHistory
        };

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("Gemini API Raw Error:", errorData);
            throw new Error(`API Error: ${response.status} - ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();
        
        // Extract text from Gemini response structure
        const botText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        return botText || "I didn't catch that. Could you rephrase?";
    }

    // =================================================================
    // 6. UI HELPER FUNCTIONS
    // =================================================================

    function appendMessage(sender, text, shouldScroll = true) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', sender);
        
        const formattedText = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
        msgDiv.innerHTML = formattedText;

        messagesContainer.appendChild(msgDiv);
        if (shouldScroll) scrollToBottom();
    }

    function appendLoading() {
        const isAr = document.documentElement.getAttribute('dir') === 'rtl';
        const id = 'loading-' + Date.now();
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', 'bot', 'loading');
        msgDiv.id = id;
        msgDiv.textContent = isAr ? "جاري التفكير..." : "Thinking...";
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
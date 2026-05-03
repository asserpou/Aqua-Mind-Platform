/**
 * AquaMind - Local Proxy Server
 * ▶️  التشغيل: node proxy.js
 */

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// ✅ السماح لـ Live Server بالاتصال
app.use(cors({
    origin: '*', // أو 'http://127.0.0.1:5500' لو عايز تكون أدق
}));

app.use(express.json());

// ==============================================
// 🔑 API Keys - آمنة هنا لأنها على الـ Backend
// ==============================================
const GEMINI_API_KEY = "AIzaSyDnN7vOA5lKz9cvqpXaXgqgpwJWAsQZpxk";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// ==============================================
// POST /chat  ← endpoint بيتصل بيه chatbot.js
// ==============================================
app.post('/chat', async (req, res) => {
    const { message, history, systemPrompt } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    // بناء الـ Gemini history
    const geminiHistory = [
        { role: "user", parts: [{ text: systemPrompt || "You are a helpful assistant." }] },
        { role: "model", parts: [{ text: "Understood. Ready to help." }] }
    ];

    // إضافة التاريخ القديم
    if (history && Array.isArray(history)) {
        history.forEach(msg => {
            geminiHistory.push({
                role: msg.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: msg.content }]
            });
        });
    }

    // إضافة الرسالة الجديدة
    geminiHistory.push({ role: "user", parts: [{ text: message }] });

    try {
        const response = await fetch(GEMINI_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: geminiHistory })
        });

        if (!response.ok) {
            const errData = await response.json();
            console.error("Gemini Error:", errData);
            return res.status(response.status).json({ error: errData });
        }

        const data = await response.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

        res.json({ reply });

    } catch (err) {
        console.error("Proxy Error:", err.message);
        res.status(500).json({ error: 'Internal proxy error', details: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`✅ AquaMind Proxy running at http://localhost:${PORT}`);
    console.log(`   الآن افتح الـ chatbot.js وغيّر USE_PROXY = true`);
});
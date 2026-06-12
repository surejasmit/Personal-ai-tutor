const express = require('express');
const router = express.Router();
const { GoogleGenAI } = require('@google/genai');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = 'gemini-2.0-flash';

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `You are an expert AI tutor for students. Your name is "AI Tutor".

Your capabilities:
- Create detailed learning roadmaps for any subject or technology
- Explain complex concepts in simple, student-friendly language
- Provide study plans, revision strategies, and exam preparation tips
- Answer questions about programming, computer science, mathematics, science, and more
- Generate practice problems and quizzes
- Give career guidance and learning path recommendations
- Help debug code and explain programming concepts

Formatting rules:
- Use markdown formatting for better readability
- Use bullet points and numbered lists for step-by-step content
- Use code blocks with language tags for code examples
- Use bold and italic for emphasis
- Keep responses well-structured with headings when appropriate
- Be encouraging and supportive in tone

Always be accurate, helpful, and encouraging. If you don't know something, say so honestly rather than making things up.`;

// POST /api/chatbot/message — streaming chat completion
router.post('/message', async (req, res) => {
    try {
        const { messages } = req.body;

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return res.status(400).json({ error: 'messages array is required' });
        }

        if (!GEMINI_API_KEY) {
            return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server' });
        }

        // Convert chat messages to Gemini API format
        const contents = messages.map(msg => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }]
        }));

        // Set SSE headers for streaming
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('X-Accel-Buffering', 'no');
        res.flushHeaders();

        // Call Gemini streaming API using the official @google/genai SDK
        let responseStream;
        let retries = 3;
        let delay = 1000; // Start with 1s delay

        for (let i = 0; i < retries; i++) {
            try {
                responseStream = await ai.models.generateContentStream({
                    model: GEMINI_MODEL,
                    contents: contents,
                    config: {
                        systemInstruction: SYSTEM_INSTRUCTION,
                        temperature: 0.7,
                        topP: 0.95,
                        maxOutputTokens: 8192,
                    }
                });
                break;
            } catch (err) {
                const status = err.status || err.code || 500;
                if (status === 429 && i < retries - 1) {
                    console.warn(`Gemini API returned 429. Retrying in ${delay}ms... (Attempt ${i + 1}/${retries})`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                    delay *= 2; // Exponential backoff
                } else {
                    console.error('Gemini API error:', status, err.message);
                    const errorMessage = `Gemini API error: ${status}`;
                    res.write(`data: ${JSON.stringify({ error: errorMessage })}\n\n`);
                    res.write('data: [DONE]\n\n');
                    return res.end();
                }
            }
        }

        // Stream the response back to the client
        for await (const chunk of responseStream) {
            const text = chunk.text;
            if (text) {
                res.write(`data: ${JSON.stringify({ text })}\n\n`);
            }
        }

        res.write('data: [DONE]\n\n');
        res.end();

    } catch (error) {
        console.error('Chatbot error:', error);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.write(`data: ${JSON.stringify({ error: 'Stream interrupted' })}\n\n`);
            res.write('data: [DONE]\n\n');
            res.end();
        }
    }
});

module.exports = router;

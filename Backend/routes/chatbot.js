const express = require('express');
const router = express.Router();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = 'gemini-2.0-flash';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:streamGenerateContent?alt=sse&key=${GEMINI_API_KEY}`;

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

        const geminiPayload = {
            system_instruction: {
                parts: [{ text: SYSTEM_INSTRUCTION }]
            },
            contents,
            generationConfig: {
                temperature: 0.7,
                topP: 0.95,
                maxOutputTokens: 8192,
            }
        };

        // Set SSE headers for streaming
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('X-Accel-Buffering', 'no');
        res.flushHeaders();

        // Call Gemini streaming API
        const response = await fetch(GEMINI_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(geminiPayload),
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error('Gemini API error:', response.status, errorBody);
            res.write(`data: ${JSON.stringify({ error: `Gemini API error: ${response.status}` })}\n\n`);
            res.write('data: [DONE]\n\n');
            return res.end();
        }

        // Stream the response body
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });

            // Process complete SSE lines
            const lines = buffer.split('\n');
            buffer = lines.pop(); // Keep the last incomplete line

            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const data = line.slice(6).trim();
                    if (data === '[DONE]') {
                        res.write('data: [DONE]\n\n');
                        continue;
                    }
                    try {
                        const parsed = JSON.parse(data);
                        const text = parsed?.candidates?.[0]?.content?.parts?.[0]?.text;
                        if (text) {
                            res.write(`data: ${JSON.stringify({ text })}\n\n`);
                        }
                    } catch {
                        // Skip unparseable chunks
                    }
                }
            }
        }

        // Process any remaining buffer
        if (buffer.startsWith('data: ')) {
            const data = buffer.slice(6).trim();
            if (data && data !== '[DONE]') {
                try {
                    const parsed = JSON.parse(data);
                    const text = parsed?.candidates?.[0]?.content?.parts?.[0]?.text;
                    if (text) {
                        res.write(`data: ${JSON.stringify({ text })}\n\n`);
                    }
                } catch {
                    // Skip
                }
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

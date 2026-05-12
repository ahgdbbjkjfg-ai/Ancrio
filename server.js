const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = 8000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';

function sendJson(res, statusCode, data) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
}

function callOpenAI(message) {
    return new Promise((resolve, reject) => {
        if (!OPENAI_API_KEY) {
            reject(new Error('OPENAI_API_KEY is not set in the environment.'));
            return;
        }

        const payload = JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a friendly customer support assistant for an e-commerce store. Provide short, clear, and helpful answers.' },
                { role: 'user', content: message }
            ],
            max_tokens: 350,
            temperature: 0.75,
        });

        const options = {
            hostname: 'api.openai.com',
            path: '/v1/chat/completions',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Length': Buffer.byteLength(payload),
            },
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    resolve(parsed);
                } catch (err) {
                    reject(new Error(`OpenAI response parse error: ${err.message}`));
                }
            });
        });

        req.on('error', (err) => reject(err));
        req.write(payload);
        req.end();
    });
}

const server = http.createServer((req, res) => {
    // API routes
    if (req.url === '/api/ai-chat' && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => { body += chunk; });
        req.on('end', async () => {
            try {
                const { message } = JSON.parse(body || '{}');
                if (!message || typeof message !== 'string') {
                    return sendJson(res, 400, { error: 'Invalid request. "message" is required.' });
                }

                const openAIResp = await callOpenAI(message);
                const reply = openAIResp?.choices?.[0]?.message?.content?.trim();
                if (!reply) {
                    return sendJson(res, 500, { error: 'OpenAI did not return a valid answer.' });
                }

                sendJson(res, 200, { reply });
            } catch (err) {
                console.error('AI Chat error:', err);
                sendJson(res, 500, { error: err.message || 'Unexpected error.' });
            }
        });
        return;
    }

    // Handle static files
    let filePath = req.url === '/' ? '/index.html' : req.url;
    filePath = path.join(__dirname, filePath);

    // Get file extension
    const ext = path.extname(filePath);
    let contentType = 'text/html';
    if (ext === '.js') contentType = 'application/javascript';
    if (ext === '.css') contentType = 'text/css';
    if (ext === '.json') contentType = 'application/json';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 - File Not Found</h1>');
            return;
        }

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}/`);
    if (!OPENAI_API_KEY) {
        console.warn('⚠️ OPENAI_API_KEY is not set. AI chat will not work until you set it in your environment.');
    }
});

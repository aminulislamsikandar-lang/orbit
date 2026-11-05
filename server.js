const express = require('express');
const path = require('path');
const QUIZ = require('./questions');

const app = express();
app.use(express.json({ limit: '10kb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Models are tried in this order. Set GEMINI_MODEL in Render to choose the first one.
const MODELS = [...new Set([
  process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite',
  'gemini-3.5-flash-lite',
  'gemini-3.6-flash',
  'gemini-3.8-flash'
])];
const KEY = process.env.GEMINI_API_KEY;

// id -> question. The client sends only an id, never free text,
// so nobody can use this server as a free general-purpose AI with your key.
const BY_ID = new Map();
QUIZ.sections.forEach(s => s.questions.forEach(q => BY_ID.set(q.id, q)));

const SYSTEM = `You are a friendly Class 10 Science tutor for SEBA/NCERT students.
Answer ONLY the given textbook question, at Class 10 level, in simple words.
Rules:
- For equations: give the BALANCED equation. Add state symbols (s), (l), (g), (aq) when asked or when relevant. Show a short balancing check (atoms on each side).
- For multiple-choice: state the correct option clearly, then explain why each wrong statement is wrong.
- For "why" questions: give the reason in 2-4 short sentences.
- Write chemical formulas with Unicode subscripts (H₂O, Fe₂O₃, CO₂) and use → for arrows.
- Use plain text. You may use **bold** for key words. No headings, no tables, no LaTeX.
- If the question has parts (i), (ii), (a), (b)..., answer each part separately with its label.
- Keep it concise: about 150 words for a single question, up to 300 words when there are several parts.`;

function buildPrompt(q, lang) {
  const parts = [`Question ${q.no}: ${q.text}`];
  (q.parts || []).forEach(p => parts.push(p));
  (q.options || []).forEach(o => parts.push(o));
  if (q.context) parts.push('\n(Textbook context, do not repeat it: ' + q.context + ')');
  const L = lang === 'hi'
    ? 'Reply in simple Hinglish (Hindi written in English letters), but keep chemical terms and formulas in English.'
    : 'Reply in simple English.';
  return `${L}\n\n${parts.join('\n')}`;
}

// Answer cache: same question+language is only generated once (saves free quota).
const CACHE = new Map();

// Tiny per-IP rate limit: 15 AI calls per minute.
const HITS = new Map();
function limited(ip) {
  const now = Date.now();
  const arr = (HITS.get(ip) || []).filter(t => now - t < 60000);
  arr.push(now);
  HITS.set(ip, arr);
  return arr.length > 15;
}

app.get('/api/questions', (req, res) => res.json(QUIZ));

app.post('/api/answer', async (req, res) => {
  const { id, lang, fresh } = req.body || {};
  const q = BY_ID.get(id);
  if (!q) return res.status(400).json({ error: 'Unknown question.' });
  const lg = lang === 'hi' ? 'hi' : 'en';
  const key = id + '|' + lg;

  if (!fresh && CACHE.has(key)) return res.json({ answer: CACHE.get(key), cached: true });
  if (!KEY) return res.status(500).json({ error: 'Server mein GEMINI_API_KEY set nahi hai.' });
  if (limited(req.ip)) return res.status(429).json({ error: 'Thoda ruko, bahut zyada requests. 1 minute baad try karo.' });

  const t0 = Date.now();
  const prompt = buildPrompt(q, lg);
  const DEADLINE = t0 + 55000;           // browser gives up at 75s, so stay under that
  let lastStatus = 0;

  // Try each model in order. If Google says "busy" (503/429/500) or is slow, wait a second and move on.
  for (const model of MODELS) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      const left = DEADLINE - Date.now();
      if (left < 4000) break;
      try {
        const r = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-goog-api-key': KEY },
            signal: AbortSignal.timeout(Math.min(20000, left)),
            body: JSON.stringify({
              systemInstruction: { parts: [{ text: SYSTEM }] },
              contents: [{ role: 'user', parts: [{ text: prompt }] }],
              generationConfig: { temperature: 0.3, maxOutputTokens: 4096 }
            })
          }
        );
        const j = await r.json().catch(() => ({}));
        if (r.ok) {
          const text = ((j.candidates || [])[0]?.content?.parts || []).map(p => p.text || '').join('').trim();
          if (text) {
            console.log('Answer ok', id, model, (Date.now() - t0) + 'ms');
            CACHE.set(key, text);
            return res.json({ answer: text });
          }
          console.error('Gemini empty answer', model);
          break;                           // try next model
        }
        lastStatus = r.status;
        console.error('Gemini error', r.status, model, JSON.stringify(j).slice(0, 300));
        if (r.status === 503 || r.status === 429 || r.status === 500) {
          if (attempt === 1) { await new Promise(ok => setTimeout(ok, 1200)); continue; }
        }
        break;                             // 400/403/404 etc: this model won't work, next model
      } catch (e) {
        console.error('Gemini request failed', model, (Date.now() - t0) + 'ms', e.name, e.message);
        lastStatus = 504;
        break;                             // slow or unreachable: next model
      }
    }
  }

  const msg = lastStatus === 429
    ? 'AI ki free limit abhi poori ho gayi hai. Thodi der baad try karo.'
    : (lastStatus === 503 || lastStatus === 504)
      ? 'Google ka AI abhi busy hai. 1-2 minute baad dobara try karo.'
      : 'AI se answer nahi mila. Dobara try karo.';
  res.status(502).json({ error: msg });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Orbit AI tutor running on port ' + PORT));

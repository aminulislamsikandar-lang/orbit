// Cloudflare Worker (free plan) — hides the Gemini key and forwards questions.
// Secret: GEMINI_API_KEY (set in Cloudflare dashboard). Never put the key in index.html.
const MODEL = 'gemini-2.5-flash'; // if Google retires it, change the name here
const ALLOWED = ['https://orbit-tutorial.web.app', 'https://orbit-tutorial.firebaseapp.com', 'http://localhost:5000'];
const LANG = { en: 'English', hi: 'Hindi (Devanagari)', as: 'Assamese (Bengali-Assamese script)', bn: 'Bengali' };

export default {
  async fetch(req, env) {
    const origin = req.headers.get('Origin') || '';
    const cors = {
      'Access-Control-Allow-Origin': ALLOWED.includes(origin) ? origin : ALLOWED[0],
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Vary': 'Origin'
    };
    const send = (obj, status = 200) => new Response(JSON.stringify(obj), { status, headers: { ...cors, 'Content-Type': 'application/json' } });

    if (req.method === 'OPTIONS') return new Response(null, { headers: cors });
    if (req.method !== 'POST') return send({ error: 'POST only' }, 405);
    if (!ALLOWED.includes(origin)) return send({ error: 'Forbidden' }, 403);

    let b; try { b = await req.json(); } catch { return send({ error: 'Bad JSON' }, 400); }
    const { chapter, question, lang, another, previous } = b || {};
    if (typeof question !== 'string' || question.length < 3 || question.length > 1500) return send({ error: 'Bad question' }, 400);

    const system =
      `You are a patient SEBA/NCERT Class 10 Science teacher helping a school student with exercise questions from: ${String(chapter || '').slice(0, 200)}.\n` +
      `Answer in ${LANG[lang] || 'English'}. Keep chemical formulas, equations and option letters in standard English notation, using Unicode subscripts (H₂O, CO₂).\n` +
      `Style: for multiple-choice questions give the correct option first, then a short reason, and say why the others are wrong if useful. ` +
      `For balancing, give the final balanced equation, then brief steps. For "type of reaction", name the type and why. ` +
      `For theory questions, answer in 3-6 simple sentences a student can write in an exam. Plain text only: no markdown tables, no headings, no asterisks.`;
    const user = another
      ? `${question}\n\nGive a DIFFERENT explanation or method from this earlier answer (it must still be correct):\n${String(previous || '').slice(0, 2000)}`
      : question;

    try {
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': env.GEMINI_API_KEY },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: system }] },
          contents: [{ role: 'user', parts: [{ text: user }] }],
          generationConfig: { maxOutputTokens: 1500, temperature: another ? 1 : 0.3, thinkingConfig: { thinkingBudget: 0 } }
        })
      });
      const j = await r.json();
      const text = ((j.candidates || [])[0]?.content?.parts || []).map(p => p.text || '').join('').trim();
      if (!r.ok || !text) return send({ error: 'AI error' }, 502);
      return send({ answer: text });
    } catch { return send({ error: 'AI error' }, 502); }
  }
};

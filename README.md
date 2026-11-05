# Orbit AI Tutor

Questions are fixed in `questions.js`. The AI writes the answers on the spot (Gemini).

## Run locally
1. Install Node 20+.
2. `npm install`
3. Copy `.env.example` to `.env` and put your Gemini API key (free from Google AI Studio).
4. `npm run dev` → open http://localhost:3000

## Deploy on Render (free Web Service)
- New → Web Service → connect this GitHub repo
- Build command: `npm install`
- Start command: `npm start`
- Environment → add `GEMINI_API_KEY`

## Add more questions
Edit `questions.js` and add a block with a new unique `id`.

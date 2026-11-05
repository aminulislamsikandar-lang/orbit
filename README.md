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

## Offline answers
Every answer the AI generates is saved in the browser (`localStorage`, key `orbit_answers_v1`), so it opens later without internet.
Answers are hidden by default; tapping the question shows or hides them. The questions and the app page are cached too (`public/sw.js`).
Translations are saved per answer (`orbit_tr_v1`) and are dropped when the answer is regenerated. The diagram of a hearted answer is saved inside the saved entry (`orbit_saved_v1`). The icon under a diagram makes a new one.

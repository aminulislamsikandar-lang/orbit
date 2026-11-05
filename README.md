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
Edit `questions.js`. Questions are grouped as `chapters` > `sections` > `questions`. To add a chapter, add one more object to `chapters` (unique `no`, and question ids that start with `c<no>-`). A chapter switcher (Chapter 1, Chapter 2, ...) shows on Home when there is more than one chapter. Favourite and Pinned show items from all chapters.
A question can also have: `parts` (sub-questions), `options` (choices), `table: { head: [...], rows: [[...]] }` (a table shown under the question and sent to the AI), and a hidden `context` (for an Activity or figure the student does not see).

## Offline answers
Every answer the AI generates is saved in the browser (`localStorage`, key `orbit_answers_v1`), so it opens later without internet.
Answers are hidden by default; tapping the question shows or hides them. The questions and the app page are cached too (`public/sw.js`).
Translations are saved per answer (`orbit_tr_v1`) and are dropped when the answer is regenerated. The diagram of a hearted answer is saved inside the saved entry (`orbit_saved_v1`). The icon under a diagram makes a new one.

## Sidebar and settings
Menu icon (top-left) opens the sidebar: Home, Favourite (hearted answers), Pinned (pin icon on each question), PYQ, Pass mark, Topper, Faculty, Developer, Settings, Log in.
PYQ, Pass mark, Topper, Faculty, Developer and Log in show "Coming soon" for now.
Settings: diagram type (Auto, Flow, Labelled, Comparison, Mind map, Chart, Table) and theme (Auto, Light, Dark); both are kept on the device.

## More options (3-dot menu)
The last icon under an answer opens: Mnemonic, Analogy, Explain like a kid, Full marks answer, Key points, Common mistakes, Practice MCQ.
Results come from `POST /api/more` and are saved on the device (`orbit_more_v1`) per answer; they are dropped when the answer is regenerated.

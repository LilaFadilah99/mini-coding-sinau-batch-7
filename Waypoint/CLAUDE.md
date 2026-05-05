# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm install` — install Vercel CLI (the only dev dependency).
- `npm run dev` — runs `vercel dev`, which serves the static frontend AND the `api/` serverless function locally (default http://localhost:3000). The frontend `fetch("/api/generate-itinerary")` only resolves under this dev server, **not** when opening `index.html` directly via Live Server / file://.
- `npm run deploy` — `vercel --prod`.

There are no tests, no linter, and no build step — files are served as-is.

## Architecture

Three-layer split with strict separation of concerns:

1. **Static frontend** — [index.html](index.html), [css/style.css](css/style.css), [js/app.js](js/app.js). Vanilla HTML/CSS/ES-module-free JS. No bundler. The frontend never touches the Gemini API directly and never parses Markdown.

2. **Serverless backend** — [api/generate-itinerary.js](api/generate-itinerary.js) is a Vercel-style handler (`export default async function handler(req, res)`). It owns:
   - CORS + method validation (POST only),
   - input validation (`destination`, `days` 1–30, `budget` ∈ {budget, moderate, luxury}, `style`),
   - reading `GEMINI_API_KEY` from `process.env`,
   - building the AI prompt server-side (so the client cannot inject prompt text),
   - calling Gemini, and
   - the [`parseMarkdown`](api/generate-itinerary.js#L203) helper that converts the model's Markdown response into HTML before returning it.

   The response shape is `{ success: true, itinerary: <html string> }` or `{ success: false, error: ... }`. Status `429` is surfaced specifically so the frontend can show a rate-limit message.

3. **External AI** — Google Gemini (`gemini-2.5-flash` via `generativelanguage.googleapis.com/v1beta`). Note: the model ID in code (`gemini-2.5-flash`) differs from what `BACKEND_BUILD_PROMPTS.md` instructs students to use (`gemini-1.5-flash`); treat the code as the source of truth. `maxOutputTokens: 8192` is intentional — anything smaller causes truncated multi-day itineraries.

### Key invariant: parseMarkdown lives only on the backend

The frontend assigns `data.itinerary` straight into `innerHTML` ([js/app.js:600](js/app.js#L600), [js/app.js:475](js/app.js#L475)). Do **not** add a Markdown parser on the frontend or reformat `data.itinerary` — the backend already returns ready-to-render HTML. This is called out explicitly in [js/app.js:967-985](js/app.js#L967-L985) and is the project's headline teaching point.

### Frontend state model

- Single-page app with two views toggled via `.view.active` class: `explore-view` and `saved-view`.
- Two entry forms generate itineraries: the inline hero form (`#quick-planner-form`, `handleHeroFormSubmit`) and the modal form (`#planner-form`, `handleFormSubmit`). Both call the shared `generateItinerary()` and write into the same modal result container — keep their behavior aligned when changing one.
- `window.currentTrip` holds the most recently generated itinerary in memory until the user clicks Save.
- Persistence: trips are saved under the `wanderwise_trips` localStorage key (note the legacy "wanderwise" name — the app was renamed to Waypoint but the storage key was kept for compatibility).

## Environment

`.env` must contain `GEMINI_API_KEY=...` (see [.env.example](.env.example)). On Vercel deployment, set the same variable in the project's Environment Variables — `vercel dev` reads the local `.env`. The `.env` file is gitignored.

## Project context

This is a teaching repo for a beginner full-stack class (the README and [BACKEND_BUILD_PROMPTS.md](BACKEND_BUILD_PROMPTS.md) are written in Indonesian and structured as a guided lesson). Code carries verbose teaching comments and emoji console logs by design — preserve that style when editing rather than refactoring it away.

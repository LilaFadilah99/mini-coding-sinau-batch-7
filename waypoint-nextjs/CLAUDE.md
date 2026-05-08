# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # next dev — http://localhost:3000
npm run build    # next build
npm run start    # next start (after build)
npm run lint     # next lint
```

There is no test runner configured.

## Required environment variables (`.env.local`)

- `GEMINI_API_KEY` — server-side, used by [app/api/generate-itinerary/route.js](app/api/generate-itinerary/route.js).
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` — read in [lib/supabase.js](lib/supabase.js). When unset, the client falls back to placeholder values so `next build` doesn't crash, but Supabase routes will fail at runtime with a clear error. The `isSupabaseConfigured` flag exported from that file is the canonical check.

The seed SQL for the `destinations` and `saved_trips` Supabase tables lives in [README.md](README.md). RLS policies in the README allow public access — they are demo-only.

## Architecture

**Stack:** Next.js 14 App Router, plain JavaScript (no TypeScript), Tailwind 3 + shadcn/ui, Supabase, Google Gemini.

### Single-page client app

[app/page.jsx](app/page.jsx) is the entire app. It is a `"use client"` component that owns all state (form data, modal open, generated itinerary, saved trips list, loading flags) and composes the section components in [components/](components/). The `view` state toggles between `"explore"` and `"saved"` — there are no separate routes for these views. New top-level UI should usually be wired into `page.jsx`, not added as a new route.

### API routes

Three routes under [app/api/](app/api/), all `route.js` (App Router style):

- `POST /api/generate-itinerary` — validates form input, calls Gemini 2.5-flash via REST. **`maxOutputTokens` must stay at 8192**; lower values truncate multi-day itineraries (commented in the file). The route runs `parseMarkdown()` on Gemini's response to produce HTML before returning it.
- `GET /api/destinations` — Supabase select.
- `GET / POST / DELETE /api/saved-trips` — Supabase CRUD; DELETE takes `?id=` query param.

Both Supabase routes export `export const dynamic = "force-dynamic"` to avoid prerendering during `next build` (env vars are runtime-only on Vercel).

### Itinerary HTML pipeline (security-relevant)

1. Gemini returns Markdown.
2. The API route's `parseMarkdown()` converts it to HTML with hardcoded class names (`itinerary-day`, `itinerary-section`, `itinerary-list`, etc.) that are styled in [app/globals.css](app/globals.css) — **not** Tailwind classes.
3. The client sanitizes that HTML with `DOMPurify` in `sanitizeItinerary()` ([app/page.jsx](app/page.jsx)) before rendering via `dangerouslySetInnerHTML`. The DOMPurify allowlist must stay aligned with the tags/attrs `parseMarkdown` actually emits — if you add a tag in `parseMarkdown`, also add it to `ALLOWED_TAGS`.

### Tailwind theming

[tailwind.config.js](tailwind.config.js) defines two color systems side by side:

- **shadcn semantic tokens** (`primary`, `secondary`, `accent`, `muted`, …) bound to HSL CSS variables in [app/globals.css](app/globals.css). `--primary` is overridden to Waypoint green so shadcn components match the brand by default.
- **Waypoint brand tokens** (`brand`, `text-primary`, `bg-secondary`, custom `shadow-xl-soft`, `shadow-brand-glow`, …). The brand color was deliberately renamed from `accent` → `brand` to avoid colliding with shadcn's semantic `accent`. README still references the old `bg-accent` names — `bg-brand` is correct.

shadcn config: [components.json](components.json) — `style: base-nova`, `tsx: false` (so generated components are `.jsx`), aliases `@/components`, `@/components/ui`, `@/lib/utils`. Path alias `@/*` is defined in [jsconfig.json](jsconfig.json).

### UX conventions

- User-facing messages use `sonner` (`toast.success/error/warning`) — call it from client components, not API routes. Do not introduce `alert()` / `confirm()`.
- Destructive confirmations use shadcn `AlertDialog` (see [components/SavedTripsView.jsx](components/SavedTripsView.jsx)).
- Remote images: hosts must be whitelisted in [next.config.js](next.config.js) (`images.unsplash.com`, `i.pravatar.cc` currently). The codebase still uses `<img>`, not `next/image`.
- Most user-facing strings, comments, and error messages are in Indonesian — match that style when editing.

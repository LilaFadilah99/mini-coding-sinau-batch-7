# 🚀 Panduan Upgrade: Dari Waypoint Vanilla ke Waypoint Next.js

> Panduan lengkap untuk peserta yang sudah selesai mengerjakan **Waypoint Vanilla (HTML/CSS/JS)** dan akan upgrade ke **Waypoint Next.js (Full-Stack dengan Supabase + Gemini AI)**.

Panduan ini ditulis untuk pemula. Kamu akan diajak membangun ulang aplikasi Waypoint dengan stack yang lebih modern, sambil belajar konsep penting seperti **React component**, **API route**, **database**, dan **environment variables**.

---

## 📚 Daftar Isi

1. [Apa Bedanya dengan Versi Vanilla?](#1-apa-bedanya-dengan-versi-vanilla)
2. [Tools yang Harus Dipersiapkan](#2-tools-yang-harus-dipersiapkan)
3. [Setup Akun & API Key](#3-setup-akun--api-key)
4. [Setup Awal Project](#4-setup-awal-project)
5. [Setup Database Supabase](#5-setup-database-supabase)
6. [Cara Pakai Prompt-nya](#6-cara-pakai-prompt-nya)
7. [Prompt Fase 1 — Konfigurasi Project](#7-prompt-fase-1--konfigurasi-project)
8. [Prompt Fase 2 — Supabase Client + Env](#8-prompt-fase-2--supabase-client--env)
9. [Prompt Fase 3 — API Routes](#9-prompt-fase-3--api-routes)
10. [Prompt Fase 4 — Static Components (UI Statis)](#10-prompt-fase-4--static-components-ui-statis)
11. [Prompt Fase 5 — Interactive Components](#11-prompt-fase-5--interactive-components)
12. [Prompt Fase 6 — Wire Up `page.jsx`](#12-prompt-fase-6--wire-up-pagejsx)
13. [Prompt Fase 7 — Polish (Error, Loading, Not Found)](#13-prompt-fase-7--polish-error-loading-not-found)
14. [Checklist Akhir & Test](#14-checklist-akhir--test)
15. [Troubleshooting](#15-troubleshooting)

---

## 1. Apa Bedanya dengan Versi Vanilla?

| Aspek | Waypoint Vanilla | Waypoint Next.js |
|---|---|---|
| Framework | HTML murni | **Next.js 14** (App Router) |
| Styling | `style.css` manual | **Tailwind CSS** + **shadcn/ui** |
| State | `window.currentTrip` | React `useState` |
| Save trips | `localStorage` (browser) | **Supabase** (cloud database) |
| Backend | 1 serverless function | **3 API routes** (App Router) |
| Sanitisasi HTML | Tidak ada | **DOMPurify** |
| User feedback | `alert()` / `confirm()` | **Sonner toast** + **AlertDialog** |
| Bahasa | Vanilla JS | **JSX** (React) |

**Yang TIDAK berubah** (tetap dipakai apa adanya):
- Prompt ke Gemini
- Fungsi `parseMarkdown()` (Markdown → HTML)
- Validasi field (`days` 1–30, `budget` enum)
- `maxOutputTokens: 8192` (wajib! kalau kurang, response multi-day terpotong)

---

## 2. Tools yang Harus Dipersiapkan

### Wajib di-install:

| Tool | Versi | Cara Cek | Link Download |
|---|---|---|---|
| **Node.js** | 18.x atau lebih baru | `node -v` | https://nodejs.org |
| **npm** | (otomatis ikut Node.js) | `npm -v` | — |
| **Git** | versi apa saja | `git --version` | https://git-scm.com |
| **VS Code** | versi terbaru | — | https://code.visualstudio.com |
| **Browser Chrome** | versi terbaru | — | https://chrome.google.com |

### Extensions VS Code (rekomendasi):
- **Tailwind CSS IntelliSense** — autocomplete class Tailwind
- **ES7+ React/Redux/React-Native snippets** — shortcut komponen React
- **Prettier - Code formatter** — auto-format
- **Auto Rename Tag** — JSX tag rename otomatis

### Akun yang harus dibuat:
- ✅ **Google Account** (untuk Gemini API)
- ✅ **Supabase Account** (untuk database) — https://supabase.com
- ⏩ **Vercel Account** (opsional, untuk deploy nanti) — https://vercel.com

---

## 3. Setup Akun & API Key

### A. Dapatkan Gemini API Key

1. Buka https://aistudio.google.com/app/apikey
2. Login pakai akun Google
3. Klik **"Create API Key"**
4. Pilih project (atau buat baru)
5. **COPY** API Key yang muncul (mulai dengan `AIza...`)
6. ⚠️ **JANGAN PERNAH share API key ini ke siapa pun** atau commit ke GitHub

> 💡 **Tips**: Simpan dulu di Notes / file teks lokal di laptop kamu. Nanti dipakai di `.env.local`.

### B. Setup Supabase Project

1. Buka https://supabase.com → klik **"Start your project"**
2. Sign up / login pakai GitHub atau email
3. Klik **"New Project"**:
   - **Name**: `waypoint-nextjs`
   - **Database Password**: bikin password (catat!)
   - **Region**: pilih Singapore (paling dekat Indonesia)
   - **Pricing Plan**: Free
4. Tunggu ~2 menit sampai project ready
5. Setelah ready, klik menu **Settings** (gear icon) → **API**
6. Catat 2 nilai ini:
   - **Project URL** (contoh: `https://abcdefg.supabase.co`)
   - **Publishable key** atau **anon public key** (bukan `service_role`!)

> ⚠️ **PENTING**: Copy `anon public` key, **JANGAN** `service_role` (itu untuk admin saja).

### C. Buat file `.env.local`

Setelah project Next.js dibuat di [Setup Awal Project](#4-setup-awal-project), buat file `.env.local` di root folder project:

```bash
GEMINI_API_KEY=AIza...isi_dengan_key_kamu...
NEXT_PUBLIC_SUPABASE_URL=https://abcdefg.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=eyJ...isi_dengan_key_supabase_kamu...
```

> 💡 **Kenapa ada `NEXT_PUBLIC_` di depan?** Itu prefix khusus Next.js. Kalau ada prefix ini, variable bisa dibaca dari browser. Kalau tidak ada (seperti `GEMINI_API_KEY`), variable hanya bisa dibaca dari server (lebih aman untuk API key sensitif).

---

## 4. Setup Awal Project

### Step 1: Buat folder project baru

Buka terminal, masuk ke folder kerja kamu (sejajar dengan folder Waypoint vanilla):

```bash
cd ~/Documents/sinau-coding/2026/mini-coding-batch-7/batc-7
```

### Step 2: Buat project Next.js

```bash
npx create-next-app@14 waypoint-nextjs
```

Saat ditanya, **jawab seperti ini**:

| Pertanyaan | Jawaban |
|---|---|
| Would you like to use TypeScript? | **No** |
| Would you like to use ESLint? | Yes |
| Would you like to use Tailwind CSS? | **Yes** |
| Would you like to use `src/` directory? | **No** |
| Would you like to use App Router? | **Yes** |
| Would you like to customize the default import alias? | **No** (biarkan `@/*`) |

Tunggu sampai selesai install (~2 menit).

### Step 3: Masuk ke project & install dependencies tambahan

```bash
cd waypoint-nextjs

npm install @supabase/supabase-js dompurify sonner clsx tailwind-merge tailwindcss-animate class-variance-authority lucide-react

npm install @radix-ui/react-dialog @radix-ui/react-alert-dialog @radix-ui/react-label @radix-ui/react-select @radix-ui/react-slot
```

### Step 4: Buka project di VS Code

```bash
code .
```

### Step 5: Test dulu sebelum lanjut

```bash
npm run dev
```

Buka http://localhost:3000 — kalau muncul halaman default Next.js, semua sudah benar. Tekan `Ctrl+C` di terminal untuk stop.

---

## 5. Setup Database Supabase

Sebelum jalan ke prompt, kita siapkan tabel di Supabase dulu.

### Step 1: Buka Supabase Dashboard → SQL Editor

1. Login ke https://supabase.com
2. Buka project `waypoint-nextjs`
3. Klik menu **SQL Editor** (icon `</>`)
4. Klik **"New query"**

### Step 2: Run SQL ini (copy-paste, lalu klik Run)

```sql
-- Tabel destinations (untuk Popular Destinations section)
CREATE TABLE destinations (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image TEXT,
  tag TEXT
);

-- Tabel saved_trips (untuk fitur "My Trips")
CREATE TABLE saved_trips (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  destination TEXT,
  days INTEGER,
  budget TEXT,
  interests TEXT,
  itinerary TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed data 4 destinations awal
INSERT INTO destinations (name, description, image, tag) VALUES
  ('Bali, Indonesia', 'Surga tropis dengan pantai indah, sawah hijau, dan budaya yang kaya.',
   'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80', '🏝️ Tropical'),
  ('Tokyo, Japan', 'Perpaduan modernitas dan tradisi, dari neon kota hingga kuil tenang.',
   'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80', '🏙️ Urban'),
  ('Paris, France', 'Kota cinta, seni, dan kuliner dengan landmark ikonik.',
   'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80', '🗼 Romantic'),
  ('Iceland', 'Negeri api dan es dengan landscape vulkanik dan aurora memukau.',
   'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&q=80', '❄️ Adventure');

-- Allow anonymous read/write (untuk demo workshop saja)
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read destinations" ON destinations FOR SELECT USING (true);

ALTER TABLE saved_trips ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public access saved_trips" ON saved_trips FOR ALL USING (true);
```

### Step 3: Cek tabel sudah ada

Klik menu **Table Editor** → harus ada 2 tabel: `destinations` (4 baris) dan `saved_trips` (kosong).

> ⚠️ **Catatan**: policy "Public access" hanya untuk demo. Production wajib pakai authentication.

---

## 6. Cara Pakai Prompt-nya

Prompt di bawah ini dipakai untuk **AI assistant** (Claude / ChatGPT / Cursor / dsb) untuk bantu kamu generate kode. Cara pakainya:

1. **Copy 1 prompt**, paste ke AI
2. AI akan generate file
3. **Buat file** sesuai instruksi prompt (atau biarkan AI yang bikin)
4. **Test dulu** sebelum lanjut ke prompt berikutnya
5. Kalau ada error, paste error-nya ke AI dan minta fix

> 💡 **Tips**: Prompt sengaja dibuat detail biar hasil AI persis seperti yang kita mau. Jangan skip atau modifikasi prompt — terutama bagian "JANGAN" atau "WAJIB".

> 🎯 **Urutan penting**: kerjakan **fase demi fase**. Jangan loncat. Setiap fase test dulu sebelum lanjut.

---

## 7. Prompt Fase 1 — Konfigurasi Project

> **Tujuan**: Setup `tailwind.config.js`, `globals.css`, `layout.jsx`, `next.config.js`, `jsconfig.json`, dan inisialisasi shadcn/ui.

### Prompt 1.1 — Konfigurasi Tailwind dengan Custom Theme

```
Halo! Aku lagi build app Next.js 14 (App Router, plain JavaScript — NO TypeScript)
namanya "Waypoint AI Travel Planner". Tolong buatkan file `tailwind.config.js` 
dengan custom theme seperti ini (jangan ubah angka warna atau token name):

1. darkMode: ["class"]
2. content: scan ./app/**/*.{js,jsx} dan ./components/**/*.{js,jsx}
3. Tambahkan colors di theme.extend:
   - shadcn semantic tokens: border, input, ring, background, foreground,
     primary, secondary, destructive, muted, accent, popover, card 
     (semua pakai format hsl(var(--xxx)) dan ada DEFAULT + foreground)
   - Waypoint brand tokens (HARUS persis):
     - brand: { DEFAULT: "#8bff66", hover: "#7ae356", light: "#f0fdf4", dark: "#3f6212" }
     - "text-primary": "#1e293b"
     - "text-secondary": "#64748b"
     - "text-muted": "#94a3b8"
     - "bg-secondary": "#f8fafc"
     - "bg-tertiary": "#f1f5f9"
     - "border-default": "#e2e8f0"
     - "border-light": "#f1f5f9"
4. fontFamily.sans: ["var(--font-sans)", "-apple-system", "BlinkMacSystemFont", "sans-serif"]
5. borderRadius: lg/md/sm pakai var(--radius), tambah "wp-sm": "10px" dan "wp-xs": "6px"
6. boxShadow custom:
   - subtle: "0 1px 3px rgba(0,0,0,0.1)"
   - medium: "0 4px 20px rgba(0,0,0,0.08)"
   - large: "0 10px 40px rgba(0,0,0,0.12)"
   - "xl-soft": "0 20px 60px rgba(0,0,0,0.15)"
   - "brand-glow": "0 8px 20px rgba(139, 255, 102, 0.4)"
7. animation + keyframes: fade-in (0.3s), slide-up (0.4s), slide-down (0.3s),
   accordion-down/up (0.2s)
8. plugins: require("tailwindcss-animate")

Output cuma 1 file: tailwind.config.js. Pakai module.exports (bukan export default).
```

### Prompt 1.2 — globals.css dengan CSS Variables shadcn

```
Tolong buatkan file `app/globals.css` untuk app Waypoint Next.js.

Strukturnya:
1. @tailwind base; @tailwind components; @tailwind utilities;

2. @layer base { :root { ... } } — definisikan CSS variables untuk shadcn 
   (dalam format HSL TANPA hsl() — jadi cuma "0 0% 100%"):
   - --background: 0 0% 100%
   - --foreground: 215 25% 17%
   - --card: 0 0% 100%, --card-foreground: 215 25% 17%
   - --popover: 0 0% 100%, --popover-foreground: 215 25% 17%
   - --border: 215 14% 90%, --input: 215 14% 90%, --ring: 99 100% 70%
   - --primary: 99 100% 70% (Waypoint green!), --primary-foreground: 0 0% 10%
   - --secondary: 210 20% 96%, --secondary-foreground: 215 25% 17%
   - --muted: 210 20% 96%, --muted-foreground: 215 14% 45%
   - --accent: 99 100% 92%, --accent-foreground: 215 25% 17%
   - --destructive: 0 84% 60%, --destructive-foreground: 0 0% 98%
   - --radius: 0.625rem
   Lalu * { @apply border-border; }

3. @layer base { ... } untuk reset:
   html { scroll-behavior: smooth }
   body { line-height: 1.6 }
   ul { list-style: none }
   a { color: inherit; text-decoration: none }
   img { max-width: 100%; height: auto; display: block }
   button { font-family: inherit; cursor: pointer }
   input, select { font-family: inherit }

4. .hero-overlay — linear-gradient to bottom 3-stop:
   rgba(0,0,0,0.3) 0% → rgba(0,0,0,0.4) 50% → rgba(255,255,255,1) 100%

5. .cta-overlay — linear-gradient 135deg:
   rgba(0,0,0,0.6) 0% → rgba(0,0,0,0.3) 100%

6. .itinerary-result styling (HARUS detail karena AI return HTML via innerHTML):
   - .itinerary-result { line-height: 1.8; font-size: 14px }
   - h1/.itinerary-title: 22px bold, border-bottom 2px #8bff66
   - h2/.itinerary-section: 18px, padding 10px 14px, bg #f1f5f9, border-left 3px #8bff66
   - h3/.itinerary-day: 15px, padding 12px 16px, bg #8bff66 (full hijau!)
   - h3:first-child { margin-top: 0 }
   - ul/.itinerary-list: padding 0, list-style none
   - ul li: padding 12px 14px, bg #f8fafc, border-left 2px #e2e8f0
   - ul li:hover: border-left-color #8bff66, bg #f1f5f9
   - ul li strong: color #1e293b
   - p/.itinerary-text: margin-bottom 12px, color #64748b
   - hr/.itinerary-divider: 1px bg #e2e8f0, margin 20px 0
   - strong: color #1e293b, font-weight 600

7. .saved-trip-content (preview saved trip dengan fade):
   max-height: 150px, overflow: hidden, font-size: 13px, color: #64748b
   ::after { content: ""; position absolute bottom 0 left 0 right 0;
            height 60px; background: linear-gradient(transparent, white) }

Tulis komentar pendek di setiap section (Bahasa Indonesia campur English boleh). 
Jangan tulis komen yang panjang.
```

### Prompt 1.3 — `app/layout.jsx` (Root Layout)

```
Tolong buatkan `app/layout.jsx` untuk app Waypoint Next.js.

Requirements:
1. Import Plus_Jakarta_Sans dari "next/font/google" — subset latin, 
   weights ["400","500","600","700","800"], variable: "--font-sans"
2. Import { Toaster } from "sonner"
3. Import "./globals.css"

4. Export `metadata`:
   - title: { default: "Waypoint AI - Smart Travel Planning", 
              template: "%s | Waypoint AI" }
   - description: "Waypoint AI - Your intelligent travel companion. 
                   Get AI-powered itineraries for your dream destinations."
   - keywords: ["travel","AI","itinerary","trip planner","vacation","Gemini"]
   - authors: [{ name: "Waypoint Team" }]
   - openGraph: type "website", locale "en_US", siteName "Waypoint AI",
                title + description sama, images dari Unsplash 
                (photo-1507525428034-b723cf961d3e)
   - twitter: card "summary_large_image" dengan title + image yang sama
   - robots: { index: true, follow: true }

5. Export `viewport`: { width: "device-width", initialScale: 1, themeColor: "#8bff66" }

6. Default export RootLayout({ children }):
   <html lang="en" className={jakarta.variable} suppressHydrationWarning>
     <body className="font-sans bg-white text-text-primary leading-relaxed overflow-x-hidden"
           suppressHydrationWarning>
       {children}
       <Toaster position="top-center" richColors closeButton duration={4000} />
     </body>
   </html>

JANGAN tambahkan "use client". Layout HARUS server component.
```

### Prompt 1.4 — `next.config.js` + `jsconfig.json` + `postcss.config.js`

```
Tolong buatkan 3 file config kecil untuk Next.js project:

1. `next.config.js`:
   - module.exports = nextConfig
   - nextConfig.images.remotePatterns: ada 2 entry, keduanya https,
     hostname "images.unsplash.com" dan "i.pravatar.cc"

2. `jsconfig.json`:
   - compilerOptions.paths: { "@/*": ["./*"] }
   (supaya import bisa pakai @/components, @/lib, dst)

3. `postcss.config.js`:
   - module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } }

Tulis tanpa komentar panjang, langsung file-nya saja.
```

### Prompt 1.5 — Inisialisasi shadcn/ui (jalan di terminal)

> Ini bukan prompt untuk AI, tapi command yang kamu run di terminal:

```bash
npx shadcn@latest init
```

Saat ditanya, jawab:
- Style: **Default**
- Base color: **Neutral**
- CSS variables: **Yes**

Lalu install komponen-komponen yang dipakai:

```bash
npx shadcn@latest add button input label select dialog alert-dialog card
```

> Setelah ini, file `components.json`, `lib/utils.js`, dan beberapa file di `components/ui/` otomatis dibuat. ✅

**TEST DULU**: Run `npm run dev` — pastikan tidak ada error compile.

---

## 8. Prompt Fase 2 — Supabase Client + Env

### Prompt 2.1 — `.env.local` & `.env.example`

```
Tolong buatkan 2 file environment di root project:

1. `.env.example` — template (tanpa nilai), isinya:
   GEMINI_API_KEY=
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
   
   Tambahkan komentar singkat di setiap variable jelaskan dimana dapatnya
   (Gemini: aistudio.google.com/app/apikey, Supabase: dashboard Settings → API).

2. `.gitignore` — tambahkan baris:
   .env
   .env.local
   .env.production.local
   .env.development.local
   (kalau .gitignore sudah ada dari create-next-app, cek dulu sudah ada belum)

JANGAN buat `.env.local` dengan nilai asli — itu peserta isi sendiri.
```

### Prompt 2.2 — `lib/supabase.js`

```
Tolong buatkan `lib/supabase.js` — Supabase client untuk Next.js app.

Requirements:
1. Import { createClient } from "@supabase/supabase-js"
2. Baca env: NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
3. Export const isSupabaseConfigured = Boolean(url && key)
4. Kalau belum di-set, console.warn pesan: 
   "⚠️ Supabase URL atau Publishable Key belum diset di .env.local. 
   Endpoint /api/destinations & /api/saved-trips tidak akan jalan."
5. Export const supabase = createClient(
     url || "https://placeholder.supabase.co",
     key || "placeholder-key"
   )
   
   (fallback ke placeholder biar `next build` ga crash kalau env belum diset.
   Query akan fail saat runtime tapi dengan error message yang jelas dari Supabase)

Tulis komentar pendek di tiap step (Bahasa Indonesia OK).
```

> **TEST**: Setelah ini, isi `.env.local` dengan nilai asli kamu (Gemini key + Supabase URL/key dari Step 3 di awal). Lalu restart dev server (`Ctrl+C` lalu `npm run dev` lagi).

---

## 9. Prompt Fase 3 — API Routes

> **Tujuan**: 3 API endpoints yang dipanggil dari frontend.

### Prompt 3.1 — `app/api/generate-itinerary/route.js`

```
Tolong buatkan `app/api/generate-itinerary/route.js` — Next.js App Router style 
API route yang panggil Google Gemini untuk generate travel itinerary.

Requirements:
1. Konstanta GEMINI_API_URL = 
   "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent"

2. Export async function POST(request):
   a. Parse body: const { destination, days, budget, style } = await request.json()
   
   b. Validasi (return Response.json({success: false, error: "..."}, {status: 400}) 
      kalau gagal):
      - Semua 4 field wajib ada
      - destination harus string non-empty
      - days harus parseInt valid antara 1–30
      - budget harus salah satu dari ["budget","moderate","luxury"]
   
   c. Cek process.env.GEMINI_API_KEY. Kalau tidak ada, return 500 dengan
      error: "Server tidak terkonfigurasi. Hubungi admin."
   
   d. Buat prompt (string template) PERSIS seperti ini:
      "Create a detailed ${daysNum}-day itinerary for ${destination} with a ${budget} budget.

      Focus: ${style}

      IMPORTANT: You MUST generate ALL ${daysNum} days completely. Do not summarize.

      Format for each day:
      - Use ### for day headings (e.g., ### Day 1: Arrival & Exploration 🛬)
      - List 3-5 key activities per day with specific times (e.g., 09:00 AM, 02:00 PM)
      - Include specific place names and brief descriptions (2-3 sentences each)
      - Add relevant emojis for engagement

      Generate ALL ${daysNum} days before finishing. Be practical, realistic, and exciting!"
   
   e. Panggil Gemini via fetch:
      URL: `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`
      method POST, header Content-Type: application/json
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 8192,   // WAJIB 8192! Kalau kurang response terpotong
          topP: 0.8,
          topK: 40
        }
      })
   
   f. Handle error Gemini:
      - Status 429: return 429 dengan error 
        "Terlalu banyak request. Tunggu 1-2 menit lalu coba lagi."
      - Lainnya: return 500 dengan error 
        "Gagal generate itinerary. Coba lagi nanti."
   
   g. Parse response: 
      const generatedText = data.candidates[0].content.parts[0].text
      Cek dulu candidates[0].content valid, kalau tidak throw new Error.
   
   h. Convert markdown ke HTML pakai parseMarkdown(generatedText) — function
      di-define di bawah file ini.
   
   i. Return Response.json({ success: true, itinerary: formattedHTML })
   
   j. Wrap semua di try/catch — global error: 
      return 500 dengan error "Terjadi kesalahan tak terduga. Coba lagi nanti."

3. Function parseMarkdown(markdown) — convert markdown ke HTML:
   - Return "" kalau markdown kosong
   - Headers (regex global multiline):
     ^### (.+)$ → '<h3 class="itinerary-day">$1</h3>'
     ^## (.+)$ → '<h2 class="itinerary-section">$1</h2>'
     ^# (.+)$ → '<h1 class="itinerary-title">$1</h1>'
   - Bold: **text** → <strong>text</strong>
   - Italic: *text* → <em>text</em>
   - List items: ^* (.+)$ atau ^- (.+)$ → <li>$1</li>
   - Wrap consecutive <li>: regex /(<li>.*<\/li>\n?)+/g — wrap pakai 
     '<ul class="itinerary-list">...</ul>'
   - Horizontal rule: ^---+$ atau ^\*\*\*+$ → '<hr class="itinerary-divider">'
   - Paragraph: split markdown by \n\n+, untuk tiap block:
     - skip kalau block sudah dimulai <h, <ul, <hr, <p
     - skip kalau empty
     - else wrap '<p class="itinerary-text">' + block.replace(/\n/g,"<br>") + '</p>'
   - Join dengan "\n"

4. Tulis console.log untuk debugging:
   "📝 Generating itinerary for: <destination> (<days> days)"
   "✅ Itinerary berhasil di-generate"
   "❌ Gemini API Error: ..."

Pakai Bahasa Indonesia untuk pesan error yang user-facing. JANGAN pakai 
"export default" — pakai "export async function POST".
```

### Prompt 3.2 — `app/api/destinations/route.js`

```
Tolong buatkan `app/api/destinations/route.js` — endpoint GET untuk fetch 
list popular destinations dari Supabase.

Requirements:
1. Import { supabase } from "@/lib/supabase"
2. Export const dynamic = "force-dynamic" 
   (supaya tidak prerender saat build — env vars baru ada saat runtime)
3. Export async function GET():
   - try: 
     const { data, error } = await supabase.from("destinations")
       .select("*").order("id", { ascending: true })
   - kalau error: console.error + return Response.json(
     { success: false, error: error.message }, { status: 500 })
   - kalau sukses: return Response.json(data || [])
4. Wrap semua di try/catch global error 500.

Komentar singkat tiap section. Bahasa Indonesia OK.
```

### Prompt 3.3 — `app/api/saved-trips/route.js`

```
Tolong buatkan `app/api/saved-trips/route.js` — endpoint CRUD untuk saved trips.

Requirements:
1. Import { supabase } from "@/lib/supabase"
2. Export const dynamic = "force-dynamic"

3. GET — list semua saved trips:
   - supabase.from("saved_trips").select("*").order("created_at", {ascending: false})
   - return data || []
   - Error → 500

4. POST — save trip baru:
   - Parse body: { destination, days, budget, interests, itinerary }
   - Validasi 4 field wajib (destination, days, budget, itinerary). 
     Kalau kosong return 400 dengan error 
     "Field tidak lengkap. Wajib: destination, days, budget, itinerary."
   - Insert: supabase.from("saved_trips").insert([{
       destination, days: parseInt(days), budget,
       interests: interests || "", itinerary
     }]).select().single()
   - Sukses: return Response.json({ success: true, trip: data }, { status: 201 })
   - Error → 500

5. DELETE — hapus trip by id:
   - Ambil id dari URL: 
     const { searchParams } = new URL(request.url)
     const id = searchParams.get("id")
   - Kalau id tidak ada: 400 dengan error "Parameter ?id wajib."
   - Delete: supabase.from("saved_trips").delete().eq("id", id)
   - Sukses: return Response.json({ success: true })
   - Error → 500

6. Pesan error pakai Bahasa Indonesia. console.error untuk debug.
```

> **TEST**: Setelah Fase 3 selesai, run `npm run dev` lalu cek di browser:
> - http://localhost:3000/api/destinations → harus return JSON array 4 destinations
> - http://localhost:3000/api/saved-trips → harus return `[]` (array kosong)
> - Kalau error "Failed to fetch", cek lagi `.env.local` dan restart dev server.

---

## 10. Prompt Fase 4 — Static Components (UI Statis)

> Komponen-komponen ini tidak punya state interaktif. Mulai dari yang paling simpel.

### Prompt 4.1 — `components/Footer.jsx`

```
Tolong buatkan `components/Footer.jsx` — footer Waypoint yang simple.

Server component (tidak ada "use client"). Layout:

<footer className="bg-bg-secondary border-t border-border-default px-6 py-10">
  <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row 
       items-center md:justify-between gap-4 md:gap-0 text-center md:text-left">
    <div className="flex items-center gap-2.5 font-semibold text-lg">
      <span className="text-2xl">⛰️</span>
      <span>Waypoint AI</span>
    </div>
    <p className="text-text-secondary text-sm">
      Made with ❤️ for learning web development
    </p>
  </div>
</footer>

Default export Footer().
```

### Prompt 4.2 — `components/StatsSection.jsx`

```
Tolong buatkan `components/StatsSection.jsx` — section dengan 4 stat card.

Server component. Definisikan const stats di luar function dengan 4 object:
1. number "234", suffix "M", label "Supporting multiple\ncurrencies for travelers", 
   highlight false
2. number "768", suffix "K", label "Gaining new travelers\nevery single month", 
   highlight TRUE (yang kartu hijau)
3. number "5.0", suffix "★", label "High star ratings from\nsatisfied users", 
   highlight false
4. number "$8.8", suffix "B", label "Generating increased\nrevenue consistently", 
   highlight false

JSX:
<section className="bg-white px-6 py-20">
  <div className="max-w-[1200px] mx-auto">
    <h2 text-3xl md:text-4xl font-bold text-text-primary mb-4 leading-tight>
      Get to know more<br />about Waypoint Travel
    </h2>
    <p text-base text-text-secondary mb-12 max-w-[600px]>
      With a commitment to security and efficiency, our services ensure your 
      travel planning is seamless and secure.
    </p>
    <div grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6>
      {stats.map((stat, idx) => (
        <div className={`rounded-2xl p-8 text-center transition 
             hover:-translate-y-1 hover:shadow-medium ${
               stat.highlight ? "bg-brand text-[#1a1a1a]" : "bg-bg-secondary"
             }`}>
          <h3 className="text-5xl font-bold mb-3">
            {stat.number}<span className="text-3xl font-semibold">{stat.suffix}</span>
          </h3>
          <p className={`text-sm leading-relaxed whitespace-pre-line ${
            stat.highlight ? "opacity-80" : "text-text-secondary"
          }`}>
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

(whitespace-pre-line penting biar \n di label jadi line break)
```

### Prompt 4.3 — `components/EventsSection.jsx`

```
Tolong buatkan `components/EventsSection.jsx` — 3 event cards dengan gambar.

Server component. Import Image dari "next/image".

Const events (3 object) — title, image (Unsplash URL), location, date, rating, price:
1. "Exploring the Hidden Wonders of the World Adventure" - 
   image: photo-1502602898657-3e91760cbb34?w=600&q=80
   location "📍 Bangladesh", date "📅 July 3 to 7", rating "⭐ 4.8 Rating", price "$400"
2. "Embark on a Cultural Journey Across Stunning Landscapes" -
   image: photo-1551632811-561732d1e306?w=600&q=80
   location "📍 Bangladesh", date "📅 July 10 to 12", rating "⭐ 4.8 Rating", price "$320"
3. "Discover Majestic Mountains and Breathtaking Views" -
   image: photo-1469854523086-cc02fe5d8800?w=600&q=80
   location "📍 Bangladesh", date "📅 July 3 to 7", rating "⭐ 4.8 Rating", price "$450"

URL image full: "https://images.unsplash.com/photo-XXX"

JSX:
<section bg-white px-6 py-20>
  <div max-w-[1200px] mx-auto>
    <div flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4>
      <h2 text-2xl md:text-3xl font-bold text-text-primary>Explore events</h2>
    </div>
    <div grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6>
      {events.map((event, idx) => (
        <div bg-white border border-border-default rounded-2xl overflow-hidden 
             transition hover:shadow-large hover:-translate-y-1 group>
          <div relative w-full h-60 overflow-hidden>
            <Image src={event.image} alt={event.title} fill 
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition duration-300 group-hover:scale-105" />
          </div>
          <div p-5>
            <h3 text-base font-semibold text-text-primary mb-4 leading-snug>
              {event.title}
            </h3>
            <div flex flex-col gap-2 mb-4>
              <span text-sm text-text-secondary>{event.location}</span>
              <span text-sm text-text-secondary>{event.date}</span>
              <span text-sm text-text-secondary>{event.rating}</span>
            </div>
            <div flex items-baseline gap-1 mb-2>
              <span text-xl font-bold text-text-primary>{event.price}</span>
              <span text-sm text-text-secondary>/ Night</span>
            </div>
            <p text-xs text-text-muted>Including taxes and fees</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

### Prompt 4.4 — `components/ReviewsSection.jsx`

```
Tolong buatkan `components/ReviewsSection.jsx` — section testimonial.

Server component. Import Image dari "next/image".

Layout:
<section bg-bg-secondary px-6 py-20>
  <div max-w-[1200px] mx-auto>
    {/* Header */}
    <div flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4>
      <h2 text-2xl md:text-3xl font-bold text-text-primary>Client review</h2>
      <div flex>
        {[1,2,3,4].map((i) => (
          <Image src={`https://i.pravatar.cc/40?img=${i}`} alt={`Reviewer ${i}`}
            width={40} height={40}
            className={`rounded-full border-[3px] border-white ${i > 1 ? "-ml-2" : ""}`}/>
        ))}
      </div>
    </div>
    
    {/* Content */}
    <div grid grid-cols-1 md:grid-cols-2 gap-10 items-center>
      {/* Testimonial card */}
      <div bg-white rounded-2xl p-10 relative>
        <div text-[80px] text-brand leading-none mb-4 
             style={{ fontFamily: "Georgia, serif" }}>"</div>
        <p text-base leading-loose text-text-secondary mb-8>
          Working with this team was a pleasure. They understood our vision and 
          helped us find a property that exceeded our expectations. We couldn't 
          have done it without them!
        </p>
        <div mb-6>
          <h4 text-lg font-bold text-text-primary mb-1>Sajibur Rahman</h4>
          <p text-sm text-text-muted>UI UX Designer</p>
        </div>
        {/* Dots */}
        <div flex gap-2>
          <span w-6 h-2 rounded bg-text-primary />
          <span w-2 h-2 rounded-full bg-border-default />
          <span w-2 h-2 rounded-full bg-border-default />
        </div>
      </div>
      {/* Image */}
      <div relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden>
        <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80"
          alt="Reviewer" fill sizes="(max-width: 768px) 100vw, 50vw" 
          className="object-cover" />
      </div>
    </div>
  </div>
</section>
```

### Prompt 4.5 — `components/CTAHero.jsx`

```
Tolong buatkan `components/CTAHero.jsx` — section CTA besar sebelum footer.

Server component. Import Image dari "next/image".

<section relative min-h-[600px] flex items-center justify-center 
         overflow-hidden mt-20>
  <div absolute inset-0 z-0>
    <Image src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=1600&q=80"
      alt="Adventure landscape" fill sizes="100vw" className="object-cover" />
    <div absolute inset-0 cta-overlay />  {/* class dari globals.css */}
  </div>
  <div relative z-10 text-center text-white max-w-[800px] px-6>
    <h2 text-4xl md:text-6xl font-bold mb-5 leading-tight>
      Discover the World, One<br />Adventure at a Time
    </h2>
    <p text-base md:text-lg mb-8 opacity-95 leading-relaxed>
      Travel Beyond Limits, Explore Uncharted Horizons, and Build Memories 
      That Last a Lifetime
    </p>
    <button className="inline-flex items-center gap-3 bg-brand text-[#1a1a1a] 
        rounded-xl px-10 py-4 text-base font-bold transition hover:bg-brand-hover 
        hover:-translate-y-0.5 hover:shadow-brand-glow">
      Get Started
      <span className="text-xl">→</span>
    </button>
  </div>
</section>
```

### Prompt 4.6 — `components/LoadingOverlay.jsx`

```
Tolong buatkan `components/LoadingOverlay.jsx` — overlay full-screen yang muncul 
saat AI sedang generate itinerary.

Function takes prop { show } (boolean).

<div className={`fixed inset-0 bg-white/80 backdrop-blur-md z-[9999] 
    flex items-center justify-center transition-all duration-[400ms] 
    ease-[cubic-bezier(0.4,0,0.2,1)] ${
      show ? "opacity-100 visible" : "opacity-0 invisible"
    }`}>
  <div className={`text-center flex flex-col items-center gap-6 
      transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
        show ? "translate-y-0 scale-100" : "translate-y-5 scale-90"
      }`}>
    <div className="w-16 h-16 rounded-full border-4 border-border-light 
         border-t-brand animate-spin"
         style={{ boxShadow: "0 0 20px rgba(139, 255, 102, 0.2)" }} />
    <p className="text-lg font-bold text-text-primary tracking-tight">
      Waypoint AI is crafting your journey...
    </p>
  </div>
</div>

Server component (tidak perlu "use client" karena cuma render dari prop).
```

> **TEST**: Sementara belum bisa lihat di browser karena page.jsx belum diupdate. Lanjut.

---

## 11. Prompt Fase 5 — Interactive Components

> Component yang punya state, event handler, atau pakai shadcn UI.

### Prompt 5.1 — `components/Navbar.jsx`

```
Tolong buatkan `components/Navbar.jsx` — fixed navbar 3 part 
(logo / nav links / AI Planner button) dengan mobile menu.

CLIENT component ("use client").

Imports:
- useState, useEffect, useRef from "react"
- Button from "@/components/ui/button"

Props: { view, onViewChange, onOpenPlanner }

State:
- mobileMenuOpen (false)
- navMenuRef (useRef)
- mobileMenuBtnRef (useRef)

useEffect: handleClickOutside — kalau klik di luar navMenuRef DAN luar 
mobileMenuBtnRef, set mobileMenuOpen(false). Pasang document.addEventListener 
"click", cleanup remove.

Function handleNavClick(targetView): onViewChange(targetView), close mobile menu.

JSX:
<nav fixed top-6 left-0 right-0 z-[1000] px-6>
  <div max-w-[1200px] mx-auto flex items-center justify-between>
    
    {/* Logo */}
    <a href="#" className="flex items-center gap-2.5 font-bold text-base bg-white 
       px-2.5 py-[3px] rounded-full shadow-subtle">
      <span text-2xl>⛰️</span>
      <span text-text-primary>Waypoint Travel</span>
    </a>
    
    {/* Nav Links — desktop pakai md:, mobile pakai conditional */}
    <ul ref={navMenuRef} className={`${
      mobileMenuOpen 
        ? "absolute top-[70px] right-6 flex flex-col bg-white p-3 rounded-2xl 
           shadow-large min-w-[200px] animate-slide-down z-[1001]" 
        : "hidden"
    } md:relative md:flex md:flex-row md:bg-white md:p-2 md:rounded-full 
       md:shadow-subtle md:top-auto md:right-auto md:min-w-0 md:gap-1`}>
      <li>
        <button onClick={() => handleNavClick("explore")} 
          className={`px-6 py-2.5 rounded-full font-semibold text-sm transition 
              w-full md:w-auto text-left md:text-center ${
                view === "explore" 
                  ? "text-black bg-bg-tertiary" 
                  : "text-text-secondary hover:text-text-primary hover:bg-bg-tertiary"
              }`}>
          Destinations
        </button>
      </li>
      <li>
        <button onClick={() => handleNavClick("saved")} 
          className=... (sama dengan atas tapi check view === "saved")>
          My Trips
        </button>
      </li>
    </ul>
    
    {/* AI Planner button — hidden mobile */}
    <div hidden md:flex gap-3>
      <Button onClick={onOpenPlanner} 
        className="rounded-full h-auto px-6 py-3 font-bold text-sm shadow-subtle 
            transition hover:-translate-y-0.5 hover:shadow-brand-glow">
        AI Planner
      </Button>
    </div>
    
    {/* Mobile menu button (hamburger 3 lines yang animate jadi X) */}
    <button ref={mobileMenuBtnRef} 
      onClick={(e) => { e.stopPropagation(); setMobileMenuOpen(prev => !prev) }}
      className="md:hidden flex flex-col gap-[5px] p-3.5 bg-white rounded-full 
        shadow-subtle"
      aria-label="Toggle mobile menu">
      <span className={`block w-5 h-0.5 bg-text-primary rounded transition ${
        mobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""
      }`} />
      <span className={`block w-5 h-0.5 bg-text-primary rounded transition ${
        mobileMenuOpen ? "opacity-0" : ""
      }`} />
      <span className={`block w-5 h-0.5 bg-text-primary rounded transition ${
        mobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
      }`} />
    </button>
    
  </div>
</nav>
```

### Prompt 5.2 — `components/Hero.jsx`

```
Tolong buatkan `components/Hero.jsx` — hero section dengan background image, 
judul, dan floating card berisi quick planner form (4 input + filter pills + 
generate button).

CLIENT component ("use client").

Imports:
- Image from "next/image"
- Button from "@/components/ui/button"
- Input from "@/components/ui/input"
- Label from "@/components/ui/label"
- Select, SelectContent, SelectItem, SelectTrigger, SelectValue from "@/components/ui/select"
- cn from "@/lib/utils"

Const filterCities = ["Bali","Tokyo","Paris","New York","Dubai","London"]

Const PILL_INPUT (string class) = 
  "rounded-full h-12 px-5 text-[15px] bg-white shadow-none border-border-default 
   text-text-primary placeholder:text-text-muted focus-visible:ring-[3px] 
   focus-visible:ring-brand-light focus-visible:border-brand focus-visible:ring-offset-0"

Props: { formData, onChange, onSubmit, isSubmitting, selectedFilter, onFilterClick }

Helper: function handleChange(field) { 
  return (e) => onChange({ ...formData, [field]: e.target.value })
}

JSX:
<section relative min-h-[600px] flex flex-col items-center justify-center 
         pt-[250px] px-6 pb-[180px] overflow-hidden>
  
  {/* Background image + overlay */}
  <div absolute inset-0 -z-10>
    <Image src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80"
      alt="Beautiful tropical beach" fill priority sizes="100vw" 
      className="object-cover" />
    <div absolute inset-0 hero-overlay />
  </div>
  
  {/* Hero text */}
  <div text-center max-w-[700px] text-white mb-10>
    <h1 text-4xl md:text-5xl lg:text-[52px] font-extrabold leading-tight mb-5
        style={{ textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}>
      Explore the World, One<br />Journey at a Time.
    </h1>
    <p text-base md:text-[17px] opacity-90 leading-relaxed
       style={{ textShadow: "0 1px 10px rgba(0,0,0,0.3)" }}>
      AI-powered itineraries crafted just for you. Explore smarter, travel better.
    </p>
  </div>
  
  {/* Floating Card with Form */}
  <div bg-white rounded-2xl shadow-xl-soft p-6 w-full max-w-[900px] relative z-10>
    <div mb-6>
      <h2 text-2xl font-bold text-text-primary>Plan Your Travel Journey</h2>
    </div>
    
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      
      {/* Row 1: 4 fields — destination, days, budget (Select), interests */}
      <div grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end>
        <div space-y-2>
          <Label htmlFor="hero-destination" className="text-[13px] font-semibold">
            Destination
          </Label>
          <Input id="hero-destination" type="text" value={formData.destination}
            onChange={handleChange("destination")} placeholder="Type the destination"
            required className={PILL_INPUT} />
        </div>
        
        <div space-y-2>
          <Label htmlFor="hero-days" className="text-[13px] font-semibold">Days</Label>
          <Input id="hero-days" type="number" value={formData.days}
            onChange={handleChange("days")} placeholder="3" min={1} max={14}
            required className={PILL_INPUT} />
        </div>
        
        <div space-y-2>
          <Label htmlFor="hero-budget" className="text-[13px] font-semibold">Budget</Label>
          <Select value={formData.budget} 
            onValueChange={(value) => onChange({ ...formData, budget: value })}>
            <SelectTrigger id="hero-budget" className={cn(PILL_INPUT, "w-full")}>
              <SelectValue placeholder="Pilih budget" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="budget">Budget</SelectItem>
              <SelectItem value="moderate">Moderate</SelectItem>
              <SelectItem value="luxury">Luxury</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div space-y-2>
          <Label htmlFor="hero-interests" className="text-[13px] font-semibold">
            Interests
          </Label>
          <Input id="hero-interests" type="text" value={formData.interests}
            onChange={handleChange("interests")} placeholder="Your interests"
            className={PILL_INPUT} />
        </div>
      </div>
      
      {/* Row 2: filter pills (kiri) + Submit button (kanan) */}
      <div flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 lg:gap-5>
        <div flex flex-col lg:flex-row lg:items-center gap-3 flex-1>
          <span text-sm font-semibold text-text-primary whitespace-nowrap>Filter:</span>
          <div flex gap-2 flex-wrap lg:flex-nowrap overflow-x-auto>
            {filterCities.map((city) => {
              const isActive = selectedFilter === city
              return (
                <Button key={city} type="button" variant="outline" size="sm"
                  onClick={() => onFilterClick(city)}
                  className={cn(
                    "h-auto py-2 px-4 text-[13px] font-normal rounded-2xl 
                     flex-shrink-0 shadow-none transition",
                    "bg-transparent border border-border-default text-text-secondary",
                    "hover:bg-bg-secondary hover:border-brand hover:text-text-primary",
                    isActive && "bg-bg-secondary border-brand text-text-primary 
                                 font-medium hover:bg-bg-secondary"
                  )}>
                  {city}
                </Button>
              )
            })}
          </div>
        </div>
        
        <Button type="submit" disabled={isSubmitting}
          className="rounded-full h-12 px-8 font-bold text-[15px] whitespace-nowrap 
              flex-shrink-0 w-full lg:w-auto shadow-none transition 
              hover:-translate-y-0.5 hover:shadow-brand-glow">
          {isSubmitting ? "Generating..." : "Generate Itinerary"}
        </Button>
      </div>
      
    </form>
  </div>
</section>
```

### Prompt 5.3 — `components/PopularDestinations.jsx`

```
Tolong buatkan `components/PopularDestinations.jsx` — section yang fetch list 
destinations dari /api/destinations dan render sebagai cards.

CLIENT component ("use client").

Imports:
- useState, useEffect from "react"
- Image from "next/image"

Props: { onCardClick }

State:
- destinations: []
- loading: true
- error: null

useEffect (mount sekali): 
  async fetchDestinations:
    try fetch("/api/destinations"), kalau !res.ok throw "Gagal fetch destinations"
    setDestinations(data || [])
    catch: console.error + setError(err.message)
    finally: setLoading(false)

JSX:
<section max-w-[1200px] mx-auto px-6 py-15 md:py-[60px]>
  <div mb-10>
    <h2 text-3xl font-bold text-text-primary mb-2>Popular destination</h2>
    <p text-base text-text-secondary>
      Discover the most loved destinations by travelers worldwide
    </p>
  </div>
  
  {loading ? (
    <div text-center py-10 text-text-secondary>Loading destinations...</div>
  ) : error ? (
    <div text-center py-10 text-red-500>
      ❌ {error}. Pastikan Supabase sudah ter-setup.
    </div>
  ) : destinations.length === 0 ? (
    <div text-center py-10 text-text-secondary>
      Belum ada destinations. Tambahkan via Supabase dashboard.
    </div>
  ) : (
    <div grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6>
      {destinations.map((destination) => {
        const cityName = destination.name.split(",")[0]
        return (
          <div key={destination.id} onClick={() => onCardClick(cityName)}
            className="bg-white rounded-2xl overflow-hidden cursor-pointer 
                transition border border-border-light hover:-translate-y-2 
                hover:shadow-large group">
            <div relative h-[180px] overflow-hidden>
              <Image src={destination.image} alt={destination.name} fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition duration-300 group-hover:scale-[1.08]"/>
              <span className="absolute top-3 left-3 z-10 bg-white px-3 py-1.5 
                  rounded-full text-xs font-semibold text-text-primary shadow-subtle">
                {destination.tag}
              </span>
            </div>
            <div p-5>
              <p text-xs text-text-muted mb-1>Your City → {cityName}</p>
              <h3 text-lg font-semibold text-text-primary mb-2>{destination.name}</h3>
              <p text-xs text-text-secondary mb-3>Explore with AI Planner</p>
              <div flex items-baseline gap-1>
                <span text-xs text-text-muted>From</span>
                <span text-lg font-bold text-text-primary>AI Trip</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )}
</section>
```

### Prompt 5.4 — `components/Modal.jsx`

```
Tolong buatkan `components/Modal.jsx` — modal AI Planner yang punya 2 view: 
form planner DAN result (setelah generate). Pakai shadcn Dialog (Radix) yang 
sudah handle escape, backdrop click, focus trap, scroll lock otomatis.

CLIENT component ("use client").

Imports:
- Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription 
  from "@/components/ui/dialog"
- Button from "@/components/ui/button"
- Input from "@/components/ui/input"
- Label from "@/components/ui/label"
- Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
  from "@/components/ui/select"
- cn from "@/lib/utils"

Const MODAL_INPUT (beda dari hero — pakai rounded-wp-sm bukan rounded-full):
  "rounded-wp-sm h-12 px-4 text-[15px] bg-white shadow-none border-border-default 
   text-text-primary placeholder:text-text-muted focus-visible:ring-[3px] 
   focus-visible:ring-brand-light focus-visible:border-brand focus-visible:ring-offset-0"

Props: { isOpen, onClose, formData, onChange, onSubmit, isSubmitting, 
         itineraryResult, onSaveTrip, onNewTrip, isSaving }

Helper:
- handleOpenChange(open): kalau !open, panggil onClose()
- handleChange(field): return (e) => onChange({ ...formData, [field]: e.target.value })

JSX:
<Dialog open={isOpen} onOpenChange={handleOpenChange}>
  <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden 
      flex flex-col gap-0 p-0">
    <DialogHeader className="p-6 border-b border-border-default space-y-2">
      <DialogTitle className="text-[22px] font-bold">AI Travel Planner</DialogTitle>
      {!itineraryResult && (
        <DialogDescription className="text-text-secondary">
          Let our AI create your perfect personalized itinerary
        </DialogDescription>
      )}
    </DialogHeader>
    
    <div className="p-6 overflow-y-auto flex-1">
      {!itineraryResult ? (
        // ===== FORM VIEW =====
        <form onSubmit={onSubmit} className="space-y-5">
          <div space-y-2>
            <Label htmlFor="modal-destination" text-sm font-semibold>Destination</Label>
            <Input id="modal-destination" type="text" value={formData.destination}
              onChange={handleChange("destination")} 
              placeholder="e.g., Bali, Tokyo, Paris..."
              required className={MODAL_INPUT} />
          </div>
          
          <div grid grid-cols-2 gap-4>
            <div space-y-2>
              <Label htmlFor="modal-days" text-sm font-semibold>Days</Label>
              <Input id="modal-days" type="number" value={formData.days}
                onChange={handleChange("days")} min={1} max={14}
                required className={MODAL_INPUT} />
            </div>
            
            <div space-y-2>
              <Label htmlFor="modal-budget" text-sm font-semibold>Budget</Label>
              <Select value={formData.budget} 
                onValueChange={(value) => onChange({...formData, budget: value})}>
                <SelectTrigger id="modal-budget" className={cn(MODAL_INPUT, "w-full")}>
                  <SelectValue placeholder="Pilih budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="budget">Budget</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div space-y-2>
            <Label htmlFor="modal-interests" text-sm font-semibold>Interests</Label>
            <Input id="modal-interests" type="text" value={formData.interests}
              onChange={handleChange("interests")} 
              placeholder="e.g., food, culture, adventure, beaches..."
              className={MODAL_INPUT} />
          </div>
          
          <Button type="submit" disabled={isSubmitting}
            className="w-full h-14 rounded-wp-sm font-semibold text-base mt-2 
                shadow-none transition hover:-translate-y-0.5 hover:shadow-brand-glow">
            {isSubmitting ? "Magic is happening... 🪄" : "Generate Itinerary"}
          </Button>
        </form>
      ) : (
        // ===== RESULT VIEW =====
        <div className="animate-slide-up">
          <div flex justify-between items-center mb-5 pb-4 border-b border-border-default>
            <h3 text-xl font-bold>Your Itinerary</h3>
            <div flex gap-2>
              <Button onClick={onSaveTrip} disabled={isSaving}
                className="rounded-full h-10 px-5 font-semibold text-sm shadow-none">
                {isSaving ? "💾 Saving..." : "💾 Save"}
              </Button>
              <Button onClick={onNewTrip} variant="outline"
                className="rounded-full h-10 px-4 font-medium text-sm shadow-none">
                + New
              </Button>
            </div>
          </div>
          <div className="itinerary-result" 
               dangerouslySetInnerHTML={{ __html: itineraryResult }} />
        </div>
      )}
    </div>
  </DialogContent>
</Dialog>

CATATAN: itineraryResult sudah disanitize via DOMPurify di page.jsx 
SEBELUM di-pass ke sini. Jadi aman pakai dangerouslySetInnerHTML.
```

### Prompt 5.5 — `components/SavedTripsView.jsx`

```
Tolong buatkan `components/SavedTripsView.jsx` — view "My Trips" yang 
menampilkan list saved trips dari Supabase, dengan tombol delete pakai shadcn 
AlertDialog (pengganti confirm() bawaan).

CLIENT component ("use client").

Imports:
- Button from "@/components/ui/button"
- AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger from "@/components/ui/alert-dialog"

Props: { trips, loading, error, onDelete, onStartPlanning }

Helper: 
function formatDate(dateString) {
  if (!dateString) return ""
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric"
  })
}

JSX:
<section max-w-[1200px] mx-auto px-6 py-15 md:py-[60px] min-h-[60vh]>
  <div mb-10>
    <h2 text-3xl font-bold text-text-primary mb-2>My Saved Trips</h2>
    <p text-base text-text-secondary>Your travel planning history</p>
  </div>
  
  {loading ? (
    <div text-center py-20 text-text-secondary>Loading saved trips...</div>
  ) : error ? (
    <div text-center py-20 text-red-500>
      ❌ {error}. Pastikan Supabase sudah ter-setup.
    </div>
  ) : trips.length === 0 ? (
    // Empty state
    <div text-center py-20 px-10>
      <span text-6xl block mb-5>🗺️</span>
      <h3 text-2xl font-semibold mb-2>No saved trips yet</h3>
      <p text-text-secondary mb-6>Start planning your adventure with our AI Planner!</p>
      <Button onClick={onStartPlanning} 
        className="rounded-full h-auto px-7 py-3.5 font-semibold text-[15px] 
            shadow-none transition hover:-translate-y-0.5 hover:shadow-brand-glow">
        ✨ Start Planning
      </Button>
    </div>
  ) : (
    <div grid grid-cols-1 md:grid-cols-2 gap-6>
      {trips.map((trip) => (
        <div key={trip.id} 
          className="bg-white border border-border-default rounded-2xl p-6 
              transition hover:border-brand hover:shadow-medium">
          <div flex justify-between items-start mb-4>
            <div>
              <h3 text-lg font-semibold mb-1>📍 {trip.destination}</h3>
              <span text-text-secondary text-[13px]>
                {trip.days} days • {trip.budget} budget • {formatDate(trip.created_at)}
              </span>
            </div>
            
            {/* AlertDialog untuk konfirmasi delete */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" 
                  className="h-auto px-3.5 py-2 rounded-wp-xs text-[13px] font-normal 
                      shadow-none border-border-default text-text-secondary 
                      hover:text-red-500 hover:border-red-500 hover:bg-red-50">
                  🗑️ Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Hapus trip ini?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Trip ke <strong>{trip.destination}</strong> akan dihapus 
                    permanen. Aksi ini tidak bisa dibatalkan.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Batal</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDelete(trip.id)}
                    className="bg-destructive text-destructive-foreground 
                        hover:bg-destructive/90">
                    Hapus Trip
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          
          <div className="saved-trip-content" 
               dangerouslySetInnerHTML={{ __html: trip.itinerary }} />
        </div>
      ))}
    </div>
  )}
</section>
```

> **TEST**: Setelah Fase 5 selesai, halaman masih kosong. Lanjut ke Fase 6 untuk merangkai semua.

---

## 12. Prompt Fase 6 — Wire Up `page.jsx`

> **Tujuan**: Gabungkan semua component di `app/page.jsx` — ini "otak" dari aplikasi.

```
Tolong buatkan `app/page.jsx` — main page yang gabungkan semua component, 
handle semua state global, dan punya 2 view: "explore" dan "saved".

CLIENT component ("use client").

Imports:
- useState, useEffect from "react"
- DOMPurify from "dompurify"
- toast from "sonner"
- Navbar, Hero, PopularDestinations, StatsSection, EventsSection, 
  ReviewsSection, CTAHero, Footer, Modal, LoadingOverlay, SavedTripsView 
  dari @/components

Helper function sanitizeItinerary(html) — sanitize HTML dari AI biar aman XSS:
- Kalau typeof window === "undefined" return html (SSR safety)
- DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ["h1","h2","h3","p","ul","ol","li","strong","em","br","hr","div","span"],
    ALLOWED_ATTR: ["class","style"]
  })
  PENTING: ALLOWED_TAGS HARUS sesuai dengan tag yang di-emit parseMarkdown 
  di backend (lihat /api/generate-itinerary/route.js).

Const INITIAL_FORM = { destination: "", days: 3, budget: "moderate", interests: "" }

State (dalam Home component):
- view: "explore" (string: "explore" | "saved")
- isModalOpen: false
- formData: INITIAL_FORM
- selectedFilter: null (string atau null — untuk highlight pill)
- isGenerating: false
- itineraryResult: null
- savedTrips: []
- tripsLoading: false
- tripsError: null
- isSaving: false

useEffect: panggil fetchSavedTrips() sekali saat mount.

Function fetchSavedTrips() — async:
- setTripsLoading(true), setTripsError(null)
- fetch("/api/saved-trips") → res.json() → setSavedTrips(Array.isArray(data) ? data : [])
- catch: console.error, setTripsError(err.message)
- finally: setTripsLoading(false)

Handlers:

1. handleFilterClick(city):
   - setFormData(prev => ({...prev, destination: city}))
   - setSelectedFilter(city)

2. handleDestinationCardClick(cityName):
   - setFormData(prev => ({...prev, destination: cityName}))
   - setIsModalOpen(true)  // langsung buka modal

3. handleGenerateItinerary(e) — async:
   - e.preventDefault()
   - kalau !formData.destination.trim(): toast.error("Tolong isi destinasi dulu.") + return
   - setIsGenerating(true), setItineraryResult(null)
   - kalau !isModalOpen: setIsModalOpen(true)  // hero submit → buka modal
   - try:
       fetch("/api/generate-itinerary", POST, body: {
         destination: trim, days: parseInt, budget, 
         style: interests.trim() || "general sightseeing and local experiences"
       })
       const data = await res.json()
       kalau !res.ok || !data.success:
         status 429: toast.warning("Rate Limit", { description: "Tunggu 1-2 menit lalu coba lagi." })
         else: toast.error("Gagal generate itinerary", { description: data.error || "Coba lagi nanti." })
         return
       setItineraryResult(sanitizeItinerary(data.itinerary))   // SANITIZE!
   - catch: toast.error("Connection error", { description: "Pastikan kamu online dan coba lagi." })
   - finally: setIsGenerating(false)

4. handleSaveTrip() — async:
   - kalau !itineraryResult: toast.error("Tidak ada itinerary untuk disimpan.") + return
   - setIsSaving(true)
   - try fetch("/api/saved-trips", POST, body: { destination, days: parseInt, 
     budget, interests, itinerary: itineraryResult })
   - kalau !res.ok || !data.success: throw new Error(data.error || "Gagal menyimpan trip")
   - toast.success("Trip berhasil disimpan!", { description: `${destination} • ${days} hari` })
   - fetchSavedTrips()  // refresh list
   - catch: toast.error("Gagal menyimpan trip", { description: err.message })
   - finally: setIsSaving(false)

5. handleDeleteTrip(tripId) — async:
   - fetch(`/api/saved-trips?id=${tripId}`, { method: "DELETE" })
   - kalau gagal: throw
   - toast.success("Trip berhasil dihapus")
   - fetchSavedTrips()
   - catch: toast.error("Gagal menghapus trip", { description: err.message })

6. handleNewTrip(): 
   - setItineraryResult(null), setFormData(INITIAL_FORM), setSelectedFilter(null)

7. handleOpenPlanner(): 
   - setItineraryResult(null), setIsModalOpen(true)

8. handleCloseModal(): 
   - setIsModalOpen(false)
   - JANGAN reset itineraryResult — biar kalau buka modal lagi masih ada result

JSX:
<>
  <Navbar view={view} onViewChange={setView} onOpenPlanner={handleOpenPlanner} />
  
  {view === "explore" ? (
    <>
      <Hero 
        formData={formData} onChange={setFormData}
        onSubmit={handleGenerateItinerary} isSubmitting={isGenerating}
        selectedFilter={selectedFilter} onFilterClick={handleFilterClick} />
      
      <main className="animate-fade-in">
        <PopularDestinations onCardClick={handleDestinationCardClick} />
        <StatsSection />
        <EventsSection />
        <ReviewsSection />
        <CTAHero />
      </main>
    </>
  ) : (
    <main className="pt-32 animate-fade-in">
      <SavedTripsView 
        trips={savedTrips} loading={tripsLoading} error={tripsError}
        onDelete={handleDeleteTrip} onStartPlanning={handleOpenPlanner} />
    </main>
  )}
  
  <Footer />
  
  <Modal 
    isOpen={isModalOpen} onClose={handleCloseModal}
    formData={formData} onChange={setFormData}
    onSubmit={handleGenerateItinerary} isSubmitting={isGenerating}
    itineraryResult={itineraryResult}
    onSaveTrip={handleSaveTrip} onNewTrip={handleNewTrip}
    isSaving={isSaving} />
  
  <LoadingOverlay show={isGenerating} />
</>

PENTING: JANGAN lupa sanitize itineraryResult pakai sanitizeItinerary() 
SEBELUM setState. Itu satu-satunya pertahanan dari XSS attack.
```

> **TEST**: Run `npm run dev`. Buka http://localhost:3000 — harusnya udah keliatan full UI Waypoint!
> 
> Coba juga:
> - Klik nav "My Trips" → harus pindah view (kosong dulu)
> - Klik nav "Destinations" → balik ke explore
> - Klik tombol "AI Planner" → modal kebuka
> - Submit form di hero atau modal → AI generate itinerary di modal
> - Klik "💾 Save" → trip masuk ke "My Trips"
> - Hapus trip → muncul AlertDialog konfirmasi

---

## 13. Prompt Fase 7 — Polish (Error, Loading, Not Found)

> File-file ini bukan wajib tapi bikin app terasa profesional. Next.js otomatis pakai mereka.

### Prompt 7.1 — `app/error.jsx`

```
Tolong buatkan `app/error.jsx` — global error boundary Next.js. Tampil saat ada 
unhandled error di component pages. Beri user UI ramah, bukan stack trace.

CLIENT component ("use client").

Imports:
- useEffect from "react"

Function Error({ error, reset }):
- useEffect: console.error("App error:", error) — log untuk debug
- Return:

<div min-h-screen flex items-center justify-center px-6 bg-bg-secondary>
  <div max-w-md w-full text-center>
    <span text-6xl block mb-6>😕</span>
    <h1 text-3xl font-bold text-text-primary mb-3>Oops! Ada yang salah</h1>
    <p text-text-secondary mb-8>
      {error?.message || "Terjadi kesalahan tidak terduga. Coba lagi atau reload halaman."}
    </p>
    <div flex flex-col sm:flex-row gap-3 justify-center>
      <button onClick={reset}
        className="px-6 py-3 bg-brand text-[#1a1a1a] rounded-full font-bold 
            transition hover:bg-brand-hover hover:-translate-y-0.5 hover:shadow-brand-glow">
        Coba Lagi
      </button>
      <a href="/"
        className="px-6 py-3 border border-border-default rounded-full 
            font-medium text-text-secondary transition hover:bg-bg-tertiary 
            hover:text-text-primary">
        Kembali ke Beranda
      </a>
    </div>
  </div>
</div>
```

### Prompt 7.2 — `app/not-found.jsx`

```
Tolong buatkan `app/not-found.jsx` — custom 404 page. Tampil saat user akses 
URL yang tidak ada.

Server component (TIDAK ada "use client").

Imports:
- Link from "next/link"

Export metadata: { title: "Page Not Found" }

Function NotFound():
<div min-h-screen flex items-center justify-center px-6 bg-bg-secondary>
  <div max-w-md w-full text-center>
    <span text-7xl block mb-6>🗺️</span>
    <h1 text-5xl font-bold text-text-primary mb-3>404</h1>
    <p text-xl text-text-secondary mb-2>Halaman tidak ditemukan</p>
    <p text-text-muted mb-8>
      Sepertinya kamu nyasar di tempat yang tidak ada di peta.
    </p>
    <Link href="/" 
      className="inline-block px-6 py-3 bg-brand text-[#1a1a1a] rounded-full 
          font-bold transition hover:bg-brand-hover hover:-translate-y-0.5 
          hover:shadow-brand-glow">
      ✨ Kembali ke Beranda
    </Link>
  </div>
</div>
```

### Prompt 7.3 — `app/loading.jsx`

```
Tolong buatkan `app/loading.jsx` — loading UI Next.js. Otomatis dipakai sebagai 
Suspense boundary fallback saat halaman lagi load.

Server component.

<div min-h-screen flex flex-col items-center justify-center gap-6 bg-white>
  <div className="w-16 h-16 rounded-full border-4 border-border-light 
       border-t-brand animate-spin"
       style={{ boxShadow: "0 0 20px rgba(139, 255, 102, 0.2)" }} />
  <p text-lg font-bold text-text-primary tracking-tight>Loading Waypoint...</p>
</div>
```

---

## 14. Checklist Akhir & Test

Sebelum dianggap selesai, cek satu-satu:

### Struktur Folder
```
waypoint-nextjs/
├── app/
│   ├── api/
│   │   ├── generate-itinerary/route.js   ✅
│   │   ├── destinations/route.js         ✅
│   │   └── saved-trips/route.js          ✅
│   ├── layout.jsx                        ✅
│   ├── page.jsx                          ✅
│   ├── globals.css                       ✅
│   ├── error.jsx                         ✅
│   ├── not-found.jsx                     ✅
│   └── loading.jsx                       ✅
├── components/
│   ├── ui/ (shadcn — button, input, label, select, dialog, alert-dialog, card)  ✅
│   ├── Navbar.jsx                        ✅
│   ├── Hero.jsx                          ✅
│   ├── PopularDestinations.jsx           ✅
│   ├── StatsSection.jsx                  ✅
│   ├── EventsSection.jsx                 ✅
│   ├── ReviewsSection.jsx                ✅
│   ├── CTAHero.jsx                       ✅
│   ├── Footer.jsx                        ✅
│   ├── Modal.jsx                         ✅
│   ├── LoadingOverlay.jsx                ✅
│   └── SavedTripsView.jsx                ✅
├── lib/
│   ├── supabase.js                       ✅
│   └── utils.js (auto dari shadcn)       ✅
├── tailwind.config.js                    ✅
├── next.config.js                        ✅
├── jsconfig.json                         ✅
├── postcss.config.js                     ✅
├── components.json (auto dari shadcn)    ✅
├── package.json                          ✅
├── .env.local (BERISI nilai!)            ✅
├── .env.example                          ✅
└── .gitignore (TERMASUK .env.local)      ✅
```

### Functional Test (jalankan `npm run dev` lalu test di browser):

- [ ] Halaman home muncul lengkap (hero + popular destinations + stats + events + reviews + CTA + footer)
- [ ] Navbar fixed di atas, klik "Destinations" / "My Trips" toggle view
- [ ] Mobile: hamburger menu animate jadi X saat dibuka
- [ ] Hero form: isi destination + days + budget + interests, klik "Generate Itinerary" → modal kebuka, loading muncul, lalu itinerary tampil
- [ ] Filter pills (Bali/Tokyo/Paris/...) → klik isi destination + highlight border hijau
- [ ] Popular Destinations card → klik buka modal dengan destination terisi
- [ ] Modal "+ New" → reset form jadi kosong
- [ ] Modal "💾 Save" → toast success muncul, trip masuk ke My Trips
- [ ] My Trips view: klik 🗑️ Delete → AlertDialog muncul (Batal / Hapus Trip)
- [ ] Klik tombol "AI Planner" di navbar → modal kebuka, form kosong
- [ ] Tutup modal pakai ESC, klik X, atau klik backdrop — semua bisa
- [ ] Buka URL random (e.g. `/asal`) → 404 page muncul
- [ ] Generate ulang berkali-kali → pastikan `maxOutputTokens: 8192` sehingga multi-day itinerary lengkap (tidak terpotong)
- [ ] Refresh browser → saved trips tetap ada (karena di Supabase, bukan localStorage)

### Build Test:

```bash
npm run build
```

Harus selesai tanpa error. Kalau muncul "Module not found" → cek import path. Kalau "ReferenceError: x is not defined" → cek props yang di-pass.

---

## 15. Troubleshooting

| Masalah | Kemungkinan Penyebab | Solusi |
|---|---|---|
| `Module not found: Can't resolve '@/components/...'` | jsconfig.json tidak ada / path alias salah | Cek `jsconfig.json` → `paths: { "@/*": ["./*"] }` |
| `GEMINI_API_KEY is not defined` | `.env.local` belum di-set atau dev server belum restart | Cek `.env.local`, restart `npm run dev` |
| API `/destinations` return error | Supabase env belum di-set / SQL belum di-run | Cek `.env.local`, run SQL di Supabase SQL Editor |
| Image error: "hostname not configured" | `next.config.js` belum whitelist domain | Tambah hostname di `images.remotePatterns` |
| Itinerary muncul tapi cuma 1 hari | `maxOutputTokens` di-set lebih kecil dari 8192 | Wajib `maxOutputTokens: 8192` |
| Toast tidak muncul | Lupa `<Toaster />` di `layout.jsx` | Tambah `<Toaster />` di `<body>` di layout |
| HTML itinerary tidak ke-style | `globals.css` tidak punya `.itinerary-result {}` rules | Cek globals.css ada rules untuk `.itinerary-day`, `.itinerary-section`, dst |
| `useState is not defined` | Lupa "use client" di atas file | Tambah `"use client";` di baris 1 |
| Build crash di Vercel | env vars belum di-set di Vercel project | Settings → Environment Variables → tambahkan 3 keys |
| AlertDialog / Dialog tidak muncul | shadcn install gagal / belum add | `npx shadcn@latest add dialog alert-dialog` |
| Tailwind class tidak apply | `content` di tailwind.config.js tidak include folder | Cek `content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"]` |

---

## 🎉 Selamat!

Kalau semua checklist di atas tercentang, kamu sudah berhasil membangun **Waypoint Next.js** — full-stack AI app yang **production-ready**!

### Bonus: Deploy ke Vercel

1. Push project ke GitHub
2. Buka https://vercel.com → login pakai GitHub
3. **Add New → Project** → pilih repo `waypoint-nextjs`
4. Di section "Environment Variables", tambahkan 3 keys: `GEMINI_API_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
5. Klik **Deploy** → tunggu ~2 menit → kamu dapat URL public!

### Apa yang dipelajari dari project ini?

- ✅ React Server vs Client Components
- ✅ Next.js App Router (file-based routing)
- ✅ Tailwind CSS + design tokens custom
- ✅ shadcn/ui (Radix UI primitives)
- ✅ Supabase database + RLS policies
- ✅ API routes & serverless functions
- ✅ Environment variables (public vs server-only)
- ✅ XSS protection dengan DOMPurify
- ✅ Toast notifications dengan Sonner
- ✅ Form handling tanpa library tambahan
- ✅ Conditional rendering & state lifting
- ✅ Deployment ke Vercel

**Selamat ngoding! 🚀⛰️**

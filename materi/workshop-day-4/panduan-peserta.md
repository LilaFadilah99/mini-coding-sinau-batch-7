# Panduan Peserta — Day 4 Workshop Waypoint

**Selamat datang di Day 4 — sesi terakhir!** Hari ini kita akan upgrade Waypoint kalian jadi aplikasi web modern yang **online di internet**, lengkap dengan:

- AI Gemini real (bukan demo lagi)
- Migrasi ke Next.js (framework React modern)
- Database real (Supabase)
- API endpoint sendiri
- Deploy ke Vercel — Waypoint kalian bisa diakses dari mana saja!

---

## ⚠️ Set Ekspektasi Hari Ini

Day 4 adalah hari **paling padat** dengan banyak konsep baru:

- React & Next.js (framework yang dipakai banyak company besar)
- Database real (Supabase)
- Production deployment

**Realistis:** kalian TIDAK akan langsung jago semua dalam 2 jam. Itu butuh berminggu-minggu praktik.

**Yang akan kalian dapat hari ini:**

- ✅ **EKSPOSISI** ke konsep React, Next.js, database, deployment (kalian "tahu" tools-nya)
- ✅ **BUKTI HASIL** — URL live Waypoint kalian sendiri yang bisa di-share ke teman/keluarga
- ⏸️ Mastery? Itu PR di rumah.

**Mode hari ini:** Trainer demo cepat → kalian ikuti pakai template yang sudah disiapkan. Kalau ketinggalan, jangan panik — panduan ini bisa kalian baca pelan-pelan di rumah.

---

## Sebelum Mulai

Pastikan **H-1 sebelum sesi**, kamu sudah:

- [ ] Punya akun GitHub (https://github.com/signup)
- [ ] Punya akun Supabase (https://supabase.com)
- [ ] Punya akun Vercel (https://vercel.com — login pakai GitHub)
- [ ] Install Node.js versi 18+ (https://nodejs.org)
- [ ] Install Git (https://git-scm.com)

Sebelum sesi mulai:

- [ ] AI tools terbuka (untuk bantuan kalau stuck)
- [ ] Browser, VS Code, Terminal terbuka
- [ ] API key Gemini dari Day 3 (atau bisa dapat baru di https://aistudio.google.com/app/apikey)

---

## Flow Hari Ini

```
STEP 1 → Clone Starter Next.js + Setup AI Gemini
   ↓
STEP 2 → Migrasi Konten Waypoint ke Next.js
   ↓
STEP 3 → Setup Database (Supabase) + Test Endpoints
   ↓
STEP 4 → Update Frontend Pakai Endpoint Database
   ↓
STEP 5 → Push ke GitHub + Deploy ke Vercel
   ↓
SELESAI — Waypoint kamu ONLINE di internet 🎉
```

---

# STEP 1 — Clone Starter Next.js + Setup AI Gemini

**Tujuan:** Dapatkan project Next.js yang sudah ter-scaffold, jalankan di laptop, dan pastikan AI Gemini connect.

## Apa Itu Next.js?

Singkat: **Next.js** = framework yang pakai React, plus fitur seperti routing otomatis, API routes, optimasi performa, dan deployment mudah ke Vercel. Banyak website besar pakai Next.js (TikTok, Twitch, Notion, dll).

Buat hari ini, kalian tidak perlu paham 100% Next.js. Cukup tahu:

- File `app/page.js` = halaman utama (mirip `index.html`)
- File `app/api/.../route.js` = backend API (mirip serverless function Day 3)
- File `app/globals.css` = stylesheet (mirip `style.css`)

## 1A. Clone Starter Repo

Trainer akan kasih link ke `waypoint-nextjs-starter`. Buka terminal, masuk ke folder kerja kamu, lalu:

```bash
git clone <URL_STARTER_REPO> waypoint-nextjs
cd waypoint-nextjs
npm install
```

Tunggu install selesai (1-2 menit).

## 1B. Setup Environment Variables

Buat file `.env.local` di root project, isi:

```
GEMINI_API_KEY=AIza...
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

(Untuk sekarang, isi `GEMINI_API_KEY` saja. Supabase nanti di STEP 3.)

> **Catatan:** untuk pakai Gemini API key sendiri, dapatkan dari https://aistudio.google.com/app/apikey

## 1C. Run Development Server

Di terminal:

```bash
npm run dev
```

Buka browser di `http://localhost:3000`. **Yang harusnya terjadi:** halaman skeleton tampil (mungkin masih kosong atau ada placeholder). Itu normal — kita isi di STEP 2.

## 1D. Test API Gemini

Buka tab baru di browser → buka Developer Tools (F12) → Console. Paste:

```javascript
fetch("/api/generate-itinerary", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    destination: "Bali",
    days: 3,
    budget: "moderate",
    style: "beach and food",
  }),
})
  .then((r) => r.json())
  .then((data) => console.log(data));
```

Tunggu 5-15 detik. Yang harusnya muncul:

```
{ success: true, itinerary: "<h3>...</h3>..." }
```

Kalau muncul → AI Gemini kamu sudah CONNECT! ✅

### Kalau Error

- `success: false, error: "Server tidak terkonfigurasi"` → Cek `.env.local`, pastikan `GEMINI_API_KEY` ada dan valid
- Error 429 → Rate limit Gemini, tunggu 1-2 menit
- Error lain → Tanya trainer atau pakai API key trainer

---

# STEP 2 — Migrasi Konten Waypoint ke Next.js + Tailwind CSS

**Tujuan:** Salin konten Waypoint Day 3 ke `app/page.js`, pakai **Tailwind CSS** untuk styling — biar tidak perlu nulis ratusan baris CSS lagi.

## Konsep Baru: Tailwind CSS

Di Day 2-3, kita bikin file `style.css` yang panjang (~1.500 baris). Tiap class kita definisikan: warna, padding, hover, responsive, dll.

**Tailwind CSS** = pendekatan beda. Kita pakai **utility classes** yang sudah disiapkan, langsung di HTML/JSX. Tidak perlu file CSS panjang.

```jsx
// Day 2-3 style (CSS file panjang):
<button className="btn-ai-planner">AI Planner</button>
// + 30 baris di style.css untuk .btn-ai-planner

// Tailwind style (langsung di JSX):
<button className="flex items-center gap-2 px-6 py-3 bg-accent text-black rounded-full font-bold hover:bg-accent-hover hover:-translate-y-0.5 transition">
  AI Planner
</button>
// Tidak perlu nulis CSS sama sekali!
```

**Kenapa Tailwind?**

- Sangat cepat — gak perlu pikir nama class, gak perlu pindah-pindah file
- Ringan — Tailwind otomatis hapus class yang gak dipakai (auto-purge)
- Mainstream — banyak company besar pakai (Vercel, Netflix, Stripe, dll)
- AI-friendly — AI sangat fasih generate Tailwind

> **Catatan jujur:** awalnya Tailwind kelihatan "berisik" karena class-nya banyak di JSX. Tapi setelah biasa, kalian akan suka — gak balik ke nulis CSS panjang lagi.

## Apa Itu JSX?

Sebelum mulai, kenalan dulu dengan **JSX** — gabungan HTML & JavaScript yang dipakai React. Mirip HTML tapi ada beda kunci:

| HTML                   | JSX                                       |
| ---------------------- | ----------------------------------------- |
| `class="..."`          | `className="..."`                         |
| `for="..."` (di label) | `htmlFor="..."`                           |
| `<img src="..." />`    | `<img src="..." alt="..." />` (alt wajib) |
| Comment `<!-- -->`     | Comment `{/* */}`                         |

## Custom Theme Waypoint di Tailwind

Starter repo sudah include `tailwind.config.js` dengan **theme khas Waypoint** sudah ter-konfigurasi:

```js
// Sudah disiapkan di starter — kalian gak perlu setup
colors: {
  accent: '#8bff66',           // hijau neon Waypoint
  'accent-hover': '#7ae356',
  'text-primary': '#1e293b',
  'text-secondary': '#64748b',
  'text-muted': '#94a3b8',
  // ...
}
```

Jadi kalian bisa langsung pakai `bg-accent`, `text-text-secondary`, `shadow-xl-soft`, dll. Tidak perlu hardcode hex code.

## 2A. Konversi HTML Day 3 → JSX + Tailwind

Pakai prompt ini ke AI:

```
Aku migrasi project HTML+CSS Day 3 ke Next.js + Tailwind CSS.

Yang aku punya:
1. HTML body dari index.html Day 3:
[paste isi <body> dari index.html Day 3 kamu]

2. CSS dari style.css Day 3:
[paste isi style.css kamu]

Yang aku mau:
- Convert ke JSX (React) yang pakai Tailwind utility classes (BUKAN class CSS biasa)
- Untuk style yang KHAS Waypoint, pakai theme tokens custom:
  * Warna utama: bg-accent (#8bff66), bg-accent-hover (#7ae356)
  * Text: text-text-primary, text-text-secondary, text-text-muted
  * Background: bg-bg-secondary, bg-bg-tertiary
  * Shadow: shadow-subtle, shadow-medium, shadow-large, shadow-xl-soft
  * Font sudah Plus Jakarta Sans (default)
- Untuk hover/transition, pakai Tailwind utility (hover:, transition, dll)
- Untuk responsive, pakai prefix Tailwind (md:, lg:)
- Tampilkan kode JSX lengkap untuk component Home, siap aku paste ke app/page.js

Format component:
'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  return (
    <>
      {/* JSX dengan Tailwind di sini */}
    </>
  );
}

Pakai komentar BAHASA INDONESIA di section utama.
```

Save hasil AI ke `app/page.js`.

> **Catatan penting:** baris pertama `'use client';` **WAJIB** karena page pakai interaktivitas (event handler, state). Tanpa itu, error.

## 2B. Pindahkan Style Khas Waypoint ke globals.css (Minimal)

Hampir semua styling sudah pakai Tailwind utility. Yang **tetap di globals.css** hanya yang spesifik Waypoint dan tidak praktis di Tailwind utility:

1. **Itinerary content styling** — karena hasil AI di-render via `innerHTML` (HTML murni), butuh CSS class biasa
2. **Custom keyframes animation** — kalau ada animation yang kompleks
3. **Hero overlay gradient** kompleks (3-stop)

Buka `app/globals.css`. Pastikan isinya seperti ini (starter sudah punya, tinggal verifikasi):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Itinerary content styling — hasil AI di-render via innerHTML */
.itinerary-day {
  font-size: 15px;
  font-weight: 600;
  margin: 20px 0 12px;
  padding: 12px 16px;
  background: #8bff66;
  border-radius: 6px;
}

.itinerary-section {
  font-size: 18px;
  font-weight: 600;
  margin: 20px 0 12px;
  padding: 10px 14px;
  background: #f1f5f9;
  border-radius: 6px;
  border-left: 3px solid #8bff66;
}

.itinerary-list {
  padding: 0;
  margin: 0 0 16px;
  list-style: none;
}

.itinerary-list li {
  padding: 12px 14px;
  margin-bottom: 8px;
  background: #f8fafc;
  border-radius: 6px;
  border-left: 2px solid #e2e8f0;
}

.itinerary-text {
  margin-bottom: 12px;
  color: #64748b;
  line-height: 1.8;
}

.itinerary-divider {
  border: none;
  height: 1px;
  background: #e2e8f0;
  margin: 20px 0;
}

/* Hero overlay gradient (kompleks untuk Tailwind utility) */
.hero-overlay {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    rgba(255, 255, 255, 1) 100%
  );
}
```

> **Catatan:** kalau peserta perhatikan, file `globals.css` sekarang jauh lebih pendek dari `style.css` Day 3 (1.500+ baris). Itu kekuatan Tailwind — sebagian besar styling pindah ke utility classes di JSX.

## 2C. Convert JavaScript Logic ke React Hooks

Ini bagian paling tricky. JavaScript Day 3 kamu (`js/app.js`) pakai DOM manipulation. Di React, kita pakai **state** dan **event handlers**.

**Pakai prompt ini ke AI:**

```
Aku punya JavaScript Day 3 di js/app.js (HTML/CSS/JS murni).
Aku migrasi ke Next.js + React — sudah ada JSX dengan Tailwind di app/page.js.

Yang aku punya di js/app.js:
[paste isi js/app.js Day 3 kamu]

Yang aku mau (UPDATE app/page.js yang sudah ada — JANGAN buat ulang):
1. Pakai useState untuk state yang berubah:
   - destination, days, budget, interests (form data)
   - isModalOpen (boolean: modal terbuka atau tidak)
   - isLoading (boolean: AI sedang generate)
   - itineraryHTML (string HTML hasil AI)
   - selectedFilter (untuk active state filter pill)
2. Pakai useEffect untuk:
   - Mobile menu close on outside click
3. Convert event listener (addEventListener) jadi event handler React:
   - onClick={...} untuk button
   - onChange={...} untuk input
   - onSubmit={...} untuk form
4. Untuk form submit: ganti fetch ke /api/generate-itinerary (sudah ada di starter)
   Pakai async/await
5. Untuk active state filter pill: pakai conditional className
   contoh: className={selectedFilter === 'Bali' ? 'bg-accent text-black' : 'bg-transparent'}
6. Tampilkan kode lengkap component-nya, siap aku paste ke app/page.js

Pakai komentar BAHASA INDONESIA.
```

Save hasil AI ke `app/page.js`.

## 2D. Verifikasi di Browser

Refresh `http://localhost:3000`. Yang harusnya terjadi:

- [ ] Tampilan Waypoint muncul (mungkin sedikit beda dari Day 3 — itu OK, Tailwind interpretasinya bisa sedikit beda)
- [ ] Warna hijau neon Waypoint ada
- [ ] Layout 3-bagian navbar, hero dengan form, popular destination grid muncul
- [ ] Tidak ada error merah di console

### Kalau Error

- "Hydration mismatch" → biasanya minor, refresh aja
- "useState is not defined" → cek import di top: `import { useState, useEffect } from 'react';`
- "Element type is invalid" → ada tag yang lupa di-convert (`class=` jadi `className=`)
- Class Tailwind gak ke-apply → cek `tailwind.config.js` content path benar (`./app/**/*.{js,jsx}`)
- Tampilan rusak total → fallback: minta trainer kasih `waypoint-nextjs-COMPLETE` repo

> **Realistis:** tampilan tidak akan 100% identik dengan Day 3 — itu OK! Tailwind versi mungkin sedikit beda spacing/warna. Yang penting **layout dan vibe Waypoint kelihatan**. Kalau mau tweak, refining ke AI dengan deskripsi spesifik.

## 💡 Insight: Kenapa Tailwind Lebih Cepat?

Kalian baru saja melihat **manfaat real Tailwind**: file `style.css` Day 3 yang **1.500+ baris** sekarang ter-replace dengan:
- `tailwind.config.js` (~30 baris konfigurasi theme)
- `globals.css` minimal (~50 baris untuk style yang spesifik)
- Utility classes langsung di JSX

**Tradeoff:**
- ✅ Hemat waktu nulis CSS
- ✅ Style co-located dengan markup (gak perlu pindah-pindah file)
- ❌ Class names di JSX jadi panjang
- ❌ Awal-awal harus belajar nama utility (tapi VS Code IntelliSense bantu)

Banyak senior developer modern pilih Tailwind karena **velocity-nya** sangat tinggi setelah biasa.

---

# STEP 3 — Setup Database (Supabase)

**Tujuan:** Bikin database real untuk simpan data destinations dan saved trips.

## Apa Itu Supabase?

Singkat: **Supabase** = database online (Postgres) yang bisa kalian akses dari aplikasi web. Mirip Excel sheet tapi:

- Bisa diakses lewat API
- Aman (auth, encryption)
- Free tier untuk learning

## 3A. Login & Buat Project

1. Buka https://supabase.com → login
2. Klik **"New project"**
3. Isi:
   - Project name: `waypoint`
   - Database password: pilih yang kuat (catat baik-baik!)
   - Region: pilih yang dekat (Singapore untuk Asia)
4. Klik **Create new project**
5. Tunggu 1-2 menit sampai project siap

## 3B. Buat Tabel + Seed Data

Di Supabase dashboard:

1. Klik menu **SQL Editor** (kiri)
2. Klik **New query**
3. Paste SQL ini:

```sql
-- Tabel untuk destinations populer
CREATE TABLE destinations (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image TEXT,
  tag TEXT
);

-- Tabel untuk saved trips
CREATE TABLE saved_trips (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  destination TEXT,
  days INTEGER,
  budget TEXT,
  interests TEXT,
  itinerary TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed data 4 destinations
INSERT INTO destinations (name, description, image, tag) VALUES
  ('Bali, Indonesia', 'Surga tropis dengan pantai indah, sawah hijau, dan budaya yang kaya.',
   'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80', '🏝️ Tropical'),
  ('Tokyo, Japan', 'Perpaduan modernitas dan tradisi, dari neon kota hingga kuil tenang.',
   'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80', '🏙️ Urban'),
  ('Paris, France', 'Kota cinta, seni, dan kuliner dengan landmark ikonik.',
   'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80', '🗼 Romantic'),
  ('Iceland', 'Negeri api dan es dengan landscape vulkanik dan aurora memukau.',
   'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&q=80', '❄️ Adventure');

-- Allow anonymous read (untuk demo workshop)
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read destinations" ON destinations FOR SELECT USING (true);

ALTER TABLE saved_trips ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public access saved_trips" ON saved_trips FOR ALL USING (true);
```

4. Klik **Run** → harus sukses tanpa error

## 3C. Verifikasi Data

Klik menu **Table Editor**. Pastikan:

- Tabel `destinations` ada, 4 baris data
- Tabel `saved_trips` ada, kosong

## 3D. Ambil Credentials

Klik menu **Settings** (kiri bawah) → **API**. Copy:

- **Project URL** (https://xxx.supabase.co)
- **anon public** key (string panjang)

Update `.env.local` di project Next.js:

```
GEMINI_API_KEY=AIza...
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
```

Restart dev server (Ctrl+C, lalu `npm run dev` lagi) — biar `.env.local` baru terbaca.

## 3E. Test Endpoints

Buka tab browser baru:

**Test endpoint destinations:**

```
http://localhost:3000/api/destinations
```

Yang harusnya muncul: JSON dengan 4 destinations dari Supabase.

**Test endpoint saved-trips:**

```
http://localhost:3000/api/saved-trips
```

Yang harusnya muncul: `[]` (array kosong).

Kalau dua-duanya muncul → endpoint kamu jalan! ✅

### Kalau Error

- `relation "destinations" does not exist` → Tabel belum dibuat. Cek SQL Editor.
- `Invalid API key` → URL/anon key salah di `.env.local`. Cek Settings → API.
- Fallback: trainer punya **shared instance Supabase** yang bisa kamu pakai (minta credentials).

---

# STEP 4 — Update Frontend Pakai Endpoint Database

**Tujuan:** Ganti `featuredDestinations` array yang hardcode di JS → fetch dari `/api/destinations`.

## Pakai Prompt Ini

```
Di app/page.js Next.js project-ku, sekarang aku ingin destinations
di-fetch dari API endpoint, bukan hardcode di array.

Yang aku mau:
1. Hapus const featuredDestinations = [...] yang hardcode
2. Tambah state: const [destinations, setDestinations] = useState([]);
3. Pakai useEffect untuk fetch data dari /api/destinations saat halaman load:
   - fetch('/api/destinations')
   - parse JSON
   - setDestinations(data)
4. Loop array destinations untuk render Popular Destination cards
   (bukan featuredDestinations lagi)

Tunjukkan kode lengkap app/page.js setelah update.
```

Save hasil AI ke `app/page.js`. Refresh browser. Yang harusnya terjadi:

- [ ] Section Popular Destination tetap muncul 4 cards
- [ ] Bedanya: data sekarang dari Supabase (bukan dari array hardcode)

> **Cara cek:** di Supabase, edit nama destinasi (misal "Bali, Indonesia" jadi "Bali, Indonesia 🌺"). Refresh browser → perubahan kelihatan tanpa edit kode! Itu kekuatan database.

---

# STEP 5 — Push ke GitHub + Deploy ke Vercel

**Tujuan:** Aplikasi kamu LIVE di internet dengan URL public.

## 5A. Push ke GitHub

Di terminal, di folder project:

```bash
git add .
git commit -m "Day 4: Migrate to Next.js + Supabase"
```

Buat repo baru di GitHub (https://github.com/new):

- Repo name: `waypoint-nextjs`
- Visibility: Public
- **JANGAN** centang init README/gitignore (karena starter sudah punya)
- Klik **Create repository**

Ikuti instruksi di GitHub untuk push existing repo:

```bash
git remote add origin https://github.com/USERNAME/waypoint-nextjs.git
git branch -M main
git push -u origin main
```

> **Kalau diminta password Git:** GitHub sekarang pakai Personal Access Token, bukan password. Lihat: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens

## 5B. Deploy ke Vercel

1. Buka https://vercel.com → login dengan GitHub
2. Klik **Add New** → **Project**
3. **Import** repo `waypoint-nextjs` yang baru kamu push
4. Di halaman config:
   - Framework Preset: Next.js (auto-detected)
   - **Environment Variables**: tambah 3 variable yang sama dengan `.env.local`:
     - `GEMINI_API_KEY` = `AIza...`
     - `NEXT_PUBLIC_SUPABASE_URL` = `https://xxx.supabase.co`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `eyJ...`
5. Klik **Deploy**

Tunggu 2-3 menit untuk build...

## 5C. Test Live URL!

Vercel akan kasih URL seperti `https://waypoint-nextjs-xxx.vercel.app`. Buka URL itu di browser.

**End-to-end test:**

- [ ] Halaman tampil normal
- [ ] Klik "AI Planner" → modal terbuka
- [ ] Submit form → loading → hasil AI tampil
- [ ] Section Popular Destination tampil 4 cards (dari Supabase)

Kalau semua jalan → **SELAMAT! WAYPOINT KAMU SUDAH ONLINE!** 🚀🚀🚀

Share URL ke teman, keluarga, screenshot ke status WA — kalian baru saja deploy aplikasi web fullstack dengan AI integration.

### Kalau Build Gagal

- Cek log build di Vercel — biasanya error karena import salah atau syntax JSX salah
- Mitigasi: trainer punya `waypoint-nextjs-COMPLETE` repo. Fork repo itu, deploy versi complete supaya kalian tetap dapat URL live untuk hari ini

### Kalau Tampilan Kosong / Error 500

- Cek **Environment Variables** di Vercel — pastikan 3 variable ter-set dengan benar (case sensitive!)
- Klik tombol **Redeploy** setelah fix env vars

---

# 🎉 SELAMAT! Workshop 4 Hari Selesai!

Sebelum sesi tutup, foto bareng layar dengan URL live kamu.

Kamu baru saja menyelesaikan workshop Fullstack JS + AI dari nol. Recap:

| Day | Yang Dipelajari                                                           |
| --- | ------------------------------------------------------------------------- |
| 1   | Konsep + Planning + Wireframe + 5 Prinsip Prompting                       |
| 2   | Build navbar, hero, popular destination (HTML/CSS)                        |
| 3   | JavaScript untuk interaktivitas (mobile menu, filter pills, render cards) |
| 4   | AI integration + Next.js + Database + Deploy                              |

Kalian sekarang punya:

- Pengalaman real bikin aplikasi web fullstack
- URL live yang bisa di-share
- Skill prompting AI untuk programming
- Mental model alur kerja: plan → build → connect → deploy

---

# 📝 PR Lanjutan (Untuk Yang Mau Lebih Dalam)

Hari ini cuma EKSPOSISI. Kalau mau benar-benar jago, kerjakan bertahap:

## Tier A — Polish Waypoint Kamu

- Selesaikan section yang belum dibangun di Day 2-3 (Stats, Events, Reviews, CTA, Footer)
- Build modal AI Planner + Loading overlay yang interaktif
- Save Trip ke Supabase (sekarang masih localStorage)
- Tambah view "My Trips" yang fetch dari `/api/saved-trips`

## Tier B — Komponentisasi React

Sekarang `app/page.js` masih besar dan monolitik. Pisahkan jadi komponen:

- `components/Navbar.jsx`
- `components/Hero.jsx`
- `components/PopularDestinations.jsx`
- `components/Modal.jsx`

Pakai prompt ke AI: _"Tolong pisahkan app/page.js ini jadi komponen-komponen terpisah di folder components/. Strukturnya..."_

## Tier C — Authentication

Tambah login/signup pakai Supabase Auth:

- User bisa login pakai email/Google
- Save trips di-link ke user_id
- View "My Trips" cuma tampilkan trips milik user itu

## Tier D — Custom Domain

Beli domain (Namecheap, GoDaddy, dll) → set DNS → tambah ke Vercel project. Waypoint kamu jadi `waypoint.kamu.com` (bukan `vercel.app`).

---

# 📚 Resource Belajar Lanjut

## React & Next.js

- [Official React Tutorial](https://react.dev/learn) — bahasa Inggris, but fundamental
- [Official Next.js Learn](https://nextjs.org/learn) — interaktif, gratis
- YouTube: cari "Next.js 14 tutorial Indonesia" — banyak content creator lokal

## Database

- [Supabase Quickstart](https://supabase.com/docs/guides/getting-started)
- Belajar SQL: [SQLBolt](https://sqlbolt.com/) interaktif gratis

## AI & Prompt Engineering

- Latih terus prompting di project lain — pola yang sama berlaku untuk apapun
- [Prompt Engineering Guide](https://www.promptingguide.ai/)

## Career

- Build 3-5 project kecil dengan pola sama — masukkan ke portfolio
- Push semua ke GitHub (recruiters lihat GitHub kamu)
- Deploy semua ke Vercel/Netlify (recruiters klik link, lihat hasil)

---

# Thank You!

Workshop selesai. Kalian sekarang **bisa coding pakai AI**, **paham fullstack flow**, dan punya **bukti nyata** (URL live).

Yang paling penting: **jangan stop di sini**. Skill ini butuh latihan terus. Build project lain, eksperimen, gagal, refine. Setiap kali stuck, ingat: prompting AI itu skill yang sudah kalian punya. Tinggal pakai.

Selamat ngoding, dan sampai bertemu di project berikutnya! 🚀

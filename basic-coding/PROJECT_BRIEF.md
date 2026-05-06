# Waypoint — Project Brief

> Travel planner berbasis AI untuk traveler pemula yang baru pertama kali ke luar negeri.
> **Single page · Vanilla JS · Gemini AI · Vercel**

---

## 1. Visi & Tujuan

**Visi:** Bikin perencanaan trip ke luar negeri jadi semudah ngobrol sama temen yang udah sering jalan-jalan.

**Kenapa project ini ada:**
- Banyak orang batal liburan ke luar negeri bukan karena nggak punya budget, tapi karena **nggak tau harus mulai dari mana**.
- Info di internet kebanyakan, terpencar, dan sering bikin makin bingung.
- Aplikasi travel yang ada kebanyakan kompleks — banyak fitur, tapi pemula malah keder duluan.
- Aku mau bikin tool yang **fokus ke satu hal**: kasih itinerary yang masuk akal dalam hitungan detik, tanpa ribet.

**Tujuan konkret di akhir workshop:**
- Punya 1 website live yang bisa di-share linknya.
- User bisa input: tujuan + budget + lama hari → keluar itinerary lengkap dari AI.
- Itinerary bisa disimpan di browser supaya nggak hilang waktu balik lagi.

---

## 2. Target User & Masalah Mereka

### Siapa target user-nya
Anak muda usia 22–32 tahun, kerja kantoran/freelance, **belum pernah** atau **baru sekali** ke luar negeri. Punya budget cukup, punya keinginan kuat, tapi takut salah langkah.

### Masalah yang mereka hadapi
| Masalah | Yang dirasakan user |
|---|---|
| **Decision fatigue** | "Hari pertama ngapain dulu? Hotel di area mana? Transport apa?" |
| **Takut budget jebol** | "Kalau ke Tokyo 5 hari 10 juta cukup nggak ya?" |
| **Info berserakan** | Buka 15 tab — blog, YouTube, Reddit — pulang-pulang malah pusing. |
| **Takut "salah pilih"** | Takut milih destinasi yang ternyata nggak cocok sama style mereka. |
| **Bahasa & culture shock** | Nggak tau apa yang harus disiapin sebelum berangkat. |

### Yang Waypoint kasih untuk solve itu
- **Form simpel** (3 field), bukan kuesioner panjang.
- **AI yang langsung kasih jawaban konkret** — itinerary per hari, bukan tips generik.
- **Popular destinations sebagai inspirasi** kalau user belum tau mau ke mana.
- **Reviews** dari traveler lain biar user yakin bukan cuma dia yang pernah newbie.

---

## 3. Daftar Fitur

### Wajib ada di V1 (yang dibikin selama workshop)
1. **Navbar sticky** dengan logo Waypoint + menu + tombol "Plan Now".
2. **Hero section** dengan headline besar + form planner (3 input: destinasi, budget, jumlah hari + tombol "Plan with AI").
3. **Popular Destinations** — 4 kartu destinasi (Bali, Tokyo, Paris, Seoul) dengan gambar, nama, harga estimasi, rating.
4. **Stats section** — angka pencapaian (jumlah trip dibuat, negara tercover, rating user).
5. **Events section** — list acara/festival travel yang sedang berlangsung.
6. **Reviews section** — 3–4 testimonial card dari user.
7. **CTA Banner** — ajakan terakhir buat mulai planning.
8. **Footer** — link sosmed, copyright, navigasi cepat.
9. **Popup AI Planner** — modal yang muncul setelah form di-submit, nampilin hasil itinerary dari Gemini.
10. **Loading animation** — spinner/skeleton saat nunggu response AI (penting karena Gemini bisa 3–8 detik).
11. **Save trip ke localStorage** — itinerary bisa disimpan & di-load lagi.
12. **Smooth scroll** antar section saat klik menu navbar.

### Bisa ditambahkan nanti (V2 ke atas)
- Login/akun user (pindah dari localStorage ke database).
- Share itinerary via link unik.
- Edit itinerary manual setelah di-generate AI.
- Currency converter di card destinasi.
- Filter destinasi berdasarkan budget/musim/tipe (pantai/kota/gunung).
- Mode kolaborasi (planning bareng temen).
- Export itinerary ke PDF.
- Integrasi dengan API booking (Skyscanner, Booking.com).
- Dark/light mode toggle (sekarang dark-only).
- Multi-bahasa (EN/ID).

---

## 4. Teknologi yang Dipakai

| Bagian | Pilihan | Alasan |
|---|---|---|
| **HTML5** | Vanilla | Pemula harus paham fondasi dulu sebelum framework. Nggak ada build step = nggak ada bug yang ngeselin. |
| **CSS3** | Vanilla + CSS Variables | Belajar layout (flexbox/grid) langsung tanpa abstraksi. CSS variables bikin theming gampang. |
| **JavaScript** | Vanilla ES6+ | DOM manipulation native = skill yang nempel seumur hidup. Skip framework biar fokus ke logika dasar. |
| **Backend** | Vercel Serverless Functions (Node.js) | Gratis, deploy auto dari Git, pas buat hide API key Gemini biar nggak bocor di frontend. |
| **AI** | Google Gemini API (free tier) | Gratis dengan limit yang generous, kualitas reasoning bagus untuk task itinerary. |
| **Storage** | `localStorage` browser | Nggak perlu setup database. Cocok buat MVP & workshop pemula. Data tetap ada walau browser ditutup. |
| **Font** | Plus Jakarta Sans (Google Fonts) | Modern, geometric, legibility tinggi, gratis, support multi-weight. |
| **Hosting** | Vercel | Free, otomatis HTTPS, deploy tinggal `git push`, support serverless function di project yang sama. |
| **Version control** | Git + GitHub | Standar industri, integrasi langsung sama Vercel. |

**Yang sengaja dihindari:**
- React / Vue / Svelte → terlalu kompleks untuk pemula, butuh build tooling.
- Laravel / Express → over-engineered untuk single endpoint AI call.
- Database (MySQL/Postgres/Firebase) → localStorage cukup buat scope ini.
- CSS framework (Tailwind/Bootstrap) → biar peserta paham CSS dasar, bukan utility class.

---

## 5. Design System

> Tema: **dark mode + neon accent**. Hijau neon `#8bff66` jadi bintang utama, sisanya supporting cast.

### 5.1 Warna

#### Primary (aksen utama)
| Token | Hex | Pakai untuk |
|---|---|---|
| `--color-primary` | `#8bff66` | Tombol utama, highlight, link aktif, ikon penting |
| `--color-primary-hover` | `#76e055` | State hover tombol primary |
| `--color-primary-soft` | `#c4ffaa` | Tag/badge yang lebih kalem |
| `--color-primary-glow` | `rgba(139, 255, 102, 0.35)` | Box-shadow glow di tombol & card hover |

#### Background & Surface
| Token | Hex | Pakai untuk |
|---|---|---|
| `--bg-base` | `#0a0a0a` | Background utama halaman |
| `--bg-surface` | `#141414` | Kartu, modal |
| `--bg-elevated` | `#1f1f1f` | Surface di atas surface (nested card) |
| `--bg-overlay` | `rgba(0, 0, 0, 0.7)` | Backdrop popup AI planner |

#### Border & Divider
| Token | Hex |
|---|---|
| `--border-subtle` | `#2a2a2a` |
| `--border-default` | `#3a3a3a` |
| `--border-strong` | `#525252` |

#### Text
| Token | Hex | Pakai untuk |
|---|---|---|
| `--text-primary` | `#ffffff` | Heading, body utama |
| `--text-secondary` | `#b3b3b3` | Subtext, deskripsi |
| `--text-muted` | `#707070` | Caption, footer, placeholder |
| `--text-on-primary` | `#0a0a0a` | Teks di atas tombol hijau (kontras tinggi) |

#### Status
| Token | Hex |
|---|---|
| `--color-success` | `#8bff66` |
| `--color-warning` | `#ffb84d` |
| `--color-error` | `#ff5c5c` |
| `--color-info` | `#66c2ff` |

### 5.2 Typography (Plus Jakarta Sans)

```
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
```

| Style | Size / Line-height | Weight | Pakai untuk |
|---|---|---|---|
| Display | 56px / 64px | 800 | Headline hero |
| H1 | 40px / 48px | 700 | Section title besar |
| H2 | 32px / 40px | 700 | Section title |
| H3 | 24px / 32px | 600 | Card title, subsection |
| H4 | 20px / 28px | 600 | Small heading |
| Body Large | 18px / 28px | 400 | Lead paragraph |
| Body | 16px / 24px | 400 | Default body text |
| Body Medium | 16px / 24px | 500 | Body yang sedikit ditebelin |
| Small | 14px / 20px | 400 | Caption, helper text |
| XS | 12px / 16px | 500 | Tag, badge, label uppercase |

**Letter spacing:** default normal, kecuali XS uppercase pakai `0.08em`.

### 5.3 Border Radius (Sudut Tumpul)

| Token | Nilai | Pakai untuk |
|---|---|---|
| `--radius-sm` | `8px` | Input field, small button, tag |
| `--radius-md` | `16px` | Card biasa, button medium |
| `--radius-lg` | `24px` | Card besar (destination card), modal |
| `--radius-xl` | `32px` | Hero card, CTA banner besar |
| `--radius-pill` | `999px` | Pill button, badge bulat, avatar |
| `--radius-full` | `50%` | Avatar lingkaran, ikon bulat |

### 5.4 Shadow / Bayangan

Karena dark theme, shadow lebih banyak pakai **glow** daripada drop shadow gelap.

| Token | Nilai | Pakai untuk |
|---|---|---|
| `--shadow-subtle` | `0 1px 2px rgba(0,0,0,0.4)` | Border separation halus |
| `--shadow-medium` | `0 4px 12px rgba(0,0,0,0.5)` | Card default |
| `--shadow-large` | `0 12px 32px rgba(0,0,0,0.6)` | Card hover, modal |
| `--shadow-xl` | `0 24px 64px rgba(0,0,0,0.7)` | Popup AI planner, dropdown besar |
| `--shadow-glow` | `0 0 24px rgba(139,255,102,0.4)` | Tombol primary, card terhighlight |
| `--shadow-glow-strong` | `0 0 48px rgba(139,255,102,0.55)` | Hover state tombol CTA utama |

### 5.5 Spacing (4px base)

| Token | Nilai |
|---|---|
| `--space-1` | `4px` |
| `--space-2` | `8px` |
| `--space-3` | `12px` |
| `--space-4` | `16px` |
| `--space-5` | `24px` |
| `--space-6` | `32px` |
| `--space-7` | `48px` |
| `--space-8` | `64px` |
| `--space-9` | `96px` |
| `--space-10` | `128px` |

**Aturan praktis:**
- Padding dalam card: `--space-5` (24px) atau `--space-6` (32px).
- Jarak antar section: `--space-9` (96px) di desktop, `--space-7` (48px) di mobile.
- Gap antar item dalam grid: `--space-5` (24px).

### 5.6 Breakpoint (responsive)

| Nama | Min-width |
|---|---|
| Mobile | 0 |
| Tablet | 640px |
| Desktop | 1024px |
| Wide | 1280px |

---

## 6. Wireframe Halaman

Single page, scroll vertikal dari atas ke bawah:

```
┌──────────────────────────────────────────────────────────────────┐
│ NAVBAR (sticky, blur background)                                 │
│ [Waypoint ▲]   Home  Destinations  Events  Reviews   [Plan Now] │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│ HERO                                                             │
│                                                                  │
│        Plan your first trip abroad without the headache.         │
│        AI bikin itinerary lengkap dalam 10 detik.                │
│                                                                  │
│   ┌────────────────────────────────────────────────────────┐    │
│   │ [ Mau ke mana? ] [ Budget (Rp) ] [ Berapa hari? ]      │    │
│   │                              [ Plan with AI ]          │    │
│   └────────────────────────────────────────────────────────┘    │
│                                                                  │
│             ↓ scroll for inspiration                             │
├──────────────────────────────────────────────────────────────────┤
│ POPULAR DESTINATIONS                                             │
│                                                                  │
│  Tujuan favorit pemula yang nggak akan bikin nyesel.             │
│                                                                  │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐              │
│  │ [img]   │  │ [img]   │  │ [img]   │  │ [img]   │              │
│  │ Bali    │  │ Tokyo   │  │ Paris   │  │ Seoul   │              │
│  │ ★ 4.9   │  │ ★ 4.8   │  │ ★ 4.9   │  │ ★ 4.8   │              │
│  │ Rp 5jt+ │  │ Rp 12jt+│  │ Rp 18jt+│  │ Rp 10jt+│              │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘              │
├──────────────────────────────────────────────────────────────────┤
│ STATS                                                            │
│                                                                  │
│     10K+              50+              4.9★          200+        │
│   trips made     countries          rating        events         │
├──────────────────────────────────────────────────────────────────┤
│ EVENTS                                                           │
│                                                                  │
│  Festival & event seru bulan ini.                                │
│                                                                  │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐     │
│  │ Cherry Blossom  │ │ Songkran        │ │ Diwali          │     │
│  │ Tokyo           │ │ Bangkok         │ │ Delhi           │     │
│  │ Apr 1–15        │ │ Apr 13–15       │ │ Nov 1           │     │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘     │
├──────────────────────────────────────────────────────────────────┤
│ REVIEWS                                                          │
│                                                                  │
│  Apa kata mereka yang udah nyobain Waypoint.                     │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐            │
│  │ ★★★★★        │  │ ★★★★★        │  │ ★★★★★        │            │
│  │ "First time  │  │ "Itinerary-  │  │ "Hemat waktu │            │
│  │  ke Jepang   │  │  nya masuk   │  │  riset 3 hari│            │
│  │  jadi mulus" │  │  akal"       │  │  jadi 1 mnt" │            │
│  │ — Rina, 26   │  │ — Doni, 29   │  │ — Sari, 24   │            │
│  └──────────────┘  └──────────────┘  └──────────────┘            │
├──────────────────────────────────────────────────────────────────┤
│ CTA BANNER                                                       │
│  ╔══════════════════════════════════════════════════════════╗    │
│  ║                                                          ║    │
│  ║      Trip pertamamu nggak harus ribet.                   ║    │
│  ║      Mulai planning sekarang, gratis selamanya.          ║    │
│  ║                                                          ║    │
│  ║              [ Mulai Plan Trip ]                         ║    │
│  ║                                                          ║    │
│  ╚══════════════════════════════════════════════════════════╝    │
├──────────────────────────────────────────────────────────────────┤
│ FOOTER                                                           │
│                                                                  │
│  Waypoint                                                        │
│  Travel planner buat pemula.                                     │
│                                                                  │
│  Product       Company       Connect                             │
│  · Plan        · About       · Instagram                         │
│  · Destinations· Blog        · TikTok                            │
│  · Events      · Contact     · Twitter                           │
│                                                                  │
│  © 2026 Waypoint. Made in Indonesia.                             │
└──────────────────────────────────────────────────────────────────┘


OVERLAY — Popup AI Planner (muncul setelah submit form):
┌──────────────────────────────────────────────┐
│  [X]                            Save Trip    │
│                                              │
│   Itinerary 5 hari ke Tokyo · Rp 12.000.000  │
│   ─────────────────────────────────────      │
│                                              │
│   Day 1 — Arrival & Shibuya                  │
│   • 14:00  Check-in hotel Shinjuku           │
│   • 17:00  Shibuya Crossing + Hachiko        │
│   • 19:00  Dinner ramen di Ichiran           │
│                                              │
│   Day 2 — ...                                │
│                                              │
│   [Save to My Trips]  [Plan Another]         │
└──────────────────────────────────────────────┘


OVERLAY — Loading animation (saat call Gemini):
        ╭─────────────────────╮
        │       (spinner)     │
        │  AI lagi nyusun     │
        │  itinerary...       │
        ╰─────────────────────╯
```

---

## 7. Aturan Kerja Sama dengan AI (Do's & Don'ts saat prompting)

### DO
1. **Sebut tech stack lengkap di awal prompt.** Contoh: "Aku pakai vanilla HTML/CSS/JS, tanpa framework. Bantu bikin..."
2. **Kasih context warna & font.** Selalu sebut `#8bff66` dan Plus Jakarta Sans biar AI nggak kasih saran random.
3. **Minta satu hal spesifik per prompt.** "Bikin navbar sticky" lebih bagus dari "bikin website".
4. **Sertakan kode existing kalau modifikasi.** Paste HTML/CSS yang sudah ada, baru minta perubahannya.
5. **Minta penjelasan kalau nggak ngerti.** "Jelaskan baris per baris kenapa pakai `flex: 1`".
6. **Tes dulu sebelum lanjut.** Setiap section yang AI generate, langsung run di browser, baru lanjut.
7. **Simpan prompt yang berhasil.** Bikin file `prompts.md` buat referensi.

### DON'T
1. **Jangan minta pakai framework.** Kalau AI nyaranin React/Tailwind, tolak: "tetap pakai vanilla".
2. **Jangan copy-paste blind.** Selalu baca dulu kodenya, paham logikanya, baru paste.
3. **Jangan minta "buatin website lengkap" sekali jalan.** Hasilnya pasti messy & susah di-debug.
4. **Jangan abaikan error.** Kalau ada error di console, tanya ke AI dengan paste error message-nya.
5. **Jangan taruh API key Gemini di kode frontend.** Selalu lewat Vercel Serverless Function.
6. **Jangan pakai `innerHTML` untuk data dari user/AI tanpa sanitasi.** Pakai `textContent` atau escape dulu (XSS risk).
7. **Jangan skip mobile.** Setiap section yang dibikin, langsung tes di width 375px.

### Template prompt yang bagus
```
Project: Waypoint travel planner.
Stack: vanilla HTML/CSS/JS, no framework.
Design system: dark theme, primary #8bff66, font Plus Jakarta Sans.
Task: [tulis 1 task spesifik di sini]
Constraint: [batasan tambahan, misal "harus responsive di 375px"]
```

---

## 8. Roadmap Workshop 4 Hari

> 4 hari × 2 jam = total 8 jam.

### Hari 1 — Fondasi & Struktur (2 jam)
**Goal:** Halaman bisa dibuka, semua section sudah ada walau belum di-style.

- [0:00–0:15] Kenalan project, demo hasil akhir, setup folder + VS Code.
- [0:15–0:30] Setup HTML5 boilerplate, import Plus Jakarta Sans, link CSS & JS.
- [0:30–1:00] Bikin **CSS Variables** (warna, spacing, radius, shadow) di `:root`.
- [1:00–1:45] Tulis HTML semua section (semantic tags: `<header>`, `<section>`, `<footer>`) — masih plain.
- [1:45–2:00] Commit pertama ke Git, deploy kosongan ke Vercel biar URL-nya jadi.

**Deliverable:** `index.html`, `style.css`, `script.js`, repo di GitHub, URL Vercel hidup.

---

### Hari 2 — Styling Section (2 jam)
**Goal:** Visual mendekati final, masih statis (belum ada interaksi JS).

- [0:00–0:20] Style **navbar** sticky + blur background.
- [0:20–0:50] Style **hero** + form planner (3 input + tombol primary dengan glow).
- [0:50–1:20] Style **popular destinations** grid 4 kolom (responsive ke 2 kolom di tablet, 1 di mobile).
- [1:20–1:40] Style **stats**, **events**, **reviews** (grid + card).
- [1:40–2:00] Style **CTA banner** + **footer**, tes responsive di 375px.

**Deliverable:** Halaman cantik full statis di desktop & mobile.

---

### Hari 3 — Interaktivitas JavaScript (2 jam)
**Goal:** User bisa klik-klik, modal bisa muncul, data bisa disimpan.

- [0:00–0:20] Smooth scroll antar section dari menu navbar.
- [0:20–0:50] Build **popup AI planner** (modal): buka/tutup, backdrop click close, ESC key.
- [0:50–1:10] Build **loading animation** (spinner) yang muncul-hilang.
- [1:10–1:40] Wire form planner: ambil nilai input, tampilin modal dengan **dummy data dulu**.
- [1:40–2:00] Implementasi **save trip ke localStorage** + load list trip yang tersimpan.

**Deliverable:** Form jalan, modal jalan, data tersimpan walau di-reload.

---

### Hari 4 — Integrasi AI & Deploy (2 jam)
**Goal:** AI Gemini beneran jalan, website live di domain Vercel.

- [0:00–0:20] Daftar API key Gemini di Google AI Studio (gratis).
- [0:20–0:50] Bikin Vercel Serverless Function `api/plan.js` yang panggil Gemini API.
- [0:50–1:20] Connect frontend → call `fetch('/api/plan')`, tampilin hasil di modal.
- [1:20–1:40] Polish: handle error (network gagal, AI timeout), tampilkan pesan ramah.
- [1:40–2:00] Deploy final, share link, demo bareng-bareng, dokumentasi singkat di README.

**Deliverable:** Website live di `[nama].vercel.app`, AI jalan, end-to-end working.

---

## Penutup

> Brief ini bukan dokumen mati. Kalau ada keputusan baru, update di sini dulu sebelum sentuh kode. Konsistensi > kecepatan.

— Made untuk first-time travelers.

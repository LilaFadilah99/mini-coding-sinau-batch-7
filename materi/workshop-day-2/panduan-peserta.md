# Panduan Peserta — Day 2 Workshop Waypoint

**Selamat datang di Day 2!** Hari ini kita akan praktik bareng AI bikin 3 section pertama Waypoint.

---

## Sebelum Mulai

Pastikan kamu punya:

- [ ] AI tools terbuka (Antigravity IDE atau Claude Code)
- [ ] Browser terbuka (Chrome/Firefox/Safari)
- [ ] VS Code (atau editor lain) terbuka
- [ ] File screenshot dari trainer:
  - `screenshot-navbar.png`
  - `screenshot-hero.png`
  - `screenshot-popular-destination.png`
- [ ] Folder kosong sudah dibuat (misal: `my-waypoint/`)

**Aturan main hari ini:**

1. Pisah build per section. JANGAN minta AI bikin semua sekaligus.
2. Setiap prompt selesai → cek di browser → baru lanjut.
3. Kalau hasil belum pas → refining bertahap (lihat tips di bawah).
4. Boleh tanya AI kalau ada kode yang tidak paham.

> **Catatan penting:**
> Kamu **TIDAK perlu hafal istilah teknis CSS** (seperti "z-index", "flex", "position absolute", dll). Cukup deskripsikan **apa yang kamu lihat** (visual) dan **apa yang terjadi saat di-klik/di-hover** (behavior). AI yang akan terjemahkan ke kode. Screenshot + `PROJECT_BRIEF.md` jadi panduan AI untuk detail teknisnya.

---

## Flow Hari Ini

```
STEP 1 → Planning (bikin PROJECT_BRIEF.md)
   ↓
STEP 2 → Setup project (bikin index.html + style.css kosong)
   ↓
STEP 3 → Build Navbar
   ↓
STEP 4 → Build Hero (2 prompt: background dulu, lalu form)
   ↓
STEP 5 → Build Popular Destination
   ↓
SELESAI
```

---

# STEP 1 — Planning Project

**Tujuan:** Generate dokumen panduan project Waypoint pakai AI.

## Yang Kamu Lakukan

1. Buka AI tools kamu
2. Copy prompt di bawah ini, paste ke AI
3. Submit, tunggu AI generate dokumen markdown
4. Save hasilnya sebagai file `PROJECT_BRIEF.md` di **root folder** project kamu

## Prompt — Copy ini

```
Aku mau bikin website travel planner namanya "Waypoint" — buat
traveler pemula yang baru pertama kali ke luar negeri biar tidak
ribet bikin itinerary perjalanan.

Tolong bantu aku susun PROJECT BRIEF untuk project ini, dalam
format markdown yang rapi. Brief ini akan jadi panduan utama saat
aku build project. Berikut yang harus ada:

1. Visi & Tujuan project (kenapa aku bikin ini)
2. Siapa target user-nya & apa masalah yang mereka hadapi
3. Daftar fitur:
   - Yang wajib ada di versi pertama
   - Yang bisa ditambahkan nanti
4. Teknologi yang dipakai (lengkap dengan alasan tiap pilihan)
5. Design System (panduan tampilan biar konsisten):
   - Daftar warna lengkap dengan kode warna-nya (hex)
   - Font yang dipakai (untuk judul, body, dll)
   - Ukuran sudut tumpul (untuk kartu, tombol, pill bulat)
   - Bayangan / shadow (level subtle, medium, large, xl)
   - Jarak / spacing standar
6. Wireframe halaman (gambaran kasar tata letak dari atas ke bawah,
   pakai ASCII art / kotak-kotak teks)
7. Aturan kerja sama dengan AI (do's and don'ts saat prompt)
8. Roadmap workshop 4 hari

ATURAN PROJECT (jangan diubah, ini sudah aku tetapkan):
- Single page (semua section jadi satu halaman, scroll vertikal)
- Pakai HTML + CSS + JavaScript murni saja, JANGAN pakai framework
  seperti React, Vue, atau Laravel
- Backend pakai Vercel Serverless Functions
- AI pakai Google Gemini (yang gratis)
- Untuk simpan trip pakai localStorage browser (tidak perlu database)
- Font: Plus Jakarta Sans dari Google Fonts
- Warna utama (untuk tombol & highlight): hijau neon dengan kode #8bff66
- Section yang harus ada di halaman: navbar, hero (dengan form planner),
  popular destinations (4 kartu), stats, events, reviews, CTA banner,
  footer, popup AI planner, animasi loading
- Target user: pemula yang baru pertama kali ngoding
- Workshop 4 hari, 2 jam per hari

Tulis dalam Bahasa Indonesia yang santai tapi rapi. Outputnya
langsung markdown lengkap, siap aku save sebagai file PROJECT_BRIEF.md.
```

## Save Hasil ke File

**Lokasi save:** root folder project kamu (folder paling luar, bareng `index.html` nantinya).

```
my-waypoint/
└── PROJECT_BRIEF.md   ← di sini
```

**Cara save:**

- **Antigravity / Claude Code:** bilang ke AI: *"Save jawabanmu di atas ke file `PROJECT_BRIEF.md` di root project."*
- **Web chat (claude.ai / chatgpt.com):** copy hasil markdown → buka VS Code → buat file baru → paste → save dengan nama `PROJECT_BRIEF.md`

## Cek Hasil

Buka `PROJECT_BRIEF.md` di editor. Pastikan ada **8 section** dari nomor 1 sampai 8.

Kalau ada section yang kurang atau terlalu pendek, refine dengan prompt:

```
Brief kamu kurang lengkap di bagian [section X — sebutkan namanya].
Tolong perpanjang section itu, tambahkan [hal yang menurutmu kurang].
```

---

# STEP 2 — Setup Project

**Tujuan:** Bikin file kosong `index.html` + `css/style.css` siap untuk diisi.

## Prompt — Copy ini

```
Aku mau mulai project Waypoint. Tolong buatkan 2 file kosong yang
siap aku isi nanti.

Yang aku butuhkan:

1. File index.html — halaman web yang sudah ter-link ke:
   - Font Plus Jakarta Sans dari Google Fonts (untuk semua weight
     yang biasa dipakai: regular, medium, semibold, bold, extra bold)
   - File CSS aku di lokasi css/style.css
   - Judul halaman: "Waypoint AI - Smart Travel Planning"
   - Sudah responsive untuk mobile (atur viewport-nya)
   - Body-nya kosong dulu, nanti akan diisi pelan-pelan

2. File css/style.css — file styling kosong yang sudah ada
   "reset" dasar biar tampilan konsisten di semua browser:
   - Hapus margin/padding default semua elemen
   - Body pakai font Plus Jakarta Sans (kalau tidak ada, fallback
     ke font system)
   - Body: ukuran teks nyaman dibaca, warna teks abu-abu gelap (#1e293b)
   - List (ul/ol) tanpa bullet point default
   - Link (a) tanpa garis bawah, warna ikut parent
   - Gambar otomatis tidak melebihi ukuran container-nya
   - Tombol pakai font yang sama dengan body, ada cursor pointer
   - Halaman scroll-nya halus (smooth scroll)

Tampilkan output dalam 2 code block terpisah (HTML dan CSS), biar
aku gampang copy ke file masing-masing.
```

## Save Hasil ke File

Buat 2 file baru:

```
my-waypoint/
├── PROJECT_BRIEF.md   (sudah ada dari Step 1)
├── index.html         ← copy code HTML ke sini
└── css/
    └── style.css      ← buat folder css/ dulu, lalu copy CSS ke sini
```

## Verifikasi di Browser

Buka `index.html` di browser. **Yang harus terjadi:** halaman putih kosong (tidak error, tidak ada teks).

Kalau halaman tidak muncul atau ada error:
- Cek path link CSS: `<link rel="stylesheet" href="css/style.css">` (harus ada `css/` di depan)
- Pastikan folder `css/` benar-benar ada dan `style.css` ada di dalamnya

---

# STEP 3 — Build Navbar

**Tujuan:** Navbar dengan 3 pill (logo, menu, tombol) tampil di top halaman.

## Yang Kamu Lampirkan ke AI

1. File `PROJECT_BRIEF.md` (yang sudah dibuat di Step 1)
2. Gambar `screenshot-navbar.png` (dari trainer)

## Prompt — Copy ini

```
[Lampirkan PROJECT_BRIEF.md + screenshot-navbar.png]

Tolong bikin NAVBAR untuk Waypoint sesuai screenshot terlampir dan
design system di PROJECT_BRIEF.md.

Yang aku mau:

- Bagian KIRI ada logo: icon gunung ⛰️ dan teks "Waypoint Travel"
  (semuanya dibungkus dalam pill putih bulat)
- Bagian TENGAH ada 2 menu: "Destinations" (yang aktif/active) dan
  "My Trips" (juga dibungkus pill putih bulat)
- Bagian KANAN ada tombol "AI Planner" warna hijau neon

Aturan tampilan navbar:
- Selalu menempel di atas halaman (saat halaman di-scroll, navbar
  tetap di atas)
- Latar belakang navbar TRANSPARAN — jadi yang berwarna putih hanya
  pill-pill kecilnya saja, BUKAN satu bar penuh selebar layar
- Posisi navbar agak melayang dari pinggir atas (ada jarak sedikit
  dari ujung atas layar)
- Saat hover di tombol AI Planner: kasih efek halus (warna sedikit
  lebih gelap dan bayangan tipis biar terangkat)
- Saat hover di menu link (yang tidak aktif): kasih background
  abu-abu muda

Pakai semua warna, font, dan style dari PROJECT_BRIEF.md. Detail
teknis lain (ukuran spacing, shadow, dll) ikuti screenshot terlampir.

Tulis HTML di dalam <body> di file index.html, dan CSS di file
css/style.css.
```

## Cek di Browser

Refresh `index.html`. Navbar kamu harus:

- [ ] 3 pill terpisah tampil (ada jarak antara logo, menu, tombol)
- [ ] Logo "Waypoint Travel" + icon gunung di kiri
- [ ] Menu "Destinations" + "My Trips" di tengah
- [ ] Tombol "AI Planner" di kanan, warna hijau neon
- [ ] Posisi fixed di top (saat scroll, navbar tetap di atas)
- [ ] Background di belakang navbar tetap kelihatan
- [ ] Hover di tombol/menu kasih efek visual

## Kalau Belum Sesuai → Refining Prompt

Jangan ulang dari nol. Kasih tahu AI bagian mana yang masih beda:

```
Hasilnya hampir mirip, tapi ada beberapa yang masih beda dari
screenshot:

1. [tulis bagian yang masih salah, contoh:]
   Latar belakang navbar masih putih full-width. Harusnya transparan,
   yang putih cuma pill-pill kecilnya saja.

2. [contoh lain:]
   Tombol AI Planner warnanya hijau gelap. Harusnya hijau neon
   #8bff66 sesuai design system di brief.

Tolong perbaiki bagian-bagian itu saja, jangan ubah yang lain.
```

---

# STEP 4 — Build Hero

**Tujuan:** Hero section dengan background pantai + form floating card.

> **Strategi:** Pisah jadi 2 prompt — background dulu, baru form-nya.

## Yang Kamu Lampirkan ke AI

1. File `PROJECT_BRIEF.md`
2. Gambar `screenshot-hero.png`

## Prompt 4A — Background + Konten Tengah

```
[Lampirkan PROJECT_BRIEF.md + screenshot-hero.png]

Sekarang aku mau bikin HERO SECTION di bawah navbar.

Untuk SEKARANG, fokus dulu di background dan judul saja — JANGAN
bikin form planner-nya dulu. Itu nanti di prompt berikutnya.

Yang aku mau:

Background:
- Foto pantai tropis sebagai latar belakang penuh (full-width)
  URL gambar: https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80
- Foto-nya kasih efek gelap-ke-terang dari atas ke bawah:
  * Bagian atas agak gelap (biar judul putih kebaca jelas)
  * Bagian tengah sedikit lebih gelap
  * Bagian bawah berubah jadi putih solid, biar menyatu mulus
    dengan section di bawahnya nanti
- Section hero ini cukup tinggi (sekitar 600px), dengan ruang
  kosong yang banyak di bagian atas biar judul tidak nempel navbar

Konten di tengah hero (di atas background):
- Judul besar warna putih:
  "Explore the World, One Journey at a Time."
  (kasih line break setelah kata "One" — jadi 2 baris)
- Di bawah judul ada subtitle:
  "AI-powered itineraries crafted just for you. Explore smarter,
  travel better."
- Subtitle warnanya putih juga tapi sedikit lebih tipis (transparan)
- Posisi judul & subtitle di tengah halaman secara horizontal
- Kasih sedikit shadow / glow di belakang teks biar terbaca jelas
  walau background-nya rame

Lihat screenshot terlampir untuk referensi visual.
Pakai warna dan style dari PROJECT_BRIEF.md.
Tambahkan ke file index.html (di bawah navbar) dan css/style.css.
```

## Cek di Browser (setelah Prompt 4A)

- [ ] Background image pantai tampil full-width
- [ ] Overlay gradient kelihatan (atas gelap, bawah memutih)
- [ ] Judul besar putih tampil di tengah, ada line-break setelah "One"
- [ ] Subtitle tampil di bawah judul

## Prompt 4B — Floating Card + Form

```
[Lampirkan PROJECT_BRIEF.md + screenshot-hero.png]

Sekarang tambahkan FLOATING CARD di bagian bawah hero (di bawah
subtitle), isinya form quick planner.

Yang aku mau:

Tampilan card:
- Kartu putih besar yang seolah "melayang" di atas hero
- Sudut kartu rounded (tumpul), dengan bayangan tebal di bawahnya
  biar kelihatan benar-benar mengambang
- Lebar kartu lumayan besar (kira-kira max 900px), ruang dalam yang
  nyaman (padding cukup)
- Di bagian atas kartu ada judul: "Plan Your Travel Journey"

Isi form (4 input dalam satu baris sejajar):
1. Destination — input teks, placeholder "Type the destination", wajib
2. Days — input angka, dari 1 sampai 14, default-nya 3, wajib
3. Budget — dropdown pilihan: Budget / Moderate (default) / Luxury, wajib
4. Interests — input teks, placeholder "Your interests"

Tampilan setiap input:
- Bentuk pill bulat penuh (rounded ujung-ujungnya)
- Ada label kecil di atas tiap input (Destination, Days, dll)
- Saat input di-klik (focus): garis tepinya berubah jadi warna
  hijau neon, ada glow tipis hijau di sekelilingnya

Di bawah baris input, ada satu baris lagi yang isinya:
- Sebelah KIRI: tulisan "Filter:" diikuti 6 tombol pill kecil:
  Bali, Tokyo, Paris, New York, Dubai, London
  (tombol pill: kotak berbingkai tipis abu-abu, sudut rounded,
   latar transparan, teks abu-abu)
- Sebelah KANAN: tombol besar "Generate Itinerary" warna hijau neon
  (sudut pill bulat, teks tebal hitam, ukuran lebih besar dari pill filter)

Saat hover di tombol Generate Itinerary: kasih efek terangkat sedikit
+ bayangan hijau tipis di bawahnya.

Pakai semua warna dan style dari PROJECT_BRIEF.md.
Lihat screenshot terlampir buat referensi tata letak.

Buat juga responsive: kalau layar ≤ tablet, input jadi 2 kolom;
kalau layar HP, input jadi 1 kolom (tumpuk vertikal).
```

## Cek di Browser (setelah Prompt 4B)

- [ ] Floating card putih kelihatan "melayang" di tengah-bawah hero
- [ ] Judul "Plan Your Travel Journey" muncul di atas card
- [ ] 4 input muncul dalam satu baris (di desktop)
- [ ] 6 filter pill (Bali, Tokyo, Paris, New York, Dubai, London) tampil
- [ ] Tombol "Generate Itinerary" warna hijau neon di kanan filter
- [ ] Saat input di-klik, garis berubah hijau

## Kalau Belum Sesuai → Refining

```
Beberapa yang masih beda dari screenshot:

1. [contoh:] Card-nya tertutup overlay hero, tidak kelihatan melayang
   di atasnya.

2. [contoh:] Tombol Generate Itinerary masih bersebelahan dengan
   filter pill di mobile, harusnya tumpuk vertikal kalau layar HP.

Tolong perbaiki bagian-bagian itu.
```

---

# STEP 5 — Build Popular Destination

**Tujuan:** Grid 4 cards destinasi (Bali, Tokyo, Paris, Iceland) dengan hover effect.

## Yang Kamu Lampirkan ke AI

1. File `PROJECT_BRIEF.md`
2. Gambar `screenshot-popular-destination.png`

## Prompt — Copy ini

```
[Lampirkan PROJECT_BRIEF.md + screenshot-popular-destination.png]

Sekarang aku mau bikin section POPULAR DESTINATION di bawah hero.
Section ini menampilkan 4 destinasi populer dalam bentuk grid kartu.

Yang aku mau:

Header section:
- Judul besar: "Popular destination"
- Subtitle di bawahnya: "Discover the most loved destinations by
  travelers worldwide" (warna abu-abu)
- Kasih jarak yang cukup setelah header sebelum grid kartu

Grid kartu:
- 4 kartu sejajar dalam satu baris (4 kolom di desktop)
- Saat layar ≤ tablet: jadi 2 kolom
- Saat layar HP: jadi 1 kolom

Setiap kartu berisi:
- Foto destinasi di bagian atas (tinggi sedang)
- Tag kategori di pojok kiri atas foto: kotak kecil putih dengan
  emoji + nama kategori (contoh: "🏝️ Tropical")
- Di bawah foto, bagian info berisi:
  * Teks kecil abu-abu: "Your City → [nama kota]"
  * Nama destinasi (lebih besar dan tebal)
  * Teks kecil: "Explore with AI Planner"
  * Footer kartu: "From" (kecil) + "AI Trip" (tebal)

Style kartu:
- Latar putih, ada border tipis abu-abu di sekeliling
- Sudut tumpul (rounded)
- Kelihatan bisa di-klik (cursor jadi pointer saat hover)
- Saat hover:
  * Kartu naik sedikit (terangkat ke atas)
  * Foto di dalam kartu zoom pelan-pelan (membesar dikit)
  * Bayangan kartu jadi lebih jelas/tebal
- Animasi hover-nya halus (ada transisi smooth)

PENTING: kartu dan container foto-nya harus pakai overflow hidden,
biar foto yang di-zoom saat hover tidak keluar dari sudut tumpul kartu.

Data 4 destinasi:

1. Bali, Indonesia
   - Tag: 🏝️ Tropical
   - Foto: https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80

2. Tokyo, Japan
   - Tag: 🏙️ Urban
   - Foto: https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80

3. Paris, France
   - Tag: 🗼 Romantic
   - Foto: https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80

4. Iceland
   - Tag: ❄️ Adventure
   - Foto: https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&q=80

Pakai design system di PROJECT_BRIEF.md (warna, font, shadow, dll).
Lihat screenshot terlampir untuk referensi tata letak.

Section ini taruh di tengah halaman dengan lebar maksimum standar
(sekitar 1200px), dengan ruang atas-bawah yang cukup.
```

## Cek di Browser

- [ ] Header "Popular destination" + subtitle muncul
- [ ] 4 cards tampil dalam grid (4 kolom di desktop)
- [ ] Setiap card menampilkan foto + tag emoji + nama
- [ ] Tag emoji muncul di pojok kiri atas foto (background putih)
- [ ] Hover di card: card naik + foto zoom (transisi halus)
- [ ] Di tablet jadi 2 kolom, di HP jadi 1 kolom

## Kalau Foto Keluar dari Rounded Corner → Refining

```
Foto di kartu keluar dari sudut tumpul kartu saat di-zoom (sudutnya
jadi tajam). Container foto-nya harus pakai overflow hidden, jadi
foto tetap terpotong rapi mengikuti sudut tumpul kartu. Tolong
perbaiki.
```

---

# Tips Tambahan

## Kalau Tidak Paham Kode AI

```
Aku tidak paham bagian ini di kode kamu:

[paste 1-3 baris kode yang asing]

Tolong jelaskan apa fungsinya dengan bahasa pemula. Kasih analogi
kalau bisa.
```

## Kalau Stuck / Tampilan Tidak Seperti Diharapkan

```
Aku sudah ikuti prompt sebelumnya, tapi tampilan di browser tidak
seperti yang aku harapkan.

Yang muncul: [deskripsi singkat apa yang muncul di browser]
Yang aku harapkan: [deskripsi target yang kamu inginkan]

Tolong cek file [index.html / style.css] dan cari masalahnya.
Kasih tahu aku bagian mana yang salah dan kenapa.
```

## Pola Refining yang Baik

Selalu sebut **bagian spesifik** + **target spesifik**:

```
Bagian [nama elemen] saat ini [kondisi sekarang].
Harusnya [kondisi target].
Tolong perbaiki.
```

Contoh:

```
Bagian tombol AI Planner saat ini warnanya biru.
Harusnya hijau neon (#8bff66) sesuai design system di brief.
Tolong perbaiki.
```

```
Bagian grid card di mobile masih 4 kolom (kekecilan).
Harusnya 1 kolom kalau layar HP biar terbaca jelas.
Tolong perbaiki.
```

## Filosofi Prompt Pemula

Kamu **tidak perlu jago CSS**. Cukup jago **mendeskripsikan**:

| Yang penting | Yang tidak perlu kamu pikirkan |
|---|---|
| Apa yang kamu LIHAT (warna, ukuran, posisi kasar) | Istilah teknis seperti `position: absolute`, `z-index` |
| Apa yang TERJADI saat hover/klik | Property CSS apa yang dipakai |
| Apa yang harus berubah di mobile/tablet | Cara bikin media query |
| Warna spesifik (kasih hex code kalau tahu) | Cara nulis hex code yang valid |

AI yang akan terjemahkan deskripsi visual kamu ke kode. Kamu cukup jadi **art director**, bukan **engineer**.

---

# Checklist Akhir Day 2

Sebelum sesi berakhir, pastikan kamu punya:

- [ ] File `PROJECT_BRIEF.md` di root folder project
- [ ] File `index.html` dengan navbar + hero + popular destination
- [ ] File `css/style.css` dengan semua styling 3 section
- [ ] Buka `index.html` di browser → 3 section tampil dengan layout mirip Waypoint

**Selamat!** Kalau 4 item di atas semua, kamu sudah selesai Day 2.

---

# Apa yang Akan Dipelajari Day 3?

Lanjutan section Waypoint dengan teknik yang sudah kamu kuasai:

- Stats section (4 cards angka besar — 234M, 768K, 5.0★, $8.8B)
- Events section (3 event cards dengan harga)
- Reviews section (testimonial)
- CTA hero section
- Footer
- Modal AI Planner (popup overlay)
- Loading state

Sampai bertemu Day 3!

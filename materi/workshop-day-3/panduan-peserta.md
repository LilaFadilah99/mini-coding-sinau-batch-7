# Panduan Peserta — Day 3 Workshop Waypoint

**Selamat datang di Day 3!** Kemarin (Day 2) kalian sudah bikin TAMPILAN Waypoint untuk navbar, hero, dan popular destination. Tapi semua itu masih DIAM — klik tombol tidak terjadi apa-apa, klik card tidak ada respon.

**Hari ini kita kasih NYAWA** ke 3 section itu pakai **JavaScript**.

Akhir sesi hari ini, kamu bisa:
- Mobile menu yang bisa dibuka-tutup pakai tombol hamburger
- Filter pills (Bali/Tokyo/Paris) yang otomatis isi input destination
- Form yang menangkap data saat di-submit
- Tombol Generate Itinerary dengan loading state
- Popular Destination cards yang dirender otomatis dari data
- Klik card destination → input form auto-terisi

---

## Sebelum Mulai

Pastikan kamu punya:

- [ ] Project Day 2 sudah jalan (navbar, hero, popular destination tampil di browser)
- [ ] AI tools terbuka (Antigravity IDE atau Claude Code)
- [ ] VS Code (atau editor lain) terbuka
- [ ] Browser
- [ ] File `PROJECT_BRIEF.md` di folder project

**Aturan main hari ini:**

1. Pisah build per komponen. JANGAN minta AI bikin semua sekaligus.
2. Setiap prompt selesai → test interaktivitas di browser → baru lanjut.
3. Verifikasi-nya **bukan visual**, tapi **behavior**: klik tombol → terjadi apa? Apakah sesuai?
4. Kalau hasil belum sesuai → refining bertahap.
5. Boleh tanya AI kalau ada kode yang tidak paham.

> **Catatan penting tentang prompt JavaScript:**
>
> - **Day 2 (visual):** "Bikin tampilan A, B, C..." → AI generate HTML/CSS
> - **Day 3 (behavior):** "Saat klik X, terjadi Y" → AI generate JavaScript
>
> Kamu **TIDAK perlu hafal** istilah seperti `addEventListener`, `classList`, `forEach`. Cukup deskripsikan **apa yang harus terjadi**, AI yang terjemahkan ke kode.

---

## Flow Hari Ini

```
STEP 1 → Setup file JavaScript
   ↓
STEP 2 → JS untuk Navbar (Mobile Menu)
   ↓
STEP 3 → JS untuk Hero Form Planner
            (Filter Pills + Submit + Loading State)
   ↓
STEP 4 → JS untuk Popular Destination
            (Render dari Data + Card Click)
   ↓
STEP 5 → Test Semua Interaktivitas
   ↓
SELESAI — Waypoint kamu sudah BERINTERAKSI
```

---

# STEP 1 — Setup File JavaScript

**Tujuan:** Bikin file `js/app.js` dan link ke HTML.

## Yang Kamu Lakukan

### Cara 1: Manual (lebih mudah dipahami)

1. Buat folder baru: `js/` di root project (sejajar dengan `index.html` dan `css/`)
2. Buat file kosong di dalamnya: `js/app.js`
3. Buka `index.html`, tambahkan baris ini **sebelum tag `</body>`**:
   ```html
   <script src="js/app.js"></script>
   ```

### Cara 2: Pakai AI

Atau kamu bisa minta AI lakukan:

```
Tolong buat:
1. File baru: js/app.js (kosong dulu, tambah komentar "// JavaScript Waypoint")
2. Update index.html: tambahkan <script src="js/app.js"></script>
   tepat sebelum tag </body>

Tunjukkan hasilnya.
```

## Verifikasi

Refresh browser. Buka Developer Tools (F12) → tab Console. Seharusnya **tidak ada error merah**. Halaman tampil normal seperti biasa.

Struktur folder kamu sekarang:

```
my-waypoint/
├── PROJECT_BRIEF.md
├── index.html
├── css/
│   └── style.css
└── js/
    └── app.js   ← FILE BARU
```

---

# STEP 2 — JS untuk Navbar (Mobile Menu)

**Tujuan:** Tombol hamburger di mobile → menu muncul/hilang. Klik di luar → menu otomatis tertutup.

## Yang Akan Ditangani

Di mobile (layar HP), navbar otomatis nyembunyiin menu dan munculin **tombol hamburger** (3 garis). Hari ini kita bikin tombol itu fungsional.

## Prompt — Copy ini

```
Tolong tambahkan logika ke js/app.js untuk MOBILE MENU di navbar.

Yang aku mau (deskripsi behavior):

1. Saat user klik tombol hamburger (3 garis) di mobile:
   → Menu navigasi muncul (tambah class "mobile-active" ke .nav-menu)
   → Tombol hamburger jadi state aktif (tambah class "active" 
     ke .mobile-menu-btn) — biar 3 garisnya berubah jadi tanda X

2. Saat user klik salah satu link nav (Destinations / My Trips):
   → Menu mobile otomatis tertutup
   → Tombol hamburger balik ke state normal

3. Saat user klik di area LUAR menu mobile (di area lain halaman):
   → Menu mobile otomatis tertutup juga
   → Tombol hamburger balik ke state normal

Element yang dipakai:
- Tombol hamburger: <button> dengan id="mobile-menu-btn"
- Container menu nav: <ul> dengan class="nav-menu"
- Link nav: <a> dengan class="nav-link"

Pakai komentar BAHASA INDONESIA di tiap bagian biar aku gampang ngerti.
```

## Test di Browser

1. Buka browser → resize window jadi mobile size (atau pakai DevTools mode mobile, F12 → toggle device)
2. Tombol hamburger seharusnya muncul di kanan navbar
3. **Klik tombol hamburger** → menu seharusnya muncul ✓
4. **Klik link "Destinations"** atau "My Trips" → menu seharusnya tertutup ✓
5. **Klik tombol hamburger lagi** → menu muncul lagi
6. **Klik di area kosong di luar menu** → menu tertutup ✓

## Kalau Belum Sesuai → Refining

```
Mobile menu sudah aku coba, tapi:
- [contoh: menu tidak muncul saat klik hamburger]
- [contoh: menu muncul tapi tidak tertutup saat klik link]

Tolong cek dan perbaiki.
```

---

# STEP 3 — JS untuk Hero Form Planner

**Tujuan:** 3 hal sekaligus — filter pills click, form submit, dan loading state pada button.

## Strategi: Pisah Jadi 3 Prompt

Form planner punya 3 fitur terpisah. Pisah biar gampang debug:
- **Prompt 3A**: Filter pills (klik pill → isi input + active state)
- **Prompt 3B**: Form submit (handle saat tombol Generate di-klik)
- **Prompt 3C**: Loading state (tombol jadi "Generating..." sementara)

---

## Prompt 3A — Filter Pills

```
Tolong tambahkan ke js/app.js logika untuk FILTER PILLS di hero form.

Yang aku mau:

Saat user klik salah satu pill (Bali, Tokyo, Paris, New York, Dubai,
atau London):
1. Input "Destination" otomatis terisi dengan nama pill itu
   (contoh: klik pill "Bali" → input destination jadi "Bali")
2. Pill yang di-klik jadi state "active" (visual highlighted)
3. Pill lain hilangkan state active (cuma 1 pill yang active 
   pada satu waktu)
4. Fokus cursor pindah ke input "Days" (biar user lanjut ngisi)

Element:
- Pill: <button class="filter-pill" data-destination="Bali">Bali</button>
  (setiap pill punya attribute data-destination yang nilainya nama kota)
- Input destination: id="hero-destination"
- Input days: id="hero-days"
- Saat aktif, pill dapat class "active"

Pakai komentar BAHASA INDONESIA.
```

### Test di Browser
1. Klik pill "Bali" → input Destination terisi "Bali" ✓
2. Pill "Bali" jadi highlighted ✓
3. Klik pill "Tokyo" → input berubah jadi "Tokyo", pill "Bali" hilang highlight, "Tokyo" highlight ✓
4. Cursor langsung pindah ke input Days ✓

---

## Prompt 3B — Form Submit Handler

```
Tolong tambahkan ke js/app.js logika untuk SUBMIT form hero planner.

Yang aku mau:

Saat user submit form (klik tombol "Generate Itinerary"):
1. CEGAH default behavior form (jangan refresh halaman)
2. Ambil 4 nilai dari input form:
   - destination (dari id="hero-destination")
   - days (dari id="hero-days")
   - budget (dari id="hero-budget")
   - interests (dari id="hero-interests")
3. Untuk SEKARANG (demo), tampilkan data yang diambil:
   - console.log({ destination, days, budget, interests })
   - Plus alert: "Form submitted! Destinasi: [destination], 
     Hari: [days], Budget: [budget]"

Note: Logika untuk benar-benar kirim ke AI Gemini akan kita 
buat sebagai PR / Day 4. Hari ini cukup demo dulu.

Form ID: quick-planner-form

Pakai komentar BAHASA INDONESIA.
```

### Test di Browser
1. Isi form: Destination "Bali", Days 3, Budget Moderate, Interests "beach"
2. Klik tombol "Generate Itinerary" 
3. **Yang harusnya terjadi:** alert muncul dengan data form ✓
4. Buka Console (F12) → ada log dari step 3 ✓
5. Halaman TIDAK refresh ✓

---

## Prompt 3C — Loading State Button

```
Tolong tambahkan ke js/app.js logika untuk LOADING STATE tombol 
Generate Itinerary.

Yang aku mau:

Saat user klik tombol "Generate Itinerary" (bisa digabung dengan 
form submit handler dari Prompt 3B):

1. Tombol langsung kasih class "loading"
   → CSS akan otomatis ganti tulisan jadi "Generating..." dan
     tombol jadi tidak bisa di-klik (sudah ada CSS-nya dari Day 2)

2. Setelah 2 detik (simulasi proses AI):
   → Hilangkan class "loading" dari tombol
   → Tombol balik normal lagi

Tombol ID: btn-generate-hero

Note: Hari ini ini cuma SIMULASI loading (pakai setTimeout 2 detik). 
Saat backend AI sudah jadi (Day 4), loading akan hilang otomatis 
saat AI selesai generate.

Pakai komentar BAHASA INDONESIA.
```

### Test di Browser
1. Isi form, klik "Generate Itinerary"
2. Tombol langsung jadi "Generating..." dan tidak bisa di-klik ✓
3. Setelah 2 detik, tombol balik normal ✓
4. Alert dari Prompt 3B masih muncul (jangan hilangkan)

---

# STEP 4 — JS untuk Popular Destination

**Tujuan:** Cards Popular Destination dirender dari data array (bukan hardcode HTML), dan card bisa di-klik untuk isi form.

## Yang Akan Berubah

Saat ini di Day 2, Popular Destination cards diketik **langsung di HTML** (hardcode). Itu OK untuk pemula, tapi tidak fleksibel — kalau mau tambah atau edit destinasi, harus copy-paste di HTML.

**Lebih bagus:** simpan data destinasi di **array JavaScript**, lalu render cards otomatis. Kalau mau tambah destinasi, cukup tambah satu item di array.

## Strategi: Pisah Jadi 2 Prompt

- **Prompt 4A**: Hapus hardcode HTML + render cards dari data
- **Prompt 4B**: Card click handler

---

## Prompt 4A — Render Cards dari Data Array

### Persiapan: Hapus Hardcode HTML

Buka `index.html`, cari section Popular Destination. Hapus 4 card di dalam `<div id="destinations-grid" class="destinations-grid">` — biarkan kosong:

```html
<div id="destinations-grid" class="destinations-grid">
  <!-- Cards akan di-render JavaScript -->
</div>
```

> **Tips:** kamu bisa minta AI melakukan ini — lihat prompt di bawah.

### Prompt — Copy ini

```
Sekarang aku mau ubah Popular Destination supaya cards dirender 
dari ARRAY DATA pakai JavaScript (bukan hardcode di HTML lagi).

LANGKAH 1: HAPUS hardcode HTML
- Di index.html, hapus 4 card di dalam <div id="destinations-grid">.
- Biarkan div-nya kosong dengan komentar "Cards di-render JavaScript".

LANGKAH 2: TAMBAH KE js/app.js

a. Buat ARRAY DATA di bagian atas file, isi 4 destinasi:

const featuredDestinations = [
  {
    id: 1,
    name: "Bali, Indonesia",
    description: "Surga tropis dengan pantai indah, sawah hijau, dan budaya yang kaya.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    tag: "🏝️ Tropical"
  },
  {
    id: 2,
    name: "Tokyo, Japan",
    description: "Perpaduan modernitas dan tradisi, dari neon lampu kota hingga kuil tenang.",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
    tag: "🏙️ Urban"
  },
  {
    id: 3,
    name: "Paris, France",
    description: "Kota cinta, seni, dan kuliner dengan landmark ikonik dan suasana romantis.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    tag: "🗼 Romantic"
  },
  {
    id: 4,
    name: "Iceland",
    description: "Negeri api dan es dengan landscape vulkanik dan aurora yang memukau.",
    image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&q=80",
    tag: "❄️ Adventure"
  }
];

b. Buat function renderDestinations() yang:
   - Ambil element <div id="destinations-grid">
   - Loop array featuredDestinations
   - Untuk setiap data, BUAT element card dengan struktur sama 
     seperti HTML Day 2:
     * div.destination-card (container)
       - div.destination-image-container (wrapper foto)
         - img.destination-image (src dari data.image)
         - span.destination-tag (isi data.tag)
       - div.destination-info
         - p.destination-route ("Your City → [nama_kota]")
         - h3.destination-name (isi data.name)
         - p.destination-dates ("Explore with AI Planner")
         - div.destination-price 
           - span.price-label ("From")
           - span.price-value ("AI Trip")
   - Tambahkan card ke #destinations-grid

c. Panggil renderDestinations() saat halaman selesai dimuat 
   (DOMContentLoaded event).

Pakai komentar BAHASA INDONESIA.
```

### Test di Browser

Refresh halaman. **Yang harusnya terjadi:** 4 cards Popular Destination tetap muncul SAMA seperti sebelumnya — tapi sekarang dirender dari array, bukan dari HTML.

Untuk verifikasi: di Console (F12), ketik:
```javascript
console.log(featuredDestinations);
```
→ Array 4 item harus muncul ✓

---

## Prompt 4B — Card Click Handler

```
Sekarang tambahkan ke js/app.js: behavior saat user KLIK card 
destination.

Yang aku mau:

Saat user klik salah satu card destinasi:
1. Ambil nama kota dari data card itu (sebelum koma)
   Contoh: "Bali, Indonesia" → "Bali"
2. Otomatis isi input "Destination" di hero form dengan nama kota
3. Scroll halaman ke hero form (smooth) — biar user lihat input
   sudah terisi
4. Fokus cursor ke input "Days" (input setelah destination)
5. Console.log: "🎯 Destinasi terpilih: [nama kota]"

Element:
- Input destination hero: id="hero-destination"
- Input days hero: id="hero-days"
- Hero section: id="hero" atau class="hero" (untuk scroll target)

Tambahkan event listener click ini DI DALAM function 
renderDestinations() saat membuat tiap card (atau setelah render).

Pakai komentar BAHASA INDONESIA.
```

### Test di Browser

1. Scroll ke section Popular Destination
2. **Klik card "Bali, Indonesia"** 
3. Halaman scroll smooth ke hero form ✓
4. Input Destination otomatis terisi "Bali" ✓
5. Cursor langsung di input Days ✓
6. Console (F12) ada log "🎯 Destinasi terpilih: Bali" ✓
7. Coba klik card "Tokyo" → input ganti jadi "Tokyo" ✓

---

# STEP 5 — Test Semua Interaktivitas

Setelah semua step di atas selesai, lakukan **end-to-end test** seperti user beneran:

## Skenario Test

### Skenario 1: Pilih Destinasi via Card Popular Destination

1. Buka Waypoint di browser
2. Scroll ke section Popular Destination
3. Klik card "Tokyo, Japan"
4. **Expect:** Halaman scroll ke hero form, input Destination = "Tokyo"
5. Isi field lain: Days = 5, Budget = Luxury, Interests = "food and nightlife"
6. Klik "Generate Itinerary"
7. **Expect:** Tombol jadi "Generating..." selama 2 detik, alert muncul dengan data form, lalu tombol balik normal

### Skenario 2: Pilih via Filter Pills

1. Refresh halaman
2. Di hero form, klik pill "Paris"
3. **Expect:** Input Destination = "Paris", pill "Paris" highlighted
4. Klik pill "Bali"
5. **Expect:** Input ganti jadi "Bali", pill "Bali" highlighted, pill "Paris" tidak highlighted lagi

### Skenario 3: Mobile Menu

1. Resize browser ke mobile size (atau F12 → device toolbar)
2. Tombol hamburger seharusnya muncul di kanan navbar
3. Klik hamburger
4. **Expect:** Menu muncul, hamburger jadi tanda X
5. Klik link "My Trips"
6. **Expect:** Menu otomatis tertutup
7. Klik hamburger lagi, lalu klik di area kosong di luar menu
8. **Expect:** Menu tertutup juga

## Refining Pola

Kalau ada yang tidak berfungsi:

```
Aku coba [skenario X], tapi yang terjadi:
[deskripsi apa yang terjadi]

Yang aku harapkan:
[deskripsi yang seharusnya terjadi]

Tolong cek code js/app.js dan kasih tahu yang salah.
```

---

# Checklist Akhir Day 3

Pastikan kamu punya:

## Setup
- [ ] File `js/app.js` ada
- [ ] Script linked di `index.html` (sebelum `</body>`)

## Navbar
- [ ] Mobile menu bisa dibuka pakai hamburger
- [ ] Mobile menu otomatis tertutup saat klik link
- [ ] Mobile menu otomatis tertutup saat klik di luar

## Hero Form Planner
- [ ] Klik filter pill (Bali/Tokyo/dll) → input destination terisi otomatis
- [ ] Pill yang aktif jadi highlighted (cuma 1 yang active)
- [ ] Submit form → ambil data + tampilkan alert (demo)
- [ ] Tombol Generate jadi "Generating..." 2 detik saat di-klik

## Popular Destination
- [ ] HTML cards sudah dihapus (kosong, ada komentar saja)
- [ ] Cards muncul kembali setelah refresh (dirender dari array data)
- [ ] Klik card → input destination terisi + scroll ke form

**Kalau semua centang, kamu sudah selesai Day 3!** 🎉

---

# 📝 PR (Pekerjaan Rumah) untuk Peserta

Day 3 ini fokus ke **interaktivitas section yang sudah ada**. Bagian Waypoint yang lebih besar masih bisa kamu kerjakan sendiri di rumah:

## Tier 1 — Build Section Lain (Pakai Pola Day 2)

Pakai prompt visual seperti Day 2 untuk:
- **Stats Section** — 4 cards angka (234M, 768K, 5.0★, $8.8B)
- **Events Section** — 3 event cards dengan harga
- **Reviews Section** — testimonial + foto
- **CTA Hero** — banner full-width sebelum footer
- **Footer** — brand + tagline

## Tier 2 — Modal AI Planner + Loading Overlay

- Build visual modal popup dengan form di dalamnya
- Build loading overlay dengan spinner CSS
- Tambah JS: klik tombol "AI Planner" di navbar → modal terbuka
- Klik X atau backdrop → modal tertutup

## Tier 3 — Backend AI Integration (yang paling besar)

Ini yang akan bikin Waypoint kamu BENAR-BENAR jalan dengan AI:

1. Buat akun di Google AI Studio, dapatkan API key Gemini
2. Buat file `.env` dan `.gitignore`
3. Install Vercel CLI dan jalankan `vercel dev`
4. Build serverless function `api/generate-itinerary.js` yang:
   - Terima form data dari frontend
   - Susun prompt untuk Gemini
   - Panggil Gemini API
   - Ubah jawaban Markdown jadi HTML
   - Kirim balik ke frontend
5. Update form submit handler: ganti dari alert demo jadi
   benar-benar kirim ke `/api/generate-itinerary`
6. Tampilkan hasil itinerary di modal

> **Tips:** trainer akan share template kode `api/generate-itinerary.js` sebagai referensi. Tapi coba dulu prompt sendiri ke AI sebelum lihat referensi — biar belajar.

## Tier 4 — Save Trip (localStorage)

- Setelah AI generate itinerary, user bisa klik "Save"
- Trip tersimpan di browser (localStorage)
- View "My Trips" menampilkan daftar trip tersimpan

## Tier 5 — View Switching

- Klik "Destinations" di navbar → tampil view destinasi
- Klik "My Trips" → tampil view saved trips
- Active state untuk navigasi

---

# Apa yang Akan Dipelajari Day 4?

Day 4 (sesi terakhir!):

- Review PR — bahas kendala yang peserta alami saat ngerjain di rumah
- Bareng-bareng nyelesain Backend AI Integration (Tier 3 dari PR)
- Polish: responsive testing, debugging
- **DEPLOY ke Vercel** — bikin Waypoint kamu bisa diakses di internet
- Personalisasi: ubah warna/destinasi/tema jadi versi kamu sendiri

Sampai bertemu Day 4!

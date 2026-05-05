# 🌍 Waypoint - AI Travel Planner

**Selamat datang di Project Waypoint!** 🚀

Waypoint adalah aplikasi web modern yang membantu pengguna merencanakan perjalanan impian mereka secara otomatis menggunakan kecerdasan buatan (**Artificial Intelligence**).

Project ini dibuat khusus untuk pembelajaran **Full Stack Web Development** bagi pemula. Kita akan membangun aplikasi ini dari nol, mulai dari tampilan cantik hingga otak AI yang pintar.

---

## 🌟 Fitur Utama

- **🎨 Modern User Interface**: Desain premium dengan CSS modern (Flexbox, Grid, Variables).
- **🤖 AI-Powered Itinerary**: Generate rencana perjalanan lengkap dalam hitungan detik menggunakan **Google Gemini AI**.
- **⚡ Serverless Backend**: Backend aman dan cepat menggunakan teknologi Vercel Serverless Functions.
- **📱 Responsive Design**: Tampilan yang rapi di laptop maupun HP.
- **⚡ Real-time Interaction**: Loading state, modal popup, dan error handling yang interaktif.

---

## 🛠️ Teknologi yang Dipelajari

Di project ini, kita tidak menggunakan framework berat (seperti React atau Laravel). Kita fokus pada **Fundamental yang Kuat**:

1.  **Frontend (Tampilan)**:
    - **HTML5**: Struktur halaman semantic.
    - **CSS3**: Styling modern, CSS Variables, Responsive Layout.
    - **Vanilla JavaScript (ES6+)**: DOM Manipulation, Event Listeners, Fetch API, Async/Await.

2.  **Backend (Otak)**:
    - **Node.js**: Environment untuk menjalankan JavaScript di server.
    - **Vercel Serverless Functions**: Cara modern membuat API tanpa ribet sewa server.
    - **Google Gemini API**: Model AI canggih untuk menghasilkan teks itinerary.

---

## 📂 Struktur Project

```bash
waypoint/
├── 📄 index.html              # Kerangka utama website (Halaman Depan)
├── 📂 css/
│   └── 🎨 style.css           # Kode untuk mempercantik tampilan
├── 📂 js/
│   └── 🧠 app.js              # Logika Frontend (Interaksi tombol, form, dll)
├── 📂 api/
│   └── ⚡ generate-itinerary.js # Backend Serverless (Penghubung ke Google AI)
├── 📄 .env                    # (RAHASIA) Tempat menyimpan API KEY
├── 📄 vercel.json             # Konfigurasi server Vercel
└── 📄 package.json            # Daftar pustaka/library yang dipakai
```

---

## 🚀 Cara Menjalankan Project (Local Development)

Ikuti langkah ini untuk menjalankan Waypoint di komputer kamu:

### 1. Persiapan (Prerequisites)

Pastikan kamu sudah menginstall:

- [Node.js](https://nodejs.org/) (Versi LTS terbaru)
- Code Editor (VS Code)

### 2. Install Dependencies

Buka terminal di folder project ini, lalu ketik:

```bash
npm install
```

### 3. Setup API Key (Kunci Rahasia)

1.  Dapatkan API Key gratis dari [Google AI Studio](https://aistudio.google.com/app/apikey).
2.  Buat file baru bernama `.env`.
3.  Isi file `.env` dengan format berikut:
    ```env
    GEMINI_API_KEY=Paste_Key_Kamu_Disini
    ```

### 4. Jalankan Server

Ketik perintah ini di terminal:

```bash
npx vercel dev
```

Tunggu sebentar, lalu buka browser di alamat yang muncul (biasanya `http://localhost:3000`).

---

## 📝 Alur Kerja Aplikasi (Flow)

1.  **User** mengisi form (Destinasi, Hari, Budget, Minat).
2.  **Frontend (`app.js`)** mengambil data tersebut & mengirimnya ke Backend.
3.  **Backend (`api/...`)** menerima data, lalu membuat instruksi (prompt) untuk AI.
4.  **Google AI** memproses instruksi & membalas dengan Itinerary lengkap.
5.  **Backend** merapikan jawaban AI menjadi HTML.
6.  **Frontend** menampilkan hasilnya di layar (Popup Modal).

---

## 🐛 Troubleshooting (Bantuan)

**Q: Hasil itinerary pendek / terpotong?**

- Pastikan konfigurasi token di backend sudah `8192`.
- Cek prompt di backend sudah menggunakan instruksi `"detailed"` dan `"generate ALL days"`.

**Q: Error "Rate Limit Exceeded" (429)?**

- Google Gemini versi gratis punya batasan request per menit. Tunggu 1-2 menit, lalu coba lagi.

**Q: Masalah CORS saat deploy?**

- Pastikan konfigurasi `Access-Control-Allow-Origin` di file API sudah benar (`*` untuk belajar, domain spesifik untuk production).

---

Selamat belajar dan berkarya! Jangan takut salah, karena error adalah cara terbaik untuk belajar coding. 💻✨

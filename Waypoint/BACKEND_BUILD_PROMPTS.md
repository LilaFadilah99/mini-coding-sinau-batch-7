# 🧠 Build Backend AI - Step-by-Step Prompts

**Untuk Peserta:** Hari ini kita akan membangun "otak" dari aplikasi kita! Kode ini yang akan berbicara langsung dengan Google Gemini AI.

Kita akan membuat file baru di folder `api/` bernama `generate-itinerary.js`.

---

## 🔑 STEP 0: Ambil Kunci AI (API Key)

Sebelum coding, kita butuh "password" untuk pakai otak AI Google.

1. Buka: [aistudio.google.com](https://aistudio.google.com/app/apikey)
2. Klik **"Create API Key"**
3. Copy kodenya
4. Buka file `.env` di projek kamu, paste seperti ini:
   ```
   GEMINI_API_KEY=Paste_Kode_Kamu_Disini
   ```

---

## 🚀 PROMPT 1: Setup Server & Pintu Masuk (CORS)

Kita perlu buat server yang "ramah" (bisa diakses frontend) tapi "tegas" (hanya terima data yang benar).

**Kirim prompt ini ke AI:**

```
Halo! Saya mau bikin backend serverless untuk website travel planner saya.
Tolong buatkan kode dasar untuk file "api/generate-itinerary.js".

Fitur yang saya mau:
1. FUNCTION UTAMA: Export default function handler(req, res).

2. PINTU MASUK (CORS):
   - Izinkan akses dari mana saja (Access-Control-Allow-Origin: *)
   - Izinkan method POST dan OPTIONS saja.
   - Kalau ada request OPTIONS, langsung jawab status 200 (ini untuk precheck browser).

3. HANYA TERIMA "POST":
   - Kalau request bukan POST, tolak dengan error 405.

4. AMBIL DATA DARI USER:
   - Ambil data ini dari body request: destination, days, budget, interests.
   - Validasi data:
     * Pastikan semua data terisi.
     * Pastikan "days" itu angka antara 1 sampai 30.
     * Validasi budget harus salah satu dari: budget, moderate, luxury.

5. AMBIL API KEY:
   - Ambil "GEMINI_API_KEY" dari process.env.
   - Kalau key tidak ada, kasih error 500.

Tolong buatkan kerangkanya dulu dengan komentar yang jelas biar saya paham!
```

---

## 🧠 PROMPT 2: Otak AI (Prompting & Config)

Ini bagian paling PENTING. Kita harus setting AI supaya jawabannya **panjang** dan **lengkap** (tidak terpotong).

**Kirim prompt ini ke AI:**

```
Oke, sekarang update kodenya untuk memanggil Google Gemini AI.

Tambahkan logika ini di dalam blok try-catch:

1. SIAPKAN PERINTAH (PROMPT) UNTUK AI:
   Buat variabel string 'prompt' yang isinya instruksi detail ini:
   "Buatkan itinerary [days]-hari untuk [destination] dengan budget [budget].
   Fokus pada: [interests].

   PENTING:
   - Kamu HARUS generate FULL [days] hari. Jangan berhenti di tengah jalan.
   - Format setiap hari pakai Heading ### Day X.
   - List 3-5 aktivitas per hari dengan jam spesifik (misal 09:00 AM).
   - Kasih nama tempat dan deskripsi 2-3 kalimat.
   - Kasih emoji biar menarik."

2. PANGGIL GOOGLE:
   - URL: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"
   - Pakai fetch dengan method POST.
   - Masukkan API Key di URL query parameter.

3. SETTING PENTING (Supaya tidak terpotong):
   Di dalam body request, bagian generationConfig, atur ini:
   - maxOutputTokens: 8192 (Wajib angka ini supaya jawaban panjang muat!)
   - temperature: 0.7

Tolong tulis kode fetching-nya yang lengkap!
```

---

## 🎨 PROMPT 3: Penerjemah Bahasa (Markdown ke HTML)

AI menjawab pakai format Markdown (tanda bintang, pagar, dll). Browser butuh HTML. Kita butuh penerjemah.

**Kirim prompt ini ke AI:**

```
Terakhir! Jawaban AI kan masih berupa teks Markdown (pakai tanda # dan *).
Website saya butuh format HTML cantik.

Tolong buatkan HELPER FUNCTION bernama 'parseMarkdown(text)' di bawah function handler.

Fungsinya harus mengubah:
1. "### Judul"  -->  menjadi tag <h3> dengan class "itinerary-day"
2. "**Tebal**"  -->  menjadi tag <strong>
3. "* List"     -->  menjadi tag <li> dan dibungkus <ul>
4. Paragraf biasa --> dibungkus tag <p> class "itinerary-text"

Lalu, update function handler utama:
- Setelah dapat jawaban AI, panggil function 'parseMarkdown' ini.
- Kirim hasil HTML-nya ke frontend dengan status 200 json: { success: true, itinerary: html }
- Kalau ada error, kirim status 500.

Gabungkan semuanya jadi satu file utuh yang siap pakai!
```

---

## ✅ Checklist Kode Akhir

Pastikan kode hasil generate AI punya ciri-ciri ini:

1. **Token Besar:** `maxOutputTokens: 8192` (Kalau 2048, ganti manual!)
2. **Model Benar:** `gemini-1.5-flash` (Bukan 2.5 atau pro)
3. **Validasi:** Ada pengecekan `!destination` atau `!GEMINI_API_KEY`.
4. **Parsing:** Ada function `parseMarkdown` di paling bawah.

Kalau sudah sesuai, copy kodenya ke file `api/generate-itinerary.js` kamu! 🚀

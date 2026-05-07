// =====================================================
// MOBILE MENU - logika buka/tutup menu di tampilan HP
// =====================================================

// Tunggu sampai semua HTML selesai dimuat sebelum script jalan.
// Penting kalau <script> dipasang di <head>, biar element belum
// ada nggak bikin querySelector return null.
document.addEventListener("DOMContentLoaded", () => {
  // -----------------------------------------------------
  // 1. Ambil element-element yang dipakai dari DOM
  // -----------------------------------------------------
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Kalau tombol atau menu nggak ketemu di halaman, hentikan
  // script di sini biar nggak error pas pasang event listener.
  if (!mobileMenuBtn || !navMenu) return;

  // -----------------------------------------------------
  // 2. Fungsi helper: tutup menu mobile
  //    Dibikin function karena dipakai di beberapa tempat
  //    (klik link & klik di luar) — biar nggak duplikat kode.
  // -----------------------------------------------------
  function closeMobileMenu() {
    navMenu.classList.remove("mobile-active");
    mobileMenuBtn.classList.remove("active");
  }

  // -----------------------------------------------------
  // 3. Klik tombol hamburger → buka/tutup menu
  // -----------------------------------------------------
  mobileMenuBtn.addEventListener("click", (event) => {
    // stopPropagation supaya event klik ini nggak "naik" ke document.
    // Kalau naik, listener "klik di luar" di bawah bakal langsung
    // nutup menu yang baru saja dibuka.
    event.stopPropagation();

    // toggle = tambah class kalau belum ada, hapus kalau sudah ada
    navMenu.classList.toggle("mobile-active");
    mobileMenuBtn.classList.toggle("active");
  });

  // -----------------------------------------------------
  // 4. Klik salah satu link nav → otomatis tutup menu
  //    (biar setelah pilih menu, tampilan langsung clean lagi)
  // -----------------------------------------------------
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileMenu();
    });
  });

  // -----------------------------------------------------
  // 5. Klik di area LUAR menu → tutup menu
  // -----------------------------------------------------
  document.addEventListener("click", (event) => {
    // Cek dulu: menu lagi terbuka nggak? Kalau lagi tertutup
    // nggak perlu ngapa-ngapain — early return biar irit.
    const menuSedangTerbuka = navMenu.classList.contains("mobile-active");
    if (!menuSedangTerbuka) return;

    // Cek posisi klik: di dalam menu? di tombol hamburger?
    // .contains() mengecek apakah event.target ada di dalam
    // element tersebut (termasuk element itu sendiri).
    const klikDiDalamMenu = navMenu.contains(event.target);
    const klikDiTombol = mobileMenuBtn.contains(event.target);

    // Kalau klik BUKAN di menu DAN BUKAN di tombol → tutup menu
    if (!klikDiDalamMenu && !klikDiTombol) {
      closeMobileMenu();
    }
  });
});

// ============================================
// app/not-found.jsx — Custom 404 Page
// ============================================
// Tampil saat user akses URL yang tidak ada (e.g., /halaman-tidak-ada)

import Link from "next/link";

export const metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-bg-secondary">
      <div className="max-w-md w-full text-center">
        <span className="text-7xl block mb-6">🗺️</span>
        <h1 className="text-5xl font-bold text-text-primary mb-3">404</h1>
        <p className="text-xl text-text-secondary mb-2">Halaman tidak ditemukan</p>
        <p className="text-text-muted mb-8">
          Sepertinya kamu nyasar di tempat yang tidak ada di peta.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-brand text-[#1a1a1a] rounded-full font-bold transition hover:bg-brand-hover hover:-translate-y-0.5 hover:shadow-brand-glow"
        >
          ✨ Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}

"use client";

// ============================================
// app/error.jsx — Global Error Boundary
// ============================================
// Next.js akan otomatis pakai file ini saat ada error tidak tertangkap di
// component pages. User dapat UI yang ramah, bukan layar putih / stack trace.

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log error untuk debugging — di production bisa kirim ke service monitoring
    console.error("App error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-bg-secondary">
      <div className="max-w-md w-full text-center">
        <span className="text-6xl block mb-6">😕</span>
        <h1 className="text-3xl font-bold text-text-primary mb-3">
          Oops! Ada yang salah
        </h1>
        <p className="text-text-secondary mb-8">
          {error?.message || "Terjadi kesalahan tidak terduga. Coba lagi atau reload halaman."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-brand text-[#1a1a1a] rounded-full font-bold transition hover:bg-brand-hover hover:-translate-y-0.5 hover:shadow-brand-glow"
          >
            Coba Lagi
          </button>
          <a
            href="/"
            className="px-6 py-3 border border-border-default rounded-full font-medium text-text-secondary transition hover:bg-bg-tertiary hover:text-text-primary"
          >
            Kembali ke Beranda
          </a>
        </div>
      </div>
    </div>
  );
}

// ============================================
// app/loading.jsx — Loading UI
// ============================================
// Next.js otomatis pakai file ini saat halaman loading (fetching data, dll)
// Tampil sebagai Suspense boundary fallback

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-white">
      {/* Spinner */}
      <div
        className="w-16 h-16 rounded-full border-4 border-border-light border-t-brand animate-spin"
        style={{ boxShadow: "0 0 20px rgba(139, 255, 102, 0.2)" }}
      />
      <p className="text-lg font-bold text-text-primary tracking-tight">
        Loading Waypoint...
      </p>
    </div>
  );
}

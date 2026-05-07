import { createClient } from "@supabase/supabase-js";

// Inisialisasi Supabase client
// Pakai NEXT_PUBLIC_ prefix biar bisa diakses dari client component
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// Flag untuk cek apakah credentials sudah diset
export const isSupabaseConfigured = Boolean(supabaseUrl && supabasePublishableKey);

if (!isSupabaseConfigured) {
  console.warn(
    "⚠️ Supabase URL atau Publishable Key belum diset di .env.local. " +
      "Endpoint /api/destinations & /api/saved-trips tidak akan jalan."
  );
}

// Pakai dummy URL valid format kalau credentials belum diset.
// Ini mencegah error saat build, tapi query akan fail saat runtime
// (dengan error message jelas dari Supabase).
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabasePublishableKey || "placeholder-key"
);

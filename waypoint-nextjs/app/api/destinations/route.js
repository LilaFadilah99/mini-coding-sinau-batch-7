// ============================================
// API Route: Destinations (Popular Destinations)
// ============================================
// Endpoint: GET /api/destinations
// Flow: query Supabase tabel `destinations` → kirim balik JSON

import { supabase } from "@/lib/supabase";

// Force dynamic — jangan prerender saat build
// (perlu env vars yang baru tersedia saat runtime/deploy)
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("destinations")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("❌ Supabase error (destinations):", error);
      return Response.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return Response.json(data || []);
  } catch (error) {
    console.error("❌ Unexpected error (destinations):", error);
    return Response.json(
      { success: false, error: "Gagal mengambil destinations." },
      { status: 500 }
    );
  }
}

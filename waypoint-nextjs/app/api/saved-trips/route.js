// ============================================
// API Route: Saved Trips
// ============================================
// Endpoints:
//   GET    /api/saved-trips      → list semua saved trips (terbaru dulu)
//   POST   /api/saved-trips      → save trip baru
//   DELETE /api/saved-trips?id=X → hapus trip by id

import { supabase } from "@/lib/supabase";

// Force dynamic — jangan prerender saat build
// (perlu env vars yang baru tersedia saat runtime/deploy)
export const dynamic = "force-dynamic";

// ============================================
// GET: List semua saved trips
// ============================================
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("saved_trips")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("❌ Supabase error (GET saved-trips):", error);
      return Response.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return Response.json(data || []);
  } catch (error) {
    console.error("❌ Unexpected error (GET saved-trips):", error);
    return Response.json(
      { success: false, error: "Gagal mengambil saved trips." },
      { status: 500 }
    );
  }
}

// ============================================
// POST: Save trip baru
// ============================================
export async function POST(request) {
  try {
    const body = await request.json();
    const { destination, days, budget, interests, itinerary } = body;

    // Validasi field wajib
    if (!destination || !days || !budget || !itinerary) {
      return Response.json(
        {
          success: false,
          error: "Field tidak lengkap. Wajib: destination, days, budget, itinerary.",
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("saved_trips")
      .insert([
        {
          destination,
          days: parseInt(days),
          budget,
          interests: interests || "",
          itinerary,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("❌ Supabase error (POST saved-trips):", error);
      return Response.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return Response.json({ success: true, trip: data }, { status: 201 });
  } catch (error) {
    console.error("❌ Unexpected error (POST saved-trips):", error);
    return Response.json(
      { success: false, error: "Gagal menyimpan trip." },
      { status: 500 }
    );
  }
}

// ============================================
// DELETE: Hapus trip by id (?id=X)
// ============================================
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return Response.json(
        { success: false, error: "Parameter ?id wajib." },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("saved_trips").delete().eq("id", id);

    if (error) {
      console.error("❌ Supabase error (DELETE saved-trips):", error);
      return Response.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("❌ Unexpected error (DELETE saved-trips):", error);
    return Response.json(
      { success: false, error: "Gagal menghapus trip." },
      { status: 500 }
    );
  }
}

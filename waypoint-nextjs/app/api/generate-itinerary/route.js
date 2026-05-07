// ============================================
// API Route: Generate Itinerary via Google Gemini
// ============================================
// Format: Next.js App Router (route.js)
// Endpoint: POST /api/generate-itinerary
// Flow: terima form data → susun prompt → panggil Gemini → ubah Markdown ke HTML → kirim balik

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

export async function POST(request) {
  try {
    // ============================================
    // 1. Ambil & validasi data dari frontend
    // ============================================
    const body = await request.json();
    const { destination, days, budget, style } = body;

    // Cek field wajib
    if (!destination || !days || !budget || !style) {
      return Response.json(
        {
          success: false,
          error: "Field tidak lengkap. Wajib ada: destination, days, budget, style.",
        },
        { status: 400 }
      );
    }

    // Validasi destination
    if (typeof destination !== "string" || destination.trim() === "") {
      return Response.json(
        { success: false, error: "Destination harus berupa nama kota yang valid." },
        { status: 400 }
      );
    }

    // Validasi days (1–30)
    const daysNum = parseInt(days);
    if (isNaN(daysNum) || daysNum < 1 || daysNum > 30) {
      return Response.json(
        { success: false, error: "Days harus angka antara 1 sampai 30." },
        { status: 400 }
      );
    }

    // Validasi budget (3 nilai valid)
    const validBudgets = ["budget", "moderate", "luxury"];
    if (!validBudgets.includes(budget.toLowerCase())) {
      return Response.json(
        { success: false, error: "Budget harus salah satu dari: budget, moderate, luxury." },
        { status: 400 }
      );
    }

    // ============================================
    // 2. Cek API key Gemini dari environment
    // ============================================
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
      console.error("❌ GEMINI_API_KEY belum diset di environment variables");
      return Response.json(
        { success: false, error: "Server tidak terkonfigurasi. Hubungi admin." },
        { status: 500 }
      );
    }

    // ============================================
    // 3. Susun prompt untuk Gemini
    // ============================================
    const prompt = `Create a detailed ${daysNum}-day itinerary for ${destination} with a ${budget} budget.

Focus: ${style}

IMPORTANT: You MUST generate ALL ${daysNum} days completely. Do not summarize.

Format for each day:
- Use ### for day headings (e.g., ### Day 1: Arrival & Exploration 🛬)
- List 3-5 key activities per day with specific times (e.g., 09:00 AM, 02:00 PM)
- Include specific place names and brief descriptions (2-3 sentences each)
- Add relevant emojis for engagement

Generate ALL ${daysNum} days before finishing. Be practical, realistic, and exciting!`;

    console.log("📝 Generating itinerary for:", destination, `(${daysNum} days)`);

    // ============================================
    // 4. Panggil Gemini API
    // ============================================
    const geminiResponse = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 8192, // WAJIB 8192 biar response multi-day tidak terpotong
          topP: 0.8,
          topK: 40,
        },
      }),
    });

    // ============================================
    // 5. Handle error dari Gemini
    // ============================================
    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.json().catch(() => ({}));
      console.error("❌ Gemini API Error:", geminiResponse.status, errorData);

      if (geminiResponse.status === 429) {
        return Response.json(
          {
            success: false,
            error: "Terlalu banyak request. Tunggu 1-2 menit lalu coba lagi.",
          },
          { status: 429 }
        );
      }

      return Response.json(
        { success: false, error: "Gagal generate itinerary. Coba lagi nanti." },
        { status: 500 }
      );
    }

    // ============================================
    // 6. Parse response Gemini
    // ============================================
    const data = await geminiResponse.json();

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error("Struktur response Gemini tidak valid");
    }

    const generatedText = data.candidates[0].content.parts[0].text;

    // ============================================
    // 7. Ubah Markdown ke HTML
    // ============================================
    const formattedHTML = parseMarkdown(generatedText);

    console.log("✅ Itinerary berhasil di-generate");

    return Response.json({
      success: true,
      itinerary: formattedHTML,
    });
  } catch (error) {
    // ============================================
    // 8. Global error handler
    // ============================================
    console.error("❌ Unexpected error:", error);
    return Response.json(
      { success: false, error: "Terjadi kesalahan tak terduga. Coba lagi nanti." },
      { status: 500 }
    );
  }
}

// ============================================
// Helper: parseMarkdown(text)
// Konversi Markdown ke HTML untuk styling itinerary
// ============================================
function parseMarkdown(markdown) {
  if (!markdown) return "";

  let html = markdown;

  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3 class="itinerary-day">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="itinerary-section">$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1 class="itinerary-title">$1</h1>');

  // Bold & italic
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Lists (* item or - item)
  html = html.replace(/^\* (.+)$/gm, "<li>$1</li>");
  html = html.replace(/^- (.+)$/gm, "<li>$1</li>");

  // Wrap consecutive <li> in <ul>
  html = html.replace(/(<li>.*<\/li>\n?)+/g, function (match) {
    return '<ul class="itinerary-list">' + match + "</ul>";
  });

  // Horizontal rules
  html = html.replace(/^---+$/gm, '<hr class="itinerary-divider">');
  html = html.replace(/^\*\*\*+$/gm, '<hr class="itinerary-divider">');

  // Paragraphs
  html = html
    .split(/\n\n+/)
    .map((block) => {
      block = block.trim();
      if (
        block.startsWith("<h") ||
        block.startsWith("<ul") ||
        block.startsWith("<hr") ||
        block.startsWith("<p")
      ) {
        return block;
      }
      if (!block) return "";
      return '<p class="itinerary-text">' + block.replace(/\n/g, "<br>") + "</p>";
    })
    .join("\n");

  return html;
}

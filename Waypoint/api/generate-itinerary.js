/* ============================================
   WanderWise AI - Secure Backend API
   
   Serverless Function (Vercel/Netlify Compatible)
   Handles AI itinerary generation securely
   ============================================ */

/**
 * Main handler for the serverless function
 * @param {Request} req - The incoming request
 * @param {Response} res - The response object
 */
export default async function handler(req, res) {
  // ============================================
  // 1. CORS Configuration
  // Allow requests from your frontend
  // ============================================
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*"); // In production, set this to your domain
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // ============================================
  // 2. Method Validation
  // Only accept POST requests
  // ============================================
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed. Please use POST request.",
    });
  }

  try {
    // ============================================
    // 3. Extract and Validate Request Data
    // ============================================
    const { destination, days, budget, style } = req.body;

    // Validate required fields
    if (!destination || !days || !budget || !style) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields. Please provide: destination, days, budget, and style.",
      });
    }

    // Validate data types
    if (typeof destination !== "string" || destination.trim() === "") {
      return res.status(400).json({
        success: false,
        error: "Invalid destination. Please provide a valid location name.",
      });
    }

    const daysNum = parseInt(days);
    if (isNaN(daysNum) || daysNum < 1 || daysNum > 30) {
      return res.status(400).json({
        success: false,
        error: "Invalid number of days. Please provide a value between 1 and 30.",
      });
    }

    const validBudgets = ["budget", "moderate", "luxury"];
    if (!validBudgets.includes(budget.toLowerCase())) {
      return res.status(400).json({
        success: false,
        error: "Invalid budget type. Please choose: budget, moderate, or luxury.",
      });
    }

    // ============================================
    // 4. Get API Key from Environment
    // ============================================
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
      console.error("❌ GEMINI_API_KEY is not configured in environment variables");
      return res.status(500).json({
        success: false,
        error: "Server configuration error. Please contact the administrator.",
      });
    }

    // ============================================
    // 5. Construct the AI Prompt (Server-side)
    // This cannot be modified by the client
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
    // 6. Call Gemini API
    // ============================================
    const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 8192,
          topP: 0.8,
          topK: 40,
        },
      }),
    });

    // ============================================
    // 7. Handle API Errors
    // ============================================
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("❌ Gemini API Error:", response.status, errorData);

      // Handle rate limiting (429)
      if (response.status === 429) {
        return res.status(429).json({
          success: false,
          error: "Too many requests! Please wait 1-2 minutes and try again. The AI service has rate limits to ensure fair usage.",
        });
      }

      // Handle other API errors
      // handle the data every time people refresh
      return res.status(500).json({
        success: false,
        error: "Failed to generate itinerary. Please try again in a moment.",
      });
    }

    // ============================================
    // 8. Parse and Return Response
    // ============================================
    const data = await response.json();

    // Extract the generated text
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error("Invalid response structure from Gemini API");
    }

    const generatedText = data.candidates[0].content.parts[0].text;

    // Convert Markdown to HTML (you'll need the parseMarkdown function)
    const formattedHTML = parseMarkdown(generatedText);

    console.log("✅ Itinerary generated successfully");

    // Return success response
    return res.status(200).json({
      success: true,
      itinerary: formattedHTML,
    });
  } catch (error) {
    // ============================================
    // 9. Global Error Handler
    // ============================================
    console.error("❌ Unexpected error:", error);

    return res.status(500).json({
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    });
  }
}

/**
 * Convert Markdown text to HTML.
 * This is a simple parser for common Markdown elements.
 * @param {string} markdown - The Markdown text to convert
 * @returns {string} - The converted HTML string
 */
function parseMarkdown(markdown) {
  if (!markdown) return "";

  let html = markdown;

  // ----- STEP 1: Handle Headers -----
  // ### Header 3 → <h3>Header 3</h3>
  html = html.replace(/^### (.+)$/gm, '<h3 class="itinerary-day">$1</h3>');
  // ## Header 2 → <h2>Header 2</h2>
  html = html.replace(/^## (.+)$/gm, '<h2 class="itinerary-section">$1</h2>');
  // # Header 1 → <h1>Header 1</h1>
  html = html.replace(/^# (.+)$/gm, '<h1 class="itinerary-title">$1</h1>');

  // ----- STEP 2: Handle Bold and Italic -----
  // **bold** → <strong>bold</strong>
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  // *italic* → <em>italic</em>
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // ----- STEP 3: Handle Lists -----
  // Convert bullet points: * item or - item
  html = html.replace(/^\* (.+)$/gm, "<li>$1</li>");
  html = html.replace(/^- (.+)$/gm, "<li>$1</li>");

  // Wrap consecutive <li> elements in <ul>
  html = html.replace(/(<li>.*<\/li>\n?)+/g, function (match) {
    return '<ul class="itinerary-list">' + match + "</ul>";
  });

  // ----- STEP 4: Handle Horizontal Rules -----
  // --- or *** → <hr>
  html = html.replace(/^---+$/gm, '<hr class="itinerary-divider">');
  html = html.replace(/^\*\*\*+$/gm, '<hr class="itinerary-divider">');

  // ----- STEP 5: Handle Paragraphs -----
  // Wrap remaining text blocks in <p> tags
  // Split by double newlines and wrap non-tagged content
  html = html
    .split(/\n\n+/)
    .map((block) => {
      block = block.trim();
      // Skip if already has HTML tags
      if (block.startsWith("<h") || block.startsWith("<ul") || block.startsWith("<hr") || block.startsWith("<p")) {
        return block;
      }
      // Skip empty blocks
      if (!block) return "";
      // Wrap in paragraph
      return '<p class="itinerary-text">' + block.replace(/\n/g, "<br>") + "</p>";
    })
    .join("\n");

  return html;
}

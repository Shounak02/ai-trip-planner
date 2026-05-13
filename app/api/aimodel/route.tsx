import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const SYSTEM_PROMPT = `
You are an expert AI Travel Planner. Generate a complete, realistic travel plan based on the user's preferences.

Requirements:
1. Recommend 3–4 hotels matching the user's budget, hotel preferences, and star rating. Each hotel must include:
   - hotel_name (real hotel name)
   - hotel_address (full address)
   - price_per_night (e.g. "$120/night")
   - hotel_image_url (leave as empty string "")
   - geo_coordinates: { latitude: number, longitude: number }
   - rating (1-5 number)
   - description (2-3 sentences)

2. Create a day-by-day itinerary. Each day includes:
   - day (number starting from 1)
   - day_plan (brief summary of the day)
   - best_time_to_visit_day (e.g. "Morning to Evening")
   - activities (array of 3-4 places/activities per day):
     - place_name
     - place_details (2-3 sentences about the place)
     - place_image_url (leave as empty string "")
     - geo_coordinates: { latitude: number, longitude: number }
     - place_address
     - ticket_pricing (e.g. "Free", "$15/person")
     - time_travel_each_location (e.g. "2-3 hours")
     - best_time_to_visit (e.g. "9 AM - 12 PM")

Output JSON Schema (return ONLY this JSON, no markdown):
{
  "trip_plan": {
    "origin": "string",
    "destination": "string",
    "duration": "string",
    "budget": "string",
    "group_size": "string",
    "travel_styles": ["string"],
    "hotel_preferences": ["string"],
    "additional_notes": "A friendly, encouraging note of 3-4 sentences giving travel tips, weather advice, or packing suggestions specific to the destination and group type.",
    "hotels": [{ ...hotel schema }],
    "itinerary": [{ ...day schema }]
  }
}

Rules:
- Return ONLY valid JSON following the schema above.
- Do NOT include any extra text, markdown, or explanation.
- Use real place names, real hotel names, and realistic pricing.
- Tailor activities to the travel styles the user selected.
- Match hotels to the user's budget level and hotel preferences.
`;

export async function POST(req: NextRequest) {
  console.log("➡️ [API] POST /api/aimodel called");
  const apiKey = process.env.OPENROUTER_API_KEY;
  console.log("🔑 [API] OPENROUTER_API_KEY present:", !!apiKey);

  if (!apiKey) {
    return NextResponse.json({ error: "OpenRouter API Key is missing" }, { status: 500 });
  }

  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: apiKey,
  });

  try {
    const body = await req.json();
    const { formData } = body;

    if (!formData) {
      return NextResponse.json(
        { error: "Missing formData in request body" },
        { status: 400 }
      );
    }

    const userMessage = `
Plan a trip with these details:
- Origin: ${formData.origin}
- Destination: ${formData.destination}
- Duration: ${formData.duration} days
- Group: ${formData.groupType}
- Budget: ${formData.budget}
- Travel Styles: ${formData.travelStyles?.join(", ") || "General"}
- Hotel Star Rating: ${formData.hotelStarRating || "Any"}
- Hotel Amenities: ${formData.hotelAmenities?.join(", ") || "No preference"}
- Hotel Type: ${formData.hotelType || "Any"}
- Additional Notes: ${formData.additionalNotes || "None"}
    `.trim();

    console.log("➡️ [API] Calling OpenRouter with model: openai/gpt-4o-mini");

    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4o-mini",
      temperature: 0.7,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage },
      ],
    });

    console.log("✅ [API] Completion received");

    const message = completion.choices?.[0]?.message;

    if (!message?.content) {
      return NextResponse.json(
        { error: "Model returned no content" },
        { status: 500 }
      );
    }

    let parsed;
    try {
      // Remove potential markdown code blocks
      const cleanContent = message.content.replace(/```json|```/g, "").trim();
      parsed = JSON.parse(cleanContent);
    } catch {
      return NextResponse.json(
        { error: "Model did not return valid JSON", raw: message.content },
        { status: 500 }
      );
    }

    return NextResponse.json(parsed);
  } catch (error: any) {
    console.error("🔥 [API] Uncaught error in /api/aimodel:", error);
    return NextResponse.json(
      { 
        error: error.message ?? "Unknown server error", 
        details: error.response?.data ?? error.stack,
        source: "api_route"
      },
      { status: 500 }
    );
  }
}

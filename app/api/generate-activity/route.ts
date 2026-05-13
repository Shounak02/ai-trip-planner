import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const SYSTEM_PROMPT = `
You are a travel expert. Suggest ONE specific, real, and interesting activity or location for a traveler.
Return ONLY a JSON object matching this schema:
{
  "place_name": "string",
  "place_details": "string (2-3 sentences)",
  "geo_coordinates": { "latitude": number, "longitude": number },
  "place_address": "string",
  "ticket_pricing": "string",
  "time_travel_each_location": "string",
  "best_time_to_visit": "string (e.g. '2:00 PM - 4:00 PM')"
}
Rules:
- The activity must be DIFFERENT from the ones provided by the user.
- It must be a real place in the specified destination.
- CRITICAL: The "best_time_to_visit" must be logically AFTER the "lastActivityTime" provided by the user.
- If lastActivityTime is provided, calculate a sensible 2-3 hour window that follows it.
`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "Missing API Key" }, { status: 500 });

  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: apiKey,
  });

  try {
    const { destination, existingActivities, lastActivityTime } = await req.json();

    const userMessage = `
      Destination: ${destination}
      Existing Activities: ${existingActivities.join(", ")}
      The previous activity ended around: ${lastActivityTime || "9:00 AM"}
      Suggest ONE new, highly-rated activity or hidden gem that should happen AFTER this time.
    `;

    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage },
      ],
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error("No content from AI");

    const cleanContent = content.replace(/```json|```/g, "").trim();
    return NextResponse.json(JSON.parse(cleanContent));
  } catch (error: any) {
    console.error("Generate Activity Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

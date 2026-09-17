import { GoogleGenAI } from "@google/genai";

const GROQ_API_KEY = process.env.GROQ_API_KEY || "";
const GROQ_BASE = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "qwen/qwen3.8-27b";

const gemini1 = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY_1 || "missing" });
const gemini2 = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY_2 || "missing" });

function parseJSON(text) {
  let cleaned = text.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```json\n?/, "").replace(/```\n?$/, "");
  }
  return JSON.parse(cleaned);
}

async function groqChat(messages) {
  const res = await fetch(GROQ_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages,
      temperature: 0.7,
      max_tokens: 1024,
      response_format: { type: "json_object" },
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `Groq API error ${res.status}`);
  }
  const data = await res.json();
  return data.choices[0].message.content;
}

async function geminiGenerate(params) {
  try {
    return await gemini1.models.generateContent(params);
  } catch (e) {
    console.warn("Gemini Key 1 failed, trying Key 2...", e.message);
    return await gemini2.models.generateContent(params);
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { farm, crop, stage, weather } = req.body;

    const prompt = `You are an expert agronomist AI for the Sanjivani app.
Generate today's daily advice for a farmer based on the following context:
Crop: ${crop.name}
Stage: ${stage.name} (Day ${stage.startDay} to ${stage.endDay})
Weather: ${weather.temperature}°C, ${weather.condition}, Humidity: ${weather.humidity}%, Rain Probability: ${weather.rainProbability}%
Farm Profile: ${farm.area} ${farm.areaUnit}, ${farm.soilType} soil, ${farm.irrigationMethod} irrigation.

Return a highly contextual structured JSON object matching this schema exactly, with NO markdown wrappers:
{
  "tasks": [
    { "type": "irrigation", "what": "Specific irrigation advice", "why": "Why this is needed based on weather/soil/stage" },
    { "type": "nutrition", "what": "Specific nutrition advice", "why": "Why this is needed" }
  ],
  "weatherContext": {
    "impact": "How today's weather specifically impacts this crop at this stage",
    "action": "What the farmer should do about the weather today"
  },
  "disease": {
    "risk": "Low/Medium/High",
    "alert": "Specific disease or pest to watch out for based on humidity/temp",
    "action": "Preventative action"
  }
}`;

    // Try Groq first
    if (GROQ_API_KEY) {
      try {
        const raw = await groqChat([{ role: "user", content: prompt }]);
        return res.status(200).json(parseJSON(raw));
      } catch (e) {
        console.warn("[API] Groq failed, falling back to Gemini:", e.message);
      }
    }

    // Fallback to Gemini
    const response = await geminiGenerate({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: { responseMimeType: "application/json" },
    });
    return res.status(200).json(parseJSON(response.text));
  } catch (error) {
    console.error("[API] All providers failed:", error);
    return res.status(500).json({ error: "All AI providers failed" });
  }
}

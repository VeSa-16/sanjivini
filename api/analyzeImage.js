import { GoogleGenAI } from "@google/genai";

const GROQ_API_KEY = process.env.GROQ_API_KEY || "";
const GROQ_BASE = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_VISION_MODEL = "openai/gpt-oss-20b";

const gemini1 = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY_1 || "missing" });
const gemini2 = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY_2 || "missing" });

function parseJSON(text) {
  let cleaned = text.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```json\n?/, "").replace(/```\n?$/, "");
  }
  return JSON.parse(cleaned);
}

async function groqVision(base64Image, mimeType, systemPrompt) {
  const res = await fetch(GROQ_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: GROQ_VISION_MODEL,
      messages: [
        { role: "user", content: [
          { type: "text", text: systemPrompt },
          { type: "image_url", image_url: { url: `data:${mimeType};base64,${base64Image}` } },
        ]},
      ],
      temperature: 0.4,
      max_tokens: 1024,
      response_format: { type: "json_object" },
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `Groq Vision error ${res.status}`);
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
    const { base64Image, cropName, stageName, mimeType } = req.body;

    const prompt = `You are an expert agronomist. 
Analyze this image of a ${cropName} plant at the ${stageName} stage.
Identify any visible diseases, pests, or deficiencies.
If the plant looks healthy, state that.
Return a structured JSON object exactly matching this schema, with no markdown wrappers:
{
  "diseaseName": "Name of the issue, or 'Healthy' if none",
  "confidence": "High/Medium/Low",
  "cause": "Brief explanation of what causes this",
  "immediateAction": "The single most important next step or treatment"
}`;

    // Try Groq Vision first
    if (GROQ_API_KEY) {
      try {
        const raw = await groqVision(base64Image, mimeType || "image/jpeg", prompt);
        return res.status(200).json(parseJSON(raw));
      } catch (e) {
        console.warn("[API] Groq Vision failed, falling back to Gemini:", e.message);
      }
    }

    // Fallback to Gemini
    const response = await geminiGenerate({
      model: "gemini-3.6-flash",
      contents: [
        { role: "user", parts: [
          { text: prompt },
          { inlineData: { data: base64Image, mimeType: mimeType || "image/jpeg" } },
        ]},
      ],
      config: { responseMimeType: "application/json" },
    });
    return res.status(200).json(parseJSON(response.text));
  } catch (error) {
    console.error("[API] All providers failed:", error);
    return res.status(500).json({ error: "All AI providers failed" });
  }
}

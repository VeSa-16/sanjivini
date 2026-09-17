import { GoogleGenAI } from "@google/genai";

const ai1 = new GoogleGenAI({ 
  apiKey: import.meta.env.VITE_GEMINI_API_KEY_1 || "missing-key-1"
});

const ai2 = new GoogleGenAI({ 
  apiKey: import.meta.env.VITE_GEMINI_API_KEY_2 || "missing-key-2"
});

async function fetchWithFallback(params) {
  try {
    return await ai1.models.generateContent(params);
  } catch (error) {
    console.warn("Primary API Key failed, falling back to secondary key...", error);
    try {
      return await ai2.models.generateContent(params);
    } catch (fallbackError) {
      console.error("Secondary API Key also failed:", fallbackError);
      throw fallbackError;
    }
  }
}

function parseResponse(text) {
  let cleaned = text.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```json\n?/, "").replace(/```\n?$/, "");
  }
  return JSON.parse(cleaned);
}

export async function analyzeCropImage(base64Image, cropName, stageName, mimeType = "image/jpeg") {
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

  try {
    const response = await fetchWithFallback({
      model: "gemini-3.6-flash",
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            {
              inlineData: {
                data: base64Image,
                mimeType: mimeType
              }
            }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json",
      }
    });

    return parseResponse(response.text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to analyze image");
  }
}

export async function generateDailyAdvice(farm, crop, stage, weather) {
  const prompt = `You are an expert agronomist AI for the Sanjivani app.
Generate today's daily advice for a farmer based on the following context:
Crop: ${crop.name}
Stage: ${stage.name} (Day ${stage.startDay} to ${stage.endDay})
Weather: ${weather.temperature}°C, ${weather.condition}, Humidity: ${weather.humidity}%, Rain Probability: ${weather.rainProbability}%
Farm Profile: ${farm.area} ${farm.areaUnit}, ${farm.soilType} soil, ${farm.irrigationMethod} irrigation.

Return a highly contextual structured JSON object matching this schema exactly, with NO markdown wrappers:
{
  "tasks": [
    { "type": "irrigation", "what": "Specific irrigation advice (e.g., 'Run drip for 2 hours today')", "why": "Why this is needed based on weather/soil/stage" },
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

  try {
    const response = await fetchWithFallback({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    return parseResponse(response.text);
  } catch (error) {
    console.error("Gemini API Error for daily advice:", error);
    throw new Error("Failed to generate daily advice");
  }
}

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ 
  apiKey: import.meta.env.VITE_GEMINI_API_KEY 
});

export async function analyzeCropImage(base64Image, cropName, stageName, mimeType = "image/jpeg") {
  const prompt = `
You are an expert agronomist. 
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
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
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

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to analyze image");
  }
}

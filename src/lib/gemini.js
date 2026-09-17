// Frontend AI client — all keys are on the server, never exposed to the browser.

function parseJSON(text) {
  let cleaned = text.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```json\n?/, "").replace(/```\n?$/, "");
  }
  return JSON.parse(cleaned);
}

export async function analyzeCropImage(base64Image, cropName, stageName, mimeType = "image/jpeg") {
  const res = await fetch("/api/analyzeImage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ base64Image, cropName, stageName, mimeType }),
  });

  if (!res.ok) {
    throw new Error("Failed to analyze image");
  }

  return res.json();
}

export async function generateDailyAdvice(farm, crop, stage, weather) {
  const res = await fetch("/api/generateAdvice", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ farm, crop, stage, weather }),
  });

  if (!res.ok) {
    throw new Error("Failed to generate daily advice");
  }

  return res.json();
}

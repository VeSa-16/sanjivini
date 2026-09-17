import irrigationRules from "../data/rules/irrigationRules.json";
import fertilizerSchedule from "../data/rules/fertilizerSchedule.json";
import diseaseRules from "../data/rules/diseaseRiskRules.json";

function matchesIrrigation(rule, stage, weather, farmerInputs) {
  const when = rule.when || {};
  if (when.stageIds && !when.stageIds.includes(stage.id)) return false;
  if (when.rainProbabilityMin != null && weather.rainProbability < when.rainProbabilityMin) return false;
  if (when.rainProbabilityMax != null && weather.rainProbability > when.rainProbabilityMax) return false;
  if (when.temperatureMin != null && weather.temperature < when.temperatureMin) return false;
  if (
    when.daysSinceIrrigationMin != null &&
    (farmerInputs.daysSinceIrrigation ?? 99) < when.daysSinceIrrigationMin
  ) return false;
  return true;
}

export function generateTodayAdvice(stage, weather, farmerInputs = {}) {
  const { healthMode } = farmerInputs;

  // 1. Irrigation Task
  let irrigation =
    irrigationRules.rules.find((rule) => matchesIrrigation(rule, stage, weather, farmerInputs)) ||
    irrigationRules.fallback;

  // Weather Impact parsing
  let weatherImpact = "Weather conditions are stable.";
  let weatherAction = "Continue with normal crop care.";
  
  if (weather.rainProbability > 60 || weather.id === "rain") {
    weatherImpact = "Rain may provide sufficient moisture.";
    weatherAction = "Hold irrigation for now and check soil tomorrow.";
    
    // Override irrigation task
    irrigation = {
      title: "Postpone irrigation",
      why: "Expected rain will provide necessary moisture without risk of waterlogging.",
      how: "Turn off drip systems and ensure field drains are clear."
    };
  } else if (weather.temperature > 32) {
    weatherImpact = "High temperatures may stress the crop.";
    weatherAction = "Ensure adequate soil moisture and avoid mid-day sprays.";
  } else if (weather.humidity > 80 || weather.id === "humid") {
    weatherImpact = "High humidity increases fungal risk.";
    weatherAction = "Ensure good air circulation and monitor leaves.";
  }

  // 2. Nutrition Task
  const nutritionRaw =
    fertilizerSchedule.schedule.find((item) => item.stageId === stage.id) ||
    fertilizerSchedule.schedule[0];

  const nutrition = {
    title: nutritionRaw.task,
    why: `Essential for the ${stage.name} stage to support plant growth.`,
    how: nutritionRaw.details
  };

  // 3. Health/Inspection Task
  let inspection = {
    title: "Inspect your crop",
    message: stage.tasks?.[0] || "Check for unusual spots or growth.",
    why: "Regular inspection helps catch issues early."
  };
  
  let disease = diseaseRules.rules.find((rule) => {
    if (rule.humidityMin != null && weather.humidity < rule.humidityMin) return false;
    if (rule.rainProbabilityMin != null && weather.rainProbability < rule.rainProbabilityMin) return false;
    return true;
  }) || diseaseRules.fallback;

  if (healthMode === "spots") {
    disease = { 
      risk: "Moderate", 
      title: "Elevated Fungal Risk",
      message: "Leaf spots observed. Fungal infection possible.",
      why: "You reported leaf spots, which is a common early indicator of fungal spread in tomatoes.",
      checks: ["Spreading of spots", "Lower leaf yellowing", "Stem lesions"]
    };
    inspection = {
      title: "Isolate spotted plants",
      message: "Check if spots are spreading to healthy leaves.",
      why: "Early isolation prevents widespread fungal outbreak."
    };
  } else if (healthMode === "yellow") {
    disease = { 
      risk: "Watch closely", 
      title: "Nutrition Indicator",
      message: "Yellow leaves suggest possible nitrogen deficiency.",
      why: "You reported yellow leaves. This often occurs when nutrients are washed out or roots are stressed.",
      checks: ["Soil moisture levels", "New growth color", "Leaf drop"]
    };
    inspection = {
      title: "Check soil moisture and roots",
      message: "Inspect lower leaves and soil saturation.",
      why: "Yellowing can be caused by both overwatering and nutrient lock-out."
    };
  } else if (healthMode === "pest") {
    disease = { 
      risk: "Moderate", 
      title: "Pest Activity",
      message: "Pests observed. Immediate intervention recommended.",
      why: "You reported pest activity. Quick identification is critical before major crop damage.",
      checks: ["Underside of leaves", "Fruit borer signs", "Whiteflies"]
    };
    inspection = {
      title: "Identify pest type",
      message: "Take a photo of the pests to determine the correct spray.",
      why: "Targeted application is more effective and saves money."
    };
  }

  // Format the 3 tasks strictly as WHAT, WHY, HOW
  const tasks = [
    {
      id: "task-water",
      category: "Water",
      what: irrigation.title,
      why: irrigation.why || "Maintains optimal soil moisture.",
      how: irrigation.how || "Run the drip system for the recommended duration.",
      type: "irrigation"
    },
    {
      id: "task-nutrition",
      category: "Nutrition",
      what: nutrition.title,
      why: nutrition.why,
      how: nutrition.how,
      type: "nutrition"
    },
    {
      id: "task-health",
      category: "Crop Health",
      what: inspection.title,
      why: inspection.why,
      how: inspection.message,
      type: "health"
    }
  ];

  return {
    irrigation,
    nutrition,
    disease,
    weatherContext: {
      impact: weatherImpact,
      action: weatherAction
    },
    tasks
  };
}

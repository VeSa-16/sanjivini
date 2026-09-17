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
  const irrigation =
    irrigationRules.rules.find((rule) => matchesIrrigation(rule, stage, weather, farmerInputs)) ||
    irrigationRules.fallback;

  const nutrition =
    fertilizerSchedule.schedule.find((item) => item.stageId === stage.id) ||
    fertilizerSchedule.schedule[0];

  const disease =
    diseaseRules.rules.find((rule) => {
      if (rule.humidityMin != null && weather.humidity < rule.humidityMin) return false;
      if (rule.rainProbabilityMin != null && weather.rainProbability < rule.rainProbabilityMin) return false;
      return true;
    }) || diseaseRules.fallback;

  let weatherImpact = "Weather conditions are stable.";
  let weatherAction = "Continue with normal crop care.";
  
  if (weather.rainProbability > 60) {
    weatherImpact = "Rain may provide enough moisture today.";
    weatherAction = "Delay irrigation and re-check the soil tomorrow.";
  } else if (weather.temperature > 32) {
    weatherImpact = "High temperatures may stress the crop.";
    weatherAction = "Ensure adequate soil moisture and avoid mid-day sprays.";
  } else if (weather.humidity > 80) {
    weatherImpact = "High humidity increases fungal risk.";
    weatherAction = "Ensure good air circulation and monitor leaves.";
  }

  return {
    irrigation,
    nutrition,
    disease,
    weatherContext: {
      impact: weatherImpact,
      action: weatherAction
    },
    inspection: {
      title: "Inspect your crop",
      message: stage.tasks?.[0] || "Check for unusual spots or growth.",
      why: "Regular inspection helps catch issues early."
    },
  };
}

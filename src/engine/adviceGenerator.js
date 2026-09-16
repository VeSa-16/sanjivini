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

  return {
    irrigation,
    nutrition,
    disease,
    inspection: {
      title: "Walk the crop for 5 minutes",
      message: stage.tasks?.[0] || "Inspect leaves, flowers, stems and visible fruit.",
    },
  };
}

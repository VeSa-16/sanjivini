import { useMemo } from "react";
import weatherData from "../data/mockWeather.json";
import { generateTodayAdvice } from "../engine/adviceGenerator";
import { useCropStage } from "./useCropStage";

function scenarioForToday() {
  const day = new Date().getDate();
  return weatherData.scenarios[day % weatherData.scenarios.length];
}

export function useTodayAdvice() {
  const cropState = useCropStage();
  const weather = scenarioForToday();

  const advice = useMemo(
    () => generateTodayAdvice(cropState.stage, weather, { daysSinceIrrigation: 3 }),
    [cropState.stage, weather]
  );

  return { ...cropState, weather, advice };
}

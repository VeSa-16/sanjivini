import { useEffect, useMemo, useState } from "react";
import weatherData from "../data/mockWeather.json";
import { generateTodayAdvice } from "../engine/adviceGenerator";
import { useCropStage } from "./useCropStage";
import { getDemoState } from "../store/demoStore";

function scenarioForToday(demoWeatherMode) {
  if (demoWeatherMode && demoWeatherMode !== "normal") {
    // Find matching weather scenario
    const match = weatherData.scenarios.find(s => s.id.includes(demoWeatherMode));
    if (match) return match;
  }
  return weatherData.scenarios[1]; // fallback to warm-dry as 'normal'
}

export function useTodayAdvice() {
  const cropState = useCropStage();
  const [demoState, setDemoState] = useState(getDemoState());

  useEffect(() => {
    const refresh = () => setDemoState(getDemoState());
    window.addEventListener("sanjivani:demo-updated", refresh);
    return () => window.removeEventListener("sanjivani:demo-updated", refresh);
  }, []);

  const weather = useMemo(() => scenarioForToday(demoState.weatherMode), [demoState.weatherMode]);

  const advice = useMemo(
    () => generateTodayAdvice(cropState.stage, weather, { 
      daysSinceIrrigation: 3, 
      healthMode: demoState.healthMode 
    }),
    [cropState.stage, weather, demoState.healthMode]
  );

  return { ...cropState, weather, advice, demoState };
}

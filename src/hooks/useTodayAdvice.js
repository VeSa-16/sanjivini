import { useEffect, useMemo, useState } from "react";
import weatherData from "../data/mockWeather.json";
import { generateTodayAdvice } from "../engine/adviceGenerator";
import { useCropStage } from "./useCropStage";
import { getDemoState } from "../store/demoStore";
import { fetchLiveWeather } from "../data/weatherService";

function scenarioForToday(demoWeatherMode) {
  if (demoWeatherMode && demoWeatherMode !== "normal") {
    // Find matching weather scenario
    const match = weatherData.scenarios.find(s => s.id.includes(demoWeatherMode));
    if (match) return match;
  }
  return null;
}

export function useTodayAdvice() {
  const cropState = useCropStage();
  const [demoState, setDemoState] = useState(getDemoState());
  const [weather, setWeather] = useState(weatherData.scenarios[1]); // fallback initial

  useEffect(() => {
    const refresh = () => setDemoState(getDemoState());
    window.addEventListener("sanjivani:demo-updated", refresh);
    return () => window.removeEventListener("sanjivani:demo-updated", refresh);
  }, []);

  useEffect(() => {
    const override = scenarioForToday(demoState.weatherMode);
    if (override) {
      setWeather(override);
    } else {
      let isMounted = true;
      const lat = cropState.activeFarm?.location?.lat || 18.5204;
      const lon = cropState.activeFarm?.location?.lon || 73.8567;
      
      fetchLiveWeather(lat, lon).then(liveData => {
        if (isMounted) setWeather(liveData);
      });
      return () => { isMounted = false; };
    }
  }, [demoState.weatherMode, cropState.activeFarm]);

  const advice = useMemo(
    () => generateTodayAdvice(cropState.stage, weather, { 
      daysSinceIrrigation: 3, 
      healthMode: demoState.healthMode 
    }),
    [cropState.stage, weather, demoState.healthMode]
  );

  return { ...cropState, weather, advice, demoState };
}

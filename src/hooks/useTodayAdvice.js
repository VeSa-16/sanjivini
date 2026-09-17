import { useEffect, useState } from "react";
import weatherData from "../data/mockWeather.json";
import { generateTodayAdvice } from "../engine/adviceGenerator";
import { useCropStage } from "./useCropStage";
import { getDemoState } from "../store/demoStore";
import { fetchLiveWeather } from "../data/weatherService";
import { generateDailyAdvice } from "../lib/gemini";

function scenarioForToday(demoWeatherMode) {
  if (demoWeatherMode && demoWeatherMode !== "normal") {
    const match = weatherData.scenarios.find(s => s.id.includes(demoWeatherMode));
    if (match) return match;
  }
  return null;
}

export function useTodayAdvice() {
  const cropState = useCropStage();
  const [demoState, setDemoState] = useState(getDemoState());
  const [weather, setWeather] = useState(weatherData.scenarios[1]); 
  
  // Initialize with static advice so the UI never blocks!
  const [advice, setAdvice] = useState(() => {
    if (!cropState.stage) return null;
    return generateTodayAdvice(cropState.stage, weatherData.scenarios[1], { 
      daysSinceIrrigation: 3, 
      healthMode: getDemoState().healthMode 
    });
  });
  
  const [isAiActive, setIsAiActive] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(true);
  const [liveLocationName, setLiveLocationName] = useState(cropState.farm?.location?.name || "Fetching location...");

  useEffect(() => {
    const refresh = () => setDemoState(getDemoState());
    window.addEventListener("sanjivani:demo-updated", refresh);
    return () => window.removeEventListener("sanjivani:demo-updated", refresh);
  }, []);

  useEffect(() => {
    let isMounted = true;
    const override = scenarioForToday(demoState.weatherMode);
    
    if (override) {
      setWeather(override);
      setLiveLocationName("Demo Mode");
    } else {
      const fetchWeatherForCoords = async (lat, lon, isDynamic = false) => {
        try {
          const liveData = await fetchLiveWeather(lat, lon);
          if (isMounted) setWeather(liveData);
          
          if (isDynamic && isMounted) {
            const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
            const data = await res.json();
            const cityName = data.city || data.locality || data.principalSubdivision || "Current Location";
            setLiveLocationName(cityName);
          }
        } catch (e) {
          console.error("Failed to fetch live weather or location", e);
        }
      };

      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            fetchWeatherForCoords(pos.coords.latitude, pos.coords.longitude, true);
          },
          (err) => {
            const lat = cropState.farm?.location?.lat || 17.6599;
            const lon = cropState.farm?.location?.lon || 75.9064;
            if (isMounted) setLiveLocationName(cropState.farm?.location?.name || "Solapur");
            fetchWeatherForCoords(lat, lon, false);
          },
          { timeout: 5000, maximumAge: 60000 }
        );
      } else {
        const lat = cropState.farm?.location?.lat || 17.6599;
        const lon = cropState.farm?.location?.lon || 75.9064;
        if (isMounted) setLiveLocationName(cropState.farm?.location?.name || "Solapur");
        fetchWeatherForCoords(lat, lon, false);
      }
    }
    return () => { isMounted = false; };
  }, [demoState.weatherMode, cropState.farm]);

  useEffect(() => {
    let isMounted = true;
    if (!weather || !cropState.stage || !cropState.farm || !cropState.crop) return;

    async function fetchAdvice() {
      setIsAiLoading(true);
      try {
        // Promise.race to enforce a 6-second timeout on Gemini
        const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 12000));
        const aiAdvice = await Promise.race([
          generateDailyAdvice(cropState.farm, cropState.crop, cropState.stage, weather),
          timeoutPromise
        ]);
        
        if (isMounted) {
          setAdvice(aiAdvice);
          setIsAiActive(true);
          setIsAiLoading(false);
        }
      } catch (e) {
        if (isMounted) {
          const staticAdvice = generateTodayAdvice(cropState.stage, weather, { 
            daysSinceIrrigation: 3, 
            healthMode: demoState.healthMode 
          });
          setAdvice(staticAdvice);
          setIsAiActive(false);
          setIsAiLoading(false);
        }
      }
    }

    fetchAdvice();

    return () => { isMounted = false; };
  }, [weather, cropState.stage, demoState.healthMode, cropState.activeFarm, cropState.crop]);

  return { ...cropState, weather, advice, demoState, isAiActive, isAiLoading, liveLocationName };
}

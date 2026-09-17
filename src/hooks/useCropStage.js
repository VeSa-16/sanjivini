import { useEffect, useMemo, useState } from "react";
import tomato from "../data/crops/tomato.json";
import wheat from "../data/crops/wheat.json";
import { getFarm } from "../store/farmStore";
import { getDemoState } from "../store/demoStore";
import { resolveStage, stageProgress } from "../engine/stageResolver";

const crops = { tomato, wheat };

export function useCropStage() {
  const [farm, setFarm] = useState(getFarm());
  const [demoState, setDemoState] = useState(getDemoState());

  useEffect(() => {
    const refreshFarm = () => setFarm(getFarm());
    const refreshDemo = () => setDemoState(getDemoState());
    
    window.addEventListener("sanjivani:farm-updated", refreshFarm);
    window.addEventListener("sanjivani:demo-updated", refreshDemo);
    window.addEventListener("storage", refreshFarm);
    
    return () => {
      window.removeEventListener("sanjivani:farm-updated", refreshFarm);
      window.removeEventListener("sanjivani:demo-updated", refreshDemo);
      window.removeEventListener("storage", refreshFarm);
    };
  }, []);

  const crop = crops[farm.cropId] || tomato;
  
  const stage = useMemo(() => {
    const today = new Date();
    today.setDate(today.getDate() + (demoState.timelineShift || 0));
    return resolveStage(farm.sowingDate, today, crop, farm.stageOverride);
  }, [farm.sowingDate, farm.stageOverride, crop, demoState.timelineShift]);

  return {
    farm,
    crop,
    stage,
    progress: stageProgress(stage, stage.cropDay),
  };
}

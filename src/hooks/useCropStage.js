import { useEffect, useMemo, useState } from "react";
import tomato from "../data/crops/tomato.json";
import wheat from "../data/crops/wheat.json";
import { getFarm } from "../store/farmStore";
import { resolveStage, stageProgress } from "../engine/stageResolver";

const crops = { tomato, wheat };

export function useCropStage() {
  const [farm, setFarm] = useState(getFarm());

  useEffect(() => {
    const refresh = () => setFarm(getFarm());
    window.addEventListener("sanjivani:farm-updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("sanjivani:farm-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const crop = crops[farm.cropId] || tomato;
  const stage = useMemo(
    () => resolveStage(farm.sowingDate, new Date(), crop, farm.stageOverride),
    [farm.sowingDate, farm.stageOverride, crop]
  );

  return {
    farm,
    crop,
    stage,
    progress: stageProgress(stage, stage.cropDay),
  };
}

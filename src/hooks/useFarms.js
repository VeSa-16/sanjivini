import { useEffect, useState } from "react";
import { getState, setActiveFarm, getFarm } from "../store/farmStore";

export function useFarms() {
  const [state, setState] = useState(getState());

  useEffect(() => {
    const refresh = () => setState(getState());
    window.addEventListener("sanjivani:farm-updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("sanjivani:farm-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return {
    farms: state.farms,
    activeFarmId: state.activeFarmId,
    activeFarm: getFarm(),
    setActiveFarm,
  };
}

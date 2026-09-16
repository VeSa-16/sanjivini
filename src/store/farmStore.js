const KEY = "sanjivani:farm";

const defaultFarm = {
  farmerName: "",
  farmName: "My Farm",
  cropId: "tomato",
  variety: "Hybrid Tomato",
  sowingDate: "",
  area: "1",
  areaUnit: "acre",
  soilType: "Black soil",
  irrigationMethod: "Drip",
  stageOverride: "",
  onboarded: false,
};

export function getFarm() {
  try {
    return { ...defaultFarm, ...JSON.parse(localStorage.getItem(KEY) || "{}") };
  } catch {
    return defaultFarm;
  }
}

export function saveFarm(farm) {
  localStorage.setItem(KEY, JSON.stringify(farm));
  window.dispatchEvent(new Event("sanjivani:farm-updated"));
}

export function clearFarm() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("sanjivani:farm-updated"));
}

export { defaultFarm };

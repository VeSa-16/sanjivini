const KEY = "sanjivani:farm_v2";

const defaultFarm = {
  id: "farm-1",
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

export function getState() {
  try {
    const data = JSON.parse(localStorage.getItem(KEY));
    if (data && data.farms) return data;
  } catch {}
  return { farms: [{ ...defaultFarm }], activeFarmId: "farm-1" };
}

export function saveState(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
  window.dispatchEvent(new Event("sanjivani:farm-updated"));
}

export function getFarm() {
  const state = getState();
  const farm = state.farms.find(f => f.id === state.activeFarmId);
  return farm || state.farms[0];
}

export function saveFarm(updatedFarm) {
  const state = getState();
  const index = state.farms.findIndex(f => f.id === updatedFarm.id);
  if (index >= 0) {
    state.farms[index] = updatedFarm;
  } else {
    state.farms.push(updatedFarm);
  }
  saveState(state);
}

export function setActiveFarm(id) {
  const state = getState();
  state.activeFarmId = id;
  saveState(state);
}

export function clearFarm() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("sanjivani:farm-updated"));
}

export { defaultFarm };

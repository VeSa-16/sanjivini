const KEY = "sanjivani:demo_state_v1";

const defaultDemoState = {
  weatherMode: "normal", // 'normal', 'rain', 'humid', 'dry'
  healthMode: "normal", // 'normal', 'spots', 'yellow', 'pest'
  timelineShift: 0, // days offset (e.g., -5 for ahead, 5 for behind)
};

export function getDemoState() {
  try {
    const data = JSON.parse(localStorage.getItem(KEY));
    if (data) return { ...defaultDemoState, ...data };
  } catch {}
  return { ...defaultDemoState };
}

export function saveDemoState(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
  window.dispatchEvent(new Event("sanjivani:demo-updated"));
}

export function updateDemoState(updates) {
  const current = getDemoState();
  saveDemoState({ ...current, ...updates });
}

export function resetDemoState() {
  saveDemoState({ ...defaultDemoState });
}

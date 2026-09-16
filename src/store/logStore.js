const KEY = "sanjivani:logs";

export function getLogs() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function addLog(log) {
  const logs = getLogs();
  const next = [
    {
      id: crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`,
      timestamp: new Date().toISOString(),
      ...log,
    },
    ...logs,
  ];
  localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("sanjivani:logs-updated"));
  return next;
}

export function clearLogs() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("sanjivani:logs-updated"));
}

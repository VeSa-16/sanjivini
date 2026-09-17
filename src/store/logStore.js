import { getState } from "./farmStore";

const KEY = "sanjivani:logs_v2";

export function getAllLogs() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function getLogs(farmId) {
  const targetId = farmId || getState().activeFarmId;
  return getAllLogs().filter(log => log.farmId === targetId && log.type !== "expense" && log.type !== "income");
}

export function getFinancials(farmId) {
  const targetId = farmId || getState().activeFarmId;
  return getAllLogs().filter(log => log.farmId === targetId && (log.type === "expense" || log.type === "income"));
}

export function getExpenses(farmId) {
  const targetId = farmId || getState().activeFarmId;
  return getAllLogs().filter(log => log.farmId === targetId && log.type === "expense");
}

export function addLog(log) {
  const logs = getAllLogs();
  const farmId = log.farmId || getState().activeFarmId;
  const next = [
    {
      id: crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`,
      timestamp: new Date().toISOString(),
      farmId,
      ...log,
    },
    ...logs,
  ];
  localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("sanjivani:logs-updated"));
  return next;
}

export function addExpense(expense) {
  return addLog({ ...expense, type: "expense" });
}

export function addIncome(income) {
  return addLog({ ...income, type: "income" });
}

export function clearLogs() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("sanjivani:logs-updated"));
}

export function getFarmHealthScore(farmId) {
  const targetId = farmId || getState().activeFarmId;
  const logs = getAllLogs().filter(log => log.farmId === targetId && log.type === "task");
  const score = Math.min(100, 70 + (logs.length * 2));
  return score;
}

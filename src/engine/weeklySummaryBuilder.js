export function buildWeeklySummary(logs = [], stage) {
  const start = new Date();
  start.setDate(start.getDate() - 6);
  start.setHours(0, 0, 0, 0);

  const weekly = logs.filter((log) => new Date(log.timestamp) >= start);
  const count = (type) => weekly.filter((log) => log.type === type).length;

  const completed = count("task");
  const checks = count("plant-check");
  const photos = count("photo");
  const irrigation = weekly.filter((l) => l.type === "task" && l.taskId === "irrigation" && l.status === "done").length;
  const nutrition = weekly.filter((l) => l.type === "task" && l.taskId === "nutrition" && l.status === "done").length;

  return {
    stageName: stage?.name || "Current stage",
    actionsRecorded: completed,
    plantChecks: checks,
    photos,
    irrigation,
    nutrition,
    weekly,
  };
}

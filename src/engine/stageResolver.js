export function getCropDay(sowingDate, today = new Date()) {
  if (!sowingDate) return 1;
  const start = new Date(`${sowingDate}T00:00:00`);
  const current = new Date(today);
  start.setHours(0, 0, 0, 0);
  current.setHours(0, 0, 0, 0);
  const diff = Math.floor((current - start) / 86400000) + 1;
  return Math.max(1, diff);
}

export function resolveStage(sowingDate, today, cropData, overrideStageId) {
  const cropDay = getCropDay(sowingDate, today);
  if (overrideStageId) {
    const overridden = cropData.stages.find((s) => s.id === overrideStageId);
    if (overridden) return { ...overridden, cropDay, overridden: true };
  }

  const stage =
    cropData.stages.find((s) => cropDay >= s.startDay && cropDay <= s.endDay) ||
    cropData.stages[cropData.stages.length - 1];

  return { ...stage, cropDay, overridden: false };
}

export function stageProgress(stage, cropDay) {
  const span = Math.max(1, stage.endDay - stage.startDay + 1);
  return Math.min(100, Math.max(0, ((cropDay - stage.startDay + 1) / span) * 100));
}

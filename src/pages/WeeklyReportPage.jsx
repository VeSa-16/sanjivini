import { useEffect, useMemo, useState } from "react";
import WeeklySummary from "../components/reports/WeeklySummary";
import { buildWeeklySummary } from "../engine/weeklySummaryBuilder";
import { getLogs } from "../store/logStore";
import { useCropStage } from "../hooks/useCropStage";

export default function WeeklyReportPage() {
  const { stage } = useCropStage();
  const [logs, setLogs] = useState(getLogs());

  useEffect(() => {
    const refresh = () => setLogs(getLogs());
    window.addEventListener("sanjivani:logs-updated", refresh);
    return () => window.removeEventListener("sanjivani:logs-updated", refresh);
  }, []);

  const summary = useMemo(() => buildWeeklySummary(logs, stage), [logs, stage]);
  return <WeeklySummary summary={summary} />;
}

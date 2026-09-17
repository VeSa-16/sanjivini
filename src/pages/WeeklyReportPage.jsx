import { useEffect, useMemo, useState, Component } from "react";
import WeeklySummary from "../components/reports/WeeklySummary";
import { buildWeeklySummary } from "../engine/weeklySummaryBuilder";
import { getLogs } from "../store/logStore";
import { useCropStage } from "../hooks/useCropStage";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return <div className="p-10 text-red-600 font-bold">Error: {this.state.error.message}</div>;
    }
    return this.props.children;
  }
}

function WeeklyReportContent() {
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

export default function WeeklyReportPage() {
  return (
    <ErrorBoundary>
      <WeeklyReportContent />
    </ErrorBoundary>
  );
}

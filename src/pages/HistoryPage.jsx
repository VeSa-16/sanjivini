import { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import EndOfCropSummary from "../components/reports/EndOfCropSummary";
import { clearLogs, getLogs } from "../store/logStore";
import { useCropStage } from "../hooks/useCropStage";

const iconFor = { task: "✓", "plant-check": "🌿", photo: "📷" };

export default function HistoryPage() {
  const { crop } = useCropStage();
  const [logs, setLogs] = useState(getLogs());

  useEffect(() => {
    const refresh = () => setLogs(getLogs());
    window.addEventListener("sanjivani:logs-updated", refresh);
    return () => window.removeEventListener("sanjivani:logs-updated", refresh);
  }, []);

  function clear() {
    clearLogs();
    setLogs([]);
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[1.15fr_.85fr]">
      <Card className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8a928a]">Timeline</p>
            <h2 className="mt-1 font-serif text-2xl font-bold text-[#173f2c]">What happened on the farm</h2>
          </div>
          {logs.length > 0 && <Button variant="danger" onClick={clear}>Clear demo history</Button>}
        </div>

        {logs.length === 0 ? (
          <div className="mt-8 rounded-[24px] bg-[#f5f6f1] p-8 text-center">
            <div className="text-4xl">🌱</div>
            <h3 className="mt-3 font-bold text-[#3d5043]">No records yet</h3>
            <p className="mt-1 text-sm text-[#7a847c]">Complete tasks or a plant check on Today to build your farm history.</p>
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            {logs.map((log) => (
              <div key={log.id} className="flex gap-3 rounded-[22px] bg-[#f7f7f2] p-4">
                <div className="grid size-10 shrink-0 place-items-center rounded-2xl bg-white text-lg shadow-sm">{iconFor[log.type] || "•"}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-bold text-[#3e5144]">{log.label || "Farm update"}</p>
                    <span className="text-[11px] text-[#919991]">{new Date(log.timestamp).toLocaleString([], {dateStyle:"medium", timeStyle:"short"})}</span>
                  </div>
                  {log.status && <p className="mt-1 text-xs text-[#7c857e]">Status: {log.status}</p>}
                  {log.result && <p className="mt-1 text-xs text-[#7c857e]">{log.result}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <EndOfCropSummary crop={crop} logs={logs} />
    </div>
  );
}

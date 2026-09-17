import { useEffect, useState } from "react";
import Card from "../ui/Card";
import { addLog, getAllLogs } from "../../store/logStore";
import { getState } from "../../store/farmStore";

const icons = { irrigation: "💧", nutrition: "🌿", inspection: "🔍" };

export default function TaskChecklist({ advice }) {
  const tasks = [
    { id: "irrigation", title: "💧 WATER", note: advice.irrigation.title, action: advice.irrigation.message, why: advice.irrigation.why },
    { id: "nutrition", title: "🌱 CROP NUTRITION", note: advice.nutrition.title, action: advice.nutrition.message, why: advice.nutrition.why },
    { id: "inspection", title: "🐛 SCOUT FOR PESTS", note: advice.inspection.title, action: advice.inspection.message, why: advice.inspection.why },
  ];
  const [status, setStatus] = useState({});

  useEffect(() => {
    const today = new Date().toDateString();
    const targetId = getState().activeFarmId;
    const logs = getAllLogs().filter((l) => l.farmId === targetId && l.type === "task" && new Date(l.timestamp).toDateString() === today);
    const current = {};
    logs.forEach((l) => { current[l.taskId] = l.status; });
    setStatus(current);
  }, []);

  function mark(taskId, value) {
    setStatus((s) => ({ ...s, [taskId]: value }));
    addLog({ type: "task", taskId, status: value, label: tasks.find(t => t.id === taskId)?.title });
  }

  const completedCount = Object.values(status).filter(Boolean).length;
  const remainingCount = 3 - completedCount;

  return (
    <Card className="p-5 sm:p-6 bg-[#f4f2e8]">
      <div className="flex items-center justify-between gap-3 mb-5">
        <div>
          <h3 className="font-serif text-2xl font-bold text-farm-text">Your 3 things for today</h3>
          <p className="text-sm font-semibold text-farm-muted mt-1">
            {remainingCount === 0 ? "Today's crop care is complete 🌱" : `${remainingCount} task${remainingCount > 1 ? 's' : ''} remaining`}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {tasks.map((task, index) => {
          const current = status[task.id];
          return (
            <div key={task.id} className={`rounded-[22px] border p-5 transition ${
              current === "done"
                ? "border-[#a9c9ad] bg-[#eef5ef]"
                : current === "skipped"
                ? "border-[#ead9c4] bg-[#fdfaf5]"
                : "border-farm-text/10 bg-white"
            }`}>
              <div className="flex items-start gap-4">
                <div className="grid size-8 shrink-0 place-items-center rounded-full bg-[#173f2c] text-sm font-bold text-white shadow-sm mt-0.5">{index + 1}</div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold uppercase tracking-[0.16em] text-[#346b82] mb-1">{task.title}</h4>
                  <p className="text-base font-bold text-[#173f2c]">{task.note}</p>
                  <p className="mt-1 text-sm leading-6 text-[#687269]">{task.action}</p>
                  
                  {task.why && (
                    <details className="mt-3 group">
                      <summary className="text-xs font-bold text-[#346b82] cursor-pointer list-none flex items-center gap-1 hover:text-[#173f2c]">
                        <span className="group-open:rotate-90 transition-transform">▶</span> Why are you suggesting this?
                      </summary>
                      <p className="mt-2 text-sm text-[#526158] bg-[#f9faf8] p-3 rounded-xl border border-[#173f2c]/5">{task.why}</p>
                    </details>
                  )}

                  {!current ? (
                    <div className="mt-5 flex gap-2 max-w-sm">
                      <button
                        onClick={() => mark(task.id, "done")}
                        className="flex-1 rounded-xl px-4 py-3 text-sm font-bold transition shadow-sm bg-[#173f2c] text-white hover:bg-[#123021]"
                      >
                        ✓ Mark as done
                      </button>
                      <button
                        onClick={() => mark(task.id, "skipped")}
                        className="rounded-xl px-4 py-3 text-sm font-bold transition border border-[#173f2c]/20 bg-white text-farm-text hover:bg-gray-50"
                      >
                        Skip
                      </button>
                    </div>
                  ) : (
                    <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-3 py-1.5 text-xs font-bold text-[#46604c] border border-farm-text/10">
                      {current === "done" ? "✓ Completed" : "⏭ Skipped"}
                      <button onClick={() => setStatus(s => { const newS = {...s}; delete newS[task.id]; return newS; })} className="ml-2 text-farm-muted hover:text-farm-text underline">Undo</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

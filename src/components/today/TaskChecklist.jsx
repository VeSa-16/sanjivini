import { useEffect, useState } from "react";
import Card from "../ui/Card";
import { addLog, getLogs } from "../../store/logStore";

const icons = { irrigation: "💧", nutrition: "🌿", inspection: "🔍" };

export default function TaskChecklist({ advice }) {
  const tasks = [
    { id: "irrigation", title: advice.irrigation.title, note: advice.irrigation.message },
    { id: "nutrition", title: advice.nutrition.title, note: advice.nutrition.message },
    { id: "inspection", title: advice.inspection.title, note: advice.inspection.message },
  ];
  const [status, setStatus] = useState({});

  useEffect(() => {
    const today = new Date().toDateString();
    const logs = getLogs().filter((l) => l.type === "task" && new Date(l.timestamp).toDateString() === today);
    const current = {};
    logs.forEach((l) => { current[l.taskId] = l.status; });
    setStatus(current);
  }, []);

  function mark(taskId, value) {
    setStatus((s) => ({ ...s, [taskId]: value }));
    addLog({ type: "task", taskId, status: value, label: tasks.find(t => t.id === taskId)?.title });
  }

  return (
    <Card className="p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8a928a]">Today's plan</p>
          <h3 className="mt-1 font-serif text-2xl font-bold text-[#173f2c]">Three things that matter</h3>
        </div>
        <div className="rounded-full bg-[#edf5e9] px-3 py-1.5 text-xs font-bold text-[#47704f]">
          {Object.values(status).filter(Boolean).length}/3 updated
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {tasks.map((task) => {
          const current = status[task.id];
          return (
            <div key={task.id} className={`rounded-[22px] border p-4 transition ${
              current === "done"
                ? "border-[#a9c9ad] bg-[#f0f7ee]"
                : current === "skipped"
                ? "border-[#ead9c4] bg-[#fbf7ef]"
                : "border-[#173f2c]/8 bg-[#fbfbf8]"
            }`}>
              <div className="flex items-start gap-3">
                <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white text-xl shadow-sm">{icons[task.id]}</div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-[#173f2c]">{task.title}</h4>
                  <p className="mt-1 text-xs leading-5 text-[#748078]">{task.note}</p>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => mark(task.id, "done")}
                      className={`rounded-xl px-3 py-2 text-xs font-bold transition ${
                        current === "done" ? "bg-[#173f2c] text-white" : "bg-white text-[#45604c] shadow-sm hover:bg-[#edf4ec]"
                      }`}
                    >
                      ✓ Done
                    </button>
                    <button
                      onClick={() => mark(task.id, "skipped")}
                      className={`rounded-xl px-3 py-2 text-xs font-bold transition ${
                        current === "skipped" ? "bg-[#81684c] text-white" : "bg-white text-[#786d60] shadow-sm hover:bg-[#f7f0e7]"
                      }`}
                    >
                      Skip today
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

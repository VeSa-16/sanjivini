import { useState } from "react";
import Card from "../ui/Card";

export default function CropJourneyTimeline({ crop, currentStage }) {
  const currentIndex = crop.stages.findIndex((s) => s.id === currentStage.id);
  // Default to expanding current and immediate next stage
  const [expanded, setExpanded] = useState({
    [crop.stages[currentIndex]?.id]: true,
    [crop.stages[currentIndex + 1]?.id]: true,
  });

  const toggle = (id) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <Card className="overflow-hidden p-5 sm:p-7">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-farm-muted">Seed to harvest</p>
        <h2 className="mt-1 font-serif text-2xl font-bold text-farm-text">{crop.name} journey</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#748078]">Your crop calendar is a guide, not a rigid rule. Field observations can correct the stage anytime.</p>
      </div>

      <div className="mt-7 space-y-0">
        {crop.stages.map((stage, index) => {
          const done = index < currentIndex;
          const active = index === currentIndex;
          const isExpanded = expanded[stage.id];
          
          let progressPercent = 0;
          if (active) {
            const total = stage.endDay - stage.startDay;
            const current = currentStage.cropDay - stage.startDay;
            progressPercent = Math.min(100, Math.max(0, Math.round((current / total) * 100)));
          }

          return (
            <div key={stage.id} className="relative flex gap-4">
              {index !== crop.stages.length - 1 && (
                <div className={`absolute left-[21px] top-11 h-[calc(100%-4px)] w-px ${done ? "bg-[#77a17f]" : "bg-[#dfe5dd]"}`} />
              )}
              <div className={`relative z-10 grid size-11 shrink-0 place-items-center rounded-2xl border text-lg ${
                active
                  ? "border-farm-text bg-farm-text text-white shadow-[0_8px_22px_rgba(23,63,44,.22)]"
                  : done
                  ? "border-[#a9c7ae] bg-urgency-green-bg"
                  : "border-[#e2e7df] bg-white"
              }`}>
                {done ? "✓" : stage.emoji}
              </div>

              <div className={`mb-5 min-w-0 flex-1 rounded-[22px] px-4 py-3.5 transition-colors ${active ? "bg-[#edf4e9]" : "hover:bg-farm-base"}`}>
                <div className="flex flex-wrap items-center justify-between gap-2 cursor-pointer" onClick={() => toggle(stage.id)}>
                  <h3 className={`font-bold ${active ? "text-farm-text" : "text-[#566159]"}`}>{stage.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#929990]">Day {stage.startDay}–{stage.endDay}</span>
                    <span className={`text-[#929990] text-lg leading-none transition-transform ${isExpanded ? "rotate-180" : ""}`}>▾</span>
                  </div>
                </div>
                
                {isExpanded && (
                  <div className="mt-1">
                    <p className="text-sm leading-5 text-[#7a837b]">{stage.description}</p>
                    {active && (
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-xs font-bold text-[#4d7454] mb-1.5">
                          <span>You are here • Day {currentStage.cropDay}</span>
                          <span>{progressPercent}% Complete</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-white overflow-hidden">
                          <div className="h-full bg-[#173f2c] transition-all" style={{ width: `${progressPercent}%` }} />
                        </div>
                        <button 
                          className="mt-4 w-full rounded-xl border border-[#173f2c]/10 bg-white py-2.5 text-xs font-bold text-[#687269] hover:bg-gray-50"
                          onClick={() => alert("Correction flow will be built in the next version.")}
                        >
                          I am not in this stage
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

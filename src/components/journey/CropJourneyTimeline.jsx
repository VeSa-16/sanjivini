import Card from "../ui/Card";

export default function CropJourneyTimeline({ crop, currentStage }) {
  const currentIndex = crop.stages.findIndex((s) => s.id === currentStage.id);

  return (
    <Card className="overflow-hidden p-5 sm:p-7">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8a928a]">Seed to harvest</p>
        <h2 className="mt-1 font-serif text-2xl font-bold text-[#173f2c]">{crop.name} journey</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#748078]">Your crop calendar is a guide, not a rigid rule. Field observations can correct the stage anytime.</p>
      </div>

      <div className="mt-7 space-y-0">
        {crop.stages.map((stage, index) => {
          const done = index < currentIndex;
          const active = index === currentIndex;
          return (
            <div key={stage.id} className="relative flex gap-4">
              {index !== crop.stages.length - 1 && (
                <div className={`absolute left-[21px] top-11 h-[calc(100%-4px)] w-px ${done ? "bg-[#77a17f]" : "bg-[#dfe5dd]"}`} />
              )}
              <div className={`relative z-10 grid size-11 shrink-0 place-items-center rounded-2xl border text-lg ${
                active
                  ? "border-[#173f2c] bg-[#173f2c] text-white shadow-[0_8px_22px_rgba(23,63,44,.22)]"
                  : done
                  ? "border-[#a9c7ae] bg-[#e9f2e7]"
                  : "border-[#e2e7df] bg-white"
              }`}>
                {done ? "✓" : stage.emoji}
              </div>

              <div className={`mb-5 min-w-0 flex-1 rounded-[22px] px-4 py-3.5 ${active ? "bg-[#edf4e9]" : ""}`}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className={`font-bold ${active ? "text-[#173f2c]" : "text-[#566159]"}`}>{stage.name}</h3>
                  <span className="text-xs font-semibold text-[#929990]">Day {stage.startDay}–{stage.endDay}</span>
                </div>
                <p className="mt-1 text-sm leading-5 text-[#7a837b]">{stage.description}</p>
                {active && <div className="mt-2 text-xs font-bold text-[#4d7454]">You are here • Day {currentStage.cropDay}</div>}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

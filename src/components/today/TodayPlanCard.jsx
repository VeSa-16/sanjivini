import Card from "../ui/Card";
import Badge from "../ui/Badge";

export default function TodayPlanCard({ crop, stage, progress }) {
  return (
    <Card className="relative overflow-hidden bg-[#173f2c] p-0 text-white">
      <div className="absolute -right-16 -top-20 size-64 rounded-full bg-[#7ba66e]/20 blur-2xl" />
      <div className="absolute -bottom-24 left-1/3 size-56 rounded-full bg-[#d8ae63]/15 blur-2xl" />
      <div className="relative p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Badge className="!bg-white/12 !text-white">DAY {stage.cropDay}</Badge>
            <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight sm:text-4xl">{stage.name}</h2>
            <p className="mt-2 max-w-lg text-sm leading-6 text-white/68">{stage.description}</p>
          </div>
          <div className="grid size-16 shrink-0 place-items-center rounded-3xl bg-white/10 text-4xl shadow-inner sm:size-20 sm:text-5xl">
            {stage.emoji || crop.emoji}
          </div>
        </div>

        <div className="mt-7">
          <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-[0.14em] text-white/55">
            <span>Stage progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-[#d9e9b9] transition-all duration-700" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {stage.tasks?.slice(0, 3).map((task) => (
            <span key={task} className="rounded-full border border-white/10 bg-white/8 px-3 py-1.5 text-xs font-semibold text-white/78">
              {task}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}

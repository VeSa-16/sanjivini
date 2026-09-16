import Card from "../ui/Card";

export default function WeeklySummary({ summary }) {
  const stats = [
    ["Actions recorded", summary.actionsRecorded, "✓"],
    ["Plant checks", summary.plantChecks, "🌿"],
    ["Irrigations", summary.irrigation, "💧"],
    ["Photos checked", summary.photos, "📷"],
  ];

  return (
    <>
      <Card className="overflow-hidden bg-[#173f2c] p-6 text-white sm:p-7">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/50">This week</p>
        <div className="mt-2 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl font-bold">Your crop stayed in focus.</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/65">Current stage: {summary.stageName}. Small records create a much clearer crop story over time.</p>
          </div>
          <div className="hidden text-6xl sm:block">🌱</div>
        </div>
      </Card>

      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map(([label, value, icon]) => (
          <Card key={label} className="p-4 sm:p-5">
            <div className="text-xl">{icon}</div>
            <div className="mt-3 font-serif text-3xl font-bold text-[#173f2c]">{value}</div>
            <div className="mt-1 text-xs font-semibold text-[#7b857d]">{label}</div>
          </Card>
        ))}
      </div>

      <Card className="mt-4 p-5 sm:p-6">
        <h3 className="font-serif text-xl font-bold text-[#173f2c]">Next-week focus</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            ["💧", "Keep moisture steady", "Check the field before irrigation rather than following a fixed habit."],
            ["🔍", "Continue crop walks", "A five-minute visual check can catch changes before they become obvious."],
            ["🌦️", "Watch weather shifts", "Use rain and humidity alerts to adjust the day's plan."],
          ].map(([icon, title, text]) => (
            <div key={title} className="rounded-[22px] bg-[#f5f6f1] p-4">
              <div className="text-xl">{icon}</div>
              <div className="mt-2 text-sm font-bold text-[#3d5043]">{title}</div>
              <div className="mt-1 text-xs leading-5 text-[#7b857d]">{text}</div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

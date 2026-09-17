import Card from "../ui/Card";

export default function WeeklySummary({ summary }) {
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden bg-[#173f2c] p-6 text-white sm:p-7">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/50">Weekly Report</p>
        <div className="mt-2 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl font-bold">Your crop stayed in focus.</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/65">Current stage: {summary.stageName}. Small records create a much clearer crop story over time.</p>
          </div>
          <div className="hidden text-6xl sm:block">🌱</div>
        </div>
      </Card>

      <div>
        <h3 className="font-serif text-2xl font-bold text-farm-text mb-4">This Week</h3>
        <Card className="p-5 sm:p-6 bg-white border border-[#e2e7df]">
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="text-xl">🌦️</span>
              <p className="text-[#3d5043] font-medium leading-relaxed">You had <strong className="text-[#173f2c]">2 days of high humidity</strong> this week, increasing fungal risk slightly.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-xl">🌿</span>
              <p className="text-[#3d5043] font-medium leading-relaxed">You <strong className="text-[#173f2c]">completed all nutrition tasks</strong> required for the flowering stage.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-xl">🔍</span>
              <p className="text-[#3d5043] font-medium leading-relaxed">You logged <strong className="text-[#173f2c]">{summary.plantChecks} field observations</strong>, helping keep track of crop health.</p>
            </li>
          </ul>
        </Card>
      </div>

      <div>
        <h3 className="font-serif text-2xl font-bold text-farm-text mb-4 text-[#8a928a]">Last Week</h3>
        <Card className="p-5 sm:p-6 bg-[#f5f6f1] border border-[#e2e7df]/50">
          <ul className="space-y-4">
            <li className="flex items-start gap-3 opacity-80">
              <span className="text-xl">💧</span>
              <p className="text-[#3d5043] font-medium leading-relaxed">Irrigation was delayed once due to expected rainfall.</p>
            </li>
            <li className="flex items-start gap-3 opacity-80">
              <span className="text-xl">✅</span>
              <p className="text-[#3d5043] font-medium leading-relaxed">Completed 5 out of 6 recommended tasks.</p>
            </li>
          </ul>
        </Card>
      </div>
      
      <Card className="mt-4 p-5 sm:p-6 bg-[#edf4e9]">
        <h3 className="font-serif text-xl font-bold text-[#173f2c]">Next-week focus</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            ["💧", "Keep moisture steady", "Check the field before irrigation rather than following a fixed habit."],
            ["🔍", "Continue crop walks", "A five-minute visual check can catch changes before they become obvious."],
            ["🌦️", "Watch weather shifts", "Use rain and humidity alerts to adjust the day's plan."],
          ].map(([icon, title, text]) => (
            <div key={title} className="rounded-[22px] bg-white p-4 shadow-sm border border-[#173f2c]/5">
              <div className="text-xl">{icon}</div>
              <div className="mt-2 text-sm font-bold text-[#3d5043]">{title}</div>
              <div className="mt-1 text-xs leading-5 text-[#7b857d]">{text}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

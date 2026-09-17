import Card from "../ui/Card";
import Badge from "../ui/Badge";

export default function AlertCard({ disease }) {
  const elevated = disease.risk === "Moderate";
  const watch = disease.risk === "Watch closely";
  const tone = elevated ? "red" : watch ? "amber" : "green";

  return (
    <Card className="p-5 sm:p-6 bg-[#fffbf7] border border-[#f5e6d3]">
      <div className="flex items-start gap-4">
        <div className={`grid size-12 shrink-0 place-items-center rounded-2xl text-xl ${
          elevated ? "bg-urgency-red-bg text-urgency-red-text" : watch ? "bg-urgency-yellow-bg text-urgency-yellow-text" : "bg-urgency-green-bg text-urgency-green-text"
        }`}>
          {elevated ? "🦠" : watch ? "👀" : "✓"}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-serif text-xl font-bold text-farm-text">{disease.title}</h3>
            <Badge tone={tone}>{disease.risk}</Badge>
          </div>
          <p className="mt-2 text-base font-bold text-[#b44b37]">{disease.message}</p>
          
          {disease.why && (
            <details className="mt-3 group">
              <summary className="text-xs font-bold text-[#b44b37] cursor-pointer list-none flex items-center gap-1 hover:text-[#933d2c]">
                <span className="group-open:rotate-90 transition-transform">▶</span> Why am I seeing this?
              </summary>
              <p className="mt-2 text-sm text-[#526158] bg-white p-3 rounded-xl border border-[#f5e6d3]">{disease.why}</p>
            </details>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            {disease.checks?.slice(0, 4).map((item) => (
              <span key={item} className="rounded-xl bg-white px-3 py-2 text-xs font-medium text-farm-muted border border-[#f5e6d3]">
                Check for: {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

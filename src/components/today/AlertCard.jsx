import Card from "../ui/Card";
import Badge from "../ui/Badge";

export default function AlertCard({ disease }) {
  const elevated = disease.risk === "Elevated";
  const watch = disease.risk === "Watch";
  const tone = elevated ? "red" : watch ? "amber" : "green";

  return (
    <Card className="p-5 sm:p-6">
      <div className="flex items-start gap-4">
        <div className={`grid size-12 shrink-0 place-items-center rounded-2xl text-xl ${
          elevated ? "bg-[#feece7]" : watch ? "bg-[#fff4d8]" : "bg-[#e7f3e7]"
        }`}>
          {elevated ? "⚠" : watch ? "◉" : "✓"}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-serif text-xl font-bold text-[#173f2c]">Crop health watch</h3>
            <Badge tone={tone}>{disease.risk} risk</Badge>
          </div>
          <p className="mt-2 text-sm font-bold text-[#445449]">{disease.title}</p>
          <p className="mt-1 text-sm leading-6 text-[#748078]">{disease.message}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {disease.checks?.slice(0, 4).map((item) => (
              <span key={item} className="rounded-xl bg-[#f6f6f1] px-3 py-2 text-xs font-medium text-[#657067]">
                Check: {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

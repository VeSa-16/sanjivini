import Card from "../ui/Card";

export default function EndOfCropSummary({ crop, logs, financials = [] }) {
  const totalExpenses = financials.filter(f => f.type === "expense").reduce((sum, f) => sum + f.amount, 0);
  const totalIncome = financials.filter(f => f.type === "income").reduce((sum, f) => sum + f.amount, 0);
  const profit = totalIncome - totalExpenses;
  const isProfitable = profit >= 0;

  return (
    <Card className="p-5 sm:p-6 bg-[#173f2c] text-white">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/50">Business Report</p>
      <h3 className="mt-1 font-serif text-2xl font-bold text-white">Your {crop.name} story</h3>
      <p className="mt-2 text-sm leading-6 text-white/65">
        When harvest is complete, this becomes the crop's end-of-season summary. Right now, {logs.length} farm records are saved.
      </p>

      {financials.length > 0 && (
        <div className="mt-6 pt-6 border-t border-white/10">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/50 mb-4">Financial Overview</p>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-white/65">Total Expenses</span>
              <span className="font-bold text-[#e89b8d]">-₹{totalExpenses}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/65">Total Income</span>
              <span className="font-bold text-[#8caf8d]">+₹{totalIncome}</span>
            </div>
            <div className="flex justify-between mt-3 pt-3 border-t border-white/10">
              <span className="font-bold text-white">Estimated Profit</span>
              <span className={`font-serif text-xl font-bold ${isProfitable ? "text-[#8caf8d]" : "text-[#e89b8d]"}`}>
                {isProfitable ? "+" : ""}₹{profit}
              </span>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

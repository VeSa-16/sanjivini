import { useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { useCropStage } from "../hooks/useCropStage";
import { getExpenses, addLog } from "../store/logStore";

export default function HarvestFlow() {
  const { farm, crop } = useCropStage();
  const navigate = useNavigate();
  const expenses = getExpenses(farm.id);
  const totalExpense = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  const [step, setStep] = useState(1);
  const [yieldAmt, setYieldAmt] = useState("");
  const [price, setPrice] = useState("");

  const revenue = Number(yieldAmt) * Number(price);
  const profit = revenue - totalExpense;

  function finish() {
    addLog({
      type: "harvest",
      label: "Crop Harvested",
      farmId: farm.id,
      yieldAmt: Number(yieldAmt),
      price: Number(price),
      revenue,
      profit
    });
    navigate("/history");
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <Link to="/today" className="text-sm font-bold text-farm-text">← Back</Link>

      <Card className="p-5 sm:p-8 text-center">
        {step === 1 && (
          <div>
            <div className="text-5xl mb-4">🌾</div>
            <h2 className="font-serif text-3xl font-bold text-farm-text mb-2">Record Harvest</h2>
            <p className="text-farm-muted mb-8">Congratulations on reaching the end of the crop journey. Let's record your yield.</p>
            
            <div className="text-left space-y-4 max-w-sm mx-auto">
              <div>
                <label className="block text-sm font-bold text-farm-text mb-1">Total Yield (kg)</label>
                <input type="number" value={yieldAmt} onChange={e => setYieldAmt(e.target.value)} className="w-full rounded-xl border border-farm-text/20 bg-farm-base p-4 text-farm-text focus:outline-none text-xl" />
              </div>
              <div>
                <label className="block text-sm font-bold text-farm-text mb-1">Selling Price (₹/kg)</label>
                <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="w-full rounded-xl border border-farm-text/20 bg-farm-base p-4 text-farm-text focus:outline-none text-xl" />
              </div>
            </div>

            <Button className="mt-8 px-12" onClick={() => setStep(2)} disabled={!yieldAmt || !price}>Calculate Return</Button>
          </div>
        )}

        {step === 2 && (
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-farm-muted mb-2">Final Report</p>
            <h2 className="font-serif text-3xl font-bold text-farm-text mb-6">Crop P&L Summary</h2>
            
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-8 text-left">
              <div className="bg-urgency-green-bg p-4 rounded-2xl">
                <p className="text-xs font-bold text-urgency-green-text uppercase tracking-wider">Revenue</p>
                <p className="text-2xl font-bold text-farm-text mt-1">₹{revenue.toLocaleString()}</p>
              </div>
              <div className="bg-urgency-red-bg p-4 rounded-2xl">
                <p className="text-xs font-bold text-urgency-red-text uppercase tracking-wider">Expenses</p>
                <p className="text-2xl font-bold text-farm-text mt-1">₹{totalExpense.toLocaleString()}</p>
              </div>
              <div className="col-span-2 bg-farm-text p-5 rounded-2xl text-white">
                <p className="text-xs font-bold uppercase tracking-wider text-white/70">Net Profit</p>
                <p className="text-4xl font-bold mt-1">₹{profit.toLocaleString()}</p>
              </div>
            </div>

            <Button className="px-12" onClick={finish}>Save & End Crop</Button>
          </div>
        )}
      </Card>
    </div>
  );
}

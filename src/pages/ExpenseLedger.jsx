import { useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { Link } from "react-router-dom";
import { getExpenses, addExpense } from "../store/logStore";
import { useCropStage } from "../hooks/useCropStage";

export default function ExpenseLedger() {
  const { farm, crop } = useCropStage();
  const [expenses, setExpenses] = useState(getExpenses(farm.id));
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Fertilizer");
  const [note, setNote] = useState("");

  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  function save() {
    if (!amount) return;
    addExpense({
      amount: Number(amount),
      category,
      note,
      farmId: farm.id
    });
    setExpenses(getExpenses(farm.id));
    setAmount("");
    setNote("");
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex justify-between items-center">
        <Link to="/today" className="text-sm font-bold text-farm-text">← Back</Link>
      </div>

      <Card className="p-5 sm:p-6 bg-urgency-green-bg">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-urgency-green-text">Current Crop Expenses</p>
        <h2 className="mt-1 font-serif text-3xl font-bold text-farm-text">₹{total.toLocaleString()}</h2>
        <p className="mt-1 text-sm text-farm-muted">{crop.name} • {farm.area} {farm.areaUnit}</p>
      </Card>

      <Card className="p-5 sm:p-6">
        <h3 className="font-bold text-farm-text mb-4">Log New Expense</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-farm-muted mb-1">Amount (₹)</label>
              <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0" className="w-full rounded-xl border border-farm-text/20 p-3 text-farm-text focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-farm-muted mb-1">Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)} className="w-full rounded-xl border border-farm-text/20 p-3 text-farm-text focus:outline-none">
                <option>Fertilizer</option>
                <option>Pesticide</option>
                <option>Labor</option>
                <option>Machinery</option>
                <option>Transport</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-farm-muted mb-1">Note (Optional)</label>
            <input type="text" value={note} onChange={e => setNote(e.target.value)} placeholder="e.g. Urea 2 bags" className="w-full rounded-xl border border-farm-text/20 p-3 text-farm-text focus:outline-none" />
          </div>
          <Button onClick={save} className="w-full" disabled={!amount}>Save Expense</Button>
        </div>
      </Card>

      <Card className="p-5 sm:p-6">
        <h3 className="font-bold text-farm-text mb-4">Recent Expenses</h3>
        {expenses.length === 0 ? (
          <p className="text-sm text-farm-muted text-center py-4">No expenses recorded yet.</p>
        ) : (
          <div className="space-y-3">
            {expenses.map((e) => (
              <div key={e.id} className="flex justify-between items-center border-b border-farm-text/10 pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="text-sm font-bold text-farm-text">{e.category}</p>
                  <p className="text-xs text-farm-muted">{new Date(e.timestamp).toLocaleDateString()} {e.note && `• ${e.note}`}</p>
                </div>
                <p className="text-sm font-bold text-urgency-red-text">-₹{e.amount}</p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

import { useState } from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { addExpense, addIncome } from "../../store/logStore";

export default function Ledger({ financials }) {
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!amount || !description) return;
    
    const entry = {
      label: description,
      amount: parseFloat(amount),
    };

    if (type === "expense") {
      addExpense(entry);
    } else {
      addIncome(entry);
    }

    setAmount("");
    setDescription("");
  }

  return (
    <Card className="p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8a928a]">Financials</p>
          <h2 className="mt-1 font-serif text-2xl font-bold text-[#173f2c]">Farm Ledger</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mb-8 rounded-[24px] bg-[#f5f6f1] p-5">
        <div className="grid gap-3 sm:grid-cols-[100px_1fr_120px]">
          <select 
            value={type} 
            onChange={e => setType(e.target.value)}
            className="w-full rounded-2xl border border-[#173f2c]/10 bg-white px-4 py-3 text-sm font-semibold text-[#33483a] outline-none transition focus:border-[#6f9877]"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <input 
            type="text" 
            placeholder="e.g. Copper Fungicide" 
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full rounded-2xl border border-[#173f2c]/10 bg-white px-4 py-3 text-sm font-semibold text-[#33483a] outline-none transition focus:border-[#6f9877]"
          />
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7d867e] font-semibold">₹</span>
            <input 
              type="number" 
              placeholder="Amount" 
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="w-full rounded-2xl border border-[#173f2c]/10 bg-white py-3 pl-8 pr-4 text-sm font-semibold text-[#33483a] outline-none transition focus:border-[#6f9877]"
            />
          </div>
        </div>
        <Button type="submit" className="mt-4 w-full sm:w-auto">Add entry</Button>
      </form>

      {financials.length === 0 ? (
        <div className="mt-4 rounded-[24px] border border-dashed border-[#d1d8d2] p-8 text-center">
          <h3 className="font-bold text-[#3d5043]">No financials recorded</h3>
          <p className="mt-1 text-sm text-[#7a847c]">Keep track of your farm expenses and income here.</p>
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {financials.map(log => {
            const isExpense = log.type === "expense";
            return (
              <div key={log.id} className="flex flex-wrap items-center justify-between gap-3 rounded-[22px] bg-[#f7f7f2] p-4">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-[#3e5144]">{log.label}</p>
                  <span className="text-[11px] text-[#919991]">{new Date(log.timestamp).toLocaleString([], {dateStyle:"medium", timeStyle:"short"})}</span>
                </div>
                <div className={`font-serif text-lg font-bold ${isExpense ? "text-[#b44b37]" : "text-[#4d7454]"}`}>
                  {isExpense ? "-" : "+"}₹{log.amount}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}

import { useState } from "react";
import { NavLink } from "react-router-dom";

const items = [
  { to: "/today", label: "Today", icon: "⌂" },
  { to: "/journey", label: "Journey", icon: "↗" },
  { to: "/weekly", label: "Weekly", icon: "▥" },
  { to: "/history", label: "History", icon: "◷" },
];

export default function BottomNav() {
  const [fabOpen, setFabOpen] = useState(false);

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[230px] border-r border-[#173f2c]/8 bg-[#f4f3ea]/90 p-5 backdrop-blur-xl lg:block">
        <div className="px-2 py-2">
          <img src="/logo.png" alt="Sanjivani" className="h-14 object-contain drop-shadow-md origin-left scale-110" />
          <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#7f897f] ml-1">Crop companion</div>
        </div>

        <nav className="mt-10 space-y-2">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold transition ${
                  isActive
                    ? "bg-[#173f2c] text-white shadow-[0_12px_28px_rgba(23,63,44,.18)]"
                    : "text-[#59645d] hover:bg-white/80 hover:text-[#173f2c]"
                }`
              }
            >
              <span className="grid size-8 place-items-center rounded-xl bg-current/5 text-lg">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
          
          <button 
            onClick={() => setFabOpen(true)}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-urgency-green-bg px-4 py-3.5 text-sm font-bold text-urgency-green-text transition hover:bg-[#d4ecd9]"
          >
            <span>+</span> Log Activity
          </button>
        </nav>

        <div className="absolute bottom-6 left-5 right-5 rounded-3xl bg-[#ddebd9] p-4">
          <div className="text-2xl">🌱</div>
          <p className="mt-2 text-sm font-bold text-[#173f2c]">Right action. Right time.</p>
          <p className="mt-1 text-xs leading-5 text-[#607063]">Keep recording what happens in the field. Your crop story becomes clearer every day.</p>
        </div>
      </aside>

      {/* FAB for Mobile */}
      <div className="fixed bottom-[80px] right-4 z-50 lg:hidden">
        <button
          onClick={() => setFabOpen(!fabOpen)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#173f2c] text-2xl text-white shadow-[0_8px_20px_rgba(23,63,44,0.3)] transition-transform hover:scale-105 active:scale-95"
        >
          +
        </button>
      </div>

      {/* Mock FAB Menu */}
      {fabOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm lg:hidden" onClick={() => setFabOpen(false)}>
          <div className="mb-24 flex flex-col gap-3 p-4 w-full max-w-sm" onClick={e => e.stopPropagation()}>
            <Link to="/today" onClick={() => setFabOpen(false)} className="rounded-2xl bg-white p-4 font-bold text-farm-text shadow-lg flex items-center gap-3">
              <span className="text-2xl">🔍</span> Report Problem
            </Link>
            <Link to="/ledger" onClick={() => setFabOpen(false)} className="rounded-2xl bg-white p-4 font-bold text-farm-text shadow-lg flex items-center gap-3">
              <span className="text-2xl">💰</span> Add Expense
            </Link>
            <Link to="/harvest" onClick={() => setFabOpen(false)} className="rounded-2xl bg-white p-4 font-bold text-farm-text shadow-lg flex items-center gap-3">
              <span className="text-2xl">🌾</span> Harvest Record
            </Link>
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 z-40 mx-auto border-t border-[#173f2c]/8 bg-[#fbfbf7]/92 px-3 pb-[max(10px,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl lg:hidden">
        <div className="mx-auto grid max-w-xl grid-cols-4 gap-1">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-bold transition ${
                  isActive ? "bg-[#e8f0e6] text-[#173f2c]" : "text-[#7b837c]"
                }`
              }
            >
              <span className="text-lg leading-none">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
}

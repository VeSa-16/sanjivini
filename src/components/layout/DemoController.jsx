import { useState, useEffect } from "react";
import { getDemoState, updateDemoState, resetDemoState } from "../../store/demoStore";

export default function DemoController() {
  const [isOpen, setIsOpen] = useState(false);
  const [demoState, setDemoState] = useState(getDemoState());

  useEffect(() => {
    const refresh = () => setDemoState(getDemoState());
    window.addEventListener("sanjivani:demo-updated", refresh);
    return () => window.removeEventListener("sanjivani:demo-updated", refresh);
  }, []);

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 sm:bottom-8 sm:right-8 z-50 rounded-full bg-[#173f2c]/10 p-3 text-[#173f2c] hover:bg-[#173f2c]/20 transition shadow-sm backdrop-blur-sm"
        title="Open Farm Situation Simulator"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-24 right-4 sm:bottom-8 sm:right-8 z-50 w-80 rounded-[24px] bg-white p-5 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-[#173f2c]/10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-lg font-bold text-[#173f2c]">Farm Situation</h3>
        <button onClick={() => setIsOpen(false)} className="text-[#687269] hover:text-[#173f2c]">✕</button>
      </div>

      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
        {/* Weather Controls */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#8a928a] mb-2">Weather Forecast</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: "normal", label: "Normal" },
              { id: "rain", label: "Rain Expected" },
              { id: "humid", label: "High Humidity" },
              { id: "dry", label: "No Rain / Dry" },
            ].map(opt => (
              <button
                key={opt.id}
                onClick={() => updateDemoState({ weatherMode: opt.id })}
                className={`rounded-xl px-3 py-2 text-xs font-bold transition ${demoState.weatherMode === opt.id ? "bg-[#173f2c] text-white" : "bg-[#f5f6f1] text-[#33483a] hover:bg-[#e6e8df]"}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Plant Health Controls */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#8a928a] mb-2">Observed Plant Health</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: "normal", label: "Normal / Healthy" },
              { id: "spots", label: "Leaf Spots" },
              { id: "yellow", label: "Yellow Leaves" },
              { id: "pest", label: "Pest Activity" },
            ].map(opt => (
              <button
                key={opt.id}
                onClick={() => updateDemoState({ healthMode: opt.id })}
                className={`rounded-xl px-3 py-2 text-xs font-bold transition ${demoState.healthMode === opt.id ? "bg-[#b44b37] text-white" : "bg-[#f5f6f1] text-[#33483a] hover:bg-[#e6e8df]"}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Controls */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#8a928a] mb-2">Crop Timeline</p>
          <div className="grid grid-cols-1 gap-2">
            {[
              { id: 0, label: "On Schedule" },
              { id: -5, label: "Ahead of Schedule (+5 days)" },
              { id: 5, label: "Behind Schedule (-5 days)" },
            ].map(opt => (
              <button
                key={opt.id}
                onClick={() => updateDemoState({ timelineShift: opt.id })}
                className={`rounded-xl px-3 py-2 text-xs font-bold transition ${demoState.timelineShift === opt.id ? "bg-[#346b82] text-white" : "bg-[#f5f6f1] text-[#33483a] hover:bg-[#e6e8df]"}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button onClick={resetDemoState} className="mt-5 w-full rounded-xl py-2 text-xs font-bold text-[#8a928a] hover:bg-[#f5f6f1]">
        Reset Demo State
      </button>
    </div>
  );
}

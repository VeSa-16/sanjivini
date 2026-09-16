import { useState } from "react";
import { useNavigate } from "react-router-dom";
import tomato from "../data/crops/tomato.json";
import wheat from "../data/crops/wheat.json";
import { defaultFarm, saveFarm } from "../store/farmStore";

const crops = [tomato, wheat];

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [farm, setFarm] = useState({
    ...defaultFarm,
    sowingDate: new Date(Date.now() - 47 * 86400000).toISOString().slice(0, 10),
  });

  function update(key, value) {
    setFarm((f) => ({ ...f, [key]: value }));
  }

  function chooseCrop(crop) {
    setFarm((f) => ({ ...f, cropId: crop.id, variety: crop.defaultVariety }));
  }

  function finish() {
    saveFarm({ ...farm, onboarded: true });
    navigate("/today");
  }

  return (
    <main className="min-h-screen bg-[#f4f2e8] p-4 sm:p-6">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-6xl overflow-hidden rounded-[36px] bg-white shadow-[0_30px_100px_rgba(31,59,42,.14)] lg:grid-cols-[.9fr_1.1fr]">
        <aside className="relative hidden overflow-hidden bg-[#173f2c] p-10 text-white lg:flex lg:flex-col">
          <div className="absolute -right-32 -top-24 size-96 rounded-full bg-[#6c9a68]/25 blur-3xl" />
          <div className="absolute -bottom-36 -left-24 size-96 rounded-full bg-[#d4ad64]/15 blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-3">
              <div className="grid size-11 place-items-center rounded-2xl bg-white/12 font-serif text-xl font-bold">S</div>
              <div>
                <div className="font-serif text-2xl font-bold">Sanjivani</div>
                <div className="text-xs uppercase tracking-[.18em] text-white/45">Crop companion</div>
              </div>
            </div>

            <div className="mt-24">
              <div className="text-6xl">🌱</div>
              <h1 className="mt-7 max-w-sm font-serif text-5xl font-bold leading-[1.03] tracking-[-0.04em]">
                Your crop knows what comes next.
              </h1>
              <p className="mt-5 max-w-sm text-base leading-7 text-white/62">
                Tell Sanjivani what you are growing. Every day after that, open one screen and know what deserves attention.
              </p>
            </div>
          </div>
          <div className="relative mt-auto rounded-3xl border border-white/10 bg-white/8 p-5">
            <div className="text-xs font-bold uppercase tracking-[.16em] text-white/40">Promise</div>
            <div className="mt-2 text-lg font-semibold">Right action. Right time. Right amount.</div>
          </div>
        </aside>

        <section className="flex flex-col p-5 sm:p-9 lg:p-12">
          <div className="flex items-center justify-between">
            <div className="lg:hidden">
              <div className="font-serif text-2xl font-bold text-[#173f2c]">Sanjivani</div>
              <div className="text-xs text-[#7d867e]">Set up your first crop</div>
            </div>
            <div className="ml-auto flex gap-2">
              {[1,2,3].map((n) => (
                <div key={n} className={`h-2 rounded-full transition-all ${n === step ? "w-8 bg-[#173f2c]" : n < step ? "w-4 bg-[#8caf8d]" : "w-4 bg-[#e1e5df]"}`} />
              ))}
            </div>
          </div>

          {step === 1 && (
            <div className="my-auto py-10">
              <p className="text-xs font-bold uppercase tracking-[.16em] text-[#8a928a]">Step 1 of 3</p>
              <h2 className="mt-2 font-serif text-4xl font-bold tracking-tight text-[#173f2c]">Which crop are you growing?</h2>
              <p className="mt-3 max-w-lg text-sm leading-6 text-[#748078]">Start with one crop. Sanjivani will create its full journey from your planting date.</p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {crops.map((crop) => (
                  <button
                    key={crop.id}
                    onClick={() => chooseCrop(crop)}
                    className={`rounded-[26px] border p-5 text-left transition ${
                      farm.cropId === crop.id ? "border-[#173f2c] bg-[#edf4e9] shadow-sm" : "border-[#173f2c]/8 hover:bg-[#f8f8f4]"
                    }`}
                  >
                    <div className="text-4xl">{crop.emoji}</div>
                    <div className="mt-4 font-serif text-2xl font-bold text-[#173f2c]">{crop.name}</div>
                    <div className="mt-1 text-xs text-[#7b857d]">{crop.stages.length} guided crop stages</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="my-auto py-10">
              <p className="text-xs font-bold uppercase tracking-[.16em] text-[#8a928a]">Step 2 of 3</p>
              <h2 className="mt-2 font-serif text-4xl font-bold tracking-tight text-[#173f2c]">Tell us about this farm.</h2>
              <p className="mt-3 text-sm leading-6 text-[#748078]">Only the basics. You can improve the farm profile later.</p>
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <Field label="Your name" value={farm.farmerName} onChange={(v) => update("farmerName", v)} placeholder="e.g. Ramesh" />
                <Field label="Farm name" value={farm.farmName} onChange={(v) => update("farmName", v)} placeholder="My Farm" />
                <Field label="Area" value={farm.area} onChange={(v) => update("area", v)} type="number" />
                <Select label="Area unit" value={farm.areaUnit} onChange={(v) => update("areaUnit", v)} options={["acre","hectare"]} />
                <Select label="Soil type" value={farm.soilType} onChange={(v) => update("soilType", v)} options={["Black soil","Loamy soil","Sandy loam","Clay loam","Not sure"]} />
                <Select label="Irrigation" value={farm.irrigationMethod} onChange={(v) => update("irrigationMethod", v)} options={["Drip","Furrow","Sprinkler","Manual","Other"]} />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="my-auto py-10">
              <p className="text-xs font-bold uppercase tracking-[.16em] text-[#8a928a]">Step 3 of 3</p>
              <h2 className="mt-2 font-serif text-4xl font-bold tracking-tight text-[#173f2c]">When did this crop begin?</h2>
              <p className="mt-3 max-w-lg text-sm leading-6 text-[#748078]">For tomato, use the transplanting date. Sanjivani uses it to estimate the current stage.</p>
              <div className="mt-7 max-w-md rounded-[28px] bg-[#f5f7f1] p-5">
                <label className="text-xs font-bold uppercase tracking-[.12em] text-[#788079]">Planting / transplanting date</label>
                <input
                  type="date"
                  value={farm.sowingDate}
                  onChange={(e) => update("sowingDate", e.target.value)}
                  className="mt-3 w-full rounded-2xl border border-[#173f2c]/10 bg-white px-4 py-3.5 text-sm font-semibold text-[#33483a] outline-none focus:border-[#6f9877]"
                />
                <div className="mt-5 rounded-2xl bg-white p-4 text-sm text-[#667269]">
                  <span className="font-bold text-[#173f2c]">{crops.find(c => c.id === farm.cropId)?.emoji} {crops.find(c => c.id === farm.cropId)?.name}</span>
                  <br />
                  {farm.area} {farm.areaUnit} • {farm.soilType} • {farm.irrigationMethod}
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between border-t border-[#173f2c]/8 pt-5">
            <button
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              className={`rounded-2xl px-4 py-3 text-sm font-bold text-[#69746c] ${step === 1 ? "invisible" : ""}`}
            >
              ← Back
            </button>
            {step < 3 ? (
              <button onClick={() => setStep((s) => s + 1)} className="rounded-2xl bg-[#173f2c] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#173f2c]/15">
                Continue →
              </button>
            ) : (
              <button onClick={finish} className="rounded-2xl bg-[#173f2c] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#173f2c]/15">
                Start my crop journey →
              </button>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <label>
      <span className="mb-2 block text-xs font-bold uppercase tracking-[.11em] text-[#7d867e]">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-[#173f2c]/10 bg-[#f8f8f4] px-4 py-3.5 text-sm font-semibold text-[#33483a] outline-none transition focus:border-[#6f9877] focus:bg-white"
      />
    </label>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <label>
      <span className="mb-2 block text-xs font-bold uppercase tracking-[.11em] text-[#7d867e]">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-2xl border border-[#173f2c]/10 bg-[#f8f8f4] px-4 py-3.5 text-sm font-semibold text-[#33483a] outline-none transition focus:border-[#6f9877] focus:bg-white">
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  );
}

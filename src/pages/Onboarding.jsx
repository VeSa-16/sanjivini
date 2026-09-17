import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tomato from "../data/crops/tomato.json";
import wheat from "../data/crops/wheat.json";
import { defaultFarm, saveFarm, setActiveFarm } from "../store/farmStore";
import { resolveStage } from "../engine/stageResolver";

const crops = [tomato, wheat];

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [farm, setFarm] = useState({
    id: crypto.randomUUID(),
    farmerName: "",
    farmName: "",
    area: "",
    areaUnit: "acre",
    cropId: "tomato",
    variety: "",
    sowingDate: new Date().toISOString().slice(0, 10),
    soilType: "",
    irrigationMethod: "",
    stageOverride: "",
    location: null,
    onboarded: false,
  });

  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [showManualInput, setShowManualInput] = useState(false);
  const [manualCity, setManualCity] = useState("");
  const [isSearchingCity, setIsSearchingCity] = useState(false);

  const update = (key, value) => setFarm((f) => ({ ...f, [key]: value }));

  const searchCity = async () => {
    if (!manualCity.trim()) return;
    setIsSearchingCity(true);
    try {
      const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(manualCity)}&count=1`);
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        const { latitude, longitude, name, admin1 } = data.results[0];
        update("location", { lat: latitude, lon: longitude, name: `${name}${admin1 ? `, ${admin1}` : ''}` });
        setShowManualInput(false);
      } else {
        alert("City not found. Please try another name.");
      }
    } catch (e) {
      alert("Error searching for city.");
    }
    setIsSearchingCity(false);
  };

  const getLocation = () => {
    setIsGettingLocation(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          update("location", { lat: position.coords.latitude, lon: position.coords.longitude });
          setIsGettingLocation(false);
        },
        (error) => {
          console.error(error);
          setIsGettingLocation(false);
          alert("Could not get location. Please allow location permissions.");
        }
      );
    } else {
      setIsGettingLocation(false);
      alert("Geolocation is not supported by your browser.");
    }
  };

  useEffect(() => {
    if (step === 9) {
      const timer = setTimeout(() => {
        setStep(10);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const playDemo = () => {
    const demoId = crypto.randomUUID();
    const demoDate = new Date(Date.now() - 47 * 86400000).toISOString().slice(0, 10);
    saveFarm({
      ...defaultFarm,
      id: demoId,
      farmerName: "Ramesh Patil",
      farmName: "Field A",
      cropId: "tomato",
      variety: "Hybrid Tomato",
      sowingDate: demoDate,
      area: "1",
      areaUnit: "acre",
      soilType: "Loamy soil",
      irrigationMethod: "Drip",
      location: { lat: 18.5204, lon: 73.8567 }, // Pune mock for demo
      onboarded: true,
    });
    setActiveFarm(demoId);
    navigate("/today");
  };

  const finish = () => {
    saveFarm({ ...farm, onboarded: true });
    setActiveFarm(farm.id);
    navigate("/today");
  };

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => Math.max(1, s - 1));
  const skip = () => setStep((s) => s + 1);

  // 5 conceptual stages
  let phase = 0;
  if (step >= 3 && step <= 3) phase = 1; // YOU
  else if (step >= 4 && step <= 4) phase = 2; // YOUR FIELD
  else if (step >= 5 && step <= 6) phase = 3; // YOUR CROP
  else if (step >= 7 && step <= 9) phase = 4; // YOUR CROP JOURNEY
  else if (step >= 10) phase = 5; // READY

  const crop = crops.find(c => c.id === farm.cropId) || tomato;
  
  // Calculate dynamic stage for wow moment (Screen 7 and 10)
  const currentStage = resolveStage(farm.sowingDate, new Date(), crop);
  const daysSince = Math.floor((Date.now() - new Date(farm.sowingDate).getTime()) / 86400000);

  return (
    <main className="min-h-screen bg-[#f4f3ea] text-[#20352a] font-sans flex flex-col">
      {/* Progress Bar (Hidden on Screen 1 & 18) */}
      {step > 1 && step < 18 && (
        <div className="w-full max-w-4xl mx-auto px-6 pt-8 pb-4">
          <div className="flex justify-between items-center relative">
            <div className="absolute left-0 right-0 h-[2px] bg-[#e1e5df] top-1/2 -translate-y-1/2 -z-10"></div>
            <div 
              className="absolute left-0 h-[2px] bg-[#173f2c] top-1/2 -translate-y-1/2 -z-10 transition-all duration-500" 
              style={{ width: `${(phase / 5) * 100}%` }}
            ></div>
            {[1, 2, 3, 4, 5].map(p => (
              <div key={p} className={`flex flex-col items-center gap-2 bg-[#f4f3ea] px-2 ${p > phase ? 'opacity-40' : ''}`}>
                <div className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ${p <= phase ? 'bg-[#173f2c] text-white' : 'bg-[#e1e5df] text-[#7d867e]'}`}>
                  {p < phase ? '✓' : p}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 px-1 text-[10px] font-bold uppercase tracking-[.12em] text-[#7d867e]">
            <span className={phase >= 1 ? 'text-[#173f2c]' : ''}>You</span>
            <span className={phase >= 2 ? 'text-[#173f2c]' : ''}>Field</span>
            <span className={phase >= 3 ? 'text-[#173f2c]' : ''}>Crop</span>
            <span className={phase >= 4 ? 'text-[#173f2c]' : ''}>Journey</span>
            <span className={phase >= 5 ? 'text-[#173f2c]' : ''}>Ready</span>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 max-w-2xl mx-auto w-full">
        <div className="w-full animate-fade-in">

          {/* SCREEN 1 - WELCOME */}
          {step === 1 && (
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 text-4xl mb-8">
                <span>🌱</span><span className="text-[#a5bca7]">→</span>
                <span>🌿</span><span className="text-[#a5bca7]">→</span>
                <span>🌼</span><span className="text-[#a5bca7]">→</span>
                <span>🍅</span><span className="text-[#a5bca7]">→</span>
                <span>🌾</span>
              </div>
              <h1 className="font-serif text-5xl font-bold text-[#173f2c] leading-tight">Meet your crop companion.</h1>
              <p className="mt-6 text-lg text-[#526158] max-w-md mx-auto">
                Sanjivani helps you understand what your crop needs — from sowing to harvest.
              </p>
              <div className="mt-12 space-y-4">
                <button onClick={() => setStep(3)} className="w-full sm:w-auto px-10 py-4 bg-[#173f2c] text-white rounded-2xl font-bold text-lg shadow-xl shadow-[#173f2c]/20 hover:bg-[#123021] transition">
                  Start My Crop Journey
                </button>
                <div className="pt-2">
                  <button onClick={() => setStep(2)} className="text-[#687269] font-bold underline hover:text-[#173f2c]">
                    I'm exploring Sanjivani
                  </button>
                </div>
                <div className="pt-8">
                  <button onClick={playDemo} className="text-sm text-[#8a928a] font-semibold border border-[#d6dcd7] px-4 py-2 rounded-xl hover:bg-white hover:text-[#173f2c]">
                    Try a sample farm (Demo Mode)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 2 - EXPLAIN THE PROBLEM */}
          {step === 2 && (
            <div>
              <h2 className="font-serif text-4xl font-bold text-[#173f2c] leading-tight text-center mb-10">Every day, your crop asks a different question.</h2>
              
              <div className="space-y-4">
                <div className="bg-white p-5 rounded-[24px] shadow-sm flex items-center gap-4 border border-[#e8ece9]">
                  <div className="text-4xl">💧</div>
                  <div className="font-bold text-lg text-[#3b4e40]">"Does it need water today?"</div>
                </div>
                <div className="bg-white p-5 rounded-[24px] shadow-sm flex items-center gap-4 border border-[#e8ece9]">
                  <div className="text-4xl">🌱</div>
                  <div className="font-bold text-lg text-[#3b4e40]">"What does it need at this stage?"</div>
                </div>
                <div className="bg-white p-5 rounded-[24px] shadow-sm flex items-center gap-4 border border-[#e8ece9]">
                  <div className="text-4xl">🔎</div>
                  <div className="font-bold text-lg text-[#3b4e40]">"Does this plant look healthy?"</div>
                </div>
              </div>

              <div className="mt-10 text-center">
                <p className="text-xl font-semibold text-[#173f2c]">Sanjivani brings these decisions together in one place.</p>
                <button onClick={() => setStep(3)} className="mt-8 px-10 py-4 bg-[#173f2c] text-white rounded-2xl font-bold text-lg shadow-xl shadow-[#173f2c]/20 hover:bg-[#123021] transition">
                  Let's set it up
                </button>
              </div>
            </div>
          )}

          {/* SCREEN 3 - FARMER PROFILE */}
          {step === 3 && (
            <div className="max-w-md mx-auto text-center">
              <h2 className="font-serif text-4xl font-bold text-[#173f2c] mb-8">What should we call you?</h2>
              <input 
                type="text" 
                value={farm.farmerName} 
                onChange={(e) => update("farmerName", e.target.value)}
                placeholder="Your name"
                autoFocus
                className="w-full text-center text-3xl font-bold text-[#173f2c] bg-transparent border-b-2 border-[#173f2c]/20 pb-4 outline-none focus:border-[#173f2c] placeholder:text-[#173f2c]/20"
              />
              {farm.farmerName.length > 1 && (
                <div className="mt-10 animate-fade-in text-2xl font-semibold text-[#526158]">
                  Nice to meet you, {farm.farmerName} 👋
                </div>
              )}
            </div>
          )}

          {/* SCREEN 4 - ADD YOUR FIRST FIELD */}
          {step === 4 && (
            <div className="max-w-md mx-auto">
              <h2 className="font-serif text-4xl font-bold text-[#173f2c] mb-8 text-center">Where is your crop growing?</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7d867e] mb-2">Field Name</label>
                  <input type="text" value={farm.farmName} onChange={(e) => update("farmName", e.target.value)} placeholder="e.g. Field A" className="w-full bg-white border border-[#e8ece9] rounded-2xl p-4 text-lg font-bold text-[#173f2c] outline-none focus:border-[#173f2c]" />
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#7d867e] mb-2">Farm Area</label>
                    <input type="number" value={farm.area} onChange={(e) => update("area", e.target.value)} placeholder="e.g. 1" className="w-full bg-white border border-[#e8ece9] rounded-2xl p-4 text-lg font-bold text-[#173f2c] outline-none focus:border-[#173f2c]" />
                  </div>
                  <div className="w-32">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#7d867e] mb-2">&nbsp;</label>
                    <select value={farm.areaUnit} onChange={(e) => update("areaUnit", e.target.value)} className="w-full bg-[#eef3e9] border-none rounded-2xl p-4 text-lg font-bold text-[#173f2c] outline-none cursor-pointer">
                      <option value="acre">acre</option>
                      <option value="hectare">hectare</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7d867e] mb-2">Location</label>
                  {!showManualInput ? (
                    <div className="flex gap-3">
                      <button onClick={getLocation} disabled={isGettingLocation || farm.location} className="flex-1 bg-[#173f2c]/5 text-[#173f2c] font-bold py-3 rounded-xl border border-[#173f2c]/10 hover:bg-[#173f2c]/10 disabled:opacity-50">
                        {farm.location ? "✓ Location acquired" : isGettingLocation ? "Getting location..." : "Use my location"}
                      </button>
                      <button onClick={() => setShowManualInput(true)} className="flex-1 bg-white text-[#526158] font-bold py-3 rounded-xl border border-[#e8ece9] hover:bg-gray-50">Select manually</button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={manualCity} 
                        onChange={(e) => setManualCity(e.target.value)} 
                        placeholder="Enter city name (e.g. Solapur)" 
                        className="flex-1 bg-white border border-[#e8ece9] rounded-xl p-3 text-sm font-bold text-[#173f2c] outline-none focus:border-[#173f2c]"
                        onKeyDown={(e) => e.key === 'Enter' && searchCity()}
                      />
                      <button onClick={searchCity} disabled={isSearchingCity} className="bg-[#173f2c] text-white font-bold px-4 rounded-xl disabled:opacity-50">
                        {isSearchingCity ? "..." : "Search"}
                      </button>
                    </div>
                  )}
                  {farm.location?.name && <p className="text-xs text-[#173f2c] mt-2 font-bold text-center">📍 {farm.location.name}</p>}
                  {!farm.location?.name && <p className="text-xs text-[#7d867e] mt-3 text-center">Your location helps us understand local weather and crop conditions.</p>}
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 5 - SELECT YOUR CROP */}
          {step === 5 && (
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-serif text-4xl font-bold text-[#173f2c] mb-8">What are you growing?</h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { id: "tomato", name: "Tomato", emoji: "🍅" },
                  { id: "wheat", name: "Wheat", emoji: "🌾" },
                  { id: "onion", name: "Onion", emoji: "🧅" },
                  { id: "chilli", name: "Chilli", emoji: "🌶️" },
                  { id: "potato", name: "Potato", emoji: "🥔" },
                  { id: "maize", name: "Maize", emoji: "🌽" }
                ].map(c => (
                  <button 
                    key={c.id}
                    onClick={() => { update("cropId", c.id); setTimeout(next, 400); }}
                    className={`p-6 rounded-[24px] border-2 transition-all flex flex-col items-center gap-3 ${farm.cropId === c.id ? 'border-[#173f2c] bg-[#eef3e9] scale-105' : 'border-[#e8ece9] bg-white hover:border-[#173f2c]/30 hover:shadow-md'}`}
                  >
                    <span className="text-5xl">{c.emoji}</span>
                    <span className="font-bold text-[#173f2c] text-lg">{c.name}</span>
                  </button>
                ))}
              </div>
              
              {farm.cropId && (
                <div className="mt-8 animate-fade-in text-lg font-semibold text-[#526158]">
                  Great choice 🌱 <br/> Now we'll build your {farm.cropId} crop journey.
                </div>
              )}
            </div>
          )}

          {/* SCREEN 6 - CROP VARIETY */}
          {step === 6 && (
            <div className="max-w-md mx-auto text-center">
              <h2 className="font-serif text-4xl font-bold text-[#173f2c] mb-8">Which variety are you growing?</h2>
              
              <div className="space-y-3">
                {["Hybrid", "Desi/Local", "High-Yielding"].map(v => (
                  <button 
                    key={v}
                    onClick={() => { update("variety", v); setTimeout(next, 300); }}
                    className={`w-full p-5 rounded-2xl border-2 text-left font-bold text-lg transition ${farm.variety === v ? 'border-[#173f2c] bg-[#eef3e9] text-[#173f2c]' : 'border-[#e8ece9] bg-white text-[#526158] hover:border-[#173f2c]/30'}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
              
              <div className="mt-10">
                <button onClick={() => { update("variety", ""); next(); }} className="text-[#7d867e] font-bold underline hover:text-[#173f2c]">I'm not sure</button>
                <p className="text-xs text-[#7d867e] mt-2">That’s okay. You can continue and update this later.</p>
              </div>
            </div>
          )}

          {/* SCREEN 7 - SOWING DATE WOW MOMENT */}
          {step === 7 && (
            <div className="max-w-lg mx-auto text-center">
              <h2 className="font-serif text-4xl font-bold text-[#173f2c] mb-8">When did your crop begin its journey?</h2>
              
              <div className="bg-white p-6 rounded-[24px] border border-[#e8ece9] shadow-sm mb-8 inline-block">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#7d867e] mb-3">Sowing / Transplanting date</label>
                <input 
                  type="date" 
                  value={farm.sowingDate} 
                  onChange={(e) => update("sowingDate", e.target.value)}
                  className="bg-[#f4f3ea] text-[#173f2c] font-bold text-xl px-6 py-4 rounded-xl outline-none focus:ring-2 focus:ring-[#173f2c]"
                />
              </div>

              {farm.sowingDate && (
                <div className="animate-fade-in">
                  <p className="text-[#526158] font-semibold mb-4">Your crop is currently…</p>
                  <div className="bg-[#173f2c] text-white p-8 rounded-[32px] inline-block shadow-xl shadow-[#173f2c]/20">
                    <div className="text-5xl mb-3">{currentStage.emoji}</div>
                    <div className="text-sm font-bold uppercase tracking-[.2em] text-[#a5bca7] mb-1">Day {daysSince > 0 ? daysSince : 0}</div>
                    <div className="font-serif text-3xl font-bold">{currentStage.name}</div>
                  </div>
                  <p className="mt-8 text-sm font-semibold text-[#7d867e]">
                    Your guidance will change as your crop moves through each stage.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* SCREEN 8 - FARM CONDITIONS */}
          {step === 8 && (
            <div className="max-w-md mx-auto">
              <h2 className="font-serif text-4xl font-bold text-[#173f2c] mb-8 text-center">Help us understand your field.</h2>
              
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-[#173f2c] mb-2">Soil Type</label>
                  <p className="text-xs text-[#7d867e] mb-3">Different soils hold water differently.</p>
                  <div className="grid grid-cols-2 gap-2">
                    {["Sandy", "Loamy", "Clay", "I'm not sure"].map(s => (
                      <button key={s} onClick={() => update("soilType", s)} className={`py-3 px-4 rounded-xl border text-sm font-bold ${farm.soilType === s ? 'bg-[#173f2c] text-white border-[#173f2c]' : 'bg-white text-[#526158] border-[#e8ece9] hover:border-[#173f2c]/30'}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-[#173f2c] mb-2">Irrigation Method</label>
                  <p className="text-xs text-[#7d867e] mb-3">Different irrigation methods change how water is applied.</p>
                  <div className="grid grid-cols-2 gap-2">
                    {["Drip", "Sprinkler", "Flood/Furrow", "Other"].map(i => (
                      <button key={i} onClick={() => update("irrigationMethod", i)} className={`py-3 px-4 rounded-xl border text-sm font-bold ${farm.irrigationMethod === i ? 'bg-[#173f2c] text-white border-[#173f2c]' : 'bg-white text-[#526158] border-[#e8ece9] hover:border-[#173f2c]/30'}`}>
                        {i}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 9 - CREATE MY CROP JOURNEY TRANSITION */}
          {step === 9 && (
            <div className="max-w-md mx-auto text-center py-10">
              <div className="relative w-32 h-32 mx-auto mb-8">
                <div className="absolute inset-0 border-4 border-[#e8ece9] rounded-full"></div>
                <div className="absolute inset-0 border-4 border-[#173f2c] rounded-full border-t-transparent animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center text-5xl">✨</div>
              </div>
              <h2 className="font-serif text-3xl font-bold text-[#173f2c] mb-8">Understanding your crop…</h2>
              
              <div className="space-y-4 text-left inline-block">
                <div className="flex items-center gap-3 text-lg font-bold text-[#3b4e40]"><span className="text-green-600">✓</span> Crop selected</div>
                <div className="flex items-center gap-3 text-lg font-bold text-[#3b4e40]"><span className="text-green-600">✓</span> Sowing date logged</div>
                <div className="flex items-center gap-3 text-lg font-bold text-[#3b4e40]"><span className="text-green-600">✓</span> Field conditions matched</div>
                <div className="flex items-center gap-3 text-lg font-bold text-[#3b4e40]"><span className="text-green-600">✓</span> Crop stage calculated</div>
              </div>

              <div className="mt-12 text-2xl font-serif font-bold text-[#173f2c] animate-pulse">
                Your crop journey is ready.
              </div>
            </div>
          )}

          {/* SCREEN 10 - THE CROP JOURNEY RESULT */}
          {step === 10 && (
            <div className="max-w-md mx-auto">
              <h2 className="font-serif text-4xl font-bold text-[#173f2c] mb-2 text-center">Your {crop.name} Journey</h2>
              <p className="text-center text-[#7d867e] mb-8 text-sm">Follow your crop from seed to harvest.</p>

              <div className="space-y-0 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#e8ece9] before:to-transparent">
                {crop.stages.map((s, idx) => {
                  const isPast = idx < crop.stages.findIndex(x => x.id === currentStage.id);
                  const isCurrent = s.id === currentStage.id;
                  return (
                    <div key={s.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group py-4">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#f4f3ea] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm ${isCurrent ? 'bg-[#173f2c] text-white z-10 scale-125' : isPast ? 'bg-[#8caf8d] text-white' : 'bg-white text-[#c4cdc5]'}`}>
                        <span className="text-sm">{s.emoji}</span>
                      </div>
                      <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl ${isCurrent ? 'bg-[#173f2c] text-white shadow-lg' : isPast ? 'bg-white border border-[#e8ece9]' : 'opacity-60'}`}>
                        {isCurrent && <div className="text-[10px] font-bold uppercase tracking-wider text-[#a5bca7] mb-1">● You are here</div>}
                        <h4 className={`font-bold ${isCurrent ? 'text-white' : 'text-[#3b4e40]'}`}>{s.name}</h4>
                        {isCurrent && <p className="text-sm text-[#a5bca7] mt-1">Day {daysSince}</p>}
                        <div className={`text-xs mt-1 ${isCurrent ? 'text-white' : 'text-[#7d867e]'}`}>
                          {isPast ? '✓ Completed' : isCurrent ? 'Active now' : 'Upcoming'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 text-center bg-white p-5 rounded-[24px] shadow-sm border border-[#e8ece9]">
                <h4 className="font-bold text-[#173f2c]">What happens next?</h4>
                <p className="text-sm text-[#526158] mt-1">Your crop will soon move toward {crop.stages[crop.stages.findIndex(x => x.id === currentStage.id) + 1]?.name || 'harvest'}.</p>
              </div>
            </div>
          )}

          {/* SCREEN 11 - WHAT SANJIVANI WILL DO FOR YOU */}
          {step === 11 && (
            <div className="max-w-lg mx-auto text-center">
              <h2 className="font-serif text-3xl font-bold text-[#173f2c] mb-8 leading-tight">From here, Sanjivani works with you every day.</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-[24px] text-left border border-[#e8ece9]">
                  <div className="text-3xl mb-3">💧</div>
                  <h4 className="font-bold text-[#173f2c] uppercase tracking-wide text-sm mb-1">Water</h4>
                  <p className="text-xs text-[#7d867e] leading-relaxed">Know when your crop may need water.</p>
                </div>
                <div className="bg-white p-5 rounded-[24px] text-left border border-[#e8ece9]">
                  <div className="text-3xl mb-3">🌱</div>
                  <h4 className="font-bold text-[#173f2c] uppercase tracking-wide text-sm mb-1">Nutrition</h4>
                  <p className="text-xs text-[#7d867e] leading-relaxed">Follow crop-stage nutrition guidance.</p>
                </div>
                <div className="bg-white p-5 rounded-[24px] text-left border border-[#e8ece9]">
                  <div className="text-3xl mb-3">🌦</div>
                  <h4 className="font-bold text-[#173f2c] uppercase tracking-wide text-sm mb-1">Weather</h4>
                  <p className="text-xs text-[#7d867e] leading-relaxed">Understand how weather affects your crop.</p>
                </div>
                <div className="bg-white p-5 rounded-[24px] text-left border border-[#e8ece9]">
                  <div className="text-3xl mb-3">🔎</div>
                  <h4 className="font-bold text-[#173f2c] uppercase tracking-wide text-sm mb-1">Health</h4>
                  <p className="text-xs text-[#7d867e] leading-relaxed">Check your plants and watch for risks.</p>
                </div>
              </div>

              <p className="mt-10 text-lg font-semibold text-[#3b4e40]">All of these come together in your daily plan.</p>
            </div>
          )}

          {/* SCREEN 12 - THE "TODAY" CONCEPT */}
          {step === 12 && (
            <div className="max-w-md mx-auto text-center">
              <h2 className="font-serif text-4xl font-bold text-[#173f2c] mb-8">So what do you need to do today?</h2>
              
              <div className="bg-white p-6 rounded-[28px] shadow-xl shadow-black/5 text-left border border-[#e8ece9] relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-12 bg-[#eef3e9] flex items-center px-6">
                  <div className="text-[10px] font-bold uppercase tracking-[.2em] text-[#173f2c]">Today's Crop Plan</div>
                </div>
                <div className="pt-14 space-y-4">
                  <div className="flex gap-4 items-start">
                    <div className="w-6 h-6 rounded-full bg-[#173f2c] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</div>
                    <div>
                      <div className="font-bold text-[#173f2c]">💧 Check soil moisture</div>
                      <div className="text-xs text-[#7d867e] mt-1">Water is needed for flowering.</div>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-6 h-6 rounded-full bg-[#173f2c] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</div>
                    <div>
                      <div className="font-bold text-[#173f2c]">🌱 Complete nutrition task</div>
                      <div className="text-xs text-[#7d867e] mt-1">Apply balanced NPK.</div>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-6 h-6 rounded-full bg-[#173f2c] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</div>
                    <div>
                      <div className="font-bold text-[#173f2c]">🔎 Inspect flowers</div>
                      <div className="text-xs text-[#7d867e] mt-1">Look for early signs of drop.</div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-8 text-sm font-semibold text-[#526158] leading-relaxed max-w-sm mx-auto">
                Instead of searching through information, Sanjivani gives you the most important actions for today.
              </p>
            </div>
          )}

          {/* SCREEN 13 - WHY EACH RECOMMENDATION */}
          {step === 13 && (
            <div className="max-w-md mx-auto text-center">
              <h2 className="font-serif text-3xl font-bold text-[#173f2c] mb-8">Every recommendation comes with a reason.</h2>
              
              <div className="bg-[#173f2c] text-white p-6 rounded-[28px] text-left shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">💧</span>
                  <span className="font-bold uppercase tracking-wider text-sm text-[#a5bca7]">Hold Irrigation</span>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#a5bca7] mb-1">Why?</div>
                    <p className="text-sm font-medium">Rain is expected today and your crop is currently flowering.</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#a5bca7] mb-1">How?</div>
                    <p className="text-sm font-medium">Check the soil again tomorrow.</p>
                  </div>
                </div>
              </div>

              <p className="mt-8 text-lg font-semibold text-[#3b4e40] leading-relaxed">
                Because knowing <span className="italic">what</span> to do is only half the answer.<br/>You should also know <span className="italic border-b-2 border-[#173f2c]">why</span>.
              </p>
            </div>
          )}

          {/* SCREEN 14 - FARMER OBSERVATION */}
          {step === 14 && (
            <div className="max-w-md mx-auto text-center">
              <h2 className="font-serif text-4xl font-bold text-[#173f2c] mb-6 leading-tight">You know your field better than anyone.</h2>
              <p className="text-sm text-[#7d867e] mb-8">Something looks different?</p>
              
              <div className="grid grid-cols-2 gap-3 text-left">
                {[
                  { label: "Yellow leaves", icon: "🍃" },
                  { label: "Leaf spots", icon: "🟤" },
                  { label: "Insects", icon: "🐛" },
                  { label: "Flower drop", icon: "🌼" },
                  { label: "Fruit problem", icon: "🍅" },
                  { label: "Looks normal", icon: "✓" }
                ].map(opt => (
                  <div key={opt.label} className="bg-white p-4 rounded-2xl border border-[#e8ece9] flex items-center gap-3">
                    <span className="text-xl">{opt.icon}</span>
                    <span className="text-xs font-bold text-[#3b4e40]">{opt.label}</span>
                  </div>
                ))}
              </div>

              <p className="mt-8 text-sm font-semibold text-[#526158] leading-relaxed bg-[#eef3e9] p-4 rounded-2xl">
                Your observations help Sanjivani understand exactly what is happening in your field.
              </p>
            </div>
          )}

          {/* SCREEN 15 - PLANT CHECK */}
          {step === 15 && (
            <div className="max-w-md mx-auto text-center">
              <h2 className="font-serif text-4xl font-bold text-[#173f2c] mb-8">See something unusual?</h2>
              
              <div className="border-2 border-dashed border-[#a5bca7] rounded-[32px] p-10 bg-white">
                <div className="text-6xl mb-4">📷</div>
                <div className="font-bold text-lg text-[#173f2c]">Take a photo</div>
                <div className="text-sm text-[#7d867e] mt-1">Leaf • Flower • Fruit</div>
              </div>

              <div className="mt-8 bg-[#fffbf7] border border-[#f5e6d3] p-5 rounded-[24px] text-left relative">
                <div className="absolute -top-3 left-6 bg-[#d4ad64] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Result</div>
                <h4 className="font-bold text-[#b44b37] text-lg">Possible issue detected</h4>
                <p className="text-sm text-[#7e6a50] mt-2">Your photo can help identify what you should inspect next.</p>
              </div>
            </div>
          )}

          {/* SCREEN 16 - THE ADAPTIVE EXPERIENCE */}
          {step === 16 && (
            <div className="max-w-md mx-auto text-center">
              <h2 className="font-serif text-4xl font-bold text-[#173f2c] mb-12 leading-tight">Your crop changes.<br/>Sanjivani changes with it.</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="bg-white p-4 rounded-2xl border border-[#e8ece9] w-[45%] text-left">
                    <div className="text-xl mb-1">🌦</div>
                    <div className="text-xs font-bold text-[#3b4e40]">Weather changes</div>
                  </div>
                  <div className="text-[#a5bca7]">→</div>
                  <div className="bg-[#173f2c] text-white p-4 rounded-2xl w-[45%] text-left shadow-md">
                    <div className="text-xs font-bold">Water guidance changes</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="bg-white p-4 rounded-2xl border border-[#e8ece9] w-[45%] text-left">
                    <div className="text-xl mb-1">🌱</div>
                    <div className="text-xs font-bold text-[#3b4e40]">Crop stage changes</div>
                  </div>
                  <div className="text-[#a5bca7]">→</div>
                  <div className="bg-[#173f2c] text-white p-4 rounded-2xl w-[45%] text-left shadow-md">
                    <div className="text-xs font-bold">Nutrition guidance changes</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="bg-white p-4 rounded-2xl border border-[#e8ece9] w-[45%] text-left">
                    <div className="text-xl mb-1">🔎</div>
                    <div className="text-xs font-bold text-[#3b4e40]">Farmer observes problem</div>
                  </div>
                  <div className="text-[#a5bca7]">→</div>
                  <div className="bg-[#173f2c] text-white p-4 rounded-2xl w-[45%] text-left shadow-md">
                    <div className="text-xs font-bold">Health monitoring changes</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 17 - FINAL CONFIRMATION */}
          {step === 17 && (
            <div className="max-w-md mx-auto text-center">
              <h2 className="font-serif text-3xl font-bold text-[#173f2c] mb-6 uppercase tracking-wider text-sm">Your Crop Is Ready</h2>
              
              <div className="bg-white rounded-[32px] p-8 border border-[#e8ece9] shadow-xl shadow-black/5 mb-8">
                <div className="text-5xl mb-4">{crop.emoji}</div>
                <h3 className="font-serif text-3xl font-bold text-[#173f2c] mb-6">{crop.name}</h3>
                
                <div className="grid grid-cols-2 gap-y-6 gap-x-4 text-left">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#7d867e] mb-1">Farmer</div>
                    <div className="text-sm font-bold text-[#3b4e40]">{farm.farmerName || "Farmer"}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#7d867e] mb-1">Field</div>
                    <div className="text-sm font-bold text-[#3b4e40]">📍 {farm.farmName || "My Farm"}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#7d867e] mb-1">Area</div>
                    <div className="text-sm font-bold text-[#3b4e40]">📐 {farm.area || 1} {farm.areaUnit}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#7d867e] mb-1">Stage</div>
                    <div className="text-sm font-bold text-[#3b4e40]">🌼 {currentStage.name}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#7d867e] mb-1">Irrigation</div>
                    <div className="text-sm font-bold text-[#3b4e40]">💧 {farm.irrigationMethod || "Drip"}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#7d867e] mb-1">Soil</div>
                    <div className="text-sm font-bold text-[#3b4e40]">🌱 {farm.soilType || "Loamy"}</div>
                  </div>
                </div>
              </div>

              <p className="text-sm font-semibold text-[#526158]">
                From today, Sanjivani will help you keep track of your crop's journey.
              </p>
            </div>
          )}

          {/* SCREEN 18 - FIRST TODAY SCREEN */}
          {step === 18 && (
            <div className="max-w-md mx-auto text-center pt-10">
              <div className="text-6xl mb-6">🌱</div>
              <h2 className="font-serif text-4xl font-bold text-[#173f2c] mb-4">Your crop journey starts here.</h2>
              <p className="text-lg font-bold text-[#3b4e40] mb-2">Sanjivani</p>
              <p className="text-sm font-semibold text-[#7d867e] uppercase tracking-widest mb-12">Right Action. Right Time. Right Amount.</p>
              
              <button onClick={finish} className="w-full px-8 py-5 bg-[#173f2c] text-white rounded-2xl font-bold text-xl shadow-2xl shadow-[#173f2c]/30 hover:bg-[#123021] transition transform hover:-translate-y-1">
                Start Caring for My Crop
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Navigation Footer */}
      {step > 1 && step < 18 && step !== 9 && (
        <div className="w-full max-w-2xl mx-auto px-6 pb-8 pt-4 flex items-center justify-between border-t border-[#173f2c]/5">
          <button onClick={back} className="px-5 py-3 rounded-xl font-bold text-[#7d867e] hover:bg-white hover:text-[#173f2c] transition">
            ← Back
          </button>
          
          <div className="flex gap-3">
            {step === 6 && (
              <button onClick={() => { update("variety", ""); next(); }} className="px-5 py-3 rounded-xl font-bold text-[#7d867e] hover:bg-white transition">
                Skip for now
              </button>
            )}
            <button 
              onClick={next} 
              className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg transition ${step === 3 && !farm.farmerName ? 'bg-[#a5bca7] cursor-not-allowed' : step === 4 && (!farm.farmName || !farm.area) ? 'bg-[#a5bca7] cursor-not-allowed' : 'bg-[#173f2c] hover:bg-[#123021] shadow-[#173f2c]/20'}`}
              disabled={(step === 3 && !farm.farmerName) || (step === 4 && (!farm.farmName || !farm.area))}
            >
              Continue →
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

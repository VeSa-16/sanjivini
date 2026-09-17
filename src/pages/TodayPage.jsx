import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import TodayPlanCard from "../components/today/TodayPlanCard";
import WeatherCard from "../components/today/WeatherCard";
import AlertCard from "../components/today/AlertCard";
import TaskChecklist from "../components/today/TaskChecklist";
import PlantCheckForm from "../components/plantCheck/PlantCheckForm";
import PhotoUpload from "../components/plantCheck/PhotoUpload";
import Card from "../components/ui/Card";
import { useTodayAdvice } from "../hooks/useTodayAdvice";
import { getFarmHealthScore } from "../store/logStore";

export default function TodayPage() {
  const { farm, crop, stage, progress, weather, advice } = useTodayAdvice();
  const [healthScore, setHealthScore] = useState(getFarmHealthScore(farm.id));

  useEffect(() => {
    const refresh = () => setHealthScore(getFarmHealthScore(farm.id));
    window.addEventListener("sanjivani:logs-updated", refresh);
    return () => window.removeEventListener("sanjivani:logs-updated", refresh);
  }, [farm.id]);

  return (
    <div className="space-y-4">
      {/* Greeting */}
      <div className="px-1 pt-2">
        <h1 className="font-serif text-3xl font-bold text-[#173f2c]">Good morning, {farm.farmerName || "Ramesh"} 👋</h1>
        <p className="mt-1 text-sm text-[#687269]">Here’s what your {crop.name.toLowerCase()} crop needs today.</p>
      </div>

      {/* Final Dashboard Summary */}
      <Card className="p-5 sm:p-6 bg-white">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8a928a] mb-4">Your crop today</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-2 text-sm">
          <div>
            <div className="font-bold text-[#173f2c]">🌱 Stage</div>
            <div className="text-[#687269] mt-0.5">{stage.name}</div>
          </div>
          <div>
            <div className="font-bold text-[#173f2c]">💧 Water</div>
            <div className="text-[#687269] mt-0.5">{advice.tasks.find(t => t.type === 'irrigation')?.what.replace('.', '') || "Optimal"}</div>
          </div>
          <div>
            <div className="font-bold text-[#173f2c]">🌿 Nutrition</div>
            <div className="text-[#687269] mt-0.5">{advice.tasks.find(t => t.type === 'nutrition') ? "1 task due" : "Optimal"}</div>
          </div>
          <div>
            <div className="font-bold text-[#173f2c]">🦠 Disease risk</div>
            <div className="text-[#687269] mt-0.5">{advice.disease.risk}</div>
          </div>
          <div>
            <div className="font-bold text-[#173f2c]">🌦 Weather</div>
            <div className="text-[#687269] mt-0.5">{advice.weatherContext?.impact || "Stable"}</div>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 xl:grid-cols-[1.28fr_.72fr]">
        <div className="space-y-4">
          <TodayPlanCard crop={crop} stage={stage} progress={progress} />
          <TaskChecklist advice={advice} />
          <AlertCard disease={advice.disease} />
          
          <Card className="p-5 sm:p-6 bg-[#e6f0fa]">
            <div className="flex justify-between items-start gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#346b82]">Govt Scheme Match</p>
                <h3 className="mt-1 font-serif text-xl font-bold text-[#143e52]">Micro-Irrigation Subsidy</h3>
                <p className="mt-2 text-sm text-[#346b82] max-w-sm">
                  As a {crop.name} farmer with {farm.area} {farm.areaUnit}, you are eligible for a 50% state subsidy on drip equipment this month.
                </p>
              </div>
              <div className="text-3xl shrink-0">🏛️</div>
            </div>
          </Card>

          <PlantCheckForm />
        </div>

        <div className="space-y-4">
          <WeatherCard weather={weather} context={advice.weatherContext} />

          <Card className="p-5 sm:p-6 bg-farm-base">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-farm-muted">Market Update</p>
            <h3 className="mt-1 font-serif text-xl font-bold text-farm-text">Local Mandi Prices</h3>
            <div className="mt-4 flex justify-between items-end border-b border-farm-text/10 pb-3">
              <div>
                <p className="text-sm font-bold text-farm-text">{crop.name} (Premium)</p>
                <p className="text-xs text-farm-muted">Pune APMC (12km away)</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-urgency-green-text">₹42/kg</p>
                <p className="text-xs font-semibold text-urgency-green-text">▲ +₹2 since yesterday</p>
              </div>
            </div>
          </Card>

          <Card className="p-5 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8a928a]">Your farm</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                ["Crop", `${crop.emoji} ${crop.name}`],
                ["Area", `${farm.area} ${farm.areaUnit}`],
                ["Soil", farm.soilType],
                ["Irrigation", farm.irrigationMethod],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-[#f5f6f1] p-3">
                  <div className="text-[10px] font-bold uppercase tracking-[.12em] text-[#939b94]">{label}</div>
                  <div className="mt-1 text-sm font-bold text-[#3b4e40]">{value}</div>
                </div>
              ))}
            </div>
            <Link to="/journey" className="mt-4 flex items-center justify-between rounded-2xl bg-[#edf4e9] px-4 py-3 text-sm font-bold text-[#32503a]">
              View full crop journey <span>→</span>
            </Link>
            <Link to="/soil" className="mt-3 flex items-center justify-between rounded-2xl bg-[#e6f0fa] px-4 py-3 text-sm font-bold text-[#143e52]">
              Update soil test results <span>→</span>
            </Link>
          </Card>

          <PhotoUpload />
        </div>
      </div>
    </div>
  );
}

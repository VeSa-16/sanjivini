import { Link } from "react-router-dom";
import TodayPlanCard from "../components/today/TodayPlanCard";
import WeatherCard from "../components/today/WeatherCard";
import AlertCard from "../components/today/AlertCard";
import TaskChecklist from "../components/today/TaskChecklist";
import PlantCheckForm from "../components/plantCheck/PlantCheckForm";
import PhotoUpload from "../components/plantCheck/PhotoUpload";
import Card from "../components/ui/Card";
import { useTodayAdvice } from "../hooks/useTodayAdvice";

export default function TodayPage() {
  const { farm, crop, stage, progress, weather, advice } = useTodayAdvice();

  return (
    <div className="grid gap-4 xl:grid-cols-[1.28fr_.72fr]">
      <div className="space-y-4">
        <TodayPlanCard crop={crop} stage={stage} progress={progress} />
        <TaskChecklist advice={advice} />
        <AlertCard disease={advice.disease} />
        <PlantCheckForm />
      </div>

      <div className="space-y-4">
        <WeatherCard weather={weather} />

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
        </Card>

        <PhotoUpload />
      </div>
    </div>
  );
}

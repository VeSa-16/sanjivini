import Card from "../ui/Card";
import { Droplets, CloudRain, Wind, MapPin } from "lucide-react";

export default function WeatherCard({ weather, context, locationName }) {
  return (
    <Card className="overflow-hidden p-5 sm:p-6" interactive>
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-3">
             <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8a928a]">Today's weather</p>
             {locationName && (
               <p className="text-xs text-[#748078] flex items-center gap-1 font-semibold truncate max-w-[150px]">
                 <MapPin size={12} className="shrink-0" /> {locationName}
               </p>
             )}
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-serif text-4xl font-bold text-[#173f2c]">{weather.temperature}°</span>
            <span className="text-sm text-[#748078]">Feels {weather.feelsLike}°</span>
          </div>
          <p className="mt-1 text-sm font-semibold text-[#526158]">{weather.condition}</p>
        </div>
        <div className="text-5xl">{weather.icon}</div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        {[
          ["Humidity", `${weather.humidity}%`, <Droplets size={16} className="text-[#3b7c53]" />],
          ["Rain", `${weather.rainProbability}%`, <CloudRain size={16} className="text-[#3b7c53]" />],
          ["Wind", `${weather.wind} km/h`, <Wind size={16} className="text-[#3b7c53]" />],
        ].map(([label, value, icon]) => (
          <div key={label} className="rounded-2xl bg-[#f3f6f0] px-3 py-3">
            <div className="text-sm">{icon}</div>
            <div className="mt-2 text-sm font-bold text-[#173f2c]">{value}</div>
            <div className="mt-0.5 text-[11px] text-[#7c857d]">{label}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-2xl bg-[#edf5e9] p-4 text-sm leading-6">
        <div className="mb-2 border-b border-[#173f2c]/10 pb-2">
          <div className="text-xs font-bold uppercase tracking-[.12em] text-[#788079]">Crop impact</div>
          <div className="font-semibold text-[#173f2c]">{context?.impact || weather.tip}</div>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-[.12em] text-[#788079]">Action</div>
          <div className="font-semibold text-[#173f2c]">{context?.action || "No specific action required today."}</div>
        </div>
      </div>
    </Card>
  );
}

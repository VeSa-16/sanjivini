import Card from "../ui/Card";

export default function WeatherCard({ weather }) {
  return (
    <Card className="overflow-hidden p-5 sm:p-6" interactive>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8a928a]">Today's weather</p>
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
          ["Humidity", `${weather.humidity}%`, "💧"],
          ["Rain", `${weather.rainProbability}%`, "🌧️"],
          ["Wind", `${weather.wind} km/h`, "〰"],
        ].map(([label, value, icon]) => (
          <div key={label} className="rounded-2xl bg-[#f3f6f0] px-3 py-3">
            <div className="text-sm">{icon}</div>
            <div className="mt-2 text-sm font-bold text-[#173f2c]">{value}</div>
            <div className="mt-0.5 text-[11px] text-[#7c857d]">{label}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-2xl bg-[#edf5e9] px-4 py-3 text-sm leading-6 text-[#46604c]">
        <span className="mr-2">✦</span>{weather.tip}
      </div>
    </Card>
  );
}

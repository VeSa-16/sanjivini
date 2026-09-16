import { useLocation } from "react-router-dom";
import { useCropStage } from "../../hooks/useCropStage";

const pageTitles = {
  "/today": ["Today", "Your farm, simplified."],
  "/journey": ["Crop journey", "See where your crop is and what comes next."],
  "/weekly": ["Weekly report", "A calm view of the last seven days."],
  "/history": ["Farm history", "Everything you recorded, in one place."],
};

export default function Header() {
  const location = useLocation();
  const { farm, crop } = useCropStage();
  const [title, subtitle] = pageTitles[location.pathname] || ["Sanjivani", "From seed to harvest."];

  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 pb-5 pt-5 sm:px-6 lg:px-8">
      <div className="min-w-0">
        <div className="mb-2 flex items-center gap-2 lg:hidden">
          <div className="grid size-8 place-items-center rounded-xl bg-[#173f2c] text-sm text-white">S</div>
          <span className="font-serif text-lg font-bold text-[#173f2c]">Sanjivani</span>
        </div>
        <h1 className="font-serif text-3xl font-bold tracking-[-0.03em] text-[#173f2c] sm:text-4xl">{title}</h1>
        <p className="mt-1 max-w-xl text-sm text-[#687269] sm:text-base">{subtitle}</p>
      </div>

      <div className="hidden items-center gap-3 rounded-2xl border border-[#173f2c]/8 bg-white/80 px-3 py-2 shadow-sm sm:flex">
        <div className="grid size-10 place-items-center rounded-xl bg-[#edf5ec] text-xl">{crop.emoji}</div>
        <div className="min-w-0 pr-2">
          <p className="truncate text-sm font-bold text-[#173f2c]">{farm.farmName || "My Farm"}</p>
          <p className="truncate text-xs text-[#768078]">{crop.name} • {farm.area} {farm.areaUnit}</p>
        </div>
      </div>
    </header>
  );
}

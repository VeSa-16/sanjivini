import CropJourneyTimeline from "../components/journey/CropJourneyTimeline";
import StageCorrection from "../components/journey/StageCorrection";
import { useCropStage } from "../hooks/useCropStage";

export default function JourneyPage() {
  const { farm, crop, stage } = useCropStage();
  return (
    <div className="grid gap-4 xl:grid-cols-[1.2fr_.8fr]">
      <CropJourneyTimeline crop={crop} currentStage={stage} />
      <div className="space-y-4">
        <StageCorrection farm={farm} crop={crop} stage={stage} />
        <div className="rounded-[28px] bg-[#e8efe1] p-6">
          <div className="text-3xl">🌾</div>
          <h3 className="mt-3 font-serif text-2xl font-bold text-[#173f2c]">A calendar is only the starting point.</h3>
          <p className="mt-2 text-sm leading-6 text-[#607063]">Weather, variety and field conditions can move a crop forward or backward. Sanjivani lets the farmer's observation correct the journey.</p>
        </div>
      </div>
    </div>
  );
}

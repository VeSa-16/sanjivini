import Card from "../ui/Card";

export default function EndOfCropSummary({ crop, logs }) {
  return (
    <Card className="p-5 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8a928a]">Crop archive</p>
      <h3 className="mt-1 font-serif text-2xl font-bold text-[#173f2c]">Your {crop.name} story</h3>
      <p className="mt-2 text-sm leading-6 text-[#748078]">
        When harvest is complete, this becomes the crop's end-of-season summary. Right now, {logs.length} farm records are saved.
      </p>
    </Card>
  );
}

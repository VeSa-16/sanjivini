import Card from "../ui/Card";
import Button from "../ui/Button";
import { saveFarm } from "../../store/farmStore";
import { useState } from "react";

export default function StageCorrection({ farm, crop, stage }) {
  const [open, setOpen] = useState(false);

  function choose(id) {
    saveFarm({ ...farm, stageOverride: id });
    setOpen(false);
  }

  function clear() {
    saveFarm({ ...farm, stageOverride: "" });
    setOpen(false);
  }

  return (
    <Card className="p-5 sm:p-6">
      <div className="flex items-start gap-4">
        <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#eef3e9] text-xl">✋</div>
        <div className="flex-1">
          <h3 className="font-serif text-xl font-bold text-[#173f2c]">Does the field look different?</h3>
          <p className="mt-1 text-sm leading-6 text-[#748078]">
            Calendar says <b>{stage.name}</b>. If your crop is ahead or behind, correct it using what you see in the field.
          </p>
          <Button variant="outline" className="mt-4" onClick={() => setOpen(!open)}>
            {open ? "Close" : "Correct crop stage"}
          </Button>

          {open && (
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {crop.stages.map((s) => (
                <button
                  key={s.id}
                  onClick={() => choose(s.id)}
                  className={`flex items-center gap-3 rounded-2xl border p-3 text-left text-sm transition hover:bg-[#f3f7f0] ${
                    farm.stageOverride === s.id ? "border-[#173f2c] bg-[#edf4e9]" : "border-[#173f2c]/8 bg-white"
                  }`}
                >
                  <span className="text-xl">{s.emoji}</span>
                  <span className="font-semibold text-[#405147]">{s.name}</span>
                </button>
              ))}
              {farm.stageOverride && (
                <button onClick={clear} className="rounded-2xl border border-dashed border-[#b47b68] p-3 text-left text-sm font-bold text-[#9b4f38]">
                  Use calendar stage again
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

import { useState } from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { addLog } from "../../store/logStore";

const questions = [
  { id: "yellowLeaves", label: "Are leaves turning yellow?", options: ["No", "A few", "Many"] },
  { id: "holes", label: "Do you see holes or chewing damage?", options: ["No", "Yes"] },
  { id: "flowerDrop", label: "Are flowers dropping more than usual?", options: ["No", "Yes"] },
  { id: "insects", label: "Can you see insects on leaves or shoots?", options: ["No", "Yes"] },
  { id: "fruitNormal", label: "Are visible fruits developing normally?", options: ["Yes", "No", "Not sure"] },
];

export default function PlantCheckForm() {
  const [answers, setAnswers] = useState({});
  const [saved, setSaved] = useState(false);

  function submit() {
    addLog({
      type: "plant-check",
      label: "Plant check completed",
      answers,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <Card className="p-5 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8a928a]">Field observation</p>
      <h3 className="mt-1 font-serif text-2xl font-bold text-[#173f2c]">5-minute plant check</h3>
      <p className="mt-2 text-sm leading-6 text-[#748078]">You do not need to diagnose anything. Simply record what you can see.</p>

      <div className="mt-5 space-y-4">
        {questions.map((q, idx) => (
          <div key={q.id} className="rounded-[22px] bg-[#f7f7f2] p-4">
            <div className="flex items-start gap-3">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white text-xs font-bold text-[#5d6d61] shadow-sm">{idx + 1}</span>
              <div className="flex-1">
                <p className="text-sm font-bold text-[#304639]">{q.label}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {q.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => setAnswers((a) => ({ ...a, [q.id]: option }))}
                      className={`rounded-xl px-3 py-2 text-xs font-bold transition ${
                        answers[q.id] === option
                          ? "bg-[#173f2c] text-white"
                          : "bg-white text-[#687269] shadow-sm hover:bg-[#edf4e9]"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button className="mt-5 w-full sm:w-auto" onClick={submit} disabled={Object.keys(answers).length === 0}>
        {saved ? "✓ Saved to farm history" : "Save plant check"}
      </Button>
    </Card>
  );
}

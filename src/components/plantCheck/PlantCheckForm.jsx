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
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [saved, setSaved] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const q = questions[step];

  function handleAnswer(option) {
    setAnswers((a) => ({ ...a, [q.id]: option }));
    setTimeout(() => {
      setStep(step + 1);
    }, 300);
  }

  function simulateVoice() {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      handleAnswer(q.options[q.options.length - 1]);
    }, 2000);
  }

  function submit() {
    addLog({
      type: "plant-check",
      label: "Plant check completed",
      answers,
    });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setStep(0);
      setAnswers({});
    }, 2500);
  }

  if (saved) {
    return (
      <Card className="p-8 text-center bg-[#f4f7f4] border border-[#a9c9ad]">
        <div className="text-4xl">🌿</div>
        <h3 className="mt-4 font-serif text-xl font-bold text-[#173f2c]">Looking good!</h3>
        <p className="mt-2 text-sm text-[#526158]">Tomato leaves should be deep green right now. We'll keep an eye on this.</p>
      </Card>
    );
  }

  if (step >= questions.length) {
    return (
      <Card className="p-5 sm:p-6 text-center">
        <h3 className="font-serif text-2xl font-bold text-farm-text">Check complete!</h3>
        <p className="mt-2 text-sm text-farm-muted">You've answered all questions.</p>
        <div className="mt-6 flex gap-3 justify-center">
          <button onClick={() => setStep(0)} className="rounded-xl px-5 py-3 font-bold bg-farm-base text-farm-muted hover:bg-[#e4e7e2]">Review</button>
          <Button onClick={submit}>Save to history</Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-5 sm:p-6">
      <div className="flex justify-between items-center">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-farm-muted">Field observation</p>
        <p className="text-xs font-bold text-farm-muted">Step {step + 1} of {questions.length}</p>
      </div>
      
      <div className="mt-6 text-center min-h-[160px] flex flex-col justify-center">
        <h3 className="font-serif text-2xl font-bold text-farm-text mb-6">{q.label}</h3>
        
        <div className="flex flex-wrap justify-center gap-3">
          {q.options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className={`rounded-2xl px-6 py-4 text-sm font-bold transition shadow-sm ${
                answers[q.id] === option
                  ? "bg-farm-text text-white"
                  : "bg-farm-base text-farm-text hover:bg-[#e4e7e2]"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-6 flex justify-center border-t border-farm-text/10 pt-4">
        <button 
          onClick={simulateVoice}
          disabled={isListening}
          className={`flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition shadow-sm ${isListening ? "bg-red-100 text-red-600 animate-pulse" : "bg-white text-farm-text border border-farm-text/20"}`}
        >
          <span className="text-xl">🎙️</span> {isListening ? "Listening..." : "Tap to answer by voice"}
        </button>
      </div>
      
      {step > 0 && (
        <button onClick={() => setStep(step - 1)} className="mt-4 text-xs font-bold text-farm-muted block w-full text-center">
          ← Back
        </button>
      )}
    </Card>
  );
}

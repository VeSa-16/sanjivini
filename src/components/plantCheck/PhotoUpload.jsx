import { useRef, useState } from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import { addLog } from "../../store/logStore";
import { analyzeCropImage } from "../../lib/gemini";
import { useTodayAdvice } from "../../hooks/useTodayAdvice";
import { Loader2 } from "lucide-react";

export default function PhotoUpload() {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState("");
  const [base64, setBase64] = useState("");
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { crop, stage } = useTodayAdvice();

  function selectFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreview(url);
    setResult(null);

    // Convert to base64 for Gemini
    const reader = new FileReader();
    reader.onloadend = () => {
      const b64 = reader.result.split(',')[1];
      setBase64(b64);
    };
    reader.readAsDataURL(file);
  }

  async function analyze() {
    if (!base64) return;
    setIsAnalyzing(true);
    try {
      const diagnosis = await analyzeCropImage(base64, crop.name, stage.name);
      setResult(diagnosis);
      
      // Log the diagnosis in history
      addLog({ type: "photo", label: "AI Diagnosis", result: diagnosis.diseaseName });
      
      // Generate follow-up task if there is a disease
      if (diagnosis.diseaseName !== "Healthy" && diagnosis.immediateAction) {
        // Find existing tasks in logs so we don't break the log shape
        const taskObj = { 
          id: `ai-treatment-${Date.now()}`,
          type: "task",
          taskId: "treatment", 
          label: `Treat ${diagnosis.diseaseName}`, 
          result: diagnosis.immediateAction,
          status: "todo",
          timestamp: new Date().toISOString()
        };
        addLog(taskObj);
      }
    } catch (e) {
      console.error(e);
      alert("Failed to analyze image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  }

  return (
    <Card className="overflow-hidden p-5 sm:p-6 bg-white">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8a928a]">AI Image Diagnosis</p>
      <h3 className="mt-1 font-serif text-2xl font-bold text-[#173f2c]">Something looks unusual?</h3>
      <p className="mt-2 text-sm leading-6 text-[#748078]">Add a clear photo of the affected leaf or plant. Gemini 2.5 Flash will analyze the image and generate an instant treatment plan.</p>

      <input ref={inputRef} onChange={selectFile} type="file" accept="image/*" className="hidden" />

      {!preview ? (
        <button
          onClick={() => inputRef.current?.click()}
          className="mt-5 flex min-h-44 w-full flex-col items-center justify-center rounded-[24px] border-2 border-dashed border-[#b8c8b9] bg-[#f5f8f2] p-6 text-center transition hover:bg-[#edf5e9]"
        >
          <span className="grid size-14 place-items-center rounded-2xl bg-white text-2xl shadow-sm">📷</span>
          <span className="mt-3 text-sm font-bold text-[#34513e]">Add crop photo</span>
          <span className="mt-1 text-xs text-[#7d887f]">Leaf • Stem • Flower • Fruit</span>
        </button>
      ) : (
        <div className="mt-5">
          <div className="relative overflow-hidden rounded-[24px] bg-[#eef2eb]">
            <img src={preview} alt="Uploaded crop" className="h-56 w-full object-cover" />
            <button onClick={() => {setPreview(""); setResult(null); setBase64("")}} className="absolute right-3 top-3 rounded-xl bg-black/55 px-3 py-2 text-xs font-bold text-white backdrop-blur">Change</button>
          </div>
          {!result && (
            <Button 
              className="mt-3 w-full bg-[#173f2c] flex items-center justify-center gap-2" 
              onClick={analyze} 
              disabled={isAnalyzing || !base64}
            >
              {isAnalyzing ? (
                <><Loader2 className="animate-spin" size={18} /> Analyzing...</>
              ) : (
                "Diagnose with Gemini"
              )}
            </Button>
          )}
        </div>
      )}

      {result && (
        <div className="mt-4 rounded-[22px] bg-[#fffbf7] p-5 border border-[#f5e6d3] shadow-sm">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={result.diseaseName === "Healthy" ? "green" : "amber"}>
              {result.diseaseName === "Healthy" ? "Plant looks healthy" : "Issue detected"}
            </Badge>
            {result.confidence && <span className="text-xs font-bold text-[#9b7540]">{result.confidence} Confidence</span>}
          </div>
          <h4 className="mt-4 font-serif text-xl font-bold text-[#b44b37]">{result.diseaseName}</h4>
          <p className="mt-2 text-sm leading-6 text-[#7e6a50]">{result.cause}</p>
          <div className="mt-4 pt-4 border-t border-[#f5e6d3]">
            <p className="text-xs font-bold uppercase tracking-[.12em] text-[#b44b37]">Recommended Action</p>
            <p className="mt-1 text-sm font-bold text-[#173f2c]">{result.immediateAction}</p>
          </div>
          {result.diseaseName !== "Healthy" && (
            <div className="mt-3 text-xs font-semibold text-[#3b7c53] bg-[#edf4e9] p-2 rounded-lg text-center">
              A treatment task has been added to your log.
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

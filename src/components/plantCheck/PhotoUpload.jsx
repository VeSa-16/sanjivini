import { useRef, useState } from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import { addLog } from "../../store/logStore";

export default function PhotoUpload() {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState(null);

  function selectFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    setResult(null);
  }

  function analyze() {
    const mock = {
      title: "Possible Early Blight",
      confidence: "Demo result",
      note: "Photo analyzed. The spots on your leaves look like early blight. This is common with recent humidity.",
      action: "Apply Copper Fungicide before tomorrow evening."
    };
    setResult(mock);
    addLog({ type: "photo", label: "Plant photo checked", result: mock.title });
  }

  return (
    <Card className="overflow-hidden p-5 sm:p-6 bg-white">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8a928a]">Plant photo</p>
      <h3 className="mt-1 font-serif text-2xl font-bold text-[#173f2c]">Something looks unusual?</h3>
      <p className="mt-2 text-sm leading-6 text-[#748078]">Add a clear photo of the affected leaf, flower, stem or fruit. This prototype returns a safe mock assessment.</p>

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
            <button onClick={() => {setPreview(""); setResult(null)}} className="absolute right-3 top-3 rounded-xl bg-black/55 px-3 py-2 text-xs font-bold text-white backdrop-blur">Change</button>
          </div>
          {!result && <Button className="mt-3 w-full bg-[#173f2c]" onClick={analyze}>Check this photo</Button>}
        </div>
      )}

      {result && (
        <div className="mt-4 rounded-[22px] bg-[#fffbf7] p-4 border border-[#f5e6d3]">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="amber">Possible issue detected</Badge>
            <span className="text-xs font-bold text-[#9b7540]">Not a confirmed diagnosis</span>
          </div>
          <h4 className="mt-3 font-bold text-[#b44b37]">{result.title}</h4>
          <p className="mt-1 text-sm leading-6 text-[#7e6a50]">{result.note}</p>
          <div className="mt-3 pt-3 border-t border-[#f5e6d3]">
            <p className="text-xs font-bold uppercase tracking-[.12em] text-[#b44b37]">Action</p>
            <p className="mt-1 text-sm font-bold text-[#173f2c]">{result.action}</p>
          </div>
        </div>
      )}
    </Card>
  );
}

import { useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import { Link } from "react-router-dom";

export default function SoilInfoPage() {
  const [submitted, setSubmitted] = useState(false);
  
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <Link to="/today" className="text-sm font-bold text-farm-text">← Back to Today</Link>
      
      {!submitted ? (
        <Card className="p-5 sm:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-farm-muted">Farm profile</p>
          <h2 className="mt-1 font-serif text-2xl font-bold text-farm-text">Soil Test Results</h2>
          <p className="mt-2 text-sm leading-6 text-[#748078]">Enter the values from your latest soil test report to get tailored fertilizer advice.</p>
          
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-bold text-farm-text mb-1">pH Level</label>
              <input type="number" step="0.1" defaultValue="7.2" className="w-full rounded-xl border border-farm-muted/20 bg-farm-base p-3 text-farm-text focus:outline-none focus:ring-2 focus:ring-farm-text/20" />
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-bold text-farm-text mb-1">Nitrogen (N)</label>
                <input type="text" defaultValue="Low" className="w-full rounded-xl border border-farm-muted/20 bg-farm-base p-3 text-farm-text focus:outline-none focus:ring-2 focus:ring-farm-text/20" />
              </div>
              <div>
                <label className="block text-sm font-bold text-farm-text mb-1">Phosphorus (P)</label>
                <input type="text" defaultValue="Medium" className="w-full rounded-xl border border-farm-muted/20 bg-farm-base p-3 text-farm-text focus:outline-none focus:ring-2 focus:ring-farm-text/20" />
              </div>
              <div>
                <label className="block text-sm font-bold text-farm-text mb-1">Potassium (K)</label>
                <input type="text" defaultValue="High" className="w-full rounded-xl border border-farm-muted/20 bg-farm-base p-3 text-farm-text focus:outline-none focus:ring-2 focus:ring-farm-text/20" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-farm-text mb-1">Organic Carbon (%)</label>
              <input type="number" step="0.1" defaultValue="0.4" className="w-full rounded-xl border border-farm-muted/20 bg-farm-base p-3 text-farm-text focus:outline-none focus:ring-2 focus:ring-farm-text/20" />
            </div>
          </div>
          
          <Button className="mt-6 w-full" onClick={() => setSubmitted(true)}>Analyze Results</Button>
        </Card>
      ) : (
        <div className="space-y-4">
          <Card className="p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="grid size-12 shrink-0 place-items-center rounded-2xl text-xl bg-urgency-yellow-bg text-urgency-yellow-text">
                ⚠
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-serif text-xl font-bold text-farm-text">Soil analysis</h3>
                  <Badge tone="amber">Action needed</Badge>
                </div>
                <p className="mt-2 text-base font-bold text-farm-text">Low Nitrogen & Carbon</p>
                <p className="mt-1 text-sm leading-6 text-farm-muted">Your soil pH is slightly alkaline (7.2), which is fine for tomatoes. However, nitrogen and organic carbon are critically low.</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-xl bg-farm-base px-3 py-2 text-xs font-medium text-farm-muted">Apply Urea: +20%</span>
                  <span className="rounded-xl bg-farm-base px-3 py-2 text-xs font-medium text-farm-muted">Add FYM: 2 tons/acre</span>
                </div>
              </div>
            </div>
          </Card>
          <Button variant="secondary" className="w-full" onClick={() => setSubmitted(false)}>Update test results</Button>
        </div>
      )}
    </div>
  );
}

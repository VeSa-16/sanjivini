import { CloudSunRain, Sprout, Bug, Droplets, LineChart, IndianRupee } from "lucide-react";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#f8f7f2] pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-5xl font-bold tracking-tight text-[#173f2c] sm:text-6xl text-center">
          Features
        </h1>
        <p className="mt-6 text-center text-xl text-[#59645d] max-w-2xl mx-auto">
          Everything you need to manage your farm efficiently, in one place.
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#e2e7df]">
            <div className="mb-4 text-[#3b7c53]"><CloudSunRain size={40} strokeWidth={1.5} /></div>
            <h3 className="text-xl font-bold text-[#173f2c]">Hyper-Local Weather</h3>
            <p className="mt-2 text-[#59645d]">
              Live weather forecasts down to your exact GPS coordinates, completely replacing generic regional forecasts.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#e2e7df]">
            <div className="mb-4 text-[#3b7c53]"><Sprout size={40} strokeWidth={1.5} /></div>
            <h3 className="text-xl font-bold text-[#173f2c]">Biological Crop Staging</h3>
            <p className="mt-2 text-[#59645d]">
              Tracks exactly how old your crop is and what biological phase it is in (Germination, Vegetative, Flowering, Harvest).
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#e2e7df]">
            <div className="mb-4 text-[#3b7c53]"><Bug size={40} strokeWidth={1.5} /></div>
            <h3 className="text-xl font-bold text-[#173f2c]">Disease Risk Alerts</h3>
            <p className="mt-2 text-[#59645d]">
              Uses humidity and temperature cross-referenced with your crop type to warn you about impending fungal or pest attacks.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#e2e7df]">
            <div className="mb-4 text-[#3b7c53]"><Droplets size={40} strokeWidth={1.5} /></div>
            <h3 className="text-xl font-bold text-[#173f2c]">Smart Irrigation</h3>
            <p className="mt-2 text-[#59645d]">
              Cross-references your soil type, crop stage, and incoming rainfall to advise you exactly when—and when not—to water.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#e2e7df]">
            <div className="mb-4 text-[#3b7c53]"><LineChart size={40} strokeWidth={1.5} /></div>
            <h3 className="text-xl font-bold text-[#173f2c]">Weekly Health Reports</h3>
            <p className="mt-2 text-[#59645d]">
              Aggregates all your logged activities into a calm, readable weekly summary of your farm's health.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#e2e7df]">
            <div className="mb-4 text-[#3b7c53]"><IndianRupee size={40} strokeWidth={1.5} /></div>
            <h3 className="text-xl font-bold text-[#173f2c]">Market Insights</h3>
            <p className="mt-2 text-[#59645d]">
              Displays live Mandi prices for your crop in your local area, so you know exactly when to harvest and sell.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

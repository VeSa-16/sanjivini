import { Link } from "react-router-dom";
import { Sprout } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="h-screen bg-[url('/landing-bg.png')] bg-cover bg-center font-sans overflow-hidden flex flex-col">

      <main className="relative mx-auto flex h-full w-full max-w-[90rem] flex-col items-center justify-center px-4 pt-24 pb-8 lg:flex-row lg:px-12 lg:pt-20 lg:justify-start">
        
        {/* LEFT: EDITORIAL COPY */}
        <div className="z-10 w-full max-w-2xl flex-1 lg:pr-12 xl:pr-24 lg:pt-12">
          <h1 className="font-serif text-4xl leading-[1.05] tracking-[-0.03em] text-[#173f2c] sm:text-5xl lg:text-6xl">
            Your Crop Has a Story.<br />
            <span className="text-[#3b7c53]">Sanjivani Helps You</span><br />
            Read It Every Day.
          </h1>
          
          <h2 className="mt-6 text-lg font-bold tracking-tight text-[#2b4c39] sm:text-xl">
            Local Weather. Crop Intelligence. Better Decisions.
          </h2>
          
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#59645d]">
            Get personalized weather updates and crop-specific recommendations based on your field, your crop and its growth stage — so you can farm smarter, not harder.
          </p>
          
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link to="/onboarding" className="flex items-center justify-center gap-2 rounded-2xl bg-[#173f2c] px-6 py-4 text-base font-bold text-white shadow-xl shadow-[#173f2c]/20 transition-all hover:-translate-y-1 hover:bg-[#0e271a] hover:shadow-2xl hover:shadow-[#173f2c]/30">
              <Sprout size={20} /> Start Your Crop Journey →
            </Link>
            <Link to="/onboarding" className="flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-base font-bold text-[#173f2c] shadow-sm border border-[#e2e7df] transition-all hover:bg-gray-50">
              <span className="text-[10px]">▶</span> See How It Works
            </Link>
          </div>
          
          <div className="mt-4 sm:mt-6 flex items-center gap-3 border-t border-[#e2e7df] pt-3 sm:pt-4">
            <div className="text-3xl text-[#3b7c53]/20 font-serif">“</div>
            <p className="font-serif text-base sm:text-lg italic text-[#4a5d52]">
              Healthy crops. Better cycles. A brighter future.
            </p>
          </div>
        </div>

      </main>
    </div>
  );
}

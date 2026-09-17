export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#f8f7f2] pt-32 pb-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-5xl font-bold tracking-tight text-[#173f2c] sm:text-6xl text-center">
          How Sanjivani Works
        </h1>
        <p className="mt-6 text-center text-xl text-[#59645d] max-w-2xl mx-auto">
          Four simple steps to transform the way you interact with your field.
        </p>

        <div className="mt-20 grid gap-12 lg:grid-cols-2">
          
          <div className="flex gap-6">
            <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-[#e8f0e6] text-[#173f2c] font-serif text-3xl font-bold">1</div>
            <div>
              <h3 className="text-2xl font-bold text-[#2b4c39]">Profile Your Farm</h3>
              <p className="mt-3 text-[#59645d] leading-relaxed">
                Tell us what you grow, how much area you have, and your soil type. Sanjivani creates a biological timeline customized specifically for your crop.
              </p>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-[#e8f0e6] text-[#173f2c] font-serif text-3xl font-bold">2</div>
            <div>
              <h3 className="text-2xl font-bold text-[#2b4c39]">Sync Local Weather</h3>
              <p className="mt-3 text-[#59645d] leading-relaxed">
                Using GPS, we pull hyper-local, real-time meteorological data for your exact coordinates. No more relying on weather stations 50 kilometers away.
              </p>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-[#e8f0e6] text-[#173f2c] font-serif text-3xl font-bold">3</div>
            <div>
              <h3 className="text-2xl font-bold text-[#2b4c39]">Receive Daily Intelligence</h3>
              <p className="mt-3 text-[#59645d] leading-relaxed">
                Every morning, open the app to see exactly what needs to be done. We calculate if it's too windy to spray, too hot to plant, or if rain means you should skip irrigation.
              </p>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-[#173f2c] text-white font-serif text-3xl font-bold">4</div>
            <div>
              <h3 className="text-2xl font-bold text-[#2b4c39]">Log and Learn</h3>
              <p className="mt-3 text-[#59645d] leading-relaxed">
                Check off tasks as you do them. Over time, Sanjivani builds a historical record of your farm, generating Weekly Reports and preparing you for a perfect harvest.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

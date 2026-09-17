export default function ImpactPage() {
  return (
    <div className="min-h-screen bg-[#f8f7f2] pt-32 pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-5xl font-bold tracking-tight text-[#173f2c] sm:text-6xl text-center">
          Our Impact
        </h1>
        <p className="mt-6 text-center text-xl text-[#59645d] max-w-2xl mx-auto">
          We measure our success by the success of our farmers.
        </p>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8">
          
          <div className="text-center">
            <div className="text-5xl font-serif font-bold text-[#3b7c53]">20%</div>
            <div className="mt-2 text-lg font-bold text-[#173f2c]">Less Water Used</div>
            <p className="mt-2 text-sm text-[#59645d]">By withholding irrigation before expected rainfall.</p>
          </div>

          <div className="text-center">
            <div className="text-5xl font-serif font-bold text-[#3b7c53]">15%</div>
            <div className="mt-2 text-lg font-bold text-[#173f2c]">Yield Increase</div>
            <p className="mt-2 text-sm text-[#59645d]">Through optimal timing of fertilizers and sprays.</p>
          </div>

          <div className="text-center">
            <div className="text-5xl font-serif font-bold text-[#3b7c53]">3x</div>
            <div className="mt-2 text-lg font-bold text-[#173f2c]">Faster Response</div>
            <p className="mt-2 text-sm text-[#59645d]">To emerging disease threats and pest attacks.</p>
          </div>

        </div>

        <div className="mt-24 bg-[#173f2c] rounded-[3rem] p-12 text-center text-white shadow-2xl">
          <h2 className="font-serif text-4xl font-bold">Ready to write a better story?</h2>
          <p className="mt-4 text-lg text-[#a8b8ae] max-w-xl mx-auto">
            Join the farmers using Sanjivani to modernize their agricultural cycles and secure their livelihoods.
          </p>
          <div className="mt-10">
            <a href="/onboarding" className="inline-block rounded-full bg-white px-8 py-4 text-lg font-bold text-[#173f2c] shadow-lg transition-transform hover:scale-105 active:scale-95">
              Start Your Crop Journey
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WhySanjivaniPage() {
  return (
    <div className="min-h-screen bg-[#f8f7f2] pt-32 pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-5xl font-bold tracking-tight text-[#173f2c] sm:text-6xl text-center">
          Why Sanjivani?
        </h1>
        <p className="mt-6 text-center text-xl text-[#59645d] max-w-2xl mx-auto">
          Farming has always been unpredictable. But with the right companion, the unpredictability becomes manageable.
        </p>

        <div className="mt-16 space-y-16">
          <section className="bg-white p-8 sm:p-12 rounded-[2rem] shadow-sm border border-[#e2e7df]">
            <h2 className="font-serif text-3xl font-bold text-[#2b4c39]">The Problem with "Rules of Thumb"</h2>
            <p className="mt-4 text-lg leading-relaxed text-[#59645d]">
              For generations, farming decisions have been based on instinct and inherited schedules. Water every Tuesday. Spray after the first rain. But the climate is changing, seasons are shifting, and traditional schedules are breaking down. A single mistimed spray can cost a season's profit.
            </p>
          </section>

          <section className="bg-[#173f2c] p-8 sm:p-12 rounded-[2rem] shadow-xl text-white">
            <h2 className="font-serif text-3xl font-bold text-[#e8f0e6]">Our Philosophy: The Digital Companion</h2>
            <p className="mt-4 text-lg leading-relaxed text-[#a8b8ae]">
              Sanjivani isn't just a dashboard. It's designed to live beside you in the field. It takes hyper-local weather data, combines it with the specific biological growth stage of your crop, and tells you exactly what needs to be done *today*. It translates complex data into simple, actionable farming wisdom.
            </p>
          </section>

          <section className="bg-white p-8 sm:p-12 rounded-[2rem] shadow-sm border border-[#e2e7df]">
            <h2 className="font-serif text-3xl font-bold text-[#2b4c39]">Built for the Indian Farmer</h2>
            <p className="mt-4 text-lg leading-relaxed text-[#59645d]">
              No confusing charts. No unnecessary technical jargon. Just clear, urgent alerts when diseases threaten, calm reassurance when conditions are optimal, and a deep understanding of the economics of local Mandi prices and government subsidies.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

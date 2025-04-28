export function RoastProcess() {
  return (
    <section className="py-20 bg-[#121212]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-16">The ROAST Process</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="relative">
            <div className="absolute -left-4 -top-4 flex items-center justify-center w-12 h-12 rounded-full bg-[#a78bfa] text-white font-bold">
              1
            </div>
            <div className="bg-[#1a1a1a] p-8 pt-10 rounded-lg h-full">
              <h3 className="text-xl font-bold mb-4">Submit Your URL</h3>
              <p className="text-gray-400">
                Enter your Web3 project URL and choose between our free AI analysis or expert video roast.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative">
            <div className="absolute -left-4 -top-4 flex items-center justify-center w-12 h-12 rounded-full bg-[#a78bfa] text-white font-bold">
              2
            </div>
            <div className="bg-[#1a1a1a] p-8 pt-10 rounded-lg h-full">
              <h3 className="text-xl font-bold mb-4">We Capture & Analyze</h3>
              <p className="text-gray-400">
                Our system takes a full-page screenshot and runs it through our specialized Web3 analysis engine.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative">
            <div className="absolute -left-4 -top-4 flex items-center justify-center w-12 h-12 rounded-full bg-[#a78bfa] text-white font-bold">
              3
            </div>
            <div className="bg-[#1a1a1a] p-8 pt-10 rounded-lg h-full">
              <h3 className="text-xl font-bold mb-4">Receive Honest Feedback</h3>
              <p className="text-gray-400">
                Get a brutally honest but constructive analysis of your landing page's strengths and weaknesses.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="relative">
            <div className="absolute -left-4 -top-4 flex items-center justify-center w-12 h-12 rounded-full bg-[#a78bfa] text-white font-bold">
              4
            </div>
            <div className="bg-[#1a1a1a] p-8 pt-10 rounded-lg h-full">
              <h3 className="text-xl font-bold mb-4">Implement & Convert</h3>
              <p className="text-gray-400">
                Follow our actionable recommendations to dramatically improve your conversion rates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

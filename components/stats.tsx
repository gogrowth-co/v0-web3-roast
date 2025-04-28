export function Stats() {
  return (
    <section className="py-20 bg-[#121212]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">Real Results for Web3 Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-[#1a1a1a] p-8 rounded-lg text-center">
            <div className="text-5xl font-bold text-[#a78bfa] mb-2">94%</div>
            <div className="text-gray-400">Conversion Rate Increase</div>
          </div>

          <div className="bg-[#1a1a1a] p-8 rounded-lg text-center">
            <div className="text-5xl font-bold text-[#a78bfa] mb-2">500+</div>
            <div className="text-gray-400">Projects Analyzed</div>
          </div>

          <div className="bg-[#1a1a1a] p-8 rounded-lg text-center">
            <div className="text-5xl font-bold text-[#a78bfa] mb-2">78%</div>
            <div className="text-gray-400">UI/UX Improvement</div>
          </div>

          <div className="bg-[#1a1a1a] p-8 rounded-lg text-center">
            <div className="text-5xl font-bold text-[#a78bfa] mb-2">48h</div>
            <div className="text-gray-400">Expert Delivery Time</div>
          </div>
        </div>
      </div>
    </section>
  )
}

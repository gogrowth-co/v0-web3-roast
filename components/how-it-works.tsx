import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-[#121212]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">
          How It <span className="text-[#a78bfa]">Works</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Instant AI Audit */}
          <div className="bg-[#1a1a1a] p-8 rounded-lg">
            <div className="flex items-center mb-4">
              <div className="text-[#a78bfa] text-2xl font-bold">Instant AI Audit</div>
              <div className="ml-auto">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="6" width="4" height="12" rx="1" fill="#a78bfa" />
                  <rect x="10" y="3" width="4" height="18" rx="1" fill="#a78bfa" />
                  <rect x="18" y="9" width="4" height="6" rx="1" fill="#a78bfa" />
                </svg>
              </div>
            </div>
            <p className="text-gray-400 mb-6">Quick automated analysis of your Web3 landing page</p>
            <div className="text-3xl font-bold mb-6">FREE</div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <Check className="h-5 w-5 text-[#a78bfa] mr-3 mt-0.5" />
                <span>Immediate AI analysis</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-[#a78bfa] mr-3 mt-0.5" />
                <span>Full page screenshot</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-[#a78bfa] mr-3 mt-0.5" />
                <span>Web3-specific UX recommendations</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-[#a78bfa] mr-3 mt-0.5" />
                <span>Technical assessment</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-[#a78bfa] mr-3 mt-0.5" />
                <span>Instant delivery</span>
              </div>
            </div>

            <Button className="w-full bg-[#a78bfa] hover:bg-[#9b79fa] text-white">Start Free Analysis</Button>
          </div>

          {/* Expert Video Roast */}
          <div className="bg-[#1a1a1a] p-8 rounded-lg border border-[#f97316]/30">
            <div className="flex items-center mb-4">
              <div className="text-[#f97316] text-2xl font-bold">Expert Video Roast</div>
              <div className="ml-auto text-[#f97316]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M14 3V7C14 7.55228 14.4477 8 15 8H19"
                    stroke="#f97316"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H14L19 8V19C19 20.1046 18.1046 21 17 21Z"
                    stroke="#f97316"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <p className="text-gray-400 mb-6">In-depth analysis from Web3 conversion experts</p>
            <div className="text-3xl font-bold mb-6">$299</div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <Check className="h-5 w-5 text-[#f97316] mr-3 mt-0.5" />
                <span>20-minute detailed video breakdown</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-[#f97316] mr-3 mt-0.5" />
                <span>Web3 expert analysis</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-[#f97316] mr-3 mt-0.5" />
                <span>Includes AI audit</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-[#f97316] mr-3 mt-0.5" />
                <span>48-hour delivery</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-[#f97316] mr-3 mt-0.5" />
                <span>Written recommendations</span>
              </div>
            </div>

            <Button className="w-full bg-[#f97316] hover:bg-[#f97316]/90 text-white">Get Expert Analysis</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

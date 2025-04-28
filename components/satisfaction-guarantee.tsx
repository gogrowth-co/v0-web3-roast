import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export function SatisfactionGuarantee() {
  return (
    <section className="py-20 bg-[#121212]">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-[#1a1333] to-[#2a1a4a] rounded-xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
              <div className="bg-[#f97316] bg-opacity-20 p-4 rounded-full">
                <AlertTriangle className="h-12 w-12 text-[#f97316]" />
              </div>
            </div>
            <div className="flex-grow">
              <h2 className="text-3xl font-bold mb-4">100% Satisfaction Guarantee</h2>
              <p className="text-gray-300 mb-6">
                If you don't find our expert video roast valuable, we'll refund your payment in full. No questions
                asked. We're that confident our analysis will provide actionable insights to improve your Web3 project's
                conversion rate.
              </p>
              <Button className="bg-[#f97316] hover:bg-[#f97316]/90 text-white">Get Your Expert Roast Now</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { UrlForm } from "@/components/url-form"
import { FAQ } from "@/components/faq"
import { Testimonials } from "@/components/testimonials"
import { Stats } from "@/components/stats"
import { HowItWorks } from "@/components/how-it-works"
import { RoastProcess } from "@/components/roast-process"
import { SatisfactionGuarantee } from "@/components/satisfaction-guarantee"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1333] to-[#121212] text-white">
      {/* Header */}
      <header className="container mx-auto flex items-center justify-between py-6 px-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">
            <span className="text-[#a78bfa]">WEB3</span> <span className="text-[#f97316]">ROAST</span>{" "}
            <span className="ml-1 rounded-md bg-[#f97316] px-2 py-0.5 text-xs font-medium text-white">BETA</span>
          </h1>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link href="#how-it-works" className="text-white hover:text-gray-300">
            How it Works
          </Link>
          <Link href="#pricing" className="text-white hover:text-gray-300">
            Pricing
          </Link>
          <Link href="#faq" className="text-white hover:text-gray-300">
            FAQ
          </Link>
        </nav>

        <Link
          href="/dashboard"
          className="rounded-full bg-[#a78bfa] px-6 py-2 font-medium text-white hover:bg-[#9b79fa]"
        >
          Dashboard
        </Link>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 pt-16 pb-24 text-center">
        {/* Promo Banner */}
        <div className="mx-auto mb-12 max-w-xl">
          <div className="rounded-full border border-[#a78bfa]/30 bg-[#a78bfa]/10 px-4 py-2 text-sm">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#a78bfa]"></span>
            Beta Launch Promo: First 100 Expert Video Roasts 50% OFF
          </div>
        </div>

        {/* Hero Heading */}
        <h2 className="mx-auto mb-6 max-w-5xl text-5xl font-bold leading-tight md:text-6xl">
          Brutally Honest <span className="gradient-text">Roasts</span>
          <br />
          For Your <span className="gradient-text">Web3</span> Landing Page
        </h2>

        {/* Subtitle */}
        <p className="mx-auto mb-12 max-w-2xl text-lg text-gray-300">
          Get an AI-powered analysis with actionable feedback to dramatically improve your dApp's conversion rate and
          user experience.
        </p>

        {/* URL Input Form */}
        <div className="mx-auto mb-4 max-w-2xl">
          <UrlForm />
        </div>

        {/* Free Tier Text */}
        <p className="mb-16 text-sm text-gray-400">Free tier: Instant AI analysis with actionable recommendations</p>

        {/* Feature Points */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex items-center justify-center">
            <ArrowRight className="mr-2 h-5 w-5 text-[#a78bfa]" />
            <span>500+ Projects Analyzed</span>
          </div>
          <div className="flex items-center justify-center">
            <ArrowRight className="mr-2 h-5 w-5 text-[#a78bfa]" />
            <span>Web3-Specific Analysis</span>
          </div>
          <div className="flex items-center justify-center">
            <ArrowRight className="mr-2 h-5 w-5 text-[#a78bfa]" />
            <span>Actionable Recommendations</span>
          </div>
        </div>
      </main>

      {/* Real Results Section */}
      <Stats />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Roast Process Section */}
      <RoastProcess />

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQ />

      {/* Satisfaction Guarantee Section */}
      <SatisfactionGuarantee />

      {/* Footer */}
      <Footer />
    </div>
  )
}

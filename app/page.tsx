import { ArrowRight, CheckCircle, Zap } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HowItWorks } from "@/components/how-it-works"
import { Testimonials } from "@/components/testimonials"
import { FAQ } from "@/components/faq"
import { UrlForm } from "@/components/url-form"
import { Stats } from "@/components/stats"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-purple-600" />
            <span className="text-xl font-bold">Web3 ROAST</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium">
              Home
            </Link>
            <Link href="/dashboard" className="text-sm font-medium">
              Dashboard
            </Link>
            <Link href="#pricing" className="text-sm font-medium">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="hidden md:flex">
              Sign In
            </Button>
            <Button size="sm">Get Started</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-purple-50 to-white py-20 dark:from-purple-950/20 dark:to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 md:grid-cols-2 md:gap-16">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    Brutally Honest Feedback for Your Web3 Project
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Get your Web3 landing page roasted by AI and experts. Improve conversions with actionable insights.
                  </p>
                </div>
                <UrlForm />
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>100% secure and confidential</span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[500px] rounded-lg border bg-background p-4 shadow-lg">
                  <div className="absolute -top-2 -right-2 rounded-full bg-purple-600 px-2 py-0.5 text-xs font-medium text-white">
                    AI-Powered
                  </div>
                  <div className="space-y-4">
                    <div className="h-40 w-full rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <span className="text-gray-400">Your Web3 Site Screenshot</span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
                      <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
                      <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-700" />
                    </div>
                    <div className="flex justify-between">
                      <div className="h-8 w-24 rounded-md bg-purple-100 dark:bg-purple-900/30" />
                      <div className="h-8 w-24 rounded-md bg-purple-100 dark:bg-purple-900/30" />
                      <div className="h-8 w-24 rounded-md bg-purple-100 dark:bg-purple-900/30" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <Stats />

        {/* How It Works */}
        <HowItWorks />

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-gray-50 dark:bg-gray-900/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Choose Your Roast Level</h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  From quick AI insights to in-depth expert analysis, we've got you covered.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
              <Card className="relative overflow-hidden border-purple-200 dark:border-purple-800">
                <div className="absolute top-0 right-0 bg-purple-100 dark:bg-purple-900/30 px-3 py-1 text-xs font-medium text-purple-600 dark:text-purple-400">
                  POPULAR
                </div>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl">🤖 Instant AI Audit</CardTitle>
                  <CardDescription>
                    <span className="text-3xl font-bold">FREE</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Immediate AI analysis</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Full page screenshot</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Web3-specific UX recommendations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Technical assessment</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Instant delivery</span>
                    </li>
                  </ul>
                  <Button className="w-full">
                    Get Free Roast
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
              <Card className="border-purple-200 dark:border-purple-800">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl">🔥 Expert Video Roast</CardTitle>
                  <CardDescription>
                    <span className="text-3xl font-bold">$299</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>20-minute detailed video breakdown</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Web3 expert analysis</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Includes AI audit</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>48-hour delivery</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Written recommendations</span>
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full">
                    Get Expert Roast
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <Testimonials />

        {/* FAQ Section */}
        <FAQ />

        {/* Guarantee Section */}
        <section className="py-16 bg-purple-50 dark:bg-purple-950/20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter">Our Guarantee</h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  If our roast doesn't help improve your Web3 project's conversion rate, we'll refund your money.
                </p>
              </div>
              <Button size="lg" className="mt-4">
                Start Your Free Roast
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background">
        <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-purple-600" />
            <span className="text-xl font-bold">Web3 ROAST</span>
          </div>
          <nav className="flex flex-wrap gap-4 sm:gap-6">
            <Link href="#" className="text-sm font-medium">
              Terms
            </Link>
            <Link href="#" className="text-sm font-medium">
              Privacy
            </Link>
            <Link href="#" className="text-sm font-medium">
              Contact
            </Link>
          </nav>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Web3 ROAST. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

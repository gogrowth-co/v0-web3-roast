import { ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HowItWorks } from "@/components/how-it-works"
import { Testimonials } from "@/components/testimonials"
import { FAQ } from "@/components/faq"
import { UrlForm } from "@/components/url-form"
import { Stats } from "@/components/stats"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-brand-purple/5 to-transparent py-20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 md:grid-cols-2 md:gap-16">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    Brutally Honest Feedback for Your Web3 Project
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Get your Web3 landing page roasted by AI and experts. Improve conversions with actionable insights.
                  </p>
                </div>
                <UrlForm />
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>100% secure and confidential</span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[500px] rounded-lg border bg-card p-4 shadow-lg">
                  <div className="absolute -top-2 -right-2 rounded-full bg-brand-purple px-2 py-0.5 text-xs font-medium text-white">
                    AI-Powered
                  </div>
                  <div className="space-y-4">
                    <div className="h-40 w-full rounded-md bg-muted dark:bg-muted/20 flex items-center justify-center">
                      <span className="text-muted-foreground">Your Web3 Site Screenshot</span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 w-3/4 rounded bg-muted dark:bg-muted/20" />
                      <div className="h-4 w-full rounded bg-muted dark:bg-muted/20" />
                      <div className="h-4 w-5/6 rounded bg-muted dark:bg-muted/20" />
                    </div>
                    <div className="flex justify-between">
                      <div className="h-8 w-24 rounded-md bg-brand-purple/10 dark:bg-brand-purple/20" />
                      <div className="h-8 w-24 rounded-md bg-brand-purple/10 dark:bg-brand-purple/20" />
                      <div className="h-8 w-24 rounded-md bg-brand-purple/10 dark:bg-brand-purple/20" />
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
        <section id="pricing" className="py-20 bg-muted/30 dark:bg-muted/5">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Choose Your Roast Level</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From quick AI insights to in-depth expert analysis, we've got you covered.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
              <Card className="relative overflow-hidden border-brand-purple/20 dark:border-brand-purple/10">
                <div className="absolute top-0 right-0 bg-brand-purple/10 dark:bg-brand-purple/20 px-3 py-1 text-xs font-medium text-brand-purple">
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
                  <Button className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white">
                    Get Free Roast
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
              <Card className="border-brand-purple/20 dark:border-brand-purple/10">
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
                  <Button
                    variant="outline"
                    className="w-full border-brand-purple text-brand-purple hover:bg-brand-purple/10"
                  >
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
        <section className="py-16 bg-brand-purple/5 dark:bg-brand-purple/10">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter">Our Guarantee</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  If our roast doesn't help improve your Web3 project's conversion rate, we'll refund your money.
                </p>
              </div>
              <Button size="lg" className="mt-4 bg-brand-orange hover:bg-brand-orange/90 text-white">
                Start Your Free Roast
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

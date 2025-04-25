import { ArrowRight, Cpu, FileText, Hourglass, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function HowItWorks() {
  return (
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Get actionable insights to improve your Web3 project's conversion rate.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-4xl py-12">
          <Tabs defaultValue="free" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="free">Free AI Roast</TabsTrigger>
              <TabsTrigger value="expert">Expert Video Roast</TabsTrigger>
            </TabsList>
            <TabsContent value="free" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-purple-200 dark:border-purple-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">1. Submit URL</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30 mb-4">
                      <ArrowRight className="h-6 w-6 text-purple-600" />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Enter your Web3 project URL to begin the analysis process.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-purple-200 dark:border-purple-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">2. AI Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30 mb-4">
                      <Cpu className="h-6 w-6 text-purple-600" />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Our AI captures a screenshot and analyzes your Web3 landing page.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-purple-200 dark:border-purple-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">3. Instant Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30 mb-4">
                      <Zap className="h-6 w-6 text-purple-600" />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Get immediate feedback on your Web3 project's strengths and weaknesses.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-purple-200 dark:border-purple-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">4. Implement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30 mb-4">
                      <FileText className="h-6 w-6 text-purple-600" />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Apply our actionable recommendations to improve your conversion rate.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="expert" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-purple-200 dark:border-purple-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">1. Submit URL</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30 mb-4">
                      <ArrowRight className="h-6 w-6 text-purple-600" />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Enter your Web3 project URL and purchase the expert roast.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-purple-200 dark:border-purple-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">2. Expert Review</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30 mb-4">
                      <Cpu className="h-6 w-6 text-purple-600" />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      A Web3 expert thoroughly analyzes your landing page and prepares feedback.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-purple-200 dark:border-purple-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">3. Video Delivery</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30 mb-4">
                      <Hourglass className="h-6 w-6 text-purple-600" />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receive a 20-minute video breakdown within 48 hours with detailed insights.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-purple-200 dark:border-purple-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">4. Transform</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30 mb-4">
                      <FileText className="h-6 w-6 text-purple-600" />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Implement expert recommendations to dramatically improve your Web3 project.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}

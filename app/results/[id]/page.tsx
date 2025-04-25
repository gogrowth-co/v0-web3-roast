"use client"

import Link from "next/link"
import { ArrowLeft, Download, XCircle } from "lucide-react"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FeedbackItem } from "@/components/feedback-item"
import { ResultsLoading } from "@/components/results-loading"
import { getRoast } from "@/lib/actions/roast"
import { ShareButton } from "@/components/share-button"
import { EnvWarning } from "@/components/env-warning"
import { debugLog } from "@/lib/utils/debug"

export default async function ResultsPage({ params }: { params: { id: string } }) {
  debugLog("ResultsPage", `Rendering results page for roast ID: ${params.id}`)

  // Fetch roast data
  const { success, roast, feedbackItems, error, limitedFunctionality, missingOptionalVars } = await getRoast(params.id)

  // If no roast found, show 404
  if (!success || !roast) {
    debugLog("ResultsPage", "Roast not found, showing 404")
    notFound()
  }

  debugLog("ResultsPage", `Roast found with status: ${roast.status}`)

  // If roast is still processing, show loading state
  if (roast.status === "processing") {
    debugLog("ResultsPage", "Roast is still processing, showing loading state")
    return <ResultsLoading roast={roast} missingVars={missingOptionalVars} />
  }

  // If roast failed, show error
  if (roast.status === "failed") {
    debugLog("ResultsPage", "Roast failed, showing error state")
    return (
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 py-8">
          <div className="container px-4 md:px-6">
            {limitedFunctionality && missingOptionalVars && <EnvWarning missingVars={missingOptionalVars} />}
            <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
              <XCircle className="h-16 w-16 text-red-500" />
              <h1 className="text-3xl font-bold tracking-tighter">Analysis Failed</h1>
              <p className="text-gray-500 dark:text-gray-400">
                We couldn't analyze {roast.url}. Please try again or contact support if the problem persists.
              </p>
              <div className="flex gap-4">
                <Button asChild>
                  <Link href="/">Try Again</Link>
                </Button>
                <Button variant="outline" onClick={() => window.location.reload()}>
                  Retry Analysis
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Extract data from the roast
  const analysisData = roast.ai_analysis
  const categoryScores = analysisData?.categoryScores || {}
  const positives = analysisData?.positives || []

  debugLog("ResultsPage", "Rendering completed roast results")

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <ShareButton />
            <Button size="sm" disabled>
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          {limitedFunctionality && missingOptionalVars && <EnvWarning missingVars={missingOptionalVars} />}

          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-bold tracking-tighter">Web3 ROAST Results</h1>
                  <p className="text-gray-500 dark:text-gray-400">Analysis for {roast.url}</p>
                </div>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Screenshot</CardTitle>
                    <CardDescription>Full page capture of your Web3 project</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-hidden rounded-md border">
                      <img
                        src={roast.screenshot_url || "/placeholder.svg?height=800&width=1200"}
                        alt="Website Screenshot"
                        className="w-full object-cover"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Detailed Feedback</CardTitle>
                    <CardDescription>Brutally honest feedback to improve your Web3 project</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="all" className="w-full">
                      <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="high">High Priority</TabsTrigger>
                        <TabsTrigger value="medium">Medium</TabsTrigger>
                        <TabsTrigger value="low">Low</TabsTrigger>
                        <TabsTrigger value="positive">Positives</TabsTrigger>
                      </TabsList>
                      <TabsContent value="all" className="mt-6 space-y-4">
                        {feedbackItems && feedbackItems.length > 0 ? (
                          feedbackItems.map((item) => <FeedbackItem key={item.id} item={item} />)
                        ) : (
                          <p className="py-4 text-center text-gray-500">No feedback items found.</p>
                        )}
                      </TabsContent>
                      <TabsContent value="high" className="mt-6 space-y-4">
                        {feedbackItems && feedbackItems.filter((item) => item.severity === "high").length > 0 ? (
                          feedbackItems
                            .filter((item) => item.severity === "high")
                            .map((item) => <FeedbackItem key={item.id} item={item} />)
                        ) : (
                          <p className="py-4 text-center text-gray-500">No high priority issues found.</p>
                        )}
                      </TabsContent>
                      <TabsContent value="medium" className="mt-6 space-y-4">
                        {feedbackItems && feedbackItems.filter((item) => item.severity === "medium").length > 0 ? (
                          feedbackItems
                            .filter((item) => item.severity === "medium")
                            .map((item) => <FeedbackItem key={item.id} item={item} />)
                        ) : (
                          <p className="py-4 text-center text-gray-500">No medium priority issues found.</p>
                        )}
                      </TabsContent>
                      <TabsContent value="low" className="mt-6 space-y-4">
                        {feedbackItems && feedbackItems.filter((item) => item.severity === "low").length > 0 ? (
                          feedbackItems
                            .filter((item) => item.severity === "low")
                            .map((item) => <FeedbackItem key={item.id} item={item} />)
                        ) : (
                          <p className="py-4 text-center text-gray-500">No low priority issues found.</p>
                        )}
                      </TabsContent>
                      <TabsContent value="positive" className="mt-6">
                        <div className="rounded-md border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900">
                          {positives && positives.length > 0 ? (
                            <ul className="space-y-2">
                              {positives.map((positive, index) => (
                                <li key={index} className="text-sm text-gray-700 dark:text-gray-300">
                                  • {positive}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-gray-500">No positive highlights found.</p>
                          )}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Overall Performance</CardTitle>
                  <CardDescription>How your Web3 project scores</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="relative h-40 w-40">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl font-bold">{roast.score || 0}</span>
                      </div>
                      <svg className="h-full w-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#a855f7"
                          strokeWidth="10"
                          strokeDasharray="283"
                          strokeDashoffset={283 - (283 * (roast.score || 0)) / 100}
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {roast.score && roast.score > 80
                          ? "Your Web3 project is performing exceptionally well!"
                          : roast.score && roast.score > 60
                            ? "Your Web3 project is performing better than average."
                            : roast.score && roast.score > 40
                              ? "Your Web3 project needs some improvements."
                              : "Your Web3 project needs significant improvements."}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Category Breakdown</CardTitle>
                  <CardDescription>Performance by category</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(categoryScores).map(([category, score]) => (
                    <div key={category} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{category}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{score}%</span>
                      </div>
                      <Progress value={score} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Next Steps</CardTitle>
                  <CardDescription>Recommended actions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {feedbackItems && feedbackItems.filter((item) => item.severity === "high").length > 0 && (
                    <div className="rounded-md border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900">
                      <h3 className="font-medium">High Priority</h3>
                      <ul className="mt-2 space-y-2">
                        {feedbackItems
                          .filter((item) => item.severity === "high")
                          .slice(0, 3)
                          .map((item) => (
                            <li key={item.id} className="flex items-start gap-2">
                              <XCircle className="mt-0.5 h-4 w-4 text-red-500" />
                              <span className="text-sm">{item.feedback.split(".")[0]}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                  {feedbackItems && feedbackItems.filter((item) => item.severity === "medium").length > 0 && (
                    <div className="rounded-md border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900">
                      <h3 className="font-medium">Medium Priority</h3>
                      <ul className="mt-2 space-y-2">
                        {feedbackItems
                          .filter((item) => item.severity === "medium")
                          .slice(0, 3)
                          .map((item) => (
                            <li key={item.id} className="flex items-start gap-2">
                              <XCircle className="mt-0.5 h-4 w-4 text-amber-500" />
                              <span className="text-sm">{item.feedback.split(".")[0]}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                  <Button className="w-full">Upgrade to Expert Video Roast</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t bg-background">
        <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Web3 ROAST. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

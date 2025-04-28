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
import { SiteFooter } from "@/components/site-footer"
import { useEffect, useState } from "react"

export default function ResultsPage({ params }: { params: { id: string } }) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    async function fetchData() {
      try {
        debugLog("ResultsPage", `Fetching roast data for ID: ${params.id}`)

        // Get the roast data
        const roastData = await getRoast(params.id)

        if (!roastData.success) {
          throw new Error(roastData.error || "Failed to fetch roast data")
        }

        // If the roast is still processing, we'll poll for updates
        if (roastData.roast.status === "processing") {
          setData(roastData)
          setLoading(false)

          // Set up polling for updates if the roast is still processing
          const pollTimer = setTimeout(() => {
            setRetryCount((prev) => prev + 1)
          }, 5000) // Poll every 5 seconds

          return () => clearTimeout(pollTimer)
        }

        // If the roast is completed or failed, we can stop loading
        setData(roastData)
        setLoading(false)
      } catch (err) {
        debugLog("ResultsPage", `Error fetching roast data: ${err.message}`)
        setError(err.message)
        setLoading(false)
      }
    }

    fetchData()
  }, [params.id, retryCount])

  // While loading, show the loading screen
  if (loading) {
    // Show a placeholder roast while actual data loads
    const placeholderRoast = {
      id: params.id,
      url: "Loading...",
      status: "processing",
      created_at: new Date().toISOString(),
    }
    return <ResultsLoading roast={placeholderRoast as any} />
  }

  // If there was an error fetching the data
  if (error) {
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
            <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
              <XCircle className="h-16 w-16 text-red-500" />
              <h1 className="text-3xl font-bold tracking-tighter">Error Loading Results</h1>
              <p className="text-muted-foreground">{error}</p>
              <div className="flex gap-4">
                <Button asChild className="bg-brand-orange hover:bg-brand-orange/90 text-white">
                  <Link href="/">Try Again</Link>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.location.reload()}
                  className="border-brand-purple text-brand-purple hover:bg-brand-purple/10"
                >
                  Reload Page
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // If fetching failed or no data
  if (!data || !data.success) {
    debugLog("ResultsPage", "Roast not found or fetch failed")
    notFound()
  }

  const { roast, feedbackItems, limitedFunctionality, missingOptionalVars } = data

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
              <p className="text-muted-foreground">
                We couldn't analyze {roast.url}. Please try again or contact support if the problem persists.
              </p>
              <div className="flex gap-4">
                <Button asChild className="bg-brand-orange hover:bg-brand-orange/90 text-white">
                  <Link href="/">Try Again</Link>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.location.reload()}
                  className="border-brand-purple text-brand-purple hover:bg-brand-purple/10"
                >
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
            <Button size="sm" disabled className="bg-brand-orange hover:bg-brand-orange/90 text-white">
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
                  <p className="text-muted-foreground">Analysis for {roast.url}</p>
                </div>

                <Card className="border-brand-gray-light dark:border-brand-gray-dark">
                  <CardHeader className="pb-2">
                    <CardTitle>Screenshot</CardTitle>
                    <CardDescription>Full page capture of your Web3 project</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-hidden rounded-md border border-brand-gray-light dark:border-brand-gray-dark">
                      <img
                        src={roast.screenshot_url || "/placeholder.svg?height=800&width=1200"}
                        alt="Website Screenshot"
                        className="w-full object-cover"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-brand-gray-light dark:border-brand-gray-dark">
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
                          <p className="py-4 text-center text-muted-foreground">No feedback items found.</p>
                        )}
                      </TabsContent>
                      <TabsContent value="high" className="mt-6 space-y-4">
                        {feedbackItems && feedbackItems.filter((item) => item.severity === "high").length > 0 ? (
                          feedbackItems
                            .filter((item) => item.severity === "high")
                            .map((item) => <FeedbackItem key={item.id} item={item} />)
                        ) : (
                          <p className="py-4 text-center text-muted-foreground">No high priority issues found.</p>
                        )}
                      </TabsContent>
                      <TabsContent value="medium" className="mt-6 space-y-4">
                        {feedbackItems && feedbackItems.filter((item) => item.severity === "medium").length > 0 ? (
                          feedbackItems
                            .filter((item) => item.severity === "medium")
                            .map((item) => <FeedbackItem key={item.id} item={item} />)
                        ) : (
                          <p className="py-4 text-center text-muted-foreground">No medium priority issues found.</p>
                        )}
                      </TabsContent>
                      <TabsContent value="low" className="mt-6 space-y-4">
                        {feedbackItems && feedbackItems.filter((item) => item.severity === "low").length > 0 ? (
                          feedbackItems
                            .filter((item) => item.severity === "low")
                            .map((item) => <FeedbackItem key={item.id} item={item} />)
                        ) : (
                          <p className="py-4 text-center text-muted-foreground">No low priority issues found.</p>
                        )}
                      </TabsContent>
                      <TabsContent value="positive" className="mt-6">
                        <div className="rounded-md border border-brand-gray-light bg-muted/30 p-4 dark:border-brand-gray-dark dark:bg-muted/10">
                          {positives && positives.length > 0 ? (
                            <ul className="space-y-2">
                              {positives.map((positive, index) => (
                                <li key={index} className="text-sm text-foreground/80 dark:text-foreground/70">
                                  • {positive}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-muted-foreground">No positive highlights found.</p>
                          )}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-8">
              <Card className="border-brand-gray-light dark:border-brand-gray-dark">
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
                          stroke="#8b5cf6"
                          strokeWidth="10"
                          strokeDasharray="283"
                          strokeDashoffset={283 - (283 * (roast.score || 0)) / 100}
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">
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

              <Card className="border-brand-gray-light dark:border-brand-gray-dark">
                <CardHeader className="pb-2">
                  <CardTitle>Category Breakdown</CardTitle>
                  <CardDescription>Performance by category</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(categoryScores).map(([category, score]) => (
                    <div key={category} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{category}</span>
                        <span className="text-sm text-muted-foreground">{score}%</span>
                      </div>
                      <Progress value={score} className="h-2" indicatorClassName="bg-brand-purple" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-brand-gray-light dark:border-brand-gray-dark">
                <CardHeader className="pb-2">
                  <CardTitle>Next Steps</CardTitle>
                  <CardDescription>Recommended actions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {feedbackItems && feedbackItems.filter((item) => item.severity === "high").length > 0 && (
                    <div className="rounded-md border border-brand-gray-light bg-muted/30 p-4 dark:border-brand-gray-dark dark:bg-muted/10">
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
                    <div className="rounded-md border border-brand-gray-light bg-muted/30 p-4 dark:border-brand-gray-dark dark:bg-muted/10">
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
                  <Button className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white">
                    Upgrade to Expert Video Roast
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

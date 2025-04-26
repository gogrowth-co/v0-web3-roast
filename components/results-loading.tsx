"use client"

import Link from "next/link"
import { ArrowLeft, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { toast } from "@/components/ui/use-toast"
import type { Roast } from "@/lib/types"
import { EnvWarning } from "@/components/env-warning"
import { retryRoast } from "@/lib/actions/roast"
import { SystemHealthCheck } from "@/components/system-health-check"
import { SiteFooter } from "@/components/site-footer"

interface ResultsLoadingProps {
  roast: Roast
  missingVars?: string[]
}

export function ResultsLoading({ roast, missingVars = [] }: ResultsLoadingProps) {
  const [isRetrying, setIsRetrying] = useState(false)
  const [loadingTime, setLoadingTime] = useState(0)
  const [showDiagnostics, setShowDiagnostics] = useState(false)

  // Add a timer to track how long the page has been loading
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingTime((prev) => prev + 1)
    }, 1000)

    // If loading takes more than 60 seconds, show diagnostics automatically
    if (loadingTime > 60 && !showDiagnostics) {
      setShowDiagnostics(true)
    }

    // If loading takes more than 3 minutes (180 seconds), auto-retry once
    if (loadingTime === 180 && !isRetrying) {
      console.log("Auto-retrying analysis after 3 minutes...")
      handleRetry()
    }

    return () => clearInterval(interval)
  }, [loadingTime, showDiagnostics, isRetrying])

  const handleRetry = async () => {
    if (isRetrying) return // Prevent multiple simultaneous retries

    setIsRetrying(true)
    try {
      const result = await retryRoast(roast.id)
      if (result.success) {
        toast({
          title: "Retrying analysis",
          description: "We're trying to analyze your Web3 project again. This may take a moment.",
        })
        // Reset the loading time
        setLoadingTime(0)
      } else {
        toast({
          title: "Something went wrong",
          description: result.error || "Unable to retry the analysis. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Unable to retry the analysis. Please try again.",
        variant: "destructive",
      })
    } finally {
      // Add a slight delay before allowing another retry
      setTimeout(() => {
        setIsRetrying(false)
      }, 3000)
    }
  }

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
          <div className="flex items-center gap-2">
            <Link href={`/debug/${roast.id}`} className="text-sm text-muted-foreground hover:text-foreground">
              Debug
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          {missingVars && missingVars.length > 0 && <EnvWarning missingVars={missingVars} />}

          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter">Analyzing Your Web3 Project</h1>
              <p className="text-muted-foreground">We're roasting {roast.url}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <Card className="border-brand-gray-light dark:border-brand-gray-dark">
                  <CardHeader className="pb-4">
                    <div className="h-8 w-48 animate-pulse rounded-md bg-muted dark:bg-muted/20" />
                    <div className="h-4 w-72 animate-pulse rounded-md bg-muted dark:bg-muted/20" />
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 w-full animate-pulse rounded-md bg-muted dark:bg-muted/20" />
                  </CardContent>
                </Card>

                <div className="mt-6 flex flex-col items-center justify-center">
                  <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-brand-purple border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                  <p className="mt-4 text-center text-sm text-muted-foreground">
                    This typically takes about 1-2 minutes. Please don't refresh the page.
                  </p>
                  <p className="mt-2 text-center text-sm text-muted-foreground">
                    Time elapsed: {Math.floor(loadingTime / 60)}:{(loadingTime % 60).toString().padStart(2, "0")}
                  </p>

                  {loadingTime > 120 && (
                    <div className="mt-4 flex flex-col items-center space-y-2">
                      <p className="text-center text-sm text-amber-500">
                        It's taking longer than expected. You can try to restart the analysis.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRetry}
                        disabled={isRetrying}
                        className="flex items-center gap-2 border-brand-purple text-brand-purple hover:bg-brand-purple/10"
                      >
                        <RefreshCw className="h-4 w-4" />
                        {isRetrying ? "Retrying..." : "Retry Analysis"}
                      </Button>

                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => setShowDiagnostics(true)}
                        className="mt-2 text-brand-purple"
                      >
                        Show System Diagnostics
                      </Button>
                    </div>
                  )}
                </div>

                {showDiagnostics && (
                  <div className="mt-8">
                    <h2 className="mb-4 text-xl font-bold">System Diagnostics</h2>
                    <SystemHealthCheck roastId={roast.id} />
                  </div>
                )}
              </div>

              <div>
                <Card className="border-brand-gray-light dark:border-brand-gray-dark">
                  <CardHeader className="pb-4">
                    <div className="h-8 w-48 animate-pulse rounded-md bg-muted dark:bg-muted/20" />
                    <div className="h-4 w-36 animate-pulse rounded-md bg-muted dark:bg-muted/20" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="h-16 w-full animate-pulse rounded-md bg-muted dark:bg-muted/20" />
                      <div className="h-16 w-full animate-pulse rounded-md bg-muted dark:bg-muted/20" />
                      <div className="h-16 w-full animate-pulse rounded-md bg-muted dark:bg-muted/20" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6 border-brand-gray-light dark:border-brand-gray-dark">
                  <CardHeader className="pb-4">
                    <div className="h-8 w-48 animate-pulse rounded-md bg-muted dark:bg-muted/20" />
                    <div className="h-4 w-36 animate-pulse rounded-md bg-muted dark:bg-muted/20" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="h-4 w-full animate-pulse rounded-md bg-muted dark:bg-muted/20" />
                      <div className="h-4 w-full animate-pulse rounded-md bg-muted dark:bg-muted/20" />
                      <div className="h-4 w-full animate-pulse rounded-md bg-muted dark:bg-muted/20" />
                      <div className="h-4 w-full animate-pulse rounded-md bg-muted dark:bg-muted/20" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useState, useEffect } from "react"
import type { Roast } from "@/lib/types"
import { EnvWarning } from "@/components/env-warning"
import { SiteFooter } from "@/components/site-footer"
import { Progress } from "@/components/ui/progress"

interface ResultsLoadingProps {
  roast: Roast
  missingVars?: string[]
}

export function ResultsLoading({ roast, missingVars = [] }: ResultsLoadingProps) {
  const [loadingTime, setLoadingTime] = useState(0)
  const [progress, setProgress] = useState(0)

  // Progress bar simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        // Start slow, speed up in the middle, then slow down near the end
        let increment = 0.5
        if (oldProgress < 30) increment = 1
        else if (oldProgress > 70) increment = 0.2

        // Max progress without completion is 95%
        const newProgress = Math.min(95, oldProgress + increment)
        return newProgress
      })
    }, 800)

    return () => clearInterval(interval)
  }, [])

  // Add a timer to track how long the page has been loading
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingTime((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

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
          {missingVars && missingVars.length > 0 && <EnvWarning missingVars={missingVars} />}

          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter">Analyzing Your Web3 Project</h1>
              <p className="text-muted-foreground">We're roasting {roast.url}</p>
            </div>

            {/* Progress bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Loading your results...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" indicatorClassName="bg-brand-purple" />
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
                </div>
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

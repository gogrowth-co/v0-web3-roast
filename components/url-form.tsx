"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { createRoast } from "@/lib/actions/roast"
import { EnvWarning } from "@/components/env-warning"

export function UrlForm() {
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [missingVars, setMissingVars] = useState<string[]>([])
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!url) {
      toast({
        title: "Please enter a URL",
        description: "You need to provide a URL to analyze.",
        variant: "destructive",
      })
      return
    }

    // Basic URL validation
    try {
      // Add http:// if not present
      const urlToSubmit = url.startsWith("http") ? url : `https://${url}`
      new URL(urlToSubmit)
      setIsLoading(true)

      // Call the server action to create a new roast
      const result = await createRoast(urlToSubmit)

      if (result.success && result.roastId) {
        // Store missing vars for display
        if (result.limitedFunctionality && result.missingOptionalVars) {
          setMissingVars(result.missingOptionalVars)
        }

        toast({
          title: "Analysis started",
          description: "We're analyzing your Web3 project. This may take a moment.",
        })
        router.push(`/results/${result.roastId}`)
      } else {
        toast({
          title: "Something went wrong",
          description: result.error || "Unable to analyze the URL. Please try again.",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    } catch (error) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL including http:// or https://",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <EnvWarning missingVars={missingVars} />
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-2 sm:flex-row">
        <Input
          type="text"
          placeholder="Enter your Web3 website URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="h-10 sm:h-11 border-brand-gray-light dark:border-brand-gray-dark focus-visible:ring-brand-purple"
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="h-10 sm:h-11 bg-brand-orange hover:bg-brand-orange/90 text-white"
        >
          {isLoading ? "Analyzing..." : "Analyze Free"}
          {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </form>
    </div>
  )
}

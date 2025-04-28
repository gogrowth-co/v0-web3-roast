"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
    <div className="w-full max-w-2xl mx-auto">
      <EnvWarning missingVars={missingVars} />
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row">
        <input
          type="text"
          placeholder="Enter your Web3 project URL (e.g., https://uniswap.org)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-grow rounded-lg border border-gray-600 bg-[#1a1333]/50 px-4 py-3 text-white placeholder-gray-400 focus:border-[#a78bfa] focus:outline-none sm:rounded-r-none"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 flex items-center justify-center rounded-lg bg-[#f97316] px-6 py-3 font-medium text-white hover:bg-[#f97316]/90 sm:mt-0 sm:rounded-l-none"
        >
          {isLoading ? "Analyzing..." : "Roast It!"} <span className="ml-1">🔥</span>
        </button>
      </form>
    </div>
  )
}

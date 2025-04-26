"use client"

import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useState } from "react"

interface EnvWarningProps {
  missingVars?: string[]
}

export function EnvWarning({ missingVars = [] }: EnvWarningProps) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed || missingVars.length === 0) {
    return null
  }

  return (
    <Alert
      variant="warning"
      className="mb-4 border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-900/10"
    >
      <AlertCircle className="h-4 w-4 text-amber-500" />
      <AlertTitle className="flex items-center justify-between text-amber-800 dark:text-amber-400">
        <span>Limited Functionality Mode</span>
        <button
          onClick={() => setDismissed(true)}
          className="text-xs text-amber-600 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300"
        >
          Dismiss
        </button>
      </AlertTitle>
      <AlertDescription className="text-amber-700 dark:text-amber-300">
        <p>Some environment variables are missing. The application will work with limited functionality.</p>
        {missingVars.includes("SCREENSHOT_MACHINE_API_KEY") && (
          <p className="mt-1 text-sm">
            • <strong>SCREENSHOT_MACHINE_API_KEY</strong>: Using placeholder images instead of real screenshots.
          </p>
        )}
        {missingVars.includes("OPENAI_API_KEY") && (
          <p className="mt-1 text-sm">
            • <strong>OPENAI_API_KEY</strong>: Using simulated AI analysis instead of real AI analysis.
          </p>
        )}
      </AlertDescription>
    </Alert>
  )
}

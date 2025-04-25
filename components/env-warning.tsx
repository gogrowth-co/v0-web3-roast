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
    <Alert variant="warning" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle className="flex items-center justify-between">
        <span>Limited Functionality Mode</span>
        <button onClick={() => setDismissed(true)} className="text-xs text-gray-500 hover:text-gray-700">
          Dismiss
        </button>
      </AlertTitle>
      <AlertDescription>
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

"use client"

import { useState, useEffect } from "react"
import { AlertCircle, CheckCircle, Loader2, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

interface SystemHealthCheckProps {
  roastId?: string
}

export function SystemHealthCheck({ roastId }: SystemHealthCheckProps) {
  const [diagnostics, setDiagnostics] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const runDiagnostics = async () => {
    setLoading(true)
    try {
      const url = roastId ? `/api/system/diagnostics?roastId=${roastId}` : "/api/system/diagnostics"

      const response = await fetch(url)
      const data = await response.json()

      setDiagnostics(data)

      // Check if there are any errors
      const hasErrors = Object.values(data).some((result: any) => result?.status === "error")

      if (hasErrors) {
        toast({
          title: "System check found issues",
          description: "There are problems that need to be addressed.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error running diagnostics:", error)
      toast({
        title: "Failed to run system check",
        description: error.message || "An unknown error occurred",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    runDiagnostics()
  }, [roastId])

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-amber-500" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>System Health Check</span>
          <Button variant="ghost" size="icon" onClick={runDiagnostics} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </CardTitle>
        <CardDescription>Diagnosing system components and connections</CardDescription>
      </CardHeader>
      <CardContent>
        {loading && !diagnostics ? (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
          </div>
        ) : (
          <div className="space-y-4">
            {diagnostics ? (
              <>
                {Object.entries(diagnostics)
                  .filter(([key, value]) => key !== "timestamp" && value !== null)
                  .map(([key, value]: [string, any]) => (
                    <div key={key} className="rounded-md border p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(value.status)}
                          <span className="font-medium capitalize">{value.name || key}</span>
                        </div>
                        <span
                          className={`text-xs ${
                            value.status === "error"
                              ? "text-red-500"
                              : value.status === "warning"
                                ? "text-amber-500"
                                : value.status === "success"
                                  ? "text-green-500"
                                  : "text-gray-500"
                          }`}
                        >
                          {value.status}
                        </span>
                      </div>
                      {value.message && <p className="mt-1 text-sm text-gray-500">{value.message}</p>}
                      {value.details && (
                        <details className="mt-2">
                          <summary className="cursor-pointer text-xs text-gray-500 hover:text-gray-700">
                            View details
                          </summary>
                          <pre className="mt-2 max-h-40 overflow-auto rounded bg-gray-50 p-2 text-xs">
                            {JSON.stringify(value.details, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                  ))}

                <div className="text-xs text-gray-400">
                  Last checked: {new Date(diagnostics.timestamp).toLocaleString()}
                </div>
              </>
            ) : (
              <div className="py-2 text-center text-sm text-gray-500">Failed to load diagnostics</div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          disabled={loading}
          onClick={() => {
            window.location.reload()
          }}
        >
          Refresh Page
        </Button>
      </CardFooter>
    </Card>
  )
}

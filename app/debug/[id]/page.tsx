"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { retryRoast } from "@/lib/actions/roast"
import { toast } from "@/components/ui/use-toast"
import { SystemHealthCheck } from "@/components/system-health-check"

export default function DebugPage({ params }: { params: { id: string } }) {
  const [roast, setRoast] = useState<any>(null)
  const [feedbackItems, setFeedbackItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isFixing, setIsFixing] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [logs, setLogs] = useState<any[]>([])

  useEffect(() => {
    async function fetchRoast() {
      try {
        setLoading(true)
        const response = await fetch(`/api/debug/roast?id=${params.id}`)
        const data = await response.json()

        if (data.success) {
          setRoast(data.roast)
          setFeedbackItems(data.feedbackItems || [])
        } else {
          console.error("Failed to fetch roast:", data.error)
        }
      } catch (error) {
        console.error("Error fetching roast:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRoast()
  }, [params.id, refreshKey])

  // Fetch diagnostic logs
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch(`/api/debug/logs?id=${params.id}`)
        if (response.ok) {
          const data = await response.json()
          setLogs(data.logs || [])
        }
      } catch (error) {
        console.error("Error fetching logs:", error)
      }
    }

    fetchLogs()
    const interval = setInterval(fetchLogs, 5000) // Refresh logs every 5 seconds
    return () => clearInterval(interval)
  }, [params.id])

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1)
  }

  const handleFixRoast = async () => {
    setIsFixing(true)
    try {
      // Call the API to fix the roast
      const response = await fetch(`/api/debug/fix-roast?id=${params.id}`, {
        method: "POST",
      })
      const data = await response.json()

      if (data.success) {
        toast({
          title: "Roast fixed",
          description: "The roast has been fixed and marked as completed.",
        })
        handleRefresh()
      } else {
        toast({
          title: "Failed to fix roast",
          description: data.error || "An unknown error occurred",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fix the roast",
        variant: "destructive",
      })
    } finally {
      setIsFixing(false)
    }
  }

  const handleRetry = async () => {
    setIsFixing(true)
    try {
      const result = await retryRoast(params.id)
      if (result.success) {
        toast({
          title: "Retrying analysis",
          description: "We're trying to analyze your Web3 project again.",
        })
        handleRefresh()
      } else {
        toast({
          title: "Something went wrong",
          description: result.error || "Unable to retry the analysis.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to retry the roast",
        variant: "destructive",
      })
    } finally {
      setIsFixing(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href={`/results/${params.id}`} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Results</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tighter">Debug Roast</h1>
                <p className="text-gray-500 dark:text-gray-400">ID: {params.id}</p>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleRetry} disabled={isFixing}>
                  Retry Analysis
                </Button>
                <Button variant="destructive" onClick={handleFixRoast} disabled={isFixing}>
                  Force Complete
                </Button>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
              </div>
            ) : (
              <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <Tabs defaultValue="roast">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="roast">Roast Details</TabsTrigger>
                      <TabsTrigger value="feedback">Feedback Items ({feedbackItems.length})</TabsTrigger>
                      <TabsTrigger value="logs">System Logs ({logs.length})</TabsTrigger>
                    </TabsList>

                    <TabsContent value="roast" className="mt-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Roast Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {roast ? (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="font-medium">URL</p>
                                  <p className="text-sm text-gray-500">{roast.url}</p>
                                </div>
                                <div>
                                  <p className="font-medium">Status</p>
                                  <p
                                    className={`text-sm ${
                                      roast.status === "completed"
                                        ? "text-green-500"
                                        : roast.status === "failed"
                                          ? "text-red-500"
                                          : "text-amber-500"
                                    }`}
                                  >
                                    {roast.status}
                                  </p>
                                </div>
                                <div>
                                  <p className="font-medium">Created At</p>
                                  <p className="text-sm text-gray-500">{new Date(roast.created_at).toLocaleString()}</p>
                                </div>
                                <div>
                                  <p className="font-medium">Completed At</p>
                                  <p className="text-sm text-gray-500">
                                    {roast.completed_at
                                      ? new Date(roast.completed_at).toLocaleString()
                                      : "Not completed"}
                                  </p>
                                </div>
                                <div>
                                  <p className="font-medium">Score</p>
                                  <p className="text-sm text-gray-500">{roast.score || "N/A"}</p>
                                </div>
                                <div>
                                  <p className="font-medium">Screenshot URL</p>
                                  <p className="text-sm text-gray-500 truncate">{roast.screenshot_url || "N/A"}</p>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <p className="font-medium">AI Analysis</p>
                                <pre className="max-h-60 overflow-auto rounded-md bg-gray-100 p-2 text-xs dark:bg-gray-800">
                                  {JSON.stringify(roast.ai_analysis, null, 2) || "No analysis data"}
                                </pre>
                              </div>
                            </div>
                          ) : (
                            <p className="text-center text-gray-500">Roast not found</p>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="feedback" className="mt-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Feedback Items ({feedbackItems.length})</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {feedbackItems.length > 0 ? (
                            <div className="space-y-4">
                              {feedbackItems.map((item) => (
                                <div key={item.id} className="rounded-md border p-4">
                                  <div className="flex justify-between">
                                    <p className="font-medium">{item.category}</p>
                                    <span
                                      className={`text-xs ${
                                        item.severity === "high"
                                          ? "text-red-500"
                                          : item.severity === "medium"
                                            ? "text-amber-500"
                                            : "text-blue-500"
                                      }`}
                                    >
                                      {item.severity}
                                    </span>
                                  </div>
                                  <p className="mt-2 text-sm text-gray-500">{item.feedback}</p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-center text-gray-500">No feedback items found</p>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="logs" className="mt-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            <span>System Logs</span>
                            <Button variant="outline" size="sm" onClick={handleRefresh}>
                              Refresh Logs
                            </Button>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          {logs.length > 0 ? (
                            <div className="max-h-96 overflow-y-auto">
                              <table className="w-full text-xs">
                                <thead className="sticky top-0 bg-background">
                                  <tr className="border-b">
                                    <th className="p-2 text-left">Time</th>
                                    <th className="p-2 text-left">Area</th>
                                    <th className="p-2 text-left">Message</th>
                                    <th className="p-2 text-left">Data</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {logs.map((log, index) => (
                                    <tr key={index} className="border-b hover:bg-gray-50">
                                      <td className="p-2 align-top whitespace-nowrap">
                                        {new Date(log.timestamp).toLocaleTimeString()}
                                      </td>
                                      <td className="p-2 align-top whitespace-nowrap font-medium">{log.area}</td>
                                      <td className="p-2 align-top">{log.message}</td>
                                      <td className="p-2 align-top">
                                        {log.data && (
                                          <details>
                                            <summary className="cursor-pointer">View</summary>
                                            <pre className="mt-1 max-h-32 overflow-auto rounded bg-gray-100 p-1 text-2xs">
                                              {log.data}
                                            </pre>
                                          </details>
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          ) : (
                            <p className="text-center text-gray-500">No logs found</p>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>

                <div>
                  <SystemHealthCheck roastId={params.id} />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

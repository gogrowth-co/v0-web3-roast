import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function LoadingHelpPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="mb-8 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </div>

          <h1 className="mb-8 text-3xl font-bold tracking-tighter">Loading Screen Controls</h1>

          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Screenshot Mode</CardTitle>
                <CardDescription>Control loading screen for screenshots</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  To capture screenshots of the loading state, you can use the following URL parameters:
                </p>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Screenshot Mode</h3>
                    <code className="block my-2 p-2 bg-muted rounded-md">?screenshot=true</code>
                    <p className="text-sm text-muted-foreground">
                      Keeps the loading screen in a fixed state optimized for screenshots with a countdown timer.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold">Force Loading</h3>
                    <code className="block my-2 p-2 bg-muted rounded-md">?forceLoading=true</code>
                    <p className="text-sm text-muted-foreground">
                      Forces the loading screen to stay visible indefinitely until page refresh.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold">Loading Delay</h3>
                    <code className="block my-2 p-2 bg-muted rounded-md">?loadingDelay=5000</code>
                    <p className="text-sm text-muted-foreground">
                      Keeps the loading screen visible for the specified number of milliseconds (5000 = 5 seconds).
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <h3 className="font-semibold">Example URLs</h3>
                  <code className="block my-2 p-2 bg-muted rounded-md">/results/[id]?screenshot=true</code>
                  <code className="block my-2 p-2 bg-muted rounded-md">/results/[id]?forceLoading=true&debug=true</code>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Debug Controls</CardTitle>
                <CardDescription>Additional controls for debugging</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  Debug controls provide additional options for testing and troubleshooting:
                </p>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Enable Debug Mode</h3>
                    <code className="block my-2 p-2 bg-muted rounded-md">?debug=true</code>
                    <p className="text-sm text-muted-foreground">
                      Shows additional debug controls in the loading interface.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold">Combining Parameters</h3>
                    <code className="block my-2 p-2 bg-muted rounded-md">?debug=true&screenshot=true</code>
                    <p className="text-sm text-muted-foreground">
                      You can combine multiple parameters by using the & symbol.
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <Button asChild variant="outline">
                    <Link href="/debug">Go to Debug Dashboard</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Testing the Loading Screen</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Use these links to test different loading states:</p>

                <div className="grid gap-4 md:grid-cols-2">
                  <Button asChild variant="outline">
                    <Link href="/results/test-id?screenshot=true">Screenshot Mode</Link>
                  </Button>

                  <Button asChild variant="outline">
                    <Link href="/results/test-id?forceLoading=true">Force Loading</Link>
                  </Button>

                  <Button asChild variant="outline">
                    <Link href="/results/test-id?loadingDelay=10000">10 Second Delay</Link>
                  </Button>

                  <Button asChild variant="outline">
                    <Link href="/results/test-id?debug=true">Debug Mode</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

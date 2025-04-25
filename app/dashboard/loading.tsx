import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">Web3 ROAST</span>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold tracking-tighter">Your Dashboard</h1>
              <p className="text-gray-500 dark:text-gray-400">Loading your roasts...</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="h-6 w-3/4 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
                    <CardDescription className="h-4 w-1/2 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
                  </CardHeader>
                  <CardContent>
                    <div className="h-8 w-full animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
                  </CardContent>
                  <CardFooter className="border-t p-4">
                    <div className="h-6 w-full animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

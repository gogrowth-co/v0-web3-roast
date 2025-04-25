import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="h-4 w-24 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <div className="space-y-8">
                <div>
                  <div className="h-8 w-72 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
                  <div className="mt-2 h-4 w-56 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
                </div>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="h-6 w-32 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
                    <CardDescription className="h-4 w-56 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 w-full animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="h-6 w-40 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
                    <CardDescription className="h-4 w-64 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
                  </CardHeader>
                  <CardContent>
                    <div className="h-8 w-full animate-pulse rounded-md bg-gray-200 dark:bg-gray-800 mb-4" />
                    <div className="space-y-4">
                      <div className="h-24 w-full animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
                      <div className="h-24 w-full animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
                      <div className="h-24 w-full animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="h-6 w-40 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
                  <CardDescription className="h-4 w-56 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="h-32 w-32 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />
                    <div className="h-4 w-3/4 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="h-6 w-40 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
                  <CardDescription className="h-4 w-56 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between">
                          <div className="h-4 w-32 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
                          <div className="h-4 w-12 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
                        </div>
                        <div className="h-2 w-full animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

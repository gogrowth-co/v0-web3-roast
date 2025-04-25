import Link from "next/link"
import { ArrowRight, Clock, ExternalLink, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAllRoasts } from "@/lib/actions/roast"

export default async function DashboardPage() {
  // Fetch roasts data
  const { success, roasts, error } = await getAllRoasts()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-xl font-bold">
              Web3 ROAST
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium">
              Home
            </Link>
            <Link href="/dashboard" className="text-sm font-medium">
              Dashboard
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              Account
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold tracking-tighter">Your Dashboard</h1>
              <p className="text-gray-500 dark:text-gray-400">Manage and view all your Web3 project roasts</p>
            </div>

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex w-full max-w-sm items-center gap-2">
                <Input placeholder="Search roasts..." className="h-9" />
                <Button size="sm" variant="ghost" className="h-9 w-9 px-0">
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Search</span>
                </Button>
              </div>
              <Button asChild>
                <Link href="/">
                  New Roast
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="all">All Roasts</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="processing">Processing</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-6">
                {success && roasts && roasts.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {roasts.map((roast) => (
                      <Card key={roast.id} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <CardTitle className="truncate text-base">{roast.url}</CardTitle>
                          <CardDescription>
                            {new Date(roast.created_at).toLocaleDateString(undefined, {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          {roast.status === "completed" ? (
                            <div className="flex items-center justify-between">
                              <div className="text-2xl font-bold">{roast.score}/100</div>
                              <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                Completed
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-amber-500" />
                              <span className="text-sm text-amber-500">Processing...</span>
                            </div>
                          )}
                        </CardContent>
                        <CardFooter className="border-t p-4">
                          {roast.status === "completed" ? (
                            <Link
                              href={`/results/${roast.id}`}
                              className="flex w-full items-center justify-center gap-2 text-sm font-medium text-purple-600 hover:underline dark:text-purple-400"
                            >
                              View Results
                              <ExternalLink className="h-3 w-3" />
                            </Link>
                          ) : (
                            <Link
                              href={`/results/${roast.id}`}
                              className="flex w-full items-center justify-center gap-2 text-sm text-gray-500"
                            >
                              View Progress
                            </Link>
                          )}
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
                    <p className="text-gray-500 dark:text-gray-400">
                      No roasts found. Start by roasting a Web3 project.
                    </p>
                    <Button asChild>
                      <Link href="/">
                        Start a Roast
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="completed" className="mt-6">
                {success && roasts && roasts.filter((roast) => roast.status === "completed").length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {roasts
                      .filter((roast) => roast.status === "completed")
                      .map((roast) => (
                        <Card key={roast.id} className="overflow-hidden">
                          <CardHeader className="pb-2">
                            <CardTitle className="truncate text-base">{roast.url}</CardTitle>
                            <CardDescription>
                              {new Date(roast.created_at).toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between">
                              <div className="text-2xl font-bold">{roast.score}/100</div>
                              <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                Completed
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="border-t p-4">
                            <Link
                              href={`/results/${roast.id}`}
                              className="flex w-full items-center justify-center gap-2 text-sm font-medium text-purple-600 hover:underline dark:text-purple-400"
                            >
                              View Results
                              <ExternalLink className="h-3 w-3" />
                            </Link>
                          </CardFooter>
                        </Card>
                      ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
                    <p className="text-gray-500 dark:text-gray-400">No completed roasts found.</p>
                    <Button asChild>
                      <Link href="/">
                        Start a Roast
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="processing" className="mt-6">
                {success && roasts && roasts.filter((roast) => roast.status === "processing").length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {roasts
                      .filter((roast) => roast.status === "processing")
                      .map((roast) => (
                        <Card key={roast.id} className="overflow-hidden">
                          <CardHeader className="pb-2">
                            <CardTitle className="truncate text-base">{roast.url}</CardTitle>
                            <CardDescription>
                              {new Date(roast.created_at).toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-amber-500" />
                              <span className="text-sm text-amber-500">Processing...</span>
                            </div>
                          </CardContent>
                          <CardFooter className="border-t p-4">
                            <Link
                              href={`/results/${roast.id}`}
                              className="flex w-full items-center justify-center gap-2 text-sm text-gray-500"
                            >
                              View Progress
                            </Link>
                          </CardFooter>
                        </Card>
                      ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
                    <p className="text-gray-500 dark:text-gray-400">No processing roasts found.</p>
                    <Button asChild>
                      <Link href="/">
                        Start a Roast
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <footer className="border-t bg-background">
        <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Web3 ROAST. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

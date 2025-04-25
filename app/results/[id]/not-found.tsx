import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
            <h1 className="text-3xl font-bold tracking-tighter">Roast Not Found</h1>
            <p className="text-gray-500 dark:text-gray-400">
              The roast you're looking for doesn't exist or has been deleted.
            </p>
            <Button asChild>
              <Link href="/">Start a New Roast</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

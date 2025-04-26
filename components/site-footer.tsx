import Link from "next/link"
import { Zap } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
        <div className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-brand-purple" />
          <span className="text-xl font-bold">Web3 ROAST</span>
        </div>
        <nav className="flex flex-wrap gap-4 sm:gap-6">
          <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Terms
          </Link>
          <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Privacy
          </Link>
          <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Contact
          </Link>
        </nav>
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Web3 ROAST. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

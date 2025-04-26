"use client"

import Link from "next/link"
import { Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { ModeToggle } from "@/components/mode-toggle"

export function SiteHeader() {
  const pathname = usePathname()
  const isHome = pathname === "/"

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-brand-purple" />
            <span className="text-xl font-bold">Web3 ROAST</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-medium ${isHome ? "text-brand-purple" : "text-foreground/70 hover:text-foreground"}`}
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className={`text-sm font-medium ${pathname.includes("/dashboard") ? "text-brand-purple" : "text-foreground/70 hover:text-foreground"}`}
          >
            Dashboard
          </Link>
          <Link href="/#pricing" className="text-sm font-medium text-foreground/70 hover:text-foreground">
            Pricing
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button variant="outline" size="sm" className="hidden md:flex">
            Sign In
          </Button>
          <Button size="sm" className="bg-brand-orange hover:bg-brand-orange/90">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  )
}

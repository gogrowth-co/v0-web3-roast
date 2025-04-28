import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { logEnvironmentStatus } from "@/lib/utils/verify-environment"
import { ThemeProvider } from "@/components/theme-provider"

// Load Inter font with Next.js font optimization
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

export const metadata = {
  title: "Web3 ROAST - Brutally Honest Web3 Landing Page Analysis",
  description:
    "Get brutally honest, constructive feedback on your Web3 project's landing page to improve conversion rates and user experience.",
  keywords: ["Web3", "landing page", "analysis", "conversion rate", "UX", "feedback", "roast"],
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Log environment status on server
  if (typeof window === "undefined") {
    logEnvironmentStatus()
  }

  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

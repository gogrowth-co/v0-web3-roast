"use client"

import { useState } from "react"
import { Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

export function ShareButton() {
  const [isSharing, setIsSharing] = useState(false)

  const handleShare = async () => {
    setIsSharing(true)
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied",
        description: "The link to this roast has been copied to your clipboard.",
      })
    } catch (error) {
      console.error("Failed to copy link:", error)
      toast({
        title: "Failed to copy link",
        description: "Please try again or copy the URL manually.",
        variant: "destructive",
      })
    } finally {
      setIsSharing(false)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="hidden md:flex border-brand-purple text-brand-purple hover:bg-brand-purple/10"
      onClick={handleShare}
      disabled={isSharing}
    >
      <Share2 className="mr-2 h-4 w-4" />
      Share Results
    </Button>
  )
}

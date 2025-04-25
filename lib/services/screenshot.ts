import { withRetry } from "../utils/error-handling"
import { debugLog } from "../utils/debug"

// Service for capturing screenshots - this should only be called from server-side code
export async function captureScreenshot(url: string): Promise<string> {
  try {
    debugLog("captureScreenshot", `Capturing screenshot for URL: ${url}`)
    const apiKey = process.env.SCREENSHOT_MACHINE_API_KEY

    if (!apiKey) {
      debugLog("captureScreenshot", "Screenshot Machine API key not configured, using placeholder screenshot")
      // Return a placeholder image URL if the API key is not available
      return `/placeholder.svg?height=1080&width=1920&text=${encodeURIComponent(url)}`
    }

    // Build the Screenshot Machine API URL with the API key from environment variables
    const screenshotUrl = `https://api.screenshotmachine.com?key=${apiKey}&url=${encodeURIComponent(url)}&dimension=1920x1080&format=png&cacheLimit=0&delay=2000&timeout=20000`

    // In a production environment, we would download this image and upload it to Supabase Storage
    // This would use retry logic for the request and upload
    return await withRetry(
      async () => {
        debugLog("captureScreenshot", "Using Screenshot Machine API")
        // For the MVP, just return the Screenshot Machine URL
        return screenshotUrl
      },
      { maxRetries: 3 },
    )
  } catch (error) {
    debugLog("captureScreenshot", `Error capturing screenshot: ${error.message}`, error)
    // Return a placeholder image URL if there's an error
    return `/placeholder.svg?height=1080&width=1920&text=${encodeURIComponent(url)}`
  }
}

import { withRetry } from "../utils/error-handling"
import { debugLog } from "../utils/debug"

// Service for capturing screenshots - this should only be called from server-side code
export async function captureScreenshot(url: string): Promise<string> {
  try {
    debugLog("captureScreenshot", `Capturing screenshot for URL: ${url}`)

    // Use APIFlash API as provided by the user
    const apiKey = process.env.APIFLASH_ACCESS_KEY || "ea210e0e50484494918394aab7578268" // Fallback to the provided key

    // Build the APIFlash URL with the API key
    const screenshotUrl = `https://api.apiflash.com/v1/urltoimage?access_key=${apiKey}&url=${encodeURIComponent(url)}&wait_until=page_loaded&fresh=true`

    debugLog("captureScreenshot", `Using APIFlash with URL: ${screenshotUrl}`)

    // Set a timeout for the screenshot capture
    const capturePromise = withRetry(
      async () => {
        // For the MVP, just return the APIFlash URL
        return screenshotUrl
      },
      { maxRetries: 2 },
    )

    // Create a timeout promise
    const timeoutPromise = new Promise<string>((_, reject) => {
      setTimeout(() => {
        reject(new Error("Screenshot capture timed out after 30 seconds"))
      }, 30000) // 30 seconds timeout
    })

    // Race the capture against the timeout
    return Promise.race([capturePromise, timeoutPromise])
  } catch (error) {
    debugLog("captureScreenshot", `Error capturing screenshot: ${error.message}`, error)
    // Return a placeholder image URL if there's an error
    return `/placeholder.svg?height=1080&width=1920&text=${encodeURIComponent(url)}`
  }
}

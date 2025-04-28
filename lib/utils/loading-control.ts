/**
 * Utility functions to help control loading states for debugging and screenshots
 */

/**
 * Creates a promise that resolves after the specified delay
 * @param ms Milliseconds to delay
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Artificially delays the loading process
 * @param ms Milliseconds to delay
 * @param value Value to return after delay
 */
export async function delayedResult<T>(value: T, ms = 2000): Promise<T> {
  await delay(ms)
  return value
}

/**
 * Parses URL parameters to determine loading behavior
 */
export function getLoadingParams(): {
  shouldDelay: boolean
  delayMs: number
  screenshotMode: boolean
} {
  // Default to no delay in server environments
  if (typeof window === "undefined") {
    return { shouldDelay: false, delayMs: 0, screenshotMode: false }
  }

  const urlParams = new URLSearchParams(window.location.search)
  const loadingDelay = Number.parseInt(urlParams.get("loadingDelay") || "0")
  const forceLoading = urlParams.get("forceLoading") === "true"
  const screenshotMode = urlParams.get("screenshot") === "true"

  return {
    shouldDelay: forceLoading || loadingDelay > 0,
    delayMs: forceLoading ? 999999 : loadingDelay,
    screenshotMode,
  }
}

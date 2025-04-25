// Generic retry function with exponential backoff
export async function withRetry<T>(
  fn: () => Promise<T>,
  {
    maxRetries = 3,
    initialDelay = 500,
    maxDelay = 10000,
  }: { maxRetries?: number; initialDelay?: number; maxDelay?: number } = {},
): Promise<T> {
  let lastError: Error | null = null
  let delay = initialDelay

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error

      // If we've reached max retries, throw the error
      if (attempt === maxRetries) {
        throw new Error(`Failed after ${maxRetries} attempts: ${lastError.message}`)
      }

      console.warn(`Attempt ${attempt + 1} failed: ${lastError.message}. Retrying in ${delay}ms...`)

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, delay))

      // Exponential backoff with jitter
      delay = Math.min(delay * 2, maxDelay) * (0.8 + Math.random() * 0.4)
    }
  }

  // This should never be reached due to the throw above, but TypeScript needs it
  throw lastError
}

// Function to handle API errors and provide fallback
export async function withFallback<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn()
  } catch (error) {
    console.error("Operation failed, using fallback:", error)
    return fallback
  }
}

// Function to safely parse JSON with a fallback
export function safeJsonParse<T>(text: string, fallback: T): T {
  try {
    return JSON.parse(text) as T
  } catch (error) {
    console.error("Failed to parse JSON:", error)
    return fallback
  }
}

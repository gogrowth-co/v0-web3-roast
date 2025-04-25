import { cookies } from "next/headers"

// Simple persistent log with timestamps that can survive page refreshes
export class DiagnosticLog {
  private static MAX_LOGS = 100
  private static COOKIE_NAME = "diagnostic_logs"

  static async log(area: string, message: string, data?: any): Promise<void> {
    const timestamp = new Date().toISOString()
    const logEntry = {
      timestamp,
      area,
      message,
      data: data ? JSON.stringify(data).substring(0, 200) : undefined, // Limit data size
    }

    try {
      // Get existing logs from cookie
      const cookieStore = cookies()
      const existingLogs = cookieStore.get(this.COOKIE_NAME)?.value

      let logs = []
      if (existingLogs) {
        try {
          logs = JSON.parse(existingLogs)
        } catch (e) {
          logs = []
        }
      }

      // Add new log and limit array size
      logs.unshift(logEntry)
      if (logs.length > this.MAX_LOGS) {
        logs = logs.slice(0, this.MAX_LOGS)
      }

      // Store logs back in cookie
      document.cookie = `${this.COOKIE_NAME}=${encodeURIComponent(JSON.stringify(logs))}; path=/; max-age=3600`

      // Also log to console
      console.log(`[${timestamp}] [${area}] ${message}`, data || "")
    } catch (error) {
      // Fallback to console logging if cookie approach fails
      console.log(`[${timestamp}] [${area}] ${message}`, data || "")
      console.error("Failed to store diagnostic log:", error)
    }
  }

  static async getLogs(): Promise<any[]> {
    try {
      const cookieStore = cookies()
      const existingLogs = cookieStore.get(this.COOKIE_NAME)?.value

      if (existingLogs) {
        return JSON.parse(existingLogs)
      }
    } catch (e) {
      console.error("Failed to retrieve diagnostic logs:", e)
    }

    return []
  }

  static async clearLogs(): Promise<void> {
    try {
      document.cookie = `${this.COOKIE_NAME}=; path=/; max-age=0`
    } catch (e) {
      console.error("Failed to clear diagnostic logs:", e)
    }
  }
}

// Define different diagnostics modules to test various system aspects
export interface DiagnosticResult {
  name: string
  status: "success" | "warning" | "error" | "pending"
  message: string
  details?: any
}

export async function runEnvironmentDiagnostics(): Promise<DiagnosticResult> {
  try {
    // Check required environment variables
    const requiredVars = ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY", "SUPABASE_SERVICE_ROLE_KEY"]

    const missingVars = requiredVars.filter((varName) => !process.env[varName] || process.env[varName] === "")

    if (missingVars.length > 0) {
      return {
        name: "Environment Variables",
        status: "error",
        message: `Missing required environment variables: ${missingVars.join(", ")}`,
        details: { missingVars },
      }
    }

    // Check optional environment variables
    const optionalVars = ["SCREENSHOT_MACHINE_API_KEY", "OPENAI_API_KEY"]
    const missingOptionalVars = optionalVars.filter((varName) => !process.env[varName] || process.env[varName] === "")

    if (missingOptionalVars.length > 0) {
      return {
        name: "Environment Variables",
        status: "warning",
        message: `Missing optional environment variables: ${missingOptionalVars.join(", ")}`,
        details: { missingOptionalVars },
      }
    }

    return {
      name: "Environment Variables",
      status: "success",
      message: "All required environment variables are set",
    }
  } catch (error) {
    return {
      name: "Environment Variables",
      status: "error",
      message: `Failed to check environment variables: ${error.message}`,
      details: error,
    }
  }
}

export async function runSupabaseDiagnostics(): Promise<DiagnosticResult> {
  try {
    // Create a diagnostic-only connection to Supabase
    const { createServerSupabaseClient } = await import("../supabase/server")
    const supabase = createServerSupabaseClient()

    // Try a simple query to ensure connection works
    const start = Date.now()
    const { data, error } = await supabase.from("roasts").select("count").limit(1)
    const end = Date.now()

    if (error) {
      return {
        name: "Supabase Connection",
        status: "error",
        message: `Failed to connect to Supabase: ${error.message}`,
        details: error,
      }
    }

    return {
      name: "Supabase Connection",
      status: "success",
      message: `Successfully connected to Supabase (${end - start}ms)`,
      details: { responseTime: end - start, data },
    }
  } catch (error) {
    return {
      name: "Supabase Connection",
      status: "error",
      message: `Failed to run Supabase diagnostics: ${error.message}`,
      details: error,
    }
  }
}

export async function checkRoastData(id: string): Promise<DiagnosticResult> {
  try {
    const { createServerSupabaseClient } = await import("../supabase/server")
    const supabase = createServerSupabaseClient()

    // Try fetching the specific roast
    const { data: roast, error: roastError } = await supabase.from("roasts").select("*").eq("id", id).single()

    if (roastError) {
      return {
        name: "Roast Data Check",
        status: "error",
        message: `Failed to fetch roast with ID ${id}: ${roastError.message}`,
        details: { error: roastError },
      }
    }

    // Try fetching the feedback items
    const { data: feedbackItems, error: feedbackError } = await supabase
      .from("feedback_items")
      .select("*")
      .eq("roast_id", id)

    if (feedbackError) {
      return {
        name: "Roast Data Check",
        status: "warning",
        message: `Fetched roast but failed to fetch feedback items: ${feedbackError.message}`,
        details: { roast, feedbackError },
      }
    }

    return {
      name: "Roast Data Check",
      status: "success",
      message: `Successfully fetched roast and ${feedbackItems?.length || 0} feedback items`,
      details: {
        roast: {
          id: roast.id,
          url: roast.url,
          status: roast.status,
          created_at: roast.created_at,
          completed_at: roast.completed_at,
          score: roast.score,
          has_screenshot: !!roast.screenshot_url,
          has_analysis: !!roast.ai_analysis,
        },
        feedbackCount: feedbackItems?.length || 0,
      },
    }
  } catch (error) {
    return {
      name: "Roast Data Check",
      status: "error",
      message: `Exception during roast data check: ${error.message}`,
      details: error,
    }
  }
}

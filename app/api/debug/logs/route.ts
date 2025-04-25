import { NextResponse } from "next/server"
import { cookies } from "next/headers"

// This endpoint retrieves diagnostic logs from cookies
export async function GET(request: Request) {
  try {
    const cookieStore = cookies()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    // Get logs from cookie
    const logs = cookieStore.get("diagnostic_logs")?.value

    if (!logs) {
      return NextResponse.json({
        success: true,
        logs: [],
      })
    }

    try {
      const parsedLogs = JSON.parse(logs)

      // Filter logs by roast ID if provided
      const filteredLogs = id ? parsedLogs.filter((log: any) => log.data && log.data.includes(id)) : parsedLogs

      return NextResponse.json({
        success: true,
        logs: filteredLogs,
      })
    } catch (error) {
      console.error("Error parsing logs:", error)
      return NextResponse.json({
        success: false,
        error: "Failed to parse logs",
        logs: [],
      })
    }
  } catch (error) {
    console.error("Error in logs API:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        logs: [],
      },
      { status: 500 },
    )
  }
}

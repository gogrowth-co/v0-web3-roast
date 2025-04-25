import { NextResponse } from "next/server"
import { runEnvironmentDiagnostics, runSupabaseDiagnostics, checkRoastData } from "@/lib/utils/diagnostics"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const roastId = searchParams.get("roastId")

    // Safely get deployment info with fallbacks
    const deploymentInfo = {
      nodeEnv: process.env.NODE_ENV || "development",
      vercelEnv: process.env.VERCEL_ENV || "development",
      region: process.env.VERCEL_REGION || "unknown",
    }

    // Run various diagnostics
    const results = {
      timestamp: new Date().toISOString(),
      environment: await runEnvironmentDiagnostics(),
      supabase: await runSupabaseDiagnostics(),
      roastData: roastId ? await checkRoastData(roastId) : null,
      deployment: {
        name: "Deployment Info",
        status: "success",
        message: "Deployment information",
        details: deploymentInfo,
      },
    }

    return NextResponse.json(results)
  } catch (error) {
    console.error("Error in diagnostics API:", error)
    return NextResponse.json(
      {
        error: "Failed to run diagnostics",
        message: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

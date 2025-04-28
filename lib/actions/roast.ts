"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { debugLog } from "@/lib/utils/debug"
import { checkEnvVars } from "@/lib/utils/env-check"
import { captureScreenshot } from "@/lib/services/screenshot"
import { analyzeWebsiteDirectly } from "@/lib/services/direct-analysis"
import { revalidatePath } from "next/cache"

// Mock analysis function (replace with your actual implementation)
function generateSimulatedAnalysis() {
  return {
    score: Math.floor(Math.random() * 100),
    feedback: [
      { category: "Performance", feedback: "Consider optimizing images.", severity: "medium" },
      { category: "Accessibility", feedback: "Add alt text to images.", severity: "high" },
    ],
  }
}

// Update the getRoast function with better error handling and detailed logging
export async function getRoast(id: string) {
  const supabase = createServerSupabaseClient()
  debugLog("getRoast", `Fetching roast with ID: ${id}`)

  try {
    // Verify Supabase connection first
    try {
      const { data: testData, error: testError } = await supabase.from("roasts").select("count").limit(1)

      if (testError) {
        debugLog("getRoast", `Supabase connection test failed: ${testError.message}`, testError)
        throw new Error(`Supabase connection test failed: ${testError.message}`)
      }

      debugLog("getRoast", "Supabase connection test successful")
    } catch (testError) {
      debugLog("getRoast", `Failed to test Supabase connection: ${testError.message}`, testError)
    }

    // Get the roast data
    let roast
    try {
      const { data, error: roastError } = await supabase.from("roasts").select("*").eq("id", id).single()

      if (roastError) {
        debugLog("getRoast", `Error getting roast: ${roastError.message}`, roastError)
        throw new Error(`Failed to get roast: ${roastError.message}`)
      }

      roast = data
      debugLog("getRoast", `Roast found with status: ${roast.status}`)

      // Validate roast data
      if (!roast) {
        debugLog("getRoast", "Roast not found - data is null/undefined")
        throw new Error("Roast not found")
      }

      // Check for corrupt data
      if (!roast.url) {
        debugLog("getRoast", "Roast has invalid data (missing URL)", roast)
      }
    } catch (roastError) {
      debugLog("getRoast", `Failed to get roast data: ${roastError.message}`, roastError)
      throw roastError
    }

    // Get feedback items
    let feedbackItems = []
    try {
      const { data, error: feedbackError } = await supabase.from("feedback_items").select("*").eq("roast_id", id)

      if (feedbackError) {
        debugLog("getRoast", `Error getting feedback items: ${feedbackError.message}`, feedbackError)
        // Continue without feedback items if there's an error
      } else {
        feedbackItems = data || []
        debugLog("getRoast", `Found ${feedbackItems.length} feedback items`)
      }
    } catch (feedbackError) {
      debugLog("getRoast", `Failed to get feedback items: ${feedbackError.message}`, feedbackError)
      // Continue without feedback items if there's an error
    }

    // Check environment variables
    const envStatus = checkEnvVars()

    // Return the result
    return {
      success: true,
      roast,
      feedbackItems,
      limitedFunctionality: !envStatus.allValid,
      missingOptionalVars: envStatus.optional.missingVars,
    }
  } catch (error) {
    debugLog("getRoast", `Unexpected error: ${error.message}`, error)
    return {
      success: false,
      error: `Failed to get roast: ${error.message}`,
      details: error instanceof Error ? error.stack : undefined,
    }
  }
}

// Function to create a new roast
export async function createRoast(url: string) {
  const supabase = createServerSupabaseClient()
  debugLog("createRoast", `Creating new roast for URL: ${url}`)

  try {
    // Check environment variables
    const envStatus = checkEnvVars()
    const missingOptionalVars = envStatus.optional.missingVars

    // Create initial roast entry
    const { data: roast, error: createError } = await supabase
      .from("roasts")
      .insert({
        url,
        status: "processing",
      })
      .select()
      .single()

    if (createError) {
      debugLog("createRoast", `Error creating roast: ${createError.message}`, createError)
      throw createError
    }

    debugLog("createRoast", `Roast created with ID: ${roast.id}`)

    // Start background processing (in a real app, this would be a background job)
    processRoast(roast.id, url).catch((error) => {
      debugLog("createRoast", `Error in background processing: ${error.message}`, error)
    })

    return {
      success: true,
      roastId: roast.id,
      limitedFunctionality: !envStatus.allValid,
      missingOptionalVars,
    }
  } catch (error) {
    debugLog("createRoast", `Error generating roast: ${error.message}`, error)
    return { success: false, error: `Failed to generate roast: ${error.message}` }
  }
}

// Modify the processRoast function to ensure there's enough time for the loading screen

async function processRoast(roastId: string, url: string) {
  const supabase = createServerSupabaseClient()
  debugLog("processRoast", `Processing roast ${roastId} for URL: ${url}`)

  try {
    // Set a timeout for the entire process
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error("Processing timed out after 2 minutes"))
      }, 120000) // 2 minutes timeout
    })

    // Update status to processing
    await supabase.from("roasts").update({ status: "processing" }).eq("id", roastId)

    // Add a deliberate delay to ensure the loading screen is visible
    // This helps users see the loading state and capture screenshots if needed
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Capture screenshot with timeout
    debugLog("processRoast", `Capturing screenshot for ${url}`)
    let screenshotUrl
    try {
      // Race the screenshot capture against the timeout
      screenshotUrl = await Promise.race([captureScreenshot(url), timeoutPromise])
      debugLog("processRoast", `Screenshot captured successfully: ${screenshotUrl.substring(0, 100)}...`)

      // Add another small delay after screenshot capture
      await new Promise((resolve) => setTimeout(resolve, 1500))
    } catch (screenshotError) {
      debugLog("processRoast", `Error capturing screenshot: ${screenshotError.message}`, screenshotError)
      // Use a placeholder if screenshot fails
      screenshotUrl = `/placeholder.svg?height=1080&width=1920&text=${encodeURIComponent(url)}`
    }

    // Generate analysis with timeout
    debugLog("processRoast", `Analyzing ${url}`)
    let analysis
    try {
      // Race the analysis against the timeout
      analysis = await Promise.race([analyzeWebsiteDirectly(url, screenshotUrl), timeoutPromise])
      debugLog("processRoast", `Analysis completed successfully with score: ${analysis.score}`)

      // Add another small delay after analysis to ensure loading screen visibility
      await new Promise((resolve) => setTimeout(resolve, 2000))
    } catch (analysisError) {
      debugLog("processRoast", `Error analyzing website: ${analysisError.message}`, analysisError)
      // Generate simulated analysis if real analysis fails
      analysis = generateSimulatedAnalysis()
      debugLog("processRoast", `Using fallback simulated analysis with score: ${analysis.score}`)
    }

    // Insert feedback items
    debugLog("processRoast", `Inserting ${analysis.feedback.length} feedback items`)
    for (const item of analysis.feedback) {
      try {
        await supabase.from("feedback_items").insert({
          roast_id: roastId,
          category: item.category,
          feedback: item.feedback,
          severity: item.severity,
        })
      } catch (insertError) {
        debugLog("processRoast", `Error inserting feedback item: ${insertError.message}`, insertError)
        // Continue with other items even if one fails
      }
    }

    // Update roast with results
    debugLog("processRoast", `Completing roast ${roastId} with score: ${analysis.score}`)
    await supabase
      .from("roasts")
      .update({
        screenshot_url: screenshotUrl,
        ai_analysis: analysis,
        score: analysis.score,
        status: "completed",
        completed_at: new Date().toISOString(),
      })
      .eq("id", roastId)

    // Revalidate the results page
    revalidatePath(`/results/${roastId}`)
    debugLog("processRoast", `Successfully completed roast ${roastId}`)
  } catch (error) {
    debugLog("processRoast", `Error processing roast: ${error.message}`, error)

    // Update status to failed
    await supabase
      .from("roasts")
      .update({
        status: "failed",
        completed_at: new Date().toISOString(),
      })
      .eq("id", roastId)

    // Revalidate the results page to show the failure
    revalidatePath(`/results/${roastId}`)
  }
}

// Function to retry a roast analysis
export async function retryRoast(id: string) {
  const supabase = createServerSupabaseClient()
  debugLog("retryRoast", `Retrying roast with ID: ${id}`)

  try {
    // Get the roast
    const { data: roast, error: roastError } = await supabase.from("roasts").select("url").eq("id", id).single()

    if (roastError) {
      debugLog("retryRoast", `Error getting roast: ${roastError.message}`, roastError)
      throw roastError
    }

    if (!roast || !roast.url) {
      debugLog("retryRoast", "Roast not found or URL is missing")
      throw new Error("Roast not found or URL is missing")
    }

    // Update status to processing
    await supabase
      .from("roasts")
      .update({
        status: "processing",
        completed_at: null,
        score: null,
        screenshot_url: null,
        ai_analysis: null,
      })
      .eq("id", id)

    // Delete existing feedback items
    const { error: deleteError } = await supabase.from("feedback_items").delete().eq("roast_id", id)

    if (deleteError) {
      debugLog("retryRoast", `Error deleting feedback items: ${deleteError.message}`, deleteError)
      // Continue anyway
    }

    // Start background processing
    processRoast(id, roast.url).catch((error) => {
      debugLog("retryRoast", `Error in background processing: ${error.message}`, error)
    })

    // Revalidate the results page
    revalidatePath(`/results/${id}`)
    debugLog("retryRoast", `Successfully initiated retry for roast ${id}`)

    return { success: true }
  } catch (error) {
    debugLog("retryRoast", `Error retrying roast: ${error.message}`, error)
    return { success: false, error: `Failed to retry roast: ${error.message}` }
  }
}

// Function to get all roasts
export async function getAllRoasts() {
  const supabase = createServerSupabaseClient()
  debugLog("getAllRoasts", "Fetching all roasts")

  try {
    const { data: roasts, error } = await supabase.from("roasts").select("*").order("created_at", { ascending: false })

    if (error) {
      debugLog("getAllRoasts", `Error getting roasts: ${error.message}`, error)
      throw error
    }

    debugLog("getAllRoasts", `Found ${roasts.length} roasts`)
    return { success: true, roasts }
  } catch (error) {
    debugLog("getAllRoasts", `Error getting roasts: ${error.message}`, error)
    return { success: false, error: `Failed to get roasts: ${error.message}` }
  }
}

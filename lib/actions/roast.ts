"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { debugLog } from "@/lib/utils/debug"
import { checkEnvVars } from "@/lib/utils/env-check"
import { captureScreenshot } from "@/lib/services/screenshot"
import { analyzeWebsiteDirectly } from "@/lib/services/direct-analysis"
import { revalidatePath } from "next/cache"

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

// Function to process the roast (would be a background job in production)
async function processRoast(roastId: string, url: string) {
  const supabase = createServerSupabaseClient()
  debugLog("processRoast", `Processing roast ${roastId} for URL: ${url}`)

  try {
    // Update status to processing
    await supabase.from("roasts").update({ status: "processing" }).eq("id", roastId)

    // Capture screenshot
    debugLog("processRoast", `Capturing screenshot for ${url}`)
    const screenshotUrl = await captureScreenshot(url)

    // Generate analysis
    debugLog("processRoast", `Analyzing ${url}`)
    const analysis = await analyzeWebsiteDirectly(url, screenshotUrl)

    // Insert feedback items
    debugLog("processRoast", `Inserting ${analysis.feedback.length} feedback items`)
    for (const item of analysis.feedback) {
      await supabase.from("feedback_items").insert({
        roast_id: roastId,
        category: item.category,
        feedback: item.feedback,
        severity: item.severity,
      })
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
  } catch (error) {
    debugLog("processRoast", `Error processing roast: ${error.message}`, error)

    // Update status to failed
    await supabase.from("roasts").update({ status: "failed" }).eq("id", roastId)
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

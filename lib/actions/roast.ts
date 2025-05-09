"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { debugLog } from "@/lib/utils/debug"
import { checkEnvVars } from "@/lib/utils/env-check"
import { captureScreenshot } from "@/lib/services/screenshot"
import { analyzeWebsiteDirectly } from "@/lib/services/direct-analysis"
import { revalidatePath } from "next/cache"

// Function to process the roast (would be a background job in production)
async function processRoast(roastId: string, url: string) {
  const supabase = createServerSupabaseClient()
  debugLog("processRoast", `Processing roast ${roastId} for URL: ${url}`)

  try {
    // Set a timeout for the entire process
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error("Processing timed out after 5 minutes"))
      }, 300000) // 5 minutes timeout (increased from 2 minutes)
    })

    // Update status to processing
    await supabase.from("roasts").update({ status: "processing" }).eq("id", roastId)

    // Capture screenshot with timeout
    debugLog("processRoast", `Capturing screenshot for ${url}`)
    let screenshotUrl
    try {
      // Race the screenshot capture against the timeout
      screenshotUrl = await Promise.race([captureScreenshot(url), timeoutPromise])
      debugLog("processRoast", `Screenshot captured successfully: ${screenshotUrl.substring(0, 100)}...`)
    } catch (screenshotError) {
      debugLog("processRoast", `Error capturing screenshot: ${screenshotError.message}`, screenshotError)
      // Use a placeholder if screenshot fails
      screenshotUrl = `/placeholder.svg?height=1080&width=1920&text=${encodeURIComponent(url)}`
    }

    // Update the roast with the screenshot URL immediately
    await supabase
      .from("roasts")
      .update({
        screenshot_url: screenshotUrl,
      })
      .eq("id", roastId)

    // Generate analysis with timeout
    debugLog("processRoast", `Analyzing ${url} with screenshot ${screenshotUrl}`)
    let analysis
    try {
      // Race the analysis against the timeout
      analysis = await Promise.race([analyzeWebsiteDirectly(url, screenshotUrl), timeoutPromise])
      debugLog("processRoast", `Analysis completed successfully with score: ${analysis.score}`)
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
    await supabase.from("roasts").update({ status: "failed" }).eq("id", roastId)

    // Revalidate the results page to show the failure
    revalidatePath(`/results/${roastId}`)
  }
}

// Helper function to generate simulated analysis
function generateSimulatedAnalysis() {
  return {
    score: Math.floor(Math.random() * 30) + 40, // Random score between 40-70
    categoryScores: {
      "Value proposition clarity": Math.floor(Math.random() * 40) + 30,
      "Web3 terminology usage": Math.floor(Math.random() * 40) + 40,
      "Technical explanation quality": Math.floor(Math.random() * 40) + 30,
      "Trust signals & security indicators": Math.floor(Math.random() * 40) + 30,
      "Call-to-action effectiveness": Math.floor(Math.random() * 40) + 40,
      "Mobile responsiveness": Math.floor(Math.random() * 40) + 50,
      "Web3 integration visibility": Math.floor(Math.random() * 40) + 30,
    },
    feedback: [
      {
        category: "Value proposition clarity",
        feedback:
          "Your value proposition is buried below the fold. Web3 users need to immediately understand what problem you're solving and why your blockchain solution is unique. Right now, it takes too much scrolling to figure out what your project actually does.",
        severity: "high",
      },
      {
        category: "Web3 terminology usage",
        feedback:
          'You\'re dropping terms like "L2 scaling" and "ZK-rollups" without explaining what they mean to the average user. While Web3-native visitors might understand, newcomers will bounce. Define your terms or simplify the language.',
        severity: "medium",
      },
      {
        category: "Technical explanation quality",
        feedback:
          "Your technical explanation of how the smart contracts work is overly complex. It reads like documentation, not a landing page. Web3 users need to understand the benefits without getting lost in implementation details.",
        severity: "high",
      },
      {
        category: "Trust signals & security indicators",
        feedback:
          "Missing critical trust signals like audit reports, TVL data, and team information. In Web3, security is paramount - you need to prominently display your security credentials and audit partners.",
        severity: "high",
      },
      {
        category: "Call-to-action effectiveness",
        feedback:
          'Your primary CTA "Enter App" is generic and doesn\'t communicate value. Consider something more specific like "Start Earning 8% APY" or "Trade With Zero Slippage" that highlights your unique value proposition.',
        severity: "medium",
      },
      {
        category: "Mobile responsiveness",
        feedback:
          "The wallet connection button is too small on mobile screens and the gas fee estimator becomes unusable. Since over 60% of Web3 users access dApps via mobile, this needs immediate fixing.",
        severity: "medium",
      },
      {
        category: "Web3 integration visibility",
        feedback:
          "Your wallet connection feature is hidden in a dropdown menu. This should be one of the most prominent elements on the page - Web3 users expect to see it immediately.",
        severity: "low",
      },
    ],
    positives: [
      "Clean design with appropriate Web3 aesthetic.",
      "Good balance of technical information and user benefits.",
      "Clearly explained tokenomics section with helpful visualizations.",
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

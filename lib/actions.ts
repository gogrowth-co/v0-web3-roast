"use server"

import { createClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"
import type { Database } from "./database.types"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey)

// Function to generate a screenshot using Screenshot Machine
async function captureScreenshot(url: string): Promise<string> {
  const apiKey = process.env.SCREENSHOT_MACHINE_API_KEY

  if (!apiKey) {
    throw new Error("Screenshot Machine API key is not configured")
  }

  const screenshotUrl = `https://api.screenshotmachine.com?key=${apiKey}&url=${encodeURIComponent(url)}&dimension=1920x1080&format=jpg&cacheLimit=0`

  // In a real implementation, you would download this image and upload it to Supabase Storage
  return screenshotUrl
}

// Function to analyze the screenshot with OpenAI
async function analyzeScreenshot(url: string, screenshotUrl: string) {
  const openaiApiKey = process.env.OPENAI_API_KEY

  if (!openaiApiKey) {
    throw new Error("OpenAI API key is not configured")
  }

  // Mock analysis for demo purposes
  // In a real implementation, you would use OpenAI's API to analyze the screenshot
  return {
    score: Math.floor(Math.random() * 30) + 50, // Random score between 50-80
    feedback: [
      {
        category: "Value Proposition",
        feedback:
          "Your value proposition is buried below the fold. Web3 users need to immediately understand what problem you're solving and why your solution is unique.",
        severity: "high",
      },
      {
        category: "Technical Explanation",
        feedback:
          "The technical explanation uses jargon that even experienced Web3 users would struggle with. Simplify your explanation without losing accuracy.",
        severity: "high",
      },
      {
        category: "Trust Signals",
        feedback:
          "Missing key trust signals like security audits, team information, and partnerships. Web3 users are particularly sensitive to these trust indicators.",
        severity: "medium",
      },
      {
        category: "Call-to-Action",
        feedback: "Your primary CTA is generic and doesn't communicate value. Consider something more specific.",
        severity: "medium",
      },
      {
        category: "Mobile Responsiveness",
        feedback:
          "Some elements are difficult to tap on mobile devices. Ensure all interactive elements have adequate touch targets.",
        severity: "low",
      },
    ],
  }
}

// Server action to generate a roast
export async function generateRoast(url: string) {
  try {
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
      throw createError
    }

    // Start background processing (in a real app, this would be a background job)
    processRoast(roast.id, url).catch(console.error)

    return { success: true, roastId: roast.id }
  } catch (error) {
    console.error("Error generating roast:", error)
    return { success: false, error: "Failed to generate roast" }
  }
}

// Function to process the roast (would be a background job in production)
async function processRoast(roastId: string, url: string) {
  try {
    // Update status to processing
    await supabase.from("roasts").update({ status: "processing" }).eq("id", roastId)

    // Capture screenshot
    const screenshotUrl = await captureScreenshot(url)

    // Generate analysis
    const analysis = await analyzeScreenshot(url, screenshotUrl)

    // Insert feedback items
    for (const item of analysis.feedback) {
      await supabase.from("feedback_items").insert({
        roast_id: roastId,
        category: item.category,
        feedback: item.feedback,
        severity: item.severity,
      })
    }

    // Update roast with results
    await supabase
      .from("roasts")
      .update({
        screenshot_url: screenshotUrl,
        score: analysis.score,
        status: "completed",
        completed_at: new Date().toISOString(),
      })
      .eq("id", roastId)

    // Revalidate the results page
    revalidatePath(`/results/${roastId}`)
  } catch (error) {
    console.error("Error processing roast:", error)

    // Update status to failed
    await supabase.from("roasts").update({ status: "failed" }).eq("id", roastId)
  }
}

// Function to get a roast by ID
export async function getRoast(id: string) {
  try {
    const { data: roast, error: roastError } = await supabase.from("roasts").select("*").eq("id", id).single()

    if (roastError) {
      throw roastError
    }

    const { data: feedbackItems, error: feedbackError } = await supabase
      .from("feedback_items")
      .select("*")
      .eq("roast_id", id)

    if (feedbackError) {
      throw feedbackError
    }

    return { success: true, roast, feedbackItems }
  } catch (error) {
    console.error("Error getting roast:", error)
    return { success: false, error: "Failed to get roast" }
  }
}

// Function to get all roasts for a user
export async function getUserRoasts() {
  try {
    const { data: roasts, error } = await supabase.from("roasts").select("*").order("created_at", { ascending: false })

    if (error) {
      throw error
    }

    return { success: true, roasts }
  } catch (error) {
    console.error("Error getting user roasts:", error)
    return { success: false, error: "Failed to get roasts" }
  }
}

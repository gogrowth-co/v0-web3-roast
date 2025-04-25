import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { generateSimulatedAnalysis } from "@/lib/services/direct-analysis"

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing roast ID" }, { status: 400 })
    }

    const supabase = createServerSupabaseClient()

    // Get the roast
    const { data: roast, error: roastError } = await supabase.from("roasts").select("*").eq("id", id).single()

    if (roastError) {
      console.error("Error getting roast:", roastError)
      return NextResponse.json({ success: false, error: "Failed to get roast" }, { status: 500 })
    }

    // Generate simulated analysis
    const analysis = generateSimulatedAnalysis()

    // Delete existing feedback items
    const { error: deleteError } = await supabase.from("feedback_items").delete().eq("roast_id", id)

    if (deleteError) {
      console.error("Error deleting feedback items:", deleteError)
      return NextResponse.json({ success: false, error: "Failed to delete existing feedback items" }, { status: 500 })
    }

    // Insert new feedback items
    for (const item of analysis.feedback) {
      const { error: insertError } = await supabase.from("feedback_items").insert({
        roast_id: id,
        category: item.category,
        feedback: item.feedback,
        severity: item.severity,
      })

      if (insertError) {
        console.error("Error inserting feedback item:", insertError)
        // Continue with other items
      }
    }

    // Update roast with results
    const { error: updateError } = await supabase
      .from("roasts")
      .update({
        ai_analysis: analysis,
        score: analysis.score,
        status: "completed",
        completed_at: new Date().toISOString(),
      })
      .eq("id", id)

    if (updateError) {
      console.error("Error updating roast:", updateError)
      return NextResponse.json({ success: false, error: "Failed to update roast" }, { status: 500 })
    }

    // Revalidate the results page
    revalidatePath(`/results/${id}`)

    return NextResponse.json({
      success: true,
      message: "Roast fixed successfully",
    })
  } catch (error) {
    console.error("Error in fix roast API:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

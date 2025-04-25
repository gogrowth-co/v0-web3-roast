import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
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

    // Get feedback items
    const { data: feedbackItems, error: feedbackError } = await supabase
      .from("feedback_items")
      .select("*")
      .eq("roast_id", id)

    if (feedbackError) {
      console.error("Error getting feedback items:", feedbackError)
      return NextResponse.json({ success: false, error: "Failed to get feedback items" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      roast,
      feedbackItems,
    })
  } catch (error) {
    console.error("Error in debug roast API:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

import { NextResponse } from "next/server"
import OpenAI from "openai"
import type { RoastAnalysisResult } from "@/lib/types"

// This file only runs on the server
export async function POST(request: Request) {
  try {
    const { url, screenshotUrl } = await request.json()

    if (!url || !screenshotUrl) {
      return NextResponse.json({ error: "URL and screenshot URL are required" }, { status: 400 })
    }

    console.log(`API route: Analyzing ${url} with screenshot ${screenshotUrl}`)

    // Initialize OpenAI client (safe here because this is server-side only)
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    // Define the categories we want to analyze
    const categories = [
      "Value proposition clarity",
      "Web3 terminology usage",
      "Technical explanation quality",
      "Trust signals & security indicators",
      "Call-to-action effectiveness",
      "Mobile responsiveness",
      "Web3 integration visibility",
    ]

    const prompt = `
      You are a Web3 UX expert analyzing a landing page at ${url}.
      Provide brutally honest but constructive feedback on this Web3 project's landing page.
      Focus especially on these categories: ${categories.join(", ")}.
      For each category, provide specific feedback with a severity (high, medium, or low).
      Be specific, actionable, and include Web3-specific insights.
      Format your response as JSON with scores for each category (0-100) and overall score.
    `

    // For the MVP, we'll use the simulated response instead of the real OpenAI API
    // This avoids potential issues with the OpenAI API during development
    console.log("Using simulated analysis response")
    return NextResponse.json(generateSimulatedAnalysis())

    /* Uncomment this code to use the real OpenAI API
    try {
      console.log("Calling OpenAI API...");
      const response = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: prompt },
              {
                type: "image_url",
                image_url: {
                  url: screenshotUrl,
                },
              },
            ],
          },
        ],
        max_tokens: 4000,
      });

      // Parse the response from OpenAI
      const analysisText = response.choices[0]?.message?.content || "";
      console.log("OpenAI response received:", analysisText.substring(0, 100) + "...");
      
      let analysis: RoastAnalysisResult;

      try {
        // Try to parse the JSON response
        analysis = JSON.parse(analysisText) as RoastAnalysisResult;
        return NextResponse.json(analysis);
      } catch (error) {
        console.error("Failed to parse OpenAI response as JSON:", error);
        // Fall back to simulated analysis if parsing fails
        return NextResponse.json(generateSimulatedAnalysis());
      }
    } catch (openaiError) {
      console.error("OpenAI API error:", openaiError);
      // Fall back to simulated analysis if OpenAI API fails
      return NextResponse.json(generateSimulatedAnalysis());
    }
    */
  } catch (error) {
    console.error("Error in analyze route:", error)
    return NextResponse.json({ error: "Failed to analyze website" }, { status: 500 })
  }
}

// Helper function to generate simulated analysis
function generateSimulatedAnalysis(): RoastAnalysisResult {
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

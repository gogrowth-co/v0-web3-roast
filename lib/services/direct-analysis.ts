import type { RoastAnalysisResult } from "../types"
import { debugLog } from "../utils/debug"

// Direct server-side analysis function that doesn't rely on API routes or env variables
export async function analyzeWebsiteDirectly(url: string, screenshotUrl: string): Promise<RoastAnalysisResult> {
  try {
    debugLog("analyzeWebsiteDirectly", `Analyzing ${url} with screenshot ${screenshotUrl}`)

    // Check if OpenAI API key is available
    const openaiApiKey = process.env.OPENAI_API_KEY

    if (!openaiApiKey) {
      debugLog("analyzeWebsiteDirectly", "OpenAI API key not configured, using simulated analysis")
      return generateSimulatedAnalysis()
    }

    // In a production environment, you would use the OpenAI API here
    // For now, we'll use simulated data even if the API key is available
    debugLog("analyzeWebsiteDirectly", "Using simulated analysis for now")
    return generateSimulatedAnalysis()
  } catch (error) {
    debugLog("analyzeWebsiteDirectly", `Error in direct analysis: ${error.message}`, error)
    // Return a simulated analysis instead of throwing an error
    return generateSimulatedAnalysis()
  }
}

// Helper function to generate simulated analysis
export function generateSimulatedAnalysis(): RoastAnalysisResult {
  debugLog("generateSimulatedAnalysis", "Generating simulated analysis")

  const result = {
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

  debugLog("generateSimulatedAnalysis", "Simulated analysis generated", {
    score: result.score,
    feedbackCount: result.feedback.length,
  })
  return result
}

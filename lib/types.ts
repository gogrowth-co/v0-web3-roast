// Main types for the Web3 ROAST application

export interface FeedbackItem {
  id?: string
  roast_id?: string
  category: string
  feedback: string
  severity: "high" | "medium" | "low"
}

export interface RoastAnalysisResult {
  score: number
  categoryScores: Record<string, number>
  feedback: FeedbackItem[]
  positives: string[]
}

export interface Roast {
  id: string
  url: string
  screenshot_url: string | null
  ai_analysis: RoastAnalysisResult | null
  expert_analysis: any | null
  status: "processing" | "completed" | "failed"
  score: number | null
  created_at: string
  completed_at: string | null
}

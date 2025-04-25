export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      roasts: {
        Row: {
          id: string
          url: string
          screenshot_url: string | null
          ai_analysis: Json | null
          expert_analysis: Json | null
          status: string
          score: number | null
          created_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          url: string
          screenshot_url?: string | null
          ai_analysis?: Json | null
          expert_analysis?: Json | null
          status: string
          score?: number | null
          created_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          url?: string
          screenshot_url?: string | null
          ai_analysis?: Json | null
          expert_analysis?: Json | null
          status?: string
          score?: number | null
          created_at?: string
          completed_at?: string | null
        }
      }
      feedback_items: {
        Row: {
          id: string
          roast_id: string
          category: string
          feedback: string
          severity: string
          created_at: string
        }
        Insert: {
          id?: string
          roast_id: string
          category: string
          feedback: string
          severity: string
          created_at?: string
        }
        Update: {
          id?: string
          roast_id?: string
          category?: string
          feedback?: string
          severity?: string
          created_at?: string
        }
      }
    }
  }
}

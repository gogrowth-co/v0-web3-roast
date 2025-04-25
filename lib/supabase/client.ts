import { createClient } from "@supabase/supabase-js"
import type { Database } from "../database.types"

// Create a singleton for client-side usage
let supabaseClient: ReturnType<typeof createBrowserSupabaseClient> | null = null

export function createBrowserSupabaseClient() {
  return createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
}

// Get the client-side supabase client
export function getSupabaseClient() {
  if (!supabaseClient) {
    supabaseClient = createBrowserSupabaseClient()
  }
  return supabaseClient
}

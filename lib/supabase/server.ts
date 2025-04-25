import { createClient } from "@supabase/supabase-js"
import type { Database } from "../database.types"

// Create a single supabase client for server-side usage
export function createServerSupabaseClient() {
  return createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
}

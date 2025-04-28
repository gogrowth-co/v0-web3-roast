import { createServerSupabaseClient } from "./server"

// Re-export the createServerSupabaseClient function
export { createServerSupabaseClient }

// Add a convenience function to get the server client
export function getSupabaseServerClient() {
  return createServerSupabaseClient()
}

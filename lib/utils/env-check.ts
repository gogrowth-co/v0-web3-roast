// Utility to check if required and optional environment variables are set
export function checkEnvVars(): {
  required: { isValid: boolean; missingVars: string[] }
  optional: { isValid: boolean; missingVars: string[] }
  allValid: boolean
} {
  // Required environment variables (without these, core functionality won't work)
  const requiredVars: string[] = [
    // None for MVP - we'll use fallbacks for everything
  ]

  // Optional environment variables (enhance functionality but not required)
  const optionalVars: string[] = ["APIFLASH_ACCESS_KEY", "OPENAI_API_KEY"]

  // Vercel deployment variables - not required for functionality
  const deploymentVars: string[] = ["VERCEL_REGION", "VERCEL_ENV"]

  const missingRequiredVars = requiredVars.filter((varName) => !process.env[varName])
  const missingOptionalVars = optionalVars.filter((varName) => !process.env[varName])
  const missingDeploymentVars = deploymentVars.filter((varName) => !process.env[varName])

  // Only log missing deployment vars, don't count them as errors
  if (missingDeploymentVars.length > 0) {
    console.log(`Missing deployment variables: ${missingDeploymentVars.join(", ")}`)
  }

  return {
    required: {
      isValid: missingRequiredVars.length === 0,
      missingVars: missingRequiredVars,
    },
    optional: {
      isValid: missingOptionalVars.length === 0,
      missingVars: missingOptionalVars,
    },
    allValid: missingRequiredVars.length === 0 && missingOptionalVars.length === 0,
  }
}

// Get a safe base URL for API requests - completely removed dependency on env vars
export function getSafeBaseUrl(): string {
  // Always use relative URLs for API requests
  // This ensures they work regardless of environment
  return ""
}

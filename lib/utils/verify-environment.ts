// Comprehensive environment verification utility

/**
 * Verifies all environment variables and provides detailed status
 */
export function verifyEnvironment() {
  // Core functionality variables
  const coreVars = {
    supabase: {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL,
      anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    },
  }

  // Enhanced functionality variables
  const enhancedVars = {
    openai: process.env.OPENAI_API_KEY,
    screenshot: process.env.SCREENSHOT_MACHINE_API_KEY,
  }

  // Deployment information
  const deploymentVars = {
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV,
    region: process.env.VERCEL_REGION,
  }

  // Check core variables
  const coreStatus = {
    supabase: {
      valid: !!coreVars.supabase.url && !!coreVars.supabase.anonKey && !!coreVars.supabase.serviceKey,
      missing: Object.entries(coreVars.supabase)
        .filter(([_, value]) => !value)
        .map(([key]) => key),
    },
  }

  // Check enhanced variables
  const enhancedStatus = {
    openai: !!enhancedVars.openai,
    screenshot: !!enhancedVars.screenshot,
  }

  // Overall status
  const isFullyFunctional = coreStatus.supabase.valid
  const hasEnhancedFeatures = enhancedStatus.openai && enhancedStatus.screenshot

  return {
    isFullyFunctional,
    hasEnhancedFeatures,
    coreStatus,
    enhancedStatus,
    deploymentVars,
    missingCoreVars: coreStatus.supabase.missing,
    missingEnhancedVars: Object.entries(enhancedStatus)
      .filter(([_, value]) => !value)
      .map(([key]) => key),
  }
}

/**
 * Logs environment status to console
 */
export function logEnvironmentStatus() {
  const status = verifyEnvironment()

  console.log("=== Environment Status ===")
  console.log(`Core Functionality: ${status.isFullyFunctional ? "✅ Available" : "❌ Limited"}`)
  console.log(`Enhanced Features: ${status.hasEnhancedFeatures ? "✅ Available" : "⚠️ Limited"}`)

  if (status.missingCoreVars.length > 0) {
    console.log(`Missing core variables: ${status.missingCoreVars.join(", ")}`)
  }

  if (status.missingEnhancedVars.length > 0) {
    console.log(`Missing enhanced feature variables: ${status.missingEnhancedVars.join(", ")}`)
  }

  console.log("Deployment:", status.deploymentVars)
  console.log("========================")

  return status
}

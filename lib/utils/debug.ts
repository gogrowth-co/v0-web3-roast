// Debug utility for tracking process flow
export function debugLog(area: string, message: string, data?: any) {
  console.log(`[${area}] ${message}`, data || "")
}

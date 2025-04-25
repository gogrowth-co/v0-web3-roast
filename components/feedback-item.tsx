import { AlertCircle, AlertTriangle, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface FeedbackItemProps {
  item: {
    id: string
    category: string
    feedback: string
    severity: string
  }
}

export function FeedbackItem({ item }: FeedbackItemProps) {
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "medium":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case "low":
        return <Info className="h-5 w-5 text-blue-500" />
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case "high":
        return "border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-900/10"
      case "medium":
        return "border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-900/10"
      case "low":
        return "border-blue-200 bg-blue-50 dark:border-blue-900/50 dark:bg-blue-900/10"
      default:
        return "border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900"
    }
  }

  return (
    <Card className={`${getSeverityClass(item.severity)}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          {getSeverityIcon(item.severity)}
          <CardTitle className="text-base">{item.category}</CardTitle>
        </div>
        <CardDescription>
          {item.severity === "high"
            ? "Critical issue - Fix immediately"
            : item.severity === "medium"
              ? "Important issue - Should be addressed"
              : "Minor issue - Consider improving"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{item.feedback}</p>
      </CardContent>
    </Card>
  )
}

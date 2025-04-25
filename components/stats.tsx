import { Card, CardContent } from "@/components/ui/card"

export function Stats() {
  return (
    <section className="py-12 border-y">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Card className="border-none shadow-none">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-purple-600">500+</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Web3 Projects Analyzed</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-none">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-purple-600">42%</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Avg. Conversion Increase</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-none">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-purple-600">24hr</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Avg. Implementation Time</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-none">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-purple-600">98%</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Client Satisfaction</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

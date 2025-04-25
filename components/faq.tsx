import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQ() {
  return (
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Frequently Asked Questions</h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Everything you need to know about Web3 ROAST.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl py-12">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What makes Web3 ROAST different from other analysis tools?</AccordionTrigger>
              <AccordionContent>
                Web3 ROAST is specifically designed for Web3 projects, with specialized analysis of blockchain
                terminology, technical explanations, and trust signals that are unique to the Web3 space. Our brutally
                honest approach cuts through the noise to give you actionable insights.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How long does the analysis take?</AccordionTrigger>
              <AccordionContent>
                The AI analysis is instant and provides immediate feedback. For the Expert Video Roast, you'll receive
                your detailed video breakdown within 48 hours of purchase.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is my project information kept confidential?</AccordionTrigger>
              <AccordionContent>
                Absolutely. All project information and analysis results are kept strictly confidential. We never share
                your data with third parties or use it for promotional purposes without explicit permission.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>What if I'm not satisfied with the analysis?</AccordionTrigger>
              <AccordionContent>
                We stand by our service with a satisfaction guarantee. If you're not satisfied with your Expert Video
                Roast, we'll refund your money. For the free AI analysis, we're always open to feedback to improve our
                service.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Can I get a roast for a project that's still in development?</AccordionTrigger>
              <AccordionContent>
                Yes! In fact, getting feedback early in the development process can save you significant time and
                resources. You can submit a staging URL or a design mockup for analysis.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  )
}

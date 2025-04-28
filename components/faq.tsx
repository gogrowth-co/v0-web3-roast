"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface FAQItemProps {
  question: string
  answer: string
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-gray-800">
      <button className="flex w-full items-center justify-between py-6 text-left" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center">
          <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#1a1a1a]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="#a78bfa"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.09 9.00001C9.3251 8.33167 9.78915 7.76811 10.4 7.40914C11.0108 7.05016 11.7289 6.91894 12.4272 7.03872C13.1255 7.15849 13.7588 7.52153 14.2151 8.06353C14.6713 8.60554 14.9211 9.29153 14.92 10C14.92 12 11.92 13 11.92 13"
                stroke="#a78bfa"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M12 17H12.01" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-lg font-medium">{question}</span>
        </div>
        <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="pb-6 pl-12 pr-6">
          <p className="text-gray-400">{answer}</p>
        </div>
      )}
    </div>
  )
}

export function FAQ() {
  const faqItems = [
    {
      question: "What makes Web3 ROAST different from general UX tools?",
      answer:
        "Web3 ROAST is specifically designed for Web3 projects, with specialized analysis of blockchain terminology, technical explanations, and trust signals that are unique to the Web3 space. Our brutally honest approach cuts through the noise to give you actionable insights.",
    },
    {
      question: "How accurate is the AI analysis?",
      answer:
        "Our AI has been trained on hundreds of Web3 landing pages and optimized specifically for the unique challenges of Web3 UX. While the AI provides excellent insights, our expert video roasts offer even deeper analysis from experienced Web3 conversion specialists.",
    },
    {
      question: "What do I receive with the free analysis?",
      answer:
        "The free analysis includes an AI-powered audit of your landing page with actionable recommendations, a full-page screenshot analysis, Web3-specific UX recommendations, and a technical assessment of your page's performance.",
    },
    {
      question: "Who performs the expert video roasts?",
      answer:
        "Our expert video roasts are performed by seasoned Web3 UX specialists and conversion rate optimization experts who have worked with leading projects in the space. Each expert has at least 5 years of experience in Web3 user experience design.",
    },
    {
      question: "How long does the expert video roast take?",
      answer:
        "We deliver expert video roasts within 48 hours of submission. The video itself is approximately 20 minutes long and includes detailed analysis and actionable recommendations for your Web3 project.",
    },
    {
      question: "Is my project information kept confidential?",
      answer:
        "Absolutely. All project information and analysis results are kept strictly confidential. We never share your data with third parties or use it for promotional purposes without explicit permission.",
    },
  ]

  return (
    <section id="faq" className="py-20 bg-[#121212]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">
          Frequently Asked <span className="text-[#a78bfa]">Questions</span>
        </h2>
        <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
          Everything you need to know about our Web3 landing page analysis service
        </p>

        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <FAQItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  )
}

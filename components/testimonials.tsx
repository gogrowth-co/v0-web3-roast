export function Testimonials() {
  return (
    <section className="py-20 bg-[#121212]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">
          What Web3 Projects <span className="text-[#a78bfa]">Say</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-[#1a1a1a] p-8 rounded-lg">
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            <p className="text-gray-300 mb-6">
              "The AI audit pinpointed exactly why our Web3 wallet wasn't converting. After implementing the
              suggestions, our sign-ups increased by 42%."
            </p>

            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-600 rounded-full mr-4"></div>
              <div>
                <div className="font-bold">Alex Chen</div>
                <div className="text-sm text-gray-400">Product Lead, MetaMask</div>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-[#1a1a1a] p-8 rounded-lg">
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            <p className="text-gray-300 mb-6">
              "Brutally honest feedback, but exactly what we needed. The expert video roast transformed how we explain
              our complex DeFi product."
            </p>

            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-600 rounded-full mr-4"></div>
              <div>
                <div className="font-bold">Sarah Johnson</div>
                <div className="text-sm text-gray-400">CMO, DefiPrime</div>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-[#1a1a1a] p-8 rounded-lg">
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            <p className="text-gray-300 mb-6">
              "Worth every penny. The expert caught UX issues our team had been debating for weeks and provided clear
              solutions."
            </p>

            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-600 rounded-full mr-4"></div>
              <div>
                <div className="font-bold">Michael Rodriguez</div>
                <div className="text-sm text-gray-400">Founder, NFT Marketplace</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

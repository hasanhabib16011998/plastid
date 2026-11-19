'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import PIALoader from '../../components/PIALoader/PIALoader'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'
import { faqItems } from '../../data/faqData'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="min-h-screen flex flex-col bg-alabaster">
      <PIALoader />
      <Header />

      <main className="flex-1">
        <Breadcrumb
          style="style2"
          title="Find Answers to Your Queries"
          subtitle="Customers FAQ's"
          bgImage="/images/resources/breadcrumb-bg-2.jpg"
          crumbs={[
            { label: 'Home', to: '/' },
            { label: "FAQ's" },
          ]}
        />

        <section className="py-20 bg-alabaster">
          <div className="container-pia max-w-4xl">
            <div className="space-y-4">
              {faqItems.map((item, i) => {
                const isOpen = openIndex === i
                return (
                  <div
                    key={i}
                    className={`rounded-lg bg-chalk border transition-colors overflow-hidden ${
                      isOpen ? 'border-bronze' : 'border-stone-border'
                    }`}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenIndex(isOpen ? -1 : i)}
                      className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-transparent border-0 cursor-pointer"
                    >
                      <h2 className="font-serif text-xl sm:text-2xl font-semibold text-obsidian m-0 leading-snug">
                        {item.question}
                      </h2>
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isOpen
                            ? 'bg-obsidian text-brass rotate-180'
                            : 'bg-bronze/12 text-bronze rotate-0'
                        }`}
                      >
                        <ChevronDown size={15} />
                      </span>
                    </button>
                    <div
                      className={`grid transition-all duration-300 ${
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-6 pb-6 pt-4 text-sm sm:text-[15px] text-ink leading-relaxed m-0 border-t border-stone-border">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  )
}

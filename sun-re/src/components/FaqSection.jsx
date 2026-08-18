import { useState, useRef } from 'react'
import { Plus, ChevronDown, HelpCircle, MessageSquare } from 'lucide-react'
import SectionHeader from './SectionHeader'

const defaultFaqs = [
  {
    category: 'Booking & Visits',
    q: 'How do I book a private site visit?',
    a: 'Simply fill out our enquiry form or contact our concierge team. We will arrange a private chauffeur-driven or scheduled viewing at your convenience within 24 to 48 hours.'
  },
  {
    category: 'Investment & Finance',
    q: 'What flexible payment plans are available?',
    a: 'We offer structured luxury payment schedules starting from a 20% down payment with easy interest-free EMIs spread across 3 to 7 years during construction phases.'
  },
  {
    category: 'Advisory',
    q: 'Do you offer personalized real estate investment advice?',
    a: 'Yes. Our dedicated Investment Advisory division provides bespoke market intelligence, high-yield ROI projections, and portfolio asset allocation strategies.'
  },
  {
    category: 'After-Sales',
    q: 'What is included in your after-sales care and warranty?',
    a: 'All Sun Real Estate developments come with a 10-year structural warranty, a dedicated personal relationship manager, complimentary annual home health checks, and 24/7 priority maintenance.'
  },
  {
    category: 'Legal & Title',
    q: 'Are all property titles and regulatory approvals fully verified?',
    a: 'Unconditionally yes. All project land titles, RAJUK/municipal approvals, and environmental clearances are 100% verified and available for legal inspection before any commitment.'
  }
]

export default function FaqSection({ items = defaultFaqs, title = 'Frequently Asked <span class="italic gold-text">Questions</span>', label = 'FAQ', className = '' }) {
  const [openIndex, setOpenIndex] = useState(0) // Default open first for great UX

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className={`section-py relative overflow-hidden ${className}`} style={{ background: '#0a0a09' }}>
      {/* Background ambient lighting */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none blur-[120px]" 
        style={{ background: 'radial-gradient(circle, var(--gold-mid) 0%, transparent 70%)' }}
      />

      <div className="container max-w-4xl mx-auto relative z-10">
        <SectionHeader center label={label} title={title} />

        <div className="flex flex-col gap-4 mt-8">
          {items.map((item, i) => {
            const isOpen = openIndex === i
            const numStr = (i + 1).toString().padStart(2, '0')

            return (
              <div
                key={i}
                className="faq-item transition-all duration-300"
                style={{
                  background: isOpen 
                    ? 'linear-gradient(135deg, rgba(200, 137, 26, 0.07) 0%, rgba(20, 20, 18, 0.95) 100%)' 
                    : 'rgba(17, 17, 16, 0.75)',
                  border: isOpen ? '1px solid rgba(200, 137, 26, 0.4)' : '1px solid rgba(200, 137, 26, 0.12)',
                  borderLeft: isOpen ? '3px solid var(--gold)' : '1px solid rgba(200, 137, 26, 0.12)',
                  boxShadow: isOpen ? '0 12px 35px -10px rgba(0, 0, 0, 0.5), 0 0 15px rgba(200, 137, 26, 0.08)' : 'none',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 md:p-7 text-left transition-colors duration-200 group"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    {/* Index Number */}
                    <span 
                      className="font-accent text-xs sm:text-sm tracking-widest shrink-0 transition-colors duration-300"
                      style={{ 
                        color: isOpen ? 'var(--gold)' : 'rgba(200, 137, 26, 0.45)',
                        fontWeight: 600 
                      }}
                    >
                      {numStr}
                    </span>

                    {/* Question text */}
                    <h3 
                      className="font-display text-base sm:text-lg md:text-xl font-medium tracking-wide transition-colors duration-300"
                      style={{ 
                        color: isOpen ? 'var(--text-primary)' : 'rgba(245, 240, 232, 0.85)'
                      }}
                    >
                      {item.q}
                    </h3>
                  </div>

                  {/* Icon Indicator with rotation animation */}
                  <div 
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300"
                    style={{
                      border: isOpen ? '1px solid var(--gold)' : '1px solid rgba(200, 137, 26, 0.25)',
                      background: isOpen ? 'rgba(200, 137, 26, 0.15)' : 'transparent'
                    }}
                  >
                    <Plus 
                      size={16} 
                      className="transition-transform duration-300 ease-out"
                      style={{ 
                        color: isOpen ? 'var(--gold-light)' : 'var(--gold-mid)',
                        transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)'
                      }} 
                    />
                  </div>
                </button>

                {/* Animated CSS Grid accordion container */}
                <div 
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 sm:px-6 md:px-7 pb-6 pt-1 sm:pl-16 md:pl-20 border-t border-dashed" style={{ borderColor: 'rgba(200, 137, 26, 0.1)' }}>
                      <p 
                        className="text-xs sm:text-sm md:text-base leading-relaxed md:leading-8 font-light"
                        style={{ color: 'rgba(245, 240, 232, 0.65)' }}
                      >
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Still have questions banner */}
        <div 
          className="mt-12 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{
            background: 'linear-gradient(135deg, rgba(200, 137, 26, 0.05) 0%, rgba(42, 45, 24, 0.25) 100%)',
            border: '1px solid rgba(200, 137, 26, 0.2)'
          }}
        >
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 hidden sm:flex"
              style={{ background: 'rgba(200, 137, 26, 0.12)', border: '1px solid rgba(200, 137, 26, 0.3)' }}
            >
              <MessageSquare size={20} style={{ color: 'var(--gold-mid)' }} />
            </div>
            <div>
              <h4 className="font-display text-lg sm:text-xl text-white font-medium">Still have questions?</h4>
              <p className="text-xs sm:text-sm font-light" style={{ color: 'rgba(245, 240, 232, 0.5)' }}>
                Our property specialists are available 24/7 to assist you.
              </p>
            </div>
          </div>
          <a 
            href="#contact-form" 
            onClick={(e) => {
              const formEl = document.querySelector('form')
              if (formEl) {
                e.preventDefault()
                formEl.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="btn-solid text-xs py-3 px-6 shrink-0"
          >
            Ask Concierge
          </a>
        </div>
      </div>
    </section>
  )
}

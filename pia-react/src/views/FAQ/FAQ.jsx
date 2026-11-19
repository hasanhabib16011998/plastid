'use client'

import { useState } from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import PIALoader from '../../components/PIALoader/PIALoader'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'
import { faqItems } from '../../data/faqData'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="boxed_wrapper">
      <PIALoader />
      <Header />

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

      <section className="faq-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="faq-content-box">
                <div className="accordion-box">
                  {faqItems.map((item, i) => (
                    <div key={i} className="accordion accordion-block">
                      <div
                        className={`accord-btn${openIndex === i ? ' active' : ''}`}
                        onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                      >
                        <h4>{item.question}</h4>
                        <div
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: openIndex === i ? '#C49B5D' : 'rgba(196, 155, 93, 0.12)',
                            color: openIndex === i ? '#000000' : '#C49B5D',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            marginLeft: '16px',
                            transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.35s ease, background 0.35s ease, color 0.35s ease',
                          }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </div>
                      </div>
                      <div
                        className="accord-content"
                        style={{
                          maxHeight: openIndex === i ? '500px' : '0',
                          overflow: 'hidden',
                          transition: 'max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                      >
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  )
}

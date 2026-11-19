'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Quote } from 'lucide-react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import PIALoader from '../../components/PIALoader/PIALoader'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'

export default function TestimonialsView({ initialTestimonials = [] }) {
  const [testimonials] = useState(initialTestimonials)
  const [error] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-alabaster">
      <PIALoader />
      <Header />

      <main className="flex-1">
        <Breadcrumb
          style="style2"
          title="Client Testimonials"
          subtitle="What Our Clients Say"
          bgImage="/images/resources/breadcrumb-bg-2.jpg"
          crumbs={[
            { label: 'Home', to: '/' },
            { label: 'Testimonials' },
          ]}
        />

        {/* Testimonials Grid Section */}
        <section className="py-20 bg-[#F9F8F3]">
          <div className="container-pia">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ochre-dark mb-2">
                Real Experiences &amp; Feedback
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-obsidian mb-4">
                Client <span className="text-brass">Reviews</span>
              </h2>
              <p className="text-sm sm:text-base text-ink leading-relaxed m-0">
                Discover how we&apos;ve helped homeowners, business owners, and developers transform
                their spaces into architectural masterpieces.
              </p>
            </div>

            {error || testimonials.length === 0 ? (
              <div className="text-center py-12 px-5 bg-white rounded-lg border border-[#EAE6DF] text-ink text-base max-w-xl mx-auto mb-10">
                {error
                  ? 'Something went wrong fetching the testimonials.'
                  : 'No testimonials published yet.'}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
                {testimonials.map((t, i) => (
                  <div
                    key={t.id || i}
                    className={`relative bg-white px-7 py-10 rounded-lg shadow-sm flex flex-col justify-between text-center ${
                      t.isFeatured ? 'border-2 border-brass' : 'border border-[#EAE6DF]'
                    }`}
                  >
                    {t.isFeatured && (
                      <span className="absolute top-4 right-4 bg-brass text-obsidian text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        Featured
                      </span>
                    )}

                    <div>
                      <div className="flex justify-center mb-5 text-brass">
                        <Quote size={32} />
                      </div>

                      <div className="flex justify-center mb-5">
                        <img
                          src={t.img || '/images/testimonial/user-placeholder.png'}
                          alt={t.name}
                          onError={(e) => {
                            e.currentTarget.onerror = null
                            e.currentTarget.src = '/images/testimonial/user-placeholder.png'
                          }}
                          className="w-22 h-22 object-cover rounded-full border-[3px] border-brass block"
                        />
                      </div>

                      <p className="text-ink text-[15px] leading-relaxed italic px-2 m-0">
                        &ldquo;{t.text}&rdquo;
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-dashed border-neutral-200">
                      <h3 className="text-lg font-bold text-obsidian mb-1">{t.name}</h3>
                      <span className="text-[13px] text-brass font-medium">{t.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Slogan / CTA Banner */}
        <section className="bg-obsidian py-14 border-y border-brass/30">
          <div className="container-pia">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-alabaster m-0">
                Ready to Transform Your Space with Our Expert Team?
              </h3>
              <Link className="btn-one shrink-0" href="/contact">
                Book a Consultation <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  )
}

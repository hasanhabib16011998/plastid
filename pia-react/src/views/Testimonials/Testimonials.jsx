'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import PIALoader from '../../components/PIALoader/PIALoader'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'

export default function TestimonialsView({ initialTestimonials = [] }) {
  const [testimonials] = useState(initialTestimonials)
  const [error] = useState(false)

  return (
    <div className="boxed_wrapper">
      <PIALoader />
      <Header />

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
      <section className="testimonial-area" style={{ padding: '90px 0 80px', background: '#F9F8F3' }}>
        <div className="container">
          <div className="sec-title text-center max-width" style={{ marginBottom: '50px' }}>
            <p>Real Experiences &amp; Feedback</p>
            <div className="title">Client <span>Reviews</span></div>
            <p className="bottom-text">Discover how we've helped homeowners, business owners, and developers transform their spaces into architectural masterpieces.</p>
          </div>

          {error || testimonials.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '50px 20px',
                background: '#ffffff',
                borderRadius: '8px',
                border: '1px solid #EAE6DF',
                color: '#666',
                fontSize: '16px',
                maxWidth: '600px',
                margin: '0 auto 40px',
              }}
            >
              {error ? 'Something went wrong fetching the testimonials.' : 'No testimonials published yet.'}
            </div>
          ) : (
            <div className="row">
              {testimonials.map((t, i) => (
                <div key={t.id || i} className="col-xl-4 col-lg-6 col-md-6 col-sm-12" style={{ marginBottom: '30px' }}>
                  <div
                    className="single-testimonial-item text-center"
                    style={{
                      background: '#ffffff',
                      padding: '40px 30px',
                      borderRadius: '8px',
                      boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
                      border: t.isFeatured ? '1.5px solid #C49B5D' : '1px solid #EAE6DF',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      position: 'relative',
                    }}
                  >
                    {t.isFeatured && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '15px',
                          right: '15px',
                          background: '#C49B5D',
                          color: '#1F2E23',
                          fontSize: '11px',
                          fontWeight: '700',
                          padding: '4px 10px',
                          borderRadius: '20px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                        }}
                      >
                        Featured
                      </span>
                    )}

                    <div>
                      <div className="quote-icon" style={{ marginBottom: '20px' }}>
                        <span className="icon-quote1" style={{ color: '#C49B5D', fontSize: '36px' }}></span>
                      </div>

                      <div className="img-box" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img
                          src={t.img || '/images/testimonial/user-placeholder.png'}
                          alt={t.name}
                          onError={(e) => {
                            e.currentTarget.onerror = null
                            e.currentTarget.src = '/images/testimonial/user-placeholder.png'
                          }}
                          style={{
                            width: '90px',
                            height: '90px',
                            objectFit: 'cover',
                            borderRadius: '50%',
                            border: '3px solid #C49B5D',
                            display: 'block',
                            margin: '0 auto',
                          }}
                        />
                      </div>

                      <div className="text-box" style={{ padding: '0 10px' }}>
                        <p style={{ color: '#555', fontSize: '15px', lineHeight: '1.7', fontStyle: 'italic' }}>
                          "{t.text}"
                        </p>
                      </div>
                    </div>

                    <div className="client-info" style={{ marginTop: '25px', borderTop: '1px dashed #eee', paddingTop: '15px' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1F2E23', marginBottom: '4px' }}>{t.name}</h3>
                      <span style={{ fontSize: '13px', color: '#C49B5D', fontWeight: '500' }}>{t.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Slogan / CTA Banner */}
      <section className="slogan-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="inner-content flex-box-two fix">
                <div className="title float-left">
                  <h3>Ready to Transform Your Space with Our Expert Team?</h3>
                </div>
                <div className="button float-right">
                  <Link className="btn-one" href="/contact">
                    Book a Consultation<span className="flaticon-next"></span>
                  </Link>
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

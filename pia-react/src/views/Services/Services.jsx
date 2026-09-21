'use client'

import Link from 'next/link'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import PIALoader from '../../components/PIALoader/PIALoader'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'

const services = [
  {
    slug: 'concept-designs',
    icon: 'icon-concept',
    title: 'Concept & 3D Design',
    text: 'We transform initial ideas into immersive 3D visualizations and mood boards, establishing a clear artistic vision and spatial direction for your project.',
    img: '/images/services/s1.jpg',
  },
  {
    slug: 'space-planning',
    icon: 'icon-productive',
    title: 'Space Planning & Layouts',
    text: 'Optimizing floor plans for seamless human flow, ergonomic comfort, and functional efficiency tailored to your daily lifestyle or business operations.',
    img: '/images/services/s6.jpg',
  },
  {
    slug: 'project-designs',
    icon: 'icon-scheme',
    title: 'Detailed Project Engineering',
    text: 'Delivering comprehensive technical drawings, material schedules, lighting plans, and specifications to ensure flawless construction execution.',
    img: '/images/services/s2.jpg',
  },
  {
    slug: 'make-overs',
    icon: 'icon-cupboard',
    title: 'Interior Renovations & Makeovers',
    text: 'Revitalizing existing spaces with high-end finishes, bespoke lighting, updated furniture, and curated decor with minimal structural disruption.',
    img: '/images/services/s3.jpg',
  },
  {
    slug: 'glass-wrought',
    icon: 'icon-architecture-and-city1',
    title: 'Architectural Metal & Glasswork',
    text: 'Designing and fabricating custom glass partitions, wrought iron accents, stair railings, and bespoke architectural features that elevate space luxury.',
    img: '/images/services/s5.jpg',
  },
  {
    slug: 'consulting',
    icon: 'icon-document',
    title: 'Turnkey Design Consulting',
    text: 'End-to-end guidance on material selection, contractor management, budgeting, and quality control from initial concept through final handover.',
    img: '/images/services/s4.jpg',
  },
]

export default function Services() {
  return (
    <div className="boxed_wrapper">
      <PIALoader />
      <Header />

      <Breadcrumb
        style="style2"
        title="Our Services"
        subtitle="What We Offer"
        bgImage="/images/resources/breadcrumb-bg-2.jpg"
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Services' },
        ]}
      />

      {/* Services Grid */}
      <section className="services-area" style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="row">
            {services.map((s, i) => (
              <div key={i} className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                <div className="single-service-style1" style={{ marginBottom: '40px' }}>
                  <div className="img-holder" style={{ overflow: 'hidden', borderRadius: '4px', marginBottom: '25px' }}>
                    <div style={{
                      height: '220px',
                      background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <span className={s.icon} style={{ fontSize: '60px', color: '#c8a96e' }}></span>
                    </div>
                  </div>
                  <div className="text-holder">
                    <h3 style={{ marginBottom: '12px', fontSize: '22px' }}>{s.title}</h3>
                    <p style={{ marginBottom: '20px', color: '#666' }}>{s.text}</p>
                    <Link className="btn-one" href={`/services/${s.slug}`}>
                      Read More<span className="flaticon-next"></span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="slogan-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="inner-content flex-box-two fix">
                <div className="title float-left">
                  <h3>Wanna Work With Our Professional Team? Make an Appointment.</h3>
                </div>
                <div className="button float-right">
                  <Link className="btn-one" href="/contact">Make an Appointment<span className="flaticon-next"></span></Link>
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

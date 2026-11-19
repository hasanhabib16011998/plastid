'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import PIALoader from '../../components/PIALoader/PIALoader'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'
import { serviceTree, serviceData, allServicesList } from '../../data/servicesData'

const commercialPillars = [
  {
    badge: 'Transparent Entry',
    value: 'BDT 40 / sq.ft',
    label: '3D Design & Space Planning',
    desc: 'Photorealistic 3D renders and 2D furniture layouts before any construction begins.',
  },
  {
    badge: 'Turnkey Advantage',
    value: '50% Rebate',
    label: 'Design Fee Refund Policy',
    desc: '50% of your 3D design fee is credited back upon turnkey project completion with us.',
  },
  {
    badge: 'Zero Hidden Costs',
    value: 'Itemized BOQ',
    label: 'Clear Material Specifications',
    desc: 'Line-by-line bill of quantities specifying exact board cores, finishes, and hardware.',
  },
  {
    badge: 'Single Accountability',
    value: 'On-Schedule',
    label: 'In-House Engineers & Factory',
    desc: 'Dedicated site engineers and factory-precision millwork for guaranteed handover dates.',
  },
]

export default function Services() {
  return (
    <div className="boxed_wrapper">
      <PIALoader />
      <Header />

      <Breadcrumb
        style="style2"
        title="Interior Design & Architectural Services"
        subtitle="Turnkey Solutions Tailored by Space"
        bgImage="/images/resources/breadcrumb-bg-2.jpg"
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Services' },
        ]}
      />

      {/* Services Overview Section */}
      <section className="services-area" style={{ padding: '85px 0 70px', background: '#F5F3ED' }}>
        <div className="container">
          {/* Editorial Section Header */}
          <div
            className="sec-title text-center"
            style={{ maxWidth: '780px', margin: '0 auto 44px' }}
          >
            <p style={{ letterSpacing: '0.16em', color: '#C49B5D', fontWeight: 600 }}>
              Architecture • Interior • Bespoke Execution
            </p>
            <h2
              className="title"
              style={{
                fontFamily: "var(--font-serif, 'Cormorant Garamond', Georgia, serif)",
                fontSize: 'clamp(32px, 4vw, 46px)',
                fontWeight: 600,
                lineHeight: 1.15,
                color: '#000000',
                textTransform: 'none',
                marginBottom: '16px',
              }}
            >
              Explore Our Services <span style={{ color: '#C49B5D', fontStyle: 'italic' }}>by Your Space</span>
            </h2>
            <p
              style={{
                marginTop: '12px',
                color: '#4A4A4A',
                fontSize: '15.5px',
                lineHeight: '1.75',
                textTransform: 'none',
                fontWeight: 400,
              }}
            >
              From newly handed-over residential apartments and multi-level villas to
              fast-track corporate headquarters, retail showrooms, and building facades—every
              Plastid project is engineered with photorealistic 3D clarity and itemized turnkey precision.
            </p>
          </div>

          {/* 4-Pillar Commercial Value Bar */}
          <div className="row d-flex flex-wrap" style={{ marginBottom: '48px' }}>
            {commercialPillars.map((pillar, idx) => (
              <div
                key={idx}
                className="col-xl-3 col-lg-6 col-md-6 col-sm-12 d-flex"
                style={{ marginBottom: '20px' }}
              >
                <div
                  style={{
                    width: '100%',
                    background: '#000000',
                    borderRadius: '8px',
                    border: '1px solid rgba(196, 155, 93, 0.38)',
                    padding: '22px 20px',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <span
                      style={{
                        display: 'inline-block',
                        fontSize: '10px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.14em',
                        color: '#C49B5D',
                        background: 'rgba(196, 155, 93, 0.14)',
                        border: '1px solid rgba(196, 155, 93, 0.3)',
                        padding: '3px 10px',
                        borderRadius: '20px',
                        marginBottom: '12px',
                      }}
                    >
                      {pillar.badge}
                    </span>
                    <div
                      style={{
                        fontFamily: "var(--font-serif, 'Cormorant Garamond', Georgia, serif)",
                        fontSize: '30px',
                        fontWeight: 600,
                        color: '#F5F3ED',
                        lineHeight: 1.1,
                        marginBottom: '4px',
                      }}
                    >
                      {pillar.value}
                    </div>
                    <h3
                      style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#C49B5D',
                        marginBottom: '8px',
                      }}
                    >
                      {pillar.label}
                    </h3>
                    <p
                      style={{
                        fontSize: '12.5px',
                        lineHeight: '1.6',
                        color: 'rgba(245, 243, 237, 0.78)',
                        margin: 0,
                      }}
                    >
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 6 Main Service Category Cards */}
          <div className="row d-flex flex-wrap">
            {serviceTree.map((branch, idx) => {
              const s = serviceData[branch.slug]
              if (!s) return null
              const hasChildren =
                Array.isArray(branch.children) && branch.children.length > 0
              const cardHighlights = !hasChildren && Array.isArray(s.highlights)
                ? s.highlights.slice(0, 4)
                : []

              return (
                <div
                  key={branch.slug}
                  className="col-xl-4 col-lg-6 col-md-6 col-sm-12 d-flex"
                  style={{ marginBottom: '34px' }}
                >
                  <article
                    className="single-service-style1"
                    style={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      background: '#ffffff',
                      borderRadius: '10px',
                      border: '1px solid rgba(196, 155, 93, 0.3)',
                      overflow: 'hidden',
                      boxShadow: '0 8px 28px rgba(0, 0, 0, 0.06)',
                      marginBottom: 0,
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-6px)'
                      e.currentTarget.style.borderColor = '#C49B5D'
                      e.currentTarget.style.boxShadow = '0 16px 38px rgba(0, 0, 0, 0.12)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.borderColor = 'rgba(196, 155, 93, 0.3)'
                      e.currentTarget.style.boxShadow = '0 8px 28px rgba(0, 0, 0, 0.06)'
                    }}
                  >
                    <div>
                      {/* Editorial Image Header with Badge & Icon Lockup */}
                      <Link
                        href={branch.to}
                        aria-label={`Explore ${s.title}`}
                        style={{
                          display: 'block',
                          position: 'relative',
                          height: '220px',
                          overflow: 'hidden',
                          background: '#000000',
                          borderBottom: '2px solid #C49B5D',
                        }}
                      >
                        <img
                          src={s.cardImg || s.mainImg}
                          alt={`${s.heroTitle} - Plastid Interior & Architecture`}
                          loading={idx < 3 ? 'eager' : 'lazy'}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                            filter: 'brightness(0.88) contrast(1.04)',
                            transition: 'transform 0.55s ease',
                          }}
                        />

                        {/* Dark Vignette Overlay */}
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background:
                              'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.12) 45%, rgba(0,0,0,0.78) 100%)',
                          }}
                        />

                        {/* Top-Left Scope Badge */}
                        <span
                          style={{
                            position: 'absolute',
                            top: '14px',
                            left: '16px',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            background: 'rgba(0, 0, 0, 0.75)',
                            backdropFilter: 'blur(8px)',
                            border: '1px solid rgba(196, 155, 93, 0.5)',
                            color: '#F5F3ED',
                            fontSize: '10.5px',
                            fontWeight: 600,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                          }}
                        >
                          {hasChildren
                            ? `${branch.children.length} Specialized Spaces`
                            : s.subtitle || 'Turnkey Specialty'}
                        </span>

                        {/* Top-Right Editorial Number */}
                        <span
                          style={{
                            position: 'absolute',
                            top: '10px',
                            right: '16px',
                            fontFamily: "var(--font-serif, 'Cormorant Garamond', Georgia, serif)",
                            fontSize: '32px',
                            fontWeight: 600,
                            lineHeight: 1,
                            color: 'rgba(245, 243, 237, 0.55)',
                          }}
                        >
                          {String(idx + 1).padStart(2, '0')}
                        </span>

                        {/* Bottom-Left Timeline Pill */}
                        {s.specs?.timeline && (
                          <span
                            style={{
                              position: 'absolute',
                              bottom: '14px',
                              left: '16px',
                              color: '#F5F3ED',
                              fontSize: '11.5px',
                              fontWeight: 500,
                              letterSpacing: '0.03em',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                            }}
                          >
                            <span
                              style={{
                                width: '7px',
                                height: '7px',
                                borderRadius: '50%',
                                background: '#C49B5D',
                                display: 'inline-block',
                              }}
                            />
                            {s.specs.timeline}
                          </span>
                        )}

                        {/* Bottom-Right Floating Glass Brass Icon Badge */}
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '12px',
                            right: '16px',
                            width: '46px',
                            height: '46px',
                            borderRadius: '10px',
                            background: 'rgba(0, 0, 0, 0.85)',
                            border: '1px solid #C49B5D',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 14px rgba(0,0,0,0.35)',
                          }}
                        >
                          <span
                            className={s.icon}
                            style={{ fontSize: '24px', color: '#C49B5D', lineHeight: 1 }}
                          />
                        </div>
                      </Link>

                      {/* Card Body */}
                      <div
                        className="text-holder"
                        style={{ padding: '24px 24px 16px' }}
                      >
                        <h3
                          style={{
                            marginBottom: '10px',
                            fontFamily: "var(--font-serif, 'Cormorant Garamond', Georgia, serif)",
                            fontSize: '26px',
                            fontWeight: 600,
                            lineHeight: 1.2,
                          }}
                        >
                          <Link
                            href={branch.to}
                            style={{ color: '#000000', textDecoration: 'none' }}
                          >
                            {s.title}
                          </Link>
                        </h3>
                        <p
                          style={{
                            marginBottom: '16px',
                            color: '#555',
                            fontSize: '14px',
                            lineHeight: '1.65',
                          }}
                        >
                          {s.shortText}
                        </p>

                        {/* Sub-Services Tree Links (for Residential & Commercial) */}
                        {hasChildren && (
                          <div
                            style={{
                              marginTop: '14px',
                              paddingTop: '14px',
                              borderTop: '1px solid rgba(196, 155, 93, 0.22)',
                            }}
                          >
                            <span
                              style={{
                                display: 'block',
                                fontSize: '11px',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                color: '#9F7838',
                                marginBottom: '10px',
                              }}
                            >
                              Select Specialized Space:
                            </span>
                            <div
                              style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '7px',
                              }}
                            >
                              {branch.children.map((child) => (
                                <Link
                                  key={child.slug}
                                  href={child.to}
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '6px 11px',
                                    borderRadius: '6px',
                                    background: '#FAF8F4',
                                    border: '1px solid rgba(196, 155, 93, 0.32)',
                                    fontSize: '12.5px',
                                    fontWeight: 600,
                                    color: '#1a1a1a',
                                    textDecoration: 'none',
                                    transition: 'all 0.2s ease',
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.background = '#000000'
                                    e.currentTarget.style.color = '#C49B5D'
                                    e.currentTarget.style.borderColor = '#000000'
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.background = '#FAF8F4'
                                    e.currentTarget.style.color = '#1a1a1a'
                                    e.currentTarget.style.borderColor = 'rgba(196, 155, 93, 0.32)'
                                  }}
                                >
                                  <span>{child.label}</span>
                                  <ChevronRight color='#C49B5D' size={14}/>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Core Deliverables List (for Standalone Specialties so all cards match in height & depth) */}
                        {!hasChildren && cardHighlights.length > 0 && (
                          <div
                            style={{
                              marginTop: '14px',
                              paddingTop: '14px',
                              borderTop: '1px solid rgba(196, 155, 93, 0.22)',
                            }}
                          >
                            <span
                              style={{
                                display: 'block',
                                fontSize: '11px',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                color: '#9F7838',
                                marginBottom: '8px',
                              }}
                            >
                              Key Deliverables:
                            </span>
                            <ul
                              style={{
                                listStyle: 'none',
                                padding: 0,
                                margin: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '6px',
                              }}
                            >
                              {cardHighlights.map((item, i) => (
                                <li
                                  key={i}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '8px',
                                    fontSize: '12.5px',
                                    lineHeight: '1.45',
                                    color: '#333',
                                  }}
                                >
                                  <span
                                    style={{
                                      color: '#C49B5D',
                                      fontWeight: 700,
                                      flexShrink: 0,
                                    }}
                                  >
                                    ✓
                                  </span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Footer Actions */}
                    <div style={{ padding: '12px 24px 24px' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '10px',
                          paddingTop: '12px',
                          borderTop: '1px solid #f0ece3',
                        }}
                      >
                        <Link
                          className="btn-one"
                          href={branch.to}
                          style={{
                            flex: 1,
                            width: '100%',
                            minHeight: '46px',
                            textAlign: 'center',
                            padding: '12px 14px',
                            fontSize: '11px',
                            letterSpacing: '1.2px',
                            gap: '8px',
                            lineHeight: 1.25,
                          }}
                        >
                          Explore {s.title}
                          <ChevronRight size={14} style={{ flexShrink: 0 }} />
                        </Link>
                      </div>
                    </div>
                  </article>
                </div>
              )
            })}
          </div>

          {/* Complete 15-Service Directory for Fast Navigation & Internal SEO Linking */}
          <div
            style={{
              marginTop: '30px',
              padding: '32px 30px',
              background: '#ffffff',
              borderRadius: '10px',
              border: '1px solid rgba(196, 155, 93, 0.32)',
              boxShadow: '0 6px 24px rgba(0, 0, 0, 0.04)',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                marginBottom: '20px',
                paddingBottom: '14px',
                borderBottom: '1px solid rgba(196, 155, 93, 0.2)',
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                    color: '#C49B5D',
                    display: 'block',
                    marginBottom: '4px',
                  }}
                >
                  Complete Service Index
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-serif, 'Cormorant Garamond', Georgia, serif)",
                    fontSize: '26px',
                    fontWeight: 600,
                    color: '#000000',
                    margin: 0,
                  }}
                >
                  All 15 Specialized Design &amp; Execution Services
                </h3>
              </div>
              <Link
                href="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#9F7838',
                  textDecoration: 'none',
                }}
              >
                Need help choosing? Speak with an Architect <ChevronRight size={14} />
              </Link>
            </div>

            <div className="row">
              {allServicesList.map((svc, i) => (
                <div
                  key={svc.slug}
                  className="col-xl-4 col-lg-4 col-md-6 col-sm-12"
                  style={{ marginBottom: '10px' }}
                >
                  <Link
                    href={`/services/${svc.slug}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      borderRadius: '6px',
                      background: '#FAF8F4',
                      border: '1px solid rgba(196, 155, 93, 0.22)',
                      textDecoration: 'none',
                      color: '#111',
                      fontSize: '13.5px',
                      fontWeight: 500,
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#000000'
                      e.currentTarget.style.color = '#F5F3ED'
                      e.currentTarget.style.borderColor = '#C49B5D'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#FAF8F4'
                      e.currentTarget.style.color = '#111'
                      e.currentTarget.style.borderColor = 'rgba(196, 155, 93, 0.22)'
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          color: '#C49B5D',
                          minWidth: '20px',
                        }}
                      >
                        {String(i + 1).padStart(2, '0')}.
                      </span>
                      <span>{svc.heroTitle}</span>
                    </span>
                    <ChevronRight color="#C49B5D" size={14} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Refined Architectural CTA Banner */}
      <section className="slogan-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="inner-content flex-box-two fix">
                <div className="title float-left">
                  <h3>
                    Planning a Residential or Commercial Project? Book a Free Architectural Consultation.
                  </h3>
                </div>
                <div className="button float-right">
                  <Link className="btn-one" href="/contact">
                    Book Free Consultation
                    <ChevronRight size={14} />
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

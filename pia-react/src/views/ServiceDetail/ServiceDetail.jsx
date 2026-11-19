'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import PIALoader from '../../components/PIALoader/PIALoader'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'
import {
  serviceTree,
  serviceData,
  getServiceBySlug,
  allServicesList,
} from '../../data/servicesData'

export default function ServiceDetail({ slugProp, initialProjects = [] }) {
  const params = useParams()
  const rawSlug = slugProp || params?.slug
  const service = getServiceBySlug(rawSlug) || serviceData['residential-interior']
  const activeSlug = service.slug

  const parentService = service.parentSlug ? serviceData[service.parentSlug] : null
  const currentBranch = serviceTree.find(
    (b) => b.slug === activeSlug || b.slug === service.parentSlug
  )
  const subServices =
    currentBranch?.slug === activeSlug && currentBranch?.children
      ? currentBranch.children.map((c) => serviceData[c.slug]).filter(Boolean)
      : []

  // Sibling services if viewing a child service
  const siblingServices =
    service.parentSlug && currentBranch?.children
      ? currentBranch.children
          .map((c) => serviceData[c.slug])
          .filter((s) => s && s.slug !== activeSlug)
      : []

  // Keep the relevant tree branch expanded in the sidebar
  const [expandedBranches, setExpandedBranches] = useState({
    'residential-interior': true,
    'commercial-interior': true,
  })

  // Interactive FAQ accordion state (first item open by default)
  const [openFaqIndex, setOpenFaqIndex] = useState(0)

  // Ref to auto-scroll active mobile pill into view
  const activePillRef = useRef(null)

  useEffect(() => {
    setOpenFaqIndex(0)
    if (service.parentSlug) {
      setExpandedBranches((prev) => ({ ...prev, [service.parentSlug]: true }))
    } else if (
      activeSlug === 'residential-interior' ||
      activeSlug === 'commercial-interior'
    ) {
      setExpandedBranches((prev) => ({ ...prev, [activeSlug]: true }))
    }

    // Center the active pill in the mobile horizontal scroll bar
    if (activePillRef.current) {
      try {
        activePillRef.current.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest',
        })
      } catch (_) {}
    }
  }, [activeSlug, service.parentSlug])

  const toggleBranch = (branchSlug, e) => {
    e.preventDefault()
    e.stopPropagation()
    setExpandedBranches((prev) => ({ ...prev, [branchSlug]: !prev[branchSlug] }))
  }

  // Filter relevant portfolio projects for this service
  const relatedProjects = (() => {
    if (!Array.isArray(initialProjects) || initialProjects.length === 0) return []
    const catLower = (service.category || '').toLowerCase()
    const matched = initialProjects.filter((p) => {
      const pCat = (p.category || '').toLowerCase()
      if (!catLower) return false
      if (catLower === 'residential') {
        return pCat.includes('residential') || pCat.includes('apartment') || pCat.includes('home')
      }
      if (catLower === 'commercial') {
        return pCat.includes('commercial') || pCat.includes('office') || pCat.includes('retail') || pCat.includes('restaurant')
      }
      return pCat.includes(catLower)
    })
    return (matched.length > 0 ? matched : initialProjects).slice(0, 3)
  })()

  // Specs with sensible defaults
  const specs = service.specs || {
    timeline: '4–10 Weeks Execution',
    designRate: 'BDT 40 / sq.ft (3D)',
    rebate: '50% Fee Refund on Build',
    scope: '100% Turnkey Execution',
  }

  const contactHref = `/contact?service=${encodeURIComponent(service.slug)}`

  // Breadcrumb trail reflecting tree hierarchy
  const crumbs = [
    { label: 'Home', to: '/' },
    { label: 'Services', to: '/services' },
    ...(parentService
      ? [{ label: parentService.title, to: `/services/${parentService.slug}` }]
      : []),
    { label: service.title },
  ]

  return (
    <div className="boxed_wrapper">
      <PIALoader />
      <Header />

      <Breadcrumb
        style="style2"
        title={service.heroTitle}
        subtitle={service.subtitle || 'Our Services'}
        bgImage="/images/resources/breadcrumb-bg-2.jpg"
        crumbs={crumbs}
      />

      {/* Single Service Area */}
      <section className="single-service-area" style={{ padding: '80px 0 90px', background: '#F5F3ED' }}>
        <div className="container">
          {/* Mobile Quick Service Selector Pill Bar (< 992px) */}
          <div
            className="d-block d-lg-none"
            style={{
              marginBottom: '26px',
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch',
              paddingBottom: '8px',
            }}
          >
            <div style={{ display: 'flex', gap: '8px' }}>
              {allServicesList.map((s) => {
                const isSelected = activeSlug === s.slug
                return (
                  <Link
                    key={s.slug}
                    ref={isSelected ? activePillRef : null}
                    href={`/services/${s.slug}`}
                    style={{
                      padding: '9px 18px',
                      borderRadius: '24px',
                      whiteSpace: 'nowrap',
                      fontSize: '13px',
                      fontWeight: 600,
                      background: isSelected ? '#C49B5D' : '#000000',
                      color: isSelected ? '#000000' : '#F5F3ED',
                      border: '1px solid #C49B5D',
                      textDecoration: 'none',
                      transition: 'all 0.25s ease',
                      flexShrink: 0,
                      boxShadow: isSelected
                        ? '0 4px 12px rgba(196, 155, 93, 0.35)'
                        : 'none',
                    }}
                  >
                    {s.title}
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="row">
            {/* Main Content (Appears FIRST on mobile, SECOND on desktop) */}
            <article className="col-xl-8 col-lg-7 col-md-12 col-sm-12 order-1 order-lg-2">
              {/* Hero Image + At-a-Glance Commercial Specs Card */}
              <div
                className="single-service-top"
                style={{
                  background: '#ffffff',
                  borderRadius: '10px',
                  border: '1px solid rgba(196, 155, 93, 0.28)',
                  overflow: 'hidden',
                  boxShadow: '0 8px 28px rgba(0, 0, 0, 0.05)',
                  marginBottom: '32px',
                }}
              >
                {/* Dedicated Service Hero Image */}
                <div
                  className="single-service-image-box"
                  style={{
                    position: 'relative',
                    height: '380px',
                    overflow: 'hidden',
                    background: '#000000',
                  }}
                >
                  <img
                    src={service.mainImg}
                    alt={`${service.heroTitle} - Plastid Interior & Architecture Dhaka`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, transparent 50%, rgba(0,0,0,0.72) 100%)',
                    }}
                  />

                  {/* Category / Parent Breadcrumb Pill Overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '18px',
                      left: '20px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '6px 14px',
                      borderRadius: '24px',
                      background: 'rgba(0, 0, 0, 0.78)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(196, 155, 93, 0.5)',
                      fontSize: '11.5px',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: '#C49B5D',
                    }}
                  >
                    <span className={service.icon} style={{ fontSize: '14px' }} />
                    <span>{parentService ? parentService.title : service.subtitle}</span>
                  </div>

                  {/* Direct Quick-Consult Button on Hero Image */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '18px',
                      right: '20px',
                    }}
                  >
                    <Link
                      href={contactHref}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 18px',
                        borderRadius: '6px',
                        background: '#C49B5D',
                        color: '#000000',
                        fontSize: '12px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        textDecoration: 'none',
                        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.4)',
                      }}
                    >
                      <span>Book Consultation for {service.title}</span>
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>

                {/* At-a-Glance Commercial Specs Strip */}
                <div
                  style={{
                    background: '#000000',
                    borderTop: '2px solid #C49B5D',
                    borderBottom: '1px solid rgba(196, 155, 93, 0.25)',
                    padding: '16px 22px',
                  }}
                >
                  <div className="row">
                    {[
                      { label: 'Typical Timeline', value: specs.timeline },
                      { label: '3D Design Rate', value: specs.designRate },
                      { label: 'Turnkey Benefit', value: specs.rebate },
                      { label: 'Execution Scope', value: specs.scope },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="col-xl-3 col-lg-6 col-md-6 col-6"
                        style={{
                          paddingTop: '6px',
                          paddingBottom: '6px',
                          borderRight:
                            i < 3 ? '1px solid rgba(196, 155, 93, 0.18)' : 'none',
                        }}
                      >
                        <span
                          style={{
                            display: 'block',
                            fontSize: '10px',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.12em',
                            color: 'rgba(245, 243, 237, 0.6)',
                            marginBottom: '3px',
                          }}
                        >
                          {item.label}
                        </span>
                        <span
                          style={{
                            display: 'block',
                            fontSize: '13.5px',
                            fontWeight: 700,
                            color: '#C49B5D',
                          }}
                        >
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Editorial Overview Copy */}
                <div className="text" style={{ padding: '32px 30px 30px' }}>
                  {parentService && (
                    <div style={{ marginBottom: '10px' }}>
                      <Link
                        href={`/services/${parentService.slug}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '12px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          color: '#9F7838',
                          textDecoration: 'none',
                        }}
                      >
                        <span>← Back to {parentService.title}</span>
                      </Link>
                    </div>
                  )}

                  <h2
                    style={{
                      fontFamily: "var(--font-serif, 'Cormorant Garamond', Georgia, serif)",
                      fontSize: 'clamp(26px, 3vw, 34px)',
                      lineHeight: 1.22,
                      fontWeight: 600,
                      color: '#000000',
                      textTransform: 'none',
                      marginBottom: '16px',
                    }}
                  >
                    {service.h2Title || service.heroTitle}
                  </h2>

                  <div className="inner" style={{ paddingTop: 0 }}>
                    <p
                      style={{
                        lineHeight: '1.8',
                        color: '#333',
                        marginBottom: '16px',
                        fontSize: '15.5px',
                      }}
                    >
                      {service.description1}
                    </p>
                    <p
                      style={{
                        lineHeight: '1.8',
                        color: '#4A4A4A',
                        fontSize: '15px',
                        marginBottom: 0,
                      }}
                    >
                      {service.description2}
                    </p>
                  </div>
                </div>
              </div>

              {/* If viewing a Parent Branch (Residential or Commercial), display its Sub-Services Grid */}
              {subServices.length > 0 && (
                <div
                  style={{
                    marginBottom: '32px',
                    padding: '28px 28px 14px',
                    background: '#ffffff',
                    borderRadius: '10px',
                    border: '1px solid rgba(196, 155, 93, 0.32)',
                    boxShadow: '0 6px 24px rgba(0,0,0,0.04)',
                  }}
                >
                  <div style={{ marginBottom: '20px' }}>
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
                      Specialized Solutions
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
                      Explore {service.title} Categories
                    </h3>
                  </div>
                  <div className="row d-flex flex-wrap">
                    {subServices.map((sub) => (
                      <div
                        key={sub.slug}
                        className="col-xl-6 col-lg-6 col-md-6 col-sm-12 d-flex"
                        style={{ marginBottom: '16px' }}
                      >
                        <Link
                          href={`/services/${sub.slug}`}
                          style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            padding: '20px 22px',
                            background: '#FAF8F4',
                            borderRadius: '8px',
                            border: '1px solid rgba(196, 155, 93, 0.28)',
                            textDecoration: 'none',
                            transition: 'all 0.25s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#C49B5D'
                            e.currentTarget.style.transform = 'translateY(-3px)'
                            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.07)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(196, 155, 93, 0.28)'
                            e.currentTarget.style.transform = 'translateY(0)'
                            e.currentTarget.style.boxShadow = 'none'
                          }}
                        >
                          <div>
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: '8px',
                              }}
                            >
                              <h4
                                style={{
                                  fontFamily: "var(--font-serif, 'Cormorant Garamond', Georgia, serif)",
                                  fontSize: '21px',
                                  fontWeight: 600,
                                  color: '#000000',
                                  margin: 0,
                                }}
                              >
                                {sub.title}
                              </h4>
                              <span
                                className={sub.icon}
                                style={{ fontSize: '22px', color: '#C49B5D' }}
                              />
                            </div>
                            <p
                              style={{
                                fontSize: '13.5px',
                                lineHeight: '1.6',
                                color: '#555',
                                margin: '0 0 12px',
                              }}
                            >
                              {sub.shortText}
                            </p>
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              paddingTop: '10px',
                              borderTop: '1px solid rgba(196, 155, 93, 0.18)',
                            }}
                          >
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                fontSize: '11.5px',
                                fontWeight: 700,
                                color: '#9F7838',
                                textTransform: 'uppercase',
                                letterSpacing: '0.08em',
                              }}
                            >
                              View Scope &amp; Process <ChevronRight size={14} />
                            </span>
                            {sub.specs?.timeline && (
                              <span style={{ fontSize: '11px', color: '#777' }}>
                                {sub.specs.timeline}
                              </span>
                            )}
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* What We Deliver / Key Deliverables Checklist */}
              {service.highlights && service.highlights.length > 0 && (
                <div
                  style={{
                    marginBottom: '32px',
                    padding: '28px 30px',
                    background: '#ffffff',
                    borderRadius: '10px',
                    border: '1px solid rgba(196, 155, 93, 0.28)',
                    boxShadow: '0 6px 24px rgba(0,0,0,0.04)',
                  }}
                >
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
                    Scope of Work
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--font-serif, 'Cormorant Garamond', Georgia, serif)",
                      fontSize: '26px',
                      fontWeight: 600,
                      color: '#000000',
                      marginBottom: '18px',
                    }}
                  >
                    What We Deliver in {service.title}
                  </h3>
                  <div className="row">
                    {service.highlights.map((item, idx) => (
                      <div
                        key={idx}
                        className="col-xl-6 col-lg-6 col-md-6 col-12"
                        style={{ marginBottom: '12px' }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '12px',
                            padding: '12px 14px',
                            borderRadius: '6px',
                            background: '#FAF8F4',
                            border: '1px solid rgba(196, 155, 93, 0.2)',
                            height: '100%',
                          }}
                        >
                          <span
                            style={{
                              width: '22px',
                              height: '22px',
                              borderRadius: '50%',
                              background: 'rgba(196, 155, 93, 0.18)',
                              color: '#9F7838',
                              fontWeight: 700,
                              fontSize: '12px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                              marginTop: '1px',
                            }}
                          >
                            ✓
                          </span>
                          <span
                            style={{
                              fontSize: '14px',
                              lineHeight: '1.5',
                              color: '#222',
                              fontWeight: 500,
                            }}
                          >
                            {item}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Always-Visible Architectural Advantage Cards (Fixes Hover-Only Mobile Bug) */}
              {service.advantages && service.advantages.length > 0 && (
                <div style={{ marginBottom: '32px' }}>
                  <div style={{ marginBottom: '16px' }}>
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
                      The Plastid Advantage
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
                      Why Clients Trust Us for {service.title}
                    </h3>
                  </div>

                  <div className="row d-flex flex-wrap">
                    {service.advantages.map((adv, i) => (
                      <div
                        key={i}
                        className="col-xl-6 col-lg-6 col-md-6 col-sm-12 d-flex"
                        style={{ marginBottom: '16px' }}
                      >
                        <div
                          style={{
                            width: '100%',
                            padding: '22px 22px',
                            borderRadius: '8px',
                            background: '#ffffff',
                            border: '1px solid rgba(196, 155, 93, 0.28)',
                            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '16px',
                          }}
                        >
                          <div
                            style={{
                              width: '48px',
                              height: '48px',
                              borderRadius: '10px',
                              background: '#000000',
                              border: '1px solid #C49B5D',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            <span
                              className={adv.icon}
                              style={{ fontSize: '24px', color: '#C49B5D', lineHeight: 1 }}
                            />
                          </div>
                          <div>
                            <h4
                              style={{
                                fontSize: '16px',
                                fontWeight: 700,
                                color: '#000000',
                                marginBottom: '6px',
                                lineHeight: 1.3,
                              }}
                            >
                              {String(adv.title).replace(/\n/g, ' ')}
                            </h4>
                            <p
                              style={{
                                fontSize: '13.5px',
                                lineHeight: '1.6',
                                color: '#555',
                                margin: 0,
                              }}
                            >
                              {adv.text}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Architectural 5-Step Execution Timeline (Replaces Generic Stock Photo) */}
              <div
                className="how-we-work"
                style={{
                  marginBottom: '32px',
                  padding: '30px 30px',
                  background: '#ffffff',
                  borderRadius: '10px',
                  border: '1px solid rgba(196, 155, 93, 0.28)',
                  boxShadow: '0 6px 24px rgba(0,0,0,0.04)',
                }}
              >
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
                  Step-by-Step Methodology
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-serif, 'Cormorant Garamond', Georgia, serif)",
                    marginBottom: '8px',
                    fontSize: '26px',
                    fontWeight: 600,
                    color: '#000000',
                  }}
                >
                  How We Execute {service.title}
                </h3>
                <p
                  style={{
                    color: '#555',
                    lineHeight: 1.7,
                    marginBottom: '22px',
                    fontSize: '14.5px',
                  }}
                >
                  Our milestone-driven turnkey workflow ensures your{' '}
                  {service.title.toLowerCase()} project is engineered with zero guesswork,
                  itemized cost control, and on-schedule delivery.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {(service.processSteps || []).map((step, i) => {
                    const isObj = typeof step === 'object' && step !== null
                    const stepTitle = isObj ? step.title : step
                    const stepDuration = isObj ? step.duration : null
                    const stepDesc = isObj ? step.desc : null

                    return (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '16px',
                          padding: '16px 18px',
                          borderRadius: '8px',
                          background: '#FAF8F4',
                          border: '1px solid rgba(196, 155, 93, 0.22)',
                        }}
                      >
                        <div
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '8px',
                            background: '#000000',
                            border: '1px solid #C49B5D',
                            color: '#C49B5D',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontFamily: "var(--font-serif, 'Cormorant Garamond', Georgia, serif)",
                            fontSize: '18px',
                            fontWeight: 600,
                            flexShrink: 0,
                          }}
                        >
                          0{i + 1}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              display: 'flex',
                              flexWrap: 'wrap',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: '8px',
                              marginBottom: stepDesc ? '4px' : 0,
                            }}
                          >
                            <h4
                              style={{
                                fontSize: '15.5px',
                                fontWeight: 700,
                                color: '#000000',
                                margin: 0,
                              }}
                            >
                              {stepTitle}
                            </h4>
                            {stepDuration && (
                              <span
                                style={{
                                  fontSize: '11px',
                                  fontWeight: 600,
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.08em',
                                  color: '#9F7838',
                                  background: 'rgba(196, 155, 93, 0.15)',
                                  padding: '3px 10px',
                                  borderRadius: '14px',
                                }}
                              >
                                {stepDuration}
                              </span>
                            )}
                          </div>
                          {stepDesc && (
                            <p
                              style={{
                                fontSize: '13.5px',
                                lineHeight: '1.6',
                                color: '#555',
                                margin: 0,
                              }}
                            >
                              {stepDesc}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* 50% 3D Design Fee Rebate Commercial Highlight Box */}
                <div
                  style={{
                    marginTop: '20px',
                    padding: '20px 22px',
                    borderRadius: '8px',
                    background: '#000000',
                    border: '1px solid #C49B5D',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                  }}
                >
                  <div style={{ flex: '1 1 320px' }}>
                    <span
                      style={{
                        fontSize: '10.5px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.14em',
                        color: '#C49B5D',
                        display: 'block',
                        marginBottom: '4px',
                      }}
                    >
                      ★ Commercial Guarantee
                    </span>
                    <h4
                      style={{
                        fontFamily: "var(--font-serif, 'Cormorant Garamond', Georgia, serif)",
                        fontSize: '20px',
                        fontWeight: 600,
                        color: '#F5F3ED',
                        margin: '0 0 4px',
                      }}
                    >
                      Start with 3D Visualization at BDT 40/sq.ft — Get 50% Refunded on Build
                    </h4>
                    <p
                      style={{
                        fontSize: '13px',
                        lineHeight: '1.6',
                        color: 'rgba(245, 243, 237, 0.8)',
                        margin: 0,
                      }}
                    >
                      See every detail of your {service.title.toLowerCase()} in photorealistic 3D
                      before committing to construction.{' '}
                      {activeSlug !== '3d-and-design-consultancy' && (
                        <Link
                          href="/services/3d-and-design-consultancy"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '2px',
                            color: '#C49B5D',
                            textDecoration: 'underline',
                          }}
                        >
                          Learn about 3D Consultancy <ChevronRight size={14} />
                        </Link>
                      )}
                    </p>
                  </div>
                  <Link
                    href={contactHref}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '11px 20px',
                      borderRadius: '6px',
                      background: '#C49B5D',
                      color: '#000000',
                      fontSize: '12px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Book Site Visit <ChevronRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Related Portfolio Projects Section (Connects Service to Real Proof) */}
              {relatedProjects.length > 0 && (
                <div
                  style={{
                    marginBottom: '32px',
                    padding: '28px 30px',
                    background: '#ffffff',
                    borderRadius: '10px',
                    border: '1px solid rgba(196, 155, 93, 0.28)',
                    boxShadow: '0 6px 24px rgba(0,0,0,0.04)',
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
                        Executed Portfolio
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
                        Featured Completed Works
                      </h3>
                    </div>
                    <Link
                      href="/projects"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '12.5px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: '#9F7838',
                        textDecoration: 'none',
                      }}
                    >
                      View All Projects <ChevronRight size={14} />
                    </Link>
                  </div>

                  <div className="row d-flex flex-wrap">
                    {relatedProjects.map((proj, idx) => (
                      <div
                        key={proj.id || idx}
                        className="col-xl-4 col-lg-6 col-md-6 col-sm-12 d-flex"
                        style={{ marginBottom: '16px' }}
                      >
                        <Link
                          href={`/projects/${proj.slug || proj.id}`}
                          style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            background: '#FAF8F4',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            border: '1px solid rgba(196, 155, 93, 0.25)',
                            textDecoration: 'none',
                            transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)'
                            e.currentTarget.style.boxShadow = '0 10px 24px rgba(0,0,0,0.08)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)'
                            e.currentTarget.style.boxShadow = 'none'
                          }}
                        >
                          <div style={{ height: '160px', overflow: 'hidden', background: '#000' }}>
                            <img
                              src={proj.img}
                              alt={proj.title}
                              loading="lazy"
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: 'block',
                              }}
                            />
                          </div>
                          <div style={{ padding: '14px 16px' }}>
                            <span
                              style={{
                                display: 'block',
                                fontSize: '10.5px',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                color: '#C49B5D',
                                marginBottom: '4px',
                              }}
                            >
                              {proj.category}
                            </span>
                            <h4
                              style={{
                                fontSize: '15px',
                                fontWeight: 700,
                                color: '#000000',
                                margin: '0 0 6px',
                                lineHeight: 1.35,
                              }}
                            >
                              {proj.title}
                            </h4>
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                fontSize: '12px',
                                fontWeight: 600,
                                color: '#9F7838',
                              }}
                            >
                              View Case Study <ChevronRight size={14} />
                            </span>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Interactive Accessible FAQ Accordion (SEO-Friendly DOM Rendering) */}
              {service.faqs && service.faqs.length > 0 && (
                <div
                  style={{
                    marginBottom: '28px',
                    padding: '28px 30px',
                    background: '#ffffff',
                    borderRadius: '10px',
                    border: '1px solid rgba(196, 155, 93, 0.28)',
                    boxShadow: '0 6px 24px rgba(0,0,0,0.04)',
                  }}
                >
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
                    Client Questions Answered
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--font-serif, 'Cormorant Garamond', Georgia, serif)",
                      marginBottom: '18px',
                      fontSize: '26px',
                      fontWeight: 600,
                      color: '#000000',
                    }}
                  >
                    Frequently Asked Questions About {service.title}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {service.faqs.map((faq, idx) => {
                      const isOpen = openFaqIndex === idx
                      return (
                        <div
                          key={idx}
                          style={{
                            borderRadius: '8px',
                            background: isOpen ? '#FAF8F4' : '#ffffff',
                            border: isOpen
                              ? '1px solid #C49B5D'
                              : '1px solid rgba(196, 155, 93, 0.25)',
                            overflow: 'hidden',
                            transition: 'all 0.25s ease',
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                            aria-expanded={isOpen}
                            style={{
                              width: '100%',
                              padding: '16px 20px',
                              background: 'transparent',
                              border: 'none',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: '14px',
                              textAlign: 'left',
                              cursor: 'pointer',
                            }}
                          >
                            <h4
                              style={{
                                fontSize: '15.5px',
                                fontWeight: 700,
                                color: '#000000',
                                margin: 0,
                                lineHeight: 1.4,
                              }}
                            >
                              {faq.q}
                            </h4>
                            <span
                              style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                background: isOpen ? '#000000' : 'rgba(196, 155, 93, 0.14)',
                                color: isOpen ? '#C49B5D' : '#000000',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '16px',
                                fontWeight: 700,
                                flexShrink: 0,
                                transition: 'all 0.2s ease',
                              }}
                            >
                              {isOpen ? '−' : '+'}
                            </span>
                          </button>
                          <div
                            style={{
                              display: isOpen ? 'block' : 'none',
                              padding: '0 20px 18px',
                              borderTop: '1px solid rgba(196, 155, 93, 0.15)',
                              paddingTop: '12px',
                            }}
                          >
                            <p
                              style={{
                                fontSize: '14px',
                                lineHeight: '1.7',
                                color: '#4A4A4A',
                                margin: 0,
                              }}
                            >
                              {faq.a}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Related Sibling Services Links (If viewing a Child Sub-Service) */}
              {siblingServices.length > 0 && (
                <div
                  style={{
                    padding: '22px 26px',
                    background: '#ffffff',
                    borderRadius: '10px',
                    border: '1px solid rgba(196, 155, 93, 0.25)',
                  }}
                >
                  <span
                    style={{
                      display: 'block',
                      fontSize: '11px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: '#9F7838',
                      marginBottom: '12px',
                    }}
                  >
                    More in {parentService?.title}:
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {siblingServices.map((sib) => (
                      <Link
                        key={sib.slug}
                        href={`/services/${sib.slug}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '8px 14px',
                          borderRadius: '6px',
                          background: '#FAF8F4',
                          border: '1px solid rgba(196, 155, 93, 0.3)',
                          color: '#000000',
                          fontSize: '13px',
                          fontWeight: 600,
                          textDecoration: 'none',
                        }}
                      >
                        {sib.title} <ChevronRight size={14} />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* Sidebar (Appears SECOND on mobile, FIRST on desktop) */}
            <aside
              className="col-xl-4 col-lg-5 col-md-12 col-sm-12 order-2 order-lg-1"
            >
              <div className="single-service-sidebar">
                {/* Hierarchical Tree Services Navigation */}
                <div
                  className="single-sidebar"
                  style={{
                    background: '#000000',
                    borderRadius: '10px',
                    border: '1px solid rgba(196, 155, 93, 0.38)',
                    padding: '24px 20px',
                    marginBottom: '28px',
                    boxShadow: '0 8px 28px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingBottom: '14px',
                      marginBottom: '14px',
                      borderBottom: '1px solid rgba(196, 155, 93, 0.25)',
                    }}
                  >
                    <h3
                      style={{
                        fontSize: '15px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: '#C49B5D',
                        margin: 0,
                      }}
                    >
                      All Services
                    </h3>
                    <Link
                      href="/services"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '12px',
                        color: 'rgba(245, 243, 237, 0.75)',
                        textDecoration: 'none',
                      }}
                    >
                      Overview <ChevronRight size={14} />
                    </Link>
                  </div>

                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {serviceTree.map((branch) => {
                      const hasChildren =
                        Array.isArray(branch.children) &&
                        branch.children.length > 0
                      const isBranchActive = activeSlug === branch.slug
                      const isChildActive =
                        hasChildren &&
                        branch.children.some((c) => c.slug === activeSlug)
                      const isExpanded = !!expandedBranches[branch.slug]

                      return (
                        <li
                          key={branch.slug}
                          style={{
                            marginBottom: '7px',
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              borderRadius: '6px',
                              background: isBranchActive
                                ? '#C49B5D'
                                : isChildActive
                                  ? 'rgba(196, 155, 93, 0.16)'
                                  : 'rgba(255, 255, 255, 0.04)',
                              border:
                                isBranchActive || isChildActive
                                  ? '1px solid rgba(196, 155, 93, 0.6)'
                                  : '1px solid rgba(255, 255, 255, 0.08)',
                              transition: 'all 0.2s ease',
                            }}
                          >
                            <Link
                              href={branch.to}
                              style={{
                                flex: 1,
                                padding: '11px 14px',
                                color: isBranchActive ? '#000000' : '#F5F3ED',
                                fontWeight: isBranchActive || isChildActive ? 700 : 500,
                                fontSize: '14px',
                                textDecoration: 'none',
                                display: 'block',
                              }}
                            >
                              {branch.label}
                            </Link>
                            {hasChildren && (
                              <button
                                type="button"
                                onClick={(e) => toggleBranch(branch.slug, e)}
                                aria-label={`Toggle ${branch.label} sub-services`}
                                style={{
                                  background: 'transparent',
                                  border: 'none',
                                  color: isBranchActive ? '#000000' : '#C49B5D',
                                  padding: '10px 14px',
                                  cursor: 'pointer',
                                  fontSize: '12px',
                                }}
                              >
                                <i
                                  className={`fa fa-chevron-${isExpanded ? 'up' : 'down'}`}
                                  aria-hidden="true"
                                />
                              </button>
                            )}
                          </div>

                          {hasChildren && isExpanded && (
                            <ul
                              style={{
                                listStyle: 'none',
                                padding: '6px 0 4px 14px',
                                margin: '4px 0 6px 12px',
                                borderLeft: '2px solid rgba(196, 155, 93, 0.35)',
                              }}
                            >
                              {branch.children.map((child) => {
                                const isSubSelected = activeSlug === child.slug
                                return (
                                  <li
                                    key={child.slug}
                                    style={{ marginBottom: '4px' }}
                                  >
                                    <Link
                                      href={child.to}
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        padding: '8px 12px',
                                        borderRadius: '5px',
                                        fontSize: '13px',
                                        fontWeight: isSubSelected ? 700 : 400,
                                        background: isSubSelected
                                          ? '#C49B5D'
                                          : 'transparent',
                                        color: isSubSelected
                                          ? '#000000'
                                          : 'rgba(245, 243, 237, 0.82)',
                                        textDecoration: 'none',
                                        transition: 'all 0.2s ease',
                                      }}
                                    >
                                      <span
                                        style={{
                                          width: '5px',
                                          height: '5px',
                                          borderRadius: '50%',
                                          background: isSubSelected
                                            ? '#000000'
                                            : '#C49B5D',
                                          flexShrink: 0,
                                        }}
                                      />
                                      <span>{child.label}</span>
                                    </Link>
                                  </li>
                                )
                              })}
                            </ul>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </div>

                {/* Direct Architect Consultation Card */}
                <div
                  className="sidebar-contact-box text-center"
                  style={{
                    borderRadius: '10px',
                    overflow: 'hidden',
                    border: '1px solid rgba(196, 155, 93, 0.38)',
                    paddingBottom: 0,
                    marginBottom: '24px',
                  }}
                >
                  <div className="inner-content" style={{ padding: '38px 28px 36px' }}>
                    <div className="icon-holder" style={{ paddingBottom: '16px' }}>
                      <span className="icon-support1" />
                    </div>
                    <h3 style={{ fontSize: '20px', lineHeight: '28px', marginBottom: '16px' }}>
                      Plan Your {service.title} <br /> With Our Architects
                    </h3>
                    <p
                      style={{
                        fontSize: '13px',
                        lineHeight: '1.6',
                        color: 'rgba(245, 243, 237, 0.78)',
                        marginBottom: '18px',
                      }}
                    >
                      Get a free initial site discussion, space layout advice, and an itemized budget estimate.
                    </p>
                    <div className="bottom-box" style={{ paddingTop: '20px' }}>
                      <h2>
                        <a
                          href="tel:+8801768834417"
                          style={{ color: '#C49B5D', textDecoration: 'none' }}
                        >
                          +880 1768834417
                        </a>
                      </h2>
                      <span style={{ fontSize: '13px', opacity: 0.85 }}>
                        Email:{' '}
                        <a
                          href="mailto:plastidarchitecture@gmail.com"
                          style={{ color: 'inherit', textDecoration: 'none' }}
                        >
                          plastidarchitecture@gmail.com
                        </a>
                      </span>
                    </div>
                    <div className="button" style={{ paddingTop: '24px' }}>
                      <Link className="btn-one" href={contactHref}>
                        Book Free Consultation
                        <ChevronRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Honest Rate Card & Sample BOQ Request Card (Replaces Fake PDF Download) */}
                <div
                  className="single-sidebar"
                  style={{
                    background: '#ffffff',
                    borderRadius: '10px',
                    border: '1px solid rgba(196, 155, 93, 0.38)',
                    padding: '20px 22px',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                  }}
                >
                  <span
                    style={{
                      display: 'block',
                      fontSize: '10.5px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: '#9F7838',
                      marginBottom: '4px',
                    }}
                  >
                    Transparent Pricing
                  </span>
                  <h4
                    style={{
                      fontFamily: "var(--font-serif, 'Cormorant Garamond', Georgia, serif)",
                      fontSize: '20px',
                      fontWeight: 600,
                      color: '#000000',
                      margin: '0 0 8px',
                    }}
                  >
                    Request a Sample BOQ &amp; Rate Card
                  </h4>
                  <p
                    style={{
                      fontSize: '13px',
                      lineHeight: '1.55',
                      color: '#555',
                      margin: '0 0 14px',
                    }}
                  >
                    Want to compare material tiers (HPL, Acrylic, Veneer, PU) for your{' '}
                    {service.title.toLowerCase()}? Request a tailored cost breakdown.
                  </p>
                  <Link
                    href={contactHref}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      borderRadius: '6px',
                      background: '#000000',
                      border: '1px solid #C49B5D',
                      color: '#C49B5D',
                      fontSize: '12px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      textDecoration: 'none',
                    }}
                  >
                    <span>Request Estimate &amp; BOQ</span>
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="slogan-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="inner-content flex-box-two fix">
                <div className="title float-left">
                  <h3>
                    Ready to Start Your {service.title} Project? Book a Free
                    Consultation.
                  </h3>
                </div>
                <div className="button float-right">
                  <Link className="btn-one" href={contactHref}>
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

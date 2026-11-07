'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
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

export default function ServiceDetail({ slugProp }) {
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

  // Keep the relevant tree branch expanded in the sidebar
  const [expandedBranches, setExpandedBranches] = useState({
    'residential-interior': true,
    'commercial-interior': true,
  })

  useEffect(() => {
    if (service.parentSlug) {
      setExpandedBranches((prev) => ({ ...prev, [service.parentSlug]: true }))
    } else if (activeSlug === 'residential-interior' || activeSlug === 'commercial-interior') {
      setExpandedBranches((prev) => ({ ...prev, [activeSlug]: true }))
    }
  }, [activeSlug, service.parentSlug])

  const toggleBranch = (branchSlug, e) => {
    e.preventDefault()
    e.stopPropagation()
    setExpandedBranches((prev) => ({ ...prev, [branchSlug]: !prev[branchSlug] }))
  }

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
      <section className="single-service-area">
        <div className="container">
          {/* Mobile Quick Service Selector Pill Bar (< 992px) */}
          <div
            className="d-block d-lg-none"
            style={{
              marginBottom: '24px',
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch',
              paddingBottom: '6px',
            }}
          >
            <div style={{ display: 'flex', gap: '8px' }}>
              {allServicesList.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '24px',
                    whiteSpace: 'nowrap',
                    fontSize: '13px',
                    fontWeight: 600,
                    background: activeSlug === s.slug ? '#C49B5D' : '#000000',
                    color: activeSlug === s.slug ? '#000000' : '#F5F3ED',
                    border: '1px solid #C49B5D',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                    flexShrink: 0,
                    boxShadow:
                      activeSlug === s.slug
                        ? '0 4px 12px rgba(196, 155, 93, 0.35)'
                        : 'none',
                  }}
                >
                  {s.title}
                </Link>
              ))}
            </div>
          </div>

          <div className="row">
            {/* Main Content (Appears FIRST on mobile, SECOND on desktop) */}
            <article className="col-xl-8 col-lg-7 col-md-12 col-sm-12 order-1 order-lg-2">
              {/* Service Image + Description */}
              <div className="single-service-top">
                <div
                  className="single-service-image-box"
                  style={{ borderRadius: '8px', overflow: 'hidden', position: 'relative' }}
                >
                  <img
                    src={service.mainImg}
                    alt={`${service.heroTitle} - Plastid Interior & Architecture`}
                    style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                  />
                </div>
                <div className="text">
                  {parentService && (
                    <div style={{ marginBottom: '8px' }}>
                      <Link
                        href={`/services/${parentService.slug}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '12px',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          color: '#C49B5D',
                          textDecoration: 'none',
                        }}
                      >
                        <span>{parentService.title}</span>
                        <span>›</span>
                        <span style={{ color: '#666' }}>{service.title}</span>
                      </Link>
                    </div>
                  )}
                  <h2>{service.heroTitle}</h2>
                  <div className="inner">
                    <p
                      style={{
                        lineHeight: '1.75',
                        color: '#444',
                        marginBottom: '14px',
                        fontSize: '15.5px',
                      }}
                    >
                      {service.description1}
                    </p>
                    <p
                      style={{
                        lineHeight: '1.75',
                        color: '#555',
                        fontSize: '15px',
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
                    marginTop: '30px',
                    marginBottom: '30px',
                    padding: '26px',
                    background: '#FAF8F4',
                    borderRadius: '8px',
                    border: '1px solid rgba(196, 155, 93, 0.3)',
                  }}
                >
                  <div style={{ marginBottom: '18px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        color: '#C49B5D',
                        display: 'block',
                        marginBottom: '4px',
                      }}
                    >
                      Specialized Solutions
                    </span>
                    <h3
                      style={{
                        fontSize: '21px',
                        fontWeight: 700,
                        color: '#000000',
                        margin: 0,
                      }}
                    >
                      Explore {service.title} Categories
                    </h3>
                  </div>
                  <div className="row">
                    {subServices.map((sub) => (
                      <div
                        key={sub.slug}
                        className="col-xl-6 col-lg-6 col-md-6 col-sm-12"
                        style={{ marginBottom: '16px' }}
                      >
                        <Link
                          href={`/services/${sub.slug}`}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            height: '100%',
                            padding: '18px 20px',
                            background: '#ffffff',
                            borderRadius: '6px',
                            border: '1px solid rgba(196, 155, 93, 0.25)',
                            textDecoration: 'none',
                            transition: 'all 0.25s ease',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
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
                                  fontSize: '16px',
                                  fontWeight: 700,
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
                                fontSize: '13px',
                                lineHeight: '1.55',
                                color: '#666',
                                margin: '0 0 10px',
                              }}
                            >
                              {sub.shortText}
                            </p>
                          </div>
                          <span
                            style={{
                              fontSize: '12px',
                              fontWeight: 600,
                              color: '#C49B5D',
                              textTransform: 'uppercase',
                              letterSpacing: '0.06em',
                            }}
                          >
                            Explore Service →
                          </span>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* What's Included / Key Deliverables */}
              {service.highlights && service.highlights.length > 0 && (
                <div
                  style={{
                    marginTop: '24px',
                    marginBottom: '26px',
                    padding: '24px 26px',
                    background: '#ffffff',
                    borderRadius: '8px',
                    border: '1px solid rgba(196, 155, 93, 0.25)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '19px',
                      fontWeight: 700,
                      color: '#000000',
                      marginBottom: '14px',
                    }}
                  >
                    What We Deliver in {service.title}
                  </h3>
                  <div className="row">
                    {service.highlights.map((item, idx) => (
                      <div
                        key={idx}
                        className="col-xl-6 col-lg-6 col-md-6 col-12"
                        style={{ marginBottom: '10px' }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '10px',
                          }}
                        >
                          <span
                            style={{
                              color: '#C49B5D',
                              fontWeight: 700,
                              fontSize: '14px',
                              lineHeight: '1.5',
                              flexShrink: 0,
                            }}
                          >
                            ✓
                          </span>
                          <span
                            style={{
                              fontSize: '14px',
                              lineHeight: '1.55',
                              color: '#333',
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

              {/* Advantages Boxes (2 cols on mobile, 4 cols on desktop) */}
              <div className="advantages-content" style={{ marginTop: '20px' }}>
                <div className="row">
                  {service.advantages.map((adv, i) => (
                    <div
                      key={i}
                      className="col-xl-3 col-lg-6 col-md-6 col-6"
                      style={{ marginBottom: '15px' }}
                    >
                      <div
                        className="single-advantages-box"
                        style={{
                          height: '100%',
                          borderRadius: '6px',
                          background: '#fff',
                          border: '1px solid rgba(196, 155, 93, 0.25)',
                        }}
                      >
                        <div className="inner" style={{ padding: '20px 10px' }}>
                          <div className="static-content">
                            <div
                              className="icon-holder"
                              style={{ marginBottom: '10px' }}
                            >
                              <span
                                className={adv.icon}
                                style={{ fontSize: '36px', color: '#C49B5D' }}
                              />
                            </div>
                            <div className="title">
                              <h3
                                style={{
                                  whiteSpace: 'pre-line',
                                  fontSize: '14px',
                                  lineHeight: '1.3',
                                  fontWeight: 600,
                                  color: '#000000',
                                }}
                              >
                                {adv.title}
                              </h3>
                            </div>
                          </div>
                          <div className="overlay-text">
                            <div className="box">
                              <div className="inner-text">
                                <p style={{ fontSize: '12px', lineHeight: '1.4' }}>
                                  {adv.text}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* How We Work */}
              <div className="how-we-work" style={{ marginTop: '35px' }}>
                <h3
                  style={{
                    marginBottom: '18px',
                    fontSize: '22px',
                    fontWeight: 700,
                    color: '#000000',
                  }}
                >
                  How We Execute {service.title}
                </h3>
                <div className="row align-items-center">
                  <div
                    className="col-xl-6 col-lg-6 col-md-12"
                    style={{ marginBottom: '20px' }}
                  >
                    <img
                      src="/images/services/service-single/how-work.jpg"
                      alt={`How We Work - ${service.title}`}
                      style={{
                        width: '100%',
                        borderRadius: '8px',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                      }}
                    />
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-12">
                    <div>
                      <p
                        style={{
                          color: '#666',
                          lineHeight: 1.7,
                          marginBottom: '15px',
                          fontSize: '14px',
                        }}
                      >
                        Our structured turnkey process guarantees your{' '}
                        {service.title.toLowerCase()} project is delivered on
                        schedule, within budget, and to uncompromising architectural
                        standards.
                      </p>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {(
                          service.processSteps || [
                            'Initial Consultation & Discovery',
                            'Concept Development',
                            'Design Refinement & Approval',
                            'Project Execution',
                            'Quality Review & Handover',
                          ]
                        ).map((step, i) => (
                          <li
                            key={i}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px',
                              padding: '10px 0',
                              borderBottom: '1px solid #eee',
                            }}
                          >
                            <span
                              style={{
                                width: '26px',
                                height: '26px',
                                borderRadius: '50%',
                                background: '#C49B5D',
                                color: '#000000',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '12px',
                                fontWeight: '700',
                                flexShrink: 0,
                              }}
                            >
                              {i + 1}
                            </span>
                            <span
                              style={{
                                color: '#333',
                                fontSize: '13.5px',
                                fontWeight: 500,
                              }}
                            >
                              {step}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service-Specific FAQ Section (Boosts SEO & Answers Client Questions) */}
              {service.faqs && service.faqs.length > 0 && (
                <div style={{ marginTop: '38px' }}>
                  <h3
                    style={{
                      marginBottom: '18px',
                      fontSize: '21px',
                      fontWeight: 700,
                      color: '#000000',
                    }}
                  >
                    Frequently Asked Questions
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {service.faqs.map((faq, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: '18px 22px',
                          borderRadius: '8px',
                          background: '#FAF8F4',
                          border: '1px solid rgba(196, 155, 93, 0.25)',
                        }}
                      >
                        <h4
                          style={{
                            fontSize: '15.5px',
                            fontWeight: 700,
                            color: '#000000',
                            marginBottom: '6px',
                          }}
                        >
                          {faq.q}
                        </h4>
                        <p
                          style={{
                            fontSize: '14px',
                            lineHeight: '1.65',
                            color: '#555',
                            margin: 0,
                          }}
                        >
                          {faq.a}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* Sidebar (Appears SECOND on mobile, FIRST on desktop) */}
            <aside
              className="col-xl-4 col-lg-5 col-md-12 col-sm-12 order-2 order-lg-1"
              style={{ marginTop: '25px' }}
            >
              <div className="single-service-sidebar">
                {/* Hierarchical Tree Services Navigation */}
                <div
                  className="single-sidebar"
                  style={{
                    background: '#000000',
                    borderRadius: '8px',
                    border: '1px solid rgba(196, 155, 93, 0.35)',
                    padding: '22px 18px',
                    marginBottom: '30px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingBottom: '14px',
                      marginBottom: '12px',
                      borderBottom: '1px solid rgba(196, 155, 93, 0.25)',
                    }}
                  >
                    <h3
                      style={{
                        fontSize: '16px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: '#C49B5D',
                        margin: 0,
                      }}
                    >
                      Our Services
                    </h3>
                    <Link
                      href="/services"
                      style={{
                        fontSize: '12px',
                        color: 'rgba(245, 243, 237, 0.7)',
                        textDecoration: 'none',
                      }}
                    >
                      View All
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
                            marginBottom: '6px',
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
                                  : '1px solid rgba(255, 255, 255, 0.07)',
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

                {/* Contact Box */}
                <div
                  className="sidebar-contact-box text-center"
                  style={{ borderRadius: '8px', overflow: 'hidden' }}
                >
                  <div className="inner-content">
                    <div className="icon-holder">
                      <span className="icon-support1" />
                    </div>
                    <h3>
                      Consult with expert &<br /> Start today
                    </h3>
                    <div className="bottom-box">
                      <h2>
                        <a
                          href="tel:+8801768834417"
                          style={{ color: 'inherit', textDecoration: 'none' }}
                        >
                          +880 1768834417
                        </a>
                      </h2>
                      <span>
                        Email:{' '}
                        <a
                          href="mailto:plastidarchitecture@gmail.com"
                          style={{ color: 'inherit', textDecoration: 'none' }}
                        >
                          plastidarchitecture@gmail.com
                        </a>
                      </span>
                    </div>
                    <div className="button">
                      <Link className="btn-one" href="/contact">
                        Make Appointment
                        <span className="flaticon-next" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Download Brochure */}
                <div className="single-sidebar">
                  <ul className="service-pack-download">
                    <li className="clearfix">
                      <div className="title-holder">
                        <a href="/contact">
                          Request Portfolio.PDF <span>(Brochure)</span>
                        </a>
                      </div>
                      <div className="icon-holder">
                        <i className="fa fa-download" aria-hidden="true" />
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>
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
                  <h3>
                    Ready to Start Your {service.title} Project? Book a Free
                    Consultation.
                  </h3>
                </div>
                <div className="button float-right">
                  <Link className="btn-one" href="/contact">
                    Make an Appointment
                    <span className="flaticon-next" />
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

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import PIALoader from '../../components/PIALoader/PIALoader'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'
import { getPIAProjects } from '../../lib/payload'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')
  const [activeCardId, setActiveCardId] = useState(null)
  const router = useRouter()

  useEffect(() => {
    async function loadProjects() {
      try {
        const cmsProjects = await getPIAProjects()
        setProjects(cmsProjects || [])
      } catch (err) {
        console.error('Failed to load projects from Payload CMS:', err)
        setProjects([])
      } finally {
        setLoading(false)
      }
    }
    loadProjects()
  }, [])

  // Build dynamic categories based on available projects
  const categoryTags = Array.from(new Set(projects.map((p) => p.tag).filter(Boolean)))
  const filters = ['all', ...categoryTags]

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.tag === activeFilter)

  const handleCardClick = (e, p) => {
    const targetId = p.slug || p.id
    // If click was on View Details button, navigate directly
    if (e.target.closest('.view-details-btn')) {
      router.push(`/projects/${targetId}`)
      return
    }

    // Toggle card overlay on tap/click
    if (activeCardId === p.id) {
      router.push(`/projects/${targetId}`)
    } else {
      setActiveCardId(p.id)
    }
  }

  return (
    <div className="boxed_wrapper">
      <PIALoader />
      <Header />

      <Breadcrumb
        style="style2"
        title="Signature Projects & Portfolio"
        subtitle="Our Projects"
        bgImage="/images/resources/breadcrumb-bg-2.jpg"
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Projects' },
        ]}
      />

      <section className="main-project-area">
        <div className="container">
          {/* Filter Tabs */}
          <div className="mixitup-filter text-center" style={{ marginBottom: '40px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '10px',
                padding: '4px 0',
              }}
            >
              {filters.map((f) => {
                const isActive = activeFilter === f
                return (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    style={{
                      padding: '10px 24px',
                      borderRadius: '30px',
                      border: isActive ? '2px solid #C49B5D' : '2px solid rgba(196, 155, 93, 0.3)',
                      background: isActive ? '#C49B5D' : '#1F2E23',
                      color: isActive ? '#1F2E23' : '#F5F3ED',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      outline: 'none',
                      boxShadow: isActive
                        ? '0 4px 14px rgba(196, 155, 93, 0.4)'
                        : '0 2px 8px rgba(0, 0, 0, 0.1)',
                      textTransform: 'capitalize',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {f === 'all' ? 'All Projects' : f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="row">
            {filtered.map((p) => {
              const isSelected = activeCardId === p.id
              return (
                <div key={p.id} className="col-xl-4 col-lg-4 col-md-6 col-6" style={{ marginBottom: '24px' }}>
                  <div
                    onClick={(e) => handleCardClick(e, p)}
                    className={`single-project-card ${isSelected ? 'is-active' : ''}`}
                    style={{
                      borderRadius: '8px',
                      overflow: 'hidden',
                      height: '100%',
                      cursor: 'pointer',
                      position: 'relative',
                    }}
                  >
                    <div
                      className="img-holder"
                      style={{
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: '8px',
                        height: '260px',
                        background: '#1F2E23',
                      }}
                    >
                      <img
                        src={p.img}
                        alt={p.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.5s ease',
                          transform: isSelected ? 'scale(1.08)' : 'scale(1)',
                        }}
                      />

                      {/* Default title bar (visible when overlay is inactive) */}
                      <div
                        className="title-box"
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background: 'linear-gradient(to top, rgba(31, 46, 35, 0.95) 0%, rgba(31, 46, 35, 0.6) 60%, transparent 100%)',
                          padding: '24px 14px 12px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'flex-end',
                          opacity: isSelected ? 0 : 1,
                          transition: 'opacity 0.35s ease',
                          pointerEvents: isSelected ? 'none' : 'auto',
                        }}
                      >
                        <span style={{ color: '#C49B5D', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
                          {p.category}
                        </span>
                        <h3 style={{ color: '#F5F3ED', fontSize: '15px', fontWeight: 600, margin: '3px 0 0', lineHeight: '1.3' }}>
                          {p.title}
                        </h3>
                      </div>

                      {/* Tap / Hover Overlay Box */}
                      <div
                        className="project-tap-overlay"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'rgba(31, 46, 35, 0.92)',
                          backdropFilter: 'blur(6px)',
                          WebkitBackdropFilter: 'blur(6px)',
                          border: '1.5px solid #C49B5D',
                          borderRadius: '8px',
                          padding: '20px 16px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          opacity: isSelected ? 1 : 0,
                          visibility: isSelected ? 'visible' : 'hidden',
                          transition: 'all 0.35s cubic-bezier(0.23, 1, 0.32, 1)',
                          zIndex: 2,
                        }}
                      >
                        <div>
                          <span
                            style={{
                              background: 'rgba(196, 155, 93, 0.15)',
                              color: '#C49B5D',
                              padding: '3px 10px',
                              borderRadius: '12px',
                              fontSize: '10px',
                              fontWeight: 700,
                              letterSpacing: '1px',
                              textTransform: 'uppercase',
                              display: 'inline-block',
                              marginBottom: '8px',
                            }}
                          >
                            {p.category}
                          </span>
                          <h3
                            style={{
                              color: '#F5F3ED',
                              fontSize: '16px',
                              fontWeight: 600,
                              margin: '0 0 8px 0',
                              lineHeight: '1.3',
                            }}
                          >
                            {p.title}
                          </h3>
                          <p
                            style={{
                              color: 'rgba(245, 243, 237, 0.85)',
                              fontSize: '12px',
                              lineHeight: '1.4',
                              margin: 0,
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {p.summary}
                          </p>
                        </div>

                        <div>
                          <button
                            className="view-details-btn"
                            onClick={(e) => {
                              e.stopPropagation()
                              router.push(`/projects/${p.slug || p.id}`)
                            }}
                            style={{
                              width: '100%',
                              padding: '10px 16px',
                              fontSize: '13px',
                              fontWeight: 700,
                              justifyContent: 'center',
                              borderRadius: '20px',
                              background: '#C49B5D',
                              color: '#1F2E23',
                              border: 'none',
                              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '8px',
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em',
                            }}
                          >
                            Details <span className="flaticon-next" style={{ fontSize: '11px', color: '#1F2E23' }} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
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
                  <h3>Have a Project in Mind? Let's Discuss It.</h3>
                </div>
                <div className="button float-right">
                  <Link className="btn-one" href="/contact">Contact Us<span className="flaticon-next"></span></Link>
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

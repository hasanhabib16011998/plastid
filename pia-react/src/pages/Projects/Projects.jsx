import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import PIALoader from '../../components/PIALoader/PIALoader'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'

const allProjects = [
  { id: 1, img: '/images/projects/lat-pro-1.jpg', category: 'Residential', title: 'Modern Living Room', tag: 'residential', summary: 'Bespoke living room transformation with custom lighting and Italian marble.' },
  { id: 2, img: '/images/projects/lat-pro-2.jpg', category: 'Commercial', title: 'Office Partition Walls', tag: 'commercial', summary: 'Acoustic glass partition systems maximizing natural light and privacy.' },
  { id: 3, img: '/images/projects/lat-pro-3.jpg', category: 'Residential', title: 'Master Bedroom Suite', tag: 'residential', summary: 'Luxury master suite featuring custom teak woodwork and ambient lighting.' },
  { id: 4, img: '/images/projects/lat-pro-4.jpg', category: 'Commercial', title: 'Corporate Reception', tag: 'commercial', summary: 'High-impact reception area reflecting modern brand identity and elegance.' },
  { id: 5, img: '/images/projects/lat-pro-5.jpg', category: 'Residential', title: 'Kitchen Renovation', tag: 'residential', summary: 'Ergonomic modular kitchen design with premium marble countertops.' },
  { id: 6, img: '/images/projects/v1-1.jpg', category: 'Residential', title: 'Luxury Apartment', tag: 'residential', summary: 'Full turnkey apartment interior blending modern aesthetic with comfort.' },
  { id: 7, img: '/images/projects/v1-2.jpg', category: 'Commercial', title: 'Restaurant Interior', tag: 'commercial', summary: 'Boutique dining atmosphere with tailored seating and mood lighting.' },
  { id: 8, img: '/images/projects/v1-3.jpg', category: 'Industrial', title: 'Factory Renovation', tag: 'industrial', summary: 'Optimized industrial workspace enhancing workflow efficiency.' },
  { id: 9, img: '/images/projects/v1-4.jpg', category: 'Residential', title: 'Dining Area Design', tag: 'residential', summary: 'Warm family dining space with handcrafted teak furnishings.' },
  { id: 10, img: '/images/projects/v1-5.jpg', category: 'Commercial', title: 'Boutique Hotel Lobby', tag: 'commercial', summary: 'Opulent hotel entrance design crafting unforgettable first impressions.' },
  { id: 11, img: '/images/projects/v1-6.jpg', category: 'Residential', title: 'Home Study Room', tag: 'residential', summary: 'Quiet, ergonomic home office space designed for focus and productivity.' },
  { id: 12, img: '/images/projects/v1-7.jpg', category: 'Industrial', title: 'Warehouse Office', tag: 'industrial', summary: 'Modern administrative hub integrated within industrial facility.' },
]

const filters = ['all', 'residential', 'commercial', 'industrial']

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [activeCardId, setActiveCardId] = useState(null)
  const navigate = useNavigate()

  const filtered = activeFilter === 'all'
    ? allProjects
    : allProjects.filter(p => p.tag === activeFilter)

  const handleCardClick = (e, p) => {
    // If click was on View Details button, navigate directly
    if (e.target.closest('.view-details-btn')) {
      navigate(`/projects/${p.id}`)
      return
    }

    // Toggle card overlay on tap/click
    if (activeCardId === p.id) {
      navigate(`/projects/${p.id}`)
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
        title="More than 2300 Projects"
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
                              fontSize: '12.5px',
                              lineHeight: '1.5',
                              margin: 0,
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
                              navigate(`/projects/${p.id}`)
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
                  <Link className="btn-one" to="/contact">Contact Us<span className="flaticon-next"></span></Link>
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

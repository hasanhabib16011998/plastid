'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import PIALoader from '../../components/PIALoader/PIALoader'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'
import { getPIAProjectByIdOrSlug } from '../../lib/payload'

export default function ProjectSingle() {
  const params = useParams()
  const idOrSlug = params?.id

  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  // Lightbox Frame state for Desktop & Full Preview
  const [lightboxIndex, setLightboxIndex] = useState(null)

  // Mobile Carousel state
  const [mobileSlide, setMobileSlide] = useState(0)
  const touchStartXRef = useRef(null)
  const touchEndXRef = useRef(null)

  useEffect(() => {
    async function loadProject() {
      if (!idOrSlug) {
        setLoading(false)
        return
      }
      try {
        const cmsProject = await getPIAProjectByIdOrSlug(idOrSlug)
        setProject(cmsProject || null)
      } catch (err) {
        console.error('Failed to load project details from Payload CMS:', err)
        setProject(null)
      } finally {
        setLoading(false)
      }
    }
    loadProject()
  }, [idOrSlug])

  // Keyboard navigation for Lightbox Frame
  useEffect(() => {
    function handleKeyDown(e) {
      if (lightboxIndex === null) return
      const gallery = project?.galleryItems || []
      if (gallery.length === 0) return

      if (e.key === 'Escape') {
        setLightboxIndex(null)
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev > 0 ? prev - 1 : gallery.length - 1))
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev < gallery.length - 1 ? prev + 1 : 0))
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, project])

  if (loading) {
    return (
      <div className="boxed_wrapper">
        <PIALoader />
        <Header />
        <div style={{ padding: '120px 0', textAlign: 'center' }}>
          <p>Loading project details...</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="boxed_wrapper">
        <Header />
        <Breadcrumb
          style="style2"
          title="Project Not Found"
          subtitle="Project Detail"
          bgImage="/images/resources/breadcrumb-bg-2.jpg"
          crumbs={[
            { label: 'Home', to: '/' },
            { label: 'Projects', to: '/projects' },
            { label: 'Not Found' },
          ]}
        />
        <section style={{ padding: '80px 0', textAlign: 'center' }}>
          <div className="container">
            <h2 style={{ fontSize: '28px', color: '#1F2E23', marginBottom: '16px' }}>Project Not Found</h2>
            <p style={{ color: '#666', marginBottom: '24px' }}>The requested project could not be found.</p>
            <Link href="/projects" className="btn-one">
              Back to All Projects <span className="flaticon-next"></span>
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  const galleryList = (project.galleryItems && project.galleryItems.length > 0)
    ? project.galleryItems
    : (project.galleryImgs || []).map((url) => ({ url, caption: '' }))

  // Mobile swipe handlers
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return
    const distance = touchStartXRef.current - touchEndXRef.current
    const minSwipeDistance = 40
    if (distance > minSwipeDistance) {
      // Swipe Left -> Next slide
      setMobileSlide((prev) => (prev < galleryList.length - 1 ? prev + 1 : 0))
    } else if (distance < -minSwipeDistance) {
      // Swipe Right -> Prev slide
      setMobileSlide((prev) => (prev > 0 ? prev - 1 : galleryList.length - 1))
    }
    touchStartXRef.current = null
    touchEndXRef.current = null
  }

  return (
    <div className="boxed_wrapper">
      <PIALoader />
      <Header />

      <Breadcrumb
        style="style2"
        title={project.title}
        subtitle="Project Detail"
        bgImage="/images/resources/breadcrumb-bg-2.jpg"
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Projects', to: '/projects' },
          { label: project.title },
        ]}
      />

      <section className="single-project-details-area" style={{ padding: '50px 0 40px' }}>
        <div className="container">
          <div className="row">
            {/* Main Content */}
            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12" style={{ marginBottom: '30px' }}>
              {/* Hero Image */}
              <div style={{ marginBottom: '24px', borderRadius: '8px', overflow: 'hidden' }}>
                <img src={project.mainImg} alt={project.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>

              {/* Description */}
              <div style={{ marginBottom: '25px' }}>
                <h3 style={{ marginBottom: '12px', fontSize: '22px', color: '#1F2E23', fontWeight: 700 }}>Project Overview</h3>
                <p style={{ color: '#555', lineHeight: 1.7, fontSize: '15px' }}>{project.description}</p>
              </div>

              {/* Challenge & Solution */}
              {(project.challenge || project.solution) && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: project.challenge && project.solution ? 'repeat(auto-fit, minmax(280px, 1fr))' : '1fr',
                    gap: '20px',
                    marginBottom: '30px',
                    clear: 'both',
                  }}
                >
                  {project.challenge && (
                    <div style={{ background: '#f9f9f9', padding: '24px', borderRadius: '8px', borderLeft: '4px solid #1F2E23', height: '100%' }}>
                      <h4 style={{ color: '#1F2E23', marginBottom: '10px', fontSize: '18px', fontWeight: 600 }}>The Challenge</h4>
                      <p style={{ color: '#555', lineHeight: 1.65, fontSize: '14.5px', margin: 0, whiteSpace: 'pre-line' }}>{project.challenge}</p>
                    </div>
                  )}
                  {project.solution && (
                    <div style={{ background: '#1F2E23', padding: '24px', borderRadius: '8px', borderLeft: '4px solid #C49B5D', height: '100%' }}>
                      <h4 style={{ color: '#C49B5D', marginBottom: '10px', fontSize: '18px', fontWeight: 600 }}>Our Solution</h4>
                      <p style={{ color: '#F5F3ED', opacity: 0.9, lineHeight: 1.65, fontSize: '14.5px', margin: 0, whiteSpace: 'pre-line' }}>{project.solution}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Project Gallery */}
              {galleryList.length > 0 && (
                <div style={{ marginBottom: '30px' }}>
                  <h3 style={{ marginBottom: '16px', fontSize: '20px', color: '#1F2E23', fontWeight: 700 }}>Project Gallery</h3>

                  {/* Desktop View Grid (Click image to open Lightbox Frame) */}
                  <div className="d-none d-md-flex row">
                    {galleryList.map((item, i) => (
                      <div key={i} className="col-md-6 col-12" style={{ marginBottom: '20px' }}>
                        <div
                          onClick={() => setLightboxIndex(i)}
                          style={{
                            borderRadius: '8px',
                            overflow: 'hidden',
                            height: '220px',
                            background: '#1F2E23',
                            cursor: 'pointer',
                            position: 'relative',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.02)'
                            e.currentTarget.style.boxShadow = '0 8px 20px rgba(196, 155, 93, 0.3)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)'
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'
                          }}
                        >
                          <img
                            src={typeof item === 'string' ? item : item.url}
                            alt={item.caption || `Gallery Image ${i + 1}`}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                          <div
                            style={{
                              position: 'absolute',
                              inset: 0,
                              background: 'rgba(31, 46, 35, 0.4)',
                              opacity: 0,
                              transition: 'opacity 0.3s ease',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                            className="gallery-hover-overlay"
                            onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
                          >
                            <span style={{ color: '#fff', fontSize: '13px', background: 'rgba(0,0,0,0.6)', padding: '6px 14px', borderRadius: '20px', border: '1px solid #C49B5D' }}>
                              🔍 Click to Enlarge
                            </span>
                          </div>
                        </div>
                        {item.caption && (
                          <p style={{ marginTop: '6px', fontSize: '13px', color: '#666', fontStyle: 'italic', textAlign: 'center' }}>
                            {item.caption}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Mobile View Interactive Carousel (Slide through images) */}
                  <div className="d-block d-md-none" style={{ position: 'relative', overflow: 'hidden', borderRadius: '10px' }}>
                    <div
                      onTouchStart={handleTouchStart}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                      style={{
                        display: 'flex',
                        transition: 'transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)',
                        transform: `translateX(-${mobileSlide * 100}%)`,
                      }}
                    >
                      {galleryList.map((item, i) => (
                        <div
                          key={i}
                          onClick={() => setLightboxIndex(i)}
                          style={{
                            minWidth: '100%',
                            boxSizing: 'border-box',
                            padding: '0 2px',
                          }}
                        >
                          <div style={{ borderRadius: '8px', overflow: 'hidden', height: '240px', background: '#1F2E23', position: 'relative' }}>
                            <img
                              src={typeof item === 'string' ? item : item.url}
                              alt={item.caption || `Gallery Image ${i + 1}`}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: '11px', padding: '3px 8px', borderRadius: '10px' }}>
                              {i + 1} / {galleryList.length}
                            </div>
                          </div>
                          {item.caption && (
                            <p style={{ marginTop: '8px', fontSize: '13px', color: '#666', fontStyle: 'italic', textAlign: 'center' }}>
                              {item.caption}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Mobile Carousel Controls & Dots */}
                    {galleryList.length > 1 && (
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
                        <button
                          onClick={() => setMobileSlide((prev) => (prev > 0 ? prev - 1 : galleryList.length - 1))}
                          style={{
                            background: '#1F2E23',
                            color: '#C49B5D',
                            border: '1px solid #C49B5D',
                            borderRadius: '50%',
                            width: '32px',
                            height: '32px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          ‹
                        </button>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          {galleryList.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setMobileSlide(i)}
                              style={{
                                width: mobileSlide === i ? '18px' : '8px',
                                height: '8px',
                                borderRadius: '4px',
                                background: mobileSlide === i ? '#C49B5D' : '#ccc',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                              }}
                            />
                          ))}
                        </div>
                        <button
                          onClick={() => setMobileSlide((prev) => (prev < galleryList.length - 1 ? prev + 1 : 0))}
                          style={{
                            background: '#1F2E23',
                            color: '#C49B5D',
                            border: '1px solid #C49B5D',
                            borderRadius: '50%',
                            width: '32px',
                            height: '32px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          ›
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
              <div>
                {/* Project Info */}
                <div style={{ background: '#f9f9f9', padding: '24px', borderRadius: '8px', marginBottom: '24px', border: '1px solid rgba(196, 155, 93, 0.2)' }}>
                  <h4 style={{ marginBottom: '16px', paddingBottom: '10px', borderBottom: '2px solid #C49B5D', color: '#1F2E23', fontSize: '18px', fontWeight: 600 }}>Project Information</h4>
                  {[
                    { label: 'Category', value: project.category },
                    { label: 'Client', value: project.client },
                    { label: 'Location', value: project.location },
                    { label: 'Project Area', value: project.area },
                    { label: 'Duration', value: project.duration },
                    { label: 'Year Completed', value: project.year },
                  ]
                    .filter((info) => Boolean(info.value) && info.value !== 'N/A')
                    .map((info, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid #eee', fontSize: '14px' }}>
                        <span style={{ fontWeight: '600', color: '#1F2E23' }}>{info.label}:</span>
                        <span style={{ color: '#555' }}>{info.value}</span>
                      </div>
                    ))}
                </div>

                {/* CTA */}
                <div style={{ background: '#1F2E23', border: '1px solid #C49B5D', padding: '28px 24px', borderRadius: '8px', textAlign: 'center', marginBottom: '24px' }}>
                  <h4 style={{ color: '#C49B5D', marginBottom: '10px', fontSize: '20px', fontWeight: 600 }}>Start Your Project</h4>
                  <p style={{ color: '#F5F3ED', opacity: 0.9, marginBottom: '18px', fontSize: '14px' }}>Ready to transform your space?</p>
                  <Link className="btn-one" href="/contact" style={{ width: '100%', justifyContent: 'center' }}>
                    Contact Us<span className="flaticon-next"></span>
                  </Link>
                </div>

                {/* Navigation */}
                <div style={{ display: 'flex' }}>
                  <Link href="/projects" className="btn-two" style={{ width: '100%', textAlign: 'center', justifyContent: 'center' }}>
                    ← Back to All Projects
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Desktop Lightbox Frame Modal */}
      {lightboxIndex !== null && galleryList[lightboxIndex] && (
        <div
          onClick={() => setLightboxIndex(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: 'rgba(15, 23, 18, 0.92)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          {/* Main Frame Box */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '900px',
              width: '100%',
              background: '#1F2E23',
              borderRadius: '12px',
              border: '2px solid #C49B5D',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'rgba(0,0,0,0.6)',
                color: '#C49B5D',
                border: '1px solid #C49B5D',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                fontSize: '20px',
                cursor: 'pointer',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ✕
            </button>

            {/* Image Frame Container */}
            <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#0d140f', padding: '16px' }}>
              <img
                src={typeof galleryList[lightboxIndex] === 'string' ? galleryList[lightboxIndex] : galleryList[lightboxIndex].url}
                alt={galleryList[lightboxIndex].caption || 'Gallery preview'}
                style={{
                  maxHeight: '70vh',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  borderRadius: '6px',
                }}
              />

              {/* Lightbox Nav Buttons */}
              {galleryList.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setLightboxIndex((prev) => (prev > 0 ? prev - 1 : galleryList.length - 1))
                    }}
                    style={{
                      position: 'absolute',
                      left: '20px',
                      background: 'rgba(31, 46, 35, 0.85)',
                      color: '#C49B5D',
                      border: '1.5px solid #C49B5D',
                      borderRadius: '50%',
                      width: '44px',
                      height: '44px',
                      fontSize: '22px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    ‹
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setLightboxIndex((prev) => (prev < galleryList.length - 1 ? prev + 1 : 0))
                    }}
                    style={{
                      position: 'absolute',
                      right: '20px',
                      background: 'rgba(31, 46, 35, 0.85)',
                      color: '#C49B5D',
                      border: '1.5px solid #C49B5D',
                      borderRadius: '50%',
                      width: '44px',
                      height: '44px',
                      fontSize: '22px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            {/* Caption & Counter Footer */}
            <div style={{ width: '100%', padding: '14px 20px', background: '#1F2E23', color: '#F5F3ED', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(196, 155, 93, 0.3)' }}>
              <span style={{ fontSize: '14px', color: '#F5F3ED', fontWeight: 500 }}>
                {galleryList[lightboxIndex].caption || project.title}
              </span>
              <span style={{ fontSize: '12px', color: '#C49B5D', fontWeight: 600, background: 'rgba(196, 155, 93, 0.15)', padding: '3px 10px', borderRadius: '10px' }}>
                {lightboxIndex + 1} / {galleryList.length}
              </span>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <ScrollToTop />
    </div>
  )
}

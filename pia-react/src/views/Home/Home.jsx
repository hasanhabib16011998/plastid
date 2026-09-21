'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import PIALoader from '../../components/PIALoader/PIALoader'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'
import ApartmentStory from '../../components/ApartmentStory/ApartmentStory'
import PIADropdown from '../../components/PIADropdown/PIADropdown'
import { getPIAProjects, getPIATestimonials } from '../../lib/payload'

// ─── Hero Slider Data ─────────────────────────────────────
const slides = [
  {
    img: '/images/slides/v1-1.jpg',
    title: 'Elevate every day',
    text: 'Design is not just what it looks like,\nbut how it makes you feel in every moment.',
    btnLabel: 'About Company',
    btnTo: '/about',
    align: 'left',
  },
  {
    img: '/images/slides/v1-2.jpg',
    title: 'Curated Spaces',
    text: 'Every corner reflects your story,\nthoughtfully brought to life.',
    btnLabel: 'Our Services',
    btnTo: '/services',
    align: 'right',
  },
  {
    img: '/images/slides/v1-3.jpg',
    title: 'Artful Balance',
    text: 'Merging beauty and practicality into seamless harmony.',
    btnLabel: 'About Company',
    btnTo: '/about',
    align: 'left',
  },
]

// ─── Highlights Data ───────────────────────────────────────
const highlights = [
  {
    icon: 'icon-concept',
    title: 'Concept & 3D Design',
    text: 'Immersive 3D renders and mood boards that define the aesthetic identity of your space.',
  },
  {
    icon: 'icon-scheme',
    title: 'Project Engineering',
    text: 'Precise technical blueprints and material specifications for flawless site execution.',
  },
  {
    icon: 'icon-cupboard',
    title: 'Interior Renovations',
    text: 'Transforming existing interiors with luxury finishes and custom bespoke styling.',
  },
]

// ─── Working Areas Data ────────────────────────────────────
const workingAreas = [
  {
    img: '/images/resources/working-1.jpg',
    iconClass: 'icon-architecture-and-city1',
    title: 'Residential',
    text: 'Elevating homes with personalized designs that blend functionality and style, creating spaces that inspire comfort, warmth, and cherished memories.',
  },
  {
    img: '/images/resources/working-2.jpg',
    iconClass: 'icon-shop',
    title: 'Commercial',
    text: 'Transforming commercial spaces into vibrant hubs of productivity and innovation, where form meets function to enhance employee well-being and brand identity.',
  },
  {
    img: '/images/resources/working-3.jpg',
    iconClass: 'icon-company',
    title: 'Industries',
    text: 'Innovating industrial spaces with efficient and sustainable design solutions, optimizing workflows and maximizing operational effectiveness for long-term success.',
  },
]


// ─── Working Process ────────────────────────────────────────
const workingProcess = [
  {
    num: '01',
    title: 'Discovery & Concept',
    text: 'Understanding your spatial vision, lifestyle requirements, and aesthetic goals.',
    icon: 'icon-productive',
  },
  {
    num: '02',
    title: 'Design & Engineering',
    text: 'Developing 3D visualizations, floor plans, material specs, and lighting layouts.',
    icon: 'icon-document',
  },
  {
    num: '03',
    title: 'Execution & Handover',
    text: 'Over-seeing site construction, custom installation, and final turnkey styling.',
    icon: 'icon-kitchen',
  },
]

// ─── Testimonials Component (Connected to Payload CMS) ────────
function TestimonialsSection() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  useEffect(() => {
    async function loadTestimonials() {
      try {
        setLoading(true)
        const cmsData = await getPIATestimonials()
        if (cmsData && cmsData.length > 0) {
          setList(cmsData)
          setError(false)
        } else if (cmsData === null) {
          setError(true)
        } else {
          setList([])
        }
      } catch (err) {
        console.error('Failed to load testimonials from Payload CMS:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    loadTestimonials()
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current
    if (Math.abs(distance) > 30 && list.length > 0) {
      if (distance > 0) {
        setActiveIndex((prev) => Math.min(prev + 1, list.length - 1))
      } else {
        setActiveIndex((prev) => Math.max(prev - 1, 0))
      }
    }
  }

  return (
    <section className="testimonial-area" style={{ overflow: 'hidden' }}>
      <div className="container">
        <div className="row align-items-center" style={{ marginBottom: '30px' }}>
          <div className="col-xl-8 col-lg-8 col-md-8 col-12">
            <div className="sec-title float-left">
              <p>Testimonials</p>
              <div className="title">Our Customer <span>Words</span></div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4 col-12 text-md-right mt-3 mt-md-0">
            <div className="more-reviews-button">
              <Link className="btn-two" href="/testimonials">View All Reviews<span className="flaticon-next"></span></Link>
            </div>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px 0', color: '#999', fontSize: '15px' }}>
            Loading testimonials...
          </div>
        ) : error || list.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '40px 20px',
              backgroundColor: '#F9F8F3',
              borderRadius: '8px',
              border: '1px solid #EAE6DF',
              color: '#666',
              fontSize: '15px',
              fontFamily: 'var(--font-primary)',
            }}
          >
            {error ? 'Something went wrong fetching the testimonials.' : 'No featured testimonials available at the moment.'}
          </div>
        ) : !isMobile ? (
          <div className="row">
            {list.map((t, i) => (
              <div key={t.id || i} className="col-xl-4 col-lg-4 col-md-6" style={{ marginBottom: '30px' }}>
                <div className="single-testimonial-item text-center">
                  <div className="quote-icon">
                    <span className="icon-quote1"></span>
                  </div>
                  <div className="inner-content">
                    <div className="client-info">
                      <h3>{t.name}</h3>
                      <span>{t.location}</span>
                    </div>
                    <div className="img-box" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <img
                        src={t.img || '/images/testimonial/user-placeholder.png'}
                        alt={t.name}
                        onError={(e) => {
                          e.currentTarget.onerror = null
                          e.currentTarget.src = '/images/testimonial/user-placeholder.png'
                        }}
                        style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '50%', display: 'block', margin: '0 auto' }}
                      />
                    </div>
                    <div className="text-box">
                      <p>{t.text}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="testimonial-carousel-mobile"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ position: 'relative', overflow: 'hidden', width: '100%' }}
          >
            <div
              style={{
                display: 'flex',
                transform: `translateX(-${activeIndex * 100}%)`,
                transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
                width: '100%',
              }}
            >
              {list.map((t, i) => (
                <div key={t.id || i} style={{ flex: '0 0 100%', minWidth: '100%', padding: '0 10px', boxSizing: 'border-box' }}>
                  <div className="single-testimonial-item text-center">
                    <div className="quote-icon">
                      <span className="icon-quote1"></span>
                    </div>
                    <div className="inner-content">
                      <div className="client-info">
                        <h3>{t.name}</h3>
                        <span>{t.location}</span>
                      </div>
                      <div className="img-box" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img
                          src={t.img || '/images/testimonial/user-placeholder.png'}
                          alt={t.name}
                          onError={(e) => {
                            e.currentTarget.onerror = null
                            e.currentTarget.src = '/images/testimonial/user-placeholder.png'
                          }}
                          style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '50%', display: 'block', margin: '0 auto' }}
                        />
                      </div>
                      <div className="text-box">
                        <p>{t.text}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {list.length > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '20px' }}>
                {list.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    style={{
                      width: i === activeIndex ? '26px' : '10px',
                      height: '10px',
                      borderRadius: '5px',
                      background: i === activeIndex ? '#c8a96e' : '#ddd',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      padding: 0,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

// ─── Brands ─────────────────────────────────────────────────
const brands = [
  '/images/brand/1.png',
  '/images/brand/2.png',
  '/images/brand/3.png',
  '/images/brand/4.png',
  '/images/brand/5.png',
  '/images/brand/6.png',
]

// ─── Mission Statements ─────────────────────────────────────
const missions = [
  {
    title: 'Our Core Vision',
    text: 'Our mission at Plastid Interior and Architecture is to enrich lives by creating captivating spaces that harmonize functionality with aesthetics, fostering environments where people thrive and memories are made.',
  },
  {
    title: 'Innovation & Excellence',
    text: 'Driven by a passion for innovation and guided by a commitment to excellence, our mission is to push the boundaries of design, crafting personalized solutions that reflect the unique aspirations and identities of our clients.',
  },
  {
    title: 'Transformative Spaces',
    text: 'Our mission is to be pioneers of transformation, reshaping the way people experience their surroundings by infusing every project with creativity, integrity, and a relentless pursuit of perfection.',
  },
]

// ─── Hero Slider Component ─────────────────────────────────
function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const slideRef = useRef(null)
  const backgroundRefs = useRef([])
  const timerRef = useRef(null)

  const goTo = (idx) => {
    setCurrent(idx)
  }

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timerRef.current)
  }, [])

  useEffect(() => {
    // Background fade transition
    slides.forEach((_, i) => {
      const bg = backgroundRefs.current[i]
      if (bg) {
        gsap.to(bg, {
          opacity: i === current ? 1 : 0,
          duration: 1,
          ease: 'power2.out',
        })
      }
    })

    // Content animations
    if (slideRef.current) {
      const title = slideRef.current.querySelector('.big-title')
      const text = slideRef.current.querySelector('.text')
      const button = slideRef.current.querySelector('.btn-box')

      if (title && text && button) {
        gsap.killTweensOf([title, text, button])
        
        const tl = gsap.timeline()
        tl.fromTo(title,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
        )
        .fromTo(text,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
          '-=0.3'
        )
        .fromTo(button,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' },
          '-=0.2'
        )
      }
    }
  }, [current])

  const slide = slides[current]

  return (
    <section className="main-slider">
      <div className="rev_slider_wrapper fullwidthbanner-container" style={{ position: 'relative', overflow: 'hidden', minHeight: '600px' }}>
        {/* Backgrounds */}
        {slides.map((s, i) => (
          <div
            key={i}
            ref={(el) => (backgroundRefs.current[i] = el)}
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundImage: `url(${s.img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: i === 0 ? 1 : 0,
              zIndex: i === current ? 1 : 0,
            }}
          />
        ))}

        {/* Dark overlay */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.45)', zIndex: 2
        }} />

        {/* Content */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          display: 'flex', alignItems: 'center', zIndex: 3,
          padding: '0 60px',
        }}>
          <div
            ref={slideRef}
            className="slide-content left-slide"
            style={{
              maxWidth: '700px',
              textAlign: slide.align === 'right' ? 'right' : 'left',
              marginLeft: slide.align === 'right' ? 'auto' : '0',
            }}
          >
            <div className="big-title" style={{ fontSize: '52px', fontWeight: '700', color: '#fff', marginBottom: '20px', lineHeight: 1.2 }}>
              {slide.title}
            </div>
            <div className="text" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '18px', marginBottom: '30px', whiteSpace: 'pre-line' }}>
              {slide.text}
            </div>
            <div className="btn-box">
              <Link className="btn-one" href={slide.btnTo}>
                {slide.btnLabel}<span className="flaticon-next"></span>
              </Link>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div style={{
          position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: '10px', zIndex: 4
        }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === current ? '30px' : '12px',
                height: '12px',
                borderRadius: '6px',
                background: i === current ? '#c8a96e' : 'rgba(255,255,255,0.6)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={() => goTo((current - 1 + slides.length) % slides.length)}
          style={{
            position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)',
            zIndex: 4, background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff',
            width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer',
            fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.3s',
          }}
          aria-label="Previous slide"
        >
          <i className="fa fa-angle-left" />
        </button>
        <button
          onClick={() => goTo((current + 1) % slides.length)}
          style={{
            position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)',
            zIndex: 4, background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff',
            width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer',
            fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.3s',
          }}
          aria-label="Next slide"
        >
          <i className="fa fa-angle-right" />
        </button>
      </div>
    </section>
  )
}

// ─── Simple Carousel Hook ──────────────────────────────────
function useCarousel(items, visibleCount = 3, autoPlay = true) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    if (!autoPlay) return
    const t = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length)
    }, 4000)
    return () => clearInterval(t)
  }, [items.length, autoPlay])
  const visible = []
  for (let i = 0; i < visibleCount; i++) {
    visible.push(items[(index + i) % items.length])
  }
  return { visible, index, setIndex }
}

// ─── GSAP Fluid Dot Indicator ──────────────────────────────────
function GSAPDots({ count, current, onChange }) {
  const dotsRef = useRef([])
  const indicatorRef = useRef(null)

  useEffect(() => {
    if (!indicatorRef.current || !dotsRef.current[current]) return
    const activeDot = dotsRef.current[current]
    const left = activeDot.offsetLeft
    const width = activeDot.offsetWidth

    gsap.to(indicatorRef.current, {
      x: left,
      width: width,
      duration: 0.45,
      ease: 'back.out(1.4)',
    })
  }, [current, count])

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        background: 'rgba(31, 46, 35, 0.06)',
        padding: '6px 12px',
        borderRadius: '30px',
        border: '1px solid rgba(196, 155, 93, 0.2)',
        gap: '6px',
      }}
    >
      {/* Sliding active highlight pill */}
      <div
        ref={indicatorRef}
        style={{
          position: 'absolute',
          top: '6px',
          left: 0,
          height: '10px',
          borderRadius: '5px',
          background: 'linear-gradient(135deg, #C49B5D 0%, #9F814D 100%)',
          boxShadow: '0 2px 8px rgba(196, 155, 93, 0.4)',
          pointerEvents: 'none',
        }}
      />
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          ref={(el) => (dotsRef.current[i] = el)}
          onClick={() => onChange(i)}
          aria-label={`Go to project slide group ${i + 1}`}
          style={{
            width: i === current ? '26px' : '10px',
            height: '10px',
            borderRadius: '5px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            transition: 'width 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
            zIndex: 1,
            outline: 'none',
          }}
        />
      ))}
    </div>
  )
}

// ─── Micro-Interactive Arrow Button ───────────────────────────
function CarouselArrowButton({ direction, disabled, onClick }) {
  const btnRef = useRef(null)
  const iconRef = useRef(null)

  const handleMouseEnter = () => {
    if (disabled) return
    gsap.to(btnRef.current, {
      scale: 1.08,
      backgroundColor: '#C49B5D',
      color: '#1F2E23',
      borderColor: '#C49B5D',
      boxShadow: '0 8px 24px rgba(196, 155, 93, 0.45)',
      duration: 0.25,
      ease: 'power2.out',
    })
    gsap.to(iconRef.current, {
      x: direction === 'left' ? -4 : 4,
      duration: 0.2,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    if (disabled) return
    gsap.to(btnRef.current, {
      scale: 1,
      backgroundColor: '#1F2E23',
      color: '#C49B5D',
      borderColor: '#C49B5D',
      boxShadow: '0 4px 14px rgba(31, 46, 35, 0.25)',
      duration: 0.25,
      ease: 'power2.out',
    })
    gsap.to(iconRef.current, {
      x: 0,
      duration: 0.2,
      ease: 'power2.out',
    })
  }

  const handleMouseDown = () => {
    if (disabled) return
    gsap.to(btnRef.current, { scale: 0.94, duration: 0.1 })
  }

  const handleMouseUp = () => {
    if (disabled) return
    gsap.to(btnRef.current, { scale: 1.08, duration: 0.15 })
  }

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      aria-label={direction === 'left' ? 'Previous projects' : 'Next projects'}
      style={{
        width: '48px',
        height: '48px',
        borderRadius: '12px',
        background: disabled ? 'rgba(31, 46, 35, 0.4)' : '#1F2E23',
        color: disabled ? '#777777' : '#C49B5D',
        border: disabled ? '1.5px solid rgba(196, 155, 93, 0.3)' : '1.5px solid #C49B5D',
        boxShadow: disabled ? 'none' : '0 4px 14px rgba(31, 46, 35, 0.25)',
        cursor: disabled ? 'default' : 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        margin: 0,
        lineHeight: 0,
        transition: 'opacity 0.3s ease',
        opacity: disabled ? 0.4 : 1,
        outline: 'none',
        userSelect: 'none',
        WebkitTapHighlightColor: 'transparent',
        flexShrink: 0,
      }}
    >
      <span
        ref={iconRef}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          lineHeight: 0,
        }}
      >
        {direction === 'left' ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        )}
      </span>
    </button>
  )
}

// ─── Projects Carousel ──────────────────────────────────────
function ProjectsCarousel() {
  const [recentProjects, setRecentProjects] = useState([])
  const [index, setIndex]          = useState(0)
  const [visibleCount, setVisible] = useState(3)
  const containerRef = useRef(null)
  const trackRef     = useRef(null)
  const GAP          = 20

  useEffect(() => {
    async function loadRecent() {
      try {
        const cmsProjects = await getPIAProjects()
        setRecentProjects(cmsProjects || [])
      } catch (err) {
        console.error('Failed to load recent projects from Payload CMS:', err)
        setRecentProjects([])
      }
    }
    loadRecent()
  }, [])

  const isMouseDraggingRef = useRef(false)
  const mouseDragDataRef   = useRef({
    startX: 0,
    startY: 0,
    startTrackX: 0,
    isHorizontal: null,
  })
  const indexRef      = useRef(0)
  const maxIndexRef   = useRef(2)

  // Responsive breakpoint handling
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      setVisible(w < 600 ? 1 : w < 992 ? 2 : 3)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const maxIndex = Math.max(0, recentProjects.length - visibleCount)

  // Keep index & maxIndex refs in sync
  useEffect(() => {
    indexRef.current = index
  }, [index])

  useEffect(() => {
    maxIndexRef.current = maxIndex
    if (index > maxIndex) {
      setIndex(maxIndex)
    }
  }, [maxIndex, index])

  const getCardWidth = () => {
    if (!containerRef.current) return 0
    const cw = containerRef.current.offsetWidth
    return (cw - GAP * (visibleCount - 1)) / visibleCount
  }

  const getOffset = (idx) => {
    const cardW = getCardWidth()
    return -(idx * (cardW + GAP))
  }

  const snapTo = (newIdx, animate = true) => {
    const clamped = Math.max(0, Math.min(newIdx, maxIndexRef.current))
    setIndex(clamped)
    indexRef.current = clamped
    const targetX = getOffset(clamped)
    if (trackRef.current) {
      if (animate) {
        gsap.to(trackRef.current, {
          x: targetX,
          duration: 0.4,
          ease: 'power2.out',
        })
      } else {
        gsap.set(trackRef.current, { x: targetX })
      }
    }
  }

  // Re-snap on breakpoint resize
  useEffect(() => {
    snapTo(Math.min(indexRef.current, maxIndex), false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleCount])

  // ── 1. Native Touch Handlers for Mobile (Non-Passive) ──
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let startX = 0
    let startY = 0
    let startTrackX = 0
    let isTouchDragging = false
    let isHorizontal = null

    const onTouchStart = (e) => {
      if (!e.touches || e.touches.length !== 1) return
      isTouchDragging = true
      isHorizontal = null
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY

      if (trackRef.current) {
        const rawX = gsap.getProperty(trackRef.current, 'x')
        startTrackX = typeof rawX === 'number' ? rawX : parseFloat(rawX) || getOffset(indexRef.current)
      } else {
        startTrackX = getOffset(indexRef.current)
      }
    }

    const onTouchMove = (e) => {
      if (!isTouchDragging || !e.touches || e.touches.length === 0) return
      const currentX = e.touches[0].clientX
      const currentY = e.touches[0].clientY
      const dx = currentX - startX
      const dy = currentY - startY

      if (isHorizontal === null) {
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
          isHorizontal = Math.abs(dx) >= Math.abs(dy)
        }
      }

      if (isHorizontal === true) {
        if (e.cancelable) {
          e.preventDefault()
        }
        if (trackRef.current) {
          gsap.set(trackRef.current, { x: startTrackX + dx })
        }
      }
    }

    const onTouchEnd = (e) => {
      if (!isTouchDragging) return
      isTouchDragging = false

      if (isHorizontal === true) {
        const endX = e.changedTouches && e.changedTouches.length > 0
          ? e.changedTouches[0].clientX
          : startX
        const dx = endX - startX
        const threshold = 40
        const curIndex = indexRef.current
        if (dx < -threshold) {
          snapTo(curIndex + 1)
        } else if (dx > threshold) {
          snapTo(curIndex - 1)
        } else {
          snapTo(curIndex)
        }
      }
    }

    container.addEventListener('touchstart', onTouchStart, { passive: true })
    container.addEventListener('touchmove', onTouchMove, { passive: false })
    container.addEventListener('touchend', onTouchEnd, { passive: true })
    container.addEventListener('touchcancel', onTouchEnd, { passive: true })

    return () => {
      container.removeEventListener('touchstart', onTouchStart)
      container.removeEventListener('touchmove', onTouchMove)
      container.removeEventListener('touchend', onTouchEnd)
      container.removeEventListener('touchcancel', onTouchEnd)
    }
  }, [visibleCount])

  // ── 2. Mouse Drag Handlers for Desktop ──
  const handleMouseDown = (e) => {
    if (e.button !== 0) return
    isMouseDraggingRef.current = true

    let currentX = 0
    if (trackRef.current) {
      const rawX = gsap.getProperty(trackRef.current, 'x')
      currentX = typeof rawX === 'number' ? rawX : parseFloat(rawX) || getOffset(indexRef.current)
    } else {
      currentX = getOffset(indexRef.current)
    }

    mouseDragDataRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startTrackX: currentX,
      isHorizontal: null,
    }

    window.addEventListener('mousemove', handleWindowMouseMove)
    window.addEventListener('mouseup', handleWindowMouseUp)
  }

  const handleWindowMouseMove = (e) => {
    if (!isMouseDraggingRef.current) return
    const { startX, startY, startTrackX, isHorizontal } = mouseDragDataRef.current
    const dx = e.clientX - startX
    const dy = e.clientY - startY

    let horiz = isHorizontal
    if (horiz === null) {
      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        horiz = Math.abs(dx) >= Math.abs(dy)
        mouseDragDataRef.current.isHorizontal = horiz
      }
    }

    if (horiz === true && trackRef.current) {
      gsap.set(trackRef.current, { x: startTrackX + dx })
    }
  }

  const handleWindowMouseUp = (e) => {
    if (!isMouseDraggingRef.current) return
    isMouseDraggingRef.current = false

    window.removeEventListener('mousemove', handleWindowMouseMove)
    window.removeEventListener('mouseup', handleWindowMouseUp)

    const { startX, isHorizontal } = mouseDragDataRef.current
    if (isHorizontal === true) {
      const dx = e.clientX - startX
      const threshold = 40
      const curIndex = indexRef.current
      if (dx < -threshold) {
        snapTo(curIndex + 1)
      } else if (dx > threshold) {
        snapTo(curIndex - 1)
      } else {
        snapTo(curIndex)
      }
    }
  }

  useEffect(() => {
    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove)
      window.removeEventListener('mouseup', handleWindowMouseUp)
    }
  }, [])

  const cardStyle = {
    flex: `0 0 calc((100% - ${GAP * (visibleCount - 1)}px) / ${visibleCount})`,
    minWidth: 0,
    userSelect: 'none',
    WebkitUserSelect: 'none',
  }

  return (
    <div
      ref={containerRef}
      style={{ overflow: 'hidden', position: 'relative', touchAction: 'pan-y' }}
    >
      {/* ── Sliding track ── */}
      <div
        ref={trackRef}
        className="project-carousel owl-carousel owl-theme"
        style={{
          display: 'flex',
          gap: `${GAP}px`,
          willChange: 'transform',
          cursor: 'grab',
          touchAction: 'pan-y',
          userSelect: 'none',
          WebkitUserSelect: 'none',
        }}
        onMouseDown={handleMouseDown}
      >
        {recentProjects.map((p, i) => (
          <div key={i} className="single-project-style1" style={cardStyle}>
            <div className="img-holder" style={{ position: 'relative' }}>
              <img
                src={p.img}
                alt={p.title}
                draggable={false}
                style={{
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover',
                  pointerEvents: 'none',
                  userSelect: 'none',
                  WebkitUserDrag: 'none',
                }}
              />
              <div className="overlay-content">
                <div className="inner-content">
                  <div className="link-box">
                    <Link className="btn-one" href={`/projects/${p.slug || p.id}`}>Case Study<span className="flaticon-next"></span></Link>
                  </div>
                </div>
              </div>
              <div className="title-box">
                <span>{p.category}</span>
                <h3>{p.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Controls: Premium Arrow Buttons + GSAP Fluid Dots ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginTop: '20px' }}>
        <CarouselArrowButton
          direction="left"
          disabled={index === 0}
          onClick={() => snapTo(index - 1)}
        />

        <GSAPDots
          count={maxIndex + 1}
          current={index}
          onChange={(i) => snapTo(i)}
        />

        <CarouselArrowButton
          direction="right"
          disabled={index === maxIndex}
          onClick={() => snapTo(index + 1)}
        />
      </div>
    </div>
  )
}

// ─── Mission Carousel ───────────────────────────────────────
function MissionCarousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex((p) => (p + 1) % missions.length), 5000)
    return () => clearInterval(t)
  }, [])

  const m = missions[index]

  return (
    <div className="about-carousel-box">
      <div className="single-box">
        <div className="icon-holder">
          <span className="icon-target"></span>
        </div>
        <div className="text-holder">
          <h3>{m.title}</h3>
          <p>{m.text}</p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '8px', marginTop: '15px' }}>
        {missions.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            style={{
              width: i === index ? '24px' : '10px',
              height: '10px',
              borderRadius: '5px',
              background: i === index ? '#c8a96e' : '#ddd',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s',
              padding: 0,
            }}
            aria-label={`Mission ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Project Footprint Showcase ────────────────────────────
const sectorMetrics = [
  {
    badge: 'Bespoke Living',
    metric: '1,200+',
    label: 'Residential Turnkeys',
    desc: 'Bespoke interior design, luxury master suites, modular kitchens, and custom apartments.',
  },
  {
    badge: 'Workplace Design',
    metric: '150+',
    label: 'Corporate Workspaces',
    desc: 'Ergonomic executive suites, tech hubs, conference facilities, and office renovations.',
  },
  {
    badge: 'Retail Experience',
    metric: '80+',
    label: 'Commercial & Cafes',
    desc: 'High-conversion retail showrooms, boutique dining, and commercial merchandising.',
  },
  {
    badge: 'Landscape Harmony',
    metric: '100%',
    label: 'Design Satisfaction',
    desc: 'Rooftop greening, architectural landscaping, and outdoor lifestyle spaces.',
  },
]

const craftPills = [
  'Italian Marble Finishes',
  '3D Concept Merchandising',
  'Custom Teak Woodwork',
  'Acoustic Office Partitioning',
  'Wrought Iron Crafting',
  'Smart Architectural Lighting',
  'Structural Glasswork',
  'Full Site Engineering',
  'Landscape Greening',
  'Space Optimization',
]

function ProjectFootprint() {
  const doublePills = [...craftPills, ...craftPills]

  return (
    <section className="brand-area" style={{ background: '#F5F3ED', padding: '90px 0 80px' }}>
      <div className="container">
        {/* Section Header */}
        <div className="sec-title text-center max-width" style={{ paddingBottom: '40px' }}>
          <p>Proven Expertise Across Sectors</p>
          <div className="title">
            Trusted Spaces <span>Crafted to Inspire</span>
          </div>
        </div>

        {/* 4 Sector Cards Grid */}
        <div className="row d-flex flex-wrap" style={{ marginBottom: '30px' }}>
          {sectorMetrics.map((s, i) => (
            <div key={i} className="col-xl-3 col-lg-6 col-md-6 col-sm-12 d-flex" style={{ marginBottom: '24px' }}>
              <div
                style={{
                  width: '100%',
                  background: '#ffffff',
                  borderRadius: '8px',
                  border: '1px solid rgba(196, 155, 93, 0.25)',
                  padding: '28px 24px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.35s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)'
                  e.currentTarget.style.borderColor = '#C49B5D'
                  e.currentTarget.style.boxShadow = '0 10px 28px rgba(196, 155, 93, 0.18)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.borderColor = 'rgba(196, 155, 93, 0.25)'
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.04)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <span
                      style={{
                        background: 'rgba(196, 155, 93, 0.12)',
                        color: '#C49B5D',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        fontFamily: 'var(--font-primary)',
                      }}
                    >
                      {s.badge}
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '42px',
                      lineHeight: '1',
                      fontWeight: 500,
                      color: '#1F2E23',
                      marginBottom: '6px',
                    }}
                  >
                    {s.metric}
                  </div>
                  <h4
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontSize: '16px',
                      fontWeight: 600,
                      color: '#C49B5D',
                      marginBottom: '10px',
                    }}
                  >
                    {s.label}
                  </h4>
                  <p
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontSize: '13.5px',
                      lineHeight: '1.65',
                      color: 'rgba(31, 46, 35, 0.75)',
                      margin: 0,
                    }}
                  >
                    {s.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Infinite Craft Marquee */}
        <div style={{ overflow: 'hidden', padding: '10px 0 30px' }}>
          <div className="footprint-marquee-track">
            {doublePills.map((pill, i) => (
              <div
                key={i}
                style={{
                  background: '#1F2E23',
                  border: '1px solid #C49B5D',
                  color: '#F5F3ED',
                  padding: '10px 22px',
                  borderRadius: '30px',
                  fontSize: '13px',
                  fontFamily: 'var(--font-primary)',
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span style={{ color: '#C49B5D', fontSize: '14px' }}>◆</span>
                {pill}
              </div>
            ))}
          </div>
        </div>

        {/* 100% Refund Policy Highlight Banner */}
        <div
          style={{
            background: '#1F2E23',
            borderRadius: '8px',
            border: '1.5px solid #C49B5D',
            padding: '28px 32px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
            marginTop: '10px',
          }}
        >
          <div className="row align-items-center">
            <div className="col-lg-9 col-md-8" style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '8px' }}>
                <span style={{ color: '#C49B5D', fontSize: '20px' }}>★</span>
                <h4
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '22px',
                    color: '#C49B5D',
                    margin: 0,
                    fontWeight: 500,
                  }}
                >
                  100% 3D Design Fee Refund Policy
                </h4>
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: '14.5px',
                  lineHeight: '1.7',
                  color: '#F5F3ED',
                  margin: 0,
                  opacity: 0.9,
                }}
              >
                Our 20 BDT/sqft 3D design fee secures your project in our pipeline and is credited back 100% as a discount when you execute the project with us.
              </p>
            </div>
            <div className="col-lg-3 col-md-4 text-md-right">
              <Link className="btn-one" href="/contact" style={{ width: '100%', justifyContent: 'center' }}>
                Book Consultation<span className="flaticon-next"></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Appointment Form ───────────────────────────────────────
function AppointmentForm() {
  const [formData, setFormData] = useState({ name: '', email: '', service: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setFormData({ name: '', email: '', service: '' })
  }

  return (
    <div className="appointment-box">
      <div className="title-box">
        <h2>Make Appointment</h2>
        <span>Leave your information here and get reply from our expert in 24 hours, don't hesitate to ask.</span>
      </div>
      <div className="appointment">
        {submitted && (
          <div style={{
            background: '#1F2E23', color: '#C49B5D', border: '1px solid #C49B5D', padding: '14px 20px',
            borderRadius: '4px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px',
            fontSize: '14px', fontFamily: 'var(--font-primary)'
          }}>
            <span style={{ fontWeight: 'bold' }}>✓</span> Thank you! We'll be in touch within 24 hours.
          </div>
        )}
        <form className="appointment-form" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-xl-12">
              <div className="single-box">
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="single-box">
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <PIADropdown
                name="service"
                value={formData.service}
                onChange={handleChange}
                placeholder="Interested In"
                options={[
                  'Concept Designs',
                  'Project Designs',
                  'Make Overs',
                  'Consulting',
                  'Glass & Wrought',
                  'Space Planning',
                ]}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="single-box">
                <button className="btn-one" type="submit">Submit Here<span className="flaticon-next"></span></button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

// ─── Main Home Page ─────────────────────────────────────────
export default function Home() {
  return (
    <div className="boxed_wrapper">
      <PIALoader />
      <Header />

      {/* Hero — Scroll-Driven Apartment Transformation */}
      <ApartmentStory />

      {/* Highlights */}
      <section className="highlights-area">
        <div className="container">
          <div className="row">
            {highlights.map((h, i) => (
              <div key={i} className="col-xl-4 col-lg-4">
                <div className="single-highlight-box text-center">
                  <div className="icon-holder">
                    <span className={h.icon}></span>
                  </div>
                  <div className="inner-content">
                    <div className="text">
                      <h3>{h.title}</h3>
                      <p>{h.text}</p>
                    </div>
                    <Link className="btn-one" href="/services">Learn More<span className="flaticon-next"></span></Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="about-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-5 col-lg-5">
              <div className="about-image-box">
                <div className="inner-box">
                  <img src="/images/resources/about-image.jpg" alt="Awesome Image" />
                  {/* <div className="overlay">
                    <div className="box">
                      <div className="icon">
                        <img src="/images/icon/home.png" alt="Home Icon" />
                      </div>
                    </div>
                  </div> */}
                </div>
                <div className="text-box">
                  <p>Where Vision Meets Reality</p>
                  <h3>Md. Mozammel Hossain, <span>CEO &amp; Founder</span></h3>
                </div>
              </div>
            </div>
            <div className="col-xl-7 col-lg-7">
              <div className="about-text">
                <div className="sec-title">
                  <p>About Company</p>
                  <div className="title">A premier interior<br />architecture <span>&amp; design studio</span></div>
                </div>
                <div className="inner-content">
                  <div className="text">
                    Plastid Interior and Architecture is not just a design firm; it's a visionary journey into the heart of spaces. With a passion for innovation and a commitment to excellence, we specialize in crafting bespoke interiors and architectural solutions that redefine living and working environments.
                    <br /><br />
                    From concept to completion, our team of seasoned designers and architects collaborate closely with clients to transform visions into tangible realities. With an unwavering dedication to quality craftsmanship and attention to detail, Plastid Interior and Architecture delivers timeless designs that inspire, captivate, and elevate every space.
                  </div>
                  <MissionCarousel />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Working Areas */}
      <section className="working-area" style={{ backgroundImage: 'url(/images/parallax-background/working-bg.jpg)' }}>
        <div className="container">
          <div className="sec-title with-text max-width text-center">
            <p>Working Areas</p>
            <div className="title clr-white">Covered <span>Industries</span></div>
            <p className="bottom-text">We create inspiring environments through uncompromising quality, functional innovation, and timeless architectural elegance.</p>
          </div>
          <div className="row">
            {workingAreas.map((w, i) => (
              <div key={i} className="col-xl-4 col-lg-4">
                <div className="single-working-box">
                  <div className="img-holder">
                    <div className="inner">
                      <img src={w.img} alt={w.title} />
                      <div className="overlay-style-one"></div>
                    </div>
                  </div>
                  <div className="text-holder">
                    <div className="plus-icon-box"><span className="icon-plus"></span></div>
                    <div className="outer-box">
                      <div className="icon">
                        <div className="inner">
                          <div className="box">
                            <span className={w.iconClass}></span>
                          </div>
                        </div>
                      </div>
                      <div className="text">
                        <h3>{w.title}</h3>
                        <p>{w.text}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Projects */}
      <section className="recently-project-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="sec-title float-left">
                <p>Projects</p>
                <div className="title">Recently Completed <span>Works</span></div>
              </div>
              <div className="more-project-button float-right">
                <Link className="btn-two" href="/projects">More Projects<span className="flaticon-next"></span></Link>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <ProjectsCarousel />
        </div>
      </section>

      {/* Working Process */}
      <section className="working-process-area">
        <div className="container">
          <div className="sec-title text-center">
            <p>To Do good design</p>
            <div className="title">Our Working <span>process</span></div>
          </div>
          <div className="row">
            {workingProcess.map((p, i) => (
              <div key={i} className="col-xl-4 col-lg-4">
                <div className="single-working-process text-center">
                  <div className="top-box"><span>{p.num}</span></div>
                  <div className="inner">
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                    <div className="icon-holder">
                      <span className={p.icon}></span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Slogan CTA */}
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

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Appointment Area */}
      <section className="appointment-area" style={{ backgroundImage: 'url(/images/resources/appointment-bg.jpg)' }}>
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6">
              <div className="map-content-box">
                <div className="sec-title">
                  <p>Contact Details</p>
                  <div className="title">How Can We <span>Help You?</span></div>
                </div>
                <div className="inner">
                  <img src="/images/resources/map.png" alt="Map" />
                  <div className="overlay">
                    <div className="single-location-box one">
                      <div className="marker-box"><span className="icon-pin"></span></div>
                      <div className="location-info">
                        <h3>Dhaka</h3>
                        <p>House-11 (2nd Floor), Block-E,<br />Sector-1, Aftab Nagar,<br />Dhaka 1212<br />+880 1768834417<br />plastidarchitecture@gmail.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <AppointmentForm />
            </div>
          </div>
        </div>
      </section>

      {/* Project Footprint & Expertise */}
      <ProjectFootprint />

      <Footer />
      <ScrollToTop />
    </div>
  )
}

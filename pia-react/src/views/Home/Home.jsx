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
import { submitPIALead } from '../../lib/payload'
import { serviceFormOptions } from '../../data/servicesData'
import { ChevronRight } from 'lucide-react'

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
    text: 'Innovating industrial spaces with efficient and sustainable design solutions, optimizing workflows and maximizing operational effectiveness.',
  },
]


// ─── Working Process ────────────────────────────────────────
const workingProcess = [
  {
    num: '01',
    title: 'Initial Consultation',
    duration: '1-5 hours',
    text: 'Understanding your spatial vision, lifestyle requirements, functional needs, and budget parameters.',
    icon: 'icon-productive',
  },
  {
    num: '02',
    title: 'Concept Development',
    duration: '1-2 weeks',
    text: 'Curating mood boards, aesthetic direction, color palettes, and initial conceptual themes for your space.',
    icon: 'icon-concept',
  },
  {
    num: '03',
    title: 'Space Planning',
    duration: '1-2 weeks',
    text: 'Optimizing floor plans, circulation flow, zoning, and furniture layouts for maximum spatial efficiency.',
    icon: 'icon-floor',
  },
  {
    num: '04',
    title: 'Design Development',
    duration: '3-4 weeks',
    text: 'Crafting photorealistic 3D visualizations, detailed engineering drawings, lighting layouts, and material specs.',
    icon: 'icon-sketch',
  },
  {
    num: '05',
    title: 'Implementation',
    duration: '6-12 weeks',
    text: 'Managing full-scale site construction, bespoke fabrication, quality control, and precision installation.',
    icon: 'icon-architecture-and-city1',
  },
  {
    num: '06',
    title: 'Project Handover',
    duration: null,
    text: 'Conducting final quality walkthroughs, finishing touches, and delivering your completed turnkey space.',
    icon: 'icon-guarantee-certificate1',
  },
]

// ─── Testimonials Component (Connected to Payload CMS) ────────
function TestimonialsSection({ initialList = [] }) {
  const [list] = useState(initialList)
  const [error] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

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
    <section className="py-20 bg-alabaster overflow-hidden">
      <div className="container-pia">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-bronze mb-2">
              Testimonials
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-[-0.025em] text-heading m-0">
              Our Customer <span className="italic font-normal text-bronze">Words</span>
            </h2>
          </div>
          <Link className="btn-two self-start md:self-auto" href="/testimonials">
            View All Reviews <ChevronRight size={14} />
          </Link>
        </div>

        {error || list.length === 0 ? (
          <div className="text-center py-10 px-5 bg-chalk rounded-lg border border-stone-border text-ink text-[15px]">
            {error
              ? 'Something went wrong fetching the testimonials.'
              : 'No featured testimonials available at the moment.'}
          </div>
        ) : !isMobile ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {list.map((t, i) => (
              <div
                key={t.id || i}
                className="bg-chalk rounded-lg border border-stone-border p-8 text-center flex flex-col justify-between hover:-translate-y-1 hover:border-bronze transition-all duration-300"
              >
                <div>
                  <div className="mb-4 text-bronze text-3xl leading-none">
                    <span className="icon-quote1" />
                  </div>
                  <div className="mb-4">
                    <h3 className="font-serif text-xl font-semibold text-obsidian mb-0.5">
                      {t.name}
                    </h3>
                    <span className="text-xs text-bronze font-medium uppercase tracking-wider">
                      {t.location}
                    </span>
                  </div>
                  <div className="flex justify-center mb-5">
                    <img
                      src={t.img || '/images/testimonial/user-placeholder.png'}
                      alt={t.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null
                        e.currentTarget.src = '/images/testimonial/user-placeholder.png'
                      }}
                      className="w-20 h-20 object-cover rounded-full border-2 border-bronze block"
                    />
                  </div>
                  <p className="text-sm text-ink leading-relaxed italic m-0">&ldquo;{t.text}&rdquo;</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative overflow-hidden w-full"
          >
            <div
              className="flex w-full transition-transform duration-400"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {list.map((t, i) => (
                <div key={t.id || i} className="flex-none w-full px-2">
                  <div className="bg-chalk rounded-lg border border-stone-border p-7 text-center">
                    <div className="mb-3 text-bronze text-3xl leading-none">
                      <span className="icon-quote1" />
                    </div>
                    <div className="mb-4">
                      <h3 className="font-serif text-xl font-semibold text-obsidian mb-0.5">
                        {t.name}
                      </h3>
                      <span className="text-xs text-bronze font-medium uppercase tracking-wider">
                        {t.location}
                      </span>
                    </div>
                    <div className="flex justify-center mb-4">
                      <img
                        src={t.img || '/images/testimonial/user-placeholder.png'}
                        alt={t.name}
                        onError={(e) => {
                          e.currentTarget.onerror = null
                          e.currentTarget.src = '/images/testimonial/user-placeholder.png'
                        }}
                        className="w-20 h-20 object-cover rounded-full border-2 border-bronze block"
                      />
                    </div>
                    <p className="text-sm text-ink leading-relaxed italic m-0">&ldquo;{t.text}&rdquo;</p>
                  </div>
                </div>
              ))}
            </div>

            {list.length > 1 && (
              <div className="flex justify-center items-center gap-2 mt-5">
                {list.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`h-2.5 rounded-full border-0 cursor-pointer transition-all p-0 ${
                      i === activeIndex ? 'w-6.5 bg-bronze' : 'w-2.5 bg-stone-border'
                    }`}
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
                {slide.btnLabel}<ChevronRight size={14} />
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
        background: 'rgba(0, 0, 0, 0.06)',
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
          background: 'linear-gradient(135deg, #C5A46D 0%, #9A7B4F 100%)',
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
      backgroundColor: '#C5A46D',
      color: '#141312',
      borderColor: '#C5A46D',
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
      backgroundColor: '#141312',
      color: '#C5A46D',
      borderColor: '#C5A46D',
      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
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
        background: disabled ? 'rgba(20, 19, 18, 0.4)' : '#141312',
        color: disabled ? '#777777' : '#C5A46D',
        border: disabled ? '1.5px solid rgba(197, 164, 109, 0.3)' : '1.5px solid #C5A46D',
        boxShadow: disabled ? 'none' : '0 4px 14px rgba(0, 0, 0, 0.25)',
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
function ProjectsCarousel({ initialProjects = [] }) {
  const [recentProjects] = useState(initialProjects)
  const [index, setIndex]          = useState(0)
  const [visibleCount, setVisible] = useState(3)
  const containerRef = useRef(null)
  const trackRef     = useRef(null)
  const GAP          = 20

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
          <div key={i} className="group" style={cardStyle}>
            <div className="relative rounded-lg overflow-hidden bg-obsidian h-[300px]">
              <img
                src={p.img}
                alt={p.title}
                draggable={false}
                className="w-full h-full object-cover pointer-events-none select-none group-hover:scale-105 transition-transform duration-500"
              />
              {/* Desktop Hover Overlay */}
              <div className="hidden md:flex absolute inset-0 bg-obsidian/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center z-10">
                <Link className="btn-one" href={`/projects/${p.slug || p.id}`}>
                  View Details <ChevronRight size={14} />
                </Link>
              </div>
              {/* Bottom Title Bar */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/65 to-transparent pt-8 pb-4 px-4 flex items-end justify-between gap-2 z-20">
                <div className="min-w-0">
                  <span className="block text-[11px] font-semibold uppercase tracking-widest text-brass mb-0.5">
                    {p.category}
                  </span>
                  <h3 className="font-serif text-lg font-semibold text-alabaster m-0 leading-snug truncate">
                    <Link
                      href={`/projects/${p.slug || p.id}`}
                      className="text-inherit no-underline hover:text-brass transition-colors"
                    >
                      {p.title}
                    </Link>
                  </h3>
                </div>
                <Link
                  href={`/projects/${p.slug || p.id}`}
                  className="md:hidden shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-brass text-obsidian text-[11px] font-bold uppercase tracking-wider no-underline"
                >
                  View Details <ChevronRight size={13} />
                </Link>
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
    <div className="bg-alabaster border border-brass/30 rounded-lg p-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-obsidian text-brass border border-brass/50 flex items-center justify-center shrink-0 text-xl">
          <span className="icon-target" />
        </div>
        <div>
          <h3 className="font-serif text-xl font-semibold text-obsidian mb-1.5">{m.title}</h3>
          <p className="text-sm text-ink leading-relaxed m-0">{m.text}</p>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        {missions.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className={`h-2.5 rounded-full border-0 cursor-pointer transition-all p-0 ${
              i === index ? 'w-6 bg-brass' : 'w-2.5 bg-neutral-300'
            }`}
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
    metric: '12+',
    label: 'Residential Turnkeys',
    desc: 'Bespoke interior design, luxury master suites, modular kitchens, and custom apartments.',
  },
  {
    badge: 'Workplace Design',
    metric: '2+',
    label: 'Corporate Workspaces',
    desc: 'Ergonomic executive suites, tech hubs, conference facilities, and office renovations.',
  },
  {
    badge: 'Retail Experience',
    metric: '2+',
    label: 'Commercial & Cafes',
    desc: 'High-conversion retail showrooms, boutique dining, and commercial merchandising.',
  },
  {
    badge: 'Landscape Harmony',
    metric: '2+',
    label: 'Design Satisfaction',
    desc: 'Rooftop greening, architectural landscaping, and outdoor lifestyle spaces.',
  },
]

// ─── Appointment Form ───────────────────────────────────────
function AppointmentForm() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    try {
      const res = await submitPIALead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: formData.message,
        source: 'homepage',
      })
      if (res.success) {
        setSubmitted(true)
        setFormData({ name: '', email: '', phone: '', service: '', message: '' })
        setTimeout(() => setSubmitted(false), 5000)
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Failed to submit. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClass =
    'w-full px-4 py-3.5 rounded bg-alabaster border border-black/15 text-obsidian text-sm font-sans placeholder:text-black/45 focus:bg-white focus:border-brass focus:ring-2 focus:ring-brass/20 outline-none transition-all disabled:opacity-60'

  return (
    <div className="bg-white rounded-xl border border-brass/35 shadow-2xl p-6 sm:p-9">
      <div className="mb-6">
        <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-[-0.025em] text-heading mb-2">
          Book Consultation
        </h2>
        <p className="text-[15px] leading-[1.65] text-ink m-0">
          Leave your information here and get reply from our expert in 24 hours, don&apos;t hesitate
          to ask.
        </p>
      </div>
      <div>
        {submitted && (
          <div className="bg-obsidian text-brass border border-brass px-5 py-3.5 rounded mb-5 flex items-center gap-2.5 text-sm">
            <span className="font-bold">✓</span> Thank you! We&apos;ll be in touch within 24 hours.
          </div>
        )}
        {error && (
          <div className="bg-[#2e1f1f] text-[#e57373] border border-[#e57373] px-5 py-3.5 rounded mb-5 text-sm">
            {error}
          </div>
        )}
        <form className="space-y-3.5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name *"
              required
              disabled={isSubmitting}
              className={inputClass}
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address *"
              required
              disabled={isSubmitting}
              className={inputClass}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 items-start">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              disabled={isSubmitting}
              className={inputClass}
            />
            <div className="[&>.relative]:mb-0">
              <PIADropdown
                name="service"
                value={formData.service}
                onChange={handleChange}
                placeholder="Select Service"
                options={serviceFormOptions}
              />
            </div>
          </div>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message *"
            required
            disabled={isSubmitting}
            rows={3}
            className={`${inputClass} resize-y min-h-[75px]`}
          />
          <button
            className="btn-one w-full disabled:opacity-70"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Here'} <ChevronRight size={14} />
          </button>
        </form>
      </div>
    </div>
  )
}

// ─── Main Home Page ─────────────────────────────────────────
export default function Home({ initialProjects = [], initialTestimonials = [] }) {
  return (
    <div className="min-h-screen flex flex-col bg-alabaster">
      <PIALoader />
      <Header />

      <main className="flex-1">
        {/* Hero — Scroll-Driven Apartment Transformation */}
        <ApartmentStory />

        {/* Recent Projects */}
        <section className="py-20 bg-alabaster">
          <div className="container-pia">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-bronze mb-2">
                  Projects
                </p>
                <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-[-0.025em] text-heading m-0">
                  Recently Completed <span className="italic font-normal text-bronze">Works</span>
                </h2>
              </div>
              <Link className="btn-two self-start md:self-auto" href="/projects">
                More Projects <ChevronRight size={14} />
              </Link>
            </div>
          </div>

          <div className="w-full px-4 sm:px-6 lg:px-10">
            <ProjectsCarousel initialProjects={initialProjects} />
          </div>

          {/* Visual Divider between Recently Completed Works and Statistics */}
          <div className="container-pia mt-14 mb-9">
            <div className="flex items-center justify-center gap-4">
              <span className="flex-1 h-px bg-gradient-to-r from-transparent to-stone-border" />
              <span className="inline-flex items-center gap-2.5 px-4.5 py-1.5 rounded-full border border-stone-border bg-chalk text-bronze text-[11px] font-semibold tracking-[0.16em] uppercase whitespace-nowrap">
                <span className="text-[10px]">◆</span>
                Our Footprint
                <span className="text-[10px]">◆</span>
              </span>
              <span className="flex-1 h-px bg-gradient-to-l from-transparent to-stone-border" />
            </div>
          </div>

          <div className="container-pia">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {sectorMetrics.map((s, i) => (
                <div
                  key={i}
                  className="bg-chalk rounded-lg border border-stone-border p-6 flex flex-col justify-between hover:-translate-y-1 hover:border-bronze transition-all duration-300"
                >
                  <div>
                    <span className="inline-block bg-bronze/10 text-bronze px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase mb-3.5">
                      {s.badge}
                    </span>
                    <div className="font-serif text-4xl leading-none font-medium text-obsidian mb-1.5">
                      {s.metric}
                    </div>
                    <h3 className="text-base font-semibold text-bronze mb-2.5">{s.label}</h3>
                    <p className="text-[13.5px] leading-relaxed text-ink m-0">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Architectural Section Divider */}
        <div
          className="relative px-4"
          style={{ background: 'linear-gradient(180deg, #F6F4EF 50%, #FCFBF9 50%)' }}
        >
          <div className="container-pia flex items-center justify-center">
            <span className="flex-1 h-px bg-gradient-to-r from-transparent to-stone-border" />
            <span
              className="w-9 h-9 rounded-full bg-obsidian border border-brass text-brass inline-flex items-center justify-center text-xs mx-4 shrink-0"
              aria-hidden="true"
            >
              ◆
            </span>
            <span className="flex-1 h-px bg-gradient-to-l from-transparent to-stone-border" />
          </div>
        </div>

        {/* About */}
        <section className="py-20 bg-chalk">
          <div className="container-pia">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <div className="lg:col-span-5">
                <div className="relative rounded-lg overflow-hidden border border-stone-border">
                  <img
                    src="/images/resources/about-image.jpg"
                    alt="Plastid Interior & Architecture Founder"
                    className="w-full h-auto block"
                  />
                  <div className="bg-charcoal border-t-2 border-brass px-6 py-4">
                    <p className="font-serif italic text-alabaster text-base mb-1">
                      Where Vision Meets Reality
                    </p>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-brass m-0">
                      Md. Mozammel Hossain,{' '}
                      <span className="text-alabaster/75 font-normal">CEO &amp; Founder</span>
                    </h3>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="mb-6">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-bronze mb-2">
                    About Company
                  </p>
                  <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-[-0.025em] text-heading leading-tight m-0">
                    A premier interior
                    <br />
                    architecture <span className="italic font-normal text-bronze">&amp; design studio</span>
                  </h2>
                </div>
                <p className="text-[15.5px] text-ink leading-[1.7] mb-5">
                  Plastid Interior and Architecture is not just a design firm; it&apos;s a visionary
                  journey into the heart of spaces. With a passion for innovation and a commitment to
                  excellence, we specialize in crafting bespoke interiors and architectural solutions
                  that redefine living and working environments.
                </p>
                <p className="text-[15.5px] text-ink leading-[1.7] mb-7">
                  From concept to completion, our team of seasoned designers and architects
                  collaborate closely with clients to transform visions into tangible realities. With
                  an unwavering dedication to quality craftsmanship and attention to detail, Plastid
                  Interior and Architecture delivers timeless designs that inspire, captivate, and
                  elevate every space.
                </p>
                <div className="mb-7">
                  <Link className="btn-two" href="/about">
                    More About Us <ChevronRight size={14} />
                  </Link>
                </div>
                <MissionCarousel />
              </div>
            </div>
          </div>
        </section>

        {/* Working Areas */}
        <section
          className="relative py-20 bg-obsidian bg-cover bg-center overflow-hidden"
          style={{ backgroundImage: 'url(/images/parallax-background/working-bg.jpg)' }}
        >
          <div className="absolute inset-0 bg-obsidian/80" />
          <div className="container-pia relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-brass mb-2">
                Working Areas
              </p>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-[-0.025em] text-alabaster mb-3">
                Covered <span className="italic font-normal text-brass">Industries</span>
              </h2>
              <p className="text-[15.5px] text-alabaster/80 leading-[1.65] m-0">
                We create inspiring environments through uncompromising quality, functional
                innovation, and timeless architectural elegance.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
              {workingAreas.map((w, i) => (
                <div
                  key={i}
                  className="group bg-charcoal border border-brass/30 rounded-lg overflow-hidden hover:-translate-y-1 hover:border-brass transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={w.img}
                      alt={w.title}
                      className="w-full h-full object-cover block group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                  </div>
                  <div className="p-6 flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-lg bg-brass/15 border border-brass/40 text-brass flex items-center justify-center shrink-0 text-2xl">
                      <span className={w.iconClass} />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl font-semibold text-alabaster mb-2">
                        {w.title}
                      </h3>
                      <p className="text-sm text-alabaster/75 leading-relaxed m-0">{w.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Working Process */}
        <section className="py-20 bg-alabaster">
          <div className="container-pia">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-bronze mb-2">
                To Do Good Design
              </p>
              <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-[-0.025em] text-heading m-0">
                Our Working <span className="italic font-normal text-bronze">Process</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {workingProcess.map((p, i) => (
                <div
                  key={i}
                  className="bg-chalk rounded-lg border border-stone-border p-7 text-center hover:-translate-y-1 hover:border-bronze transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-obsidian text-brass border border-brass font-serif text-lg font-semibold mb-4">
                      {p.num}
                    </div>
                    <h3 className="font-serif text-2xl font-semibold text-obsidian mb-1.5">
                      {p.title}
                    </h3>
                    <div className="min-h-[22px] mb-2">
                      {p.duration && (
                        <span className="text-xs font-semibold text-bronze uppercase tracking-wider">
                          ({p.duration})
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-ink leading-relaxed mb-5">{p.text}</p>
                  </div>
                  <div className="text-3xl text-bronze pt-3 border-t border-stone-border">
                    <span className={p.icon} />
                  </div>
                </div>
              ))}
            </div>

            {/* 50% Refund Policy Highlight Banner */}
            <div className="bg-charcoal rounded-lg border border-brass/50 p-7 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-8 lg:col-span-9">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-brass text-xl">★</span>
                    <h3 className="font-serif text-2xl text-brass font-medium m-0">
                      50% 3D Design Fee Refund Policy
                    </h3>
                  </div>
                  <p className="text-sm sm:text-[15px] leading-relaxed text-alabaster/90 m-0">
                    Our BDT 40/sqft 3D design fee secures your project in our pipeline, with 50%
                    refunded after project completion when you execute the project with us.
                  </p>
                </div>
                <div className="md:col-span-4 lg:col-span-3">
                  <Link className="btn-one w-full" href="/services">
                    See Our Services <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Appointment Area */}
        <section
          className="relative py-20 bg-obsidian bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/resources/appointment-bg.jpg)' }}
        >
          <div className="absolute inset-0 bg-obsidian/80" />
          <div className="container-pia relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6">
                <div className="mb-6">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-brass mb-2">
                    Start Your Journey
                  </p>
                  <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-[-0.025em] text-alabaster m-0">
                    Ready to Transform <span className="italic font-normal text-brass">Your Space?</span>
                  </h2>
                </div>
                <div className="relative rounded-xl overflow-hidden border border-brass/35 bg-charcoal/95 p-6">
                  <img
                    src="/images/resources/map.png"
                    alt="Dhaka Studio Map"
                    className="w-full h-auto opacity-35 block mb-4"
                  />
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-full bg-brass text-obsidian flex items-center justify-center shrink-0 text-lg">
                      <span className="icon-pin" />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl text-brass font-semibold mb-1.5">
                        Dhaka Studio
                      </h3>
                      <p className="text-sm text-alabaster/85 leading-relaxed m-0">
                        House-11 (2nd Floor), Block-E, Sector-1, Aftab Nagar, Dhaka 1212
                        <br />
                        +880 1768834417
                        <br />
                        plastidarchitecture@gmail.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-6">
                <AppointmentForm />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <TestimonialsSection initialList={initialTestimonials} />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  )
}

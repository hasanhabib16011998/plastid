import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown, ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef(null)
  const bgRef = useRef(null)
  const curtainRef = useRef(null)
  const contentRef = useRef(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })

      // Curtain lift
      tl.fromTo(curtainRef.current,
        { scaleY: 1, transformOrigin: 'top' },
        { scaleY: 0, duration: 1.3, ease: 'power4.inOut' }
      )
        // Content stagger
        .fromTo(contentRef.current.children,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo(scrollRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          '-=0.2'
        )

      // Parallax bg
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      })

      // Fade content on scroll
      gsap.to(contentRef.current, {
        yPercent: 25,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '55% top',
          scrub: 1,
        },
      })

      // Scroll indicator pulse
      gsap.to(scrollRef.current, {
        y: 8, repeat: -1, yoyo: true, duration: 1.3,
        ease: 'power1.inOut', delay: 2,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center overflow-hidden pt-16 sm:pt-20"
      style={{ height: '100svh', minHeight: '650px' }}
    >
      {/* Curtain */}
      <div
        ref={curtainRef}
        className="absolute inset-0 z-30"
        style={{ background: 'linear-gradient(180deg,#0a0a09 55%,#1a1c0e 100%)', transformOrigin: 'top' }}
      />

      {/* Parallax BG */}
      <div
        ref={bgRef}
        className="absolute inset-0 scale-110"
        style={{
          backgroundImage: "url('/images/hero_bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
        }}
      >
        {/* Dark Overlay Gradient for High Text Contrast */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, rgba(10,10,9,0.75) 0%, rgba(10,10,9,0.6) 35%, rgba(10,10,9,0.8) 70%, rgba(10,10,9,0.98) 100%)'
        }} />
      </div>

      {/* Side label – desktop only */}
      <div className="absolute left-8 lg:left-12 bottom-24 hidden xl:flex flex-col items-center gap-4 z-20">
        <div className="w-px h-16" style={{ background: 'linear-gradient(to bottom,transparent,var(--gold-mid))' }} />
        <p
          className="text-[0.55rem] tracking-[0.4em] uppercase whitespace-nowrap"
          style={{
            color: 'rgba(200,137,26,0.55)',
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)'
          }}
        >
          Est. 2005 · Dhaka, Bangladesh
        </p>
      </div>

      {/* Main content */}
      <div ref={contentRef} className="relative z-20 text-center px-5 w-full max-w-5xl mx-auto flex flex-col items-center justify-center">
        {/* Label */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-10 md:w-16" style={{ background: 'linear-gradient(to right,transparent,var(--gold-mid))' }} />
          <span className="section-label" style={{ fontSize: '0.6rem' }}>Premium Real Estate Developer</span>
          <div className="h-px w-10 md:w-16" style={{ background: 'linear-gradient(to left,transparent,var(--gold-mid))' }} />
        </div>

        {/* Headline */}
        <h1 className="font-display font-light leading-[1.05] mb-6 md:mb-8"
          style={{ fontSize: 'clamp(3rem,9.5vw,8.5rem)', color: 'var(--text-primary)' }}>
          Where{' '}
          <span className="italic gold-text" style={{ fontWeight: 600 }}>Ambition</span>
          <br />Meets Earth
        </h1>

        {/* Sub */}
        <p className="text-sm md:text-base leading-relaxed md:leading-8 max-w-xl mx-auto mb-16 md:mb-24"
          style={{ color: 'rgba(245,240,232,0.75)', fontWeight: 300 }}>
          Crafting extraordinary living experiences across Dhaka's most coveted addresses —
          where architectural brilliance and refined luxury converge.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 md:mt-10 w-full max-w-md sm:max-w-none" style={{ marginTop: '40px' }}>
          <Link to="/projects" className="btn-solid w-full sm:w-auto">Explore Properties</Link>
          <Link to="/about" className="btn-outline w-full sm:w-auto">Our Story</Link>
        </div>
      </div>

      {/* Stats – desktop right */}
      <div className="absolute right-8 lg:right-12 bottom-24 hidden xl:flex flex-col gap-6 z-20 text-right">
        {[['500+', 'Units Delivered'], ['20+', 'Years Legacy'], ['50+', 'Locations']].map(([v, l]) => (
          <div key={l}>
            <div className="font-display text-2xl font-bold gold-text">{v}</div>
            <div className="text-[0.55rem] tracking-widest uppercase mt-0.5" style={{ color: 'rgba(245,240,232,0.35)' }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => document.getElementById('home-about')?.scrollIntoView({ behavior: 'smooth' })}
        style={{ opacity: 0 }}
      >
        <span className="text-[0.55rem] tracking-[0.35em] uppercase" style={{ color: 'rgba(245,240,232,0.3)' }}>Scroll</span>
        <div className="w-px h-8 sm:h-10" style={{ background: 'linear-gradient(to bottom,var(--gold-mid),transparent)' }} />
        <ArrowDown size={12} style={{ color: 'rgba(200,137,26,0.6)' }} />
      </div>
    </section>
  )
}

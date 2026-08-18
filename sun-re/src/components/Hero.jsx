import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown, ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef    = useRef(null)
  const bgRef         = useRef(null)
  const curtainRef    = useRef(null)
  const contentRef    = useRef(null)
  const scrollRef     = useRef(null)

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
      className="relative flex items-center justify-center overflow-hidden"
      style={{ height: '100svh', minHeight: '600px' }}
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
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg,rgba(15,15,13,0.3) 0%,rgba(15,15,13,0.15) 30%,rgba(15,15,13,0.6) 70%,rgba(15,15,13,0.96) 100%)'
        }} />
      </div>

      {/* Side label – desktop only */}
      <div className="absolute left-5 bottom-28 hidden xl:flex flex-col items-center gap-3 z-20">
        <div className="w-px h-16" style={{ background: 'linear-gradient(to bottom,transparent,var(--gold-mid))' }} />
        <p className="rotate-90 origin-center text-[0.55rem] tracking-[0.4em] uppercase whitespace-nowrap mt-6"
          style={{ color: 'rgba(200,137,26,0.55)' }}>
          Est. 2005 · Dhaka, Bangladesh
        </p>
      </div>

      {/* Main content */}
      <div ref={contentRef} className="relative z-20 text-center px-5 w-full max-w-5xl mx-auto">
        {/* Label */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-10 md:w-16" style={{ background: 'linear-gradient(to right,transparent,var(--gold-mid))' }} />
          <span className="section-label" style={{ fontSize: '0.6rem' }}>Premium Real Estate Developer</span>
          <div className="h-px w-10 md:w-16" style={{ background: 'linear-gradient(to left,transparent,var(--gold-mid))' }} />
        </div>

        {/* Headline */}
        <h1 className="font-display font-light leading-[1.05] mb-8"
          style={{ fontSize: 'clamp(3rem,10vw,9rem)', color: 'var(--text-primary)' }}>
          Where{' '}
          <span className="italic gold-text" style={{ fontWeight: 600 }}>Ambition</span>
          <br />Meets Earth
        </h1>

        {/* Sub */}
        <p className="text-sm md:text-base leading-8 max-w-xl mx-auto mb-10"
          style={{ color: 'rgba(245,240,232,0.5)', fontWeight: 300 }}>
          Crafting extraordinary living experiences across Dhaka's most coveted addresses —
          where architectural brilliance and refined luxury converge.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/projects" className="btn-solid">Explore Properties</Link>
          <Link to="/about"    className="btn-outline">Our Story</Link>
        </div>
      </div>

      {/* Stats – desktop right */}
      <div className="absolute right-5 bottom-28 hidden xl:flex flex-col gap-5 z-20 text-right">
        {[['500+','Units Delivered'],['20+','Years Legacy'],['50+','Locations']].map(([v,l]) => (
          <div key={l}>
            <div className="font-display text-2xl font-bold gold-text">{v}</div>
            <div className="text-[0.55rem] tracking-widest uppercase" style={{ color: 'rgba(245,240,232,0.35)' }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => document.getElementById('home-about')?.scrollIntoView({ behavior: 'smooth' })}
        style={{ opacity: 0 }}
      >
        <span className="text-[0.55rem] tracking-[0.35em] uppercase" style={{ color: 'rgba(245,240,232,0.3)' }}>Scroll</span>
        <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom,var(--gold-mid),transparent)' }} />
        <ArrowDown size={12} style={{ color: 'rgba(200,137,26,0.6)' }} />
      </div>
    </section>
  )
}

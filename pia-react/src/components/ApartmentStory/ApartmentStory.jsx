import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ApartmentStory.css'

gsap.registerPlugin(ScrollTrigger)

// ── Story data — 5 transformation stages ──────────
const STAGES = [
  {
    img: '/images/hero-story/stage-0.jpg',
    chapter: 'Chapter I — Origin',
    title: 'Where It\nAll Begins',
    titleEm: null,
    desc: 'Every masterpiece starts with raw potential. Bare concrete, empty space — the blank canvas that holds a thousand possibilities.',
    cta: { label: 'Our Process', to: '/services' },
  },
  {
    img: '/images/hero-story/stage-1.jpg',
    chapter: 'Chapter II — Foundation',
    title: 'Structure\nTakes',
    titleEm: 'Shape',
    desc: 'Bones emerge from the shell. Windows breathe light into the space, and the floor — laid plank by plank — begins to tell its own story.',
    cta: { label: 'See How We Build', to: '/services' },
  },
  {
    img: '/images/hero-story/stage-2.jpg',
    chapter: 'Chapter III — Canvas',
    title: 'The Walls\nListen',
    titleEm: null,
    desc: 'Smooth walls absorb the light. Recessed fixtures are placed with precision. The space breathes with the clarity of intention.',
    cta: { label: 'Our Approach', to: '/about' },
  },
  {
    img: '/images/hero-story/stage-3.jpg',
    chapter: 'Chapter IV — Soul',
    title: 'Furniture\nFinds Its',
    titleEm: 'Home',
    desc: 'Piece by piece, the room gains its soul. Each element chosen not just for beauty, but for the feeling it creates in you.',
    cta: { label: 'Explore Designs', to: '/projects' },
  },
  {
    img: '/images/hero-story/stage-4.jpg',
    chapter: 'Chapter V — Revelation',
    title: 'The Art of\n',
    titleEm: 'Living',
    desc: 'The transformation is complete. What was once concrete and silence is now warmth, luxury, and the quiet confidence of a life well-designed.',
    cta: { label: 'Start Your Story', to: '/contact' },
  },
]

// dust particle positions
const DUST_PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  left: `${Math.random() * 100}%`,
  animationDelay: `${Math.random() * 8}s`,
  animationDuration: `${6 + Math.random() * 8}s`,
  drift: `${(Math.random() - 0.5) * 120}px`,
  size: `${1 + Math.random() * 3}px`,
}))

export default function ApartmentStory() {
  const sectionRef = useRef(null)
  const stageImgRefs = useRef([])
  const progressFillRef = useRef(null)
  const dotRefs = useRef([])
  const dustRef = useRef(null)
  const stageNumRef = useRef(null)
  const titleRef = useRef(null)
  const chapterRef = useRef(null)
  const descRef = useRef(null)
  const ctaRef = useRef(null)
  const scrollHintRef = useRef(null)
  const overlayRef = useRef(null)

  // Refs for per-stage content elements
  const contentRefs = useRef({
    chapters: [],
    titles: [],
    descs: [],
    ctas: [],
  })

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const total = STAGES.length
      const pin = sectionRef.current

      // ── Set initial states ─────────────────────────
      // First image visible, rest hidden
      stageImgRefs.current.forEach((el, i) => {
        gsap.set(el, { opacity: i === 0 ? 1 : 0, scale: 1.06 })
      })

      // Animate first stage content in on load
      const firstContent = document.querySelector('.apt-story__content')
      const initTl = gsap.timeline({ delay: 0.3 })
      initTl
        .to('.apt-story__chapter', {
          opacity: 1, duration: 0.7, ease: 'power2.out',
          onComplete: () => {
            gsap.to('.apt-story__chapter-line', { scaleX: 1, duration: 0.4, ease: 'power2.out' })
          },
        })
        .to('.apt-story__title', {
          opacity: 1,
          clipPath: 'inset(0 0 0% 0)',
          duration: 0.9,
          ease: 'power3.out',
        }, '-=0.3')
        .to('.apt-story__desc', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
        .to('.apt-story__cta', { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.4')
        .to(scrollHintRef.current, { opacity: 1, duration: 0.5 }, '-=0.2')

      // ── Master ScrollTrigger timeline ──────────────
      const master = gsap.timeline({
        scrollTrigger: {
          trigger: pin,
          start: 'top top',
          end: `+=${window.innerHeight * 4}`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress

            // Update progress bar fill
            if (progressFillRef.current) {
              gsap.set(progressFillRef.current, { width: `${progress * 100}%` })
            }

            // Update dust opacity (visible only in early stages)
            if (dustRef.current) {
              gsap.set(dustRef.current, { opacity: Math.max(0, 1 - progress * 3) })
            }

            // Update overlay darkness (lighter at end = more luxurious feel)
            if (overlayRef.current) {
              const darknessFactor = 0.82 - progress * 0.3
              overlayRef.current.style.background = `
                linear-gradient(
                  105deg,
                  rgba(5,5,5,${darknessFactor}) 0%,
                  rgba(5,5,5,${darknessFactor * 0.6}) 45%,
                  rgba(5,5,5,0.05) 100%
                ),
                linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 40%)
              `
            }

            // Determine current stage (0–4)
            const rawStage = progress * (total - 1)
            const currentStage = Math.round(rawStage)

            // Update dot pips
            dotRefs.current.forEach((dot, i) => {
              if (!dot) return
              const pip = dot.querySelector('.apt-story__dot-pip')
              if (pip) pip.classList.toggle('is-active', i === currentStage)
              dot.classList.toggle('is-active', i === currentStage)
            })

            // Update large stage number
            if (stageNumRef.current) {
              stageNumRef.current.textContent = `0${currentStage + 1}`
            }
          },
        },
      })

      // ── Build cross-fade timeline per stage ────────
      // Each stage occupies 1/(total-1) of the total scroll
      const segLen = 1 / (total - 1)

      // Image cross-fades
      STAGES.forEach((_, i) => {
        if (i === 0) return // already visible
        const start = (i - 1) * segLen
        const mid = start + segLen * 0.4
        const end = start + segLen

        master.to(stageImgRefs.current[i - 1], {
          opacity: 0,
          scale: 1.0,
          ease: 'power1.inOut',
        }, mid)
        master.to(stageImgRefs.current[i], {
          opacity: 1,
          scale: 1.0,
          ease: 'power1.inOut',
        }, mid)
      })

      // ── Narrative text transitions ─────────────────
      // We'll use a separate "onUpdate" approach with GSAP
      // for smooth text swapping driven by scroll progress
      const textSegLen = segLen

      // Build a GSAP tween that calls a callback per progress
      master.call(() => {}, [], 0) // anchor start

      // For text, we manually watch via onUpdate (already set above)
      // Instead, create label markers for each stage in the master tl
      // and tween text opacity in/out

      // Content text fade per stage - using a separate scrub tl
      const textTl = gsap.timeline({
        scrollTrigger: {
          trigger: pin,
          start: 'top top',
          end: `+=${window.innerHeight * 4}`,
          scrub: 0.8,
        },
      })

      const chapterEl = document.querySelector('.apt-story__chapter-label')
      const titleEl = document.querySelector('.apt-story__title')
      const descEl = document.querySelector('.apt-story__desc')
      const ctaEl = document.querySelector('.apt-story__cta')
      const ctaLabelEl = document.querySelector('.apt-story__cta-label-text')

      // For each transition between stages, we animate text
      STAGES.forEach((stage, i) => {
        if (i === 0) return
        const start = (i - 1) * segLen
        const mid = start + segLen * 0.35
        const arrive = start + segLen * 0.5

        // Fade out old text
        textTl.to([chapterEl, titleEl, descEl, ctaEl], {
          opacity: 0,
          y: -12,
          duration: segLen * 0.3,
          ease: 'power2.in',
          onComplete: () => {
            // Snap content to new stage
            if (chapterEl) chapterEl.textContent = stage.chapter
            if (titleEl) {
              if (stage.titleEm) {
                titleEl.innerHTML = stage.title.replace('\n', '<br/>') + `<em>${stage.titleEm}</em>`
              } else {
                titleEl.innerHTML = stage.title.replace('\n', '<br/>')
              }
            }
            if (descEl) descEl.textContent = stage.desc
            if (ctaEl) {
              const span = ctaEl.querySelector('.apt-story__cta-label-text')
              if (span) span.textContent = stage.cta.label
              ctaEl.href = stage.cta.to
            }
          },
        }, mid - segLen * 0.3)

        // Fade in new text
        textTl.to([chapterEl, titleEl, descEl, ctaEl], {
          opacity: 1,
          y: 0,
          duration: segLen * 0.3,
          ease: 'power2.out',
        }, arrive)
      })

      // Scroll hint fades away after first scroll
      textTl.to(scrollHintRef.current, {
        opacity: 0,
        duration: segLen * 0.2,
        ease: 'power1.in',
      }, 0.02)

    }, sectionRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  // Build initial title HTML
  const firstStage = STAGES[0]
  const firstTitleHtml = firstStage.titleEm
    ? firstStage.title.replace('\n', '<br/>') + `<em>${firstStage.titleEm}</em>`
    : firstStage.title.replace('\n', '<br/>')

  return (
    <section className="apt-story" ref={sectionRef}>

      {/* ── Background Images (stacked) ── */}
      {STAGES.map((stage, i) => (
        <img
          key={i}
          ref={(el) => (stageImgRefs.current[i] = el)}
          src={stage.img}
          alt={`Stage ${i + 1}`}
          className="apt-story__stage"
          draggable="false"
        />
      ))}

      {/* ── Overlay gradient ── */}
      <div className="apt-story__overlay" ref={overlayRef} />

      {/* ── Dust particles (visible only early stages) ── */}
      <div className="apt-story__dust" ref={dustRef}>
        {DUST_PARTICLES.map((p, i) => (
          <div
            key={i}
            className="apt-story__dust-particle"
            style={{
              left: p.left,
              bottom: '-10px',
              width: p.size,
              height: p.size,
              animationDelay: p.animationDelay,
              animationDuration: p.animationDuration,
              '--drift': p.drift,
            }}
          />
        ))}
      </div>

      {/* ── Cinematic vignette ── */}
      <div className="apt-story__vignette" />

      {/* ── Large background stage number ── */}
      <div className="apt-story__stage-num" ref={stageNumRef}>01</div>

      {/* ── Narrative content ── */}
      <div className="apt-story__content">
        <div className="apt-story__chapter">
          <span className="apt-story__chapter-line" />
          <span className="apt-story__chapter-label">{firstStage.chapter}</span>
        </div>

        <h1
          className="apt-story__title"
          ref={titleRef}
          dangerouslySetInnerHTML={{ __html: firstTitleHtml }}
        />

        <p className="apt-story__desc" ref={descRef}>
          {firstStage.desc}
        </p>

        <Link
          to={firstStage.cta.to}
          className="apt-story__cta"
          ref={ctaRef}
          style={{ alignSelf: 'flex-start' }}
        >
          <span className="apt-story__cta-label-text">{firstStage.cta.label}</span>
          <span className="apt-story__cta-arrow" />
        </Link>
      </div>

      {/* ── Scroll hint ── */}
      <div className="apt-story__scroll-hint" ref={scrollHintRef} style={{ opacity: 0 }}>
        <div className="apt-story__scroll-line" />
        <span>Scroll</span>
      </div>

      {/* ── Progress bar ── */}
      <div className="apt-story__progress-container">
        <div className="apt-story__progress-track">
          <div className="apt-story__progress-fill" ref={progressFillRef} />
        </div>
        <div className="apt-story__progress-dots">
          {STAGES.map((stage, i) => (
            <div
              key={i}
              className={`apt-story__progress-dot${i === 0 ? ' is-active' : ''}`}
              ref={(el) => (dotRefs.current[i] = el)}
            >
              <div className={`apt-story__dot-pip${i === 0 ? ' is-active' : ''}`} />
              <span className="apt-story__dot-label">{stage.chapter.split('—')[0].trim()}</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}

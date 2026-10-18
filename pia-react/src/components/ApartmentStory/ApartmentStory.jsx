'use client'

import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ApartmentStory.css'

gsap.registerPlugin(ScrollTrigger)

// ── Story data — 5 transformation stages ──────────
// `time` = second in the 10-second video where this chapter begins.
// The scroll maps 0→1 to video 0→10s; the slow-motion feel comes
// from the user scrolling through 4 viewport-heights of distance.
const STAGES = [
  {
    time: 0,
    chapter: 'Step 01',
    chapterSub: 'Raw Potential',
    title: 'Your Space,',
    titleEm: 'Our Canvas',
    desc: 'Staring at an empty apartment or office space can feel overwhelming. So many choices, so many processes... We turn your bare space into a clear, stress-free architectural vision from day one.',
    timecode: '00:00',
  },
  {
    time: 2,
    chapter: 'Step 02',
    chapterSub: 'Zero Guesswork',
    title: 'See It in 3D',
    titleEm: 'Before We Build',
    desc: 'No costly surprises or layout mistakes. We engineer photorealistic 3D renders and smart space plans so you experience every corner before construction begins.',
    timecode: '00:02',
  },
  {
    time: 4,
    chapter: 'Step 03',
    chapterSub: 'Transparent BOQ',
    title: 'Precision Engineering',
    titleEm: '& Clear Pricing',
    desc: 'Say goodbye to hidden costs and contractor delays. Our engineers and quantity surveyors manage lighting, acoustics, and premium finishes with itemized budgets and strict supervision.',
    timecode: '00:04',
  },
  {
    time: 6,
    chapter: 'Step 04',
    chapterSub: 'Custom Craft',
    title: 'Bespoke Joinery',
    titleEm: '& Styling',
    desc: 'Off-the-shelf furniture rarely fits right. Our master craftsmen fabricate custom cabinetry, modular kitchens, and signature pieces tailored to your exact dimensions and lifestyle.',
    timecode: '00:06',
  },
  {
    time: 8,
    chapter: 'Step 05',
    chapterSub: '50% Fee Refund',
    title: 'Move-In Ready.',
    titleEm: 'On Time, On Budget.',
    desc: 'We hand over your completed turnkey space ready to live or work in — and refund 50% of your design fee upon project completion. Ready to transform your space?',
    timecode: '00:08',
  },
]

// ── Video duration (seconds) ─────────────────────
// Keep this equal to the actual video length.
// Scroll scrubbing maps progress [0→1] to currentTime [0→VIDEO_DURATION].
// A 10s video at ~24fps ≈ 240 frames — typically under 8MB at 1080p H.264.
const VIDEO_DURATION = 10

// ── Split text into character spans ───────────────
function splitToChars(el) {
  if (!el) return []
  const text = el.textContent || ''
  el.innerHTML = ''
  return text.split('').map((ch) => {
    const span = document.createElement('span')
    span.className = 'apt-story__char'
    span.textContent = ch === ' ' ? '\u00A0' : ch
    el.appendChild(span)
    return span
  })
}

export default function ApartmentStory() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const progressFillRef = useRef(null)
  const filmStripRef = useRef(null)
  const scrollHintRef = useRef(null)
  const overlayRef = useRef(null)
  const letterboxTopRef = useRef(null)
  const letterboxBotRef = useRef(null)
  const glitchRef = useRef(null)
  const stageNumRef = useRef(null)
  const chapterLabelRef = useRef(null)
  const chapterSubRef = useRef(null)
  const titleRef = useRef(null)
  const titleEmRef = useRef(null)
  const descRef = useRef(null)
  const ctaGroupRef = useRef(null)
  const filmDotRefs = useRef([])

  const [activeStage, setActiveStage] = useState(0)
  const lastStageRef = useRef(0)
  const glitchTimerRef = useRef(null)

  const scrollToStage = useCallback((stageIndex) => {
    if (!sectionRef.current) return
    const allTriggers = ScrollTrigger.getAll()
    const st = allTriggers.find((t) => t.trigger === sectionRef.current)
    if (st) {
      const targetScroll = st.start + (st.end - st.start) * (stageIndex / (STAGES.length - 1)) + 5
      window.scrollTo({ top: targetScroll, behavior: 'smooth' })
    }
  }, [])

  // ── Glitch effect ──────────────────────────────
  const triggerGlitch = useCallback(() => {
    if (!glitchRef.current) return
    clearTimeout(glitchTimerRef.current)
    glitchRef.current.classList.add('is-glitching')
    glitchTimerRef.current = setTimeout(() => {
      if (glitchRef.current) glitchRef.current.classList.remove('is-glitching')
    }, 280)
  }, [])

  // ── Animate title characters in ───────────────
  const animateCharsIn = useCallback((titleEl, titleEmEl, chapterLabelEl, chapterSubEl) => {
    const allChars = [
      ...splitToChars(chapterLabelEl),
      ...splitToChars(chapterSubEl),
    ]
    const titleChars = splitToChars(titleEl)
    const emChars = splitToChars(titleEmEl)

    gsap.killTweensOf([...allChars, ...titleChars, ...emChars])

    // Chapter label chars
    gsap.from(allChars, {
      opacity: 0,
      y: 10,
      stagger: 0.025,
      duration: 0.4,
      ease: 'power3.out',
    })

    // Main title chars
    gsap.from(titleChars, {
      opacity: 0,
      y: 30,
      stagger: 0.03,
      duration: 0.5,
      ease: 'power3.out',
    })

    // Em chars (italic accent)
    gsap.from(emChars, {
      opacity: 0,
      y: 30,
      stagger: 0.04,
      duration: 0.6,
      ease: 'power3.out',
      delay: 0.18,
    })
  }, [])

  // ── Update all text content for a stage ───────
  const updateTextContent = useCallback((stageIndex, animate = true) => {
    const stage = STAGES[stageIndex]
    const chEl = chapterLabelRef.current
    const chSubEl = chapterSubRef.current
    const titleEl = titleRef.current
    const titleEmEl = titleEmRef.current
    const descEl = descRef.current

    if (chEl) chEl.textContent = stage.chapter
    if (chSubEl) chSubEl.textContent = stage.chapterSub
    if (titleEl) titleEl.textContent = stage.title
    if (titleEmEl) titleEmEl.textContent = stage.titleEm
    if (descEl) descEl.textContent = stage.desc

    if (animate) {
      animateCharsIn(titleEl, titleEmEl, chEl, chSubEl)
    }
  }, [animateCharsIn])

  // ── iOS Safari Video Kickstart ──────────────────
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true
    video.defaultMuted = true
    video.playsInline = true
    video.setAttribute('muted', '')
    video.setAttribute('playsinline', '')
    video.setAttribute('webkit-playsinline', 'true')
    video.setAttribute('x5-playsinline', 'true')

    video.load()

    const kickstart = () => {
      video.muted = true
      const p = video.play()
      if (p !== undefined) {
        p.then(() => video.pause()).catch(() => {})
      }
      window.removeEventListener('touchstart', kickstart)
      window.removeEventListener('scroll', kickstart)
      window.removeEventListener('pointerdown', kickstart)
    }

    window.addEventListener('touchstart', kickstart, { passive: true })
    window.addEventListener('scroll', kickstart, { passive: true })
    window.addEventListener('pointerdown', kickstart, { passive: true })

    return () => {
      window.removeEventListener('touchstart', kickstart)
      window.removeEventListener('scroll', kickstart)
      window.removeEventListener('pointerdown', kickstart)
    }
  }, [])

  // ── Mobile CTA touch navigation ────────────────
  // Inside GSAP-pinned sections, the browser's scroll gesture detection
  // consumes touch events before React Router's synthetic click fires.
  // Native touchend → window.location.href is the only reliable fix.
  useEffect(() => {
    const group = ctaGroupRef.current
    if (!group) return
    const links = Array.from(group.querySelectorAll('a'))

    let touchStartX = 0
    let touchStartY = 0
    let isTap = false

    const onTouchStart = (e) => {
      touchStartX = e.touches[0].clientX
      touchStartY = e.touches[0].clientY
      isTap = true
    }

    const onTouchMove = (e) => {
      const dx = Math.abs(e.touches[0].clientX - touchStartX)
      const dy = Math.abs(e.touches[0].clientY - touchStartY)
      if (dx > 8 || dy > 8) isTap = false
    }

    const handlers = links.map((link) => {
      const onTouchEnd = () => {
        if (!isTap) return
        const href = link.getAttribute('href')
        if (href && href !== '#') {
          window.location.href = href
        }
      }
      link.addEventListener('touchstart', onTouchStart, { passive: true })
      link.addEventListener('touchmove', onTouchMove, { passive: true })
      link.addEventListener('touchend', onTouchEnd, { passive: true })
      return { link, onTouchEnd }
    })

    return () => {
      handlers.forEach(({ link, onTouchEnd }) => {
        link.removeEventListener('touchstart', onTouchStart)
        link.removeEventListener('touchmove', onTouchMove)
        link.removeEventListener('touchend', onTouchEnd)
      })
    }
  }, [])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const pin = sectionRef.current
      const video = videoRef.current

      // ── Letterbox open on entry ──────────────────
      gsap.set([letterboxTopRef.current, letterboxBotRef.current], { scaleY: 1 })
      gsap.to([letterboxTopRef.current, letterboxBotRef.current], {
        scaleY: 0,
        duration: 1.2,
        ease: 'power3.inOut',
        delay: 0.2,
      })

      // ── Init first stage text (no char anim on load) ─
      updateTextContent(0, false)

      // ── Set initial states (GSAP owns these, not React) ─
      gsap.set('.apt-story__action-card', { opacity: 0, y: 18 })
      gsap.set('.apt-story__desc', { opacity: 0, y: 20 })
      gsap.set('.apt-story__chapter', { opacity: 0 })
      gsap.set('.apt-story__title-wrap', { opacity: 0 })

      // ── Entrance content animation ──────────────
      const initTl = gsap.timeline({ delay: 0.6 })
      initTl
        .to('.apt-story__chapter', { opacity: 1, duration: 0.5, ease: 'power2.out' })
        .call(() => animateCharsIn(
          titleRef.current,
          titleEmRef.current,
          chapterLabelRef.current,
          chapterSubRef.current,
        ))
        .to('.apt-story__title-wrap', { opacity: 1, duration: 0.01 }, '<')
        .to('.apt-story__desc', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.2')
        .to('.apt-story__action-card', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.5')
        .to(scrollHintRef.current, { opacity: 1, duration: 0.4 }, '-=0.3')

      // ── Master ScrollTrigger ─────────────────────
      ScrollTrigger.create({
        trigger: pin,
        start: 'top top',
        end: `+=${window.innerHeight * 4}`,
        pin: true,
        scrub: 1.5,
        anticipatePin: 1,
        onToggle: (self) => {
          if (self.isActive) {
            document.body.classList.add('in-apt-story')
          } else {
            document.body.classList.remove('in-apt-story')
          }
          window.dispatchEvent(new Event('scroll'))
        },
        onUpdate: (self) => {
          const progress = self.progress

          // 1. Scrub video (robust for iOS Safari)
          if (video) {
            const targetTime = progress * VIDEO_DURATION
            if (Number.isFinite(targetTime)) {
              try {
                video.currentTime = targetTime
              } catch (_) {}
            }
          }

          // 2. Progress fill
          if (progressFillRef.current) {
            gsap.set(progressFillRef.current, { scaleX: progress })
          }

          // 3. Overlay brightness
          if (overlayRef.current) {
            const d = 0.82 - progress * 0.28
            overlayRef.current.style.background = `
              linear-gradient(105deg,
                rgba(5,5,5,${d}) 0%,
                rgba(5,5,5,${d * 0.55}) 45%,
                rgba(5,5,5,0.22) 100%),
              linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 40%)`
          }

          // 4. Determine stage
          const rawStage = progress * (STAGES.length - 1)
          const currentStage = Math.min(
            STAGES.length - 1,
            Math.floor(rawStage + 0.5)
          )

          // 5. Stage number
          if (stageNumRef.current) {
            stageNumRef.current.textContent = `0${currentStage + 1}`
          }

          // 6. Film strip dot highlight
          filmDotRefs.current.forEach((dot, i) => {
            if (!dot) return
            dot.classList.toggle('is-active', i === currentStage)
          })

          // 7. Text + glitch on stage change
          if (currentStage !== lastStageRef.current) {
            const goingForward = currentStage > lastStageRef.current
            lastStageRef.current = currentStage
            setActiveStage(currentStage)

            triggerGlitch()

            // Fade out → swap text → fade in (CTAs & Slogan stay persistent!)
            gsap.to([
              chapterLabelRef.current,
              chapterSubRef.current,
              '.apt-story__title-wrap',
              descRef.current,
            ], {
              opacity: 0,
              y: goingForward ? -10 : 10,
              duration: 0.18,
              ease: 'power2.in',
              onComplete: () => {
                updateTextContent(currentStage, true)
                gsap.to([
                  chapterLabelRef.current,
                  chapterSubRef.current,
                  '.apt-story__title-wrap',
                  descRef.current,
                ], {
                  opacity: 1,
                  y: 0,
                  duration: 0.35,
                  ease: 'power3.out',
                })
              },
            })
          }

          // 8. Scroll hint fade
          if (scrollHintRef.current && progress > 0.05) {
            gsap.to(scrollHintRef.current, { opacity: 0, duration: 0.3 })
          }
        },
      })
    }, sectionRef)

    return () => {
      document.body.classList.remove('in-apt-story')
      ctx.revert()
      ScrollTrigger.getAll().forEach((st) => st.kill())
      clearTimeout(glitchTimerRef.current)
    }
  }, [updateTextContent, animateCharsIn, triggerGlitch])

  return (
    <section className="apt-story" ref={sectionRef}>

      {/* ── Letterbox bars ── */}
      <div className="apt-story__letterbox apt-story__letterbox--top" ref={letterboxTopRef} />
      <div className="apt-story__letterbox apt-story__letterbox--bot" ref={letterboxBotRef} />

      {/* ── Video background ── */}
      <video
        ref={videoRef}
        className="apt-story__video"
        src="/playback_opt.mp4"
        muted
        playsInline
        webkit-playsinline="true"
        x5-playsinline="true"
        preload="auto"
        aria-hidden="true"
      />

      {/* ── Gradient overlay ── */}
      <div className="apt-story__overlay" ref={overlayRef} />

      {/* ── Film grain ── */}
      <div className="apt-story__grain" aria-hidden="true" />

      {/* ── Ultra-smooth blur & softening layer ── */}
      <div className="apt-story__smooth-blur" aria-hidden="true" />

      {/* ── Cinematic vignette ── */}
      <div className="apt-story__vignette" />

      {/* ── Glitch layer ── */}
      <div className="apt-story__glitch" ref={glitchRef} aria-hidden="true" />

      {/* ── Large stage number ── */}
      <div className="apt-story__stage-num" ref={stageNumRef}>01</div>

      {/* ── Split Hero Content (Left: Narrative | Right: Brand Slogan + CTAs) ── */}
      <div className="apt-story__content">
        <div className="apt-story__narrative">
          <div className="apt-story__chapter">
            <span className="apt-story__chapter-line" />
            <span className="apt-story__chapter-label" ref={chapterLabelRef} />
            <span className="apt-story__chapter-sep">—</span>
            <span className="apt-story__chapter-sub" ref={chapterSubRef} />
          </div>

          <div className="apt-story__title-wrap">
            <h1 className="apt-story__title" ref={titleRef} />
            <em className="apt-story__title-em" ref={titleEmRef} />
          </div>

          <p className="apt-story__desc" ref={descRef} />
        </div>

        <div className="apt-story__action-card" ref={ctaGroupRef}>
          <div className="apt-story__slogan">
            <span>Modern</span>
            <span className="apt-story__slogan-dot">.</span>
            <span>Elegant</span>
            <span className="apt-story__slogan-dot">.</span>
            <span>Timeless</span>
          </div>

          <p className="apt-story__action-sub">
            Turnkey Interior &amp; Architectural Execution
          </p>

          <div className="apt-story__cta-group">
            <Link
              href="/projects"
              className="apt-story__cta apt-story__cta--primary"
            >
              <span className="apt-story__cta-label-text">View Our Works</span>
              <span className="apt-story__cta-arrow" />
            </Link>
            <Link
              href="/contact"
              className="apt-story__cta apt-story__cta--secondary"
            >
              <span className="apt-story__cta-label-text">Free Consultation</span>
              <span className="apt-story__cta-arrow" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Scroll hint ── */}
      <div className="apt-story__scroll-hint" ref={scrollHintRef} style={{ opacity: 0 }}>
        <div className="apt-story__scroll-line" />
        <span>Scroll</span>
      </div>

      {/* ── Film-strip progress nav ── */}
      <nav className="apt-story__filmstrip" ref={filmStripRef} aria-label="Chapter navigation">
        <div className="apt-story__progress-track">
          <div
            className="apt-story__progress-fill"
            ref={progressFillRef}
            style={{ transform: 'scaleX(0)' }}
          />
        </div>

        <div className="apt-story__frames">
          {STAGES.map((stage, i) => (
            <div
              key={i}
              className={`apt-story__frame${i === activeStage ? ' is-active' : ''}`}
              ref={(el) => (filmDotRefs.current[i] = el)}
              onClick={() => scrollToStage(i)}
              role="button"
              tabIndex={0}
              style={{ cursor: 'pointer' }}
            >
              {/* Film perforations */}
              <div className="apt-story__perf apt-story__perf--top">
                <span /><span /><span />
              </div>
              <div className="apt-story__perf apt-story__perf--bot">
                <span /><span /><span />
              </div>

              {/* Frame content */}
              <div className="apt-story__frame-body">
                <span className="apt-story__frame-num">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="apt-story__frame-label">
                  {stage.chapterSub}
                </span>
              </div>

              {/* Active indicator */}
              <div className="apt-story__frame-active-bar" />
            </div>
          ))}
        </div>
      </nav>

    </section>
  )
}

import { useEffect, useLayoutEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
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
    chapter: 'Chapter I',
    chapterSub: 'Origin',
    title: 'Where It All',
    titleEm: 'Begins',
    desc: 'Every masterpiece starts with raw potential. Bare concrete, empty space — the blank canvas that holds a thousand possibilities.',
    cta: { label: 'Our Process', to: '/services' },
    timecode: '00:00',
  },
  {
    time: 2,
    chapter: 'Chapter II',
    chapterSub: 'Foundation',
    title: 'Structure Takes',
    titleEm: 'Shape',
    desc: 'Bones emerge from the shell. Windows breathe light into the space, and the floor — laid plank by plank — begins to tell its own story.',
    cta: { label: 'See How We Build', to: '/services' },
    timecode: '00:02',
  },
  {
    time: 4,
    chapter: 'Chapter III',
    chapterSub: 'Canvas',
    title: 'The Walls',
    titleEm: 'Listen',
    desc: 'Smooth walls absorb the light. Recessed fixtures are placed with precision. The space breathes with the clarity of intention.',
    cta: { label: 'Our Approach', to: '/about' },
    timecode: '00:04',
  },
  {
    time: 6,
    chapter: 'Chapter IV',
    chapterSub: 'Soul',
    title: 'Furniture Finds Its',
    titleEm: 'Home',
    desc: 'Piece by piece, the room gains its soul. Each element chosen not just for beauty, but for the feeling it creates in you.',
    cta: { label: 'Explore Designs', to: '/projects' },
    timecode: '00:06',
  },
  {
    time: 8,
    chapter: 'Chapter V',
    chapterSub: 'Revelation',
    title: 'The Art of',
    titleEm: 'Living',
    desc: 'The transformation is complete. What was once concrete and silence is now warmth, luxury, and the quiet confidence of a life well-designed.',
    cta: { label: 'Start Your Story', to: '/contact' },
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
  const ctaRef = useRef(null)
  const filmDotRefs = useRef([])

  const lastStageRef = useRef(0)
  const glitchTimerRef = useRef(null)

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
      duration: 0.55,
      ease: 'power3.out',
      delay: 0.1,
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
    const ctaEl = ctaRef.current

    if (chEl) chEl.textContent = stage.chapter
    if (chSubEl) chSubEl.textContent = stage.chapterSub
    if (titleEl) titleEl.textContent = stage.title
    if (titleEmEl) titleEmEl.textContent = stage.titleEm
    if (descEl) descEl.textContent = stage.desc
    if (ctaEl) {
      const span = ctaEl.querySelector('.apt-story__cta-label-text')
      if (span) span.textContent = stage.cta.label
      ctaEl.href = stage.cta.to
    }

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
        .to('.apt-story__cta', { opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.4')
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
                rgba(5,5,5,0.04) 100%),
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

            triggerGlitch()

            // Fade out → swap text → fade in
            gsap.to([
              chapterLabelRef.current,
              chapterSubRef.current,
              '.apt-story__title-wrap',
              descRef.current,
              ctaRef.current,
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
                  ctaRef.current,
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
        defaultMuted
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

      {/* ── Narrative content ── */}
      <div className="apt-story__content">
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

        <Link
          to={STAGES[0].cta.to}
          className="apt-story__cta"
          ref={ctaRef}
          style={{ alignSelf: 'flex-start', opacity: 0 }}
        >
          <span className="apt-story__cta-label-text">{STAGES[0].cta.label}</span>
          <span className="apt-story__cta-arrow" />
        </Link>
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
              className={`apt-story__frame${i === 0 ? ' is-active' : ''}`}
              ref={(el) => (filmDotRefs.current[i] = el)}
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
                {/*<span className="apt-story__frame-timecode">{stage.timecode}</span> */}
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

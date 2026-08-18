import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowUpRight, MapPin, BedDouble, Maximize2, Star, Quote,
  Building2, Home, Briefcase, Wrench, TrendingUp, Shield
} from 'lucide-react'
import Hero from '../components/Hero'
import SectionHeader from '../components/SectionHeader'

gsap.registerPlugin(ScrollTrigger)

/* ─── useReveal hook ─── */
function useReveal(selector = '.reveal') {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    const els = ref.current.querySelectorAll(selector)
    if (!els.length) return
    const ctx = gsap.context(() => {
      gsap.fromTo(els,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.85, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 78%' },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [selector])
  return ref
}

/* ═══════════════════════════════════════════════════
   HOME ABOUT SNIPPET
═══════════════════════════════════════════════════ */
function HomeAbout() {
  const ref = useReveal()
  const imgRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(imgRef.current,
        { clipPath: 'polygon(0 100%,100% 100%,100% 100%,0 100%)', opacity: 0 },
        {
          clipPath: 'polygon(0 0%,100% 0%,100% 100%,0 100%)',
          opacity: 1, duration: 1.3, ease: 'power4.out',
          scrollTrigger: { trigger: imgRef.current, start: 'top 80%' },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="home-about" className="section-py" style={{ background: 'linear-gradient(180deg,#0f0f0d,#111210)' }}>
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">

          {/* Image */}
          <div ref={imgRef} className="relative order-2 lg:order-1">
            <div className="overflow-hidden" style={{ aspectRatio: '4/5', maxHeight: 620 }}>
              <img src="/images/property_interior.jpg" alt="Luxury interior" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,rgba(42,45,24,0.35),transparent 60%)' }} />
            </div>
            {/* Floating badge */}
            <div
              className="absolute -right-4 md:-right-8 bottom-8 p-6 md:p-8"
              style={{ background: 'rgba(10,10,9,0.95)', border: '1px solid rgba(200,137,26,0.3)' }}
            >
              <div className="font-display text-4xl md:text-5xl font-bold gold-text leading-none mb-2">20+</div>
              <p className="text-[0.6rem] tracking-widest uppercase" style={{ color: 'rgba(245,240,232,0.45)' }}>Years of Excellence</p>
            </div>
            <div className="absolute -bottom-3 -left-3 w-2/3 h-2/3 pointer-events-none" style={{ border: '1px solid rgba(200,137,26,0.15)' }} />
          </div>

          {/* Content */}
          <div ref={ref} className="order-1 lg:order-2">
            <SectionHeader label="Our Story" title='Building <span class="italic gold-text">Legacy</span> Across Dhaka' />
            <div className="h-px mb-8 gold-line-h-left" />
            <p className="reveal text-sm md:text-base leading-8 mb-6" style={{ color: 'rgba(245,240,232,0.55)', fontWeight: 300 }}>
              Since 2005, Sun Real Estate has been synonymous with architectural distinction and
              uncompromising quality in Bangladesh's premium property market. We believe that a home
              is more than a structure — it is a statement of who you are.
            </p>
            <p className="reveal text-sm md:text-base leading-8 mb-12" style={{ color: 'rgba(245,240,232,0.55)', fontWeight: 300 }}>
              From Gulshan's prestigious avenues to Banani's vibrant corridors, our projects stand
              as enduring testaments to vision, craft, and the relentless pursuit of excellence.
            </p>
            <div className="reveal grid grid-cols-2 gap-5 mb-12">
              {['Award-Winning Design', 'Prime Locations', 'Premium Materials', 'Expert After-Sales'].map(item => (
                <div key={item} className="flex items-center gap-3">
                  <span style={{ color: 'var(--gold-mid)', fontSize: '0.55rem' }}>◆</span>
                  <span className="text-xs md:text-sm" style={{ color: 'rgba(245,240,232,0.65)' }}>{item}</span>
                </div>
              ))}
            </div>
            <Link to="/about" className="reveal btn-outline" style={{ marginTop: '20px' }}>Discover Our Heritage</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   FEATURED PROJECTS
═══════════════════════════════════════════════════ */
const projects = [
  { id: 1, name: 'Sun Aura Towers', type: 'Residential', location: 'Gulshan-1, Dhaka', beds: '3–5 Bed', area: '2,400–6,800 sqft', price: 'BDT 4.5 Cr+', status: 'Ongoing', img: '/images/property_exterior.jpg', tag: 'Flagship' },
  { id: 2, name: 'Sun Penthouse Collection', type: 'Luxury Penthouse', location: 'Banani, Dhaka', beds: '4–6 Bed', area: '5,000–12,000 sqft', price: 'BDT 8 Cr+', status: 'Ready', img: '/images/property_interior.jpg', tag: 'Exclusive' },
  { id: 3, name: 'Sun Infinity Tower', type: 'Commercial', location: 'Motijheel, Dhaka', beds: 'Office', area: '1,200–8,000 sqft', price: 'BDT 2.2 Cr+', status: 'Upcoming', img: '/images/property_commercial.jpg', tag: 'Commercial' },
]

const statusStyle = {
  Ongoing: { bg: 'rgba(79,85,48,0.35)', color: '#a9b07e', border: 'rgba(79,85,48,0.6)' },
  Ready: { bg: 'rgba(200,137,26,0.15)', color: '#e5a827', border: 'rgba(200,137,26,0.4)' },
  Upcoming: { bg: 'rgba(255,255,255,0.05)', color: 'rgba(245,240,232,0.5)', border: 'rgba(255,255,255,0.12)' },
}

function FeaturedProjects() {
  const ref = useReveal('.proj-card')

  return (
    <section className="section-py" style={{ background: '#0c0c0a' }}>
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 md:mb-16">
          <SectionHeader label="Our Portfolio" title='Signature <span class="italic gold-text">Developments</span>' className="!mb-0" />
          <Link to="/projects" className="btn-outline shrink-0 self-start sm:self-auto">
            View All <ArrowUpRight size={13} />
          </Link>
        </div>

        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mt-4" style={{ marginTop: '20px' }}>
          {projects.map(p => {
            const s = statusStyle[p.status]
            return (
              <div key={p.id} className="proj-card prop-card card-dark flex flex-col">
                {/* Image */}
                <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <img src={p.img} alt={p.name} className="prop-img w-full h-full object-cover" />
                  <div className="prop-overlay absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-1.5">
                      <ArrowUpRight size={24} style={{ color: 'var(--gold)' }} />
                      <span className="text-[0.6rem] tracking-widest uppercase" style={{ color: 'rgba(245,240,232,0.8)' }}>View Details</span>
                    </div>
                  </div>
                  {/* Tag */}
                  <div className="absolute top-4 left-4">
                    <span className="font-accent text-[0.55rem] tracking-widest px-3 py-1 uppercase"
                      style={{ background: 'rgba(10,10,9,0.85)', border: '1px solid rgba(200,137,26,0.4)', color: 'var(--gold)' }}>
                      {p.tag}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="text-[0.55rem] tracking-widest px-3 py-1 rounded-full"
                      style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
                      {p.status}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="card-body flex flex-col flex-1">
                  <span className="text-[0.6rem] tracking-widest uppercase mb-2" style={{ color: 'rgba(200,137,26,0.7)' }}>{p.type}</span>
                  <h3 className="font-display text-xl md:text-2xl mb-4 leading-tight" style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{p.name}</h3>
                  <div className="flex flex-col gap-2 mb-6">
                    <div className="flex items-center gap-2.5">
                      <MapPin size={12} style={{ color: 'var(--gold-mid)', flexShrink: 0 }} />
                      <span className="text-xs" style={{ color: 'rgba(245,240,232,0.4)' }}>{p.location}</span>
                    </div>
                    <div className="flex items-center gap-5">
                      <div className="flex items-center gap-2">
                        <BedDouble size={12} style={{ color: 'var(--gold-mid)' }} />
                        <span className="text-xs" style={{ color: 'rgba(245,240,232,0.4)' }}>{p.beds}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Maximize2 size={12} style={{ color: 'var(--gold-mid)' }} />
                        <span className="text-xs" style={{ color: 'rgba(245,240,232,0.4)' }}>{p.area}</span>
                      </div>
                    </div>
                  </div>
                  <div className="h-px mb-6 gold-line-h-left" />
                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <p className="text-[0.55rem] tracking-widest uppercase mb-0.5" style={{ color: 'rgba(245,240,232,0.3)' }}>Starting From</p>
                      <p className="font-display text-lg md:text-xl font-semibold gold-text">{p.price}</p>
                    </div>
                    <Link to="/projects"
                      className="w-10 h-10 flex items-center justify-center border transition-all duration-300"
                      style={{ borderColor: 'rgba(200,137,26,0.3)', color: 'var(--gold-mid)' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold-mid)'; e.currentTarget.style.color = '#0f0f0d'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--gold-mid)'; }}
                    >
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section >
  )
}

/* ═══════════════════════════════════════════════════
   SERVICES SNIPPET (3 cards)
═══════════════════════════════════════════════════ */
const services3 = [
  { icon: Home, title: 'Residential', desc: 'Landmark apartment towers and gated communities crafted for discerning homeowners.' },
  { icon: Building2, title: 'Commercial', desc: 'Premium office towers and mixed-use developments designed to elevate business.' },
  { icon: TrendingUp, title: 'Investment', desc: 'Expert guidance with deep market insights to maximize your real estate returns.' },
]

function ServicesSnippet() {
  const ref = useReveal('.svc-item')

  return (
    <section className="section-py" style={{ background: 'linear-gradient(180deg,#0f0f0d,#0c0c0a)' }}>
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 md:mb-16">
          <SectionHeader label="What We Offer" title='Services Built on <span class="italic gold-text">Excellence</span>' className="!mb-0" />
          <Link to="/services" className="btn-outline shrink-0 self-start sm:self-auto">
            All Services <ArrowUpRight size={13} />
          </Link>
        </div>
        <div ref={ref} className="grid sm:grid-cols-3 gap-8 lg:gap-10" style={{ marginTop: '20px' }}>
          {services3.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="svc-item svc-card p-8 md:p-10 flex flex-col gap-6">
              <div className="w-12 h-12 flex items-center justify-center" style={{ border: '1px solid rgba(200,137,26,0.25)' }}>
                <Icon size={20} style={{ color: 'var(--gold-mid)' }} />
              </div>
              <div>
                <h3 className="font-display text-xl md:text-2xl mb-3" style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{title}</h3>
                <p className="text-xs md:text-sm leading-8" style={{ color: 'rgba(245,240,232,0.45)', fontWeight: 300 }}>{desc}</p>
              </div>
              <Link to="/services" className="flex items-center gap-2 text-xs mt-auto pt-2"
                style={{ color: 'var(--gold-mid)', letterSpacing: '0.12em' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--gold-mid)'}
              >
                Learn More <ArrowUpRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   STATS
═══════════════════════════════════════════════════ */
const stats = [
  { end: 500, suf: '+', label: 'Units Delivered' },
  { end: 20, suf: '+', label: 'Years of Legacy' },
  { end: 50, suf: '+', label: 'Prime Locations' },
  { end: 98, suf: '%', label: 'Client Satisfaction' },
]

function Counter({ end, suf, label, go }) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!go) return
    const start = performance.now()
    const dur = 1800
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1)
      setV(Math.floor((1 - Math.pow(1 - p, 3)) * end))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [go, end])

  return (
    <div className="text-center py-12 px-6">
      <div className="stat-num font-display leading-none mb-3" style={{ fontSize: 'clamp(2.8rem,6vw,5.5rem)' }}>
        {v}{suf}
      </div>
      <p className="text-xs tracking-widest uppercase" style={{ color: 'rgba(245,240,232,0.4)' }}>{label}</p>
    </div>
  )
}

function StatsSection() {
  const ref = useRef(null)
  const [go, setGo] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top 80%',
        onEnter: () => setGo(true),
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="section-py" style={{ background: '#0a0a09', position: 'relative', overflow: 'hidden' }}>
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "url('/images/hero_bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }} />
      <div className="absolute inset-0" style={{ background: 'rgba(10,10,9,0.92)' }} />
      <div className="container relative z-10">
        <SectionHeader center label="Our Numbers" title='Two Decades of <span class="italic gold-text">Transforming</span> Dhaka' />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0" style={{ border: '1px solid rgba(200,137,26,0.12)', marginTop: '20px', marginBottom: '20px' }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{
              borderRight: i < 3 ? '1px solid rgba(200,137,26,0.1)' : 'none',
            }}>
              <Counter {...s} go={go} />
            </div>
          ))}
        </div>
        {/* Marquee */}
        <div className="mt-20 overflow-hidden py-6 border-t border-b" style={{ borderColor: 'rgba(200,137,26,0.1)' }}>
          <div className="marquee-track">
            {Array(2).fill(['Award-Winning Design', '·', 'Luxury Living', '·', 'Dhaka Heritage', '·', 'Premium Craftsmanship', '·', 'Trusted Since 2005', '·', 'Sun Real Estate', '·']).flat().map((t, i) => (
              <span key={i} className={`px-8 text-xs ${t === '·' ? '' : 'font-accent'}`}
                style={{ color: t === '·' ? 'var(--gold-mid)' : 'rgba(245,240,232,0.2)', letterSpacing: '0.2em' }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   TESTIMONIALS
═══════════════════════════════════════════════════ */
const testimonials = [
  {
    name: 'Rahman A. Chowdhury',
    role: 'CEO, Apex Industries',
    property: 'Penthouse Owner, Sun Aura Towers',
    initials: 'RC',
    location: 'Gulshan-1',
    rating: 5,
    text: 'Sun Real Estate redefines what luxury living means in Dhaka. Our penthouse at Sun Aura Towers is beyond anything we imagined — the craftsmanship, the light, the panoramic views, and the bespoke after-sales service. Truly world-class.',
  },
  {
    name: 'Nadia Islam',
    role: 'Managing Director & Investor',
    property: 'Resident, Infinity Tower',
    initials: 'NI',
    location: 'Banani',
    rating: 5,
    text: "As a commercial real estate investor I've worked with many top developers across South Asia. None match Sun RE's architectural distinction, transparent timelines, and commitment to building timeless structures.",
  },
  {
    name: 'Dr. Khalid Hossain',
    role: 'Senior Medical Specialist',
    property: 'Resident, The Grand Reserve',
    initials: 'KH',
    location: 'Baridhara',
    rating: 5,
    text: 'From the initial design consultation to our private handover ceremony, the team made every step effortless. The acoustic insulation, marble finishing, and security systems are exceptional — worth every single taka.',
  },
]

function Testimonials() {
  const ref = useReveal('.testi-card')

  return (
    <section className="section-py" style={{ background: 'linear-gradient(180deg,#0f0f0d 0%,#080807 100%)', position: 'relative' }}>
      <div className="container relative z-10">
        <SectionHeader
          center
          label="Testimonials"
          title='Voices of Our <span class="italic gold-text">Residents</span>'
          subtitle="Discover what living in a Sun Real Estate landmark feels like from our distinguished homeowners."
        />

        <div ref={ref} className="grid md:grid-cols-3 gap-8 lg:gap-12 mt-12 md:mt-16" style={{ marginTop: '20px' }}>
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testi-card card-dark flex flex-col justify-between"
              style={{
                padding: '2.5rem',
                border: '1px solid rgba(200,137,26,0.18)',
                background: 'linear-gradient(145deg, rgba(20,20,18,0.9), rgba(12,12,10,0.95))',
              }}
            >
              <div className="flex flex-col gap-6">
                {/* Top bar: Avatar + Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div
                      className="w-12 h-12 flex items-center justify-center font-display font-bold text-lg gold-text shrink-0"
                      style={{ border: '1px solid rgba(200,137,26,0.3)', background: 'rgba(200,137,26,0.06)' }}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <span className="text-[0.6rem] tracking-widest uppercase block" style={{ color: 'var(--gold-mid)' }}>
                        {t.location}
                      </span>
                      <span className="text-xs text-neutral-400 font-light block">Verified Resident</span>
                    </div>
                  </div>

                  <div
                    className="w-10 h-10 flex items-center justify-center shrink-0"
                    style={{ border: '1px solid rgba(200,137,26,0.2)', background: 'rgba(200,137,26,0.03)' }}
                  >
                    <Quote size={16} style={{ color: 'var(--gold-mid)' }} />
                  </div>
                </div>

                {/* Stars */}
                <div className="flex gap-1.5 pt-1">
                  {Array(t.rating).fill(0).map((_, j) => (
                    <Star key={j} size={13} style={{ color: 'var(--gold)', fill: 'var(--gold)' }} />
                  ))}
                </div>

                {/* Quote text */}
                <p className="font-display italic text-base md:text-lg leading-relaxed text-neutral-300 font-light">
                  "{t.text}"
                </p>
              </div>

              {/* Divider & Author footer */}
              <div className="pt-8 mt-8 border-t border-white/10 flex flex-col gap-1">
                <p className="text-sm md:text-base font-medium text-neutral-100">{t.name}</p>
                <p className="text-xs text-neutral-400 font-light">{t.role}</p>
                <p className="text-[0.65rem] text-[#c8891a] tracking-wider uppercase mt-1 font-accent">{t.property}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════════════ */
export default function HomePage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <Hero />
      <HomeAbout />
      <FeaturedProjects />
      <ServicesSnippet />
      <StatsSection />
      <Testimonials />
    </>
  )
}

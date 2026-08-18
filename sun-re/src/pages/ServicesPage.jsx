import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Home, Building2, Briefcase, TrendingUp, Shield,
         BarChart3, Layers, Paintbrush, ArrowUpRight } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'

gsap.registerPlugin(ScrollTrigger)

function useReveal(sel = '.reveal') {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    const els = ref.current.querySelectorAll(sel)
    if (!els.length) return
    const ctx = gsap.context(() => {
      gsap.fromTo(els,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 78%' } }
      )
    }, ref)
    return () => ctx.revert()
  }, [sel])
  return ref
}

const mainServices = [
  {
    icon: Home,
    number: '01',
    title: 'Residential Development',
    tagline: 'Homes that reflect your success',
    desc: 'We develop landmark residential towers, boutique apartment complexes, and gated communities across Dhaka\'s most coveted addresses. Every project is a testament to sophisticated design and uncompromising quality.',
    features: ['Custom floor plans (1,200–12,000 sqft)','Smart home integration','Rooftop infinity pools','24/7 concierge service','CCTV & biometric access','Covered parking & EV charging'],
  },
  {
    icon: Building2,
    number: '02',
    title: 'Commercial Development',
    tagline: 'Spaces where businesses thrive',
    desc: 'From grade-A office towers to modern retail complexes and mixed-use developments, we create commercial properties that drive productivity, impress clients, and deliver exceptional investment returns.',
    features: ['Grade-A office specifications','Fibre-optic ready infrastructure','Central air conditioning','Dedicated boardrooms & lounges','24/7 facility management','LEED-certified sustainable design'],
  },
  {
    icon: Briefcase,
    number: '03',
    title: 'Investment Advisory',
    tagline: 'Grow your wealth with confidence',
    desc: 'Our seasoned investment specialists provide comprehensive guidance on real estate acquisitions, portfolio management, and market timing — backed by two decades of deep market intelligence in Bangladesh.',
    features: ['Market analysis reports','ROI projection modelling','Legal due diligence support','Portfolio diversification strategy','Off-plan investment access','Exit strategy planning'],
  },
  {
    icon: Paintbrush,
    number: '04',
    title: 'Interior Finishing',
    tagline: 'Curated spaces, flawless execution',
    desc: 'Our in-house interior team transforms bare units into extraordinary living environments. From material selection and custom joinery to lighting design and furnishing, we handle every detail with exquisite care.',
    features: ['Italian marble & premium flooring','Custom kitchen & cabinetry','Designer bathroom fittings','Bespoke furniture sourcing','Art curation & styling','Project managed delivery'],
  },
  {
    icon: TrendingUp,
    number: '05',
    title: 'Property Management',
    tagline: 'Your investment, expertly managed',
    desc: 'We offer full-spectrum property management services that protect and grow your asset\'s value. From tenant sourcing and rent collection to maintenance and compliance — we handle it all.',
    features: ['Tenant screening & onboarding','Rent collection & reporting','Routine & emergency maintenance','Legal compliance management','Financial reporting dashboard','Vacancy minimisation strategy'],
  },
  {
    icon: Shield,
    number: '06',
    title: 'Lifetime After-Sales',
    tagline: 'Support that never ends',
    desc: 'Our commitment to you does not end at handover. Our dedicated after-sales team is available around the clock to ensure your property remains in pristine condition for years to come.',
    features: ['10-year structural warranty','Dedicated relationship manager','Annual property health check','Priority maintenance response','Snagging & defect resolution','Resale & rental support'],
  },
]

const process = [
  { step:'01', title:'Initial Consultation', desc:'Understand your goals, preferences, and budget in a one-on-one session with our specialists.' },
  { step:'02', title:'Property Shortlisting', desc:'We curate a personalised selection of properties that align perfectly with your requirements.' },
  { step:'03', title:'Site Visits & Showcase', desc:'Guided tours of shortlisted properties, with detailed architectural and specification walkthroughs.' },
  { step:'04', title:'Financial Structuring', desc:'Our team assists with financing options, instalment plans, and legal documentation.' },
  { step:'05', title:'Booking & Agreement', desc:'Secure your property with a transparent sale agreement, milestone payments, and clear timelines.' },
  { step:'06', title:'Handover & Support', desc:'Keys in hand, with lifetime after-sales support from your dedicated Sun Real Estate manager.' },
]

export default function ServicesPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const servicesRef = useReveal('.svc-card-wrap')
  const processRef  = useReveal('.proc-item')
  const whyRef      = useReveal('.why-item')

  return (
    <>
      {/* Page Hero */}
      <div className="page-hero" style={{ background:'linear-gradient(180deg,#0a0a09,#0f0f0d)' }}>
        <div className="absolute inset-0 opacity-12"
          style={{ backgroundImage:"url('/images/property_commercial.jpg')", backgroundSize:'cover', backgroundPosition:'center' }} />
        <div className="absolute inset-0" style={{ background:'rgba(10,10,9,0.92)' }} />
        <div className="container relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-7 h-px" style={{ background:'var(--gold-mid)' }} />
            <span className="section-label" style={{ fontSize:'0.65rem' }}>What We Offer</span>
          </div>
          <h1 className="font-display leading-tight mb-5"
            style={{ fontSize:'clamp(2.5rem,6vw,5.5rem)', color:'var(--text-primary)', fontWeight:300, maxWidth:700 }}>
            Services Built on <span className="italic gold-text">Excellence</span>
          </h1>
          <p className="text-sm md:text-base max-w-2xl" style={{ color:'rgba(245,240,232,0.55)', fontWeight:300, lineHeight:1.9 }}>
            From the first architectural sketch to lifetime property care, we deliver an end-to-end real estate experience
            that is as seamless as it is extraordinary.
          </p>
        </div>
      </div>

      {/* Main Services List */}
      <section className="section-py" style={{ background:'#0c0c0a' }}>
        <div className="container">
          <div ref={servicesRef} className="flex flex-col gap-12 md:gap-16">
            {mainServices.map((svc, i) => {
              const Icon = svc.icon
              const isEven = i % 2 === 0
              return (
                <div
                  key={svc.number}
                  className="svc-card-wrap card-dark grid md:grid-cols-2 overflow-hidden"
                  style={{
                    border: '1px solid rgba(200,137,26,0.18)',
                    background: 'linear-gradient(145deg, rgba(20,20,18,0.9), rgba(12,12,10,0.95))',
                  }}
                >
                  {/* Content half */}
                  <div
                    className={`flex flex-col justify-between ${isEven ? '' : 'md:order-2'}`}
                    style={{ padding: '3rem 2.5rem' }}
                  >
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <div
                          className="w-12 h-12 flex items-center justify-center shrink-0"
                          style={{ border: '1px solid rgba(200,137,26,0.3)', background: 'rgba(200,137,26,0.05)' }}
                        >
                          <Icon size={22} style={{ color: 'var(--gold-mid)' }} />
                        </div>
                        <span className="font-accent text-xs tracking-widest text-[#c8891a]/60">
                          {svc.number}
                        </span>
                      </div>
                      <p className="text-[0.62rem] tracking-[0.35em] uppercase mb-3 text-[#c8891a]/70 font-accent">{svc.tagline}</p>
                      <h2 className="font-display text-2xl md:text-3xl lg:text-4xl mb-5 leading-snug text-neutral-100 font-normal">
                        {svc.title}
                      </h2>
                      <p className="text-sm md:text-base leading-relaxed mb-8 text-neutral-400 font-light">
                        {svc.desc}
                      </p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mb-10">
                        {svc.features.map(f => (
                          <li key={f} className="flex items-start gap-3 text-xs md:text-sm text-neutral-300 font-light">
                            <span style={{ color: 'var(--gold-mid)', marginTop: '0.2rem', flexShrink: 0, fontSize: '0.5rem' }}>◆</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link to="/contact" className="btn-outline self-start">
                      Enquire Now <ArrowUpRight size={13} />
                    </Link>
                  </div>

                  {/* Visual accent half */}
                  <div
                    className={`hidden md:flex flex-col items-center justify-center p-12 ${isEven ? '' : 'md:order-1'}`}
                    style={{
                      background: 'rgba(200,137,26,0.025)',
                      borderLeft: isEven ? '1px solid rgba(200,137,26,0.1)' : 'none',
                      borderRight: isEven ? 'none' : '1px solid rgba(200,137,26,0.1)',
                    }}
                  >
                    <div className="text-center">
                      <div
                        className="font-display font-bold gold-text leading-none mb-4"
                        style={{ fontSize: 'clamp(5rem,10vw,9rem)', opacity: 0.15 }}
                      >
                        {svc.number}
                      </div>
                      <div
                        className="w-16 h-16 mx-auto flex items-center justify-center"
                        style={{ border: '1px solid rgba(200,137,26,0.3)', background: 'rgba(10,10,9,0.8)' }}
                      >
                        <Icon size={28} style={{ color: 'var(--gold)' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="section-py" style={{ background:'linear-gradient(180deg,#0f0f0d 0%,#0c0c0a 100%)' }}>
        <div className="container">
          <SectionHeader
            center
            label="How We Work"
            title='Our <span class="italic gold-text">Process</span>'
            subtitle="A seamless six-step journey from initial consultation to keys in hand."
          />
          <div ref={processRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mt-12 md:mt-16">
            {process.map(p => (
              <div
                key={p.step}
                className="proc-item svc-card relative overflow-hidden flex flex-col justify-between"
                style={{ padding: '2.5rem' }}
              >
                <div className="absolute top-4 right-5 font-display text-5xl font-bold pointer-events-none select-none"
                  style={{ color: 'rgba(200,137,26,0.07)' }}>{p.step}</div>
                <div>
                  <div className="font-accent text-xs tracking-widest gold-text mb-4">Step {p.step}</div>
                  <h4 className="font-display text-xl md:text-2xl mb-3 text-neutral-100 font-medium">{p.title}</h4>
                  <p className="text-xs md:text-sm leading-relaxed text-neutral-400 font-light">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-py" style={{ background:'#0a0a09' }}>
        <div className="container">
          <SectionHeader center label="Why Sun RE" title='Why Clients <span class="italic gold-text">Choose Us</span>' />
          <div ref={whyRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mt-12 md:mt-16">
            {[
              { icon:BarChart3, stat:'#1',   label:'Luxury Developer in Dhaka', desc:'Ranked top by Bangladesh Real Estate Summit 3 years running.' },
              { icon:Shield,    stat:'10yr', label:'Structural Warranty',        desc:'Unmatched peace of mind with decade-long construction guarantee.' },
              { icon:Layers,    stat:'500+', label:'Units Delivered',             desc:'Over half a thousand premium homes delivered across Dhaka.' },
              { icon:TrendingUp,stat:'98%',  label:'Client Satisfaction',         desc:'An industry-leading score from post-handover customer surveys.' },
            ].map(({ icon:Icon, stat, label, desc }) => (
              <div
                key={label}
                className="why-item svc-card text-center flex flex-col items-center gap-5"
                style={{ padding: '2.75rem 2rem' }}
              >
                <div className="w-13 h-13 flex items-center justify-center" style={{ border:'1px solid rgba(200,137,26,0.25)', width:'3.25rem', height:'3.25rem' }}>
                  <Icon size={22} style={{ color:'var(--gold-mid)' }} />
                </div>
                <div className="font-display text-4xl font-bold gold-text">{stat}</div>
                <h4 className="font-display text-base md:text-lg text-neutral-100 font-medium">{label}</h4>
                <p className="text-xs leading-relaxed text-neutral-400 font-light">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-py" style={{ background:'#0f0f0d' }}>
        <div className="container text-center max-w-4xl mx-auto">
          <div
            className="card-luxury flex flex-col items-center"
            style={{ padding: '3.5rem 2.5rem' }}
          >
            <SectionHeader
              center
              label="Get Started"
              title='Ready to <span class="italic gold-text">Begin?</span>'
              subtitle="Schedule a free consultation with our property experts today."
            />
            <div className="flex flex-col sm:flex-row gap-5 justify-center mt-6">
              <Link to="/contact" className="btn-solid">Book Consultation</Link>
              <Link to="/projects" className="btn-outline">Browse Projects</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

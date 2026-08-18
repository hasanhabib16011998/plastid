import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Home, Building2, Briefcase, Wrench, TrendingUp, Shield,
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
  const servicesRef = useReveal('.svc-row')
  const processRef  = useReveal('.proc-item')
  const whyRef      = useReveal('.why-item')

  return (
    <>
      {/* Page Hero */}
      <div className="page-hero" style={{ background:'linear-gradient(180deg,#0a0a09,#0f0f0d)' }}>
        <div className="absolute inset-0 opacity-12"
          style={{ backgroundImage:"url('/images/property_commercial.jpg')", backgroundSize:'cover', backgroundPosition:'center' }} />
        <div className="absolute inset-0" style={{ background:'rgba(10,10,9,0.9)' }} />
        <div className="container relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-7 h-px" style={{ background:'var(--gold-mid)' }} />
            <span className="section-label" style={{ fontSize:'0.6rem' }}>What We Offer</span>
          </div>
          <h1 className="font-display leading-tight mb-4"
            style={{ fontSize:'clamp(2.5rem,6vw,5.5rem)', color:'var(--text-primary)', fontWeight:300, maxWidth:650 }}>
            Services Built on <span className="italic gold-text">Excellence</span>
          </h1>
          <p className="text-sm md:text-base max-w-xl" style={{ color:'rgba(245,240,232,0.5)', fontWeight:300, lineHeight:1.9 }}>
            From the first sketch to lifetime after-care, we deliver an end-to-end real estate experience
            that is as seamless as it is exceptional.
          </p>
        </div>
      </div>

      {/* Services list */}
      <section className="section-py" style={{ background:'#0c0c0a' }}>
        <div className="container">
          <div ref={servicesRef} className="flex flex-col gap-0" style={{ border:'1px solid rgba(200,137,26,0.08)' }}>
            {mainServices.map((svc, i) => {
              const Icon = svc.icon
              const isEven = i % 2 === 0
              return (
                <div key={svc.number}
                  className="svc-row grid md:grid-cols-2 border-b last:border-b-0"
                  style={{ borderColor:'rgba(200,137,26,0.08)' }}>
                  {/* Content */}
                  <div className={`p-8 md:p-12 lg:p-16 flex flex-col justify-center ${isEven ? '' : 'md:order-2'}`}>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-11 h-11 flex items-center justify-center shrink-0"
                        style={{ border:'1px solid rgba(200,137,26,0.25)' }}>
                        <Icon size={18} style={{ color:'var(--gold-mid)' }} />
                      </div>
                      <span className="font-accent text-[0.55rem] tracking-widest" style={{ color:'rgba(200,137,26,0.45)' }}>
                        {svc.number}
                      </span>
                    </div>
                    <p className="text-[0.6rem] tracking-[0.3em] uppercase mb-2" style={{ color:'rgba(200,137,26,0.6)' }}>{svc.tagline}</p>
                    <h2 className="font-display text-2xl md:text-3xl lg:text-4xl mb-4 leading-snug"
                      style={{ color:'var(--text-primary)', fontWeight:400 }}>{svc.title}</h2>
                    <p className="text-sm leading-8 mb-6" style={{ color:'rgba(245,240,232,0.5)', fontWeight:300 }}>{svc.desc}</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 mb-8">
                      {svc.features.map(f => (
                        <li key={f} className="flex items-start gap-2 text-xs" style={{ color:'rgba(245,240,232,0.55)' }}>
                          <span style={{ color:'var(--gold-mid)', marginTop:'0.1rem', flexShrink:0 }}>◆</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link to="/contact" className="btn-outline self-start">
                      Enquire Now <ArrowUpRight size={13} />
                    </Link>
                  </div>
                  {/* Visual accent */}
                  <div className={`hidden md:flex items-center justify-center p-12 ${isEven ? '' : 'md:order-1'}`}
                    style={{ background:'rgba(200,137,26,0.025)', borderLeft: isEven ? '1px solid rgba(200,137,26,0.08)' : 'none',
                      borderRight: isEven ? 'none' : '1px solid rgba(200,137,26,0.08)' }}>
                    <div className="text-center">
                      <div className="font-display font-bold gold-text leading-none mb-2"
                        style={{ fontSize:'clamp(5rem,10vw,9rem)', opacity:0.15 }}>
                        {svc.number}
                      </div>
                      <div className="w-12 h-12 mx-auto flex items-center justify-center"
                        style={{ border:'1px solid rgba(200,137,26,0.3)' }}>
                        <Icon size={22} style={{ color:'var(--gold)' }} />
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
      <section className="section-py" style={{ background:'linear-gradient(180deg,#0f0f0d,#0c0c0a)' }}>
        <div className="container">
          <SectionHeader center label="How We Work" title='Our <span class="italic gold-text">Process</span>'
            subtitle="A seamless six-step journey from initial consultation to keys in hand." />
          <div ref={processRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {process.map(p => (
              <div key={p.step} className="proc-item p-7 svc-card relative overflow-hidden">
                <div className="absolute top-3 right-4 font-display text-5xl font-bold pointer-events-none"
                  style={{ color:'rgba(200,137,26,0.06)' }}>{p.step}</div>
                <div className="font-accent text-[0.6rem] tracking-widest gold-text mb-3">Step {p.step}</div>
                <h4 className="font-display text-xl mb-3" style={{ color:'var(--text-primary)', fontWeight:500 }}>{p.title}</h4>
                <p className="text-xs leading-7" style={{ color:'rgba(245,240,232,0.45)', fontWeight:300 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-py" style={{ background:'#0a0a09' }}>
        <div className="container">
          <SectionHeader center label="Why Sun RE" title='Why Clients <span class="italic gold-text">Choose Us</span>' />
          <div ref={whyRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon:BarChart3, stat:'#1',   label:'Luxury Developer in Dhaka', desc:'Ranked top by Bangladesh Real Estate Summit 3 years running.' },
              { icon:Shield,    stat:'10yr', label:'Structural Warranty',        desc:'Unmatched peace of mind with decade-long construction guarantee.' },
              { icon:Layers,    stat:'500+', label:'Units Delivered',             desc:'Half a millennium of premium homes across Dhaka.' },
              { icon:TrendingUp,stat:'98%',  label:'Client Satisfaction',         desc:'An industry-leading score from post-handover surveys.' },
            ].map(({ icon:Icon, stat, label, desc }) => (
              <div key={label} className="why-item p-7 svc-card text-center flex flex-col items-center gap-3">
                <div className="w-11 h-11 flex items-center justify-center" style={{ border:'1px solid rgba(200,137,26,0.25)' }}>
                  <Icon size={18} style={{ color:'var(--gold-mid)' }} />
                </div>
                <div className="font-display text-3xl font-bold gold-text">{stat}</div>
                <h4 className="font-display text-base" style={{ color:'var(--text-primary)', fontWeight:500 }}>{label}</h4>
                <p className="text-xs leading-6" style={{ color:'rgba(245,240,232,0.4)', fontWeight:300 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py" style={{ background:'#0f0f0d' }}>
        <div className="container text-center max-w-2xl mx-auto">
          <SectionHeader center label="Get Started" title='Ready to <span class="italic gold-text">Begin?</span>'
            subtitle="Schedule a free consultation with our property experts today." />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-solid">Book Consultation</Link>
            <Link to="/projects" className="btn-outline">Browse Projects</Link>
          </div>
        </div>
      </section>
    </>
  )
}

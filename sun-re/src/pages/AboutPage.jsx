import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, CheckCircle } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'

gsap.registerPlugin(ScrollTrigger)

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    const els = ref.current.querySelectorAll('.reveal')
    if (!els.length) return
    const ctx = gsap.context(() => {
      gsap.fromTo(els,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 78%' } }
      )
    }, ref)
    return () => ctx.revert()
  }, [])
  return ref
}

const milestones = [
  { year:'2005', title:'Founded',       desc:'Sun Real Estate established in Gulshan, Dhaka with a vision to redefine luxury living.' },
  { year:'2008', title:'First Tower',   desc:'Delivered our inaugural residential tower — Sun Heights in Banani — setting new quality benchmarks.' },
  { year:'2012', title:'Expansion',     desc:'Extended portfolio to commercial developments, earning the REHAB Award for Best Developer.' },
  { year:'2016', title:'500 Units',     desc:'Crossed 500 delivered units, cementing our position as Dhaka\'s most trusted luxury developer.' },
  { year:'2020', title:'Green Pledge',  desc:'Launched our sustainability charter; first Dhaka developer to achieve LEED Gold certification.' },
  { year:'2025', title:'20 Years',      desc:'Celebrating two decades of building Bangladesh\'s most iconic addresses and 12,000+ families housed.' },
]

const values = [
  { title:'Integrity',     desc:'Every promise we make is a promise we keep. Transparency and trust are the foundation of every relationship.' },
  { title:'Excellence',    desc:'We pursue perfection in every detail — from architectural conception to the finishing of every tile.' },
  { title:'Innovation',    desc:'Embracing modern design and sustainable technology to build homes fit for the future.' },
  { title:'Community',     desc:'We build more than buildings; we cultivate thriving communities that enrich Dhaka\'s urban fabric.' },
]

const awards = [
  { year:'2024', title:'Best Luxury Developer',       org:'Bangladesh Real Estate Summit'    },
  { year:'2023', title:'LEED Gold Certification',     org:'US Green Building Council'        },
  { year:'2022', title:'Architecture Excellence',     org:'REHAB Annual Awards'              },
  { year:'2021', title:'Best High-Rise Residential',  org:'Asia Pacific Property Awards'     },
  { year:'2019', title:'Customer Choice Award',       org:'Bangladesh Business Excellence'   },
  { year:'2017', title:'Sustainable Development',     org:'UN Habitat Bangladesh'            },
]

export default function AboutPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const heroRef    = useRef(null)
  const timelineRef = useReveal()
  const valuesRef  = useReveal()
  const awardsRef  = useReveal()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current?.querySelectorAll('.h-reveal'),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.1 }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* Page Hero */}
      <div className="page-hero" ref={heroRef}>
        {/* BG accent */}
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage:"url('/images/property_exterior.jpg')", backgroundSize:'cover', backgroundPosition:'center top' }} />
        <div className="absolute inset-0" style={{ background:'linear-gradient(180deg,rgba(10,10,9,0.7) 0%,rgba(10,10,9,0.96) 100%)' }} />
        <div className="container relative z-10">
          <div className="flex items-center gap-3 mb-5 h-reveal">
            <div className="w-7 h-px" style={{ background:'var(--gold-mid)' }} />
            <span className="section-label" style={{ fontSize:'0.6rem' }}>About Sun Real Estate</span>
          </div>
          <h1 className="font-display leading-tight mb-5 h-reveal"
            style={{ fontSize:'clamp(2.5rem,6vw,5.5rem)', color:'var(--text-primary)', fontWeight:300, maxWidth:700 }}>
            Building <span className="italic gold-text">Dreams</span>,<br />Shaping <span className="italic gold-text">Dhaka</span>
          </h1>
          <p className="text-sm md:text-base leading-8 max-w-2xl mb-8 h-reveal"
            style={{ color:'rgba(245,240,232,0.5)', fontWeight:300 }}>
            For over two decades, Sun Real Estate has been the gold standard in Bangladesh's luxury property market.
            We are not just builders — we are vision makers, community shapers, and custodians of Dhaka's most
            extraordinary addresses.
          </p>
          <div className="flex flex-wrap gap-4 h-reveal">
            <Link to="/projects" className="btn-solid">Our Projects</Link>
            <Link to="/contact"  className="btn-outline">Get in Touch</Link>
          </div>
        </div>
      </div>

      {/* Vision & Mission */}
      <section className="section-py" style={{ background:'linear-gradient(180deg,#0f0f0d,#111210)' }}>
        <div className="container">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            {[
              { label:'Our Vision', icon:'◈', heading:'A skyline worthy of Dhaka\'s ambitions.',
                body:'We envision a Dhaka where architectural beauty meets functional living — where every Sun Real Estate building becomes a landmark that defines the city\'s character and elevates its global standing.' },
              { label:'Our Mission', icon:'◇', heading:'Delivering uncompromising quality, every time.',
                body:'Our mission is to develop premium residential and commercial properties that exceed client expectations in quality, design, and value — while maintaining absolute integrity in every transaction and relationship.' },
            ].map(v => (
              <div key={v.label} className="p-8 md:p-10 svc-card">
                <div className="flex items-center gap-3 mb-5">
                  <span style={{ color:'var(--gold)', fontSize:'1.2rem' }}>{v.icon}</span>
                  <span className="section-label" style={{ fontSize:'0.6rem' }}>{v.label}</span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl mb-4 leading-snug" style={{ color:'var(--text-primary)', fontWeight:400 }}>
                  {v.heading}
                </h3>
                <p className="text-sm leading-8" style={{ color:'rgba(245,240,232,0.5)', fontWeight:300 }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-py" style={{ background:'#0c0c0a' }}>
        <div className="container">
          <SectionHeader label="Our Journey" title='Two Decades of <span class="italic gold-text">Excellence</span>' />
          <div ref={timelineRef} className="relative">
            {/* Center line – desktop only */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px hidden md:block -translate-x-1/2"
              style={{ background:'linear-gradient(to bottom,transparent,rgba(200,137,26,0.25),transparent)' }} />

            <div className="flex flex-col gap-8 md:gap-12">
              {milestones.map((m, i) => (
                <div key={m.year}
                  className={`reveal flex flex-col md:flex-row gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Content */}
                  <div className={`md:w-[calc(50%-2.5rem)] ${i % 2 === 0 ? 'md:text-right md:pr-10' : 'md:pl-10'}`}>
                    <div className="p-6 md:p-8 card-dark">
                      <span className="font-accent text-[0.6rem] tracking-widest gold-text mb-2 block">{m.year}</span>
                      <h4 className="font-display text-xl md:text-2xl mb-2" style={{ color:'var(--text-primary)', fontWeight:500 }}>{m.title}</h4>
                      <p className="text-sm leading-7" style={{ color:'rgba(245,240,232,0.45)', fontWeight:300 }}>{m.desc}</p>
                    </div>
                  </div>
                  {/* Dot */}
                  <div className="hidden md:flex items-start pt-6 justify-center w-20 shrink-0">
                    <div className="w-3 h-3 rounded-full border-2 mt-1" style={{ borderColor:'var(--gold)', background:'var(--gold-mid)' }} />
                  </div>
                  {/* Spacer */}
                  <div className="hidden md:block md:w-[calc(50%-2.5rem)]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-py" style={{ background:'linear-gradient(180deg,#0f0f0d,#0c0c0a)' }}>
        <div className="container">
          <SectionHeader center label="Core Values" title='The Principles That <span class="italic gold-text">Guide Us</span>' />
          <div ref={valuesRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={v.title} className="reveal p-7 svc-card text-center flex flex-col items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center font-accent text-lg gold-text"
                  style={{ border:'1px solid rgba(200,137,26,0.25)' }}>
                  {String(i+1).padStart(2,'0')}
                </div>
                <h4 className="font-display text-xl" style={{ color:'var(--text-primary)', fontWeight:500 }}>{v.title}</h4>
                <p className="text-xs leading-7" style={{ color:'rgba(245,240,232,0.45)', fontWeight:300 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="section-py" style={{ background:'#0a0a09' }}>
        <div className="container">
          <SectionHeader label="Recognition" title='Awards & <span class="italic gold-text">Accolades</span>' />
          <div ref={awardsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {awards.map((a, i) => (
              <div key={i} className="reveal flex items-start gap-4 p-5 card-dark">
                <CheckCircle size={18} className="shrink-0 mt-0.5" style={{ color:'var(--gold-mid)' }} />
                <div>
                  <p className="text-[0.6rem] tracking-widest mb-1 font-accent" style={{ color:'rgba(200,137,26,0.55)' }}>{a.year} · {a.org}</p>
                  <p className="text-sm font-medium" style={{ color:'var(--text-primary)' }}>{a.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py" style={{ background:'#0f0f0d' }}>
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <SectionHeader center label="Work With Us" title='Start Your <span class="italic gold-text">Journey</span> Today' />
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/projects" className="btn-solid">View Projects</Link>
              <Link to="/contact"  className="btn-outline">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
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

const leadership = [
  {
    name: 'Farhan Ahmed Chowdhury',
    title: 'Founder & Chairman',
    exp: '25+ years',
    bio: 'Farhan founded Sun Real Estate in 2005 with a singular vision: to create world-class living experiences in Dhaka. A graduate of BUET and Harvard Business School, he has led the company through Bangladesh\'s most transformative real estate decades.',
    dept: 'Leadership',
    imgBg: 'linear-gradient(135deg,#2a2d18,#3a3f22)',
    initials: 'FC',
  },
  {
    name: 'Nusrat Jahan Ahmed',
    title: 'CEO & Managing Director',
    exp: '18+ years',
    bio: 'Nusrat brings 18 years of real estate and corporate leadership experience. She oversees all strategic operations, project delivery, and investor relations, driving Sun RE\'s expansion into new Dhaka districts.',
    dept: 'Leadership',
    imgBg: 'linear-gradient(135deg,#3a2108,#5c380b)',
    initials: 'NJ',
  },
  {
    name: 'Karim Hossain',
    title: 'Chief Architect & Design Director',
    exp: '20+ years',
    bio: 'Award-winning architect Karim is the creative force behind Sun RE\'s signature aesthetic. Trained in Singapore and the UK, his designs blend Bangladeshi heritage with contemporary global architecture.',
    dept: 'Design',
    imgBg: 'linear-gradient(135deg,#1a1c0e,#2a2d18)',
    initials: 'KH',
  },
  {
    name: 'Rania Sultana',
    title: 'Chief Financial Officer',
    exp: '15+ years',
    bio: 'Rania leads all financial strategy, investor funding, and risk management. Her expertise in structured finance and real estate economics has unlocked over BDT 500 crore in project financing.',
    dept: 'Finance',
    imgBg: 'linear-gradient(135deg,#2a1808,#3a2108)',
    initials: 'RS',
  },
  {
    name: 'Tanvir Rahman',
    title: 'VP of Sales & Marketing',
    exp: '12+ years',
    bio: 'Tanvir leads our client acquisition, brand strategy, and digital presence. His data-driven approach has consistently positioned Sun RE as Dhaka\'s most sought-after luxury developer.',
    dept: 'Sales',
    imgBg: 'linear-gradient(135deg,#0f1808,#1a2a10)',
    initials: 'TR',
  },
  {
    name: 'Dilruba Akter',
    title: 'Head of Customer Experience',
    exp: '10+ years',
    bio: 'Dilruba champions the client journey from first inquiry through lifetime after-sales. Her team maintains Sun RE\'s 98% satisfaction rate through unparalleled service standards.',
    dept: 'Client Relations',
    imgBg: 'linear-gradient(135deg,#1a0a08,#2d1010)',
    initials: 'DA',
  },
]

const departments = [
  { name:'Architecture & Design',  count:12, desc:'World-class architects and interior designers shaping Dhaka\'s skyline.' },
  { name:'Construction & Engineering', count:45, desc:'Expert engineers ensuring structural excellence and timely delivery.' },
  { name:'Sales & Advisory',       count:18, desc:'Knowledgeable consultants guiding clients to their perfect property.' },
  { name:'Finance & Legal',        count:8,  desc:'Specialists safeguarding investments and ensuring full compliance.' },
  { name:'Client Relations',       count:10, desc:'Dedicated relationship managers providing lifetime support.' },
  { name:'Marketing & Brand',      count:7,  desc:'Creative professionals telling Sun RE\'s story to the world.' },
]

const values = [
  { icon:'◈', title:'People First',    desc:'Our team is our greatest asset. We invest in talent, growth, and wellbeing.' },
  { icon:'◇', title:'Collaboration',   desc:'Great buildings emerge from great teamwork — across every discipline.' },
  { icon:'◆', title:'Innovation',      desc:'We challenge convention and embrace new ideas at every level.' },
  { icon:'○', title:'Growth Mindset',  desc:'Every project is an opportunity to learn, improve, and excel.' },
]

export default function TeamPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const leaderRef = useReveal('.leader-card')
  const deptRef   = useReveal('.dept-card')
  const valRef    = useReveal('.val-card')

  return (
    <>
      {/* Page Hero */}
      <div className="page-hero" style={{ background:'linear-gradient(180deg,#0a0a09,#0f0f0d)' }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage:"url('/images/property_interior.jpg')", backgroundSize:'cover', backgroundPosition:'center' }} />
        <div className="absolute inset-0" style={{ background:'rgba(10,10,9,0.92)' }} />
        <div className="container relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-7 h-px" style={{ background:'var(--gold-mid)' }} />
            <span className="section-label" style={{ fontSize:'0.6rem' }}>Meet the Team</span>
          </div>
          <h1 className="font-display leading-tight mb-4"
            style={{ fontSize:'clamp(2.5rem,6vw,5.5rem)', color:'var(--text-primary)', fontWeight:300, maxWidth:650 }}>
            The People Behind <span className="italic gold-text">the Vision</span>
          </h1>
          <p className="text-sm md:text-base max-w-xl mb-6" style={{ color:'rgba(245,240,232,0.5)', fontWeight:300, lineHeight:1.9 }}>
            Over 100 dedicated professionals united by a passion for excellence, design, and delivering
            the finest real estate experiences in Bangladesh.
          </p>
          <div className="flex flex-wrap gap-8">
            {[['100+','Team Members'],['6','Departments'],['25+','Years Combined']].map(([v,l]) => (
              <div key={l}>
                <div className="font-display text-2xl md:text-3xl font-bold gold-text">{v}</div>
                <div className="text-[0.6rem] tracking-widest uppercase" style={{ color:'rgba(245,240,232,0.35)' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leadership */}
      <section className="section-py" style={{ background:'#0c0c0a' }}>
        <div className="container">
          <SectionHeader label="Leadership" title='Our <span class="italic gold-text">Leadership</span> Team'
            subtitle="The visionaries and strategists driving Sun Real Estate forward." />
          <div ref={leaderRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {leadership.map(p => (
              <div key={p.name} className="leader-card team-card card-dark overflow-hidden flex flex-col">
                {/* Avatar */}
                <div className="relative overflow-hidden flex items-center justify-center"
                  style={{ aspectRatio:'4/3', background:p.imgBg }}>
                  <span className="font-display font-bold text-6xl md:text-7xl gold-text opacity-40">{p.initials}</span>
                  {/* Dept badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 font-accent text-[0.55rem] tracking-widest uppercase"
                    style={{ background:'rgba(10,10,9,0.85)', border:'1px solid rgba(200,137,26,0.35)', color:'var(--gold)' }}>
                    {p.dept}
                  </div>
                </div>
                <div className="card-body flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h3 className="font-display text-xl md:text-2xl leading-tight mb-1" style={{ color:'var(--text-primary)', fontWeight:500 }}>
                        {p.name}
                      </h3>
                      <p className="text-xs mb-1" style={{ color:'var(--gold-mid)' }}>{p.title}</p>
                      <p className="text-[0.6rem] tracking-widest uppercase" style={{ color:'rgba(245,240,232,0.3)' }}>{p.exp} experience</p>
                    </div>
                    <a href="#" aria-label="LinkedIn"
                      className="w-9 h-9 flex items-center justify-center shrink-0 transition-all duration-300"
                      style={{ border:'1px solid rgba(200,137,26,0.2)', color:'rgba(245,240,232,0.4)' }}
                      onMouseEnter={e => { e.currentTarget.style.color='var(--gold)'; e.currentTarget.style.borderColor='rgba(200,137,26,0.5)'; }}
                      onMouseLeave={e => { e.currentTarget.style.color='rgba(245,240,232,0.4)'; e.currentTarget.style.borderColor='rgba(200,137,26,0.2)'; }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                      </svg>
                    </a>
                  </div>
                  <div className="h-px my-5 gold-line-h-left" />
                  <p className="text-xs md:text-sm leading-7" style={{ color:'rgba(245,240,232,0.45)', fontWeight:300 }}>{p.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="section-py" style={{ background:'linear-gradient(180deg,#0f0f0d,#0c0c0a)' }}>
        <div className="container">
          <SectionHeader label="Our Departments" title='How We <span class="italic gold-text">Organise</span>'
            subtitle="Six expert departments working in harmony to deliver exceptional results." />
          <div ref={deptRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {departments.map((d, i) => (
              <div key={d.name} className="dept-card svc-card p-8 md:p-10 flex flex-col gap-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="font-accent text-[0.6rem] tracking-widest block mb-2" style={{ color:'rgba(200,137,26,0.45)' }}>
                      {String(i+1).padStart(2,'0')}
                    </span>
                    <h4 className="font-display text-lg md:text-xl" style={{ color:'var(--text-primary)', fontWeight:500 }}>{d.name}</h4>
                  </div>
                  <div className="font-display text-3xl font-bold gold-text shrink-0">{d.count}</div>
                </div>
                <p className="text-xs md:text-sm leading-7" style={{ color:'rgba(245,240,232,0.45)', fontWeight:300 }}>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture & Values */}
      <section className="section-py" style={{ background:'#0a0a09' }}>
        <div className="container">
          <SectionHeader center label="Our Culture" title='Life at <span class="italic gold-text">Sun Real Estate</span>'
            subtitle="We build more than buildings — we build careers, culture, and community." />
          <div ref={valRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map(v => (
              <div key={v.title} className="val-card p-8 md:p-10 svc-card text-center flex flex-col items-center gap-4">
                <span className="text-3xl mb-1" style={{ color:'var(--gold)' }}>{v.icon}</span>
                <h4 className="font-display text-xl" style={{ color:'var(--text-primary)', fontWeight:500 }}>{v.title}</h4>
                <p className="text-xs md:text-sm leading-7" style={{ color:'rgba(245,240,232,0.45)', fontWeight:300 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join us CTA */}
      <section className="section-py" style={{ background:'#0f0f0d' }}>
        <div className="container">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-center card-luxury"
            style={{ background:'linear-gradient(135deg,rgba(200,137,26,0.08),rgba(42,45,24,0.35))', border:'1px solid rgba(200,137,26,0.18)', padding:'3rem' }}>
            <div>
              <p className="section-label mb-3.5" style={{ fontSize:'0.62rem' }}>Join Our Team</p>
              <h3 className="font-display text-2xl md:text-4xl mb-4" style={{ color:'var(--text-primary)', fontWeight:400 }}>
                Build Your Career with <span className="italic gold-text">Sun Real Estate</span>
              </h3>
              <p className="text-sm md:text-base leading-8" style={{ color:'rgba(245,240,232,0.45)', fontWeight:300 }}>
                We are always looking for passionate, talented professionals to join our growing team.
                Send your CV and let's build something great together.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-5 md:justify-end">
              <Link to="/contact" className="btn-solid flex items-center gap-2">
                Apply Now <ArrowUpRight size={14} />
              </Link>
              <Link to="/about" className="btn-outline">Learn About Us</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

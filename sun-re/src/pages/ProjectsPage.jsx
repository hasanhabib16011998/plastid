import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, BedDouble, Maximize2, ArrowUpRight, SlidersHorizontal } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'

gsap.registerPlugin(ScrollTrigger)

const allProjects = [
  { id:1,  name:'Sun Aura Towers',            type:'Residential',  category:'residential', location:'Gulshan-1, Dhaka',       beds:'3–5 Bed',     area:'2,400–6,800 sqft',  price:'BDT 4.5 Cr+',  status:'Ongoing',   img:'/images/property_exterior.jpg',   tag:'Flagship',   year:2024 },
  { id:2,  name:'Sun Penthouse Collection',    type:'Penthouse',    category:'residential', location:'Banani, Dhaka',           beds:'4–6 Bed',     area:'5,000–12,000 sqft', price:'BDT 8 Cr+',    status:'Ready',     img:'/images/property_interior.jpg',   tag:'Exclusive',  year:2023 },
  { id:3,  name:'Sun Infinity Tower',          type:'Commercial',   category:'commercial',  location:'Motijheel, Dhaka',        beds:'Office',      area:'1,200–8,000 sqft',  price:'BDT 2.2 Cr+',  status:'Upcoming',  img:'/images/property_commercial.jpg', tag:'Commercial', year:2026 },
  { id:4,  name:'Sun Gardens',                 type:'Residential',  category:'residential', location:'Bashundhara R/A, Dhaka', beds:'2–4 Bed',     area:'1,200–3,500 sqft',  price:'BDT 2.1 Cr+',  status:'Ready',     img:'/images/property_exterior.jpg',   tag:'Delivered',  year:2022 },
  { id:5,  name:'Sun Business Hub',            type:'Commercial',   category:'commercial',  location:'Tejgaon, Dhaka',          beds:'Office',      area:'500–5,000 sqft',    price:'BDT 1.5 Cr+',  status:'Ready',     img:'/images/property_commercial.jpg', tag:'Commercial', year:2021 },
  { id:6,  name:'Sun Skyline Residences',      type:'Residential',  category:'residential', location:'Dhanmondi, Dhaka',        beds:'3–5 Bed',     area:'2,000–5,000 sqft',  price:'BDT 3.2 Cr+',  status:'Ongoing',   img:'/images/property_interior.jpg',   tag:'Premium',    year:2025 },
]

const filters = ['All', 'Residential', 'Commercial']
const statusStyle = {
  Ongoing:  { bg:'rgba(79,85,48,0.35)',   color:'#a9b07e', border:'rgba(79,85,48,0.6)' },
  Ready:    { bg:'rgba(200,137,26,0.15)', color:'#e5a827', border:'rgba(200,137,26,0.4)' },
  Upcoming: { bg:'rgba(255,255,255,0.05)',color:'rgba(245,240,232,0.5)', border:'rgba(255,255,255,0.12)' },
}

export default function ProjectsPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const [active, setActive] = useState('All')
  const gridRef = useRef(null)

  const filtered = active === 'All' ? allProjects : allProjects.filter(p =>
    p.category === active.toLowerCase()
  )

  useEffect(() => {
    if (!gridRef.current) return
    const cards = gridRef.current.querySelectorAll('.proj-card')
    gsap.fromTo(cards,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out' }
    )
  }, [active])

  return (
    <>
      {/* Page Hero */}
      <div className="page-hero" style={{ background:'linear-gradient(180deg,#0a0a09,#0f0f0d)' }}>
        <div className="absolute inset-0 opacity-15"
          style={{ backgroundImage:"url('/images/property_exterior.jpg')", backgroundSize:'cover', backgroundPosition:'center' }} />
        <div className="absolute inset-0" style={{ background:'rgba(10,10,9,0.88)' }} />
        <div className="container relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-7 h-px" style={{ background:'var(--gold-mid)' }} />
            <span className="section-label" style={{ fontSize:'0.6rem' }}>Our Portfolio</span>
          </div>
          <h1 className="font-display leading-tight mb-4"
            style={{ fontSize:'clamp(2.5rem,6vw,5.5rem)', color:'var(--text-primary)', fontWeight:300, maxWidth:650 }}>
            Signature <span className="italic gold-text">Developments</span>
          </h1>
          <p className="text-sm md:text-base max-w-xl mb-6" style={{ color:'rgba(245,240,232,0.5)', fontWeight:300, lineHeight:1.9 }}>
            Explore our curated collection of luxury residential and commercial projects across Dhaka's most prestigious addresses.
          </p>
          {/* Stats row */}
          <div className="flex flex-wrap gap-8">
            {[['500+','Units'],['6','Active Projects'],['50+','Locations']].map(([v,l]) => (
              <div key={l}>
                <div className="font-display text-2xl md:text-3xl font-bold gold-text">{v}</div>
                <div className="text-[0.6rem] tracking-widest uppercase" style={{ color:'rgba(245,240,232,0.35)' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters + Grid */}
      <section className="section-py" style={{ background:'#0c0c0a' }}>
        <div className="container">
          {/* Filter bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mb-14">
            <div className="flex items-center gap-3 flex-wrap">
              <SlidersHorizontal size={15} style={{ color:'var(--gold-mid)' }} />
              {filters.map(f => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className="text-xs px-5 py-2.5 tracking-wider font-accent transition-all duration-300"
                  style={{
                    background: active === f ? 'linear-gradient(135deg,var(--gold-mid),var(--gold))' : 'rgba(255,255,255,0.04)',
                    color:      active === f ? '#0f0f0d' : 'rgba(245,240,232,0.55)',
                    border:     active === f ? '1px solid var(--gold)' : '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
            <p className="text-xs" style={{ color:'rgba(245,240,232,0.3)' }}>
              Showing {filtered.length} of {allProjects.length} projects
            </p>
          </div>

          {/* Grid */}
          <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {filtered.map(p => {
              const s = statusStyle[p.status]
              return (
                <div key={p.id} className="proj-card prop-card card-dark flex flex-col">
                  <div className="relative overflow-hidden" style={{ aspectRatio:'4/3' }}>
                    <img src={p.img} alt={p.name} className="prop-img w-full h-full object-cover" />
                    <div className="prop-overlay absolute inset-0 flex items-center justify-center">
                      <div className="flex flex-col items-center gap-1.5">
                        <ArrowUpRight size={24} style={{ color:'var(--gold)' }} />
                        <span className="text-[0.6rem] tracking-widest uppercase" style={{ color:'rgba(245,240,232,0.8)' }}>View Details</span>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="font-accent text-[0.55rem] tracking-widest px-3 py-1 uppercase"
                        style={{ background:'rgba(10,10,9,0.85)', border:'1px solid rgba(200,137,26,0.4)', color:'var(--gold)' }}>
                        {p.tag}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="text-[0.55rem] tracking-widest px-3 py-1 rounded-full"
                        style={{ background:s.bg, color:s.color, border:`1px solid ${s.border}` }}>
                        {p.status}
                      </span>
                    </div>
                  </div>
                  <div className="card-body flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[0.6rem] tracking-widest uppercase" style={{ color:'rgba(200,137,26,0.7)' }}>{p.type}</span>
                      <span className="text-[0.55rem] tracking-wider" style={{ color:'rgba(245,240,232,0.25)' }}>{p.year}</span>
                    </div>
                    <h3 className="font-display text-xl md:text-2xl mb-4 leading-tight" style={{ color:'var(--text-primary)', fontWeight:500 }}>{p.name}</h3>
                    <div className="flex flex-col gap-2 mb-6">
                      <div className="flex items-center gap-2.5">
                        <MapPin size={12} style={{ color:'var(--gold-mid)', flexShrink:0 }} />
                        <span className="text-xs" style={{ color:'rgba(245,240,232,0.4)' }}>{p.location}</span>
                      </div>
                      <div className="flex items-center gap-5">
                        <div className="flex items-center gap-2">
                          <BedDouble size={12} style={{ color:'var(--gold-mid)' }} />
                          <span className="text-xs" style={{ color:'rgba(245,240,232,0.4)' }}>{p.beds}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Maximize2 size={12} style={{ color:'var(--gold-mid)' }} />
                          <span className="text-xs" style={{ color:'rgba(245,240,232,0.4)' }}>{p.area}</span>
                        </div>
                      </div>
                    </div>
                    <div className="h-px mb-6 gold-line-h-left" />
                    <div className="flex items-center justify-between mt-auto">
                      <div>
                        <p className="text-[0.55rem] tracking-widest uppercase mb-0.5" style={{ color:'rgba(245,240,232,0.3)' }}>Starting From</p>
                        <p className="font-display text-lg md:text-xl font-semibold gold-text">{p.price}</p>
                      </div>
                      <Link to="/contact"
                        className="w-10 h-10 flex items-center justify-center border transition-all duration-300"
                        style={{ borderColor:'rgba(200,137,26,0.3)', color:'var(--gold-mid)' }}
                        onMouseEnter={e => { e.currentTarget.style.background='var(--gold-mid)'; e.currentTarget.style.color='#0f0f0d'; }}
                        onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='var(--gold-mid)'; }}
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
      </section>

      {/* CTA */}
      <section className="section-py" style={{ background:'#0f0f0d' }}>
        <div className="container">
          <div className="p-10 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
            style={{ background:'linear-gradient(135deg,rgba(200,137,26,0.08),rgba(42,45,24,0.35))', border:'1px solid rgba(200,137,26,0.18)' }}>
            <div>
              <h3 className="font-display text-2xl md:text-3xl mb-3" style={{ color:'var(--text-primary)', fontWeight:400 }}>
                Interested in a Property?
              </h3>
              <p className="text-sm md:text-base" style={{ color:'rgba(245,240,232,0.45)', fontWeight:300 }}>
                Book a private viewing with our consultants today.
              </p>
            </div>
            <Link to="/contact" className="btn-solid shrink-0 flex items-center gap-2">
              Schedule Viewing <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

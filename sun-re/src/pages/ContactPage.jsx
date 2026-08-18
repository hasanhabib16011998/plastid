import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'

gsap.registerPlugin(ScrollTrigger)

const contactInfo = [
  { icon: Phone, label:'Phone',         value:'+880 1700-000000',          sub:'Mon–Sat, 9am – 7pm' },
  { icon: Mail,  label:'Email',         value:'hello@sunrealestate.com.bd', sub:'We reply within 24 hrs' },
  { icon: MapPin,label:'Head Office',   value:'Plot 42, Gulshan-1, Dhaka',  sub:'Dhaka 1212, Bangladesh' },
  { icon: Clock, label:'Office Hours',  value:'Sun – Thu, 9am – 6pm',       sub:'Fri & Sat by appointment' },
]

const offices = [
  { city:'Gulshan',  addr:'Plot 42, Gulshan Avenue, Dhaka-1212', phone:'+880 1700-000001' },
  { city:'Banani',   addr:'Road 11, Banani DOHS, Dhaka-1213',   phone:'+880 1700-000002' },
  { city:'Dhanmondi',addr:'House 7, Road 27, Dhanmondi, Dhaka', phone:'+880 1700-000003' },
]

const faqs = [
  { q:'How do I book a site visit?',       a:'Simply fill out the enquiry form or call us. Our team will schedule a private viewing at your convenience, typically within 48 hours.' },
  { q:'What payment plans are available?', a:'We offer flexible instalment plans starting from 20% down payment with easy EMIs over 5–10 years, depending on the project.' },
  { q:'Do you offer investment advice?',   a:'Yes. Our dedicated Investment Advisory team provides personalised market analysis, ROI projections, and portfolio guidance.' },
  { q:'What is included in after-sales?',  a:'All Sun RE properties include a 10-year structural warranty, dedicated relationship manager, annual health check, and priority maintenance.' },
]

export default function ContactPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const [form, setForm]       = useState({ name:'', email:'', phone:'', interest:'', message:'' })
  const [sent, setSent]       = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  const formRef  = useRef(null)
  const infoRef  = useRef(null)
  const faqRef   = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      [formRef, infoRef].forEach(r => {
        if (!r.current) return
        gsap.fromTo(r.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease:'power3.out',
            scrollTrigger: { trigger: r.current, start:'top 80%' } }
        )
      })
      if (faqRef.current) {
        gsap.fromTo(faqRef.current.querySelectorAll('.faq-item'),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease:'power3.out',
            scrollTrigger: { trigger: faqRef.current, start:'top 80%' } }
        )
      }
    })
    return () => ctx.revert()
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    setSent(true)
    setForm({ name:'', email:'', phone:'', interest:'', message:'' })
    setTimeout(() => setSent(false), 6000)
  }

  return (
    <>
      {/* Page Hero */}
      <div className="page-hero" style={{ background:'linear-gradient(180deg,#0a0a09,#0f0f0d)' }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage:"url('/images/hero_bg.jpg')", backgroundSize:'cover', backgroundPosition:'center bottom' }} />
        <div className="absolute inset-0" style={{ background:'rgba(10,10,9,0.92)' }} />
        <div className="container relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-7 h-px" style={{ background:'var(--gold-mid)' }} />
            <span className="section-label" style={{ fontSize:'0.6rem' }}>Get In Touch</span>
          </div>
          <h1 className="font-display leading-tight mb-4"
            style={{ fontSize:'clamp(2.5rem,6vw,5.5rem)', color:'var(--text-primary)', fontWeight:300, maxWidth:650 }}>
            Begin Your <span className="italic gold-text">Luxury</span> Journey
          </h1>
          <p className="text-sm md:text-base max-w-xl" style={{ color:'rgba(245,240,232,0.5)', fontWeight:300, lineHeight:1.9 }}>
            Our property consultants are ready to guide you to your perfect Sun Real Estate residence.
            Reach out and we'll respond within 24 hours.
          </p>
        </div>
      </div>

      {/* Main contact section */}
      <section className="section-py" style={{ background:'#0c0c0a' }}>
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-14 lg:gap-20">

            {/* Contact Info */}
            <div ref={infoRef} className="lg:col-span-2 flex flex-col gap-8">
              <div>
                <h2 className="font-display text-2xl md:text-3xl lg:text-4xl mb-3" style={{ color:'var(--text-primary)', fontWeight:400 }}>
                  Let's <span className="italic gold-text">Talk</span>
                </h2>
                <p className="text-sm md:text-base leading-8" style={{ color:'rgba(245,240,232,0.5)', fontWeight:300 }}>
                  Whether you're looking for your dream home, a commercial investment, or professional property advice —
                  we're here to help every step of the way.
                </p>
              </div>

              {/* Info cards */}
              <div className="flex flex-col gap-5">
                {contactInfo.map(({ icon:Icon, label, value, sub }) => (
                  <div key={label} className="flex items-start gap-5 p-5 md:p-6 svc-card">
                    <div className="w-11 h-11 flex items-center justify-center shrink-0"
                      style={{ border:'1px solid rgba(200,137,26,0.25)' }}>
                      <Icon size={18} style={{ color:'var(--gold-mid)' }} />
                    </div>
                    <div>
                      <p className="text-[0.62rem] tracking-[0.25em] uppercase mb-1 font-accent" style={{ color:'rgba(200,137,26,0.55)' }}>{label}</p>
                      <p className="text-sm md:text-base" style={{ color:'rgba(245,240,232,0.85)' }}>{value}</p>
                      <p className="text-[0.72rem] mt-1" style={{ color:'rgba(245,240,232,0.35)', fontWeight:300 }}>{sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Visit promo */}
              <div className="card-luxury"
                style={{ background:'linear-gradient(135deg,rgba(200,137,26,0.08),rgba(42,45,24,0.3))', border:'1px solid rgba(200,137,26,0.18)', padding:'2.5rem' }}>
                <h4 className="font-display text-xl md:text-2xl mb-3" style={{ color:'var(--text-primary)', fontWeight:400 }}>
                  Book a Site Visit
                </h4>
                <p className="text-xs md:text-sm leading-8 mb-6" style={{ color:'rgba(245,240,232,0.45)', fontWeight:300 }}>
                  Experience our showroom apartments in person. Private tours available 7 days a week.
                </p>
                <a href="tel:+8801700000000" className="btn-solid text-xs py-3 px-6">Call Now</a>
              </div>
            </div>

            {/* Form */}
            <div ref={formRef} className="lg:col-span-3">
              {sent ? (
                <div className="h-full min-h-[450px] flex flex-col items-center justify-center text-center p-12 gap-6 card-dark">
                  <CheckCircle size={52} style={{ color:'var(--gold-mid)' }} />
                  <h3 className="font-display text-2xl md:text-4xl" style={{ color:'var(--text-primary)', fontWeight:400 }}>
                    Message Received
                  </h3>
                  <p className="text-sm md:text-base leading-8 max-w-md" style={{ color:'rgba(245,240,232,0.4)', fontWeight:300 }}>
                    Thank you for reaching out. A Sun Real Estate consultant will contact you within 24 hours.
                  </p>
                  <button onClick={() => setSent(false)} className="btn-outline text-xs mt-2">Send Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 card-dark" style={{ padding:'2.75rem' }}>
                  <h3 className="font-display text-2xl md:text-3xl mb-2" style={{ color:'var(--text-primary)', fontWeight:400 }}>
                    Send Us a Message
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[0.62rem] tracking-widest uppercase" style={{ color:'rgba(245,240,232,0.45)' }}>Full Name *</label>
                      <input required type="text" value={form.name} onChange={e => setForm({...form,name:e.target.value})}
                        placeholder="Your full name" className="input-luxury" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[0.62rem] tracking-widest uppercase" style={{ color:'rgba(245,240,232,0.45)' }}>Email *</label>
                      <input required type="email" value={form.email} onChange={e => setForm({...form,email:e.target.value})}
                        placeholder="your@email.com" className="input-luxury" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[0.62rem] tracking-widest uppercase" style={{ color:'rgba(245,240,232,0.45)' }}>Phone</label>
                      <input type="tel" value={form.phone} onChange={e => setForm({...form,phone:e.target.value})}
                        placeholder="+880 ..." className="input-luxury" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[0.62rem] tracking-widest uppercase" style={{ color:'rgba(245,240,232,0.45)' }}>Interest</label>
                      <select value={form.interest} onChange={e => setForm({...form,interest:e.target.value})} className="input-luxury">
                        <option value="">Select property type</option>
                        <option value="residential">Residential</option>
                        <option value="penthouse">Penthouse</option>
                        <option value="commercial">Commercial</option>
                        <option value="investment">Investment Advisory</option>
                        <option value="management">Property Management</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[0.62rem] tracking-widest uppercase" style={{ color:'rgba(245,240,232,0.45)' }}>Message *</label>
                    <textarea required rows={5} value={form.message} onChange={e => setForm({...form,message:e.target.value})}
                      placeholder="Tell us about your dream property..." className="input-luxury resize-none" />
                  </div>
                  <button type="submit" className="btn-solid flex items-center justify-center gap-3 mt-3">
                    Send Enquiry <Send size={15} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="section-py" style={{ background:'#0f0f0d' }}>
        <div className="container">
          <SectionHeader label="Our Offices" title='Find Us <span class="italic gold-text">Across Dhaka</span>' />
          <div className="grid sm:grid-cols-3 gap-8 lg:gap-10">
            {offices.map(o => (
              <div key={o.city} className="p-8 md:p-10 svc-card">
                <h4 className="font-display text-xl md:text-2xl mb-3" style={{ color:'var(--text-primary)', fontWeight:500 }}>
                  {o.city} <span className="gold-text italic">Office</span>
                </h4>
                <div className="h-px mb-5 gold-line-h-left" />
                <div className="flex flex-col gap-3.5">
                  <div className="flex items-start gap-3">
                    <MapPin size={14} className="mt-1 shrink-0" style={{ color:'var(--gold-mid)' }} />
                    <p className="text-xs md:text-sm leading-7" style={{ color:'rgba(245,240,232,0.5)' }}>{o.addr}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={14} style={{ color:'var(--gold-mid)' }} />
                    <p className="text-xs md:text-sm" style={{ color:'rgba(245,240,232,0.5)' }}>{o.phone}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-py" style={{ background:'#0c0c0a' }}>
        <div className="container max-w-3xl mx-auto">
          <SectionHeader center label="FAQ" title='Frequently Asked <span class="italic gold-text">Questions</span>' />
          <div ref={faqRef} className="flex flex-col gap-5">
            {faqs.map((f, i) => (
              <div key={i} className="faq-item overflow-hidden" style={{ border:'1px solid rgba(200,137,26,0.12)' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-5 p-6 md:p-8 text-left transition-colors duration-200"
                  style={{ background: openFaq === i ? 'rgba(200,137,26,0.05)' : 'transparent' }}
                >
                  <span className="text-sm md:text-base font-medium" style={{ color:'var(--text-primary)', fontFamily:'Inter,sans-serif' }}>{f.q}</span>
                  <span className="shrink-0 font-display text-2xl gold-text">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 md:px-8 pb-7">
                    <p className="text-sm md:text-base leading-8" style={{ color:'rgba(245,240,232,0.5)', fontWeight:300 }}>{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import PIALoader from '../../components/PIALoader/PIALoader'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'

const teamMembers = [
  { name: 'Md. Mozammel Hossain', role: 'CEO & Founder', img: '/images/team/v2-1.jpg' },
  { name: 'Md. Al Rafat', role: 'Managing Director & Quantity Surveyor', img: '/images/team/v2-1.jpg' },
  { name: 'Hasan Habib', role: 'IT & Digital Marketing', img: '/images/team/v2-1.jpg' },
  { name: 'Shakirul Islam Shajib', role: '3D Concept Designer', img: '/images/team/v2-1.jpg' },
  { name: 'Zahedul Islam', role: 'Site Engineer', img: '/images/team/v2-1.jpg' },
  { name: 'Saad Ibne Hossain', role: 'Procurement', img: '/images/team/v2-1.jpg' },
  { name: 'Touhidur Rahman Digonto', role: 'Accounts & Finance', img: '/images/team/v2-1.jpg' },
  { name: 'Md. Mustafizur Rahman', role: 'Graphic Designer', img: '/images/team/v2-1.jpg' },
]

const companyPillars = [
  {
    icon: 'icon-target',
    title: 'Bespoke Vision',
    text: 'Every project begins with understanding your unique lifestyle or business goals, translating visions into timeless architectural realities.',
  },
  {
    icon: 'icon-wallet',
    title: 'Design Fee Credit',
    text: 'Our unique per-sqft 3D design fee acts as a security deposit and is credited back 100% as a discount when you execute the project with us.',
  },
  {
    icon: 'icon-house',
    title: 'Full Turnkey Execution',
    text: 'From initial 3D blueprints to site engineering, quantity surveying, and final handover, we manage every detail seamlessly.',
  },
]

const historyItems = [
  {
    year: '2022',
    badge: 'Foundation',
    title: 'Plastid Interior and Architecture\nFounded in Dhaka',
    text: 'Plastid Interior and Architecture was established in Dhaka with a singular vision — to revolutionize living and working environments through bespoke, human-centered design. Starting with custom residential turnkeys, we built a foundation based on quality craftsmanship, structural precision, and transparent client collaboration.',
    img: '/images/resources/history-1.jpg',
  },
  {
    year: '2023',
    badge: 'Expansion',
    title: 'Nationwide Expansion &\nCorporate Workspaces',
    text: 'Building on early residential successes, Plastid expanded studio operations across major divisions in Bangladesh. We launched specialized commercial & corporate design divisions, delivering high-impact corporate headquarters, retail environments, and luxury residential projects.',
    img: '/images/resources/history-2.jpg',
  },
  {
    year: '2024',
    badge: 'Innovation',
    title: '3D Merchandising &\nDesign Refund Policy',
    text: 'To eliminate client uncertainty and elevate design quality, Plastid introduced transparent per-square-foot 3D concept design services paired with our signature 100% design-fee refund policy. Upon project execution contract signing, full design fees are credited back as a direct discount.',
    img: '/images/slides/v1-1.jpg',
  },
  {
    year: '2025-26',
    badge: 'Excellence',
    title: 'Architectural Mastery &\n100+ Completed Works',
    text: 'Today, Plastid Interior and Architecture stands as a leading full-service design-build firm in Bangladesh with over 2,000 completed works. Our multi-disciplinary team of 3D designers, quantity surveyors, procurement experts, and site engineers delivers seamless end-to-end luxury turnkeys.',
    img: '/images/services/service-single/how-work.jpg',
  },
]

function CompanyTimeline() {
  const [index, setIndex] = useState(0)
  const item = historyItems[index]

  return (
    <div style={{ position: 'relative', marginTop: '20px' }}>
      {/* Year Navigation Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          marginBottom: '50px',
          padding: '0 20px',
        }}
      >
        {/* Connecting Gold Line */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '40px',
            right: '40px',
            height: '2px',
            background: 'rgba(196, 155, 93, 0.25)',
            transform: 'translateY(-50%)',
            zIndex: 0,
          }}
        >
          <div
            style={{
              height: '100%',
              background: '#C49B5D',
              width: `${(index / (historyItems.length - 1)) * 100}%`,
              transition: 'width 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </div>

        {/* Milestone Nodes */}
        {historyItems.map((h, i) => {
          const isActive = i === index
          return (
            <button
              key={i}
              onClick={() => setIndex(i)}
              style={{
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                outline: 'none',
                padding: 0,
              }}
              aria-label={`Milestone ${h.year}`}
            >
              <div
                style={{
                  width: isActive ? '42px' : '30px',
                  height: isActive ? '42px' : '30px',
                  borderRadius: '50%',
                  backgroundColor: isActive ? '#1F2E23' : '#ffffff',
                  border: isActive ? '2.5px solid #C49B5D' : '2px solid rgba(196, 155, 93, 0.4)',
                  boxShadow: isActive ? '0 0 0 4px rgba(196, 155, 93, 0.25)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.35s ease',
                  marginBottom: '10px',
                }}
              >
                <div
                  style={{
                    width: isActive ? '12px' : '8px',
                    height: isActive ? '12px' : '8px',
                    borderRadius: '50%',
                    backgroundColor: '#C49B5D',
                    transition: 'all 0.35s ease',
                  }}
                />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: isActive ? '13px' : '12px',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#C49B5D' : 'rgba(31, 46, 35, 0.6)',
                  transition: 'color 0.3s ease',
                }}
              >
                {h.year}
              </span>
            </button>
          )
        })}
      </div>

      {/* Active Milestone Details Card */}
      <div
        className="company-timeline-card"
        style={{
          background: '#ffffff',
          borderRadius: '8px',
          border: '1px solid rgba(196, 155, 93, 0.3)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
          overflow: 'hidden',
          padding: '40px',
          transition: 'all 0.4s ease',
        }}
      >
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-12" style={{ marginBottom: '20px' }}>
            <div
              style={{
                position: 'relative',
                borderRadius: '6px',
                overflow: 'hidden',
                maxHeight: '360px',
                boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
              }}
            >
              <img
                src={item.img}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '340px',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.5s ease',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  background: '#1F2E23',
                  color: '#C49B5D',
                  padding: '6px 14px',
                  borderRadius: '30px',
                  border: '1px solid #C49B5D',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-primary)',
                }}
              >
                {item.badge}
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-12">
            <div style={{ paddingLeft: '15px' }}>
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '64px',
                  lineHeight: '1',
                  fontWeight: 300,
                  color: '#C49B5D',
                  marginBottom: '10px',
                  letterSpacing: '-1px',
                }}
              >
                {item.year}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '28px',
                  lineHeight: '1.25',
                  color: '#1F2E23',
                  marginBottom: '18px',
                  whiteSpace: 'pre-line',
                  fontWeight: 500,
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: 'rgba(31, 46, 35, 0.8)',
                  margin: 0,
                }}
              >
                {item.text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function About() {
  const teamRef = useRef(null)

  useEffect(() => {
    if (teamRef.current) {
      const cards = teamRef.current.querySelectorAll('.single-team-member')
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' }
      )
    }
  }, [])

  return (
    <div className="boxed_wrapper">
      <PIALoader />
      <Header />

      <Breadcrumb
        title={<>Crafting Timeless<br /> Architecture &amp; Interiors.</>}
        subtitle="About Plastid Interior"
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'About Us' },
        ]}
      />

      {/* Company Overview & Founders */}
      <section className="about-style2-area" style={{ padding: '90px 0 60px', background: '#F5F3ED' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-5 col-lg-5" style={{ marginBottom: '30px' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ borderRadius: '6px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                  <img
                    src="/images/resources/about-image.jpg"
                    alt="Plastid Leadership"
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>
                {/* Founder Quote Card */}
                <div className="about-founder-quote">
                  <p
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontStyle: 'italic',
                      color: '#F5F3ED',
                      fontSize: '15px',
                      lineHeight: '1.5',
                      margin: '0 0 8px',
                    }}
                  >
                    "Design is not just what it looks like, but how it transforms everyday life."
                  </p>
                  <span
                    style={{
                      fontFamily: 'var(--font-primary)',
                      color: '#C49B5D',
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '1.5px',
                      textTransform: 'uppercase',
                    }}
                  >
                    Md. Mozammel Hossain
                  </span>
                </div>
              </div>
            </div>

            <div className="col-xl-7 col-lg-7">
              <div className="about-content-col" style={{ paddingLeft: '30px' }}>
                <div className="sec-title" style={{ paddingBottom: '20px' }}>
                  <p>About Company</p>
                  <div className="title">
                    Crafting Bespoke <span>Architectural Realities</span>
                  </div>
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontSize: '15.5px',
                    lineHeight: '1.82',
                    color: 'rgba(31, 46, 35, 0.85)',
                    marginBottom: '24px',
                  }}
                >
                  Plastid Interior and Architecture is a premier full-service interior design and architectural execution firm based in Dhaka, Bangladesh. With a passion for structural innovation and a commitment to precision, we craft bespoke living and working environments across Bangladesh.
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontSize: '15px',
                    lineHeight: '1.8',
                    color: 'rgba(31, 46, 35, 0.75)',
                    marginBottom: '30px',
                  }}
                >
                  From 3D concept merchandising to full turnkey site engineering, our multi-disciplinary team collaborates closely with clients to deliver timeless spaces. Our signature design-fee credit policy ensures complete financial transparency from start to finish.
                </p>

                {/* Company Pillars Mini Grid */}
                <div className="row" style={{ marginTop: '10px' }}>
                  {companyPillars.map((p, i) => (
                    <div key={i} className="col-md-4" style={{ marginBottom: '20px' }}>
                      <div
                        style={{
                          background: '#ffffff',
                          border: '1px solid rgba(196, 155, 93, 0.25)',
                          borderRadius: '6px',
                          padding: '18px 16px',
                          height: '100%',
                        }}
                      >
                        <h4
                          style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: '17px',
                            color: '#1F2E23',
                            marginBottom: '8px',
                            fontWeight: 500,
                          }}
                        >
                          {p.title}
                        </h4>
                        <p
                          style={{
                            fontFamily: 'var(--font-primary)',
                            fontSize: '12.5px',
                            lineHeight: '1.6',
                            color: 'rgba(31, 46, 35, 0.7)',
                            margin: 0,
                          }}
                        >
                          {p.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Timeline Section */}
      <section className="company-overview-area" style={{ padding: '80px 0 90px', background: '#ffffff' }}>
        <div className="container">
          <div className="sec-title text-center max-width" style={{ paddingBottom: '30px' }}>
            <p>Our Journey</p>
            <div className="title">Company Timeline &amp; <span>Milestones</span></div>
          </div>
          <CompanyTimeline />
        </div>
      </section>

      {/* Team Section */}
      <section className="team-area" ref={teamRef} style={{ padding: '90px 0 80px', background: '#F5F3ED' }}>
        <div className="container">
          <div className="sec-title text-center max-width" style={{ paddingBottom: '40px' }}>
            <p>Behind Our Success</p>
            <div className="title">Expert &amp; Dedicated <span>Team</span></div>
          </div>

          <div className="row d-flex flex-wrap">
            {teamMembers.map((m, i) => (
              <div key={i} className="col-xl-3 col-lg-4 col-md-6 col-sm-12 d-flex" style={{ marginBottom: '30px' }}>
                <div
                  className="single-team-member"
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    background: '#ffffff',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    border: '1px solid rgba(196, 155, 93, 0.25)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                    transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)'
                    e.currentTarget.style.borderColor = '#C49B5D'
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(196, 155, 93, 0.18)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.borderColor = 'rgba(196, 155, 93, 0.25)'
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.04)'
                  }}
                >
                  <div className="img-holder" style={{ overflow: 'hidden', height: '260px', flexShrink: 0 }}>
                    <img
                      src={m.img}
                      alt={m.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                  <div className="name text-center" style={{ padding: '20px 16px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <p style={{ margin: '0 0 6px' }}>
                      <span
                        style={{
                          color: '#C49B5D',
                          fontSize: '11px',
                          fontWeight: 600,
                          letterSpacing: '1.5px',
                          textTransform: 'uppercase',
                          fontFamily: 'var(--font-primary)',
                        }}
                      >
                        {m.role}
                      </span>
                    </p>
                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '19px',
                        color: '#1F2E23',
                        fontWeight: 500,
                        margin: 0,
                      }}
                    >
                      {m.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  )
}

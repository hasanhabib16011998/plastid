import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import Preloader from '../../components/Preloader/Preloader'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'

const teamMembers = [
  { name: 'Md. Mozammel Hossain', role: 'CEO & Founder', img: '/images/team/v2-1.jpg' },
  { name: 'Md. Al Rafat', role: 'Quantity Surveyor', img: '/images/team/v2-1.jpg' },
  { name: 'Saad Ibne Hossain', role: 'Procurement', img: '/images/team/v2-1.jpg' },
  { name: 'Jubayer', role: 'Site Engineer', img: '/images/team/v2-1.jpg' },
  { name: 'Hasan Habib', role: 'IT & Digital Marketing', img: '/images/team/v2-1.jpg' },
  { name: 'Shakirul Islam Shajib', role: '3D Designer', img: '/images/team/v2-1.jpg' },
  { name: 'Touhidur Rahman Digonto', role: 'Accounts', img: '/images/team/v2-1.jpg' },
  { name: 'Md. Mustafizur Rahman', role: 'Graphic Designer', img: '/images/team/v2-1.jpg' },
]

const historyItems = [
  {
    year: '2022',
    title: 'Plastid Interior and Architecture\nwas Founded in 2022 in Dhaka.',
    text: 'Plastid Interior and Architecture was founded with a singular goal — to transform everyday spaces into deeply personal experiences. What began as a passion for aesthetic excellence has grown into a full-fledged design studio committed to creativity, craftsmanship, and client-centric innovation. From humble beginnings, we\'ve carved a path guided by purpose, detail, and the belief that great design begins with understanding people.',
    img: '/images/resources/history-1.jpg',
  },
  {
    year: '2023',
    title: 'Expanding Our Reach\nAcross Bangladesh.',
    text: 'Building on our early successes, we expanded our portfolio to include large-scale commercial projects and began serving clients across all major cities in Bangladesh. Our reputation for quality craftsmanship and timely delivery continued to grow.',
    img: '/images/resources/history-2.jpg',
  },
]

function HistoryCarousel() {
  const [index, setIndex] = useState(0)
  const item = historyItems[index]

  return (
    <div className="history-content-box clearfix">
      <div className="history-carousel">
        <div className="single-history-content">
          <div className="img-box">
            <div className="inner">
              <img src={item.img} alt="History" />
            </div>
          </div>
          <div className="text-box">
            <div className="inner">
              <div className="date"><h3>{item.year}</h3></div>
              <div className="title">
                <h3 style={{ whiteSpace: 'pre-line' }}>{item.title}</h3>
              </div>
              <div className="text"><p>{item.text}</p></div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        {historyItems.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            style={{
              width: i === index ? '28px' : '10px',
              height: '10px',
              borderRadius: '5px',
              background: i === index ? '#c8a96e' : '#ddd',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s',
              padding: 0,
            }}
            aria-label={`History ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default function About() {
  return (
    <div className="boxed_wrapper">
      <Preloader />
      <Header />

      <Breadcrumb
        title={<>Talented Interior<br /> Designer.</>}
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'About Us' },
        ]}
      />

      {/* Company Overview */}
      <section className="company-overview-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="intro-box clearfix">
                <div className="sec-title">
                  <p>Company Overview</p>
                  <div className="title">Modern &amp; Luxury<br /> <span>Interior Designers in Bangladesh</span></div>
                </div>
                <div className="text">
                  <p>We feel that interior design is one of the most important investments you will ever make. Whether your needs are Residential or Commercial Interior Design or Model Home Merchandising, our commitment to your project.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <HistoryCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="team-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="sec-title float-left">
                <p>Behind Our Company</p>
                <div className="title">Expert &amp; Experienced <span>Team</span></div>
              </div>
            </div>
          </div>
          <div className="row">
            {teamMembers.map((m, i) => (
              <div key={i} className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                <div className="single-team-member">
                  <div className="img-holder">
                    <img src={m.img} alt={m.name} />
                  </div>
                  <div className="name text-center">
                    <p><span>{m.role}</span></p>
                    <h3>{m.name}</h3>
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

import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import PIALoader from '../../components/PIALoader/PIALoader'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'
import PIADropdown from '../../components/PIADropdown/PIADropdown'

const contactInfo = [
  {
    icon: 'icon-maps-and-location',
    title: 'Our Location',
    lines: ['House-11 (2nd Floor), Block-E,', 'Sector-1, Aftab Nagar Main Rd,', 'Dhaka 1212, Bangladesh'],
  },
  {
    icon: 'icon-phone',
    title: 'Phone Number',
    lines: ['+880 1768834417', 'Saturday - Thursday: 9am - 6pm'],
  },
  {
    icon: 'icon-mail',
    title: 'Email Address',
    lines: ['info@pcd-bd.com', 'plastidarchitecture@gmail.com'],
  },
]

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '', service: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
    setFormData({ name: '', email: '', phone: '', message: '', service: '' })
  }

  return (
    <div className="boxed_wrapper">
      <PIALoader />
      <Header />

      <Breadcrumb
        title={<>Contact <br />Plastid Interior</>}
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Contact' },
        ]}
      />

      {/* Contact Info Cards */}
      <section style={{ padding: '80px 0 50px', background: '#f9f9f9' }}>
        <div className="container">
          <div className="row">
            {contactInfo.map((info, i) => (
              <div key={i} className="col-xl-4 col-lg-4 col-md-6 col-sm-12" style={{ marginBottom: '30px' }}>
                <div style={{
                  background: '#fff',
                  padding: '35px 30px',
                  borderRadius: '4px',
                  textAlign: 'center',
                  boxShadow: '0 5px 30px rgba(0,0,0,0.06)',
                  transition: 'transform 0.3s',
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{
                    width: '70px', height: '70px', borderRadius: '50%',
                    background: 'rgba(200,169,110,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 20px',
                  }}>
                    <span className={info.icon} style={{ fontSize: '30px', color: '#c8a96e' }}></span>
                  </div>
                  <h4 style={{ marginBottom: '12px', color: '#1a1a2e' }}>{info.title}</h4>
                  {info.lines.map((line, j) => (
                    <p key={j} style={{ color: '#666', margin: '3px 0' }}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form + Map */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="row">
            {/* Contact Form */}
            <div className="col-xl-7 col-lg-7">
              <div style={{ paddingRight: '30px' }}>
                <div className="sec-title" style={{ marginBottom: '30px' }}>
                  <p>Get In Touch</p>
                  <div className="title">Send Us a <span>Message</span></div>
                </div>

                {submitted && (
                  <div style={{
                    background: '#1F2E23', color: '#C49B5D', border: '1px solid #C49B5D', padding: '15px 20px',
                    borderRadius: '4px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px',
                    fontSize: '14px', fontFamily: 'var(--font-primary)'
                  }}>
                    <span style={{ fontWeight: 'bold' }}>✓</span>
                    Thank you for reaching out! We'll get back to you within 24 hours.
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-xl-6 col-md-6">
                      <div className="single-box">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your Name *"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-md-6">
                      <div className="single-box">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Email Address *"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-6 col-md-6">
                      <div className="single-box">
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Phone Number"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-md-6">
                      <PIADropdown
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        placeholder="Select Service"
                        options={[
                          'Concept Designs',
                          'Project Designs',
                          'Make Overs',
                          'Consulting',
                          'Glass & Wrought',
                          'Space Planning',
                        ]}
                      />
                    </div>
                  </div>
                  <div className="single-box">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your Message *"
                      required
                      rows="6"
                      style={{ resize: 'vertical' }}
                    />
                  </div>
                  <button className="btn-one" type="submit" style={{ width: '100%' }}>
                    Send Message<span className="flaticon-next"></span>
                  </button>
                </form>
              </div>
            </div>

            {/* Map & Info */}
            <div className="col-xl-5 col-lg-5">
              <div style={{ paddingLeft: '20px' }}>
                <div className="sec-title" style={{ marginBottom: '30px' }}>
                  <p>Our Location</p>
                  <div className="title">Find Us On <span>Map</span></div>
                </div>

                {/* Embedded Map */}
                <div style={{ borderRadius: '4px', overflow: 'hidden', marginBottom: '30px', height: '320px' }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.5773855994097!2d90.4356!3d23.7806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7cb2fd59f91%3A0x3be47af01c4efbc!2sAftab%20Nagar%2C%20Dhaka%201212!5e0!3m2!1sen!2sbd!4v1234567890"
                    width="100%"
                    height="320"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="PIA Location Map"
                  />
                </div>

                {/* Social Links */}
                <div style={{ textAlign: 'center' }}>
                  <p style={{ marginBottom: '15px', color: '#666' }}>Follow us on social media</p>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                    {[
                      { icon: 'fa-facebook', href: 'https://www.facebook.com/profile.php?id=61555749343330' },
                      { icon: 'fa-skype', href: '#' },
                      { icon: 'fa-linkedin', href: '#' },
                    ].map((s, i) => (
                      <a
                        key={i}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          width: '40px', height: '40px', borderRadius: '50%',
                          background: '#1a1a2e', color: '#fff',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '16px', transition: 'background 0.3s',
                          textDecoration: 'none',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = '#c8a96e'}
                        onMouseLeave={e => e.currentTarget.style.background = '#1a1a2e'}
                      >
                        <i className={`fa ${s.icon}`} aria-hidden="true"></i>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  )
}

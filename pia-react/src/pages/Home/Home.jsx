import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import PIALoader from '../../components/PIALoader/PIALoader'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'
import ApartmentStory from '../../components/ApartmentStory/ApartmentStory'

// ─── Hero Slider Data ─────────────────────────────────────
const slides = [
  {
    img: '/images/slides/v1-1.jpg',
    title: 'Elevate every day',
    text: 'Design is not just what it looks like,\nbut how it makes you feel in every moment.',
    btnLabel: 'About Company',
    btnTo: '/about',
    align: 'left',
  },
  {
    img: '/images/slides/v1-2.jpg',
    title: 'Curated Spaces',
    text: 'Every corner reflects your story,\nthoughtfully brought to life.',
    btnLabel: 'Our Services',
    btnTo: '/services',
    align: 'right',
  },
  {
    img: '/images/slides/v1-3.jpg',
    title: 'Artful Balance',
    text: 'Merging beauty and practicality into seamless harmony.',
    btnLabel: 'About Company',
    btnTo: '/about',
    align: 'left',
  },
]

// ─── Highlights Data ───────────────────────────────────────
const highlights = [
  {
    icon: 'icon-concept',
    title: 'Concept Designs',
    text: 'Indignation dislike who are beguile works & demoralized the charms.',
  },
  {
    icon: 'icon-scheme',
    title: 'Project Designs',
    text: 'Our power of choice is untrammelled and all nothing prevents best.',
  },
  {
    icon: 'icon-cupboard',
    title: 'Make Overs',
    text: 'Every pleasure is to be welcomed & every circumstances & owing power.',
  },
]

// ─── Working Areas Data ────────────────────────────────────
const workingAreas = [
  {
    img: '/images/resources/working-1.jpg',
    iconClass: 'icon-architecture-and-city1',
    title: 'Residential',
    text: 'Elevating homes with personalized designs that blend functionality and style, creating spaces that inspire comfort, warmth, and cherished memories.',
  },
  {
    img: '/images/resources/working-2.jpg',
    iconClass: 'icon-shop',
    title: 'Commercial',
    text: 'Transforming commercial spaces into vibrant hubs of productivity and innovation, where form meets function to enhance employee well-being and brand identity.',
  },
  {
    img: '/images/resources/working-3.jpg',
    iconClass: 'icon-company',
    title: 'Industries',
    text: 'Innovating industrial environments with efficient and sustainable design solutions, optimizing workflows and maximizing operational effectiveness for long-term success.',
  },
]

// ─── Recent Projects Data ──────────────────────────────────
const recentProjects = [
  { img: '/images/projects/lat-pro-1.jpg', category: 'Modern Design', title: 'Office Partition Walls' },
  { img: '/images/projects/lat-pro-2.jpg', category: 'Modern Design', title: 'Office Partition Walls' },
  { img: '/images/projects/lat-pro-3.jpg', category: 'Modern Design', title: 'Office Partition Walls' },
  { img: '/images/projects/lat-pro-4.jpg', category: 'Modern Design', title: 'Office Partition Walls' },
  { img: '/images/projects/lat-pro-5.jpg', category: 'Modern Design', title: 'Office Partition Walls' },
]

// ─── Working Process ────────────────────────────────────────
const workingProcess = [
  {
    num: '01',
    title: 'Idea & Design',
    text: 'With righteous indignation and works off beguiled demoralized charm.',
    icon: 'icon-productive',
  },
  {
    num: '02',
    title: 'Specification',
    text: 'Our power of choice is untrammelled and when nothing prevents.',
    icon: 'icon-document',
  },
  {
    num: '03',
    title: 'Execution',
    text: 'Wing to the claims of duty the obligations will frequently occur.',
    icon: 'icon-kitchen',
  },
]

// ─── Testimonials ───────────────────────────────────────────
const testimonials = [
  {
    name: 'Shelly Johnson',
    location: 'California',
    img: '/images/testimonial/testi-1.png',
    text: 'Your guys were great knowledgeable, well experienced, efficient and neat. A true to work with Crystalo.',
  },
  {
    name: 'Cathrine Wagner',
    location: 'Los Angeles',
    img: '/images/testimonial/testi-2.png',
    text: 'Indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment.',
  },
  {
    name: 'Cuthbert Brain',
    location: 'Newyork City',
    img: '/images/testimonial/testi-3.png',
    text: 'Same as saying through shrinking from all pain these cases are perfectly simple and easy to distinguish.',
  },
]

// ─── Brands ─────────────────────────────────────────────────
const brands = [
  '/images/brand/1.png',
  '/images/brand/2.png',
  '/images/brand/3.png',
  '/images/brand/4.png',
  '/images/brand/5.png',
  '/images/brand/6.png',
]

// ─── Mission Statements ─────────────────────────────────────
const missions = [
  {
    title: 'Mission Statement',
    text: 'Our mission at Plastid Interior and Architecture is to enrich lives by creating captivating spaces that harmonize functionality with aesthetics, fostering environments where people thrive and memories are made.',
  },
  {
    title: 'Mission Statement',
    text: 'Driven by a passion for innovation and guided by a commitment to excellence, our mission is to push the boundaries of design, crafting personalized solutions that reflect the unique aspirations and identities of our clients.',
  },
  {
    title: 'Mission Statement',
    text: 'Our mission is to be pioneers of transformation, reshaping the way people experience their surroundings by infusing every project with creativity, integrity, and a relentless pursuit of perfection.',
  },
]

// ─── Hero Slider Component ─────────────────────────────────
function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const slideRef = useRef(null)
  const backgroundRefs = useRef([])
  const timerRef = useRef(null)

  const goTo = (idx) => {
    setCurrent(idx)
  }

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timerRef.current)
  }, [])

  useEffect(() => {
    // Background fade transition
    slides.forEach((_, i) => {
      const bg = backgroundRefs.current[i]
      if (bg) {
        gsap.to(bg, {
          opacity: i === current ? 1 : 0,
          duration: 1,
          ease: 'power2.out',
        })
      }
    })

    // Content animations
    if (slideRef.current) {
      const title = slideRef.current.querySelector('.big-title')
      const text = slideRef.current.querySelector('.text')
      const button = slideRef.current.querySelector('.btn-box')

      if (title && text && button) {
        gsap.killTweensOf([title, text, button])
        
        const tl = gsap.timeline()
        tl.fromTo(title,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
        )
        .fromTo(text,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
          '-=0.3'
        )
        .fromTo(button,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' },
          '-=0.2'
        )
      }
    }
  }, [current])

  const slide = slides[current]

  return (
    <section className="main-slider">
      <div className="rev_slider_wrapper fullwidthbanner-container" style={{ position: 'relative', overflow: 'hidden', minHeight: '600px' }}>
        {/* Backgrounds */}
        {slides.map((s, i) => (
          <div
            key={i}
            ref={(el) => (backgroundRefs.current[i] = el)}
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundImage: `url(${s.img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: i === 0 ? 1 : 0,
              zIndex: i === current ? 1 : 0,
            }}
          />
        ))}

        {/* Dark overlay */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.45)', zIndex: 2
        }} />

        {/* Content */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          display: 'flex', alignItems: 'center', zIndex: 3,
          padding: '0 60px',
        }}>
          <div
            ref={slideRef}
            className="slide-content left-slide"
            style={{
              maxWidth: '700px',
              textAlign: slide.align === 'right' ? 'right' : 'left',
              marginLeft: slide.align === 'right' ? 'auto' : '0',
            }}
          >
            <div className="big-title" style={{ fontSize: '52px', fontWeight: '700', color: '#fff', marginBottom: '20px', lineHeight: 1.2 }}>
              {slide.title}
            </div>
            <div className="text" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '18px', marginBottom: '30px', whiteSpace: 'pre-line' }}>
              {slide.text}
            </div>
            <div className="btn-box">
              <Link className="btn-one" to={slide.btnTo}>
                {slide.btnLabel}<span className="flaticon-next"></span>
              </Link>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div style={{
          position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: '10px', zIndex: 4
        }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === current ? '30px' : '12px',
                height: '12px',
                borderRadius: '6px',
                background: i === current ? '#c8a96e' : 'rgba(255,255,255,0.6)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={() => goTo((current - 1 + slides.length) % slides.length)}
          style={{
            position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)',
            zIndex: 4, background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff',
            width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer',
            fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.3s',
          }}
          aria-label="Previous slide"
        >
          <i className="fa fa-angle-left" />
        </button>
        <button
          onClick={() => goTo((current + 1) % slides.length)}
          style={{
            position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)',
            zIndex: 4, background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff',
            width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer',
            fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.3s',
          }}
          aria-label="Next slide"
        >
          <i className="fa fa-angle-right" />
        </button>
      </div>
    </section>
  )
}

// ─── Simple Carousel Hook ──────────────────────────────────
function useCarousel(items, visibleCount = 3, autoPlay = true) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    if (!autoPlay) return
    const t = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length)
    }, 4000)
    return () => clearInterval(t)
  }, [items.length, autoPlay])
  const visible = []
  for (let i = 0; i < visibleCount; i++) {
    visible.push(items[(index + i) % items.length])
  }
  return { visible, index, setIndex }
}

// ─── Projects Carousel ──────────────────────────────────────
function ProjectsCarousel() {
  const [index, setIndex] = useState(0)
  const visibleCount = 3

  const prev = () => setIndex((p) => (p - 1 + recentProjects.length) % recentProjects.length)
  const next = () => setIndex((p) => (p + 1) % recentProjects.length)

  const visible = []
  for (let i = 0; i < visibleCount; i++) {
    visible.push(recentProjects[(index + i) % recentProjects.length])
  }

  return (
    <div style={{ position: 'relative' }}>
      <div className="project-carousel owl-carousel owl-theme" style={{ display: 'flex', gap: '20px', overflow: 'hidden' }}>
        {visible.map((p, i) => (
          <div key={i} className="single-project-style1" style={{ flex: '1', minWidth: 0 }}>
            <div className="img-holder" style={{ position: 'relative' }}>
              <img src={p.img} alt={p.title} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
              <div className="overlay-content">
                <div className="inner-content">
                  <div className="link-box">
                    <Link className="btn-one" to="/projects">Case Study<span className="flaticon-next"></span></Link>
                  </div>
                </div>
              </div>
              <div className="title-box">
                <span>{p.category}</span>
                <h3>{p.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button onClick={prev} className="btn-two" style={{ marginRight: '10px' }}>
          <i className="fa fa-angle-left" />
        </button>
        <button onClick={next} className="btn-two">
          <i className="fa fa-angle-right" />
        </button>
      </div>
    </div>
  )
}

// ─── Mission Carousel ───────────────────────────────────────
function MissionCarousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex((p) => (p + 1) % missions.length), 5000)
    return () => clearInterval(t)
  }, [])

  const m = missions[index]

  return (
    <div className="about-carousel-box">
      <div className="single-box">
        <div className="icon-holder">
          <span className="icon-target"></span>
        </div>
        <div className="text-holder">
          <h3>{m.title}</h3>
          <p>{m.text}</p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '8px', marginTop: '15px' }}>
        {missions.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            style={{
              width: i === index ? '24px' : '10px',
              height: '10px',
              borderRadius: '5px',
              background: i === index ? '#c8a96e' : '#ddd',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s',
              padding: 0,
            }}
            aria-label={`Mission ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Brands Carousel ────────────────────────────────────────
function BrandsCarousel() {
  const [index, setIndex] = useState(0)
  const visibleCount = 4

  useEffect(() => {
    const t = setInterval(() => setIndex((p) => (p + 1) % brands.length), 2500)
    return () => clearInterval(t)
  }, [])

  const visible = []
  for (let i = 0; i < visibleCount; i++) {
    visible.push(brands[(index + i) % brands.length])
  }

  return (
    <ul className="brand-items-carousel owl-carousel owl-theme" style={{ display: 'flex', gap: '30px', alignItems: 'center', listStyle: 'none', padding: 0, justifyContent: 'center' }}>
      {visible.map((src, i) => (
        <li key={i} className="single-brand-item" style={{ flex: 1, textAlign: 'center' }}>
          <a href="#"><img src={src} alt="Brand" style={{ maxHeight: '60px', objectFit: 'contain', filter: 'grayscale(1)', transition: 'filter 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.filter = 'grayscale(0)'}
            onMouseLeave={e => e.currentTarget.style.filter = 'grayscale(1)'}
          /></a>
        </li>
      ))}
    </ul>
  )
}

// ─── Appointment Form ───────────────────────────────────────
function AppointmentForm() {
  const [formData, setFormData] = useState({ name: '', email: '', service: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setFormData({ name: '', email: '', service: '' })
  }

  return (
    <div className="appointment-box">
      <div className="title-box">
        <h2>Make Appointment</h2>
        <span>Leave your information here and get reply from our expert in 24 hours, don't hesitate to ask.</span>
      </div>
      <div className="appointment">
        {submitted && (
          <div style={{ background: '#4caf50', color: '#fff', padding: '12px', borderRadius: '4px', marginBottom: '15px' }}>
            Thank you! We'll be in touch within 24 hours.
          </div>
        )}
        <form className="appointment-form" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-xl-12">
              <div className="single-box">
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="single-box">
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="single-box">
                <select name="service" value={formData.service} onChange={handleChange} style={{ width: '100%', padding: '12px 15px', border: '1px solid #e5e5e5' }}>
                  <option value="">Interested In</option>
                  <option>Concept Designs</option>
                  <option>Project Designs</option>
                  <option>Make Overs</option>
                  <option>Consulting</option>
                  <option>Glass &amp; Wrought</option>
                  <option>Space Planning</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="single-box">
                <button className="btn-one" type="submit">Submit Here<span className="flaticon-next"></span></button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

// ─── Main Home Page ─────────────────────────────────────────
export default function Home() {
  return (
    <div className="boxed_wrapper">
      <PIALoader />
      <Header />

      {/* Hero — Scroll-Driven Apartment Transformation */}
      <ApartmentStory />

      {/* Highlights */}
      <section className="highlights-area">
        <div className="container">
          <div className="row">
            {highlights.map((h, i) => (
              <div key={i} className="col-xl-4 col-lg-4">
                <div className="single-highlight-box text-center">
                  <div className="icon-holder">
                    <span className={h.icon}></span>
                  </div>
                  <div className="inner-content">
                    <div className="text">
                      <h3>{h.title}</h3>
                      <p>{h.text}</p>
                    </div>
                    <a className="btn-one" href="#">Read More<span className="flaticon-next"></span></a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="about-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-5 col-lg-5">
              <div className="about-image-box">
                <div className="inner-box">
                  <img src="/images/resources/about-image.jpg" alt="Awesome Image" />
                  <div className="overlay">
                    <div className="box">
                      <div className="icon">
                        <img src="/images/icon/home.png" alt="Home Icon" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-box">
                  <p>Where Vision Meets Reality</p>
                  <h3>Md. Al Rafat, <span>CEO &amp; Founder</span></h3>
                </div>
              </div>
            </div>
            <div className="col-xl-7 col-lg-7">
              <div className="about-text">
                <div className="sec-title">
                  <p>About Company</p>
                  <div className="title">A small efficient<br />interior <span>designing team</span></div>
                </div>
                <div className="inner-content">
                  <div className="text">
                    Plastid Interior and Architecture is not just a design firm; it's a visionary journey into the heart of spaces. With a passion for innovation and a commitment to excellence, we specialize in crafting bespoke interiors and architectural solutions that redefine living and working environments.
                    <br /><br />
                    From concept to completion, our team of seasoned designers and architects collaborate closely with clients to transform visions into tangible realities. With an unwavering dedication to quality craftsmanship and attention to detail, Plastid Interior and Architecture delivers timeless designs that inspire, captivate, and elevate every space.
                  </div>
                  <MissionCarousel />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Working Areas */}
      <section className="working-area" style={{ backgroundImage: 'url(/images/parallax-background/working-bg.jpg)' }}>
        <div className="container">
          <div className="sec-title with-text max-width text-center">
            <p>Working Areas</p>
            <div className="title clr-white">Covered <span>Industries</span></div>
            <p className="bottom-text">We are an Interior Designer, Who believe in excellence, quality and honesty, yes we design beautiful home interiors.</p>
          </div>
          <div className="row">
            {workingAreas.map((w, i) => (
              <div key={i} className="col-xl-4 col-lg-4">
                <div className="single-working-box">
                  <div className="img-holder">
                    <div className="inner">
                      <img src={w.img} alt={w.title} />
                      <div className="overlay-style-one"></div>
                    </div>
                  </div>
                  <div className="text-holder">
                    <div className="plus-icon-box"><span className="icon-plus"></span></div>
                    <div className="outer-box">
                      <div className="icon">
                        <div className="inner">
                          <div className="box">
                            <span className={w.iconClass}></span>
                          </div>
                        </div>
                      </div>
                      <div className="text">
                        <h3>{w.title}</h3>
                        <p>{w.text}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Projects */}
      <section className="recently-project-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="sec-title float-left">
                <p>Projects</p>
                <div className="title">Recently Completed <span>Works</span></div>
              </div>
              <div className="more-project-button float-right">
                <Link className="btn-two" to="/projects">More Projects<span className="flaticon-next"></span></Link>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <ProjectsCarousel />
        </div>
      </section>

      {/* Working Process */}
      <section className="working-process-area">
        <div className="container">
          <div className="sec-title text-center">
            <p>To Do good design</p>
            <div className="title">Our Working <span>process</span></div>
          </div>
          <div className="row">
            {workingProcess.map((p, i) => (
              <div key={i} className="col-xl-4 col-lg-4">
                <div className="single-working-process text-center">
                  <div className="top-box"><span>{p.num}</span></div>
                  <div className="inner">
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                    <div className="icon-holder">
                      <span className={p.icon}></span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Slogan CTA */}
      <section className="slogan-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="inner-content flex-box-two fix">
                <div className="title float-left">
                  <h3>Wanna Work With Our Professional Team? Make an Appointment.</h3>
                </div>
                <div className="button float-right">
                  <Link className="btn-one" to="/contact">Make an Appointment<span className="flaticon-next"></span></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonial-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="sec-title float-left">
                <p>Testimonials</p>
                <div className="title">Our Customer <span>Words</span></div>
              </div>
              <div className="more-reviews-button float-right">
                <a className="btn-two" href="#">More Reviews<span className="flaticon-next"></span></a>
              </div>
            </div>
          </div>
          <div className="row">
            {testimonials.map((t, i) => (
              <div key={i} className="col-xl-4 col-lg-4">
                <div className="single-testimonial-item text-center">
                  <div className="quote-icon">
                    <span className="icon-quote1"></span>
                  </div>
                  <div className="inner-content">
                    <div className="client-info">
                      <h3>{t.name}</h3>
                      <span>{t.location}</span>
                    </div>
                    <div className="img-box">
                      <img src={t.img} alt={t.name} />
                    </div>
                    <div className="text-box">
                      <p>{t.text}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Area */}
      <section className="appointment-area" style={{ backgroundImage: 'url(/images/resources/appointment-bg.jpg)' }}>
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6">
              <div className="map-content-box">
                <div className="sec-title">
                  <p>Contact Details</p>
                  <div className="title">How Can We <span>Help You?</span></div>
                </div>
                <div className="inner">
                  <img src="/images/resources/map.png" alt="Map" />
                  <div className="overlay">
                    <div className="single-location-box one">
                      <div className="marker-box"><span className="icon-pin"></span></div>
                      <div className="location-info">
                        <h3>Dhaka</h3>
                        <p>House-11 (2nd Floor), Block-E,<br />Sector-1, Aftab Nagar,<br />Dhaka 1212<br />+880 1768834417<br />info@pcd-bd.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <AppointmentForm />
            </div>
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="brand-area">
        <div className="container">
          <div className="sec-title">
            <p>Corporate Clients</p>
            <div className="title">More than <span>2000 Clients</span></div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <BrandsCarousel />
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  )
}

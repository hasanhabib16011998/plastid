import { Link } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import Preloader from '../../components/Preloader/Preloader'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'

const services = [
  {
    slug: 'concept-designs',
    icon: 'icon-concept',
    title: 'Concept Designs',
    text: 'We craft innovative concept designs that translate your vision into tangible spatial experiences. From initial sketches to detailed renderings, our concept design service sets the creative foundation for every project.',
    img: '/images/services/s1.jpg',
  },
  {
    slug: 'project-designs',
    icon: 'icon-scheme',
    title: 'Project Designs',
    text: 'Our project design service delivers comprehensive design documentation and specifications, ensuring your project is executed with precision and excellence from start to finish.',
    img: '/images/services/s2.jpg',
  },
  {
    slug: 'make-overs',
    icon: 'icon-cupboard',
    title: 'Make Overs',
    text: 'Transform your existing space into something extraordinary. Our makeover service refreshes interiors with new finishes, furniture, and décor while maintaining structural integrity.',
    img: '/images/services/s3.jpg',
  },
  {
    slug: 'consulting',
    icon: 'icon-document',
    title: 'Consulting',
    text: 'Our expert consulting service provides professional guidance on space planning, material selection, budgeting, and project management to ensure your project succeeds.',
    img: '/images/services/s4.jpg',
  },
  {
    slug: 'glass-wrought',
    icon: 'icon-architecture-and-city1',
    title: 'Glass & Wrought',
    text: 'Specializing in glass and wrought iron elements, we create stunning architectural features that add elegance, strength, and sophistication to any space.',
    img: '/images/services/s5.jpg',
  },
  {
    slug: 'space-planning',
    icon: 'icon-productive',
    title: 'Space Planning',
    text: 'Maximize the potential of your space with our expert space planning service. We optimize layouts for flow, function, and aesthetic harmony tailored to your lifestyle.',
    img: '/images/services/s6.jpg',
  },
]

export default function Services() {
  return (
    <div className="boxed_wrapper">
      <Preloader />
      <Header />

      <Breadcrumb
        style="style2"
        title="Our Services"
        subtitle="What We Offer"
        bgImage="/images/resources/breadcrumb-bg-2.jpg"
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Services' },
        ]}
      />

      {/* Services Grid */}
      <section className="services-area" style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="row">
            {services.map((s, i) => (
              <div key={i} className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                <div className="single-service-style1" style={{ marginBottom: '40px' }}>
                  <div className="img-holder" style={{ overflow: 'hidden', borderRadius: '4px', marginBottom: '25px' }}>
                    <div style={{
                      height: '220px',
                      background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <span className={s.icon} style={{ fontSize: '60px', color: '#c8a96e' }}></span>
                    </div>
                  </div>
                  <div className="text-holder">
                    <h3 style={{ marginBottom: '12px', fontSize: '22px' }}>{s.title}</h3>
                    <p style={{ marginBottom: '20px', color: '#666' }}>{s.text}</p>
                    <Link className="btn-one" to={`/services/${s.slug}`}>
                      Read More<span className="flaticon-next"></span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
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

      <Footer />
      <ScrollToTop />
    </div>
  )
}

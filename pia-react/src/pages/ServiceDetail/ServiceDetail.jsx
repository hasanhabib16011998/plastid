import { useParams, Link } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import PIALoader from '../../components/PIALoader/PIALoader'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'

const serviceData = {
  'concept-designs': {
    title: 'Concept Designs',
    icon: 'icon-concept',
    heroTitle: 'Concept Designs',
    mainImg: '/images/services/service-single/single-service-1.jpg',
    description1: 'Welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty obligations of business it will frequently occur that pleasures have to be repudiated & annoyances that accepted. That is wise man therefore always holds indignation and dislike men who are so beguiled.',
    description2: 'Certain circumstances and owing to the claims of duty obligations of business it will frequently occurs all that pleasures have to be repudiated & annoyances that accepted. We at Plastid Interior bring your concept to life through meticulous 3D visualization and creative design documentation.',
    advantages: [
      { icon: 'icon-success', title: 'Interior\n Expertise', text: 'Have to accepted That is wise man of therefore always we indignation.' },
      { icon: 'icon-guarantee-certificate', title: 'Guaranteed\n Work', text: 'Have to accepted That is wise man of therefore always we indignation.' },
      { icon: 'icon-hr', title: 'Free\n Consultation', text: 'Have to accepted That is wise man of therefore always we indignation.' },
      { icon: 'icon-wallet', title: 'Reasonable\n Price', text: 'Have to accepted That is wise man of therefore always we indignation.' },
    ],
  },
  'project-designs': {
    title: 'Project Designs',
    icon: 'icon-scheme',
    heroTitle: 'Project Designs',
    mainImg: '/images/services/service-single/single-service-1.jpg',
    description1: 'Our project design service delivers comprehensive design documentation and specifications, ensuring your project is executed with precision and excellence from start to finish.',
    description2: 'Every aspect of the project design is carefully considered to optimize functionality, aesthetics, and budget efficiency. From technical drawings to material schedules, we handle every detail.',
    advantages: [
      { icon: 'icon-success', title: 'Expert\n Design', text: 'Comprehensive project documentation for seamless execution.' },
      { icon: 'icon-guarantee-certificate', title: 'Quality\n Assured', text: 'All designs are reviewed and approved before implementation.' },
      { icon: 'icon-hr', title: 'Client\n Focused', text: 'We work closely with you at every stage of the project.' },
      { icon: 'icon-wallet', title: 'Budget\n Friendly', text: 'Competitive pricing with no hidden costs.' },
    ],
  },
  'make-overs': {
    title: 'Make Overs',
    icon: 'icon-cupboard',
    heroTitle: 'Interior Make Overs',
    mainImg: '/images/services/service-single/single-service-1.jpg',
    description1: 'Transform your existing space into something extraordinary. Our makeover service refreshes interiors with new finishes, furniture, and décor while maintaining structural integrity.',
    description2: 'From single room refreshes to whole-home transformations, our team delivers remarkable results every time. We minimize disruption while maximizing impact.',
    advantages: [
      { icon: 'icon-success', title: 'Skilled\n Craftsmen', text: 'Experienced team delivering beautiful transformations.' },
      { icon: 'icon-guarantee-certificate', title: 'Quality\n Materials', text: 'We use only premium materials for lasting results.' },
      { icon: 'icon-hr', title: 'Minimal\n Disruption', text: 'We work efficiently to minimize disruption to your daily life.' },
      { icon: 'icon-wallet', title: 'Value\n for Money', text: 'Exceptional results at competitive prices.' },
    ],
  },
  'consulting': {
    title: 'Consulting',
    icon: 'icon-document',
    heroTitle: 'Design Consulting',
    mainImg: '/images/services/service-single/single-service-1.jpg',
    description1: 'Our design consulting service provides expert guidance at every stage of your project. Whether you need help with space planning, material selection, or project management, our consultants bring years of experience.',
    description2: 'We offer flexible consulting packages tailored to your needs — from one-time advisory sessions to ongoing project oversight. Our transparent approach ensures clarity throughout.',
    advantages: [
      { icon: 'icon-success', title: 'Expert\n Advisors', text: 'Seasoned professionals with years of industry experience.' },
      { icon: 'icon-guarantee-certificate', title: 'Proven\n Results', text: 'Track record of successful project outcomes.' },
      { icon: 'icon-hr', title: 'Flexible\n Packages', text: 'Consulting options to suit any project size or budget.' },
      { icon: 'icon-wallet', title: 'Cost\n Effective', text: 'Save money by avoiding costly design mistakes.' },
    ],
  },
  'glass-wrought': {
    title: 'Glass & Wrought',
    icon: 'icon-architecture-and-city1',
    heroTitle: 'Glass & Wrought Iron',
    mainImg: '/images/services/service-single/single-service-1.jpg',
    description1: 'Specializing in glass and wrought iron architectural elements, we create stunning features that add elegance, strength, and sophistication to any space.',
    description2: 'From custom glass partitions and railings to ornate wrought iron doors and staircases, our craftsmen deliver exceptional quality and precision in every piece.',
    advantages: [
      { icon: 'icon-success', title: 'Master\n Craftsmen', text: 'Skilled artisans with expertise in glass and ironwork.' },
      { icon: 'icon-guarantee-certificate', title: 'Custom\n Designs', text: 'Every piece is uniquely crafted to your specifications.' },
      { icon: 'icon-hr', title: 'Durable\n Products', text: 'Built to last with premium materials and workmanship.' },
      { icon: 'icon-wallet', title: 'Fair\n Pricing', text: 'Transparent pricing with no surprises.' },
    ],
  },
  'space-planning': {
    title: 'Space Planning',
    icon: 'icon-productive',
    heroTitle: 'Space Planning',
    mainImg: '/images/services/service-single/single-service-1.jpg',
    description1: 'Maximize the potential of your space with our expert space planning service. We analyze your space, understand how you use it, and design optimal layouts that improve flow, functionality, and comfort.',
    description2: 'Good space planning is invisible — it feels natural and intuitive. Our planners use advanced software to create precise floor plans and 3D models for visualization before any work begins.',
    advantages: [
      { icon: 'icon-success', title: 'Smart\n Layouts', text: 'Optimized floor plans for maximum space efficiency.' },
      { icon: 'icon-guarantee-certificate', title: '3D\n Modeling', text: 'Visualize your space before any work begins.' },
      { icon: 'icon-hr', title: 'Ergonomic\n Design', text: 'Spaces designed for comfort, safety, and accessibility.' },
      { icon: 'icon-wallet', title: 'Cost\n Savings', text: 'Better planning means fewer expensive revisions.' },
    ],
  },
}

const allServices = [
  { slug: 'concept-designs', title: 'Concept Designs' },
  { slug: 'project-designs', title: 'Project Designs' },
  { slug: 'make-overs', title: 'Make Overs' },
  { slug: 'consulting', title: 'Consulting' },
  { slug: 'glass-wrought', title: 'Glass & Wrought' },
  { slug: 'space-planning', title: 'Space Planning' },
]

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = serviceData[slug] || serviceData['concept-designs']

  return (
    <div className="boxed_wrapper">
      <PIALoader />
      <Header />

      <Breadcrumb
        style="style2"
        title={service.heroTitle}
        subtitle="Our Services"
        bgImage="/images/resources/breadcrumb-bg-2.jpg"
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Services', to: '/services' },
          { label: 'Single Service' },
        ]}
      />

      {/* Single Service Area - matching original layout */}
      <section className="single-service-area">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <div className="col-xl-4 col-lg-5 col-md-12 col-sm-12">
              <div className="single-service-sidebar">
                {/* Services Navigation */}
                <div className="single-sidebar">
                  <ul className="service-pages">
                    {allServices.map((s) => (
                      <li key={s.slug} className={slug === s.slug ? 'active' : ''}>
                        <Link to={`/services/${s.slug}`}>
                          <div className="title">
                            <h3 className="static">{s.title}</h3>
                            <div className="overlay-title">
                              <h3>{s.title}</h3>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact Box */}
                <div className="sidebar-contact-box text-center">
                  <div className="inner-content">
                    <div className="icon-holder">
                      <span className="icon-support1"></span>
                    </div>
                    <h3>Consult with expert &<br /> Start today</h3>
                    <div className="bottom-box">
                      <h2>+880 1768834417</h2>
                      <span>Email: info@pcd-bd.com</span>
                    </div>
                    <div className="button">
                      <Link className="btn-one" to="/contact">Make Appointment<span className="flaticon-next"></span></Link>
                    </div>
                  </div>
                </div>

                {/* Download */}
                <div className="single-sidebar">
                  <ul className="service-pack-download">
                    <li className="clearfix">
                      <div className="title-holder">
                        <a href="#">Download.PDF <span>(150kb)</span></a>
                      </div>
                      <div className="icon-holder">
                        <i className="fa fa-download" aria-hidden="true"></i>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-xl-8 col-lg-7 col-md-12 col-sm-12">
              {/* Service Image + Description */}
              <div className="single-service-top">
                <div className="single-service-image-box">
                  <img src={service.mainImg} alt={service.title} />
                </div>
                <div className="text">
                  <h2>{service.title}</h2>
                  <div className="inner">
                    <p>{service.description1}</p>
                    <p>{service.description2}</p>
                  </div>
                </div>
              </div>

              {/* Advantages Boxes */}
              <div className="advantages-content">
                <div className="row">
                  {service.advantages.map((adv, i) => (
                    <div key={i} className="col-xl-3 col-lg-6 col-md-6">
                      <div className="single-advantages-box">
                        <div className="inner">
                          <div className="static-content">
                            <div className="icon-holder">
                              <span className={adv.icon}></span>
                            </div>
                            <div className="title">
                              <h3 style={{ whiteSpace: 'pre-line' }}>{adv.title}</h3>
                            </div>
                          </div>
                          <div className="overlay-text">
                            <div className="box">
                              <div className="inner-text">
                                <p>{adv.text}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* How We Work */}
              <div className="how-we-work" style={{ marginTop: '40px' }}>
                <h3 style={{ marginBottom: '20px' }}>How We Work</h3>
                <div className="row">
                  <div className="col-xl-6">
                    <img src="/images/services/service-single/how-work.jpg" alt="How We Work" style={{ width: '100%', borderRadius: '4px' }} />
                  </div>
                  <div className="col-xl-6">
                    <div style={{ paddingLeft: '20px' }}>
                      <p style={{ color: '#666', lineHeight: 1.8, marginBottom: '15px' }}>
                        Our proven process ensures every project is delivered on time, within budget, and to the highest standards of quality and craftsmanship.
                      </p>
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        {['Initial Consultation & Discovery', 'Concept Development', 'Design Refinement & Approval', 'Project Execution', 'Quality Review & Handover'].map((step, i) => (
                          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 0', borderBottom: '1px solid #eee' }}>
                            <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#c8a96e', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', flexShrink: 0 }}>
                              {i + 1}
                            </span>
                            <span style={{ color: '#555' }}>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                  <h3>Ready to Transform Your Space? Let's Get Started.</h3>
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

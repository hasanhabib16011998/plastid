import { useParams, Link } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import PIALoader from '../../components/PIALoader/PIALoader'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'

const projectsData = {
  1: {
    title: 'Modern Living Room',
    category: 'Residential',
    client: 'Private Client',
    location: 'Dhaka, Bangladesh',
    area: '1,200 sq ft',
    duration: '45 Days',
    mainImg: '/images/projects/lat-pro-1.jpg',
    galleryImgs: [
      '/images/projects/v1-1.jpg',
      '/images/projects/v1-2.jpg',
      '/images/projects/v1-3.jpg',
    ],
    description: 'A stunning modern living room transformation that combines clean lines with warm textures. This project showcases our ability to create spaces that are both aesthetically beautiful and highly functional for everyday living.',
    challenge: 'The primary challenge was transforming an outdated, compartmentalized layout into an open-plan living space while maintaining structural integrity and meeting the client\'s budget constraints.',
    solution: 'We developed a creative solution by removing non-load-bearing walls to open the floor plan, introducing a neutral color palette with golden accents, and using custom-designed furniture pieces to optimize the space.',
  },
  2: {
    title: 'Office Partition Walls',
    category: 'Commercial',
    client: 'Corporate Client',
    location: 'Dhaka, Bangladesh',
    area: '3,500 sq ft',
    duration: '60 Days',
    mainImg: '/images/projects/lat-pro-2.jpg',
    galleryImgs: [
      '/images/projects/v2-1.jpg',
      '/images/projects/v2-2.jpg',
      '/images/projects/v2-3.jpg',
    ],
    description: 'A comprehensive office redesign featuring elegant glass partition walls that create privacy without sacrificing natural light. This project demonstrates our commercial interior expertise.',
    challenge: 'The client needed to create distinct work zones for different departments while maintaining an open, collaborative feel and maximizing natural light throughout the space.',
    solution: 'We implemented a system of frosted glass partitions with aluminum framing, combined with strategic furniture placement to create acoustic barriers while preserving visual connectivity.',
  },
}

// Fallback project for IDs not in data
const defaultProject = projectsData[1]

export default function ProjectSingle() {
  const { id } = useParams()
  const project = projectsData[parseInt(id)] || { ...defaultProject, title: 'Project Detail' }

  return (
    <div className="boxed_wrapper">
      <PIALoader />
      <Header />

      <Breadcrumb
        style="style2"
        title={project.title}
        subtitle="Project Detail"
        bgImage="/images/resources/breadcrumb-bg-2.jpg"
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Projects', to: '/projects' },
          { label: project.title },
        ]}
      />

      <section className="single-project-details-area" style={{ padding: '50px 0 40px' }}>
        <div className="container">
          <div className="row">
            {/* Main Content */}
            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12" style={{ marginBottom: '30px' }}>
              {/* Hero Image */}
              <div style={{ marginBottom: '24px', borderRadius: '8px', overflow: 'hidden' }}>
                <img src={project.mainImg} alt={project.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>

              {/* Description */}
              <div style={{ marginBottom: '25px' }}>
                <h3 style={{ marginBottom: '12px', fontSize: '22px', color: '#1F2E23', fontWeight: 700 }}>Project Overview</h3>
                <p style={{ color: '#555', lineHeight: 1.7, fontSize: '15px' }}>{project.description}</p>
              </div>

              {/* Challenge & Solution */}
              <div className="row d-flex flex-wrap" style={{ marginBottom: '25px' }}>
                <div className="col-xl-6 col-lg-6 col-md-6 col-12 d-flex" style={{ marginBottom: '16px' }}>
                  <div style={{ background: '#f9f9f9', padding: '24px', borderRadius: '8px', width: '100%', borderLeft: '4px solid #1F2E23' }}>
                    <h4 style={{ color: '#1F2E23', marginBottom: '10px', fontSize: '18px', fontWeight: 600 }}>The Challenge</h4>
                    <p style={{ color: '#666', lineHeight: 1.65, fontSize: '14px', margin: 0 }}>{project.challenge}</p>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-12 d-flex" style={{ marginBottom: '16px' }}>
                  <div style={{ background: '#1F2E23', padding: '24px', borderRadius: '8px', width: '100%', borderLeft: '4px solid #C49B5D' }}>
                    <h4 style={{ color: '#C49B5D', marginBottom: '10px', fontSize: '18px', fontWeight: 600 }}>Our Solution</h4>
                    <p style={{ color: '#F5F3ED', opacity: 0.9, lineHeight: 1.65, fontSize: '14px', margin: 0 }}>{project.solution}</p>
                  </div>
                </div>
              </div>

              {/* Gallery */}
              <h3 style={{ marginBottom: '16px', fontSize: '20px', color: '#1F2E23', fontWeight: 700 }}>Project Gallery</h3>
              <div className="row">
                {project.galleryImgs.map((img, i) => (
                  <div key={i} className="col-xl-4 col-md-4 col-6" style={{ marginBottom: '16px' }}>
                    <div style={{ borderRadius: '6px', overflow: 'hidden', height: '160px', background: '#1F2E23' }}>
                      <img
                        src={img}
                        alt={`Gallery ${i + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
              <div>
                {/* Project Info */}
                <div style={{ background: '#f9f9f9', padding: '24px', borderRadius: '8px', marginBottom: '24px', border: '1px solid rgba(196, 155, 93, 0.2)' }}>
                  <h4 style={{ marginBottom: '16px', paddingBottom: '10px', borderBottom: '2px solid #C49B5D', color: '#1F2E23', fontSize: '18px', fontWeight: 600 }}>Project Information</h4>
                  {[
                    { label: 'Category', value: project.category },
                    { label: 'Client', value: project.client },
                    { label: 'Location', value: project.location },
                    { label: 'Project Area', value: project.area },
                    { label: 'Duration', value: project.duration },
                  ].map((info, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid #eee', fontSize: '14px' }}>
                      <span style={{ fontWeight: '600', color: '#1F2E23' }}>{info.label}:</span>
                      <span style={{ color: '#555' }}>{info.value}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div style={{ background: '#1F2E23', border: '1px solid #C49B5D', padding: '28px 24px', borderRadius: '8px', textAlign: 'center', marginBottom: '24px' }}>
                  <h4 style={{ color: '#C49B5D', marginBottom: '10px', fontSize: '20px', fontWeight: 600 }}>Start Your Project</h4>
                  <p style={{ color: '#F5F3ED', opacity: 0.9, marginBottom: '18px', fontSize: '14px' }}>Ready to transform your space?</p>
                  <Link className="btn-one" to="/contact" style={{ width: '100%', justifyContent: 'center' }}>
                    Contact Us<span className="flaticon-next"></span>
                  </Link>
                </div>

                {/* Navigation */}
                <div style={{ display: 'flex' }}>
                  <Link to="/projects" className="btn-two" style={{ width: '100%', textAlign: 'center', justifyContent: 'center' }}>
                    ← Back to All Projects
                  </Link>
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

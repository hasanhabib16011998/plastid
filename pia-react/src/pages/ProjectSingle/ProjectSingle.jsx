import { useParams, Link } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import Preloader from '../../components/Preloader/Preloader'
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
      <Preloader />
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

      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="row">
            {/* Main Content */}
            <div className="col-xl-8 col-lg-8">
              {/* Hero Image */}
              <div style={{ marginBottom: '30px' }}>
                <img src={project.mainImg} alt={project.title} style={{ width: '100%', borderRadius: '4px' }} />
              </div>

              {/* Description */}
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ marginBottom: '15px' }}>Project Overview</h3>
                <p style={{ color: '#666', lineHeight: 1.8 }}>{project.description}</p>
              </div>

              {/* Challenge & Solution */}
              <div className="row" style={{ marginBottom: '30px' }}>
                <div className="col-xl-6">
                  <div style={{ background: '#f9f9f9', padding: '25px', borderRadius: '4px', height: '100%' }}>
                    <h4 style={{ color: '#1a1a2e', marginBottom: '12px' }}>The Challenge</h4>
                    <p style={{ color: '#666', lineHeight: 1.7 }}>{project.challenge}</p>
                  </div>
                </div>
                <div className="col-xl-6">
                  <div style={{ background: '#1a1a2e', padding: '25px', borderRadius: '4px', height: '100%' }}>
                    <h4 style={{ color: '#c8a96e', marginBottom: '12px' }}>Our Solution</h4>
                    <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.7 }}>{project.solution}</p>
                  </div>
                </div>
              </div>

              {/* Gallery */}
              <h3 style={{ marginBottom: '20px' }}>Project Gallery</h3>
              <div className="row">
                {project.galleryImgs.map((img, i) => (
                  <div key={i} className="col-xl-4 col-md-4" style={{ marginBottom: '20px' }}>
                    <img
                      src={img}
                      alt={`Gallery ${i + 1}`}
                      style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-xl-4 col-lg-4">
              <div style={{ paddingLeft: '20px' }}>
                {/* Project Info */}
                <div style={{ background: '#f9f9f9', padding: '25px', borderRadius: '4px', marginBottom: '30px' }}>
                  <h4 style={{ marginBottom: '20px', paddingBottom: '10px', borderBottom: '2px solid #c8a96e' }}>Project Information</h4>
                  {[
                    { label: 'Category', value: project.category },
                    { label: 'Client', value: project.client },
                    { label: 'Location', value: project.location },
                    { label: 'Project Area', value: project.area },
                    { label: 'Duration', value: project.duration },
                  ].map((info, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                      <span style={{ fontWeight: '600', color: '#333' }}>{info.label}:</span>
                      <span style={{ color: '#666' }}>{info.value}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div style={{ background: '#c8a96e', padding: '30px', borderRadius: '4px', textAlign: 'center', marginBottom: '30px' }}>
                  <h4 style={{ color: '#fff', marginBottom: '15px' }}>Start Your Project</h4>
                  <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '20px' }}>Ready to transform your space?</p>
                  <Link className="btn-one" to="/contact" style={{ background: '#fff', color: '#c8a96e' }}>
                    Contact Us<span className="flaticon-next"></span>
                  </Link>
                </div>

                {/* Navigation */}
                <div style={{ display: 'flex', gap: '15px' }}>
                  <Link to="/projects" className="btn-two" style={{ flex: 1, textAlign: 'center' }}>
                    ← Back to Projects
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

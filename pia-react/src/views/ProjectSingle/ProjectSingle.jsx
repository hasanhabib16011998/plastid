'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import PIALoader from '../../components/PIALoader/PIALoader'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'
import { getPIAProjectByIdOrSlug } from '../../lib/payload'

export default function ProjectSingle() {
  const params = useParams()
  const idOrSlug = params?.id

  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProject() {
      if (!idOrSlug) {
        setLoading(false)
        return
      }
      try {
        const cmsProject = await getPIAProjectByIdOrSlug(idOrSlug)
        setProject(cmsProject || null)
      } catch (err) {
        console.error('Failed to load project details from Payload CMS:', err)
        setProject(null)
      } finally {
        setLoading(false)
      }
    }
    loadProject()
  }, [idOrSlug])

  if (loading) {
    return (
      <div className="boxed_wrapper">
        <PIALoader />
        <Header />
        <div style={{ padding: '120px 0', textAlign: 'center' }}>
          <p>Loading project details...</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="boxed_wrapper">
        <Header />
        <Breadcrumb
          style="style2"
          title="Project Not Found"
          subtitle="Project Detail"
          bgImage="/images/resources/breadcrumb-bg-2.jpg"
          crumbs={[
            { label: 'Home', to: '/' },
            { label: 'Projects', to: '/projects' },
            { label: 'Not Found' },
          ]}
        />
        <section style={{ padding: '80px 0', textAlign: 'center' }}>
          <div className="container">
            <h2 style={{ fontSize: '28px', color: '#1F2E23', marginBottom: '16px' }}>Project Not Found</h2>
            <p style={{ color: '#666', marginBottom: '24px' }}>The requested project could not be found.</p>
            <Link href="/projects" className="btn-one">
              Back to All Projects <span className="flaticon-next"></span>
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    )
  }

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
              {(project.challenge || project.solution) && (
                <div className="row d-flex flex-wrap" style={{ marginBottom: '25px' }}>
                  {project.challenge && (
                    <div className="col-xl-6 col-lg-6 col-md-6 col-12 d-flex" style={{ marginBottom: '16px' }}>
                      <div style={{ background: '#f9f9f9', padding: '24px', borderRadius: '8px', width: '100%', borderLeft: '4px solid #1F2E23' }}>
                        <h4 style={{ color: '#1F2E23', marginBottom: '10px', fontSize: '18px', fontWeight: 600 }}>The Challenge</h4>
                        <p style={{ color: '#666', lineHeight: 1.65, fontSize: '14px', margin: 0 }}>{project.challenge}</p>
                      </div>
                    </div>
                  )}
                  {project.solution && (
                    <div className="col-xl-6 col-lg-6 col-md-6 col-12 d-flex" style={{ marginBottom: '16px' }}>
                      <div style={{ background: '#1F2E23', padding: '24px', borderRadius: '8px', width: '100%', borderLeft: '4px solid #C49B5D' }}>
                        <h4 style={{ color: '#C49B5D', marginBottom: '10px', fontSize: '18px', fontWeight: 600 }}>Our Solution</h4>
                        <p style={{ color: '#F5F3ED', opacity: 0.9, lineHeight: 1.65, fontSize: '14px', margin: 0 }}>{project.solution}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Gallery */}
              {project.galleryImgs && project.galleryImgs.length > 0 && (
                <>
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
                </>
              )}
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
                  <Link className="btn-one" href="/contact" style={{ width: '100%', justifyContent: 'center' }}>
                    Contact Us<span className="flaticon-next"></span>
                  </Link>
                </div>

                {/* Navigation */}
                <div style={{ display: 'flex' }}>
                  <Link href="/projects" className="btn-two" style={{ width: '100%', textAlign: 'center', justifyContent: 'center' }}>
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

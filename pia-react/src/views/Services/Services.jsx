'use client'

import Link from 'next/link'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import PIALoader from '../../components/PIALoader/PIALoader'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'
import { serviceTree, serviceData } from '../../data/servicesData'

export default function Services() {
  return (
    <div className="boxed_wrapper">
      <PIALoader />
      <Header />

      <Breadcrumb
        style="style2"
        title="Our Interior & Architecture Services"
        subtitle="Tailored by Space"
        bgImage="/images/resources/breadcrumb-bg-2.jpg"
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Services' },
        ]}
      />

      {/* Services Overview Grid — Organized by Customer Space & Tree Hierarchy */}
      <section className="services-area" style={{ padding: '80px 0' }}>
        <div className="container">
          <div
            className="sec-title text-center"
            style={{ maxWidth: '720px', margin: '0 auto 55px' }}
          >
            <p>Customer-First Solutions</p>
            <div className="title">
              Explore Services <span>By Your Space</span>
            </div>
            <p
              style={{
                marginTop: '14px',
                color: '#555',
                fontSize: '15px',
                lineHeight: '1.7',
                textTransform: 'none',
                fontWeight: 400,
              }}
            >
              Whether you are furnishing a new apartment, fitting out a corporate
              headquarters, launching a signature cafe, or planning a building
              facade, explore our specialized interior and architectural services
              below.
            </p>
          </div>

          <div className="row d-flex flex-wrap">
            {serviceTree.map((branch) => {
              const s = serviceData[branch.slug]
              if (!s) return null
              const hasChildren =
                Array.isArray(branch.children) && branch.children.length > 0

              return (
                <div
                  key={branch.slug}
                  className="col-xl-4 col-lg-6 col-md-6 col-sm-12 d-flex"
                  style={{ marginBottom: '36px' }}
                >
                  <div
                    className="single-service-style1"
                    style={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      background: '#ffffff',
                      borderRadius: '8px',
                      border: '1px solid rgba(196, 155, 93, 0.28)',
                      overflow: 'hidden',
                      boxShadow: '0 6px 24px rgba(0, 0, 0, 0.05)',
                      marginBottom: 0,
                    }}
                  >
                    <div>
                      <div
                        className="img-holder"
                        style={{
                          overflow: 'hidden',
                          marginBottom: 0,
                          position: 'relative',
                        }}
                      >
                        <div
                          style={{
                            height: '190px',
                            background:
                              'linear-gradient(135deg, #000000 0%, #1a1a2e 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderBottom: '2px solid #C49B5D',
                          }}
                        >
                          <span
                            className={s.icon}
                            style={{ fontSize: '56px', color: '#C49B5D' }}
                          />
                        </div>
                      </div>

                      <div
                        className="text-holder"
                        style={{ padding: '26px 24px 16px' }}
                      >
                        <h3 style={{ marginBottom: '10px', fontSize: '22px' }}>
                          <Link
                            href={branch.to}
                            style={{ color: '#000000', textDecoration: 'none' }}
                          >
                            {s.title}
                          </Link>
                        </h3>
                        <p
                          style={{
                            marginBottom: '16px',
                            color: '#555',
                            fontSize: '14.5px',
                            lineHeight: '1.65',
                          }}
                        >
                          {s.shortText}
                        </p>

                        {/* Sub-items Tree Links if available */}
                        {hasChildren && (
                          <div
                            style={{
                              marginTop: '14px',
                              paddingTop: '14px',
                              borderTop: '1px solid rgba(196, 155, 93, 0.22)',
                            }}
                          >
                            <span
                              style={{
                                display: 'block',
                                fontSize: '11px',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                color: '#C49B5D',
                                marginBottom: '8px',
                              }}
                            >
                              Specialized Spaces:
                            </span>
                            <ul
                              style={{
                                listStyle: 'none',
                                padding: 0,
                                margin: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '6px',
                              }}
                            >
                              {branch.children.map((child) => (
                                <li key={child.slug}>
                                  <Link
                                    href={child.to}
                                    style={{
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '8px',
                                      fontSize: '13.5px',
                                      fontWeight: 500,
                                      color: '#222',
                                      textDecoration: 'none',
                                    }}
                                  >
                                    <span
                                      style={{
                                        color: '#C49B5D',
                                        fontWeight: 700,
                                      }}
                                    >
                                      ▸
                                    </span>
                                    <span>{child.label}</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    <div style={{ padding: '10px 24px 26px' }}>
                      <Link className="btn-one" href={branch.to}>
                        Explore {s.title}
                        <span className="flaticon-next" />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
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
                  <h3>
                    Wanna Work With Our Professional Team? Make an Appointment.
                  </h3>
                </div>
                <div className="button float-right">
                  <Link className="btn-one" href="/contact">
                    Make an Appointment
                    <span className="flaticon-next" />
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

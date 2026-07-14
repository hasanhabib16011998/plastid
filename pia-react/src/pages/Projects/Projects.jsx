import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import PIALoader from '../../components/PIALoader/PIALoader'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'

const allProjects = [
  { id: 1, img: '/images/projects/lat-pro-1.jpg', category: 'Residential', title: 'Modern Living Room', tag: 'residential' },
  { id: 2, img: '/images/projects/lat-pro-2.jpg', category: 'Commercial', title: 'Office Partition Walls', tag: 'commercial' },
  { id: 3, img: '/images/projects/lat-pro-3.jpg', category: 'Residential', title: 'Master Bedroom Suite', tag: 'residential' },
  { id: 4, img: '/images/projects/lat-pro-4.jpg', category: 'Commercial', title: 'Corporate Reception', tag: 'commercial' },
  { id: 5, img: '/images/projects/lat-pro-5.jpg', category: 'Residential', title: 'Kitchen Renovation', tag: 'residential' },
  { id: 6, img: '/images/projects/v1-1.jpg', category: 'Residential', title: 'Luxury Apartment', tag: 'residential' },
  { id: 7, img: '/images/projects/v1-2.jpg', category: 'Commercial', title: 'Restaurant Interior', tag: 'commercial' },
  { id: 8, img: '/images/projects/v1-3.jpg', category: 'Industrial', title: 'Factory Renovation', tag: 'industrial' },
  { id: 9, img: '/images/projects/v1-4.jpg', category: 'Residential', title: 'Dining Area Design', tag: 'residential' },
  { id: 10, img: '/images/projects/v1-5.jpg', category: 'Commercial', title: 'Boutique Hotel Lobby', tag: 'commercial' },
  { id: 11, img: '/images/projects/v1-6.jpg', category: 'Residential', title: 'Home Study Room', tag: 'residential' },
  { id: 12, img: '/images/projects/v1-7.jpg', category: 'Industrial', title: 'Warehouse Office', tag: 'industrial' },
]

const filters = ['all', 'residential', 'commercial', 'industrial']

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = activeFilter === 'all'
    ? allProjects
    : allProjects.filter(p => p.tag === activeFilter)

  return (
    <div className="boxed_wrapper">
      <PIALoader />
      <Header />

      <Breadcrumb
        style="style2"
        title="More than 2300 Projects"
        subtitle="Our Projects"
        bgImage="/images/resources/breadcrumb-bg-2.jpg"
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Projects' },
        ]}
      />

      <section className="main-project-area" style={{ padding: '80px 0' }}>
        <div className="container">
          {/* Filter Tabs */}
          <div className="mixitup-filter text-center" style={{ marginBottom: '40px' }}>
            <ul className="filter-btns" style={{ listStyle: 'none', padding: 0, display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
              {filters.map(f => (
                <li key={f}>
                  <button
                    onClick={() => setActiveFilter(f)}
                    className={activeFilter === f ? 'active' : ''}
                    style={{
                      padding: '10px 25px',
                      border: activeFilter === f ? '2px solid #c8a96e' : '2px solid #ddd',
                      background: activeFilter === f ? '#c8a96e' : 'transparent',
                      color: activeFilter === f ? '#fff' : '#555',
                      cursor: 'pointer',
                      borderRadius: '3px',
                      fontSize: '14px',
                      fontWeight: '600',
                      textTransform: 'capitalize',
                      transition: 'all 0.3s',
                    }}
                  >
                    {f === 'all' ? 'All Projects' : f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects Grid */}
          <div className="row">
            {filtered.map((p) => (
              <div key={p.id} className="col-xl-4 col-lg-4 col-md-6 col-sm-12" style={{ marginBottom: '30px' }}>
                <div className="single-project-style1">
                  <div className="img-holder" style={{ position: 'relative', overflow: 'hidden', borderRadius: '4px' }}>
                    <img
                      src={p.img}
                      alt={p.title}
                      style={{ width: '100%', height: '280px', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                    <div className="overlay-content" style={{
                      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                      background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      opacity: 0, transition: 'opacity 0.3s'
                    }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '0'}
                    >
                      <Link className="btn-one" to={`/projects/${p.id}`}>
                        Case Study<span className="flaticon-next"></span>
                      </Link>
                    </div>
                    <div className="title-box" style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                      padding: '20px 15px 15px',
                    }}>
                      <span style={{ color: '#c8a96e', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>{p.category}</span>
                      <h3 style={{ color: '#fff', fontSize: '16px', margin: '5px 0 0' }}>{p.title}</h3>
                    </div>
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
                  <h3>Have a Project in Mind? Let's Discuss It.</h3>
                </div>
                <div className="button float-right">
                  <Link className="btn-one" to="/contact">Contact Us<span className="flaticon-next"></span></Link>
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

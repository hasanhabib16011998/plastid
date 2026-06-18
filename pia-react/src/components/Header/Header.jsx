import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  {
    label: 'Home',
    to: '/',
    dropdown: null,
  },
  {
    label: 'About Us',
    to: '/about',
    dropdown: [
      { label: 'About Company', to: '/about' },
      { label: "FAQ's", to: '/faq' },
    ],
  },
  {
    label: 'Services',
    to: '/services',
    dropdown: [
      { label: 'View All Services', to: '/services' },
      { label: 'Concept Designs', to: '/services/concept-designs' },
      { label: 'Project Designs', to: '/services/project-designs' },
      { label: 'Make Overs', to: '/services/make-overs' },
      { label: 'Consulting', to: '/services/consulting' },
      { label: 'Glass & Wrought', to: '/services/glass-wrought' },
      { label: 'Space Planning', to: '/services/space-planning' },
    ],
  },
  {
    label: 'Projects',
    to: '/projects',
    dropdown: [
      { label: 'All Projects', to: '/projects' },
    ],
  },
  {
    label: 'Contact',
    to: '/contact',
    dropdown: null,
  },
]

export default function Header() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [sticky, setSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/'
    return location.pathname.startsWith(to)
  }

  return (
    <header className={`main-header header-style1${sticky ? ' fixed-header' : ''}`}>
      {/* Upper header - nav */}
      <div className="header-upper-style1">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="inner-container clearfix">
                <div className="logo-box-style1 float-left">
                  <Link to="/">
                    <img src="/images/resources/logo.png" style={{ height: '80px', width: 'auto' }} alt="PIA logo" />
                  </Link>
                </div>
                <div className="main-menu-box float-right">
                  <nav className="main-menu clearfix">
                    <div className="navbar-header clearfix">
                      <button
                        type="button"
                        className="navbar-toggle"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle navigation"
                      >
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                      </button>
                    </div>
                    <div className={`navbar-collapse${mobileOpen ? ' in' : ' collapse'} clearfix`}>
                      <ul className="navigation clearfix">
                        {navItems.map((item) => (
                          <li
                            key={item.to}
                            className={`${item.dropdown ? 'dropdown' : ''}${isActive(item.to) ? ' current' : ''}`}
                          >
                            <Link to={item.to}>{item.label}</Link>
                            {item.dropdown && (
                              <ul>
                                {item.dropdown.map((sub) => (
                                  <li key={sub.to}>
                                    <Link to={sub.to}>{sub.label}</Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lower header - contact info */}
      <div className="header-lower-style1">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="inner-content clearfix">
                <ul className="header-contact-info float-left">
                  <li>
                    <div className="single-item">
                      <div className="icon">
                        <span className="icon-maps-and-location"></span>
                      </div>
                      <div className="text">
                        <h3>Dhaka, Bangladesh</h3>
                        <p>House-11 (2nd Floor), Block-E, Sector-1,<br />Aftab Nagar Main Rd, Dhaka 1212</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="single-item" style={{ textTransform: 'lowercase' }}>
                      <div className="icon">
                        <span className="icon-phone"></span>
                      </div>
                      <div className="text">
                        <h3>+880 1768834417</h3>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="single-item">
                      <div className="icon">
                        <span className="icon-mail"></span>
                      </div>
                      <div className="text">
                        <h3>info@pcd-bd.com</h3>
                        <p>Get a Free Quote</p>
                      </div>
                    </div>
                  </li>
                </ul>
                <ul className="header-social-links-style1 float-right">
                  <li>
                    <a href="https://www.facebook.com/profile.php?id=61555749343330" target="_blank" rel="noreferrer">
                      <i className="fa fa-facebook" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-skype" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-linkedin" aria-hidden="true"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

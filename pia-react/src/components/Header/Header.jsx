import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'

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
  const [sticky, setSticky] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [openDropdowns, setOpenDropdowns] = useState({})
  const drawerRef = useRef(null)

  /* ── Sticky header on scroll ── */
  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /* ── Close drawer on route change ── */
  useEffect(() => {
    closeDrawer()
  }, [location.pathname])

  /* ── Trap focus / close on Escape ── */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') closeDrawer()
    }
    if (drawerOpen) {
      document.addEventListener('keydown', handleKey)
      document.body.classList.add('pia-drawer-open')
    } else {
      document.body.classList.remove('pia-drawer-open')
    }
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.classList.remove('pia-drawer-open')
    }
  }, [drawerOpen])

  const openDrawer = () => setDrawerOpen(true)
  const closeDrawer = () => {
    setDrawerOpen(false)
    setOpenDropdowns({})
  }

  const toggleDropdown = (key) => {
    setOpenDropdowns((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/'
    return location.pathname.startsWith(to)
  }

  return (
    <header className={`main-header header-style1${sticky ? ' fixed-header' : ''}`}>

      {/* ── Upper header: nav bar ── */}
      <div className="header-upper-style1">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="inner-container clearfix">

                {/* Logo */}
                <div className="logo-box-style1 float-left">
                  <Link to="/">
                    <img
                      src="/images/resources/logo.png"
                      style={{ height: '80px', width: 'auto' }}
                      alt="PIA logo"
                    />
                  </Link>
                </div>

                {/* Desktop nav */}
                <div className="main-menu-box float-right">
                  <nav className="main-menu clearfix">
                    <div className={`navbar-collapse clearfix`}>
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

                {/* Mobile hamburger button */}
                <button
                  className={`pia-hamburger${drawerOpen ? ' is-open' : ''}`}
                  onClick={openDrawer}
                  aria-label="Open navigation menu"
                  aria-expanded={drawerOpen}
                  aria-controls="pia-mobile-drawer"
                >
                  <span className="pia-hamburger-box">
                    <span />
                    <span />
                    <span />
                  </span>
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Lower header: contact info ── */}
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

      {/* ════════════════════════════════════════
          MOBILE DRAWER
      ════════════════════════════════════════ */}

      {/* Overlay */}
      <div
        className={`pia-mobile-overlay${drawerOpen ? ' visible' : ''}`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        id="pia-mobile-drawer"
        ref={drawerRef}
        className={`pia-mobile-drawer${drawerOpen ? ' slide-in' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Drawer header */}
        <div className="pia-drawer-header">
          <div className="pia-drawer-logo">
            <Link to="/" onClick={closeDrawer}>
              <img src="/images/resources/logo.png" alt="PIA logo" />
            </Link>
          </div>
          <button
            className="pia-drawer-close"
            onClick={closeDrawer}
            aria-label="Close navigation menu"
          >
            <i className="fa fa-times" aria-hidden="true" />
          </button>
        </div>

        {/* Nav items */}
        <nav className="pia-drawer-nav" aria-label="Mobile navigation">
          <ul>
            {navItems.map((item) => {
              const active = isActive(item.to)
              const isOpen = openDropdowns[item.to]
              return (
                <li
                  key={item.to}
                  className={`${active ? 'current' : ''}${item.dropdown && isOpen ? ' dropdown-open' : ''}`}
                >
                  {item.dropdown ? (
                    /* Item with sub-menu: row with nav link + chevron button */
                    <div className="pia-drawer-item-row">
                      <Link
                        to={item.to}
                        onClick={closeDrawer}
                        className="pia-drawer-item-link"
                      >
                        {item.label}
                      </Link>
                      <button
                        className="pia-drawer-chevron"
                        onClick={() => toggleDropdown(item.to)}
                        aria-expanded={isOpen}
                        aria-label={`Toggle ${item.label} submenu`}
                      >
                        <i className="fa fa-chevron-down" aria-hidden="true" />
                      </button>
                    </div>
                  ) : (
                    <Link to={item.to} onClick={closeDrawer}>
                      {item.label}
                    </Link>
                  )}

                  {item.dropdown && (
                    <ul className={`pia-drawer-submenu${isOpen ? ' open' : ''}`}>
                      {item.dropdown.map((sub) => (
                        <li key={sub.to}>
                          <Link to={sub.to} onClick={closeDrawer}>
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer: contact + social */}
        <div className="pia-drawer-footer">
          <a href="tel:+8801768834417" className="pia-drawer-contact-item">
            <span className="pia-drawer-contact-icon">
              <i className="fa fa-phone" aria-hidden="true" />
            </span>
            +880 1768834417
          </a>
          <a href="mailto:info@pcd-bd.com" className="pia-drawer-contact-item">
            <span className="pia-drawer-contact-icon">
              <i className="fa fa-envelope" aria-hidden="true" />
            </span>
            info@pcd-bd.com
          </a>
          <div className="pia-drawer-social">
            <a
              href="https://www.facebook.com/profile.php?id=61555749343330"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <i className="fa fa-facebook" aria-hidden="true" />
            </a>
            <a href="#" aria-label="Skype">
              <i className="fa fa-skype" aria-hidden="true" />
            </a>
            <a href="#" aria-label="LinkedIn">
              <i className="fa fa-linkedin" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

    </header>
  )
}

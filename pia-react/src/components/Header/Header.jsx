'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
  const pathname = usePathname()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [openDropdowns, setOpenDropdowns] = useState({})
  const drawerRef = useRef(null)

  /* ── Close drawer on route change ── */
  useEffect(() => {
    closeDrawer()
  }, [pathname])

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
    if (to === '/') return pathname === '/'
    return pathname.startsWith(to)
  }

  return (
    <header className="main-header header-style1 fixed-header">
      {/* ── Upper header: Glass Nav Bar Only ── */}
      <div className="header-upper-style1 glass-active">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="inner-container clearfix">

                {/* Logo */}
                <div className="logo-box-style1 float-left">
                  <Link href="/">
                    <img
                      src="/images/resources/logo.png"
                      style={{ height: '70px', width: 'auto' , marginTop: '3px' }}
                      alt="PIA logo"
                    />
                  </Link>
                </div>

                {/* Desktop nav */}
                <div className="main-menu-box float-right">
                  <nav className="main-menu clearfix">
                    <div className="navbar-collapse clearfix">
                      <ul className="navigation clearfix">
                        {navItems.map((item) => (
                          <li
                            key={item.to}
                            className={`${item.dropdown ? 'dropdown' : ''}${isActive(item.to) ? ' current' : ''}`}
                          >
                            <Link href={item.to}>
                              {item.label}
                              {item.dropdown && (
                                <i className="fa fa-angle-down" style={{ fontSize: '11px', marginLeft: '5px', opacity: 0.8 }} />
                              )}
                            </Link>
                            {item.dropdown && (
                              <ul>
                                {item.dropdown.map((sub) => (
                                  <li key={sub.to}>
                                    <Link href={sub.to}>{sub.label}</Link>
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

      {/* Mobile hamburger */}
      <button
        className={`pia-hamburger${drawerOpen ? ' is-open' : ''}`}
        onClick={drawerOpen ? closeDrawer : openDrawer}
        aria-label={drawerOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={drawerOpen}
        aria-controls="pia-mobile-drawer"
      >
        <span className="pia-hamburger-box">
          <span />
          <span />
          <span />
        </span>
      </button>

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
            <Link href="/" onClick={closeDrawer}>
              <img src="/images/resources/logo.png" alt="PIA logo" />
            </Link>
          </div>
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
                    <div className="pia-drawer-item-row">
                      <Link
                        href={item.to}
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
                    <Link href={item.to} onClick={closeDrawer}>
                      {item.label}
                    </Link>
                  )}

                  {item.dropdown && (
                    <ul className={`pia-drawer-submenu${isOpen ? ' open' : ''}`}>
                      {item.dropdown.map((sub) => (
                        <li key={sub.to}>
                          <Link href={sub.to} onClick={closeDrawer}>
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
          <a href="mailto:plastidarchitecture@gmail.com" className="pia-drawer-contact-item">
            <span className="pia-drawer-contact-icon">
              <i className="fa fa-envelope" aria-hidden="true" />
            </span>
            plastidarchitecture@gmail.com
          </a>
          <div className="pia-drawer-social">
            <a
              href="https://www.facebook.com/plastid.interior"
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

'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, ChevronRight, Menu, X, Phone, Mail } from 'lucide-react'
import { serviceTree } from '../../data/servicesData'

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
      { label: 'Testimonials', to: '/testimonials' },
      { label: "FAQ's", to: '/faq' },
    ],
  },
  {
    label: 'Services',
    to: '/services',
    dropdown: [
      { label: 'View All Services', to: '/services' },
      ...serviceTree,
    ],
  },
  {
    label: 'Projects',
    to: '/projects',
    dropdown: [{ label: 'All Projects', to: '/projects' }],
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

  useEffect(() => {
    closeDrawer()
  }, [pathname])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') closeDrawer()
    }
    if (drawerOpen) {
      document.addEventListener('keydown', handleKey)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
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
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-obsidian/85 backdrop-blur-md border-b border-brass/25 transition-all">
      <div className="container-pia">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Company Name */}
          <Link
            href="/"
            className="inline-flex items-center gap-3 no-underline group shrink-0"
            aria-label="Plastid Interior and Architecture"
          >
            <img
              src="/images/resources/logo.png"
              className="h-11 sm:h-12 w-auto object-contain block"
              alt="Plastid Interior and Architecture logo"
            />
            <span className="w-px h-8 bg-brass/45 block" aria-hidden="true" />
            <span className="flex flex-col leading-tight">
              <span className="font-serif text-xl sm:text-2xl font-semibold tracking-[0.06em] text-alabaster group-hover:text-brass transition-colors">
                Plastid
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-brass/90 font-medium">
                Interior and Architecture
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block" aria-label="Main navigation">
            <ul className="flex items-center gap-7 list-none p-0 m-0">
              {navItems.map((item) => {
                const active = isActive(item.to)
                return (
                  <li key={item.to} className="relative group py-6">
                    <Link
                      href={item.to}
                      className={`inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.14em] no-underline transition-colors ${
                        active ? 'text-brass' : 'text-alabaster hover:text-brass'
                      }`}
                    >
                      {item.label}
                      {item.dropdown && (
                        <ChevronDown
                          size={13}
                          className="opacity-80 group-hover:rotate-180 transition-transform duration-200"
                        />
                      )}
                    </Link>

                    {item.dropdown && (
                      <ul className="absolute top-full left-0 min-w-[240px] bg-obsidian/95 backdrop-blur-lg border border-brass/30 rounded-md shadow-2xl py-2 list-none m-0 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 z-50">
                        {item.dropdown.map((sub) => {
                          const hasChildren =
                            Array.isArray(sub.children) && sub.children.length > 0
                          const isSubActive =
                            pathname === sub.to ||
                            (hasChildren &&
                              sub.children.some((child) => pathname === child.to))
                          return (
                            <li
                              key={sub.to}
                              className={`relative ${hasChildren ? 'group/flyout' : ''}`}
                            >
                              <Link
                                href={sub.to}
                                className={`flex items-center justify-between px-4 py-2.5 text-[13px] no-underline transition-colors ${
                                  isSubActive
                                    ? 'text-brass bg-brass/10 font-semibold'
                                    : 'text-alabaster/90 hover:text-brass hover:bg-brass/10'
                                }`}
                              >
                                <span>{sub.label}</span>
                                {hasChildren && (
                                  <ChevronRight size={13} className="text-brass shrink-0" />
                                )}
                              </Link>

                              {hasChildren && (
                                <ul className="absolute top-0 left-full ml-1 min-w-[230px] bg-obsidian/95 backdrop-blur-lg border border-brass/30 rounded-md shadow-2xl py-2 list-none m-0 opacity-0 invisible translate-x-1 group-hover/flyout:opacity-100 group-hover/flyout:visible group-hover/flyout:translate-x-0 transition-all duration-200 z-50">
                                  {sub.children.map((child) => (
                                    <li key={child.to}>
                                      <Link
                                        href={child.to}
                                        className={`block px-4 py-2 text-[12.5px] no-underline transition-colors ${
                                          pathname === child.to
                                            ? 'text-brass bg-brass/10 font-semibold'
                                            : 'text-alabaster/85 hover:text-brass hover:bg-brass/10'
                                        }`}
                                      >
                                        {child.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded border border-brass/45 bg-obsidian/70 text-brass hover:bg-brass hover:text-obsidian transition-colors cursor-pointer"
            onClick={drawerOpen ? closeDrawer : openDrawer}
            aria-label={drawerOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={drawerOpen}
            aria-controls="pia-mobile-drawer"
          >
            {drawerOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-xs z-[1010] transition-opacity duration-300 lg:hidden ${
          drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Mobile Drawer Panel */}
      <div
        id="pia-mobile-drawer"
        ref={drawerRef}
        className={`fixed top-0 right-0 bottom-0 w-[310px] max-w-[85vw] bg-obsidian border-l border-brass/30 z-[1020] flex flex-col justify-between overflow-y-auto transition-transform duration-300 lg:hidden ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div>
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-brass/25">
            <Link
              href="/"
              onClick={closeDrawer}
              className="inline-flex items-center gap-2.5 no-underline"
              aria-label="Plastid Interior and Architecture"
            >
              <img
                src="/images/resources/logo.png"
                className="h-9 w-auto object-contain block"
                alt="Plastid Interior and Architecture logo"
              />
              <span className="w-px h-6 bg-brass/45 block" aria-hidden="true" />
              <span className="flex flex-col leading-tight">
                <span className="font-serif text-lg font-semibold text-alabaster">Plastid</span>
                <span className="text-[8.5px] uppercase tracking-[0.14em] text-brass">
                  Interior &amp; Architecture
                </span>
              </span>
            </Link>
            <button
              type="button"
              onClick={closeDrawer}
              aria-label="Close menu"
              className="w-8 h-8 rounded border border-brass/35 flex items-center justify-center text-brass hover:bg-brass hover:text-obsidian transition-colors cursor-pointer bg-transparent"
            >
              <X size={16} />
            </button>
          </div>

          {/* Drawer Nav Items */}
          <nav className="px-4 py-4" aria-label="Mobile navigation">
            <ul className="list-none p-0 m-0 space-y-1">
              {navItems.map((item) => {
                const active = isActive(item.to)
                const isOpen = !!openDropdowns[item.to]
                return (
                  <li key={item.to} className="border-b border-white/10 pb-1">
                    {item.dropdown ? (
                      <div className="flex items-center justify-between">
                        <Link
                          href={item.to}
                          onClick={closeDrawer}
                          className={`flex-1 py-2.5 px-2 text-xs font-semibold uppercase tracking-[0.14em] no-underline ${
                            active ? 'text-brass' : 'text-alabaster'
                          }`}
                        >
                          {item.label}
                        </Link>
                        <button
                          type="button"
                          onClick={() => toggleDropdown(item.to)}
                          aria-expanded={isOpen}
                          aria-label={`Toggle ${item.label} submenu`}
                          className="p-2 text-brass bg-transparent border-0 cursor-pointer"
                        >
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-200 ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                      </div>
                    ) : (
                      <Link
                        href={item.to}
                        onClick={closeDrawer}
                        className={`block py-2.5 px-2 text-xs font-semibold uppercase tracking-[0.14em] no-underline ${
                          active ? 'text-brass' : 'text-alabaster'
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}

                    {item.dropdown && isOpen && (
                      <ul className="list-none pl-3 pr-1 pb-2 m-0 space-y-1">
                        {item.dropdown.map((sub) => {
                          const hasChildren =
                            Array.isArray(sub.children) && sub.children.length > 0
                          const subOpen = !!openDropdowns[sub.to]
                          return (
                            <li key={sub.to}>
                              {hasChildren ? (
                                <>
                                  <div className="flex items-center justify-between">
                                    <Link
                                      href={sub.to}
                                      onClick={closeDrawer}
                                      className="flex-1 py-1.5 px-2 text-[13px] text-alabaster/85 hover:text-brass no-underline"
                                    >
                                      {sub.label}
                                    </Link>
                                    <button
                                      type="button"
                                      onClick={() => toggleDropdown(sub.to)}
                                      aria-expanded={subOpen}
                                      aria-label={`Toggle ${sub.label} sub-items`}
                                      className="p-1.5 text-brass/80 bg-transparent border-0 cursor-pointer"
                                    >
                                      <ChevronDown
                                        size={14}
                                        className={`transition-transform duration-200 ${
                                          subOpen ? 'rotate-180' : ''
                                        }`}
                                      />
                                    </button>
                                  </div>
                                  {subOpen && (
                                    <ul className="list-none pl-4 m-0 space-y-1 border-l border-brass/25 ml-2">
                                      {sub.children.map((child) => (
                                        <li key={child.to}>
                                          <Link
                                            href={child.to}
                                            onClick={closeDrawer}
                                            className="block py-1 px-2 text-xs text-alabaster/75 hover:text-brass no-underline"
                                          >
                                            {child.label}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </>
                              ) : (
                                <Link
                                  href={sub.to}
                                  onClick={closeDrawer}
                                  className="block py-1.5 px-2 text-[13px] text-alabaster/85 hover:text-brass no-underline"
                                >
                                  {sub.label}
                                </Link>
                              )}
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        {/* Drawer Footer */}
        <div className="px-5 py-5 border-t border-brass/25 bg-white/[0.02] space-y-3">
          <a
            href="tel:+8801768834417"
            className="flex items-center gap-2.5 text-xs text-alabaster/85 hover:text-brass no-underline"
          >
            <Phone size={14} className="text-brass shrink-0" />
            <span>+880 1768834417</span>
          </a>
          <a
            href="mailto:plastidarchitecture@gmail.com"
            className="flex items-center gap-2.5 text-xs text-alabaster/85 hover:text-brass no-underline"
          >
            <Mail size={14} className="text-brass shrink-0" />
            <span>plastidarchitecture@gmail.com</span>
          </a>
          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://www.facebook.com/plastid.interior"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="w-8 h-8 rounded-full border border-brass/40 flex items-center justify-center text-brass hover:bg-brass hover:text-obsidian transition-colors no-underline text-xs"
            >
              <i className="fa fa-facebook" aria-hidden="true" />
            </a>
            <a
              href="https://www.instagram.com/plastid.interior.architecture/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 rounded-full border border-brass/40 flex items-center justify-center text-brass hover:bg-brass hover:text-obsidian transition-colors no-underline text-xs"
            >
              <i className="fa fa-instagram" aria-hidden="true" />
            </a>
            <a
              href="https://www.tiktok.com/@plastid.interiors"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              className="w-8 h-8 rounded-full border border-brass/40 flex items-center justify-center text-brass hover:bg-brass hover:text-obsidian transition-colors no-underline text-xs"
            >
              <i className="fa fa-music" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

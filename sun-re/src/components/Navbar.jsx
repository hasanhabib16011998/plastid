import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import gsap from 'gsap'

const links = [
  { to: '/',         label: 'Home'     },
  { to: '/about',    label: 'About'    },
  { to: '/projects', label: 'Projects' },
  { to: '/services', label: 'Services' },
  { to: '/team',     label: 'Team'     },
  { to: '/contact',  label: 'Contact'  },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const navRef  = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler, { passive: true })
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
    )
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // close menu on route change
  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  return (
    <>
      <nav
        ref={navRef}
        style={{ opacity: 0 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled ? 'bg-[#0a0a09]/95 backdrop-blur-xl shadow-lg' : 'bg-transparent'
        }`}
      >
        <div
          className="border-b transition-all duration-500"
          style={{ borderColor: scrolled ? 'rgba(200,137,26,0.12)' : 'transparent' }}
        >
          <div className="container">
            <div className="flex items-center justify-between h-16 md:h-20">
              {/* Logo */}
              <Link to="/" className="flex flex-col leading-none shrink-0">
                <span className="font-accent gold-text text-xl md:text-2xl font-bold tracking-widest">SUN</span>
                <span className="text-[0.5rem] tracking-[0.5em] uppercase" style={{ color: 'rgba(245,240,232,0.4)' }}>
                  Real Estate
                </span>
              </Link>

              {/* Desktop links */}
              <div className="hidden lg:flex items-center gap-8 xl:gap-10">
                {links.map(l => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className={`nav-link ${location.pathname === l.to ? 'active' : ''}`}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>

              {/* CTA + burger */}
              <div className="flex items-center gap-3 md:gap-4">
                <Link to="/contact" className="btn-solid hidden md:inline-flex text-[0.65rem] py-2.5 px-5">
                  Schedule Visit
                </Link>
                <button
                  onClick={() => setMenuOpen(v => !v)}
                  className="lg:hidden flex items-center justify-center w-9 h-9 border"
                  style={{ borderColor: 'rgba(200,137,26,0.3)', color: 'rgba(245,240,232,0.7)' }}
                  aria-label="Toggle menu"
                >
                  {menuOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile overlay backdrop */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div className={`mobile-menu lg:hidden ${menuOpen ? 'open' : ''}`}>
        <div className="flex items-center justify-between mb-10">
          <Link to="/" className="flex flex-col leading-none">
            <span className="font-accent gold-text text-2xl font-bold tracking-widest">SUN</span>
            <span className="text-[0.5rem] tracking-[0.5em] uppercase" style={{ color: 'rgba(245,240,232,0.35)' }}>
              Real Estate
            </span>
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            className="w-8 h-8 flex items-center justify-center border"
            style={{ borderColor: 'rgba(200,137,26,0.3)', color: 'rgba(245,240,232,0.6)' }}
          >
            <X size={16} />
          </button>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {links.map((l, i) => (
            <Link
              key={l.to}
              to={l.to}
              className="flex items-center gap-4 py-3.5 border-b"
              style={{ borderColor: 'rgba(200,137,26,0.08)' }}
            >
              <span className="font-accent text-[0.55rem] tracking-widest" style={{ color: 'rgba(200,137,26,0.5)' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className={`font-display text-xl font-light transition-colors duration-200 ${
                  location.pathname === l.to ? 'gold-text' : ''
                }`}
                style={{ color: location.pathname === l.to ? undefined : 'rgba(245,240,232,0.75)' }}
              >
                {l.label}
              </span>
            </Link>
          ))}
        </nav>

        <div className="mt-8 pt-6 border-t" style={{ borderColor: 'rgba(200,137,26,0.12)' }}>
          <Link to="/contact" className="btn-solid w-full justify-center">
            Schedule a Visit
          </Link>
          <p className="text-center text-[0.6rem] tracking-widest mt-6" style={{ color: 'rgba(245,240,232,0.25)' }}>
            Dhaka, Bangladesh
          </p>
        </div>
      </div>
    </>
  )
}

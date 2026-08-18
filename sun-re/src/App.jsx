import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage     from './pages/HomePage'
import AboutPage    from './pages/AboutPage'
import ProjectsPage from './pages/ProjectsPage'
import ServicesPage from './pages/ServicesPage'
import TeamPage     from './pages/TeamPage'
import ContactPage  from './pages/ContactPage'

gsap.registerPlugin(ScrollTrigger)

/* Scroll to top on every route change */
function ScrollReset() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    ScrollTrigger.refresh()
  }, [pathname])
  return null
}

/* Scroll-to-top button */
function BackToTop() {
  useEffect(() => {
    const btn = document.getElementById('back-top')
    if (!btn) return
    const handler = () => {
      if (window.scrollY > 500) {
        btn.style.opacity = '1'
        btn.style.transform = 'translateY(0)'
        btn.style.pointerEvents = 'auto'
      } else {
        btn.style.opacity = '0'
        btn.style.transform = 'translateY(16px)'
        btn.style.pointerEvents = 'none'
      }
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <button
      id="back-top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 50,
        width: '2.75rem',
        height: '2.75rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg,var(--gold-mid),var(--gold))',
        border: '1px solid var(--gold)',
        color: '#0f0f0d',
        opacity: 0,
        transform: 'translateY(16px)',
        pointerEvents: 'none',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        boxShadow: '0 4px 20px rgba(200,137,26,0.35)',
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M18 15l-6-6-6 6"/>
      </svg>
    </button>
  )
}

/* Page layout wrapper */
function Layout() {
  return (
    <>
      <div className="grain" />
      <Navbar />
      <main style={{ minHeight: '100vh' }}>
        <Routes>
          <Route path="/"         element={<HomePage />} />
          <Route path="/about"    element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/team"     element={<TeamPage />} />
          <Route path="/contact"  element={<ContactPage />} />
          {/* 404 fallback */}
          <Route path="*" element={
            <div style={{ minHeight:'60vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'1.5rem', paddingTop:'8rem' }}>
              <p className="font-display text-6xl gold-text font-light">404</p>
              <p style={{ color:'rgba(245,240,232,0.5)' }}>Page not found.</p>
              <a href="/" className="btn-outline">Back to Home</a>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollReset />
      <Layout />
    </BrowserRouter>
  )
}

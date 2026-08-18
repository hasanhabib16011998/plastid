import { useState, useEffect } from 'react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div
      className={`scroll-to-top-style2 scroll-to-target${visible ? ' open' : ''}`}
      style={{ display: visible ? 'block' : 'none' }}
      onClick={handleClick}
    >
      <span className="fa fa-angle-up"></span>
    </div>
  )
}

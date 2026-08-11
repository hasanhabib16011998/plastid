import { useState, useEffect } from 'react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const checkVisibility = () => {
      const isLoading =
        document.body.classList.contains('loading-active') ||
        !!document.querySelector('.pia-loader-wrapper') ||
        !!document.querySelector('.preloader')

      let isAptStory = document.body.classList.contains('in-apt-story')
      if (!isAptStory) {
        const aptStoryEl = document.querySelector('.apt-story')
        if (aptStoryEl) {
          const rect = aptStoryEl.getBoundingClientRect()
          isAptStory = rect.top < window.innerHeight && rect.bottom > 0
        }
      }

      setVisible(window.scrollY > 400 && !isLoading && !isAptStory)
    }

    checkVisibility()
    window.addEventListener('scroll', checkVisibility)
    window.addEventListener('resize', checkVisibility)
    window.addEventListener('loadingStateChange', checkVisibility)

    return () => {
      window.removeEventListener('scroll', checkVisibility)
      window.removeEventListener('resize', checkVisibility)
      window.removeEventListener('loadingStateChange', checkVisibility)
    }
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

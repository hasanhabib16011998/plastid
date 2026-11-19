'use client'

import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'

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

  if (!visible) return null

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-obsidian text-brass border border-brass/70 shadow-lg flex items-center justify-center cursor-pointer hover:bg-brass hover:text-obsidian transition-colors"
    >
      <ChevronUp size={20} />
    </button>
  )
}

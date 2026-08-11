import { useEffect, useState } from 'react'

export default function Preloader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    document.body.classList.add('loading-active')
    const timer = setTimeout(() => {
      document.body.classList.remove('loading-active')
      window.dispatchEvent(new Event('loadingStateChange'))
      setVisible(false)
    }, 600)
    return () => {
      document.body.classList.remove('loading-active')
      window.dispatchEvent(new Event('loadingStateChange'))
      clearTimeout(timer)
    }
  }, [])

  if (!visible) return null

  return <div className="preloader"></div>
}

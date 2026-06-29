import { useState, useEffect } from 'react'

export const useScroll = (threshold: number = 50) => {
  const [scrolled, setScrolled] = useState(false)
  const [y, setY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setY(window.scrollY)
      if (window.scrollY > threshold) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return { scrolled, y }
}

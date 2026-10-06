'use client'

import { useEffect, useRef, useState } from 'react'

export function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)
  // null tot de observer voor het eerst heeft gemeten; daarna: stond het element buiten beeld?
  const [startedHidden, setStartedHidden] = useState<boolean | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let first = true
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (first) {
          first = false
          setStartedHidden(!entry.isIntersecting)
        }
        setInView(entry.isIntersecting)
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView, startedHidden }
}

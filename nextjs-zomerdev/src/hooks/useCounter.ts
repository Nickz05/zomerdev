'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Telt van 0 naar `target`, maar alleen als `animate` true is (element kwam later in beeld
 * en de bezoeker heeft geen reduced-motion). De waarde start op `target`, zodat de
 * server-HTML, crawlers en bezoekers zonder JS altijd de juiste eindwaarde zien.
 */
export function useCounter(target: number, duration = 1400, animate = false) {
  const [count, setCount] = useState(target)
  const started = useRef(false)

  useEffect(() => {
    if (!animate || started.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    started.current = true

    let frame = 0
    const start = performance.now()
    setCount(0)
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      started.current = false // StrictMode draait effecten dubbel; laat de 2e run opnieuw starten
    }
  }, [animate, target, duration])

  return count
}

'use client'

import { useEffect } from 'react'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { ThemeProvider } from '@/contexts/ThemeContext'

function HashLinkHandler() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const anchor = (e.target as Element).closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!anchor) return
      const hash = anchor.getAttribute('href')!
      if (hash === '#') return
      const target = document.querySelector(hash)
      if (!target) return
      e.preventDefault()
      target.scrollIntoView({ behavior: 'smooth' })
      history.pushState(null, '', hash)
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])
  return null
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="bg-[var(--paper)] text-navy font-sans">
          <HashLinkHandler />
          {children}
        </div>
      </LanguageProvider>
    </ThemeProvider>
  )
}

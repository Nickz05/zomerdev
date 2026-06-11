import { useEffect } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Diensten from './components/Diensten'
import Marquee from './components/Marquee'
import Over from './components/Over'
import Referenties from './components/Referenties'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import SectionDots from './components/SectionDots'
import { LanguageProvider } from './contexts/LanguageContext'
import { ThemeProvider } from './contexts/ThemeContext'

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
      history.pushState(null, '', window.location.pathname)
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])
  return null
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="bg-[var(--paper)] text-navy font-sans">
          <HashLinkHandler />
          <ScrollProgress />
          <Nav />
          <SectionDots />
          <main>
            <Hero />
            <Diensten />
            <Marquee />
            <Over />
            <Referenties />
            <Contact />
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  )
}

import { useEffect, useRef, useState } from 'react'
import { IconMenu2, IconX, IconSun, IconMoon } from '@tabler/icons-react'
import Button from '../Button'
import logoIcon from '../../../assets/images/logo/logo-transpirant_zomerdev.png'
import logoWhite from '../../../assets/images/logo/Logo_small_zomerdev-wit-trans.png'
import { useLanguage } from '../../contexts/LanguageContext'
import { useTheme } from '../../contexts/ThemeContext'

export default function Nav() {
  const { lang, setLang, t } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const sentinelRef = useRef<HTMLDivElement>(null)

  const links = [
    { label: t.nav.diensten, href: '#diensten' },
    { label: t.nav.over, href: '#over' },
    { label: t.nav.referenties, href: '#referenties' },
    { label: t.nav.contact, href: '#contact' },
  ]

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.3 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <div ref={sentinelRef} className="absolute top-[100vh] h-px w-full pointer-events-none" />

      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-[#0d1b2e]/95 backdrop-blur-[8px] transition-all duration-300 ${
          scrolled ? 'border-b border-[var(--line-soft)] shadow-sm' : ''
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <img src={logoIcon} alt="" aria-hidden className="w-9 h-9 object-contain flex-shrink-0 dark:hidden" />
            <img src={logoWhite} alt="" aria-hidden className="w-9 h-9 object-contain flex-shrink-0 hidden dark:block" />
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-navy text-[15px]">Zomer</span>
              <span className="font-normal text-[var(--text-muted)] text-[15px]">Development</span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-0.5">
            {links.map(({ label, href }) => (
              <NavLink key={href} href={href} active={activeSection === href.replace('#', '')}>{label}</NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3 ml-4">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <LangToggle lang={lang} setLang={setLang} />
            <Button as="a" href="#contact">{t.nav.cta}</Button>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <LangToggle lang={lang} setLang={setLang} />
            <button
              className="p-2 rounded-[var(--radius-sm)] text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy"
              onClick={() => setMenuOpen(true)}
              aria-label={t.nav.menuOpen}
            >
              <IconMenu2 size={22} />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-black/20 md:hidden transition-opacity duration-[250ms] ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-72 bg-[var(--paper)] md:hidden transition-transform duration-[250ms] ease-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-[var(--line)]">
          <span className="font-bold text-navy text-[15px]">{t.nav.menu}</span>
          <button
            className="p-2 text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy rounded-[var(--radius-sm)]"
            onClick={() => setMenuOpen(false)}
            aria-label={t.nav.menuClose}
          >
            <IconX size={20} />
          </button>
        </div>
        <nav className="flex flex-col p-5 gap-1">
          {links.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="py-3 px-2 text-[var(--text-muted)] font-medium hover:text-[var(--text)] border-b border-[var(--line-soft)] last:border-0 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <div className="mt-4">
            <Button as="a" href="#contact" className="w-full justify-center" onClick={() => setMenuOpen(false)}>
              {t.nav.cta}
            </Button>
          </div>
        </nav>
      </div>
    </>
  )
}

function ThemeToggle({ theme, toggleTheme }: { theme: 'light' | 'dark'; toggleTheme: () => void }) {
  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="w-8 h-8 rounded-full flex items-center justify-center border border-[var(--line)] bg-[var(--surface-2)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--line)] transition-all duration-200"
    >
      {theme === 'dark'
        ? <IconSun size={14} stroke={1.8} />
        : <IconMoon size={14} stroke={1.8} />
      }
    </button>
  )
}

function LangToggle({ lang, setLang }: { lang: 'nl' | 'en'; setLang: (l: 'nl' | 'en') => void }) {
  return (
    <div className="relative flex items-center bg-[var(--surface-2)] border border-[var(--line)] rounded-full p-[3px] text-[11px] font-mono font-bold tracking-[0.08em]">
      {/* Sliding pill */}
      <span
        aria-hidden
        className="absolute top-[3px] bottom-[3px] w-[calc(50%-3px)] rounded-full bg-navy shadow-sm transition-transform duration-300 cubic-bezier(0.22,1,0.36,1)"
        style={{ transform: lang === 'en' ? 'translateX(calc(100% + 2px))' : 'translateX(0)' }}
      />
      <button
        onClick={() => setLang('nl')}
        className={`relative z-10 px-3 py-1 rounded-full transition-colors duration-300 ${lang === 'nl' ? 'text-white' : 'text-[var(--text-faint)] hover:text-[var(--text)]'}`}
      >
        NL
      </button>
      <button
        onClick={() => setLang('en')}
        className={`relative z-10 px-3 py-1 rounded-full transition-colors duration-300 ${lang === 'en' ? 'text-white' : 'text-[var(--text-faint)] hover:text-[var(--text)]'}`}
      >
        EN
      </button>
    </div>
  )
}

function NavLink({ href, children, active }: { href: string; children: React.ReactNode; active?: boolean }) {
  return (
    <a
      href={href}
      className="relative px-3 py-2 text-[14px] text-[var(--text-muted)] font-medium hover:text-[var(--text)] transition-colors duration-150 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy rounded-[var(--radius-sm)]"
    >
      {children}
      <span className={`absolute bottom-1 left-3 right-3 h-[2px] bg-gold origin-left transition-transform duration-200 ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
    </a>
  )
}

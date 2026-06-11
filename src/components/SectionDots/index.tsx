import { useEffect, useState } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'

export default function SectionDots() {
  const { t } = useLanguage()
  const [active, setActive] = useState('hero')

  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'diensten', label: t.nav.diensten },
    { id: 'over', label: t.nav.over },
    { id: 'referenties', label: t.nav.referenties },
    { id: 'contact', label: t.nav.contact },
  ]

  useEffect(() => {
    const els = sections.map(s => document.getElementById(s.id)).filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { threshold: 0.4 }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [t])

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3">
      {sections.map(({ id, label }) => {
        const isActive = active === id
        return (
          <a
            key={id}
            href={`#${id}`}
            aria-label={label}
            className="group relative flex items-center justify-end gap-2"
          >
            {/* Tooltip */}
            <span className="absolute right-full mr-3 px-2 py-1 rounded-md bg-navy dark:bg-[var(--surface-2)] text-white dark:text-[var(--text)] text-[10px] font-mono tracking-wide whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none shadow-lg">
              {label}
            </span>
            {/* Dot */}
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: isActive ? '8px' : '5px',
                height: isActive ? '8px' : '5px',
                background: isActive ? 'var(--gold)' : 'var(--text-faint)',
                boxShadow: isActive ? '0 0 8px rgba(251,167,40,0.5)' : 'none',
              }}
            />
          </a>
        )
      })}
    </div>
  )
}

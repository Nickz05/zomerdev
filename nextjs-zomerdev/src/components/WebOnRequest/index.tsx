'use client'

import { IconCode, IconArrowRight } from '@tabler/icons-react'
import { useInView } from '../../hooks/useInView'
import { useLanguage } from '../../contexts/LanguageContext'
import SectionLabel from '../SectionLabel'

export default function WebOnRequest() {
  const { t } = useLanguage()
  const { ref, inView } = useInView(0.2)

  return (
    <section
      id="web-op-aanvraag"
      aria-labelledby="web-op-aanvraag-heading"
      ref={ref as React.RefObject<HTMLElement>}
      className="px-6 pb-[clamp(64px,10vw,112px)] bg-[var(--paper)]"
      style={{
        scrollMarginTop: '64px',
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(20px)',
        transition: 'opacity 600ms cubic-bezier(0.22,1,0.36,1), transform 600ms cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="max-w-4xl flex flex-col md:flex-row md:items-center gap-8 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-8 md:p-10">
          <span className="w-12 h-12 rounded-[10px] bg-navy flex items-center justify-center flex-shrink-0">
            <IconCode size={22} stroke={1.5} aria-hidden className="text-gold" />
          </span>
          <div className="flex-1">
            <SectionLabel>{t.webOnRequest.label}</SectionLabel>
            <h2
              id="web-op-aanvraag-heading"
              className="font-display mt-2 text-[clamp(22px,3vw,30px)] font-bold text-navy tracking-[-0.025em] leading-tight"
            >
              {t.webOnRequest.heading}
            </h2>
            <p className="mt-3 text-[15px] leading-[1.7] text-[var(--text-muted)] max-w-xl">{t.webOnRequest.text}</p>
          </div>
          <a
            href="#contact"
            onClick={() => window.dispatchEvent(new CustomEvent('contact:subject', { detail: 'website' }))}
            className="group inline-flex items-center justify-center gap-2 rounded-[var(--radius-sm)] bg-navy text-white px-5 py-3 text-[14px] font-semibold hover:bg-[var(--navy-700)] transition-colors flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)]"
          >
            {t.webOnRequest.cta}
            <IconArrowRight size={15} aria-hidden className="transition-transform duration-150 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  )
}

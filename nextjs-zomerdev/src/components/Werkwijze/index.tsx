'use client'

import type { CSSProperties } from 'react'
import { useInView } from '../../hooks/useInView'
import { useLanguage } from '../../contexts/LanguageContext'
import SectionLabel from '../SectionLabel'

// Elke trede is hoger dan de vorige; op mobiel worden ze gewoon onder elkaar gestapeld.
const HEIGHTS = ['280px', '330px', '380px', '430px']

export default function Werkwijze() {
  const { t } = useLanguage()
  const { ref, inView } = useInView(0.1)

  const anim = (delay: number) =>
    ({
      opacity: inView ? 1 : 0,
      transform: inView ? 'none' : 'translateY(20px)',
      transition: `opacity 600ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 600ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    }) as CSSProperties

  return (
    <section
      id="werkwijze"
      aria-labelledby="werkwijze-heading"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-[clamp(64px,10vw,112px)] px-6 bg-[var(--surface)]"
      style={{ scrollMarginTop: '64px' }}
    >
      <div className="max-w-6xl mx-auto">
        <div style={anim(0)} className="max-w-2xl mb-14">
          <SectionLabel>{t.werkwijze.label}</SectionLabel>
          <h2
            id="werkwijze-heading"
            className="font-display mt-3 text-[clamp(28px,4vw,44px)] font-bold text-navy tracking-[-0.03em] leading-tight"
          >
            {t.werkwijze.heading1}
            <br />
            <span className="italic text-[#C07800] dark:text-gold">{t.werkwijze.heading2}</span>
          </h2>
        </div>

        <ol className="flex flex-col gap-5 lg:flex-row lg:items-end lg:gap-0">
          {t.werkwijze.steps.map((step, i) => (
            <li
              key={step.title}
              style={{ ...anim(100 + i * 90), '--h': HEIGHTS[i], zIndex: i + 1 } as CSSProperties}
              className="relative lg:flex-1 lg:min-h-[var(--h)] lg:-ml-5 lg:first:ml-0 flex flex-col justify-end rounded-[var(--radius)] border border-[var(--line)] border-t-4 border-t-gold bg-[var(--paper)] p-6 lg:pl-10 lg:first:pl-6 shadow-[0_8px_30px_rgba(15,35,56,0.10)] lg:shadow-[-10px_0_28px_rgba(15,35,56,0.12)]"
            >
              <span className="font-display text-[44px] leading-none font-bold text-gold tracking-[-0.04em]">
                <span className="sr-only">{t.werkwijze.stepLabel} </span>
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 font-display text-[22px] font-bold text-navy tracking-[-0.02em]">{step.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.7] text-[var(--text-muted)]">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

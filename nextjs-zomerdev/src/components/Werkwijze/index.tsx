'use client'

import { IconMessages, IconFileDescription, IconTools, IconHeartHandshake } from '@tabler/icons-react'
import { useInView } from '../../hooks/useInView'
import { useLanguage } from '../../contexts/LanguageContext'
import SectionLabel from '../SectionLabel'

const ICONS = [IconMessages, IconFileDescription, IconTools, IconHeartHandshake]

export default function Werkwijze() {
  const { t } = useLanguage()
  const { ref, inView } = useInView(0.1)

  const anim = (delay: number) =>
    ({
      opacity: inView ? 1 : 0,
      transform: inView ? 'none' : 'translateY(20px)',
      transition: `opacity 600ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 600ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    }) as React.CSSProperties

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

        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.werkwijze.steps.map((step, i) => {
            const Icon = ICONS[i]
            return (
              <li
                key={step.title}
                style={anim(100 + i * 90)}
                className="relative rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper)] p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[12px] tracking-[0.14em] text-[var(--text-muted)]">
                    <span className="sr-only">{t.werkwijze.stepLabel} </span>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="w-10 h-10 rounded-[10px] bg-[var(--gold-soft)] flex items-center justify-center">
                    <Icon size={20} stroke={1.5} aria-hidden className="text-[var(--gold-text)]" />
                  </span>
                </div>
                <h3 className="mt-6 font-display text-[22px] font-bold text-navy tracking-[-0.02em] leading-tight">
                  {step.title}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.7] text-[var(--text-muted)]">{step.text}</p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

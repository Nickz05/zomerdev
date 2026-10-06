'use client'

import { useInView } from '../../hooks/useInView'
import { useLanguage } from '../../contexts/LanguageContext'
import { getPublishedTestimonials } from '../../config/testimonials'
import SectionLabel from '../SectionLabel'

export default function Testimonials() {
  const { t, lang } = useLanguage()
  const { ref, inView } = useInView(0.1)
  const items = getPublishedTestimonials(lang)

  // Geen echte quotes: de sectie bestaat (nog) niet.
  if (items.length === 0) return null

  const anim = (delay: number) =>
    ({
      opacity: inView ? 1 : 0,
      transform: inView ? 'none' : 'translateY(20px)',
      transition: `opacity 600ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 600ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    }) as React.CSSProperties

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-[clamp(64px,10vw,112px)] px-6 bg-[var(--surface)]"
      style={{ scrollMarginTop: '64px' }}
    >
      <div className="max-w-6xl mx-auto">
        <div style={anim(0)} className="max-w-2xl mb-14">
          <SectionLabel>{t.testimonials.label}</SectionLabel>
          <h2
            id="reviews-heading"
            className="font-display mt-3 text-[clamp(28px,4vw,44px)] font-bold text-navy tracking-[-0.03em] leading-tight"
          >
            {t.testimonials.heading1}
            <br />
            <span className="italic text-[#C07800] dark:text-gold">{t.testimonials.heading2}</span>
          </h2>
        </div>

        <div className={`grid gap-5 ${items.length > 1 ? 'md:grid-cols-2' : 'max-w-2xl'}`}>
          {items.map((item, i) => (
            <figure
              key={item.name + i}
              style={anim(100 + i * 90)}
              className="flex flex-col rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper)] p-8"
            >
              <blockquote className="flex-1">
                <p className="font-display text-[20px] italic font-medium leading-[1.5] text-navy tracking-[-0.01em]">
                  <span aria-hidden className="text-gold mr-1">“</span>
                  {item.quote}
                  <span aria-hidden className="text-gold ml-1">”</span>
                </p>
              </blockquote>
              <figcaption className="mt-6 pt-5 border-t border-[var(--line-soft)]">
                <div className="text-[14px] font-semibold text-navy">{item.name}</div>
                {(item.role || item.company) && (
                  <div className="mt-0.5 text-[13px] text-[var(--text-muted)]">
                    {[item.role, item.company].filter(Boolean).join(' · ')}
                  </div>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

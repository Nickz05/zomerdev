'use client'

import Link from 'next/link'
import { IconCheck, IconArrowRight } from '@tabler/icons-react'
import { useInView } from '../../hooks/useInView'
import { useLanguage } from '../../contexts/LanguageContext'
import { PACKAGE_PRICES, type PackageId } from '../../config/pricing'
import SectionLabel from '../SectionLabel'
import MarkedText from '../MarkedText'

const ORDER: PackageId[] = ['basis', 'beheer', 'opmaat']

export default function RemoteIT() {
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
      id="remote-it"
      aria-labelledby="remote-it-heading"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-[clamp(64px,10vw,112px)] px-6 bg-[var(--paper)]"
      style={{ scrollMarginTop: '64px' }}
    >
      <div className="max-w-6xl mx-auto">
        <div style={anim(0)} className="max-w-2xl mb-14">
          <SectionLabel>{t.remoteIt.label}</SectionLabel>
          <h2
            id="remote-it-heading"
            className="font-display mt-3 text-[clamp(28px,4vw,44px)] font-bold text-navy tracking-[-0.03em] leading-tight"
          >
            {t.remoteIt.heading1}
            <br />
            <span className="italic text-[#C07800] dark:text-gold">{t.remoteIt.heading2}</span>
          </h2>
          <p className="mt-5 text-[16px] leading-[1.75] text-[var(--text-muted)]">{t.remoteIt.sub}</p>
        </div>

        <ul className="grid gap-5 md:grid-cols-3 items-stretch">
          {ORDER.map((id, i) => {
            const pkg = t.remoteIt.packages[id]
            const price = PACKAGE_PRICES[id]
            const featured = id === 'beheer'
            return (
              <li key={id} style={anim(100 + i * 90)} className="flex">
                <article
                  className={`flex flex-col w-full rounded-[var(--radius)] border p-8 transition-[box-shadow,border-color] duration-300 ${
                    featured
                      ? 'bg-navy border-navy text-white shadow-[0_8px_40px_rgba(15,35,56,0.18)]'
                      : 'bg-[var(--paper)] border-[var(--line)] hover:border-[var(--navy-600)] hover:shadow-[0_8px_40px_rgba(15,35,56,0.10)]'
                  }`}
                >
                  <h3
                    className={`font-display text-[24px] font-bold tracking-[-0.02em] leading-tight ${
                      featured ? 'text-white' : 'text-navy'
                    }`}
                  >
                    {pkg.name}
                  </h3>
                  <p className={`mt-2 text-[14px] leading-relaxed ${featured ? 'text-white/75' : 'text-[var(--text-muted)]'}`}>
                    {pkg.tagline}
                  </p>

                  <p className="mt-6 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className={`text-[12px] font-mono uppercase tracking-[0.12em] ${featured ? 'text-white/75' : 'text-[var(--text-muted)]'}`}>
                      {t.remoteIt.from}
                    </span>
                    <span
                      className={`font-display text-[32px] font-bold tracking-[-0.03em] leading-none ${
                        featured ? 'text-gold' : 'text-navy'
                      }`}
                    >
                      € <MarkedText text={price.amount} />
                    </span>
                    <span className={`text-[13px] ${featured ? 'text-white/75' : 'text-[var(--text-muted)]'}`}>
                      <MarkedText text={price.unit} />
                    </span>
                  </p>

                  <ul className="mt-7 flex flex-col gap-3 flex-1">
                    {pkg.features.map((f) => (
                      <li key={f} className={`flex gap-3 text-[14px] leading-snug ${featured ? 'text-white/85' : 'text-[var(--text-muted)]'}`}>
                        <IconCheck
                          size={16}
                          stroke={2}
                          aria-hidden
                          className={`mt-0.5 flex-shrink-0 ${featured ? 'text-gold' : 'text-[var(--mint-dot)]'}`}
                        />
                        <span>
                          <MarkedText text={f} />
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    className={`group mt-8 inline-flex items-center justify-center gap-2 rounded-[var(--radius-sm)] px-5 py-3 text-[14px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                      featured
                        ? 'bg-gold text-[#0F2338] hover:bg-[#fdd07a] focus-visible:ring-gold focus-visible:ring-offset-navy'
                        : 'bg-navy text-white hover:bg-[var(--navy-700)] focus-visible:ring-navy focus-visible:ring-offset-[var(--paper)]'
                    }`}
                  >
                    {t.remoteIt.cta}
                    <span className="sr-only"> — {pkg.name}</span>
                    <IconArrowRight size={15} aria-hidden className="transition-transform duration-150 group-hover:translate-x-0.5" />
                  </a>
                </article>
              </li>
            )
          })}
        </ul>

        <p style={anim(420)} className="mt-8 text-[13px] leading-relaxed text-[var(--text-muted)] max-w-2xl">
          {t.remoteIt.note}{' '}
          <Link href="/algemene-voorwaarden/" className="underline underline-offset-2 hover:text-[var(--text)] transition-colors">
            {t.remoteIt.termsLink}
          </Link>
          .
        </p>
      </div>
    </section>
  )
}

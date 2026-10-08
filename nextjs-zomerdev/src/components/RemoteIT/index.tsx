'use client'

import type { CSSProperties } from 'react'
import Link from 'next/link'
import { IconCheck, IconArrowRight } from '@tabler/icons-react'
import { useInView } from '../../hooks/useInView'
import { useLanguage } from '../../contexts/LanguageContext'
import { PACKAGE_PRICES, type PackageId } from '../../config/pricing'
import SectionLabel from '../SectionLabel'

const ORDER: PackageId[] = ['basis', 'opmaat']

const pick = (subject: string) => () => window.dispatchEvent(new CustomEvent('contact:subject', { detail: subject }))

export default function RemoteIT() {
  const { t, lang } = useLanguage()
  const { ref, inView } = useInView(0.1)

  const anim = (delay: number) =>
    ({
      opacity: inView ? 1 : 0,
      transform: inView ? 'none' : 'translateY(20px)',
      transition: `opacity 600ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 600ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    }) as CSSProperties

  return (
    <section
      id="remote-it"
      data-nav-dark
      aria-labelledby="remote-it-heading"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-[clamp(64px,10vw,112px)] px-6 bg-navy border-t border-white/10"
      style={{ scrollMarginTop: '64px' }}
    >
      <div className="max-w-6xl mx-auto">
        <div style={anim(0)} className="max-w-2xl mb-14">
          <SectionLabel light>{t.remoteIt.label}</SectionLabel>
          <h2 id="remote-it-heading" className="font-display mt-3 text-[clamp(28px,4vw,44px)] font-bold text-white tracking-[-0.03em] leading-tight">
            {t.remoteIt.heading1}
            <br />
            <span className="italic text-gold">{t.remoteIt.heading2}</span>
          </h2>
          <p className="mt-5 text-[16px] leading-[1.75] text-white/75">{t.remoteIt.sub}</p>
        </div>

        <ul className="grid gap-5 md:grid-cols-2">
          {ORDER.map((id, i) => {
            const pkg = t.remoteIt.packages[id]
            const price = PACKAGE_PRICES[id]
            return (
              <li key={id} style={anim(100 + i * 90)} className="flex">
                <article className="flex flex-col w-full rounded-[var(--radius)] border border-white/15 bg-white/[0.06] p-7 text-white">
                  <h3 className="font-display text-[26px] font-bold tracking-[-0.025em] leading-tight">{pkg.name}</h3>
                  <p className="mt-1 text-[14px] leading-relaxed text-white/75">{pkg.tagline}</p>

                  <p className="mt-5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    {price ? (
                      <>
                        <span className="text-[12px] font-mono uppercase tracking-[0.12em] text-white/75">{t.remoteIt.from}</span>
                        <span className="font-display text-[32px] font-bold tracking-[-0.03em] leading-none text-gold">€ {price.amount}</span>
                        <span className="text-[13px] text-white/75">{price.unit[lang]}</span>
                      </>
                    ) : (
                      <span className="font-display text-[32px] font-bold tracking-[-0.03em] leading-none text-gold">{t.remoteIt.onRequest}</span>
                    )}
                  </p>

                  <ul className="mt-6 flex flex-col gap-3 flex-1">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex gap-3 text-[14px] leading-snug text-white/85">
                        <IconCheck size={16} stroke={2} aria-hidden className="mt-0.5 flex-shrink-0 text-gold" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    onClick={pick('it')}
                    className="group mt-7 inline-flex items-center justify-center gap-2 self-start rounded-[var(--radius-sm)] bg-gold px-5 py-3 text-[14px] font-semibold text-[#0F2338] transition-colors hover:bg-[#fdd07a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
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

        <div
          style={anim(300)}
          className="mt-5 flex flex-col md:flex-row md:items-center gap-5 rounded-[var(--radius)] border border-gold/60 p-7 text-white"
        >
          <div className="flex-1">
            <SectionLabel light>{t.webOnRequest.label}</SectionLabel>
            <h3 className="mt-1 font-display text-[22px] font-bold tracking-[-0.02em]">{t.webOnRequest.heading}</h3>
            <p className="mt-1 text-[14px] leading-[1.7] text-white/75 max-w-xl">{t.webOnRequest.text}</p>
          </div>
          <a
            href="#contact"
            onClick={pick('website')}
            className="group inline-flex items-center justify-center gap-2 rounded-[var(--radius-sm)] bg-white px-5 py-3 text-[14px] font-semibold text-[#0F2338] transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
          >
            {t.webOnRequest.cta}
            <IconArrowRight size={15} aria-hidden className="transition-transform duration-150 group-hover:translate-x-0.5" />
          </a>
        </div>

        <p style={anim(380)} className="mt-8 text-[13px] leading-relaxed text-white/70 max-w-2xl">
          {t.remoteIt.note}{' '}
          <Link href="/algemene-voorwaarden/" className="underline underline-offset-2 hover:text-white transition-colors">
            {t.remoteIt.termsLink}
          </Link>
          .
        </p>
      </div>
    </section>
  )
}

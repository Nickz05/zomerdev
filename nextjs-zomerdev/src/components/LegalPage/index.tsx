'use client'

import Link from 'next/link'
import { IconArrowLeft } from '@tabler/icons-react'
import Nav from '../Nav'
import Footer from '../Footer'
import MarkedText from '../MarkedText'
import { useLanguage } from '../../contexts/LanguageContext'
import { legal, type LegalKey } from '../../i18n/legal'

export default function LegalPage({ doc }: { doc: LegalKey }) {
  const { lang, t } = useLanguage()
  const d = legal[doc][lang]

  return (
    <>
      <Nav />
      <main className="px-6 pt-28 pb-[clamp(64px,10vw,112px)]">
        <article className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--text-muted)] hover:text-[var(--text)] transition-colors mb-8"
          >
            <IconArrowLeft size={14} aria-hidden />
            {t.legal.back}
          </Link>

          <h1 className="font-display text-[clamp(32px,5vw,48px)] font-bold text-navy tracking-[-0.03em] leading-[1.1]">
            {d.title}
          </h1>
          <p className="mt-3 text-[13px] font-mono text-[var(--text-muted)]">{d.updated}</p>
          <p className="mt-6 text-[16px] leading-[1.75] text-[var(--text-muted)]">
            <MarkedText text={d.intro} />
          </p>

          <div className="mt-12 flex flex-col gap-10">
            {d.blocks.map((b) => (
              <section key={b.heading} aria-labelledby={`h-${b.heading}`}>
                <h2 id={`h-${b.heading}`} className="font-display text-[22px] font-bold text-navy tracking-[-0.02em] leading-snug">
                  {b.heading}
                </h2>
                {b.paragraphs?.map((p) => (
                  <p key={p} className="mt-3 text-[15px] leading-[1.75] text-[var(--text-muted)]">
                    <MarkedText text={p} />
                  </p>
                ))}
                {b.items && (
                  <ul className="mt-3 flex flex-col gap-2.5">
                    {b.items.map((item) => (
                      <li key={item} className="flex gap-3 text-[15px] leading-[1.7] text-[var(--text-muted)]">
                        <span aria-hidden className="mt-[10px] w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                        <span><MarkedText text={item} /></span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}

'use client'

import Link from 'next/link'
import { IconArrowLeft } from '@tabler/icons-react'
import Nav from '../Nav'
import Footer from '../Footer'
import Contact from '../Contact'
import SectionLabel from '../SectionLabel'
import { WHATSAPP_URL } from '../../config/contact'
import { useLanguage } from '../../contexts/LanguageContext'

export default function ContactPage() {
  const { t } = useLanguage()
  const c = t.contactPage
  const ways = [
    { label: c.ways.email, value: 'info@zomerdev.com', href: 'mailto:info@zomerdev.com' },
    { label: c.ways.whatsapp, value: c.ways.whatsappValue, href: WHATSAPP_URL, external: true },
    { label: c.ways.form, value: c.ways.formValue, href: '#contact' },
    { label: c.ways.linkedin, value: 'Nick Zomer', href: 'https://www.linkedin.com/in/zomernick/', external: true },
  ]

  return (
    <>
      <Nav />
      <main className="pt-28">
        <div className="px-6 pb-[clamp(48px,7vw,80px)]">
          <div className="max-w-3xl mx-auto">
            <Link href="/" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--text-muted)] hover:text-[var(--text)] transition-colors mb-8">
              <IconArrowLeft size={14} aria-hidden />
              {t.legal.back}
            </Link>
            <SectionLabel>{t.contact.label}</SectionLabel>
            <h1 className="font-display mt-2 text-[clamp(32px,5vw,48px)] font-bold text-navy tracking-[-0.03em] leading-[1.1]">
              {c.heading1} <span className="italic text-[#C07800] dark:text-gold">{c.heading2}</span>
            </h1>
            <p className="mt-6 text-[16px] leading-[1.78] text-[var(--text-muted)]">{c.intro}</p>

            <section aria-labelledby="contact-ways" className="mt-10">
              <h2 id="contact-ways" className="font-display text-[24px] font-bold text-navy tracking-[-0.02em]">{c.waysHeading}</h2>
              <ul className="mt-4 divide-y divide-[var(--line)] border-y border-[var(--line)]">
                {ways.map((w) => (
                  <li key={w.label} className="flex flex-wrap items-baseline justify-between gap-2 py-3.5">
                    <span className="text-[13px] font-mono uppercase tracking-[0.1em] text-[var(--text-muted)]">{w.label}</span>
                    <a
                      href={w.href}
                      {...(w.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="text-[15px] font-semibold text-navy underline underline-offset-4 hover:no-underline"
                    >
                      {w.value}
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="contact-tips" className="mt-10">
              <h2 id="contact-tips" className="font-display text-[24px] font-bold text-navy tracking-[-0.02em]">{c.tipsHeading}</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {c.tips.map((tip) => (
                  <li key={tip} className="flex gap-3 text-[15px] leading-[1.7] text-[var(--text-muted)]">
                    <span aria-hidden className="mt-[10px] w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[14px] leading-[1.7] text-[var(--text-muted)]">{c.supportNote}</p>
            </section>

            <section aria-labelledby="contact-company" className="mt-10">
              <h2 id="contact-company" className="font-display text-[24px] font-bold text-navy tracking-[-0.02em]">{c.companyHeading}</h2>
              <p className="mt-3 text-[15px] leading-[1.75] text-[var(--text-muted)]">{c.company}</p>
            </section>
          </div>
        </div>

        <Contact />
      </main>
      <Footer />
    </>
  )
}

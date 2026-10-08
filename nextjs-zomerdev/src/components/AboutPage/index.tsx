'use client'

import Link from 'next/link'
import { IconArrowLeft, IconArrowRight, IconArrowUpRight } from '@tabler/icons-react'
import Nav from '../Nav'
import Footer from '../Footer'
import SectionLabel from '../SectionLabel'
import profilePicImg from '@/assets/images/profile-pic.webp'
import { useLanguage } from '../../contexts/LanguageContext'

const profilePic = profilePicImg.src

export default function AboutPage() {
  const { t } = useLanguage()

  return (
    <>
      <Nav />
      <main className="px-6 pt-28 pb-[clamp(64px,10vw,112px)]">
        <article className="max-w-3xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--text-muted)] hover:text-[var(--text)] transition-colors mb-8">
            <IconArrowLeft size={14} aria-hidden />
            {t.legal.back}
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <img
              src={profilePic}
              alt="Nick Zomer"
              width={96}
              height={96}
              className="w-24 h-24 rounded-full object-cover border-2 border-[var(--line)] flex-shrink-0"
              style={{ objectPosition: '50% 18%' }}
            />
            <div>
              <SectionLabel>{t.over.label}</SectionLabel>
              <h1 className="font-display mt-2 text-[clamp(32px,5vw,48px)] font-bold text-navy tracking-[-0.03em] leading-[1.1]">
                {t.over.heading1} <span className="italic text-[#C07800] dark:text-gold">{t.over.heading2}</span>
              </h1>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 text-[16px] leading-[1.78] text-[var(--text-muted)]">
            <p>{t.over.bio1}</p>
            <p>{t.over.bio2}</p>
          </div>

          <section aria-labelledby="about-work" className="mt-12">
            <h2 id="about-work" className="font-display text-[24px] font-bold text-navy tracking-[-0.02em]">{t.aboutPage.workHeading}</h2>
            {[
              { title: t.over.skillWeb, items: t.over.skillWebItems },
              { title: t.over.skillIt, items: t.over.skillItItems },
            ].map((g) => (
              <div key={g.title} className="mt-5">
                <h3 className="text-[13px] font-semibold text-navy">{g.title}</h3>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {g.items.map((i) => (
                    <li key={i} className="text-[12px] font-mono px-2.5 py-1 rounded-sm border border-[var(--line)] bg-[var(--surface)] text-[var(--text-muted)]">{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section aria-labelledby="about-process" className="mt-12">
            <h2 id="about-process" className="font-display text-[24px] font-bold text-navy tracking-[-0.02em]">{t.aboutPage.processHeading}</h2>
            <ol className="mt-5 flex flex-col gap-4">
              {t.werkwijze.steps.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="font-display text-[28px] leading-none font-bold text-gold tracking-[-0.04em] w-10 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="text-[16px] font-semibold text-navy">{s.title}</h3>
                    <p className="mt-1 text-[15px] leading-[1.7] text-[var(--text-muted)]">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="about-clients" className="mt-12">
            <h2 id="about-clients" className="font-display text-[24px] font-bold text-navy tracking-[-0.02em]">{t.aboutPage.clientsHeading}</h2>
            <ul className="mt-5 flex flex-col gap-5">
              {t.referenties.clients.map((c) => (
                <li key={c.name} className="rounded-[var(--radius)] border border-[var(--line)] p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-[17px] font-semibold text-navy">{c.name}</h3>
                    <span className="text-[12px] font-mono text-[var(--text-muted)]">{c.location} · {c.type} · {t.referenties.clientSince} {c.since}</span>
                  </div>
                  <p className="mt-2 text-[15px] leading-[1.7] text-[var(--text-muted)]">{c.description}</p>
                  {c.url && (
                    <a href={c.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-navy underline underline-offset-4">
                      {c.url.replace('https://', '')} <IconArrowUpRight size={13} aria-hidden />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="about-company" className="mt-12">
            <h2 id="about-company" className="font-display text-[24px] font-bold text-navy tracking-[-0.02em]">{t.aboutPage.companyHeading}</h2>
            <p className="mt-3 text-[15px] leading-[1.75] text-[var(--text-muted)]">{t.aboutPage.company}</p>
          </section>

          <div className="mt-12">
            <Link href="/contact/" className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] bg-navy text-white px-5 py-3 text-[14px] font-semibold hover:bg-[var(--navy-700)] transition-colors">
              {t.aboutPage.cta}
              <IconArrowRight size={15} aria-hidden />
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}

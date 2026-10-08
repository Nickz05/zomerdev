'use client'

import { IconBrandLinkedin, IconBrandInstagram, IconBrandTiktok, IconArrowUpRight } from '@tabler/icons-react'
import logoWhiteImg from '@/assets/images/logo/logo-nav-wit.png'
const logoWhite = logoWhiteImg.src
import Link from 'next/link'
import { useLanguage } from '../../contexts/LanguageContext'
import { useAnchor } from '../../hooks/useAnchor'

const socials = [
  { href: 'https://www.linkedin.com/in/zomernick/', label: 'LinkedIn', icon: <IconBrandLinkedin size={15} stroke={1.5} /> },
  { href: 'https://instagram.com/zomerdev', label: 'Instagram', icon: <IconBrandInstagram size={15} stroke={1.5} /> },
  { href: 'https://tiktok.com/@zomerdev', label: 'TikTok', icon: <IconBrandTiktok size={15} stroke={1.5} /> },
]

export default function Footer() {
  const { t } = useLanguage()
  const a = useAnchor()

  return (
    <footer data-nav-dark className="relative bg-[#080f1c] text-white overflow-hidden">
      {/* Top CTA band */}
      <div className="border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/55 mb-3">{t.footer.ctaLabel}</div>
            <h2 className="font-display text-[clamp(26px,4vw,42px)] font-bold tracking-[-0.03em] leading-tight">
              {t.footer.ctaHeading1}<br />
              <span className="italic text-gold">{t.footer.ctaHeading2}</span>
            </h2>
          </div>
          <a
            href={a('#contact')}
            className="group flex-shrink-0 inline-flex items-center gap-2.5 bg-gold text-[#0F2338] font-bold text-[14px] px-7 py-4 rounded-[var(--radius-sm)] hover:bg-[#fdd07a] transition-colors"
          >
            {t.footer.ctaButton}
            <IconArrowUpRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1 flex flex-col gap-5">
          <a href={a('#')} className="flex items-center gap-2.5">
            <img src={logoWhite} alt="Zomer Development" className="w-9 h-9 object-contain flex-shrink-0" />
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-white text-[15px]">Zomer</span>
              <span className="text-white/55 text-[15px]">Development</span>
            </div>
          </a>
          <p className="text-white/55 text-[13px] leading-relaxed max-w-[180px]">
            {t.footer.tagline}
          </p>
          <div className="flex gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-8 h-8 rounded-[6px] border border-white/10 flex items-center justify-center text-white/55 hover:text-white hover:border-white/25 transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Navigatie */}
        <div className="flex flex-col gap-3">
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/55 mb-1">{t.footer.navLabel}</span>
          {t.footer.navLinks.map(({ label, href }) => (
            <a key={href + label} href={a(href)} className="text-white/50 hover:text-white transition-colors text-[13px]">
              {label}
            </a>
          ))}
        </div>

        {/* Diensten */}
        <div className="flex flex-col gap-3">
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/55 mb-1">{t.footer.servicesLabel}</span>
          {t.footer.serviceLinks.map(({ label, href }) => (
            <a key={label} href={a(href)} className="text-white/50 hover:text-white transition-colors text-[13px]">
              {label}
            </a>
          ))}
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-3">
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/55 mb-1">{t.footer.contactLabel}</span>
          <a href="mailto:info@zomerdev.com" className="text-white/50 hover:text-white transition-colors text-[13px]">
            info@zomerdev.com
          </a>
          <span className="text-white/55 text-[13px]">{t.footer.location}</span>
          <a
            href="https://www.linkedin.com/in/zomernick/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 hover:text-white transition-colors text-[13px] inline-flex items-center gap-1.5"
          >
            {t.footer.linkedinLabel}
            <IconArrowUpRight size={11} />
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-4">
          <p className="text-white/55 text-[11px] font-mono tracking-wide">
            {t.footer.copyright}
          </p>
          <nav aria-label={t.footer.legalLabel} className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/about/" className="text-white/60 hover:text-white transition-colors text-[12px]">
              {t.footer.aboutPage}
            </Link>
            <Link href="/contact/" className="text-white/60 hover:text-white transition-colors text-[12px]">
              {t.footer.contactPage}
            </Link>
            <Link href="/privacy/" className="text-white/60 hover:text-white transition-colors text-[12px]">
              {t.footer.privacy}
            </Link>
            <Link href="/algemene-voorwaarden/" className="text-white/60 hover:text-white transition-colors text-[12px]">
              {t.footer.terms}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

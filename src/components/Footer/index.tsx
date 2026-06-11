import { IconBrandLinkedin, IconBrandInstagram, IconBrandTiktok, IconArrowUpRight } from '@tabler/icons-react'
import logoWhite from '../../../assets/images/logo/Logo_small_zomerdev-wit-trans.png'
import { useLanguage } from '../../contexts/LanguageContext'

const socials = [
  { href: 'https://www.linkedin.com/in/zomernick/', label: 'LinkedIn', icon: <IconBrandLinkedin size={15} stroke={1.5} /> },
  { href: 'https://instagram.com/zomerdev', label: 'Instagram', icon: <IconBrandInstagram size={15} stroke={1.5} /> },
  { href: 'https://tiktok.com/@zomerdev', label: 'TikTok', icon: <IconBrandTiktok size={15} stroke={1.5} /> },
]

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="relative bg-[#080f1c] text-white overflow-hidden">
      {/* Top CTA band */}
      <div className="border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/30 mb-3">{t.footer.ctaLabel}</div>
            <h2 className="font-display text-[clamp(26px,4vw,42px)] font-bold tracking-[-0.03em] leading-tight">
              {t.footer.ctaHeading1}<br />
              <span className="italic text-gold">{t.footer.ctaHeading2}</span>
            </h2>
          </div>
          <a
            href="#contact"
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
          <a href="#" className="flex items-center gap-2.5">
            <img src={logoWhite} alt="Zomer Development" className="w-9 h-9 object-contain flex-shrink-0" />
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-white text-[15px]">Zomer</span>
              <span className="text-white/40 text-[15px]">Development</span>
            </div>
          </a>
          <p className="text-white/35 text-[13px] leading-relaxed max-w-[180px]">
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
                className="w-8 h-8 rounded-[6px] border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/25 transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Navigatie */}
        <div className="flex flex-col gap-3">
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/25 mb-1">{t.footer.navLabel}</span>
          {t.footer.navLinks.map(({ label, href }) => (
            <a key={href + label} href={href} className="text-white/50 hover:text-white transition-colors text-[13px]">
              {label}
            </a>
          ))}
        </div>

        {/* Diensten */}
        <div className="flex flex-col gap-3">
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/25 mb-1">{t.footer.servicesLabel}</span>
          {t.footer.serviceLinks.map(({ label, href }) => (
            <a key={label} href={href} className="text-white/50 hover:text-white transition-colors text-[13px]">
              {label}
            </a>
          ))}
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-3">
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/25 mb-1">{t.footer.contactLabel}</span>
          <a href="mailto:info@zomerdev.com" className="text-white/50 hover:text-white transition-colors text-[13px]">
            info@zomerdev.com
          </a>
          <span className="text-white/35 text-[13px]">{t.footer.location}</span>
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
          <p className="text-white/20 text-[11px] font-mono tracking-wide">
            {t.footer.copyright}
          </p>
          <p className="text-white/15 text-[11px] font-mono">
            {t.footer.location}
          </p>
        </div>
      </div>
    </footer>
  )
}

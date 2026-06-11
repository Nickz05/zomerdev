import React, { useEffect, useState } from 'react'
import Button from '../Button'
import BlurImage from '../BlurImage'
import profilePic from '../../../assets/images/profile-pic.jpg'
import contractPic from '../../../assets/images/nick-menno-overeenkomst.jpg'
import { useCounter } from '../../hooks/useCounter'
import { useInView } from '../../hooks/useInView'
import { useLanguage } from '../../contexts/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()
  const [visible, setVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(t)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const step = (delay: number) => ({
    style: {
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(20px)',
      transition: `opacity 650ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 650ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    },
  })

  const { ref: statsRef, inView: statsInView } = useInView()
  const count6 = useCounter(6, 1200, statsInView)
  const count2 = useCounter(2, 900, statsInView)

  return (
    <section
      id="hero"
      className="relative min-h-screen md:h-screen pt-16 grid md:grid-cols-[1.45fr_1fr] overflow-hidden"
      style={{ scrollMarginTop: '64px' }}
    >
      {/* Animated gradient mesh */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full opacity-[0.07] dark:opacity-[0.12]"
          style={{
            background: 'radial-gradient(circle at center, #FBA728 0%, transparent 65%)',
            filter: 'blur(60px)',
            animation: 'mesh-1 14s ease-in-out infinite',
          }}
        />
        <div
          className="absolute top-1/4 -right-24 w-[500px] h-[500px] rounded-full opacity-[0.05] dark:opacity-[0.08]"
          style={{
            background: 'radial-gradient(circle at center, #0F2338 0%, transparent 65%)',
            filter: 'blur(60px)',
            animation: 'mesh-2 18s ease-in-out infinite',
          }}
        />
        <div
          className="absolute -bottom-20 left-1/3 w-[400px] h-[400px] rounded-full opacity-[0.04] dark:opacity-[0.07]"
          style={{
            background: 'radial-gradient(circle at center, #4a9eff 0%, transparent 65%)',
            filter: 'blur(50px)',
            animation: 'mesh-3 22s ease-in-out infinite',
          }}
        />
      </div>

      {/* Dot-grid background texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(15,35,56,0.055) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
          maskImage: 'linear-gradient(to bottom right, rgba(0,0,0,0.5) 0%, transparent 65%)',
          WebkitMaskImage: 'linear-gradient(to bottom right, rgba(0,0,0,0.5) 0%, transparent 65%)',
        }}
      />

      {/* Left: text */}
      <div className="relative flex flex-col justify-center min-h-0 px-6 md:pl-[max(32px,calc((100vw-1152px)/2+32px))] py-20 md:pr-16">

        {/* Personal intro */}
        <div {...step(0)} className="flex items-center gap-3 mb-8">
          <div className="relative flex-shrink-0">
            <img
              src={profilePic}
              alt="Nick Zomer"
              className="w-[52px] h-[52px] rounded-full object-cover border-2 border-[var(--line)] shadow-sm"
              style={{ objectPosition: '50% 18%' }}
            />
          </div>
          <div>
            <div className="text-[14px] font-semibold text-navy leading-tight">Nick Zomer</div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[11px] text-[var(--text-faint)]">{t.hero.role}</span>
              <span className="text-[var(--line)] select-none">·</span>
              <span className="inline-flex items-center gap-1 text-[11px] text-[var(--text-faint)]">
                <svg width="8" height="10" viewBox="0 0 8 10" fill="none" aria-hidden>
                  <path d="M4 0C2.07 0 .5 1.57.5 3.5 .5 6.13 4 10 4 10S7.5 6.13 7.5 3.5C7.5 1.57 5.93 0 4 0zm0 4.75a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill="currentColor"/>
                </svg>
                {t.hero.location}
              </span>
            </div>
          </div>
        </div>

        {/* Headline */}
        <h1
          className="font-display font-bold text-navy leading-[1.04] tracking-[-0.035em] mb-6"
          style={{ fontSize: 'clamp(42px, 6vw, 66px)' }}
        >
          <div className="overflow-hidden">
            <span
              className="block"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : 'translateY(100%)',
                transition: 'opacity 700ms cubic-bezier(0.22,1,0.36,1) 140ms, transform 700ms cubic-bezier(0.22,1,0.36,1) 140ms',
              }}
            >
              {t.hero.line1}
            </span>
          </div>
          <div className="overflow-hidden">
            <span
              className="block italic text-[#C07800] dark:text-gold"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : 'translateY(100%)',
                transition: 'opacity 700ms cubic-bezier(0.22,1,0.36,1) 260ms, transform 700ms cubic-bezier(0.22,1,0.36,1) 260ms',
              }}
            >
              {t.hero.line2}
            </span>
          </div>
        </h1>

        {/* Discipline pills */}
        <div {...step(300)} className="flex items-center gap-3 mb-8">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-navy/60">
            <span className="w-2 h-2 rounded-full bg-navy dark:bg-white/40 shrink-0" />
            {t.hero.discipline1}
          </span>
          <span className="text-[var(--text-muted)] font-light select-none">+</span>
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#854F0B]/70">
            <span className="w-2 h-2 rounded-full bg-gold shrink-0" />
            {t.hero.discipline2}
          </span>
        </div>

        {/* Description */}
        <div {...step(380)}>
          <p className="text-[var(--text-muted)] text-[16px] leading-[1.72] max-w-[400px] mb-9">
            {t.hero.description}
          </p>
        </div>

        {/* CTAs */}
        <div {...step(450)} className="flex flex-wrap gap-3">
          <Button as="a" href="#diensten">{t.hero.cta1}</Button>
          <Button as="a" href="#contact" variant="outline">{t.hero.cta2}</Button>
        </div>

        {/* Stats row */}
        <div
          ref={statsRef as React.RefObject<HTMLDivElement>}
          {...step(520)}
          className="flex items-center gap-6 mt-10 pt-8 border-t border-[var(--line-soft)]"
        >
          <div>
            <div className="font-display font-bold text-navy text-[22px] leading-none tracking-[-0.03em]">{count6}+</div>
            <div className="text-[10px] text-[var(--text-faint)] uppercase tracking-[0.12em] mt-1 font-medium">{t.hero.stat1Label}</div>
          </div>
          <div className="w-px h-7 bg-[var(--line)]" />
          <div>
            <div className="font-display font-bold text-navy text-[22px] leading-none tracking-[-0.03em]">{count2}</div>
            <div className="text-[10px] text-[var(--text-faint)] uppercase tracking-[0.12em] mt-1 font-medium">{t.hero.stat2Label}</div>
          </div>
          <div className="w-px h-7 bg-[var(--line)]" />
          <div>
            <div className="font-display font-bold text-navy text-[22px] leading-none tracking-[-0.03em]">'25</div>
            <div className="text-[10px] text-[var(--text-faint)] uppercase tracking-[0.12em] mt-1 font-medium">{t.hero.stat3Label}</div>
          </div>
        </div>

        {/* Mobile contract photo */}
        <div {...step(650)} className="md:hidden mt-6 rounded-[var(--radius-sm)] overflow-hidden relative">
          <img src={contractPic} alt="MDD overeenkomst" className="w-full h-44 object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-6">
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/45 mb-1.5">{t.hero.photoDateMobile}</span>
            <span className="font-display text-[20px] font-bold italic text-white leading-tight">{t.hero.photoCaption}</span>
          </div>
        </div>
      </div>

      {/* Right: full-height contract photo */}
      <div
        className="hidden md:flex flex-col relative border-l border-[var(--line-soft)] overflow-hidden min-h-0"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateX(24px)',
          transition: 'opacity 750ms cubic-bezier(0.22,1,0.36,1) 520ms, transform 750ms cubic-bezier(0.22,1,0.36,1) 520ms',
        }}
      >
        <BlurImage
          src={contractPic}
          alt="Nick Zomer - MDD overeenkomst"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ objectPosition: '50% 30%', transform: `translateY(${scrollY * 0.15}px)`, willChange: 'transform' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-navy/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/30 to-transparent" />

        <div className="relative z-10 flex flex-col h-full p-8">
          <div className="flex items-center gap-3">
            <img
              src={profilePic}
              alt="Nick Zomer"
              className="w-11 h-11 rounded-full object-cover border-2 border-white/30 shadow-lg flex-shrink-0"
              style={{ objectPosition: '50% 18%' }}
            />
            <div>
              <div className="text-white text-[13px] font-semibold leading-tight">Nick Zomer</div>
              <div className="text-white/50 text-[11px] font-mono tracking-wide mt-0.5">{t.hero.founder}</div>
            </div>
          </div>

          <div className="flex-1" />

          <div>
            <span className="font-mono text-[9px] tracking-[0.22em] uppercase text-white/40 block mb-3">
              {t.hero.photoDate}
            </span>
            <span className="font-display text-[32px] font-bold italic text-white leading-[1.1] tracking-[-0.025em] block">
              {t.hero.photoCaption.split('\n').map((line, i) => <span key={i} className="block">{line}</span>)}
            </span>
            <p className="text-white/45 text-[13px] leading-relaxed mt-3 max-w-[220px]">
              {t.hero.photoCaptionSub}
            </p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{ opacity: visible ? 1 : 0, transition: 'opacity 800ms ease 1200ms' }}
        className="absolute bottom-7 left-[max(32px,calc((100vw-1152px)/2+32px))] hidden md:flex flex-col items-center gap-1.5 pointer-events-none"
      >
        <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-[var(--text-faint)]">Scroll</span>
        <div className="w-px h-7 bg-gradient-to-b from-[var(--text-faint)] to-transparent" />
      </div>
    </section>
  )
}

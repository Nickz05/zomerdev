import { useRef, useState } from 'react'
import { useInView } from '../../hooks/useInView'
import SectionLabel from '../SectionLabel'
import BlurImage from '../BlurImage'
import contractPic from '../../../assets/images/nick-menno-overeenkomst.jpg'
import hertenhuisjePic from '../../../assets/images/hertenhuisje.png'
import profilePic from '../../../assets/images/profile-pic.jpg'
import { useLanguage } from '../../contexts/LanguageContext'

const typeColors: Record<string, string> = {
  'Web Development': 'text-navy bg-[var(--surface-2)] border-[var(--line)]',
  'IT Support + Web': 'text-[#854F0B] bg-[#FDF3E2] border-[#e8c06a]/60',
}

const photos: Record<string, string> = {
  '01': hertenhuisjePic,
  '02': contractPic,
}

export default function Referenties() {
  const { t } = useLanguage()
  const { ref: sectionRef, inView } = useInView()

  const anim = (delay: number) => ({
    style: {
      opacity: inView ? 1 : 0,
      transform: inView ? 'none' : 'translateY(20px)',
      transition: `opacity 600ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 600ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    } as React.CSSProperties,
  })

  return (
    <section
      id="referenties"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-[clamp(64px,10vw,112px)] px-6 bg-[var(--paper)]"
      style={{ scrollMarginTop: '64px' }}
    >
      <div className="max-w-6xl mx-auto">

        <div {...anim(0)} className="mb-14">
          <SectionLabel>{t.referenties.label}</SectionLabel>
          <h2 className="font-display mt-3 text-[clamp(28px,4vw,44px)] font-bold text-navy tracking-[-0.03em] leading-tight">
            {t.referenties.heading1}<br />
            <span className="italic text-[#C07800] dark:text-gold">{t.referenties.heading2}</span>
          </h2>
        </div>

        <div className="flex flex-col gap-5">
          {t.referenties.clients.map((c) => (
            <ClientCard
              key={c.index}
              client={c}
              photo={photos[c.index]}
              typeColor={typeColors[c.type] ?? 'text-navy bg-[var(--surface-2)] border-[var(--line)]'}
              clientSinceLabel={t.referenties.clientSince}
            />
          ))}
        </div>

        <div {...anim(380)} className="mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-5 pt-10 border-t border-[var(--line-soft)]">
          <div className="flex items-center gap-3">
            <img
              src={profilePic}
              alt="Nick Zomer"
              className="w-12 h-12 rounded-full object-cover border-2 border-[var(--line)] flex-shrink-0"
              style={{ objectPosition: '50% 18%' }}
            />
            <div>
              <div className="text-[13px] font-semibold text-navy">{t.referenties.nextLabel}</div>
              <div className="text-[12px] text-[var(--text-faint)] mt-0.5">{t.referenties.nextSub}</div>
            </div>
          </div>
          <a
            href="#contact"
            className="sm:ml-auto inline-flex items-center gap-2 bg-navy text-white text-[13px] font-semibold px-5 py-2.5 rounded-[var(--radius-sm)] hover:bg-[var(--navy-700)] transition-colors"
          >
            {t.referenties.cta}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M3 7h8M7.5 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

      </div>
    </section>
  )
}

type Client = (typeof import('../../i18n/translations').default)['nl']['referenties']['clients'][0]

function ClientCard({
  client: c,
  photo,
  typeColor,
  clientSinceLabel,
}: {
  client: Client
  photo: string
  typeColor: string
  clientSinceLabel: string
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const { ref: inViewRef, inView } = useInView()

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: y * 4, y: -x * 4 })
  }

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 })

  const isTilting = tilt.x !== 0 || tilt.y !== 0
  const translateY = inView ? 0 : 20

  return (
    <div
      ref={(el) => {
        (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = el
        ;(inViewRef as React.MutableRefObject<HTMLElement | null>).current = el
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group grid md:grid-cols-[2fr_3fr] rounded-[var(--radius)] overflow-hidden border border-[var(--line)] hover:border-[var(--navy-600)] hover:shadow-[0_8px_40px_rgba(15,35,56,0.12)] transition-[border-color,box-shadow] duration-300"
      style={{
        opacity: inView ? 1 : 0,
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${translateY}px)`,
        transition: isTilting
          ? 'transform 80ms linear, opacity 600ms cubic-bezier(0.22,1,0.36,1), border-color 300ms, box-shadow 300ms'
          : 'transform 600ms cubic-bezier(0.22,1,0.36,1), opacity 600ms cubic-bezier(0.22,1,0.36,1), border-color 300ms, box-shadow 300ms',
        willChange: 'transform, opacity',
      }}
    >
      {/* Visual panel */}
      <div className="relative min-h-[220px] md:min-h-[280px] overflow-hidden">
        <BlurImage
          src={photo}
          alt={c.name}
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-navy/10" />

        <div className="absolute top-5 left-5">
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/50">{c.index}</span>
        </div>

        <div className="absolute bottom-5 left-5">
          <p className="font-mono text-[9px] tracking-[0.18em] uppercase text-white/40">{clientSinceLabel}</p>
          <p className="font-mono text-[12px] tracking-wide text-white/80">{c.since}</p>
        </div>
      </div>

      {/* Info panel */}
      <div className="bg-[var(--paper)] p-8 flex flex-col gap-6">

        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display font-bold text-navy text-[24px] tracking-[-0.02em] leading-tight">
              {c.name}
            </h3>
            <p className="text-[var(--text-faint)] text-[12px] font-mono tracking-[0.12em] uppercase mt-1">
              {c.location}
            </p>
          </div>
          <span className={`text-[11px] font-semibold px-3 py-1 rounded-full border flex-shrink-0 mt-1 ${typeColor}`}>
            {c.type}
          </span>
        </div>

        <div>
          <h4 className="font-display text-[20px] font-bold text-navy tracking-[-0.02em] leading-snug italic">
            {c.headline.split('\n').map((line, i) => <span key={i} className="block">{line}</span>)}
          </h4>
        </div>

        <p className="text-[var(--text-muted)] text-[14px] leading-[1.75]">
          {c.description}
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
          {c.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2 text-[13px] text-[var(--text-muted)]">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className="flex-shrink-0 text-[var(--mint-dot)]">
                <path d="M2 6l2.5 2.5L10 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {h}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[var(--line-soft)]">
          <div className="flex flex-wrap gap-1.5">
            {c.tags.map((tag) => (
              <span key={tag} className="text-[11px] font-mono text-[var(--text-faint)] border border-[var(--line)] px-2.5 py-0.5 rounded-sm bg-[var(--surface)]">
                {tag}
              </span>
            ))}
          </div>
          {c.url && (
            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[var(--text-muted)] hover:text-navy transition-colors group flex-shrink-0"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className="flex-shrink-0">
                <path d="M5 2H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V7M7.5 1H11m0 0v3.5M11 1 5.5 6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {c.url.replace('https://', '')}
            </a>
          )}
        </div>

      </div>
    </div>
  )
}

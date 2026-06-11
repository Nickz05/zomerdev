import { IconCode, IconServer2 } from '@tabler/icons-react'
import { useInView } from '../../hooks/useInView'
import SectionLabel from '../SectionLabel'
import { useLanguage } from '../../contexts/LanguageContext'

export default function Diensten() {
  const { t } = useLanguage()
  const { ref: headerRef, inView: headerIn } = useInView()
  const { ref: panelRef, inView: panelIn } = useInView()

  const fade = (delay: number) => ({
    style: {
      opacity: headerIn ? 1 : 0,
      transform: headerIn ? 'none' : 'translateY(12px)',
      transition: `opacity 550ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 550ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    } as React.CSSProperties,
  })

  return (
    <section
      id="diensten"
      className="relative"
      style={{ scrollMarginTop: '64px' }}
    >
      <div
        ref={headerRef as React.RefObject<HTMLDivElement>}
        className="px-6 pt-[clamp(48px,8vw,88px)] pb-12 text-center"
      >
        <div {...fade(0)}>
          <SectionLabel>{t.diensten.label}</SectionLabel>
        </div>
        <h2
          {...fade(80)}
          className="font-display mt-3 text-[clamp(30px,4.5vw,48px)] font-bold text-navy tracking-[-0.03em] leading-[1.1]"
        >
          {t.diensten.heading1}<br />
          <span className="italic font-bold">{t.diensten.heading2italic}</span> {t.diensten.heading2rest}
        </h2>
      </div>

      <div
        ref={panelRef as React.RefObject<HTMLDivElement>}
        className="grid md:grid-cols-2"
        style={{
          opacity: panelIn ? 1 : 0,
          transform: panelIn ? 'none' : 'translateY(24px)',
          transition: 'opacity 600ms cubic-bezier(0.22,1,0.36,1) 100ms, transform 600ms cubic-bezier(0.22,1,0.36,1) 100ms',
        }}
      >
        {/* Web Development — navy */}
        <div className="bg-navy px-[clamp(32px,5vw,72px)] py-[clamp(40px,5vw,72px)] flex flex-col justify-between relative overflow-hidden min-h-[400px]">
          <span
            aria-hidden
            className="pointer-events-none select-none absolute -bottom-6 -right-4 font-display text-[160px] font-bold leading-none text-white/[0.04]"
          >
            01
          </span>
          <div>
            <div className="w-11 h-11 rounded-[10px] bg-white/10 flex items-center justify-center mb-8">
              <IconCode size={20} stroke={1.5} className="text-gold" />
            </div>
            <h3 className="font-display text-[clamp(22px,2.8vw,32px)] font-bold text-white mb-4 leading-tight tracking-[-0.025em]">
              {t.diensten.webTitle}
            </h3>
            <p className="text-white/55 text-[15px] leading-[1.75] max-w-[340px]">
              {t.diensten.webDesc}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mt-10">
            {t.diensten.webTags.map(tag => (
              <span key={tag} className="text-[12px] font-medium px-3 py-1 rounded-full bg-white/10 text-white/60">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* IT Support — warm */}
        <div className="bg-[#FDF3E2] dark:bg-[var(--surface-2)] px-[clamp(32px,5vw,72px)] py-[clamp(40px,5vw,72px)] flex flex-col justify-between relative overflow-hidden min-h-[400px] border-t md:border-t-0 md:border-l border-[#f0d090] dark:border-[var(--line)]">
          <span
            aria-hidden
            className="pointer-events-none select-none absolute -bottom-6 -right-4 font-display text-[160px] font-bold leading-none text-[#FBA728]/[0.09]"
          >
            02
          </span>
          <div>
            <div className="w-11 h-11 rounded-[10px] bg-[#FBA728]/20 flex items-center justify-center mb-8">
              <IconServer2 size={20} stroke={1.5} className="text-[#854F0B]" />
            </div>
            <h3 className="font-display text-[clamp(22px,2.8vw,32px)] font-bold text-[#152340] dark:text-[var(--text)] mb-4 leading-tight tracking-[-0.025em]">
              {t.diensten.itTitle}
            </h3>
            <p className="text-[#854F0B]/70 dark:text-[var(--text-muted)] text-[15px] leading-[1.75] max-w-[340px]">
              {t.diensten.itDesc}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mt-10">
            {t.diensten.itTags.map(tag => (
              <span key={tag} className="text-[12px] font-medium px-3 py-1 rounded-full bg-[#FBA728]/15 dark:bg-[var(--line)] text-[#854F0B] dark:text-[var(--text-muted)]">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

import { IconArrowRight, IconBrandLinkedin } from '@tabler/icons-react'
import { useInView } from '../../hooks/useInView'
import SectionLabel from '../SectionLabel'
import BlurImage from '../BlurImage'
import WordReveal from '../WordReveal'
import contractPic from '../../../assets/images/nick-menno-overeenkomst.jpg'
import profilePic from '../../../assets/images/profile-pic.jpg'
import { useLanguage } from '../../contexts/LanguageContext'

export default function Over() {
  const { t } = useLanguage()
  const { ref: sectionRef, inView } = useInView()

  const skills = {
    web: {
      label: t.over.skillWeb,
      color: 'text-navy',
      bg: 'bg-[var(--surface-2)]',
      border: 'border-[var(--line)]',
      dot: 'bg-navy dark:bg-white/40',
      items: t.over.skillWebItems,
    },
    it: {
      label: t.over.skillIt,
      color: 'text-[#854F0B]',
      bg: 'bg-[#FDF3E2]',
      border: 'border-[#e8c06a]/50',
      dot: 'bg-gold',
      items: t.over.skillItItems,
    },
  }

  const anim = (delay: number) => ({
    style: {
      opacity: inView ? 1 : 0,
      transform: inView ? 'none' : 'translateY(16px)',
      transition: `opacity 600ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 600ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    } as React.CSSProperties,
  })

  return (
    <section
      id="over"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-[clamp(64px,10vw,112px)] px-6 bg-[var(--surface)] dark:bg-[var(--surface)]"
      style={{ scrollMarginTop: '64px' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[5fr_7fr] gap-10 md:gap-16 items-start">

          {/* Left: photo */}
          <div {...anim(0)} className="md:sticky md:top-24">
            <div className="relative">
              <div className="relative rounded-[var(--radius)] overflow-hidden bg-navy aspect-[3/4]">
                <BlurImage
                  src={contractPic}
                  alt="Nick Zomer - MDD overeenkomst"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: '50% 30%' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="font-display text-white text-[20px] font-bold tracking-[-0.02em]">Nick Zomer</div>
                  <div className="text-white/50 text-[11px] font-mono tracking-[0.15em] uppercase mt-1">{t.over.badge}</div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full overflow-hidden shadow-xl border-4 border-white">
                <img
                  src={profilePic}
                  alt="Nick Zomer"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: '50% 18%' }}
                />
              </div>
            </div>

            <div {...anim(80)} className="mt-8 grid grid-cols-2 gap-3">
              {t.over.facts.map((f) => (
                <div key={f.label} className="bg-[var(--paper)] rounded-[var(--radius-sm)] border border-[var(--line)] px-4 py-3">
                  <div className="text-[10px] font-mono text-[var(--text-faint)] tracking-[0.12em] uppercase mb-1">{f.label}</div>
                  <div className="text-[15px] font-bold text-navy font-display tracking-[-0.01em]">{f.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: content */}
          <div className="flex flex-col gap-8">

            <div {...anim(60)}>
              <SectionLabel>{t.over.label}</SectionLabel>
              <h2 className="font-display mt-3 text-[clamp(30px,4vw,46px)] font-bold text-navy tracking-[-0.03em] leading-[1.1]">
                {t.over.heading1}<br />
                <span className="italic text-[#C07800] dark:text-gold">{t.over.heading2}</span>
              </h2>
              <div className="mt-5 flex gap-1.5">
                <div className="h-1 w-10 rounded-full bg-navy dark:bg-white/30" />
                <div className="h-1 w-3.5 rounded-full bg-gold" />
              </div>
            </div>

            <div {...anim(140)} className="flex flex-col gap-4">
              <WordReveal className="text-[var(--text-muted)] text-[16px] leading-[1.78]" delay={0}>{t.over.bio1}</WordReveal>
              <WordReveal className="text-[var(--text-muted)] text-[16px] leading-[1.78]" delay={100}>{t.over.bio2}</WordReveal>
            </div>

            <div {...anim(220)} className="flex flex-col gap-4">
              <div className="text-[11px] font-mono text-[var(--text-faint)] tracking-[0.14em] uppercase">{t.over.skillsLabel}</div>
              <div className="flex flex-col gap-3">
                {Object.values(skills).map((cluster) => (
                  <div key={cluster.label} className={`rounded-[var(--radius-sm)] border p-4 ${cluster.bg} ${cluster.border}`}>
                    <div className={`flex items-center gap-2 text-[11px] font-semibold mb-3 ${cluster.color}`}>
                      <span className={`w-2 h-2 rounded-full ${cluster.dot}`} />
                      {cluster.label}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cluster.items.map((item) => (
                        <span
                          key={item}
                          className={`text-[12px] font-mono px-2.5 py-0.5 rounded-sm border ${cluster.bg} ${cluster.border} ${cluster.color} opacity-80`}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div {...anim(300)} className="flex flex-wrap items-center gap-4 pt-4 border-t border-[var(--line-soft)]">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-navy text-white text-[13px] font-semibold px-5 py-2.5 rounded-[var(--radius-sm)] hover:bg-[var(--navy-700)] transition-colors"
              >
                {t.over.ctaPrimary}
                <IconArrowRight size={14} />
              </a>
              <a
                href="https://nickzomer.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[var(--text-muted)] font-medium text-[13px] hover:text-navy transition-colors group"
              >
                {t.over.ctaPortfolio}
                <IconArrowRight size={14} className="transition-transform duration-150 group-hover:translate-x-0.5" />
              </a>
              <a
                href="https://www.linkedin.com/in/zomernick/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[var(--text-muted)] font-medium text-[13px] hover:text-navy transition-colors group"
              >
                <IconBrandLinkedin size={15} stroke={1.5} />
                LinkedIn
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

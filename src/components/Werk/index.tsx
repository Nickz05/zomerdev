import { useInView } from '../../hooks/useInView'
import SectionLabel from '../SectionLabel'
import DisciplinePill from '../DisciplinePill'

export default function Werk() {
  const { ref: sectionRef, inView } = useInView()

  const anim = (delay: number) => ({
    style: {
      opacity: inView ? 1 : 0,
      transform: inView ? 'none' : 'translateY(16px)',
      transition: `opacity 550ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 550ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    } as React.CSSProperties,
  })

  return (
    <section
      id="werk"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-[clamp(48px,8vw,88px)] px-6 bg-[var(--surface)]"
      style={{ scrollMarginTop: '64px' }}
    >
      <div className="max-w-6xl mx-auto">
        <div {...anim(0)} className="mb-12">
          <SectionLabel>GESELECTEERD WERK</SectionLabel>
          <h2 className="font-display mt-3 text-[clamp(26px,3.5vw,38px)] font-bold text-navy tracking-[-0.025em] leading-tight">
            Klanten waar ik<br />
            <span className="italic">trots op ben.</span>
          </h2>
        </div>

        <div className="flex flex-col gap-px">
          <WorkRow
            index="01"
            title="'t Hertenhuisje"
            location="Wassenaar"
            description="Volledige website-ontwikkeling en doorlopend beheer."
            discipline="web"
            animProps={anim(80)}
          />
          <WorkRow
            index="02"
            title="mdd b.v."
            location="Den Haag"
            description="Associate IT- en development-partner voor een art consultancy."
            discipline="it"
            animProps={anim(160)}
          />
        </div>
      </div>
    </section>
  )
}

interface WorkRowProps {
  index: string
  title: string
  location: string
  description: string
  discipline: 'web' | 'it'
  animProps: { style: React.CSSProperties }
}

function WorkRow({ index, title, location, description, discipline, animProps }: WorkRowProps) {
  return (
    <div
      {...animProps}
      className="group bg-white border border-[var(--line)] rounded-[var(--radius)] px-6 py-5 grid grid-cols-[2rem_1fr_auto] md:grid-cols-[2rem_1fr_1fr_auto] gap-x-5 gap-y-1 items-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card hover:border-[var(--navy-600)]"
      style={{ ...animProps.style, willChange: 'transform' }}
    >
      <span className="font-mono text-[11px] text-[var(--text-faint)] row-span-2 md:row-span-1 self-center">
        {index}
      </span>
      <h3 className="font-display font-bold text-navy text-[17px] leading-tight tracking-[-0.015em]">
        {title}
      </h3>
      <p className="hidden md:block text-[var(--text-muted)] text-[14px] leading-relaxed col-start-3">
        {description}
      </p>
      <div className="row-start-2 col-start-2 md:row-start-1 md:col-start-4 flex items-center justify-start md:justify-end gap-2 flex-wrap">
        <span className="text-[var(--text-faint)] text-[12px] hidden md:block">{location}</span>
        <DisciplinePill type={discipline} size="sm" />
      </div>
      <p className="md:hidden col-start-2 text-[var(--text-muted)] text-[13px] leading-relaxed row-start-3">
        {description}
      </p>
    </div>
  )
}

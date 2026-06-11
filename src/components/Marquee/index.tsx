import { useLanguage } from '../../contexts/LanguageContext'

export default function Marquee() {
  const { t } = useLanguage()
  const repeated = [...t.marquee, ...t.marquee, ...t.marquee]

  return (
    <div className="overflow-hidden bg-navy py-3.5 select-none border-y border-white/5">
      <div
        className="flex gap-0 whitespace-nowrap"
        style={{ animation: 'marquee 28s linear infinite' }}
      >
        {repeated.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 text-[11px] font-mono tracking-[0.18em] uppercase text-white/40 px-6">
            {item}
            <span className="w-1 h-1 rounded-full bg-gold/60 flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  )
}

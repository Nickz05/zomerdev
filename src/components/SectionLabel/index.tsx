interface SectionLabelProps {
  children: React.ReactNode
  light?: boolean
}

export default function SectionLabel({ children, light = false }: SectionLabelProps) {
  return (
    <span
      className={`font-mono text-xs tracking-[0.15em] uppercase ${
        light ? 'text-gold' : 'text-text-faint'
      }`}
    >
      {children}
    </span>
  )
}

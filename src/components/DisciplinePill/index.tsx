type Discipline = 'web' | 'it'

interface Props {
  type: Discipline
  size?: 'sm' | 'md'
}

export default function DisciplinePill({ type, size = 'md' }: Props) {
  const isWeb = type === 'web'
  const label = isWeb ? 'Web Development' : 'IT Support & Advies'

  const colors = isWeb
    ? 'bg-[#EFF4FF] text-[#1B4FD8] border-[#C7D7FD]'
    : 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]'

  const dot = isWeb ? 'bg-[#1B4FD8]' : 'bg-[#B45309]'

  const textSize = size === 'sm' ? 'text-[12px]' : 'text-[13px]'

  return (
    <span
      className={`inline-flex items-center gap-1.5 border rounded-full font-medium px-3 py-1 ${colors} ${textSize}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dot}`} />
      {label}
    </span>
  )
}

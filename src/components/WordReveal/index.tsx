import { useInView } from '../../hooks/useInView'

interface WordRevealProps {
  children: string
  className?: string
  delay?: number
}

export default function WordReveal({ children, className = '', delay = 0 }: WordRevealProps) {
  const { ref, inView } = useInView()
  const words = children.split(' ')

  return (
    <p ref={ref as React.RefObject<HTMLParagraphElement>} className={className} aria-label={children}>
      {words.map((word, i) => {
        const wordDelay = delay + i * 35
        return (
          <span
            key={i}
            aria-hidden
            className="inline-block"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'none' : 'translateY(10px)',
              transition: `opacity 500ms cubic-bezier(0.22,1,0.36,1) ${wordDelay}ms, transform 500ms cubic-bezier(0.22,1,0.36,1) ${wordDelay}ms`,
            }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </span>
        )
      })}
    </p>
  )
}

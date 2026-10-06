const PLACEHOLDER = /(\[\[.+?\]\]|info@zomerdev\.com)/g

/**
 * Rendert tekst waarin [[placeholders]] geel worden gemarkeerd (zodat ze niet over het hoofd
 * worden gezien) en waarin het e-mailadres klikbaar wordt.
 */
export default function MarkedText({ text }: { text: string }) {
  return (
    <>
      {text.split(PLACEHOLDER).map((part, i) => {
        if (part.startsWith('[[')) {
          return (
            <mark key={i} className="rounded-sm px-1 bg-[var(--gold-soft)] text-[var(--gold-text)] font-medium">
              [{part.slice(2, -2)}]
            </mark>
          )
        }
        if (part === 'info@zomerdev.com') {
          return (
            <a key={i} href="mailto:info@zomerdev.com" className="underline underline-offset-2 hover:text-[var(--text)] transition-colors">
              {part}
            </a>
          )
        }
        return part
      })}
    </>
  )
}

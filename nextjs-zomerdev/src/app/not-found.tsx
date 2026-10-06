import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '404 — Pagina niet gevonden · Zomer Development',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <main className="min-h-[100dvh] flex flex-col items-center justify-center px-8 text-center">
      <p className="font-display text-[clamp(6rem,20vw,10rem)] font-extrabold leading-none tracking-[-0.04em] text-[var(--surface-2)] select-none">
        404
      </p>
      <h1 className="font-display text-[28px] font-bold text-navy -mt-4">Pagina niet gevonden</h1>
      <p className="text-[var(--text-muted)] mt-3 max-w-sm">
        Deze pagina bestaat niet (meer). Ga terug naar de homepage.
      </p>
      <Link
        href="/"
        className="mt-8 bg-navy text-white font-semibold text-[14px] px-6 py-3.5 rounded-[var(--radius-sm)] hover:bg-[var(--navy-700)] transition-colors"
      >
        Naar de homepage
      </Link>
    </main>
  )
}

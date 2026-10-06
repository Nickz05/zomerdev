'use client'

import { usePathname } from 'next/navigation'

/**
 * Maakt van een anchor (#contact) een link die overal werkt: op de homepage blijft het
 * een in-page anchor, op andere pagina's (bijv. /privacy) wordt het /#contact.
 */
export function useAnchor() {
  const pathname = usePathname()
  const base = pathname === '/' ? '' : '/'
  return (href: string) => (href.startsWith('#') ? base + href : href)
}

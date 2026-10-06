'use client'

import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react'
import type { Lang } from '../i18n/translations'
import t from '../i18n/translations'

interface LanguageContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: typeof t['nl']
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'nl',
  setLang: () => {},
  t: t.nl,
})

// useLayoutEffect geeft op de server een waarschuwing; useEffect is daar een no-op.
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

function readStored(): Lang | null {
  try {
    const stored = localStorage.getItem('lang')
    return stored === 'nl' || stored === 'en' ? stored : null
  } catch {
    return null
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Server en eerste client-render zijn 'nl' (hydratie klopt). Vóór de eerste paint
  // zetten we de opgeslagen taal; een inline script in <head> verbergt de body zolang
  // dat nog moet gebeuren (data-lang-pending), zodat er geen flits van NL naar EN is.
  const [lang, setLangState] = useState<Lang>('nl')

  useIsoLayoutEffect(() => {
    const stored = readStored()
    if (stored) setLangState(stored)
    document.documentElement.removeAttribute('data-lang-pending')
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try { localStorage.setItem('lang', l) } catch {}
  }, [])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: t[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}

'use client'
// app/LanguageContext.tsx

import { createContext, useContext, useState, ReactNode } from 'react'
import { translations, Lang, TranslationKey } from './translations'

type LanguageContextType = {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  t: (key) => translations[key].en,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')
  const t = (key: TranslationKey): string => translations[key][lang]
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}

// Convenience hook — most components only need t()
export function useT() {
  return useContext(LanguageContext).t
}

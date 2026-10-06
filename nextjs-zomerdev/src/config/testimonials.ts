/**
 * Klantquotes voor de sectie "Wat klanten zeggen".
 *
 * De sectie wordt pas getoond als er minstens één quote met echte tekst is. Een quote telt als
 * placeholder zolang `quote.nl` leeg is of nog dubbele rechte haken bevat. Vul per klant de echte
 * woorden in (NL, en optioneel EN) samen met naam, rol en bedrijf, en geef alleen quotes door
 * waarvoor de klant toestemming heeft gegeven.
 *
 * Er wordt bewust géén review-schema (JSON-LD) gegenereerd.
 */
export interface Testimonial {
  quote: { nl: string; en?: string }
  name: string
  role: string
  company: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: { nl: '[[QUOTE KLANT 1 (NL)]]', en: '[[QUOTE CLIENT 1 (EN)]]' },
    name: '[[NAAM KLANT 1]]',
    role: '[[ROL]]',
    company: "[[BEDRIJF, bijv. 't Hertenhuisje]]",
  },
  {
    quote: { nl: '[[QUOTE KLANT 2 (NL)]]', en: '[[QUOTE CLIENT 2 (EN)]]' },
    name: '[[NAAM KLANT 2]]',
    role: '[[ROL]]',
    company: '[[BEDRIJF, bijv. mdd b.v.]]',
  },
]

const isReal = (s?: string): s is string => !!s && s.trim() !== '' && !s.includes('[[')

/** Geeft alleen testimonials terug met echte tekst, in de gevraagde taal (met NL als terugval). */
export function getPublishedTestimonials(lang: 'nl' | 'en') {
  return TESTIMONIALS.flatMap((t) => {
    const quote = isReal(t.quote[lang]) ? t.quote[lang] : t.quote.nl
    if (!isReal(quote) || !isReal(t.name)) return []
    return [
      {
        quote,
        name: t.name,
        role: isReal(t.role) ? t.role : '',
        company: isReal(t.company) ? t.company : '',
      },
    ]
  })
}

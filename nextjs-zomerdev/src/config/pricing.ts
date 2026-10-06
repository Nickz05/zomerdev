/**
 * Prijzen voor de Remote IT-pakketten. Vervang elke placeholder (tussen dubbele rechte haken) door het echte bedrag,
 * bijv. '49' (zonder valutateken; de sectie toont "vanaf € 49"). Alle bedragen zijn excl. btw.
 * `npm run check:placeholders` faalt zolang er nog een placeholder staat.
 */
export const PACKAGE_PRICES = {
  basis: { amount: '[[PRIJS BASIS]]', unit: '[[EENHEID BASIS, bijv. per uur]]' },
  beheer: { amount: '[[PRIJS BEHEER]]', unit: '[[EENHEID BEHEER, bijv. per maand]]' },
  opmaat: { amount: '[[PRIJS OP MAAT]]', unit: '[[EENHEID OP MAAT, bijv. per project]]' },
} as const

export type PackageId = keyof typeof PACKAGE_PRICES

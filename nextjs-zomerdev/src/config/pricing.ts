/**
 * Prijzen voor de Remote IT-pakketten. Alle bedragen zijn excl. btw.
 *
 * `amount` is alleen het getal, zonder valutateken en zonder "vanaf": de sectie toont zelf
 * "vanaf € <amount> <unit>". Een pakket met `null` krijgt geen prijs maar "Op aanvraag".
 */
export type PackageId = 'basis' | 'opmaat'

export interface PackagePrice {
  amount: string
  unit: { nl: string; en: string }
}

export const PACKAGE_PRICES: Record<PackageId, PackagePrice | null> = {
  basis: { amount: '50', unit: { nl: 'per uur', en: 'per hour' } },
  opmaat: null,
}

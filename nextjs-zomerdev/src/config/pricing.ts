/**
 * Prijzen voor de Remote IT-pakketten. Alle bedragen zijn excl. btw.
 *
 * `amount` is alleen het getal, zonder valutateken en zonder "vanaf": de sectie toont zelf
 * "vanaf € <amount> <unit>". Een pakket met `null` krijgt geen prijs maar "Op aanvraag".
 */
export type PackageId = 'basis' | 'beheer' | 'opmaat'

export interface PackagePrice {
  amount: string
  unit: string
}

export const PACKAGE_PRICES: Record<PackageId, PackagePrice | null> = {
  basis: { amount: '50', unit: 'per uur' },
  beheer: { amount: '100', unit: 'per maand' },
  opmaat: null,
}

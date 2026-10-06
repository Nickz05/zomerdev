import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'
import { legal } from '@/i18n/legal'

export const metadata: Metadata = {
  title: `${legal.terms.nl.title} | Zomer Development`,
  description: legal.terms.nl.description,
  alternates: { canonical: '/algemene-voorwaarden/' },
}

export default function TermsPage() {
  return <LegalPage doc="terms" />
}

import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'
import { legal } from '@/i18n/legal'

export const metadata: Metadata = {
  title: `${legal.privacy.nl.title} | Zomer Development`,
  description: legal.privacy.nl.description,
  alternates: { canonical: '/privacy/' },
}

export default function PrivacyPage() {
  return <LegalPage doc="privacy" />
}

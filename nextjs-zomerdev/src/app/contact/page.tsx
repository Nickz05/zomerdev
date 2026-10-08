import type { Metadata } from 'next'
import ContactPage from '@/components/ContactPage'
import t from '@/i18n/translations'

export const metadata: Metadata = {
  title: t.nl.contactPage.metaTitle,
  description: t.nl.contactPage.metaDescription,
  alternates: { canonical: '/contact/' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  url: 'https://www.zomerdev.com/contact/',
  name: t.nl.contactPage.metaTitle,
  about: { '@id': 'https://www.zomerdev.com/#business' },
}

export default function ContactRoute() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ContactPage />
    </>
  )
}

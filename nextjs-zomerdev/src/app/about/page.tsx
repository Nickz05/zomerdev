import type { Metadata } from 'next'
import AboutPage from '@/components/AboutPage'
import t from '@/i18n/translations'

export const metadata: Metadata = {
  title: t.nl.aboutPage.metaTitle,
  description: t.nl.aboutPage.metaDescription,
  alternates: { canonical: '/about/' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  url: 'https://www.zomerdev.com/about/',
  name: t.nl.aboutPage.metaTitle,
  mainEntity: { '@id': 'https://www.zomerdev.com/#nick' },
}

export default function About() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AboutPage />
    </>
  )
}

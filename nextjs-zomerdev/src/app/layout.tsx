import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono, Fraunces } from 'next/font/google'
import Providers from './providers'
import jsonLd from './jsonld.json'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-inter', display: 'swap' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-jetbrains', display: 'swap' })
const fraunces = Fraunces({ subsets: ['latin'], weight: ['600', '700', '800'], style: ['normal', 'italic'], variable: '--font-fraunces', display: 'swap' })

const title = 'Zomer Development | Freelance Web Developer & IT Specialist · Wassenaar'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.zomerdev.com'),
  title,
  description:
    'Nick Zomer — freelance web developer en IT specialist uit Wassenaar. React, TypeScript, Sanity CMS. Websites en webapps op maat én remote IT support. Eén aanspreekpunt, korte lijnen.',
  keywords:
    'freelance web developer Wassenaar, IT specialist Den Haag, React developer Nederland, website laten maken, IT support kleine bedrijven, TypeScript, Sanity CMS, Cloudflare, Nick Zomer',
  authors: [{ name: 'Nick Zomer — Zomer Development' }],
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
  icons: { icon: '/favicon.png', apple: '/apple-touch-icon.png' },
  openGraph: {
    type: 'website',
    siteName: 'Zomer Development',
    url: 'https://www.zomerdev.com/',
    title,
    description:
      'Nick Zomer — freelance web developer en IT specialist uit Wassenaar. Websites op maat én IT support. Twee disciplines, één aanspreekpunt.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'nl_NL',
    alternateLocale: ['en_GB'],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description:
      'Nick Zomer — freelance web developer en IT specialist. Websites op maat én IT support. Twee disciplines, één aanspreekpunt.',
    images: ['/og-image.png'],
  },
  other: { 'geo.region': 'NL-ZH', 'geo.placename': 'Wassenaar' },
}

export const viewport: Viewport = {
  themeColor: '#0F2338',
  colorScheme: 'light dark',
}

// Zet thema en taal vóór de eerste paint, zodat er geen flits ontstaat. Bij een opgeslagen
// Engelse taal blijft de body verborgen tot LanguageProvider hydrateert (zie globals.css).
const themeScript = `try{var d=document.documentElement,t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))d.classList.add('dark');if(localStorage.getItem('lang')==='en'){d.lang='en';d.setAttribute('data-lang-pending','')}}catch(e){}`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" suppressHydrationWarning className={`${inter.variable} ${jetbrains.variable} ${fraunces.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

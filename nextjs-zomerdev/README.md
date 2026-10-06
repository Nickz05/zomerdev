# zomerdev.com (Next.js)

Statische Next.js 15-export (`output: 'export'`) voor Cloudflare Pages, met een Pages Function
voor het contactformulier.

## Waar vind je wat

| Wat je wilt aanpassen | Waar |
|---|---|
| Alle teksten (NL en EN) van de secties, nav en footer | `src/i18n/translations.ts` |
| Privacyverklaring en algemene voorwaarden | `src/i18n/legal.ts` |
| Prijzen van de Remote IT-pakketten | `src/config/pricing.ts` |
| Pakketinhoud en reactietijden | `src/i18n/translations.ts`, blok `remoteIt` |
| Klantquotes ("Wat klanten zeggen") | `src/config/testimonials.ts` |
| WhatsApp-link | `src/config/contact.ts` |
| Volgorde van de secties | `src/app/page.tsx` |
| Metadata, fonts, JSON-LD, thema-script | `src/app/layout.tsx`, `src/app/jsonld.json` |
| Secties zelf | `src/components/<Naam>/index.tsx` (Hero, Diensten, RemoteIT, Werkwijze, Over, Referenties, Testimonials, Contact, Footer) |
| Kleuren en tokens | `src/styles/tokens.css`, `tailwind.config.mjs` |
| Contactformulier (browser) | `src/components/Contact/index.tsx` |
| Contactformulier (server, Resend) | `functions/api/contact.ts` |
| Beveiligingsheaders en cache | `public/_headers` |
| Sitemap en robots | `public/sitemap.xml`, `public/robots.txt` |
| Afbeeldingen | `src/assets/images/` (WebP), `public/og-image.png` |
| Lokale geheimen (niet in git) | `.dev.vars` (voorbeeld: `.dev.vars.example`) |

Placeholders (`[[...]]`) staan in `src/config` en `src/i18n`. Ze worden geel gemarkeerd op de pagina.

## Scripts

| Commando | Wat |
|---|---|
| `npm run dev` | Ontwikkelserver (het formulier werkt hier niet: `/api/contact` bestaat alleen als Pages Function) |
| `npm run build` | Bouwt de statische site naar `out/` |
| `npm run preview:cf` | Build + `wrangler pages dev out`: site, `_headers` én `/api/contact` lokaal (vereist `.dev.vars`) |
| `npm run check:placeholders` | Faalt zolang er nog `[[placeholders]]` in `src/i18n` of `src/config` staan |

## Cloudflare Pages

- Root directory: `nextjs-zomerdev`
- Build command: `npm run build`
- Output directory: `out`
- Node: 20 of hoger

## Contactformulier via Resend

`functions/api/contact.ts` ontvangt het formulier en mailt het via Resend:
afzender `mail@zomerdev.com`, ontvanger `info@zomerdev.com`, met de bezoeker als reply-to.

1. Verifieer het domein `zomerdev.com` in Resend (DNS-records SPF/DKIM). Zonder dat weigert Resend `mail@zomerdev.com` als afzender.
2. Zet in Cloudflare Pages → je project → Settings → Variables and Secrets (Production én Preview):
   - `RESEND_API_KEY` (type Secret, verplicht)
   - Optioneel te overschrijven: `CONTACT_FROM` (standaard `Zomer Development <mail@zomerdev.com>`) en `CONTACT_TO` (standaard `info@zomerdev.com`)
3. Deploy opnieuw; variabelen werken pas na een nieuwe deployment.
4. Lokaal testen: kopieer `.dev.vars.example` naar `.dev.vars`, vul de key in, draai `npm run preview:cf`.

## Beveiliging

In de code (aanwezig):
- **Formulier-API:** same-origin check, alleen `application/json`, maximale body (12 kB), veldvalidatie en lengtelimieten, honeypot (`_gotcha`), HTML-escaping in de mail, vaste afzender/ontvanger (niet door de bezoeker te beïnvloeden), nieuwe regels uit de onderwerpregel gehaald, zachte rate-limit van 5 berichten per 10 minuten per IP.
- **Headers (`public/_headers`):** Content-Security-Policy, HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, COOP.
- **Geheimen:** de Resend-key staat nergens in de repo; `.dev.vars` en `.env*` zijn genegeerd.
- **Geen externe scripts of trackers:** fonts zijn zelf gehost, er wordt niets van derden geladen.

In het Cloudflare-dashboard (handmatig, niet vanuit code te doen):
- Security → WAF → Rate limiting rules: bijv. max. 5 requests per 10 minuten per IP op `/api/contact`.
- SSL/TLS: modus Full (strict), Always Use HTTPS aan.
- Optioneel: Turnstile (gratis CAPTCHA) als er toch spam binnenkomt.
- E-mail: SPF, DKIM en DMARC voor `zomerdev.com` (Resend geeft de DKIM/SPF-records; voeg een DMARC-record toe).
- Zet tweestapsverificatie aan op Cloudflare, Resend en GitHub.

Bekende restpunten: `npm audit` meldt nog enkele kwetsbaarheden in build-tooling (Tailwind 3 → braces/micromatch, ESLint, de postcss die in Next is gebundeld). Die draaien alleen tijdens de build en worden niet naar bezoekers gestuurd. De CSP staat `'unsafe-inline'` toe voor scripts en stijlen, omdat Next.js inline scripts en de site veel inline `style`-attributen gebruikt.

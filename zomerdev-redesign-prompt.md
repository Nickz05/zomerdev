# Zomer Development — Redesign Prompt voor Claude Code

## Voorbereiding

Maak eerst een nieuwe branch aan:

```bash
git checkout -b redesign/2025
```

---

## Context

Zomer Development is een eenmanszaak van Nick Zomer (Wassenaar) die twee diensten levert:

1. **Web Development** — React/TypeScript websites, Sanity CMS, Cloudflare hosting
2. **IT Support & Advies** — netwerk/email configuratie, IT beheer, advies (o.a. associate partner van mdd b.v., een art consultancy in Den Haag)

De site is puur zakelijk (B2B klanten). Voor recruiters en portfolio is er nickzomer.com — zomerdev.com is het bedrijfsmerk. Er komen **geen vaste prijzen** op de site — alles op aanvraag.

---

## Tech Stack

- React + TypeScript + Vite
- Tailwind CSS
- Anchor-gebaseerde navigatie (geen React Router nodig)
- Sanity CMS hoeft niet mee in deze sprint

---

## Sitemap (one-pager)

1. **Nav** — logo + anchor links + CTA knop
2. **Hero** — hoofdboodschap, twee CTA's
3. **Diensten** — twee gelijkwaardige tracks
4. **Over** — kort, zakelijk, persoonlijk
5. **Referenties** — 't Hertenhuisje + mdd b.v.
6. **Contact** — simpel formulier
7. **Footer** — KVK, socials, legal

---

## Design Tokens

Gebruik deze exact als CSS variabelen in `/src/styles/tokens.css`:

```css
:root {
  --color-bg: #F0F4FF;
  --color-surface: #FFFFFF;
  --color-primary: #1D4ED8;
  --color-accent: #EAB308;
  --color-text: #0F172A;
  --color-text-muted: #64748B;
  --radius: 12px;
  --shadow: 0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06);
}
```

---

## Typografie

- Font: **Inter** (via Google Fonts)
- Hero heading: 72px / weight 800 / line-height 1.1 / letter-spacing -0.02em
- Section heading: 40px / weight 700
- Body: 18px / weight 400 / line-height 1.6
- Label/eyebrow: 14px / weight 500 / uppercase / letter-spacing 0.08em

---

## Componenten

### Nav

- Links: Diensten, Over ons, Referenties, Contact
- Rechts: knop "Plan een gesprek" (primary blauw, pill shape)
- Sticky met lichte blur backdrop op scroll
- Mobiel: hamburger menu

---

### Hero

- Eyebrow label: `Development & IT bureau — Wassenaar` (kleine muted uppercase tekst)
- Heading: `Development & IT, op maat.`
- Subline: `Van website tot IT-infrastructuur — ik help bedrijven verder met technologie.`
- Twee knoppen: `Bekijk mijn diensten` (primary) + `Plan een gesprek` (outline)
- Rechts: clean abstracte SVG illustratie die twee diensten symboliseert (web + IT)

---

### Diensten Sectie

Twee grote kaarten naast elkaar (50/50 grid):

**Kaart 1 — Web Development**
- Icon: code brackets SVG
- Titel: `Web Development`
- Body: `Van landingspagina tot volledige web applicatie. React, TypeScript, Sanity CMS en Cloudflare — schaalbaar en snel.`
- Bullets: Maatwerk websites / React applicaties / CMS integratie / Cloudflare hosting

**Kaart 2 — IT Support & Advies**
- Icon: server/network SVG
- Titel: `IT Support & Advies`
- Body: `Praktische IT ondersteuning voor ondernemers. Van netwerk en email tot structureel technisch beheer en advies.`
- Bullets: Netwerk & email configuratie / IT beheer op afstand / Technisch advies / Veiligheid & updates

Onder de kaarten: CTA `Neem contact op voor een vrijblijvend gesprek`

---

### Over Sectie

- Links: initialen avatar + naam `Nick Zomer` + `Founder, Zomer Development`
- Rechts: zakelijke tekst:

  > Ik ben Nick Zomer, developer en IT-specialist vanuit Wassenaar. Onder Zomer Development (KVK 98115561) bouw ik websites en lever ik IT-ondersteuning aan ondernemers die technologie serieus nemen. Geen templates, geen standaard pakketten — alles op maat.

- Link: `Bekijk mijn persoonlijke portfolio →` naar nickzomer.com

---

### Referenties Sectie

- Heading: `Waar ik voor werk`
- Twee referentie-kaarten:

  **'t Hertenhuisje**
  Website ontwikkeling en beheer. React, Sanity CMS, Cloudflare. — Wassenaar

  **mdd b.v.**
  Associate IT & development partner. Technische ondersteuning en web development voor een art consultancy in Den Haag.

- Kaarten: subtiele border, logo placeholder links, beschrijving rechts

---

### Contact Sectie

- Heading: `Kom in contact`
- Subline: `Benieuwd wat ik voor jou kan betekenen? Stuur een bericht en ik reageer binnen een werkdag.`
- Formulier velden: Naam / Bedrijfsnaam (optioneel) / Email / Bericht / Submit knop `Verstuur bericht`
- Naast formulier: info@zomerdev.com, Wassenaar, KVK 98115561, social icons (LinkedIn, Instagram, TikTok)
- Geen reCAPTCHA melding in de UI

---

### Footer

- Links: logo + tagline `Development & IT vanuit Wassenaar`
- Midden: nav links
- Rechts: `2025 Zomer Development — KVK 98115561` + Privacy / Algemene voorwaarden

---

## Overige Eisen

- Volledig responsive (mobile-first)
- Smooth scroll naar anchor secties
- Subtiele scroll-triggered fade-in animaties via Intersection Observer (geen zware libraries)
- Accent kleur `#EAB308` spaarzaam — alleen voor tekst highlights of kleine details, nooit als achtergrondkleur
- Alle componenten in `/src/components/[ComponentName]/index.tsx`
- Design tokens als CSS variabelen in `/src/styles/tokens.css`

---

## Wat er NIET in mag

- Pakketprijzen of pricing tiers
- "Onze voordelen" grid met icoonkaartjes
- Techstack chips (HTML, CSS, Angular, etc.)
- reCAPTCHA melding zichtbaar in de UI
- Em dashes (`—`) in de UI copy — gebruik gewone streepjes of herformuleer
- CV-achtige elementen op een zakelijke pagina

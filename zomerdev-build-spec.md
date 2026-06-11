# Zomer Development — Build Spec voor Claude Code

Je bouwt de nieuwe Zomer Development website. Het ontwerp ligt vast (hieronder volledig uitgeschreven). Jouw taak is dit met vakmanschap uitvoeren: pixel-nette details, doordachte microinteracties en animaties, en schone code. Neem de tijd, lever kwaliteit.

## Voorbereiding

```bash
git checkout -b redesign/2025
```

Werk in deze branch. Maak kleine, logische commits met Conventional Commits (`feat:`, `style:`, `chore:`).

---

## Stack

React + TypeScript + Vite (bestaande stack) met Tailwind CSS. One-pager met anchor-navigatie. Sanity hoeft niet in deze sprint. Geen prijzen, geen pakketten, geen reCAPTCHA-melding zichtbaar in de UI.

---

## Merkkleuren (exact, uit het logo)

```css
:root {
  --navy:        #0F2338;
  --navy-700:    #16314F;
  --navy-600:    #1E3F63;
  --gold:        #FBA728;
  --gold-soft:   #FDF3E2;
  --gold-text:   #854F0B;
  --ink:         #152340;
  --paper:       #FFFFFF;
  --surface:     #F6F8FC;
  --surface-2:   #F1F5FB;
  --line:        #E6E9F0;
  --line-soft:   #EEF1F6;
  --text:        #152340;
  --text-muted:  #5A6B85;
  --text-faint:  #94A3B8;
  --mint-bg:     #E1F5EE;
  --mint-dot:    #1D9E75;
  --mint-text:   #0F6E56;
  --radius:      14px;
  --radius-sm:   9px;
}
```

Navy is de ink-kleur (koppen, knoppen, footer). Gold is het accent, spaarzaam: dienst-nummering, het tweede dienst-icoon, de "over" eyebrow, hover-accenten. Achtergrond blijft clean wit met lichte surfaces.

## Typografie

- Body en headings: Inter (Google Fonts), of `Geist` als je die al hebt. Twee gewichten dominant: 400 en 700, met 600 voor sub-koppen.
- Hero heading: clamp(40px, 6vw, 56px), weight 800, line-height 1.0, letter-spacing -0.03em.
- Sectiekop: 28px, weight 700, letter-spacing -0.02em.
- Eyebrow labels: monospace (`JetBrains Mono` of `ui-monospace`), 12px, letter-spacing 0.15em, uppercase, kleur `--text-faint`. Deze monospace eyebrows zijn een signatuur-element, gebruik ze consequent boven elke sectie.
- Body: 16px, line-height 1.6, kleur `--text-muted`.

---

## Logo

Gebruik `logo_volledig.png` uit de assets. Vraag of er een SVG-versie is; zo niet, maak een nette SVG-uitsnede voor scherpte op retina. In de nav: alleen het zon-Z icoon plus "Zomer Development" wordmark (Zomer in 700, Development in 400 muted). In de footer: het volledige logo mag, in een witte/lichte variant op de navy achtergrond.

---

## Paginastructuur

One-pager in deze volgorde: Nav, Hero, Diensten, Werk, Over, Contact, Footer.

### 1. Nav (sticky)

- Links logo-icoon + wordmark. Rechts: Diensten, Werk, Over, Contact als anchor-links + primaire knop "Plan een gesprek" (navy bg, wit, radius-sm).
- Sticky top. Bij scroll voorbij de hero: voeg een subtiele `backdrop-filter: blur(8px)`, semi-transparante witte achtergrond en een 1px `--line-soft` onderrand toe. Deze verandering animeert in 200ms.
- Anchor-links: muted kleur, op hover navy met een gold underline die in 150ms van links naar rechts ingroeit (`transform: scaleX` met `transform-origin: left`).
- Mobiel: hamburger die een full-height paneel opent dat van rechts inschuift (transform translateX, 250ms ease-out), met een lichte overlay-fade erachter.

### 2. Hero

- Tweekoloms grid (1.45fr / 1fr). Links tekst, rechts fotopaneel.
- Status-badge: mint pill met pulserend bolletje (zie microinteracties), tekst "Beschikbaar voor nieuwe projecten".
- Heading in drie regels: "Ik bouw het." / "En ik hou het" (in gold) / "draaiend."
- Subtekst max-width 390px, muted.
- Twee knoppen: "Bekijk mijn werk" (navy primair) en "Plan een gesprek" (outline, 1px `--line` border).
- Rechterpaneel: `--surface` achtergrond met linker 1px `--line-soft` rand. Daarin een staand portret (jouw foto), radius bovenaan 12px, onderkant tegen de sectierand. Linksboven in monospace: "NICK ZOMER" / "FOUNDER · WASSENAAR".
- Bij laden: de hero-elementen komen gestaffeld binnen (zie scroll/entrance animaties), heading eerst, dan subtekst, dan knoppen, dan fotopaneel dat licht van rechts inschuift.

### 3. Diensten — "Wat ik doe"

- Eyebrow "WAT IK DOE", kop "Twee disciplines, één aanspreekpunt".
- Twee kaarten (50/50), 1px `--line` border, radius 14px, padding 26px.
- Kaart 1 Web Development: navy icoon-tegel (44px, radius 11px, `ti-code`), nummer "01" in gold monospace rechtsboven. Titel, body, en drie tags met `--surface-2` achtergrond.
- Kaart 2 IT Support & Advies: gold icoon-tegel met navy icoon (`ti-server-2`), nummer "02" in gold. Tags met `--gold-soft` achtergrond, `--gold-text` tekst.
- Hover op een kaart: border wordt `--navy-600`, de kaart tilt 2px omhoog (`translateY(-2px)`), en de icoon-tegel schaalt subtiel (1.05) — alles 200ms ease-out. Zachte schaduw verschijnt (`0 8px 24px rgba(15,35,56,0.08)`).

### 4. Werk — "Waar ik voor werk"

- Eyebrow "GESELECTEERD WERK", kop "Waar ik voor werk".
- Twee project-kaarten (50/50) met een beeldvlak bovenaan (128px hoog) en tekst eronder.
  - 't Hertenhuisje: tag "web" (blauw). Body: volledige website en beheer, React, Sanity, Cloudflare, Wassenaar.
  - mdd b.v.: tag "it · web" (gold). Body: associate IT en development partner voor een art consultancy in Den Haag.
- Beeldvlak: hier komt een projectfoto. Op hover: het beeld schaalt heel licht (1.04, `overflow:hidden` op de wrapper) en er schuift een "Bekijk →" label van onderaf in. 250ms.

### 5. Over — "Over Nick"

- Navy blok (`--navy` bg, radius 16px, padding 32px), tweekoloms: links een werkfoto (150px breed, radius 12px), rechts tekst.
- Eyebrow "OVER NICK" in gold. Tekst in licht (`#D4DEEC`): wie je bent, Zomer Development, geen templates, korte lijnen. Afsluiten met een gold link "Bekijk mijn persoonlijke portfolio →" naar nickzomer.com (opent in nieuw tabblad).
- De pijl in de link schuift 4px naar rechts op hover (150ms).

### 6. Contact

- Kaart met 1px `--line` border, radius 16px, tweekoloms.
- Links: kop "Kom in contact", subtekst, en contactgegevens met icoontjes (mail info@zomerdev.com, map-pin Wassenaar, building KVK 98115561). Daaronder drie social-tegels (LinkedIn, Instagram, TikTok) als 34px bordered vierkanten; op hover krijgen ze navy border en navy icoonkleur.
- Rechts: formulier met velden Naam, Email, Bericht (textarea), en knop "Verstuur bericht" (navy). Inputs: 1px `--line` border, `--surface` achtergrond, radius-sm. Op focus: navy border + 3px navy focus-ring (`box-shadow: 0 0 0 3px rgba(15,35,56,0.12)`), 150ms.
- Geen zichtbare reCAPTCHA-tekst. Validatie inline en vriendelijk.

### 7. Footer

- Navy achtergrond, lichte tekst. Links het volledige logo (lichte variant). Midden nav-links. Rechts "© 2025 · KVK 98115561 · Wassenaar". Social-icoontjes mogen herhaald worden.

---

## Animaties en motion (dit is waar de kwaliteit zit)

Algemeen: motion is subtiel en doelgericht, nooit speels of druk. Alles respecteert `prefers-reduced-motion: reduce` — bij die voorkeur worden alle entrance- en hover-transforms uitgezet en blijft alleen opacity-fade (of niets) over.

**Scroll-entrance.** Elke sectie en kaart komt binnen met een fade + 16px omhoog-beweging zodra hij voor ~15% in beeld is. Gebruik een eigen lichte Intersection Observer hook (`useInView`), geen zware library. Stagger de kinderen binnen een sectie met ~80ms onderlinge vertraging. Easing: `cubic-bezier(0.22, 1, 0.36, 1)`. Duur 500ms. Elk element animeert maar één keer (unobserve na trigger).

**Hero-entrance bij laden.** Gestaffeld: badge → heading → subtekst → knoppen → fotopaneel. Heading mag per regel binnenkomen voor extra finesse. Fotopaneel schuift 20px van rechts in plus fade.

**Nav scroll-state.** Blur + achtergrond + onderrand faden in zodra de gebruiker voorbij de herohoogte scrollt (luister gethrottled op scroll, of gebruik een sentinel + Intersection Observer; voorkeur sentinel voor performance).

**Status-bolletje puls.** Het groene bolletje in de hero-badge pulseert rustig: een tweede ring eromheen die elke 2s opschaalt van 1 naar 2.2 en uitfadet (`@keyframes`). Stopt bij reduced-motion.

**Kaart-hover.** Diensten- en projectkaarten: `translateY(-2px)`, border-kleurwissel, schaduw-fade, icoon/beeld lichte scale. Alles via `transition`, 200ms ease-out. Gebruik `will-change: transform` spaarzaam alleen op deze kaarten.

**Knoppen.** Primaire navy knop: op hover iets lichter (`--navy-700`) en 1px omhoog; op active terug naar 0 en scale 0.98. Outline knop: op hover `--surface` vulling. Alle 150ms.

**Links.** Nav-links en de portfolio-link: underline-grow of pijl-shift zoals hierboven beschreven.

**Magnetic CTA (optioneel, alleen desktop).** De "Plan een gesprek" knop in de nav mag een lichte magnetic hover hebben: de knopinhoud volgt de cursor max 4px. Subtiel. Uit bij touch en reduced-motion.

**Smooth scroll.** Anchor-clicks scrollen smooth naar de sectie met een offset voor de sticky nav. Implementeer met `scroll-margin-top` op de secties, niet met JS-hacks.

---

## Detailwerk (let hier specifiek op)

- Optische uitlijning: de hero-heading begint op exact dezelfde linkerlijn als de eyebrow en de subtekst.
- Consistente verticale ritmiek: secties hebben gelijke top/bottom padding (`clamp(48px, 8vw, 88px)`).
- Border-radii consistent: kaarten 14px, kleine elementen 9px, grote blokken 16px. Nooit mengen binnen één component.
- Geen enkele single-side border met afgeronde hoeken.
- Tags en pills: tekstkleur altijd de donkere stop uit dezelfde kleurfamilie, nooit puur zwart of grijs.
- Iconen: Tabler outline, consistent formaat, optisch gecentreerd in hun tegel.
- Focus-states zichtbaar en mooi op álle interactieve elementen (toetsenbordnavigatie volledig werkend).
- Geen layout-shift bij hover (transforms, geen margin/size-wijzigingen die herflow veroorzaken).
- Afbeeldingen: `loading="lazy"`, expliciete `width`/`height` of `aspect-ratio` om CLS te voorkomen, `object-fit: cover`.
- Contrast minimaal WCAG AA overal.

---

## Foto's (placeholders nu, echte beelden later)

Drie fotoplekken, bouw ze zo dat een echte foto er later netjes in valt (juiste aspect-ratio, object-cover, afgeronde hoeken):
1. Hero: staand portret (ongeveer 3:4).
2. Werk: twee project-beeldvlakken (ongeveer 16:9, bovenaan de kaart).
3. Over: werkfoto in het navy blok (ongeveer 4:5).

Zet nu nette placeholders neer (lichte surface met een Tabler `ti-photo` icoon gecentreerd) met de juiste verhoudingen, zodat het ontwerp klopt voordat de foto's er zijn.

---

## Copy (exact overnemen, geen em-dashes)

- Hero heading: "Ik bouw het. En ik hou het draaiend." (regel 2 "En ik hou het" in gold)
- Hero sub: "Websites die presteren en de IT eronder die niet omvalt. Eén aanspreekpunt dat allebei snapt, geen lagen ertussen."
- Diensten kop: "Twee disciplines, één aanspreekpunt"
- Web Development: "Van landingspagina tot volledige web applicatie. React, TypeScript, Sanity en Cloudflare. Maatwerk, geen templates."
- IT Support & Advies: "Praktische IT ondersteuning voor ondernemers. Van netwerk en email tot structureel beheer en technisch advies."
- Over: "Ik ben Nick Zomer, developer en IT-specialist uit Wassenaar. Onder Zomer Development bouw ik websites en regel ik de IT voor ondernemers die technologie serieus nemen. Geen templates, geen standaard pakketten, alles op maat en met korte lijnen."
- Contact sub: "Benieuwd wat ik voor je kan betekenen? Stuur een bericht en ik reageer binnen een werkdag."

---

## Architectuur en kwaliteit

- Componenten in `/src/components/[Naam]/index.tsx`. Eén component per sectie plus herbruikbare `Button`, `ServiceCard`, `WorkCard`, `SectionLabel`, `useInView` hook.
- Design tokens als CSS-variabelen in `/src/styles/tokens.css`, gekoppeld aan Tailwind theme waar logisch.
- Strict TypeScript, geen `any`.
- Geen em-dashes in copy of code-comments.
- Lighthouse-doel: 95+ op performance en accessibility. Geen onnodige dependencies voor animatie (eigen Intersection Observer hook, CSS transitions/keyframes).
- Mobile-first, getest op 360px, 768px, 1024px, 1440px.

## Werkwijze

1. Zet eerst tokens, fonts en de `Button` + `SectionLabel` + `useInView` basis neer. Commit.
2. Bouw sectie voor sectie van boven naar beneden. Commit per sectie.
3. Voeg daarna de motion-laag toe (entrance, hover, nav-state) en test reduced-motion.
4. Loop het detailwerk-lijstje na als checklist voordat je afrondt.
5. Maak screenshots op de breakpoints als je omgeving dat toelaat en corrigeer wat niet klopt.

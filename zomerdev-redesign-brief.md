# Zomer Development — Redesign Brief

Je bent de design lead op dit project. Ik geef je richting en harde ankers, geen pixel-instructies. Maak binnen die kaders eigen, doordachte keuzes en durf één echt aesthetisch risico te nemen dat je kunt verantwoorden. Werk eerst een kort design plan uit (palette, typografie, layout, signature element) en bouw dat pas daarna.

## Voorbereiding

```bash
git checkout -b redesign/2025
```

---

## De opdracht in één zin

Zomer Development is geen webbureau meer dat ook IT doet. Het is een bedrijf met twee gelijkwaardige disciplines (Web Development en IT Support & Advies) en een aanspreekpunt. De site moet dat in één oogopslag overbrengen.

## Wat er mis is met de huidige site (en dus niet terug mag komen)

- Voelt als een template. Generieke "Onze Voordelen" grid met zes icoonkaartjes, pakketprijzen in drie kolommen, techstack-chips als op een CV.
- Positioneert alleen als webbureau ("Websites die Presteren") terwijl IT minstens zo belangrijk is.
- Blauw en geel vechten om aandacht zonder hiërarchie.
- De hero-illustratie (een "zon" met een kantoorgebouw erin) communiceert niets.

## Doelgroep

Zakelijke klanten (MKB-ondernemers en bedrijven) die zoeken naar iemand die zowel hun website bouwt als hun IT regelt. Dit is het bedrijfsmerk. Het persoonlijke portfolio leeft apart op nickzomer.com en is donker en creatief van toon; deze site moet daar duidelijk van verschillen: zakelijk, helder, vertrouwenwekkend, maar niet saai.

---

## Harde ankers (deze liggen vast)

**Tech stack:** React + TypeScript + Vite (bestaande stack). Tailwind CSS. One-pager met anchor-navigatie, geen router nodig. Sanity hoeft niet in deze sprint.

**Geen prijzen.** Geen pakketten, geen tiers, geen bedragen. Het conversiedoel is altijd "neem contact op" of "plan een gesprek".

**De twee diensten zijn visueel gelijkwaardig.** Niet de een groot en de ander een voetnoot. Geef ze elk een eigen visuele identiteit (bijvoorbeeld een eigen accentkleur) zodat ze onderscheidbaar maar gelijk zijn.

**Bedrijfsgegevens:** Zomer Development, Wassenaar, KVK 98115561, info@zomerdev.com. Socials: LinkedIn, Instagram, TikTok.

**Diensten — exacte inhoud:**

- *Web Development*: van landingspagina tot volledige web applicatie. React, TypeScript, Sanity CMS, Cloudflare hosting. Maatwerk, geen templates.
- *IT Support & Advies*: praktische IT-ondersteuning voor ondernemers. Netwerk- en emailconfiguratie, beheer op afstand, technisch advies, veiligheid en updates.

**Referenties — alleen deze twee, geen verzonnen klanten:**

- *'t Hertenhuisje* (Wassenaar): volledige website-ontwikkeling en beheer. React, Sanity CMS, Cloudflare.
- *mdd b.v.* (Den Haag): associate IT- en development-partner voor een art consultancy.

**Over Nick:** developer en IT-specialist uit Wassenaar, founder van Zomer Development. Eén aanspreekpunt, korte lijnen, alles op maat. Link door naar nickzomer.com voor het persoonlijke portfolio. Houd dit zakelijk en kort, geen CV-elementen, geen skill-chips.

---

## Richting (vrijheid binnen kaders)

**Palette:** vertrek vanuit een licht, helder uitgangspunt met kobaltblauw als primaire kleur. De huidige site heeft ook geel; geel mag terugkomen maar alleen als spaarzaam tweede accent, nooit als dominante of achtergrondkleur. Tip die in mijn test werkte: gebruik blauw voor de Web-discipline en een warm amber/geel voor de IT-discipline, zodat de twee diensten elk een eigen kleurwereld krijgen en het geel een functie heeft in plaats van decoratie. Kies zelf de exacte stops en zorg dat alles WCAG AA haalt.

**Typografie:** kies een display- en body-pairing die bij een modern, betrouwbaar techbedrijf past. Maak de type-behandeling zelf memorabel, niet een neutrale drager. Eén karaktervolle display-face met restraint, een prettig leesbare body.

**Hero — de thesis van de pagina:** de hero moet in één klap duidelijk maken dat dit bedrijf twee dingen even goed doet en makkelijk bereikbaar is. Een headline die dat vertelt werkt beter dan een vage tagline. In mijn test landde iets als "Twee disciplines. Een aanspreekpunt." sterk, omdat het meteen het hele verhaal vertelt. Voel je vrij om een betere te vinden, maar laat de hero het tweeledige karakter dragen, niet verstoppen. Geen losse decoratieve illustratie die niets zegt; als er beeld komt, laat het de twee disciplines symboliseren.

**Signature element:** bedenk het ene ding waar deze pagina om onthouden wordt en dat het tweeledige karakter belichaamt. Denk aan de twee disciplines die visueel naast elkaar of in elkaar grijpen. Steek je boldness hier in en houd de rest rustig en gedisciplineerd.

**Structuur:** one-pager. Nav (sticky, met CTA-knop), hero, diensten (twee gelijkwaardige kaarten), over (kort en zakelijk, link naar portfolio), referenties (de twee bovenstaande), contact (simpel formulier: naam, bedrijfsnaam optioneel, email, bericht — geen zichtbare reCAPTCHA-melding), footer (KVK, socials, legal).

**Motion:** subtiel en doelgericht. Scroll-triggered fade-ins via Intersection Observer, lichte hover-microinteracties. Geen zware libraries, geen scattered effects. Respecteer `prefers-reduced-motion`.

---

## Kwaliteitsvloer (zonder dit aan te kondigen in de UI)

- Volledig responsive, mobile-first.
- Zichtbare keyboard-focus, semantische HTML, WCAG AA contrast.
- Smooth scroll naar anchors.
- Componenten in `/src/components/[ComponentName]/index.tsx`, design tokens als CSS-variabelen in `/src/styles/tokens.css`.
- Geen em-dashes in de copy. Gebruik gewone streepjes of herformuleer.

## Proces

1. Schrijf eerst een compact design plan: palette (4-6 benoemde hex-waarden), typografie (display + body + eventueel utility), layout-concept, en het signature element.
2. Toets dat plan kritisch: leest een onderdeel als de generieke default die je voor elk willekeurig techbedrijf zou maken? Herzie het en benoem wat je veranderde.
3. Bouw pas daarna, exact volgens het herziene plan. Let op CSS-specificity tussen sectie- en element-selectors (paddings/margins die elkaar opheffen).
4. Kritiek op je eigen werk terwijl je bouwt; maak screenshots als je omgeving dat toelaat.

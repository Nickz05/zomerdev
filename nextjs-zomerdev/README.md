# zomerdev.com (Next.js)

Statische Next.js 15-export (`output: 'export'`) voor Cloudflare Pages, met een Pages Function
voor het contactformulier.

## Scripts

| Commando | Wat |
|---|---|
| `npm run dev` | Ontwikkelserver (het formulier werkt hier niet: `/api/contact` bestaat alleen als Pages Function) |
| `npm run build` | Bouwt de statische site naar `out/` |
| `npm run preview:cf` | Build + `wrangler pages dev out`: site én `/api/contact` lokaal (vereist `.dev.vars`) |
| `npm run check:placeholders` | Faalt zolang er nog `[[placeholders]]` in `src/i18n` of `src/config` staan |

## Cloudflare Pages

- Root directory: `nextjs-zomerdev`
- Build command: `npm run build`
- Output directory: `out`
- Node: 20 of hoger

## Contactformulier via Resend

`functions/api/contact.ts` ontvangt het formulier en mailt het via Resend.

1. Verifieer het domein `zomerdev.com` in Resend (DNS-records: SPF/DKIM).
2. Zet in Cloudflare Pages → Settings → Variables and Secrets:
   - `RESEND_API_KEY` (secret)
   - `CONTACT_FROM`, bijv. `Zomer Development <contact@zomerdev.com>` (domein moet geverifieerd zijn)
   - `CONTACT_TO`, standaard `info@zomerdev.com`
3. Lokaal testen: kopieer `.dev.vars.example` naar `.dev.vars`, vul de key in, draai `npm run preview:cf`.

Beveiliging: same-origin check, honeypot (`_gotcha`), validatie en lengtelimieten op de server,
HTML-escaping in de mail. Overweeg daarnaast een Cloudflare rate-limiting rule op `/api/contact`.

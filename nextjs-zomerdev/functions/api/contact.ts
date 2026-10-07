/**
 * Cloudflare Pages Function: POST /api/contact
 * Verstuurt het contactformulier via Resend. De API-key staat als secret in Cloudflare
 * (RESEND_API_KEY) en komt nooit in de browser of in de repo.
 *
 * Env:
 *   RESEND_API_KEY  (secret, verplicht)
 *   CONTACT_FROM    standaard "Zomer Development <mail@zomerdev.com>" (domein geverifieerd in Resend)
 *   CONTACT_TO      ontvanger, standaard info@zomerdev.com
 */

interface Env {
  RESEND_API_KEY?: string
  CONTACT_FROM?: string
  CONTACT_TO?: string
}

const SUBJECTS: Record<string, string> = {
  website: 'Website of webapp',
  it: 'IT Support',
  gesprek: 'Vrijblijvend gesprek',
  anders: 'Anders',
}

const MAX = { naam: 100, email: 254, bericht: 5000, body: 12_000 }

// Zachte rate-limit per IP (geheugen van de huidige Worker-isolate). Dit is een extra laag,
// geen vervanging voor een Cloudflare rate-limiting rule: isolates komen en gaan.
const WINDOW_MS = 10 * 60 * 1000
const LIMIT = 5
const hits = new Map<string, number[]>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  const limited = recent.length >= LIMIT
  if (!limited) recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 1000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key)
    }
  }
  return limited
}
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const json = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  })

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')

// Voorkomt header-injectie in de onderwerpregel
const oneLine = (s: string) => s.replace(/[\r\n]+/g, ' ').trim()

const formatNow = () =>
  new Intl.DateTimeFormat('nl-NL', { dateStyle: 'long', timeStyle: 'short', timeZone: 'Europe/Amsterdam' }).format(new Date())

const FONT = "-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif"

/**
 * Bouwt de mail die jij ontvangt. Tabelopmaat met inline stijlen, omdat mailprogramma's
 * (vooral Outlook) geen moderne CSS ondersteunen. Alle bezoekersinvoer wordt ge-escaped.
 */
function renderEmail(d: { naam: string; email: string; onderwerp: string; bericht: string; ontvangen: string }) {
  const { naam, email, onderwerp, bericht, ontvangen } = d
  const voornaam = naam.split(/\s+/)[0]
  const preheader = escapeHtml(`${naam}: ${bericht.replace(/\s+/g, ' ').slice(0, 110)}`)
  const mailto = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(`Re: ${onderwerp}`)}`

  const row = (label: string, value: string) => `
              <tr>
                <td style="padding:7px 18px 7px 0;font:600 11px/1.4 ${FONT};letter-spacing:0.1em;text-transform:uppercase;color:#5A6B85;vertical-align:top;white-space:nowrap">${label}</td>
                <td style="padding:7px 0;font:15px/1.5 ${FONT};color:#152340">${value}</td>
              </tr>`

  const text = [
    'Nieuw bericht via zomerdev.com',
    '',
    `Naam:      ${naam}`,
    `E-mail:    ${email}`,
    `Onderwerp: ${onderwerp}`,
    `Ontvangen: ${ontvangen}`,
    '',
    bericht,
    '',
    '—',
    `Antwoord direct op deze e-mail; je antwoord gaat naar ${email}.`,
  ].join('\n')

  const html = `<!doctype html>
<html lang="nl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light">
  <title>Nieuw bericht van ${escapeHtml(naam)}</title>
</head>
<body style="margin:0;padding:0;background:#F6F8FC">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${preheader}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F6F8FC">
    <tr>
      <td align="center" style="padding:28px 12px">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#FFFFFF;border:1px solid #E6E9F0;border-radius:14px;overflow:hidden">
          <tr>
            <td style="background:#0F2338;padding:26px 32px">
              <div style="font:700 18px/1.2 ${FONT};color:#FFFFFF">Zomer <span style="font-weight:400;color:#C9D3E3">Development</span></div>
              <div style="margin-top:6px;font:500 12px/1.4 ${FONT};letter-spacing:0.12em;text-transform:uppercase;color:#FBA728">Nieuw bericht via zomerdev.com</div>
            </td>
          </tr>
          <tr><td style="height:4px;line-height:4px;font-size:0;background:#FBA728">&nbsp;</td></tr>
          <tr>
            <td style="padding:32px">
              <div style="font:700 24px/1.25 ${FONT};color:#0F2338">${escapeHtml(naam)} heeft je een bericht gestuurd</div>
              <div style="margin-top:14px">
                <span style="display:inline-block;background:#FDF3E2;color:#854F0B;border:1px solid #F0D090;border-radius:999px;padding:5px 12px;font:600 12px/1.2 ${FONT}">${escapeHtml(onderwerp)}</span>
              </div>

              <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:22px;width:100%;border-top:1px solid #EEF1F6;border-bottom:1px solid #EEF1F6">${row('Naam', escapeHtml(naam))}${row(
                'E-mail',
                `<a href="${escapeHtml(mailto)}" style="color:#0F2338;font-weight:600;text-decoration:underline">${escapeHtml(email)}</a>`,
              )}${row('Ontvangen', escapeHtml(ontvangen))}
              </table>

              <div style="margin-top:26px;font:600 11px/1.4 ${FONT};letter-spacing:0.1em;text-transform:uppercase;color:#5A6B85">Bericht</div>
              <div style="margin-top:10px;background:#F6F8FC;border-left:4px solid #FBA728;border-radius:0 9px 9px 0;padding:18px 20px;font:16px/1.7 ${FONT};color:#152340">${escapeHtml(bericht).replace(/\r?\n/g, '<br>')}</div>

              <div style="margin-top:30px">
                <a href="${escapeHtml(mailto)}" style="display:inline-block;background:#0F2338;color:#FFFFFF;text-decoration:none;border-radius:9px;padding:14px 24px;font:600 15px/1 ${FONT}">Beantwoord ${escapeHtml(voornaam)} &rarr;</a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background:#F6F8FC;border-top:1px solid #E6E9F0;padding:18px 32px;font:12px/1.6 ${FONT};color:#5A6B85">
              Je kunt ook direct op deze e-mail antwoorden: je antwoord gaat naar ${escapeHtml(email)}.<br>
              Verstuurd via het contactformulier op zomerdev.com
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

  return { text, html }
}

export const onRequestPost = async ({ request, env }: { request: Request; env: Env }) => {
  // Alleen same-origin verzoeken
  const origin = request.headers.get('Origin')
  if (!origin || new URL(origin).host !== new URL(request.url).host) {
    return json({ ok: false, error: 'forbidden' }, 403)
  }

  if (!request.headers.get('Content-Type')?.toLowerCase().startsWith('application/json')) {
    return json({ ok: false, error: 'unsupported_media_type' }, 415)
  }

  const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown'
  if (rateLimited(ip)) {
    return new Response(JSON.stringify({ ok: false, error: 'rate_limited' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json', 'Retry-After': String(WINDOW_MS / 1000), 'Cache-Control': 'no-store' },
    })
  }

  let data: Record<string, unknown>
  try {
    const raw = await request.text()
    if (raw.length > MAX.body) return json({ ok: false, error: 'payload_too_large' }, 413)
    const parsed: unknown = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) throw new Error('not an object')
    data = parsed as Record<string, unknown>
  } catch {
    return json({ ok: false, error: 'invalid_json' }, 400)
  }

  // Honeypot: bots vullen dit veld in. Doe alsof het gelukt is.
  if (typeof data._gotcha === 'string' && data._gotcha.trim() !== '') {
    return json({ ok: true })
  }

  const naam = typeof data.naam === 'string' ? oneLine(data.naam) : ''
  const email = typeof data.email === 'string' ? data.email.trim() : ''
  const bericht = typeof data.bericht === 'string' ? data.bericht.trim() : ''
  const onderwerpKey = typeof data.onderwerp === 'string' && data.onderwerp in SUBJECTS ? data.onderwerp : 'anders'

  if (!naam || naam.length > MAX.naam) return json({ ok: false, error: 'invalid_name' }, 400)
  if (!EMAIL_RE.test(email) || email.length > MAX.email) return json({ ok: false, error: 'invalid_email' }, 400)
  if (!bericht || bericht.length > MAX.bericht) return json({ ok: false, error: 'invalid_message' }, 400)

  if (!env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY ontbreekt')
    return json({ ok: false, error: 'not_configured' }, 500)
  }

  const onderwerp = SUBJECTS[onderwerpKey]
  const { text, html } = renderEmail({ naam, email, onderwerp, bericht, ontvangen: formatNow() })

  let res: Response
  try {
    res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.CONTACT_FROM ?? 'Zomer Development <mail@zomerdev.com>',
        to: [env.CONTACT_TO ?? 'info@zomerdev.com'],
        reply_to: email,
        subject: oneLine(`[Website] ${onderwerp} — ${naam}`),
        text,
        html,
      }),
    })
  } catch (err) {
    console.error('Resend onbereikbaar', err)
    return json({ ok: false, error: 'send_failed' }, 502)
  }

  if (!res.ok) {
    console.error('Resend fout', res.status, await res.text())
    return json({ ok: false, error: 'send_failed' }, 502)
  }

  return json({ ok: true })
}

// Alle andere methodes
export const onRequest = () => json({ ok: false, error: 'method_not_allowed' }, 405)

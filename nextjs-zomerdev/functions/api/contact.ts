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
  website: 'Website bouwen',
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
  const text = `Nieuw bericht via zomerdev.com\n\nNaam: ${naam}\nE-mail: ${email}\nOnderwerp: ${onderwerp}\n\n${bericht}\n`
  const html = `
    <div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#152340">
      <p style="margin:0 0 12px"><strong>Nieuw bericht via zomerdev.com</strong></p>
      <table style="border-collapse:collapse;margin-bottom:16px">
        <tr><td style="padding:2px 12px 2px 0;color:#5A6B85">Naam</td><td>${escapeHtml(naam)}</td></tr>
        <tr><td style="padding:2px 12px 2px 0;color:#5A6B85">E-mail</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding:2px 12px 2px 0;color:#5A6B85">Onderwerp</td><td>${escapeHtml(onderwerp)}</td></tr>
      </table>
      <div style="white-space:pre-wrap;border-left:3px solid #FBA728;padding-left:12px">${escapeHtml(bericht)}</div>
    </div>`

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

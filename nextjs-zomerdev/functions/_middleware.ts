/**
 * Markdown-onderhandeling voor AI-agents (Cloudflare Pages Function, draait vóór de statische pagina's).
 *
 * - `Accept: text/markdown` op een pagina geeft de Markdown-versie (public/md, gegenereerd door
 *   scripts/build-agent-files.mjs): Content-Type text/markdown en Vary: Accept. Taal: Nederlands,
 *   of Engels als Accept-Language Engels voorkeurt.
 * - Een onbekend pad blijft HTTP 404 en krijgt voor Markdown-clients een Markdown-uitleg met links.
 * - `text/html`, een browser of `*\/*` krijgen gewoon de HTML, met Vary: Accept erbij.
 *
 * Alleen GET en HEAD; /api/* en alle andere methodes gaan ongemoeid door.
 */

interface Env {
  ASSETS: { fetch: (input: string) => Promise<Response> }
}
interface Ctx {
  request: Request
  env: Env
  next: () => Promise<Response>
}

const BASE = 'https://www.zomerdev.com'

/** Pad (zonder slash aan het eind) naar de naam van de Markdown-pagina. */
export const PAGES: Record<string, string> = {
  '/': 'home',
  '/about': 'about',
  '/contact': 'contact',
  '/privacy': 'privacy',
  '/algemene-voorwaarden': 'terms',
}

type Lang = 'nl' | 'en'
interface Entry {
  value: string
  q: number
  order: number
}

function parseList(header: string | null): Entry[] {
  if (!header) return []
  return header
    .split(',')
    .map((part, order) => {
      const [value, ...params] = part.trim().split(';')
      const qParam = params.map((p) => p.trim()).find((p) => p.startsWith('q='))
      const q = qParam ? Number(qParam.slice(2)) : 1
      return { value: value.trim().toLowerCase(), q: Number.isFinite(q) ? q : 1, order }
    })
    .filter((e) => e.value !== '')
}

/**
 * Markdown wint alleen als de client text/markdown expliciet noemt met een hogere voorkeur (q) dan
 * text/html. Bij gelijke voorkeur wint wat het eerst genoemd wordt. `*\/*` alleen geeft HTML.
 */
export function wantsMarkdown(accept: string | null): boolean {
  const items = parseList(accept)
  const md = items.filter((i) => i.value === 'text/markdown' || i.value === 'text/x-markdown').sort((a, b) => b.q - a.q || a.order - b.order)[0]
  if (!md || md.q <= 0) return false
  const html = items.find((i) => i.value === 'text/html') ?? items.find((i) => i.value === 'text/*') ?? items.find((i) => i.value === '*/*')
  if (!html) return true
  if (md.q !== html.q) return md.q > html.q
  return md.order < html.order
}

/** Engels als dat een hogere voorkeur heeft dan Nederlands; anders Nederlands (de standaardtaal). */
export function prefersEnglish(acceptLanguage: string | null): boolean {
  const items = parseList(acceptLanguage)
  const q = (prefix: string) => Math.max(0, ...items.filter((i) => i.value === prefix || i.value.startsWith(prefix + '-')).map((i) => i.q))
  return q('en') > q('nl')
}

const pathOf = (url: URL) => url.pathname.replace(/\/+$/, '') || '/'

const isHtml = (res: Response) => (res.headers.get('Content-Type') ?? '').toLowerCase().includes('text/html')

function withVary(res: Response): Response {
  const headers = new Headers(res.headers)
  headers.append('Vary', 'Accept')
  return new Response(res.body, { status: res.status, statusText: res.statusText, headers })
}

function markdownResponse(request: Request, body: string, status: number, lang: Lang, canonical?: string): Response {
  const headers = new Headers({
    'Content-Type': 'text/markdown; charset=utf-8',
    Vary: 'Accept, Accept-Language',
    'Content-Language': lang,
    'Cache-Control': 'no-cache',
    'X-Content-Type-Options': 'nosniff',
  })
  if (canonical) headers.set('Link', `<${canonical}>; rel="canonical"`)
  return new Response(request.method === 'HEAD' ? null : body, { status, headers })
}

export function notFoundMarkdown(path: string, lang: Lang): string {
  const shown = path.replace(/[`\r\n]/g, '').slice(0, 100)
  if (lang === 'en') {
    return `# 404: page not found

The page \`${shown}\` does not exist on zomerdev.com. This response has HTTP status 404.

Start here instead:

- [Home](${BASE}/): services, remote IT support packages and prices
- [llms.txt](${BASE}/llms.txt): overview and when to use Zomer Development
- [Sitemap](${BASE}/sitemap.xml): all pages
- [Contact](${BASE}/contact/): get in touch with Nick Zomer
`
  }
  return `# 404: pagina niet gevonden

De pagina \`${shown}\` bestaat niet op zomerdev.com. Dit antwoord heeft HTTP-status 404.

Ga in plaats daarvan hierheen:

- [Home](${BASE}/): diensten, pakketten voor remote IT support en prijzen
- [llms.txt](${BASE}/llms.txt): overzicht en wanneer je Zomer Development inschakelt
- [Sitemap](${BASE}/sitemap.xml): alle pagina's
- [Contact](${BASE}/contact/): neem contact op met Nick Zomer
`
}

export const onRequest = async ({ request, env, next }: Ctx): Promise<Response> => {
  if (request.method !== 'GET' && request.method !== 'HEAD') return next()

  const url = new URL(request.url)
  const path = pathOf(url)
  if (path.startsWith('/api/')) return next()

  if (!wantsMarkdown(request.headers.get('Accept'))) {
    const res = await next()
    return isHtml(res) ? withVary(res) : res
  }

  const lang: Lang = prefersEnglish(request.headers.get('Accept-Language')) ? 'en' : 'nl'
  const key = PAGES[path]

  if (key) {
    try {
      const md = await env.ASSETS.fetch(new URL(`/md/${lang}/${key}.md`, url).href)
      if (md.ok) {
        const canonical = BASE + (path === '/' ? '/' : path + '/')
        return markdownResponse(request, await md.text(), 200, lang, canonical)
      }
    } catch {
      // Markdown niet beschikbaar: val terug op de gewone HTML-pagina.
    }
  }

  const res = await next()
  if (res.status === 404) return markdownResponse(request, notFoundMarkdown(path, lang), 404, lang)
  return isHtml(res) ? withVary(res) : res
}

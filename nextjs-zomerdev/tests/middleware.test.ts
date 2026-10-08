import { test } from 'node:test'
import assert from 'node:assert/strict'
import { onRequest, wantsMarkdown, prefersEnglish, notFoundMarkdown } from '../functions/_middleware.ts'

const MD: Record<string, string> = {
  '/md/nl/home.md': '# Zomer Development (NL)\n\nWebsites en remote IT support.',
  '/md/en/home.md': '# Zomer Development (EN)\n\nWebsites and remote IT support.',
  '/md/nl/privacy.md': '# Privacyverklaring\n\nNederlandse tekst.',
}

const env = {
  ASSETS: {
    fetch: async (input: string) => {
      const body = MD[new URL(input).pathname]
      return body ? new Response(body, { status: 200, headers: { 'Content-Type': 'text/markdown' } }) : new Response('nope', { status: 404 })
    },
  },
}

const html = (status = 200) => async () => new Response('<!doctype html><html><body>hallo</body></html>', { status, headers: { 'Content-Type': 'text/html; charset=utf-8' } })

const call = (path: string, headers: Record<string, string> = {}, next = html(), method = 'GET', e = env) =>
  onRequest({ request: new Request('https://zomerdev.com' + path, { method, headers }), env: e, next })

test('wantsMarkdown: alleen bij expliciet en hoger of eerder genoemd dan HTML', () => {
  const yes = ['text/markdown', 'text/markdown, text/html', 'text/markdown, text/html;q=0.9', 'text/html;q=0.5, text/markdown', 'text/x-markdown, */*;q=0.1', 'TEXT/MARKDOWN']
  const no = [null, '', '*/*', 'text/html', 'text/html,application/xhtml+xml,*/*;q=0.8', 'text/html, text/markdown', 'text/markdown;q=0', 'text/markdown;q=0.5, text/html', 'application/json']
  for (const a of yes) assert.equal(wantsMarkdown(a), true, `verwacht markdown voor ${a}`)
  for (const a of no) assert.equal(wantsMarkdown(a), false, `verwacht HTML voor ${a}`)
})

test('prefersEnglish: Nederlands is de standaard', () => {
  assert.equal(prefersEnglish(null), false)
  assert.equal(prefersEnglish('nl-NL,nl;q=0.9,en;q=0.8'), false)
  assert.equal(prefersEnglish('en-US,en;q=0.9'), true)
  assert.equal(prefersEnglish('en'), true)
  assert.equal(prefersEnglish('nl,en'), false)
  assert.equal(prefersEnglish('de-DE'), false)
})

test('Markdown voor de homepage: status, Content-Type, Vary en inhoud', async () => {
  const res = await call('/', { Accept: 'text/markdown' })
  assert.equal(res.status, 200)
  assert.match(res.headers.get('Content-Type') ?? '', /^text\/markdown/)
  assert.match(res.headers.get('Vary') ?? '', /Accept/)
  assert.equal(res.headers.get('Content-Language'), 'nl')
  assert.match(res.headers.get('Link') ?? '', /rel="canonical"/)
  assert.equal(await res.text(), MD['/md/nl/home.md'])
})

test('Markdown ook met slash aan het eind en voor andere pagina', async () => {
  const res = await call('/privacy/', { Accept: 'text/markdown' })
  assert.equal(res.status, 200)
  assert.equal(await res.text(), MD['/md/nl/privacy.md'])
})

test('Engels bij Accept-Language: en', async () => {
  const res = await call('/', { Accept: 'text/markdown', 'Accept-Language': 'en-GB,en;q=0.9' })
  assert.equal(res.headers.get('Content-Language'), 'en')
  assert.match(await res.text(), /\(EN\)/)
})

test('HTML blijft HTML en krijgt Vary: Accept', async () => {
  for (const accept of ['text/html', '*/*', 'text/html,application/xhtml+xml,*/*;q=0.8']) {
    const res = await call('/', { Accept: accept })
    assert.match(res.headers.get('Content-Type') ?? '', /text\/html/)
    assert.match(res.headers.get('Vary') ?? '', /Accept/)
    assert.match(await res.text(), /hallo/)
  }
  const none = await call('/')
  assert.match(none.headers.get('Content-Type') ?? '', /text\/html/)
})

test('onbekend pad + Markdown: status 404 met Markdown-uitleg en links', async () => {
  const res = await call('/bestaat-niet', { Accept: 'text/markdown' }, html(404))
  assert.equal(res.status, 404)
  assert.match(res.headers.get('Content-Type') ?? '', /^text\/markdown/)
  assert.match(res.headers.get('Vary') ?? '', /Accept/)
  const body = await res.text()
  assert.ok(body.length >= 20, 'minstens 20 tekens')
  assert.match(body, /llms\.txt/)
  assert.match(body, /sitemap\.xml/)
  assert.match(body, /bestaat-niet/)
})

test('onbekend pad + HTML: gewone 404 in HTML', async () => {
  const res = await call('/bestaat-niet', { Accept: 'text/html' }, html(404))
  assert.equal(res.status, 404)
  assert.match(res.headers.get('Content-Type') ?? '', /text\/html/)
  assert.match(res.headers.get('Vary') ?? '', /Accept/)
})

test('404-Markdown: pad wordt veilig getoond (geen backticks of regeleinden) en er is een Engelse versie', () => {
  const nl = notFoundMarkdown('/x`\n# hack', 'nl')
  assert.ok(!/x`\n#/.test(nl))
  assert.match(notFoundMarkdown('/x', 'en'), /page not found/)
})

test('API en andere methodes gaan ongemoeid door', async () => {
  let calls = 0
  const next = async () => {
    calls++
    return new Response('{"ok":true}', { headers: { 'Content-Type': 'application/json' } })
  }
  const api = await call('/api/contact', { Accept: 'text/markdown' }, next, 'GET')
  assert.equal(await api.text(), '{"ok":true}')
  assert.equal(api.headers.get('Vary'), null)
  const post = await call('/', { Accept: 'text/markdown' }, next, 'POST')
  assert.equal(await post.text(), '{"ok":true}')
  assert.equal(calls, 2)
})

test('HEAD met Markdown geeft headers zonder body', async () => {
  const res = await call('/', { Accept: 'text/markdown' }, html(), 'HEAD')
  assert.equal(res.status, 200)
  assert.match(res.headers.get('Content-Type') ?? '', /^text\/markdown/)
  assert.equal(await res.text(), '')
})

test('als de Markdown-bestanden ontbreken of falen, valt hij terug op HTML', async () => {
  const broken = { ASSETS: { fetch: async () => { throw new Error('boem') } } }
  const res = await call('/', { Accept: 'text/markdown' }, html(), 'GET', broken)
  assert.equal(res.status, 200)
  assert.match(res.headers.get('Content-Type') ?? '', /text\/html/)
  const missing = { ASSETS: { fetch: async () => new Response('nope', { status: 404 }) } }
  const res2 = await call('/', { Accept: 'text/markdown' }, html(), 'GET', missing)
  assert.match(res2.headers.get('Content-Type') ?? '', /text\/html/)
})

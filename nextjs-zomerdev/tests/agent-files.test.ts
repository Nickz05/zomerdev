import { test, before } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = join(import.meta.dirname, '..')
const read = (rel: string) => readFileSync(join(root, rel), 'utf8')
const PAGES = ['home', 'about', 'contact', 'privacy', 'terms']

before(() => {
  execFileSync(process.execPath, ['--experimental-strip-types', '--no-warnings', join(root, 'scripts/build-agent-files.mjs')], { cwd: root, stdio: 'pipe' })
})

test('llms.txt volgt llmstxt.org en bevat concrete "wanneer inschakelen"-richtlijnen', () => {
  const s = read('public/llms.txt')
  assert.match(s, /^# Zomer Development/m)
  assert.match(s, /^> /m, 'samenvatting als blockquote')
  assert.match(s, /^## Wanneer inschakelen/m)
  assert.match(s, /op maat/i)
  assert.match(s, /remote IT/i)
  assert.match(s, /info@zomerdev\.com/)
  assert.match(s, /€ 50 per uur/)
  assert.match(s, /4 uur op werkdagen/)
  assert.match(s, /^## English/m)
  assert.ok(!s.includes('[['), 'geen placeholders')
})

test('alle links in llms.txt verwijzen naar bestaande pagina’s', () => {
  const s = read('public/llms.txt')
  const sitemap = read('public/sitemap.xml')
  const links = [...s.matchAll(/\]\((https:\/\/www\.zomerdev\.com[^)]*)\)/g)].map((m) => m[1])
  assert.ok(links.length >= 5)
  for (const l of links) {
    const path = l.replace('https://www.zomerdev.com', '')
    const known = path === '/llms.txt' || path === '/sitemap.xml' || sitemap.includes(`<loc>${l}</loc>`)
    assert.ok(known, `onbekende link in llms.txt: ${l}`)
  }
})

test('Markdown-pagina’s bestaan in NL en EN en zijn niet leeg of vol placeholders', () => {
  for (const lang of ['nl', 'en']) {
    for (const p of PAGES) {
      const md = read(`public/md/${lang}/${p}.md`)
      assert.match(md, /^# /m, `${lang}/${p} heeft een kop`)
      assert.ok(md.length > 500, `${lang}/${p} is te kort (${md.length})`)
      assert.ok(!md.includes('[['), `${lang}/${p} bevat een placeholder`)
    }
  }
})

test('vertrouwenspagina’s hebben genoeg inhoud (>= 500 tekens) en noemen bedrijfsgegevens', () => {
  for (const lang of ['nl', 'en']) {
    for (const p of ['about', 'contact', 'privacy']) assert.ok(read(`public/md/${lang}/${p}.md`).length >= 500)
    assert.match(read(`public/md/${lang}/contact.md`), /98115561/)
    assert.match(read(`public/md/${lang}/contact.md`), /info@zomerdev\.com/)
  }
})

test('prijzen in Markdown komen uit dezelfde bron als de site', () => {
  assert.match(read('public/md/nl/home.md'), /vanaf € 50 per uur/)
  assert.match(read('public/md/en/home.md'), /from € 50 per hour/)
  assert.match(read('public/md/nl/home.md'), /Op aanvraag/)
})

test('schema bevat contactPoint met e-mail en contactType, en een adres', () => {
  const ld = JSON.parse(read('src/app/jsonld.json'))
  const biz = ld['@graph'].find((x: { '@type': string }) => x['@type'] === 'LocalBusiness')
  assert.ok(Array.isArray(biz.contactPoint) && biz.contactPoint.length >= 1)
  for (const cp of biz.contactPoint) {
    assert.equal(cp['@type'], 'ContactPoint')
    assert.equal(cp.email, 'info@zomerdev.com')
    assert.ok(cp.contactType)
  }
  assert.equal(biz.address['@type'], 'PostalAddress')
  assert.ok(biz.address.addressLocality)
})

test('robots.txt laat AI-agents toe en noemt de sitemap', () => {
  const r = read('public/robots.txt')
  for (const bot of ['ClaudeBot', 'GPTBot', 'ChatGPT-User', 'PerplexityBot', 'Google-Extended', 'ora-agent']) assert.match(r, new RegExp(`User-agent: ${bot}`))
  assert.ok(!/^Disallow:/m.test(r), 'geen Disallow-regels')
  assert.match(r, /Sitemap: https:\/\/www\.zomerdev\.com\/sitemap\.xml/)
})

test('sitemap bevat alle vertrouwenspagina’s', () => {
  const s = read('public/sitemap.xml')
  for (const p of ['/about/', '/contact/', '/privacy/', '/algemene-voorwaarden/']) assert.ok(s.includes(`https://www.zomerdev.com${p}`), p)
})

test('_routes.json sluit statische bestanden uit maar laat pagina’s en /api door de Function gaan', () => {
  const r = JSON.parse(read('public/_routes.json'))
  assert.deepEqual(r.include, ['/*'])
  for (const p of ['/_next/*', '/md/*', '/llms.txt', '/robots.txt', '/sitemap.xml']) assert.ok(r.exclude.includes(p), p)
})

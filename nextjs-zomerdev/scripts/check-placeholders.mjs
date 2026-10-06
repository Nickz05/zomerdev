// Faalt zolang er nog [[placeholders]] in de teksten of config staan (voor je live gaat).
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const roots = ['src/i18n', 'src/config']
// Optioneel: de testimonials-sectie blijft verborgen zolang daar placeholders staan.
const skip = new Set(['testimonials.ts'])
const hits = []

function walk(dir) {
  let entries = []
  try { entries = readdirSync(dir) } catch { return }
  for (const name of entries) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p)
    else if (/\.(ts|tsx)$/.test(name) && !skip.has(name)) {
      readFileSync(p, 'utf8').split('\n').forEach((line, i) => {
        for (const m of line.matchAll(/\[\[(.+?)\]\]/g)) hits.push(`${p}:${i + 1}  [[${m[1]}]]`)
      })
    }
  }
}

roots.forEach(walk)
if (hits.length) {
  console.error(`${hits.length} placeholder(s) nog in te vullen:\n` + hits.join('\n'))
  process.exit(1)
}
console.log('Geen placeholders meer.')

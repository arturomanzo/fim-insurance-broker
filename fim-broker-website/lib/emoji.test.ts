import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'
import { leggiSegno, senzaEmoji } from './senzaEmoji.ts'

// Dal 22/11/2026 il sito non ha emoji: al loro posto le icone di lib/icone.ts.
// Si guardano i testi e le stringhe, non i commenti.
const RADICE = fileURLToPath(new URL('..', import.meta.url))
const SIMBOLO = /(?![©®™↔↕])\p{Extended_Pictographic}|[\u{1F1E6}-\u{1F1FF}✓✔✕✖✗✘★☆✦↗]/u
const ENTITA = /&#(?:x(?:1F[0-9A-F]{3}|2[67][0-9A-F]{2})|12[789]\d{3}|9[789]\d\d|10[01]\d\d);|&(?:check|cross|starf);/i
// mail e avvisi interni; e il file che i segni li deve riconoscere
const FUORI = ['app/api/', 'lib/ivass-watcher/', 'lib/senzaEmoji.ts']

function file(cartella: string): string[] {
  return readdirSync(`${RADICE}/${cartella}`, { withFileTypes: true }).flatMap((e) => {
    const p = `${cartella}/${e.name}`
    if (e.isDirectory()) return file(p)
    return /\.tsx?$/.test(p) && !p.includes('.test.') && !FUORI.some((f) => p.startsWith(f)) ? [p] : []
  })
}

test('niente emoji nelle pagine, nei componenti e nei testi di lib', () => {
  const trovate: string[] = []
  for (const p of ['app', 'components', 'lib'].flatMap(file)) {
    const sorgente = ts.createSourceFile(p, readFileSync(`${RADICE}/${p}`, 'utf8'), ts.ScriptTarget.Latest, true)
    const visita = (n: ts.Node): void => {
      if (ts.isStringLiteralLike(n) || ts.isJsxText(n) || ts.isTemplateHead(n) || ts.isTemplateMiddle(n) || ts.isTemplateTail(n)) {
        if (SIMBOLO.test(n.text) || ENTITA.test(n.text)) {
          trovate.push(`${p}:${sorgente.getLineAndCharacterOfPosition(n.getStart()).line + 1} ${n.text.trim().slice(0, 60)}`)
        }
      }
      ts.forEachChild(n, visita)
    }
    visita(sorgente)
  }
  assert.deepEqual(trovate, [], 'usa <Icona forma={...} /> (components/icons/TettoIcons.tsx)')
})

test('blog: solo i segni coperto/escluso/attenzione, a inizio riga', () => {
  const dati = JSON.parse(readFileSync(`${RADICE}/data/blog-posts.json`, 'utf8'))
  const trovate: string[] = []
  for (const post of Array.isArray(dati) ? dati : dati.posts) {
    const testi = [post.title, post.excerpt, post.seoTitle, post.seoDescription]
    for (const s of post.sections ?? []) {
      testi.push(s.heading, s.body)
      for (const riga of s.list ?? []) testi.push(riga.replace(/^(?:✅|❌|⚠️?)\s*/u, ''))
    }
    for (const t of testi) if (t && SIMBOLO.test(t)) trovate.push(`${post.slug}: ${t.slice(0, 60)}`)
  }
  assert.deepEqual(trovate, [])
})

test('un\'esclusione resta un\'esclusione', () => {
  assert.deepEqual(leggiSegno('❌ Danni intenzionali'), { segno: 'no', testo: 'Danni intenzionali' })
  assert.deepEqual(leggiSegno('✅ Spese legali'), { segno: 'si', testo: 'Spese legali' })
  assert.deepEqual(leggiSegno('- ⚠️ Denuncia subito'), { segno: 'attenzione', testo: 'Denuncia subito' })
  assert.deepEqual(leggiSegno('RC auto'), { segno: null, testo: 'RC auto' })
})

test('le risposte degli assistenti perdono le emoji, non il testo', () => {
  assert.equal(senzaEmoji('📞 06 96883381'), '06 96883381')
  assert.equal(senzaEmoji('Ciao 👋🏽 Arturo'), 'Ciao Arturo')
  assert.equal(senzaEmoji('👨‍👩‍👧 Famiglia ❤️'), 'Famiglia ')
  assert.equal(senzaEmoji('Reg. © FIM® → riga • 24/7 #1'), 'Reg. © FIM® → riga • 24/7 #1')
})

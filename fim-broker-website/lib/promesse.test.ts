// Controlla che nel sito non tornino prezzi e promesse (decisione di Arturo,
// 25/10/2026) — `npm test`. Il premio lo calcola la compagnia: un "da 250€/anno",
// un "al miglior prezzo" o una "risposta garantita" sono impegni che nessuno ha
// verificato, e sul sito di un intermediario sono materiale IVASS.
// Se un caso legittimo finisce qui dentro, riscrivi la frase: non allargare i filtri.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const RADICE = join(import.meta.dirname, '..')
const CARTELLE = ['app', 'components', 'lib']

const VIETATE: Array<{ re: RegExp; cosa: string }> = [
  { re: /\b(?:price|priceFrom):\s*'(?:da|a partire da)\s/i, cosa: 'prezzo "da X" in una scheda' },
  { re: /\b(?:price|from|to):\s*'[\d.,]+\s*€/i, cosa: 'prezzo in una tabella o in un pacchetto' },
  { re: /\bsi parte da circa\s+\d/i, cosa: 'prezzo di partenza' },
  { re: /Totale indicativo/, cosa: 'totale di un pacchetto' },
  { re: /\bmiglior[ei]?\s+prezz[oi]/i, cosa: 'miglior prezzo' },
  { re: /\bprezzo migliore\b/i, cosa: 'miglior prezzo' },
  { re: /\bpiù convenient[ei]\b/i, cosa: 'promessa di convenienza' },
  { re: /\brisparmi\w*\s+fino\s+al\b/i, cosa: 'risparmio quantificato' },
  { re: /\bspesa\s+fino\s+al\b/i, cosa: 'risparmio quantificato' },
  { re: /\bfino\s+al\s+\d+\s*%\s+di\s+sconto\b/i, cosa: 'sconto quantificato' },
  { re: /\bgarantit[ao]\s+entro\b/i, cosa: 'tempo di risposta garantito' },
  { re: /\bsenza sorprese\b/i, cosa: 'promessa implicita di copertura' },
  { re: /\btutela è garantita\b/i, cosa: 'garanzia di tutela' },
]

function fileSorgente(cartella: string): string[] {
  return readdirSync(join(RADICE, cartella), { recursive: true, encoding: 'utf-8' })
    .filter((f) => /\.tsx?$/.test(f) && !/\.test\.tsx?$/.test(f))
    .map((f) => join(cartella, f))
}

test('nessun prezzo e nessuna promessa nelle pagine del sito', () => {
  const trovate: string[] = []
  for (const file of CARTELLE.flatMap(fileSorgente)) {
    const righe = readFileSync(join(RADICE, file), 'utf-8').split('\n')
    righe.forEach((riga, i) => {
      for (const { re, cosa } of VIETATE) {
        const m = riga.match(re)
        if (m) trovate.push(`${file}:${i + 1} — ${cosa}: «${m[0]}»`)
      }
    })
  }
  assert.deepEqual(trovate, [], `\n${trovate.join('\n')}`)
})

test('i filtri riconoscono le frasi che hanno già fatto danni', () => {
  const esempi = [
    "price: 'da 150€/anno',",
    "{ name: 'RC Impresa', price: '400€/anno' },",
    'Polizze auto e moto al miglior prezzo',
    'il preventivo più conveniente',
    "'Risparmio fino al 30%',",
    'Risposta garantita entro 24 ore lavorative',
    'Copertura completa, senza sorprese',
  ]
  for (const esempio of esempi) {
    assert.ok(VIETATE.some(({ re }) => re.test(esempio)), `non riconosciuta: ${esempio}`)
  }
})

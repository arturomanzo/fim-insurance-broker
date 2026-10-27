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
// Gli articoli del blog stanno in un JSON: valgono le stesse regole delle pagine.
const DATI = ['data/blog-posts.json']

const VIETATE: Array<{ re: RegExp; cosa: string }> = [
  { re: /\b(?:price|priceFrom):\s*'(?:da|a partire da)\s/i, cosa: 'prezzo "da X" in una scheda' },
  { re: /\b(?:price|from|to):\s*'[\d.,]+\s*€/i, cosa: 'prezzo in una tabella o in un pacchetto' },
  { re: /\bpart[eo]n?o?\s+da\s+(?:circa\s+|poche\s+)?(?:\d|centinaia)/i, cosa: 'prezzo di partenza' },
  { re: /\bcosta\s+poche\s+centinaia\b/i, cosa: 'prezzo di partenza' },
  { re: /€\s?\d[\d.,]*\s*[–-]\s*€?\s?\d/, cosa: 'fascia di prezzo' },
  { re: /\bspesa tipica\b/i, cosa: 'fascia di prezzo' },
  { re: /\d[\d.,]*\s?€\s*(?:[–-]|e|a)\s*\d[\d.,]*\s?€/, cosa: 'fascia di prezzo' },
  { re: /\bsi ripaga\b/i, cosa: 'promessa di rientro della spesa' },
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
  { re: /\b(?:in|entro)\s+(?:24|48)\s*ore\b/i, cosa: 'tempo promesso: per il ricontatto usa RICONTATTO (lib/tempi.ts)' },
  { re: /\b(?:24|48)h\b(?!\/)/i, cosa: 'tempo promesso: per il ricontatto usa RICONTATTO (lib/tempi.ts)' },
  { re: /\btempi rapidi\b/i, cosa: 'promessa sui tempi di liquidazione' },
  { re: /\btasso di liquidazione\b/i, cosa: 'numero promozionale senza fonte' },
  { re: /['"]Sinistri gestiti['"]/, cosa: 'numero promozionale senza fonte' },
  { re: /\btutto il mercato\b/i, cosa: 'copertura del mercato non documentata: le compagnie sono 20' },
  { re: /\bmigliori\s+(?:compagnie|offerte|soluzioni)\b|\bsoluzioni\s+migliori\b/i, cosa: 'superlativo non verificabile' },
  { re: /\bnessun\s+competitor\b|\bleader\s+mondial/i, cosa: 'confronto con i concorrenti non verificabile' },
  { re: /nessun costo di intermediazione|senza costi aggiuntivi rispetto all'acquisto diretto/i, cosa: 'il compenso del broker è la provvigione compresa nel premio' },
  { re: /\bpaghi troppo\b/i, cosa: 'promessa implicita di risparmio' },
  { re: /\b(?:1[.,]22|6[.,]07)\s*milion|\b(?:1\.220|6\.070)\.000\b/i, cosa: 'massimali RC superati: oggi 6.450.000 € persone e 1.300.000 € cose (art. 128 CAP)' },
]

// Le parole che il CLAUDE.md vieta nei testi. Valgono per ciò che si legge sul
// sito, non per i commenti del codice: le righe di commento si saltano.
const PAROLE_VIETATE = /\b(?:fondamental[ei]|inoltre|panorama|in conclusione|crucial[ei]|sinergi[ae])\b|\bnon solo\b.*\bma anche\b/i
const COMMENTO = /^\s*(?:\/\/|\/?\*)/

function fileSorgente(cartella: string): string[] {
  return readdirSync(join(RADICE, cartella), { recursive: true, encoding: 'utf-8' })
    .filter((f) => /\.tsx?$/.test(f) && !/\.test\.tsx?$/.test(f))
    .map((f) => join(cartella, f))
}

test('nessun prezzo e nessuna promessa nelle pagine del sito', () => {
  const trovate: string[] = []
  for (const file of [...CARTELLE.flatMap(fileSorgente), ...DATI]) {
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

test('nessuna parola vietata nei testi del sito', () => {
  const trovate: string[] = []
  for (const file of [...CARTELLE.flatMap(fileSorgente), ...DATI]) {
    const righe = readFileSync(join(RADICE, file), 'utf-8').split('\n')
    righe.forEach((riga, i) => {
      if (COMMENTO.test(riga)) return
      const m = riga.match(PAROLE_VIETATE)
      if (m) trovate.push(`${file}:${i + 1} — «${m[0]}»`)
    })
  }
  assert.deepEqual(trovate, [], `\n${trovate.join('\n')}`)
})

// Le statistiche di mercato ("il 68% delle PMI...") restano solo se portano
// accanto la fonte con l'anno tra parentesi, per esempio "(Cyber Index PMI 2024)".
// Senza fonte sono numeri che nessuno può controllare (decisione del 26/10/2026).
const STATISTICA = /\b\d{1,3}(?:[.,]\d)?\s?%\s+(?:delle|dei|degli)\s+(?:PMI|famiglie|aziende|imprese|case|comuni|attacchi|incidenti)\b/i
const FONTE = /\([^)]*\b(?:19|20)\d{2}\)/

test('nessuna statistica di mercato senza fonte', () => {
  const trovate: string[] = []
  for (const file of [...CARTELLE.flatMap(fileSorgente), ...DATI]) {
    const righe = readFileSync(join(RADICE, file), 'utf-8').split('\n')
    righe.forEach((riga, i) => {
      if (COMMENTO.test(riga)) return
      const m = riga.match(STATISTICA)
      if (m && !FONTE.test(riga)) trovate.push(`${file}:${i + 1} — «${m[0]}»`)
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
    "parte da circa 100-150€ all'anno",
    'La polizza costa poche centinaia di euro.',
    'in molti casi si ripaga in pochi anni',
    "rc: '€1.800–4.500',",
    'la spesa tipica è tra €2.800 e €12.000 annui',
    'Preventivo gratuito in 24 ore.',
    'Ti ricontatteremo entro 48 ore lavorative.',
    "{ num: '< 24h', label: 'Presa in carico' },",
    'con tempi rapidi e assistenza completa',
    'si colloca tipicamente tra 350€ e 600€ per dipendente all\'anno',
    "'✓ Nessun costo di intermediazione',",
    'Esclusivo · Gratis · Nessun competitor lo fa',
    'Accesso alle migliori compagnie del mercato',
    "{ num: '94%', label: 'Tasso di liquidazione' },",
    "{ label: '20 compagnie', desc: 'Confronto su tutto il mercato italiano' },",
    'Il massimale minimo per legge è di 6,45 milioni di euro per danni a persone e 1,22 milioni per danni a cose.',
  ]
  for (const esempio of esempi) {
    assert.ok(VIETATE.some(({ re }) => re.test(esempio)), `non riconosciuta: ${esempio}`)
  }
  for (const esempio of ['Protezione fondamentale per qualsiasi attività', 'Il regolamento può inoltre prevedere']) {
    assert.ok(PAROLE_VIETATE.test(esempio), `non riconosciuta: ${esempio}`)
  }
  assert.ok(COMMENTO.test('  // fondamentale per E-E-A-T'))
  assert.ok(STATISTICA.test('il 68% delle PMI italiane ha subìto almeno un attacco'))
  assert.ok(!FONTE.test('il 68% delle PMI italiane ha subìto almeno un attacco'))
  assert.ok(FONTE.test('Solo il 21% delle PMI italiane ha una polizza cyber (Cyber Index PMI 2024).'))
})

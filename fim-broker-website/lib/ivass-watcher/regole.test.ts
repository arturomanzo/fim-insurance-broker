// Test di lib/ivass-watcher/regole.ts — `npm test` (node --test, Node 22.18 o successivo).
// Le voci sono quelle vere del feed IVASS del 1° ottobre 2026.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { applyNormativeFloor, filtraScadenza, isContributoRui, isOpaco } from './regole.ts'
import type { RssItem } from './rss.ts'
import type { Source } from './sources.ts'

const IVASS = { id: 'ivass', label: 'IVASS — Sito istituzionale', url: '', prefilter: null } as Source
const GAZZETTA = { id: 'gazzetta-sg', label: 'Gazzetta', url: '', prefilter: null } as Source

function voce(title: string, description = ''): RssItem {
  return { title, description, link: 'https://www.ivass.it/', pubDate: null, guid: title }
}

const CONTRIBUTO_NEWS = voce("Contributo di vigilanza per l'anno 2026 a carico delle imprese e degli intermediari")
const PROVV_173 = voce(
  'Provvedimento n. 173 del 1 ottobre 2026',
  "Contributo di vigilanza per l'anno 2026 a carico degli iscritti nel registro unico degli intermediari assicurativi, anche a titolo accessorio, e riassicurativi",
)
const PROVV_174 = voce(
  'Provvedimento n. 174 del 01 ottobre 2026',
  "Contributo di vigilanza per l'anno 2026 a carico degli intermediari con sede legale negli stati aderenti allo spazio economico europeo ammessi ad operare in Italia in regime di stabilimento o di libera prestazione di servizi",
)
const LETTERA_IMPRESE = voce(
  'Lettera al mercato del 1 ottobre 2026',
  'Contributo di vigilanza anno 2026 a carico delle imprese vigilate',
)
const GENERTEL = voce(
  'Provvedimento n. 0217042 del 30 settembre 2026',
  'Autorizzazione al trasferimento del portafoglio assicurativo di Genertel SpA, avente ad oggetto i contratti stipulati in regime di libertà di prestazione di servizi in Polonia',
)

test('isOpaco: descrizione vuota o di servizio', () => {
  assert.equal(isOpaco(voce('Lettera al mercato del 1 ottobre 2026')), true)
  assert.equal(isOpaco(voce('Imprese italiane r.c. auto', '(aggiornato al 01.10.2026)')), true)
  assert.equal(isOpaco(LETTERA_IMPRESE), false)
  assert.equal(isOpaco(GENERTEL), false)
})

test('isContributoRui: solo il contributo che paga FIM', () => {
  assert.equal(isContributoRui(CONTRIBUTO_NEWS), true)
  assert.equal(isContributoRui(PROVV_173), true)
  assert.equal(isContributoRui(PROVV_174), false)
  assert.equal(isContributoRui(LETTERA_IMPRESE), false)
})

test('contributo RUI sempre high, con la nota anche se il modello ci era arrivato', () => {
  assert.deepEqual(applyNormativeFloor(PROVV_173, IVASS, 'medium'), {
    relevance: 'high',
    elevazione: 'contributo-rui',
  })
  assert.deepEqual(applyNormativeFloor(CONTRIBUTO_NEWS, IVASS, 'high'), {
    relevance: 'high',
    elevazione: 'contributo-rui',
  })
})

test('atto con descrizione chiara: vale il giudizio del modello', () => {
  assert.deepEqual(applyNormativeFloor(LETTERA_IMPRESE, IVASS, 'none'), { relevance: 'none', elevazione: null })
  assert.deepEqual(applyNormativeFloor(GENERTEL, IVASS, 'none'), { relevance: 'none', elevazione: null })
  assert.deepEqual(applyNormativeFloor(PROVV_174, IVASS, 'low'), { relevance: 'low', elevazione: null })
})

test('atto opaco: resta la rete prudenziale', () => {
  assert.deepEqual(applyNormativeFloor(voce('Lettera al mercato del 1 ottobre 2026'), IVASS, 'low'), {
    relevance: 'high',
    elevazione: 'opaco',
  })
  assert.deepEqual(applyNormativeFloor(voce('Regolamento IVASS n. 60'), IVASS, 'high'), {
    relevance: 'high',
    elevazione: null,
  })
  assert.deepEqual(applyNormativeFloor(voce('Provvedimento n. 0124143'), IVASS, 'none'), {
    relevance: 'medium',
    elevazione: 'opaco',
  })
  assert.deepEqual(applyNormativeFloor(voce('Provvedimento n. 0124143'), IVASS, 'low'), {
    relevance: 'low',
    elevazione: null,
  })
})

test('le regole valgono solo per il feed IVASS', () => {
  assert.deepEqual(applyNormativeFloor(PROVV_173, GAZZETTA, 'low'), { relevance: 'low', elevazione: null })
})

test('filtraScadenza: niente termine nel testo, niente scadenza', () => {
  assert.equal(filtraScadenza(CONTRIBUTO_NEWS, '2026-12-31'), null)
  assert.equal(filtraScadenza(PROVV_173, '2026-10-31'), null)
  assert.equal(filtraScadenza(PROVV_173, null), null)
})

test('filtraScadenza: termine scritto nel testo, scadenza conservata', () => {
  const conTermine = voce('Provvedimento n. 200', 'Il versamento va effettuato entro il 30 novembre 2026')
  assert.equal(filtraScadenza(conTermine, '2026-11-30'), '2026-11-30')
  assert.equal(filtraScadenza(conTermine, '   '), null)
  assert.equal(filtraScadenza(conTermine, 42), null)
})

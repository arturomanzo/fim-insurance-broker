// Test di lib/analisiPolizza.ts — `npm test` (node --test, Node 22.18 o successivo).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { riepilogoAnalisi, tipoLeadAnalisi } from './analisiPolizza.ts'

const REPORT = {
  compagnia: 'Compagnia Esempio S.p.A.',
  tipoPolizza: 'Casa',
  numPolizza: '000000TEST',
  scadenza: '01/01/2027',
  premio: '412,00 €',
  lacune: [
    { titolo: 'Danni da acqua esclusi', urgenza: 'alta', descrizione: 'non deve entrare' },
    { titolo: 'Catastrofali escluse', urgenza: 'media', descrizione: 'non deve entrare' },
  ],
  raccomandazioni: [{ titolo: 'Aggiungere i danni da acqua', priorita: 'alta', descrizione: 'x' }],
  valutazioneGlobale: { punteggio: 5, giudizio: 'Copertura base con lacune', sintesi: 'x' },
}

test('tipoLeadAnalisi: la polizza analizzata, o la dicitura generica', () => {
  assert.equal(tipoLeadAnalisi(REPORT), 'Analisi polizza Casa')
  assert.equal(tipoLeadAnalisi({ tipoPolizza: 'Non rilevato' }), 'Analisi polizza')
  assert.equal(tipoLeadAnalisi({ tipoPolizza: null }), 'Analisi polizza')
  assert.ok(tipoLeadAnalisi({ tipoPolizza: 'x'.repeat(300) }).length <= 100)
})

test('riepilogoAnalisi: dati utili per richiamare, niente numero di polizza', () => {
  const r = riepilogoAnalisi(REPORT)
  assert.match(r, /Compagnia: Compagnia Esempio S\.p\.A\./)
  assert.match(r, /Scadenza: 01\/01\/2027/)
  assert.match(r, /Premio indicato nel documento: 412,00 €/)
  assert.match(r, /Valutazione AI: 5\/10 — Copertura base con lacune/)
  assert.match(r, /• Danni da acqua esclusi \(urgenza alta\)/)
  assert.match(r, /• Aggiungere i danni da acqua \(priorità alta\)/)
  assert.match(r, /Il PDF non è stato salvato/)
  assert.doesNotMatch(r, /000000TEST/)
  assert.doesNotMatch(r, /non deve entrare/)
})

test('riepilogoAnalisi: campi mancanti non lasciano righe vuote', () => {
  const r = riepilogoAnalisi({ compagnia: 'Non rilevato', scadenza: null, premio: null, lacune: [], raccomandazioni: null })
  assert.doesNotMatch(r, /Compagnia:|Scadenza:|Premio|Lacune:|Raccomandazioni:|Valutazione/)
  assert.doesNotMatch(r, /\n\n\n/)
})

test('riepilogoAnalisi: al massimo cinque voci per elenco e 2.000 caratteri', () => {
  const tante = Array.from({ length: 12 }, (_, i) => ({ titolo: `Lacuna ${i} ${'y'.repeat(300)}`, urgenza: 'bassa' }))
  const r = riepilogoAnalisi({ lacune: tante })
  assert.equal((r.match(/• Lacuna/g) ?? []).length, 5)
  assert.ok(r.length <= 2000)
})

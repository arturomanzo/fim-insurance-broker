// Test di lib/whatsappSito.ts — `npm test` (node --test, Node 22.18 o successivo).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { linkWhatsApp, percorsoPulito, testoConPagina } from './whatsappSito.ts'

test('percorsoPulito: tiene solo il percorso, senza query né ancora', () => {
  assert.equal(percorsoPulito('/soluzioni/scuole?utm_source=google#form'), '/soluzioni/scuole')
  assert.equal(percorsoPulito('/'), '/')
  assert.equal(percorsoPulito('/Blog/Polizza-Casa'), '/blog/polizza-casa')
})

test('percorsoPulito: niente indirizzi strani o assoluti', () => {
  assert.equal(percorsoPulito('https://altro.it/x'), null)
  assert.equal(percorsoPulito('/area-cliente/polizza/12 <script>'), null)
  assert.equal(percorsoPulito(null), null)
  assert.equal(percorsoPulito(''), null)
})

test('testoConPagina: il riferimento in fondo, leggibile', () => {
  assert.equal(testoConPagina('Ciao, vorrei informazioni', '/soluzioni/scuole'), 'Ciao, vorrei informazioni (rif. fimbroker.it/soluzioni/scuole)')
  assert.equal(testoConPagina('Ciao', null), 'Ciao')
})

test('linkWhatsApp: testo codificato con il riferimento', () => {
  const url = new URL(linkWhatsApp('Ciao, vorrei un preventivo assicurativo', '/'))
  assert.equal(url.hostname, 'wa.me')
  assert.equal(url.searchParams.get('text'), 'Ciao, vorrei un preventivo assicurativo (rif. fimbroker.it/)')
})

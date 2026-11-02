// Le regole di stile che il generatore del blog deve rispettare (scripts/lib/blog-guardrails.mjs).
// `npm test` (node --test, Node 22.18 o successivo).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { caricaRegistro, controllaPost } from '../scripts/lib/blog-guardrails.mjs'

const registro = caricaRegistro()
const errori = (corpo: string) =>
  controllaPost({ slug: 'prova', title: 'Prova', excerpt: '', sections: [{ heading: 'Prova', body: corpo }] }, registro, { severo: true })
    .errori

test('«non solo... ma» nella stessa frase è vietato', () => {
  assert.equal(errori('La polizza non solo copre i danni, ma anche la tutela legale.').length, 1)
  assert.equal(errori('Non solo comporta interessi di mora, ma può portare a procedure esecutive.').length, 1)
})

test('«non solo» da solo va bene, anche con un «ma» nella frase dopo', () => {
  assert.deepEqual(errori('Controlla i sublimiti, non solo il massimale.'), [])
  assert.deepEqual(errori('Si naviga molto, e non solo d\'estate. Navigare è bello, ma rischioso.'), [])
})

test('sinergia e «in un mondo in cui» sono vietate come le altre parole da AI', () => {
  assert.equal(errori('Una sinergia tra broker e cliente.').length, 1)
  assert.equal(errori('In un mondo in cui tutto cambia, la polizza resta.').length, 1)
})

test('l\'esperienza di FIM data per fatto è vietata', () => {
  assert.equal(errori('Nella mia esperienza le chiamate arrivano quasi sempre per tre motivi.').length, 2)
  assert.equal(errori('Sono scenari che vediamo sempre più spesso tra i nostri clienti.').length, 2)
  assert.equal(errori('Queste sono le situazioni in cui i nostri clienti ci dicono di aver apprezzato la differenza.').length, 1)
})

test('il tono del broker senza casistica inventata va bene', () => {
  assert.deepEqual(errori('Capisco la resistenza, ma è un rischio d\'impresa come gli altri.'), [])
  assert.deepEqual(errori('Il punto che vedo trascurato è un altro: chi paga il danno.'), [])
})

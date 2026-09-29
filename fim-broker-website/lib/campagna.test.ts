// Test di lib/campagna.ts — `npm test` (node --test, Node 22.18 o successivo).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  aggiungiClic,
  hostEsterno,
  leggiArrivo,
  pulisciCampagna,
  senzaClic,
  soloClic,
} from './campagna.ts'

const ADESSO = new Date('2026-10-01T08:30:00.000Z')

test('pulisciCampagna: niente oggetto, niente campagna', () => {
  assert.equal(pulisciCampagna(undefined), undefined)
  assert.equal(pulisciCampagna(null), undefined)
  assert.equal(pulisciCampagna('utm_source=google'), undefined)
  assert.equal(pulisciCampagna(['google']), undefined)
  assert.equal(pulisciCampagna({}), undefined)
})

test('pulisciCampagna: tiene solo i campi previsti e solo stringhe', () => {
  const c = pulisciCampagna({
    utm_source: 'google',
    utm_medium: 42,
    utm_campaign: { nome: 'x' },
    email: 'mario@example.com',
    __proto__: { utm_term: 'eredità' },
  })
  assert.deepEqual(c, { utm_source: 'google' })
})

test('pulisciCampagna: toglie spazi e caratteri di controllo, scarta i vuoti', () => {
  const c = pulisciCampagna({ utm_source: '  google\n', utm_medium: '   ', utm_term: 'rc\u0000 auto' })
  assert.deepEqual(c, { utm_source: 'google', utm_term: 'rc auto' })
})

test('pulisciCampagna: taglia a 200 caratteri', () => {
  const c = pulisciCampagna({ utm_campaign: 'a'.repeat(500) })
  assert.equal(c?.utm_campaign?.length, 200)
})

test('pulisciCampagna: gclid e fbclid solo con caratteri da identificativo', () => {
  assert.deepEqual(pulisciCampagna({ gclid: 'Cj0KCQjw-abc_123', fbclid: 'IwAR<script>' }), { gclid: 'Cj0KCQjw-abc_123' })
})

test('pulisciCampagna: referrer_esterno è un host e mai fimbroker.it', () => {
  assert.deepEqual(pulisciCampagna({ referrer_esterno: 'WWW.Google.com' }), { referrer_esterno: 'www.google.com' })
  assert.equal(pulisciCampagna({ referrer_esterno: 'https://www.google.com/search' }), undefined)
  assert.equal(pulisciCampagna({ referrer_esterno: 'www.fimbroker.it' }), undefined)
  assert.equal(pulisciCampagna({ referrer_esterno: 'fimbroker.it' }), undefined)
})

test('pulisciCampagna: pagina_arrivo è un percorso senza query string', () => {
  assert.deepEqual(pulisciCampagna({ pagina_arrivo: '/preventivo?gclid=abc#form' }), { pagina_arrivo: '/preventivo' })
  assert.equal(pulisciCampagna({ pagina_arrivo: 'https://evil.example/x' }), undefined)
})

test('pulisciCampagna: arrivato_il solo se è una data ISO valida', () => {
  assert.deepEqual(pulisciCampagna({ arrivato_il: '2026-10-01T08:30:00.000Z' }), { arrivato_il: '2026-10-01T08:30:00.000Z' })
  assert.deepEqual(pulisciCampagna({ arrivato_il: '2026-10-01T10:30:00+02:00' }), { arrivato_il: '2026-10-01T08:30:00.000Z' })
  assert.equal(pulisciCampagna({ arrivato_il: 'ieri' }), undefined)
  assert.equal(pulisciCampagna({ arrivato_il: '2026-13-45T99:99' }), undefined)
  assert.equal(pulisciCampagna({ arrivato_il: '1759307400000' }), undefined)
})

test('hostEsterno: host di un altro sito, niente per fimbroker.it e per il sito stesso', () => {
  assert.equal(hostEsterno('https://www.google.com/'), 'www.google.com')
  assert.equal(hostEsterno('https://www.fimbroker.it/chi-siamo'), undefined)
  assert.equal(hostEsterno('https://fimbroker.it/'), undefined)
  assert.equal(hostEsterno('https://fim-broker-git-x.vercel.app/', 'fim-broker-git-x.vercel.app'), undefined)
  assert.equal(hostEsterno('http://localhost:3000/', 'localhost'), undefined)
  assert.equal(hostEsterno(''), undefined)
  assert.equal(hostEsterno('non è un url'), undefined)
})

test('leggiArrivo: annuncio Google con utm e gclid', () => {
  const c = leggiArrivo({
    url: 'https://www.fimbroker.it/soluzioni/rc-professionale?utm_source=google&utm_medium=cpc&utm_campaign=rc%20pro&gclid=Cj0KCQjw-abc',
    referrer: 'https://www.google.com/',
    adesso: ADESSO,
  })
  assert.deepEqual(c, {
    utm_source: 'google',
    utm_medium: 'cpc',
    utm_campaign: 'rc pro',
    gclid: 'Cj0KCQjw-abc',
    referrer_esterno: 'www.google.com',
    pagina_arrivo: '/soluzioni/rc-professionale',
    arrivato_il: '2026-10-01T08:30:00.000Z',
  })
})

test('leggiArrivo: visita diretta ha solo pagina e ora', () => {
  const c = leggiArrivo({ url: 'https://www.fimbroker.it/', referrer: '', adesso: ADESSO })
  assert.deepEqual(c, { pagina_arrivo: '/', arrivato_il: '2026-10-01T08:30:00.000Z' })
})

test('leggiArrivo: il referrer interno non è un referrer esterno', () => {
  const c = leggiArrivo({
    url: 'https://www.fimbroker.it/preventivo',
    referrer: 'https://www.fimbroker.it/blog/articolo',
    adesso: ADESSO,
  })
  assert.equal(c.referrer_esterno, undefined)
})

test('leggiArrivo: parametri vuoti o ripetuti', () => {
  const c = leggiArrivo({
    url: 'https://www.fimbroker.it/?utm_source=&utm_medium=social&utm_medium=altro&fbclid=IwAR0abc',
    adesso: ADESSO,
  })
  assert.equal(c.utm_source, undefined)
  assert.equal(c.utm_medium, 'social')
  assert.equal(c.fbclid, 'IwAR0abc')
})

test('senzaClic e soloClic separano gli identificativi pubblicitari', () => {
  const c = { utm_source: 'google', gclid: 'abc', fbclid: 'def', pagina_arrivo: '/' }
  assert.deepEqual(senzaClic(c), { utm_source: 'google', pagina_arrivo: '/' })
  assert.deepEqual(soloClic(c), { gclid: 'abc', fbclid: 'def' })
  assert.deepEqual(soloClic({ utm_source: 'google' }), {})
})

test('aggiungiClic: aggiunge ciò che manca e non sovrascrive il primo', () => {
  const sessione = { utm_source: 'google', pagina_arrivo: '/' }
  assert.deepEqual(aggiungiClic(sessione, { gclid: 'primo' }), { utm_source: 'google', pagina_arrivo: '/', gclid: 'primo' })
  assert.deepEqual(aggiungiClic({ ...sessione, gclid: 'primo' }, { gclid: 'secondo' }), { ...sessione, gclid: 'primo' })
})

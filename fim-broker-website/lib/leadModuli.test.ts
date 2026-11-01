// Test di lib/leadModuli.ts — `npm test` (node --test, Node 22.18 o successivo).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  dividiNome,
  leadContatto,
  leadGuidaPmi,
  leadPrenotazione,
  leadPreventivoAuto,
  leadScuole,
  leadSecondOpinion,
} from './leadModuli.ts'

const BASE = { nome: 'Mario Rossi Bianchi', email: ' mario@example.com ', telefono: '', campagna: { utm_source: 'google' } }

test('dividiNome: prima parola nome, il resto cognome', () => {
  assert.deepEqual(dividiNome('Mario Rossi Bianchi'), { nome: 'Mario', cognome: 'Rossi Bianchi' })
  assert.deepEqual(dividiNome('  Mario  '), { nome: 'Mario', cognome: undefined })
})

test('il lead_id è l\'id della mail al team, e campagna e recapiti passano', () => {
  const l = leadContatto({ ...BASE, id: 'MSG-1', oggetto: 'Polizza casa', messaggio: 'Vorrei un preventivo' })
  assert.equal(l.lead_id, 'MSG-1')
  assert.equal(l.nome, 'Mario')
  assert.equal(l.cognome, 'Rossi Bianchi')
  assert.equal(l.email, 'mario@example.com')
  assert.equal(l.telefono, undefined)
  assert.deepEqual(l.campagna, { utm_source: 'google' })
  assert.equal(l.tipo, 'Polizza casa')
  assert.equal(l.referrer, 'modulo-contatti')
  assert.match(l.messaggio ?? '', /Messaggio: Vorrei un preventivo/)
})

test('contatto senza oggetto: tipo generico', () => {
  assert.equal(leadContatto({ ...BASE, id: 'MSG-2', messaggio: 'ciao' }).tipo, 'Contatto dal sito')
})

test('prenotazione: servizio nel tipo, giorno e ora nel messaggio', () => {
  const l = leadPrenotazione({ ...BASE, id: 'BOOK-1', servizio: 'RC professionale', data: '2026-11-05', orario: '10:30' })
  assert.equal(l.tipo, 'Consulenza: RC professionale')
  assert.match(l.messaggio ?? '', /Giorno richiesto: 2026-11-05\nOrario richiesto: 10:30/)
  assert.doesNotMatch(l.messaggio ?? '', /Note:/)
})

test('scuole: istituto nel tipo, profilo scuola, niente righe vuote', () => {
  const l = leadScuole({ ...BASE, id: 'SCU-1', istituto: 'IC Cisterna 1', comune: 'Cisterna di Latina', ruolo: 'Dirigente Scolastico' })
  assert.equal(l.tipo, 'Scuole: check-up — IC Cisterna 1')
  assert.equal(l.profilo, 'scuola')
  assert.equal(l.referrer, 'dipartimento-scuole')
  assert.doesNotMatch(l.messaggio ?? '', /Compagnia attuale|Scadenza/)
})

test('seconda opinione: PDF non nel lead, profilo azienda solo se c\'è', () => {
  const con = leadSecondOpinion({ ...BASE, id: 'SO-1', azienda: 'Rossi Srl', settore: 'Edilizia', numPolizze: 2, oscuraPremio: true })
  assert.equal(con.tipo, 'Seconda opinione — Edilizia')
  assert.equal(con.profilo, 'azienda')
  assert.match(con.messaggio ?? '', /Polizze allegate: 2/)
  assert.match(con.messaggio ?? '', /Premio oscurato dal cliente: sì/)
  assert.match(con.messaggio ?? '', /PDF sono allegati alla mail/)
  const senza = leadSecondOpinion({ ...BASE, id: 'SO-2', numPolizze: 0, oscuraPremio: false })
  assert.equal(senza.profilo, undefined)
  assert.doesNotMatch(senza.messaggio ?? '', /oscurato|allegati alla mail/)
})

test('preventivo auto: targa e documenti, i file restano fuori', () => {
  const l = leadPreventivoAuto({ ...BASE, id: 'PA-1-abc', targa: 'AB123CD', documenti: ['Libretto', 'Patente'] })
  assert.equal(l.lead_id, 'PA-1-abc')
  assert.match(l.messaggio ?? '', /Targa: AB123CD\nDocumenti caricati: Libretto, Patente/)
})

test('guida PMI: il consenso marketing è scritto nel lead, sì o no', () => {
  assert.match(leadGuidaPmi({ ...BASE, id: 'GUIDA-1', marketing: true }).messaggio ?? '', /Consenso marketing: sì/)
  const no = leadGuidaPmi({ ...BASE, id: 'GUIDA-2', attivita: 'Artigiano', marketing: false })
  assert.match(no.messaggio ?? '', /Consenso marketing: no/)
  assert.match(no.messaggio ?? '', /Attività: Artigiano/)
})

test('tetti del gestionale: tipo 100 caratteri, messaggio 2.000', () => {
  const l = leadContatto({ ...BASE, id: 'MSG-3', oggetto: 'x'.repeat(300), messaggio: 'y'.repeat(5000) })
  assert.ok(l.tipo.length <= 100)
  assert.ok((l.messaggio ?? '').length <= 2000)
})

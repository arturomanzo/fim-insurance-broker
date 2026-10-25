// Test di lib/areaCliente.ts — `npm test` (node --test, Node 22.18 o successivo).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { dataEstesa, etichettaFrazionamento, giorniFra, oggiRoma, statoVisibile, titoloPolizza } from './areaCliente.ts'

const OGGI = '2026-10-25'

test('giorniFra: conta i giorni di calendario anche a cavallo del cambio d\'ora', () => {
  assert.equal(giorniFra('2026-10-24', '2026-10-26'), 2)
  assert.equal(giorniFra('2026-10-25', '2026-10-25'), 0)
  assert.equal(giorniFra('2026-10-25', '2026-10-20'), -5)
})

test('oggiRoma: la data di Roma, non quella UTC', () => {
  assert.equal(oggiRoma(new Date('2026-10-25T23:30:00Z')), '2026-10-26')
  assert.equal(oggiRoma(new Date('2026-06-30T21:59:00Z')), '2026-06-30')
})

test('statoVisibile: in scadenza entro 60 giorni, attiva oltre', () => {
  assert.deepEqual(statoVisibile({ stato: 'attiva', scadenza: '2026-12-24' }, OGGI), { stato: 'in-scadenza', giorni: 60 })
  assert.deepEqual(statoVisibile({ stato: 'attiva', scadenza: '2026-12-25' }, OGGI), { stato: 'attiva', giorni: 61 })
  assert.deepEqual(statoVisibile({ stato: 'attiva', scadenza: OGGI }, OGGI), { stato: 'in-scadenza', giorni: 0 })
})

test('statoVisibile: una attiva con la data passata non si chiama scaduta', () => {
  assert.equal(statoVisibile({ stato: 'attiva', scadenza: '2026-09-30' }, OGGI).stato, 'da-aggiornare')
})

test('statoVisibile: la sospesa resta sospesa, qualunque sia la data', () => {
  assert.deepEqual(statoVisibile({ stato: 'sospesa', scadenza: '2026-11-01' }, OGGI), { stato: 'sospesa', giorni: null })
})

test('statoVisibile: senza scadenza è attiva, senza conto alla rovescia', () => {
  assert.deepEqual(statoVisibile({ stato: 'attiva', scadenza: null }, OGGI), { stato: 'attiva', giorni: null })
})

test('etichettaFrazionamento e dataEstesa', () => {
  assert.equal(etichettaFrazionamento('semestrale'), 'Semestrale')
  assert.equal(etichettaFrazionamento(null), null)
  assert.equal(dataEstesa('2027-03-01'), '01 marzo 2027')
  assert.equal(dataEstesa(null), '—')
})

test('titoloPolizza: la targa accanto al ramo quando c\'è', () => {
  assert.equal(titoloPolizza({ ramo: 'RC Auto', targa: 'AB123CD' }), 'RC Auto · AB123CD')
  assert.equal(titoloPolizza({ ramo: null, targa: null }), 'Polizza')
})

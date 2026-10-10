// Test di lib/consensoSanitario.ts — `npm test` (node --test, Node 22.18 o successivo).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { haConsensoSanitario } from './consensoSanitario.ts'

test('il consenso vale solo se è un true esplicito', () => {
  assert.equal(haConsensoSanitario(true), true)
  for (const valore of [false, 'true', 1, 'sì', null, undefined, {}]) {
    assert.equal(haConsensoSanitario(valore), false, `accettato: ${JSON.stringify(valore)}`)
  }
})

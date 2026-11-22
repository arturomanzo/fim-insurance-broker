import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const RADICE = fileURLToPath(new URL('..', import.meta.url))

function file(cartella: string): string[] {
  return readdirSync(`${RADICE}/${cartella}`, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? file(`${cartella}/${e.name}`) : [`${cartella}/${e.name}`],
  )
}

// Con un loading.tsx sopra, 110 indirizzi su 123 mostravano solo lo scheletro
// grigio a chi ha JavaScript spento (misurato il 22/11/2026).
test('loading.tsx solo nell’area cliente dietro login', () => {
  const trovati = file('app').filter((p) => /\/loading\.[jt]sx?$/.test(p)).sort()
  assert.deepEqual(trovati, [
    'app/(marketing)/area-cliente/dashboard/loading.tsx',
    'app/(marketing)/area-cliente/polizza/[id]/loading.tsx',
  ])
})

test('un modulo non si invia mai da solo, con i dati nell’indirizzo', () => {
  assert.match(readFileSync(`${RADICE}/next.config.ts`, 'utf8'), /^\s*"form-action 'none'",$/m)
  // con form-action 'none' un invio nativo non partirebbe: meglio saperlo in CI
  const nativi = ['app', 'components'].flatMap(file).filter(
    (p) => p.endsWith('.tsx') && /<form\b[^>]*\saction=|formAction=/.test(readFileSync(`${RADICE}/${p}`, 'utf8')),
  )
  assert.deepEqual(nativi, [])
})

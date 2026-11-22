import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { LOGO_PATH_ROOF } from './logo.ts'

// Le icone «Sotto il tetto» richiamano il tetto da un file statico: se il logo cambia
// e il file no, il sito si ritrova con due tetti diversi.
test('il tetto delle icone è lo stesso del logo', () => {
  const svg = readFileSync(new URL('../public/images/brand/tetto.svg', import.meta.url), 'utf8')
  assert.ok(svg.includes('id="tetto"'))
  assert.ok(svg.includes(`d="${LOGO_PATH_ROOF}"`))
})

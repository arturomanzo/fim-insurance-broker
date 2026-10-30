// Le norme citate nelle pagine del sito devono stare nel registro
// data/norme-citabili.json, come quelle del blog — `npm test`. Fino al 30/10/2026
// il controllo valeva solo per il blog: nelle pagine giravano un art. 12 del
// D.Lgs. 346/1990 abrogato e il GDPR scritto "679/2016". Una norma nuova va letta
// sulla fonte primaria e aggiunta al registro con fonte e data, non tolta dal test.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { caricaRegistro, estraiCitazioni } from '../scripts/lib/blog-guardrails.mjs'

const RADICE = join(import.meta.dirname, '..')
const CARTELLE = ['app', 'components', 'lib']

function fileDi(cartella: string): string[] {
  return readdirSync(join(RADICE, cartella), { recursive: true, encoding: 'utf8' })
    .filter((f) => /\.tsx?$/.test(f) && !f.endsWith('.test.ts'))
    .map((f) => join(cartella, f))
}

test('ogni norma citata nelle pagine è nel registro e verificata', () => {
  const registro = caricaRegistro()
  const problemi: string[] = []
  for (const cartella of CARTELLE) {
    for (const file of fileDi(cartella)) {
      const testo = readFileSync(join(RADICE, file), 'utf8')
      for (const { chiave, come } of estraiCitazioni(testo)) {
        const norma = registro.perChiave.get(chiave.toLowerCase())
        if (!norma) problemi.push(`${file}: «${come}» non è nel registro`)
        else if (norma.stato !== 'verificata') problemi.push(`${file}: «${come}» è da verificare`)
      }
    }
  }
  assert.deepEqual(problemi, [])
})

test('il numero di telefono non passa per una legge', () => {
  assert.deepEqual(estraiCitazioni('tel. 06 96883381'), [])
  assert.equal(estraiCitazioni('D.L. 145/2023')[0]?.chiave, '145/2023')
})

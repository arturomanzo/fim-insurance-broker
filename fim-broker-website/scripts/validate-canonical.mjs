#!/usr/bin/env node
/**
 * Validatore canonical
 * Eseguire con: npm run validate-canonical
 *
 * Perché esiste: fino all'audit del 13/08/2026 il root layout dichiarava
 * `alternates.canonical: BASE_URL`. In Next quel valore viene ereditato da
 * ogni pagina che non ne definisce uno proprio, quindi 26 pagine pubbliche
 * si dichiaravano duplicati della homepage. Il guasto è invisibile: il sito
 * funziona, Lighthouse è verde, e intanto Google sconta l'indicizzazione.
 *
 * Controlla: (1) il root layout non reintroduce un canonical ereditabile,
 * (2) ogni pagina indicizzabile ne dichiara uno, (3) il valore dichiarato
 * corrisponde alla rotta del file.
 */

import { readFileSync, readdirSync, statSync } from 'fs'
import { resolve, dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const appDir = resolve(__dirname, '../app')

let errors = 0
const fail = (msg) => { console.error(`  ❌ ${msg}`); errors++ }

// Rotte private: sono noindex, un canonical le contraddirebbe.
const PRIVATE_PREFIXES = ['/admin', '/area-cliente']

function walk(dir) {
  const out = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) out.push(...walk(full))
    else if (entry === 'page.tsx') out.push(full)
  }
  return out
}

// Sostituisce i `${NOME}` con il valore di `const NOME = '...'` dichiarato
// nello stesso file. Se non lo trova lascia il segnaposto, così il confronto
// fallisce invece di passare per caso.
function resolveConstants(value, src) {
  return value.replace(/\$\{(\w+)\}/g, (whole, name) => {
    const m = src.match(new RegExp(`const\\s+${name}\\s*=\\s*['"\`]([^'"\`]*)['"\`]`))
    return m ? m[1] : whole
  })
}

const routeOf = (file) =>
  file
    .slice(appDir.length)
    .replace(/\/page\.tsx$/, '')
    .replace(/\/\([a-z-]+\)/g, '') || '/'

console.log('\n🔍 Validazione canonical\n')

// 1. Il root layout non deve dichiarare un canonical: verrebbe ereditato.
const layout = readFileSync(resolve(appDir, 'layout.tsx'), 'utf-8')
if (/alternates:\s*\{[^}]*canonical/s.test(layout)) {
  fail('app/layout.tsx dichiara un canonical: verrebbe ereditato da ogni pagina senza il proprio')
} else {
  console.log('  ✅ Root layout: nessun canonical ereditabile')
}

// 2 e 3. Ogni pagina indicizzabile dichiara il canonical della sua rotta.
let checked = 0
let pagesOk = true
for (const file of walk(appDir).sort()) {
  const src = readFileSync(file, 'utf-8')
  const route = routeOf(file)
  const rel = file.slice(resolve(appDir, '..').length + 1)

  if (PRIVATE_PREFIXES.some((p) => route.startsWith(p))) continue
  if (/index:\s*false|noindex/.test(src)) continue
  if (!/export const metadata|generateMetadata/.test(src)) continue
  if (route.includes('[')) continue // rotta dinamica: il canonical è calcolato a runtime

  checked++
  const match = src.match(/canonical:\s*['"`]([^'"`]*)['"`]/)
  if (!match) {
    fail(`${rel} — rotta ${route}: manca alternates.canonical`)
    pagesOk = false
    continue
  }
  // Le landing di zona compongono il canonical da una costante del file
  // (`const SLUG = '...'`): va risolta, altrimenti il confronto è inutile.
  const declared = resolveConstants(match[1], src)
  if (declared !== route) {
    fail(`${rel} — canonical "${declared}" non corrisponde alla rotta "${route}"`)
    pagesOk = false
  }
}
if (pagesOk) console.log(`  ✅ ${checked} pagine indicizzabili: canonical presente e coerente con la rotta`)

console.log(`\n${'─'.repeat(50)}`)
if (errors === 0) {
  console.log('✅ Validazione superata.\n')
  process.exit(0)
} else {
  console.log(`❌ ${errors} errore/i trovato/i — correggere prima di pubblicare.\n`)
  process.exit(1)
}

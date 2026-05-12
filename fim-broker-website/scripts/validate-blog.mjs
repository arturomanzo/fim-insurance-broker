#!/usr/bin/env node
/**
 * Validatore blog-posts.json
 * Eseguire con: npm run validate-blog
 * Controlla: slug duplicati, immagini duplicate, campi obbligatori mancanti.
 */

import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dataPath = resolve(__dirname, '../data/blog-posts.json')
const { posts } = JSON.parse(readFileSync(dataPath, 'utf-8'))

const REQUIRED_FIELDS = ['slug', 'title', 'excerpt', 'category', 'date', 'readTime', 'image', 'sections']
const VALID_CATEGORIES = ['Auto', 'Vita', 'Aziendale', 'Casa', 'Salute', 'Viaggio', 'Guide', 'Professionisti']

let errors = 0

function fail(msg) {
  console.error(`  ❌ ${msg}`)
  errors++
}

console.log(`\n🔍 Validazione ${posts.length} post in blog-posts.json\n`)

// 1. Slug duplicati
const slugs = posts.map(p => p.slug)
const dupSlugs = slugs.filter((s, i) => slugs.indexOf(s) !== i)
if (dupSlugs.length) {
  console.log('── Slug duplicati:')
  dupSlugs.forEach(s => fail(`slug duplicato: "${s}"`))
} else {
  console.log('  ✅ Slug: tutti unici')
}

// 2. Immagini duplicate
const images = posts.map(p => ({ image: p.image, slug: p.slug }))
const imgCount = {}
images.forEach(({ image }) => { imgCount[image] = (imgCount[image] || 0) + 1 })
const dupImgs = Object.entries(imgCount).filter(([, n]) => n > 1)
if (dupImgs.length) {
  console.log('\n── Immagini duplicate:')
  dupImgs.forEach(([img]) => {
    const affected = images.filter(i => i.image === img).map(i => i.slug)
    fail(`stessa immagine in: ${affected.join(' | ')}`)
    console.error(`     URL: ${img}`)
  })
} else {
  console.log('  ✅ Immagini: tutte uniche')
}

// 3. Campi obbligatori e categorie
console.log('\n── Campi obbligatori e categorie:')
let fieldOk = true
posts.forEach(post => {
  REQUIRED_FIELDS.forEach(field => {
    if (!post[field] && post[field] !== 0) {
      fail(`"${post.slug}" — campo mancante: "${field}"`)
      fieldOk = false
    }
  })
  if (post.category && !VALID_CATEGORIES.includes(post.category)) {
    fail(`"${post.slug}" — categoria sconosciuta: "${post.category}" (valide: ${VALID_CATEGORIES.join(', ')})`)
    fieldOk = false
  }
  if (post.sections && post.sections.length === 0) {
    fail(`"${post.slug}" — sections è vuoto`)
    fieldOk = false
  }
})
if (fieldOk) console.log('  ✅ Tutti i campi obbligatori presenti e categorie valide')

// Risultato
console.log(`\n${'─'.repeat(50)}`)
if (errors === 0) {
  console.log('✅ Validazione superata — il blog è pronto.\n')
  process.exit(0)
} else {
  console.log(`❌ ${errors} errore/i trovato/i — correggere prima di pubblicare.\n`)
  process.exit(1)
}

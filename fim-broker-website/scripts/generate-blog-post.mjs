#!/usr/bin/env node
/**
 * Script per la generazione automatica di articoli blog con AI.
 * Usa l'API Anthropic (Claude) per ricercare e scrivere nuovi articoli
 * assicurativi in italiano, poi li aggiunge al file data/blog-posts.json.
 *
 * Eseguito ogni settimana via GitHub Actions.
 * Richiede: ANTHROPIC_API_KEY (obbligatorio), BRAVE_API_KEY (opzionale, per ricerca web reale)
 */

import Anthropic from '@anthropic-ai/sdk'
import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_FILE = path.resolve(__dirname, '../data/blog-posts.json')

// Immagini Unsplash per categoria.
// Tutti gli ID sono stati verificati (HTTP 200). Ogni categoria ha un pool
// ampio così pickImage() può sempre assegnare una foto NON ancora usata da
// altri articoli (vedi logica di unicità più sotto).
const IMG = (id) => `https://images.unsplash.com/${id}?w=1200&q=80&fit=crop&auto=format`

const CATEGORY_IMAGES = {
  Auto: [
    'photo-1549317661-bd32c8ce0db2', 'photo-1503376780353-7e6692767b70', 'photo-1558981806-ec527fa84c39',
    'photo-1492144534655-ae79c964c9d7', 'photo-1568605117036-5fe5e7bab0b7', 'photo-1493238792000-8113da705763',
  ].map(IMG),
  Vita: [
    'photo-1529156069898-49953e39b3ac', 'photo-1516455590571-18256e5bb9ff', 'photo-1511895426328-dc8714191300',
    'photo-1543269865-cbf427effbad', 'photo-1542037104857-ffbb0b9155fb', 'photo-1476703993599-0035a21b17a9',
  ].map(IMG),
  Casa: [
    'photo-1560518883-ce09059eeffa', 'photo-1570129477492-45c003edd2be', 'photo-1484154218962-a197022b5858',
    'photo-1480074568708-e7b720bb3f09', 'photo-1518780664697-55e3ad937233', 'photo-1564013799919-ab600027ffc6',
  ].map(IMG),
  Salute: [
    'photo-1576091160399-112ba8d25d1d', 'photo-1505751172876-fa1923c5c528', 'photo-1631815588090-d4bfec5b1ccb',
    'photo-1538108149393-fbbd81895907', 'photo-1551076805-e1869033e561', 'photo-1579684385127-1ef15d508118',
  ].map(IMG),
  Aziendale: [
    'photo-1486406146926-c627a92ad1ab', 'photo-1454165804606-c3d57bc86b40', 'photo-1497366754035-f200968a6e72',
    'photo-1556761175-b413da4baf72', 'photo-1521737604893-d14cc237f11d', 'photo-1542744173-8e7e53415bb0',
    'photo-1551836022-d5d88e9218df', 'photo-1517048676732-d65bc937f952',
  ].map(IMG),
  Viaggio: [
    'photo-1436491865332-7a61a109cc05', 'photo-1476514525535-07fb3b4ae5f1', 'photo-1488646953014-85cb44e25828',
    'photo-1469854523086-cc02fe5d8800', 'photo-1500835556837-99ac94a94552', 'photo-1503220317375-aaad61436b1b',
  ].map(IMG),
  Guide: [
    'photo-1497366811353-6870744d04b2', 'photo-1450101499163-c8848c66ca85', 'photo-1434030216411-0b793f4b4173',
    'photo-1456513080510-7bf3a84b82f8',
  ].map(IMG),
  Professionisti: [
    'photo-1521791136064-7986c2920216', 'photo-1556157382-97eda2d62296', 'photo-1573496359142-b8d87734a5a2',
    'photo-1507003211169-0a1dd7228f2d', 'photo-1552664730-d307ca884978',
  ].map(IMG),
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80)
}

function formatDate(date) {
  const months = [
    'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
    'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre',
  ]
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
}

// Confronta gli URL ignorando i query param (?w=...&q=...), così due varianti
// della stessa foto contano come duplicato.
function imageBase(url) {
  return (url || '').split('?')[0]
}

/**
 * Sceglie un'immagine GARANTITAMENTE non ancora usata da nessun altro articolo.
 * 1) prova tra le immagini della categoria non ancora usate;
 * 2) se la categoria è esaurita, attinge dal pool globale (tutte le categorie);
 * 3) come ultima rete (pool intero esaurito), aggiunge un suffisso univoco
 *    all'URL per evitare comunque una collisione esatta.
 * @param {string} category
 * @param {Set<string>} usedBases - basi URL (senza query) già in uso
 */
function pickImage(category, usedBases) {
  const isFree = (url) => !usedBases.has(imageBase(url))
  const catPool = CATEGORY_IMAGES[category] || CATEGORY_IMAGES['Aziendale']

  let candidates = catPool.filter(isFree)
  if (candidates.length === 0) {
    candidates = Object.values(CATEGORY_IMAGES).flat().filter(isFree)
  }
  if (candidates.length === 0) {
    // Pool completamente esaurito: rende l'URL unico senza cambiare foto.
    const base = catPool[0]
    return `${base}&sig=${usedBases.size + 1}`
  }
  return candidates[Math.floor(Math.random() * candidates.length)]
}

async function searchWebNews(braveApiKey, topic) {
  try {
    const query = encodeURIComponent(`${topic} assicurazioni italia 2025 2026`)
    const res = await fetch(`https://api.search.brave.com/res/v1/web/search?q=${query}&count=5&country=it&search_lang=it`, {
      headers: {
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip',
        'X-Subscription-Token': braveApiKey,
      },
    })
    if (!res.ok) return null
    const data = await res.json()
    const results = data?.web?.results ?? []
    return results.slice(0, 3).map(r => `- ${r.title}: ${r.description}`).join('\n')
  } catch {
    return null
  }
}

async function generateArticle(client, existingSlugs, webContext) {
  const today = formatDate(new Date())
  const existingTopics = existingSlugs.join(', ')

  const webSection = webContext
    ? `\n\nContesto da ricerca web (notizie recenti):\n${webContext}\n\nUsa queste informazioni per rendere l'articolo attuale e preciso.`
    : ''

  const systemPrompt = `Sei un esperto di assicurazioni italiane che scrive articoli per il blog di FIM Insurance Broker, un broker assicurativo con sede a Cisterna di Latina. Scrivi in italiano, tono professionale ma accessibile, orientato a privati e piccole imprese italiane.`

  const userPrompt = `Data di oggi: ${today}
Articoli già presenti sul blog (slug): ${existingTopics}

${webSection}

Genera UN NUOVO articolo blog su un argomento assicurativo DIVERSO da quelli già esistenti, rilevante per il mercato italiano nel 2025-2026. Scegli tra questi temi (o proponi un altro pertinente):
- Assicurazione per veicoli elettrici
- Polizza sanitaria integrativa 2025
- Assicurazione per lavoratori in smart working
- RC professionale per freelance
- Polizza catastrofale obbligatoria per imprese
- Assicurazione per droni e nuove tecnologie
- Welfare aziendale e polizze dipendenti
- Riforma pensionistica e previdenza complementare

Rispondi SOLO con un oggetto JSON valido (nessun testo prima o dopo), con questa struttura esatta:
{
  "slug": "slug-url-friendly",
  "title": "Titolo dell'articolo",
  "excerpt": "Breve descrizione di 1-2 frasi",
  "category": "Auto|Vita|Casa|Salute|Aziendale|Viaggio",
  "readTime": "X min",
  "sections": [
    {
      "heading": "Titolo sezione",
      "body": "Testo della sezione (2-4 frasi)",
      "list": ["elemento 1", "elemento 2", "elemento 3"]
    }
  ]
}

L'articolo deve avere almeno 4 sezioni. Il campo "list" è opzionale (includilo solo dove aggiunge valore). Il testo deve essere informativo, utile e orientato all'azione (spingere verso una consulenza con FIM).`

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 3000,
    messages: [{ role: 'user', content: userPrompt }],
    system: systemPrompt,
  })

  const content = response.content[0]
  if (content.type !== 'text') throw new Error('Risposta AI non testuale')

  // Estrai JSON dalla risposta
  const jsonMatch = content.text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('Nessun JSON trovato nella risposta')

  const article = JSON.parse(jsonMatch[0])

  // Validazione campi obbligatori
  if (!article.slug || !article.title || !article.category || !article.sections?.length) {
    throw new Error('Articolo generato incompleto')
  }

  return article
}

async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    console.error('❌ ANTHROPIC_API_KEY non configurata')
    process.exit(1)
  }

  console.log('🤖 Avvio generazione articolo blog settimanale...')

  // Leggi articoli esistenti
  const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
  const existingSlugs = data.posts.map(p => p.slug)
  const usedImages = new Set(data.posts.map(p => imageBase(p.image)))
  console.log(`📚 Articoli esistenti: ${existingSlugs.length} (${usedImages.size} immagini già in uso)`)

  // Ricerca web opzionale con Brave
  let webContext = null
  const braveKey = process.env.BRAVE_API_KEY
  if (braveKey) {
    console.log('🔍 Ricerca notizie assicurative recenti...')
    webContext = await searchWebNews(braveKey, 'novità assicurazioni')
    if (webContext) console.log('✅ Contesto web ottenuto')
  }

  // Inizializza client Anthropic
  const client = new Anthropic({ apiKey })

  // Genera articolo
  console.log('✍️  Generazione articolo con Claude AI...')
  const article = await generateArticle(client, existingSlugs, webContext)

  // Assicura slug unico
  let slug = slugify(article.slug || article.title)
  if (existingSlugs.includes(slug)) {
    slug = `${slug}-${new Date().getFullYear()}`
  }

  const newPost = {
    slug,
    title: article.title,
    excerpt: article.excerpt,
    category: article.category,
    date: formatDate(new Date()),
    readTime: article.readTime || '5 min',
    image: pickImage(article.category, usedImages),
    sections: article.sections,
  }

  // Aggiungi in testa (articolo più recente prima)
  data.posts.unshift(newPost)

  // Scrivi file aggiornato
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2) + '\n', 'utf-8')

  console.log(`✅ Articolo aggiunto: "${newPost.title}"`)
  console.log(`   Slug: ${newPost.slug}`)
  console.log(`   Categoria: ${newPost.category}`)
  console.log(`   Data: ${newPost.date}`)
}

// Esegui main() solo quando lo script è lanciato direttamente
// (così le funzioni restano importabili dai test senza side effect).
export { pickImage, imageBase, CATEGORY_IMAGES, slugify }

const isMain = import.meta.url === pathToFileURL(process.argv[1]).href
if (isMain) main().catch((err) => {
  console.error('❌ Errore:', err.message)
  process.exit(1)
})

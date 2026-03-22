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
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_FILE = path.resolve(__dirname, '../data/blog-posts.json')

// Immagini Unsplash per categoria
const CATEGORY_IMAGES = {
  Auto: [
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&q=80&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1200&q=80&fit=crop&auto=format',
  ],
  Vita: [
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1493836512294-502baa1986e2?w=1200&q=80&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?w=1200&q=80&fit=crop&auto=format',
  ],
  Casa: [
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80&fit=crop&auto=format',
  ],
  Salute: [
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&q=80&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1200&q=80&fit=crop&auto=format',
  ],
  Aziendale: [
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80&fit=crop&auto=format',
  ],
  Viaggio: [
    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80&fit=crop&auto=format',
  ],
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

function pickImage(category) {
  const images = CATEGORY_IMAGES[category] || CATEGORY_IMAGES['Aziendale']
  return images[Math.floor(Math.random() * images.length)]
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
  console.log(`📚 Articoli esistenti: ${existingSlugs.length}`)

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
    image: pickImage(article.category),
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

main().catch((err) => {
  console.error('❌ Errore:', err.message)
  process.exit(1)
})

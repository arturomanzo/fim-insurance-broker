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
import { caricaRegistro, controllaPost, normeVerificate } from './lib/blog-guardrails.mjs'

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
    const anno = new Date().getFullYear()
    const query = encodeURIComponent(`${topic} assicurazioni italia ${anno - 1} ${anno}`)
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

// La forma dell'articolo la garantisce l'API. Le categorie sono quelle per cui
// esiste un'immagine in CATEGORY_IMAGES: una fuori elenco lascerebbe il pezzo
// senza copertina.
const ARTICOLO_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['slug', 'title', 'excerpt', 'category', 'readTime', 'sections'],
  properties: {
    slug: { type: 'string', description: 'Minuscolo, parole separate da trattini.' },
    title: { type: 'string' },
    excerpt: { type: 'string', description: 'Una o due frasi.' },
    category: { type: 'string', enum: Object.keys(CATEGORY_IMAGES) },
    readTime: { type: 'string', description: 'Nella forma "X min".' },
    sections: {
      type: 'array',
      minItems: 4,
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['heading', 'body', 'list'],
        properties: {
          heading: { type: 'string' },
          body: { type: 'string' },
          list: {
            type: ['array', 'null'],
            items: { type: 'string' },
            description: 'null quando un elenco non aggiunge niente.',
          },
        },
      },
    },
  },
}

async function generateArticle(client, existingSlugs, webContext, registro, correzioni = []) {
  const today = formatDate(new Date())
  const existingTopics = existingSlugs.join(', ')

  const elencoNorme = normeVerificate(registro)
    .map(n => `- ${n.citazione} — ${n.oggetto}`)
    .join('\n')

  const sezioneCorrezioni = correzioni.length
    ? `\n\nIL TENTATIVO PRECEDENTE È STATO RIFIUTATO. Errori da non ripetere:\n${correzioni.map(e => `- ${e}`).join('\n')}\nRiscrivi l'articolo da capo tenendone conto.`
    : ''

  const webSection = webContext
    ? `\n\nContesto da ricerca web (notizie recenti):\n${webContext}\n\nUsa queste informazioni per rendere l'articolo attuale e preciso.`
    : ''

  const systemPrompt = `Sei il broker che scrive sul blog di FIM Insurance Broker, agenzia con sede a Cisterna di Latina, iscritta al RUI Sez. B n. B000405449. Scrivi in italiano a privati e piccole imprese italiane: tono professionale ma diretto, come spieghi a un cliente seduto davanti a te.

Quello che pubblichi va online da solo, su un sito firmato con un numero RUI, senza che nessuno lo rilegga prima. Scrivi di conseguenza: meglio una frase in meno che una frase che non puoi dimostrare.`

  const userPrompt = `Data di oggi: ${today}
Articoli già presenti sul blog (slug): ${existingTopics}

${webSection}

Genera un nuovo articolo su un argomento assicurativo diverso da quelli già esistenti, rilevante per il mercato italiano di oggi. Scegli tra questi temi (o proponi un altro pertinente):
- Assicurazione per veicoli elettrici
- Polizza sanitaria integrativa
- Assicurazione per lavoratori in smart working
- RC professionale per freelance
- Polizza catastrofale obbligatoria per imprese
- Assicurazione per droni e nuove tecnologie
- Welfare aziendale e polizze dipendenti
- Riforma pensionistica e previdenza complementare

Sei paletti, tutti vincolanti.

1. NORME. Puoi citare estremi di legge SOLO se sono in questo elenco, che è stato letto sulla fonte primaria:
${elencoNorme}

   Se ti serve una norma che non è in elenco, NON inventarla e NON tirare a indovinare l'anno o il numero: descrivi l'obbligo senza attribuirlo, per esempio «la legge impone a...» invece di «il D.Lgs. X/AAAA impone a...». Attribuire un obbligo alla norma sbagliata è l'errore più grave che puoi fare qui, e ne abbiamo già corretto uno: il D.Lgs. 36/2021 non impone l'assicurazione dei tesserati sportivi, quella viene dall'art. 51 della L. 289/2002 ed è del 2002.
   Quando citi una norma dell'elenco, attieniti a quello che dice la sua descrizione. Non estenderne la portata.

2. PAROLE VIETATE, sempre: «fondamentale», «inoltre», «panorama», «in conclusione», «cruciale», «in sintesi», «è importante notare», «al fine di». Se una frase ne ha bisogno, riscrivi la frase.

3. NIENTE PROMESSE. Non scrivere che una polizza fa risparmiare, né di quanto; non scrivere «senza sorprese», «sempre coperto», «nessun rischio». Un cliente può pretendere quello che gli hai promesso per iscritto. Se vuoi parlare di prezzo, di' da cosa dipende, non quanto costa.

4. NIENTE COMPAGNIE in chiave comparativa, nessun nome. FIM lavora con 20 fra mandati diretti e collaborazioni: non scrivere mai «oltre 30 compagnie» o simili.

5. NIENTE CIFRE INVENTATE. Un premio in euro, una percentuale, un numero di sinistri: o viene dal contesto di ricerca web qui sopra e allora citi la fonte nel testo, o non lo scrivi.

6. SCRITTURA. Frasi brevi, discorso fluido, niente elenchi puntati dove basta una frase, niente riassunto finale di rito. Assumi un ruolo concreto: il broker che spiega, non la voce neutra da manuale.
${sezioneCorrezioni}

Almeno quattro sezioni, ognuna di due-quattro frasi; "list" solo dove un elenco aggiunge qualcosa, altrimenti null. Il testo è utile e porta a una consulenza con FIM.`

  const response = await client.beta.messages.create({
    model: 'claude-opus-5',
    // Il tetto copre anche il thinking, acceso di default su Opus 5.
    max_tokens: 16000,
    output_config: { effort: 'medium', format: { type: 'json_schema', schema: ARTICOLO_SCHEMA } },
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    messages: [{ role: 'user', content: userPrompt }],
    system: systemPrompt,
  })

  if (response.stop_reason === 'refusal') {
    throw new Error(`Articolo rifiutato dal modello (${response.stop_details?.category ?? 'n.d.'})`)
  }
  if (response.stop_reason === 'max_tokens') throw new Error('Articolo tagliato dal tetto di token')

  // Il primo blocco puo' essere il thinking: il testo si cerca per tipo.
  const content = response.content.find((b) => b.type === 'text')
  if (!content) throw new Error('Risposta AI vuota')
  console.log(`   token: in=${response.usage.input_tokens} out=${response.usage.output_tokens}`)

  const article = JSON.parse(content.text)
  // Lo schema impone la chiave `list`; a valle il campo e' opzionale.
  for (const sez of article.sections) if (sez.list === null) delete sez.list

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

  // Genera articolo, e non accettarlo finché non passa i paletti.
  // Il controllo severo è la stessa cosa che gira in validate-blog.mjs: farlo qui
  // serve a dare al modello una seconda occasione con gli errori sotto gli occhi,
  // invece di far fallire la Action per una parola vietata e restare senza articolo.
  const registro = caricaRegistro()
  console.log(`📋 Registro norme: ${normeVerificate(registro).length} citabili`)

  const MAX_TENTATIVI = 2
  let article = null
  let correzioni = []
  for (let tentativo = 1; tentativo <= MAX_TENTATIVI; tentativo++) {
    console.log(`✍️  Generazione articolo con Claude AI (tentativo ${tentativo}/${MAX_TENTATIVI})...`)
    const candidato = await generateArticle(client, existingSlugs, webContext, registro, correzioni)
    const { errori } = controllaPost(candidato, registro, { severo: true })
    if (errori.length === 0) {
      article = candidato
      console.log('✅ Paletti superati')
      break
    }
    console.warn(`⚠️  Articolo rifiutato, ${errori.length} violazione/i:`)
    errori.forEach(e => console.warn(`   · ${e}`))
    correzioni = errori
  }

  if (!article) {
    console.error('❌ Nessun articolo ha superato i paletti dopo ' + MAX_TENTATIVI + ' tentativi.')
    console.error('   Non pubblico niente: meglio una settimana senza articolo che un articolo che afferma il falso.')
    process.exit(1)
  }

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
    // Trasparenza AI Act (art. 50.4): articolo redatto con supporto IA.
    // Attiva l'avviso di trasparenza sulla pagina articolo.
    aiAssisted: true,
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

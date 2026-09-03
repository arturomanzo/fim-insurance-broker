/**
 * Script per l'aggiornamento trimestrale dell'Osservatorio Prezzi.
 * Eseguito da GitHub Actions ogni inizio trimestre.
 *
 * Usa Claude AI per generare analisi aggiornate sui trend del mercato assicurativo italiano.
 */

import Anthropic from '@anthropic-ai/sdk'
import * as fs from 'fs'
import * as path from 'path'
import { AI_MODELS } from '../lib/ai-models'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

/**
 * Il primo blocco della risposta può essere il thinking: il testo si cerca per
 * tipo, non per posizione, o su un modello che pensa si legge `undefined`.
 */
function testoDi(message: Anthropic.Message): string {
  if (message.stop_reason === 'refusal') {
    throw new Error(`Richiesta rifiutata dal modello (${message.stop_details?.category ?? 'n.d.'})`)
  }
  const blocco = message.content.find((b) => b.type === 'text')
  if (!blocco || blocco.type !== 'text') throw new Error('Risposta senza testo')
  return blocco.text.trim()
}

function getCurrentQuarter(): string {
  if (process.env.QUARTER_OVERRIDE) return process.env.QUARTER_OVERRIDE
  const now = new Date()
  const q = Math.ceil((now.getMonth() + 1) / 3)
  return `Q${q} ${now.getFullYear()}`
}

function getLastUpdated(): string {
  return new Date().toISOString().split('T')[0]
}

async function generateInsights(category: string, change: number, trend: string): Promise<string> {
  const message = await client.messages.create({
    model: AI_MODELS.analysis,
    // Il tetto copre anche il thinking, acceso di default su Opus 5.
    max_tokens: 4096,
    output_config: { effort: 'low' },
    messages: [
      {
        role: 'user',
        content: `Sei un analista del mercato assicurativo italiano esperto.
Scrivi UN breve paragrafo (massimo 2 frasi, tono professionale ma accessibile) che commenta questo dato:
- Categoria: ${category}
- Variazione prezzi: ${change > 0 ? '+' : ''}${change}% rispetto al trimestre precedente
- Tendenza: ${trend}

Il testo sarà pubblicato nell'Osservatorio Prezzi di FIM Insurance Broker (www.fimbroker.it).
Includi un consiglio pratico per il consumatore. Non usare "noi" o riferimenti a FIM.
Risposta solo il paragrafo, senza titoli o markdown.`,
      },
    ],
  })

  return testoDi(message)
}

async function generateSummary(quarter: string, categoryChanges: { name: string; change: number }[]): Promise<string> {
  const changesText = categoryChanges.map((c) => `${c.name}: ${c.change > 0 ? '+' : ''}${c.change}%`).join(', ')

  const message = await client.messages.create({
    model: AI_MODELS.analysis,
    max_tokens: 4096,
    output_config: { effort: 'low' },
    messages: [
      {
        role: 'user',
        content: `Sei un analista del mercato assicurativo italiano.
Scrivi un sommario esecutivo (3-4 frasi) del mercato assicurativo italiano per ${quarter}.
Dati principali: ${changesText}.
Tono: professionale, oggettivo, informativo. Non usare "noi" o riferimenti aziendali.
Solo il testo del sommario.`,
      },
    ],
  })

  return testoDi(message)
}

async function main() {
  console.log('🔄 Avvio aggiornamento Osservatorio Prezzi...')

  const quarter = getCurrentQuarter()
  const lastUpdated = getLastUpdated()

  console.log(`📅 Trimestre: ${quarter}`)

  // ⚠️ QUESTI NUMERI SONO INVENTATI, non recuperati da nessuna fonte.
  //
  // Erano nati come segnaposto e sono finiti in produzione: sono gli stessi
  // sei valori pubblicati su /osservatorio-prezzi. Finche' restano qui, far
  // girare questo script NON aggiorna i premi — cambia solo l'etichetta del
  // trimestre e i commenti che l'IA scrive attorno a essi.
  //
  // Per questo lo `schedule` del workflow e' disinnescato (24/08/2026) e la
  // pagina dichiara apertamente al lettore che sono valori di orientamento
  // FIM e non statistiche.
  //
  // Quando arrivano numeri veri — dai preventivi del gestionale, o da una
  // fonte pubblica — vanno cambiati qui E nella `methodology` di
  // `lib/osservatorio-data.ts`, che e' quella che dichiara la provenienza al
  // cliente. Poi si puo' riattivare lo schedule.
  const updates = [
    { name: 'RC Auto', avgPremium: 487, change: -2.1, trend: 'down' as const },
    { name: 'Polizza Casa', avgPremium: 218, change: 3.8, trend: 'up' as const },
    { name: 'Polizza Salute', avgPremium: 412, change: 5.2, trend: 'up' as const },
    { name: 'Polizza Vita', avgPremium: 320, change: 1.1, trend: 'stable' as const },
    { name: 'RC Professionale', avgPremium: 680, change: 8.4, trend: 'up' as const },
    { name: 'Polizze Aziendali', avgPremium: 1850, change: 14.2, trend: 'up' as const },
  ]

  // Genera insight con AI per ogni categoria
  console.log('🤖 Generazione insight AI...')
  const insights: string[] = []
  for (const u of updates) {
    const insight = await generateInsights(u.name, u.change, u.trend)
    insights.push(insight)
    console.log(`✅ ${u.name}: insight generato`)
  }

  // Genera sommario generale
  const summary = await generateSummary(quarter, updates)
  console.log('✅ Sommario generato')

  // Aggiorna il file della pagina
  const pagePath = path.join(__dirname, '../app/(marketing)/osservatorio-prezzi/page.tsx')
  let content = fs.readFileSync(pagePath, 'utf-8')

  // Aggiorna lastUpdated e quarter
  content = content.replace(/lastUpdated: '[^']*'/, `lastUpdated: '${lastUpdated}'`)
  content = content.replace(/quarter: '[^']*'/, `quarter: '${quarter}'`)

  // Aggiorna summary
  content = content.replace(
    /summary:\n\s+'[^']*'/,
    `summary:\n    '${summary.replace(/'/g, "\\'").replace(/\n/g, ' ')}'`,
  )

  // Aggiorna insight per ogni categoria
  updates.forEach((u, i) => {
    const escapedInsight = insights[i].replace(/'/g, "\\'").replace(/\n/g, ' ')
    // Pattern per trovare l'insight della categoria
    const pattern = new RegExp(
      `(name: '${u.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'[^}]*?insight:\\s*)'[^']*'`,
      's',
    )
    content = content.replace(pattern, `$1'${escapedInsight}'`)
    content = content.replace(
      new RegExp(`(name: '${u.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'[^}]*?avgPremium: )\\d+`),
      `$1${u.avgPremium}`,
    )
    content = content.replace(
      new RegExp(`(name: '${u.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'[^}]*?change: )[+-]?[\\d.]+`),
      `$1${u.change}`,
    )
  })

  fs.writeFileSync(pagePath, content, 'utf-8')
  console.log('💾 File aggiornato:', pagePath)
  console.log('✅ Osservatorio Prezzi aggiornato con successo!')
}

main().catch((err) => {
  console.error('❌ Errore:', err)
  process.exit(1)
})

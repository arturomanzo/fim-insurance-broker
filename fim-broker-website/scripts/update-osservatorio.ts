/**
 * Script per l'aggiornamento trimestrale dell'Osservatorio Prezzi.
 * Eseguito da GitHub Actions ogni inizio trimestre.
 *
 * Usa Claude AI per generare analisi aggiornate sui trend del mercato assicurativo italiano.
 */

import Anthropic from '@anthropic-ai/sdk'
import * as fs from 'fs'
import * as path from 'path'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

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
    model: 'claude-sonnet-4-6',
    max_tokens: 200,
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

  return (message.content[0] as { type: string; text: string }).text.trim()
}

async function generateSummary(quarter: string, categoryChanges: { name: string; change: number }[]): Promise<string> {
  const changesText = categoryChanges.map((c) => `${c.name}: ${c.change > 0 ? '+' : ''}${c.change}%`).join(', ')

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 300,
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

  return (message.content[0] as { type: string; text: string }).text.trim()
}

async function main() {
  console.log('🔄 Avvio aggiornamento Osservatorio Prezzi...')

  const quarter = getCurrentQuarter()
  const lastUpdated = getLastUpdated()

  console.log(`📅 Trimestre: ${quarter}`)

  // Simula variazioni di mercato (in produzione: recupera da API IVASS/ANIA o feed dati)
  // I valori reali andrebbero integrati con un feed dati esterno
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

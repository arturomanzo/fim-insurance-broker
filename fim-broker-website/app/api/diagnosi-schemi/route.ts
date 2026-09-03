/**
 * TEMPORANEA — va cancellata prima del merge.
 *
 * Verifica che le forme di richiesta introdotte dalla migrazione a Opus 5 siano
 * accettate dall'API, in particolare `output_config.format` su Haiku 4.5, che
 * rifiuta `effort` e che non si può provare in locale (la chiave sta solo su
 * Preview e Produzione).
 */
import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { AI_MODELS } from '@/lib/ai-models'

export const runtime = 'nodejs'
export const maxDuration = 120

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['urgenza', 'reason'],
  properties: {
    urgenza: { type: 'boolean' },
    reason: { type: 'string' },
  },
} as const

export async function POST() {
  const esiti: Record<string, string> = {}

  try {
    const m = await client.messages.create({
      model: AI_MODELS.draft,
      max_tokens: 4096,
      output_config: { format: { type: 'json_schema', schema: SCHEMA } },
      messages: [
        { role: 'user', content: 'Lead: "mi scade la polizza dopodomani, mi serve subito un preventivo".' },
      ],
    })
    const b = m.content.find((x) => x.type === 'text')
    esiti.haiku_format =
      b && b.type === 'text' ? `OK stop=${m.stop_reason} json=${b.text.slice(0, 120)}` : 'OK ma senza testo'
  } catch (e) {
    esiti.haiku_format = `ERRORE ${(e as { status?: number }).status ?? ''} ${(e as Error).message?.slice(0, 300)}`
  }

  try {
    await client.messages.create({
      model: AI_MODELS.draft,
      max_tokens: 512,
      output_config: { effort: 'low' },
      messages: [{ role: 'user', content: 'ciao' }],
    })
    esiti.haiku_effort = 'ACCETTATO (inatteso: si può usare effort)'
  } catch (e) {
    esiti.haiku_effort = `RIFIUTATO come previsto: ${(e as Error).message?.slice(0, 160)}`
  }

  return NextResponse.json(esiti)
}

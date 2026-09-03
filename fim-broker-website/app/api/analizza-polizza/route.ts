import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import type { BetaRequestDocumentBlock } from '@anthropic-ai/sdk/resources/beta/messages/messages'
import { AI_MODELS, FALLBACK_BETA } from '@/lib/ai-models'
import { rateLimit } from '@/lib/rateLimit'

export const runtime = 'nodejs'
export const maxDuration = 60

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// 3MB raw PDF → ~4MB base64 → safe under Vercel's 4.5MB body limit
const MAX_BASE64_LENGTH = 4_200_000

// La forma della risposta la garantisce l'API, non il prompt: niente "solo JSON"
// e niente regex di recupero. Le description sono il contratto dei campi.
const ANALISI_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: [
    'compagnia',
    'tipoPolizza',
    'numPolizza',
    'scadenza',
    'premio',
    'coperture',
    'esclusioni',
    'lacune',
    'costiEccessivi',
    'raccomandazioni',
    'valutazioneGlobale',
  ],
  properties: {
    compagnia: { type: 'string', description: "Nome della compagnia, o 'Non rilevato'." },
    tipoPolizza: { type: 'string', description: 'RCA, Casa, Vita, RC Professionale, Salute, Multiramo…' },
    numPolizza: { type: ['string', 'null'] },
    scadenza: { type: ['string', 'null'], description: 'Formato gg/mm/aaaa.' },
    premio: { type: ['string', 'null'], description: 'Premio annuo con il simbolo dell euro.' },
    coperture: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['nome', 'massimale', 'inclusa'],
        properties: {
          nome: { type: 'string' },
          massimale: { type: 'string' },
          inclusa: { type: 'boolean' },
        },
      },
    },
    esclusioni: { type: 'array', items: { type: 'string' } },
    lacune: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['titolo', 'descrizione', 'urgenza'],
        properties: {
          titolo: { type: 'string', description: 'Massimo otto parole.' },
          descrizione: {
            type: 'string',
            description: 'Il rischio non coperto e la conseguenza concreta per il cliente.',
          },
          urgenza: { type: 'string', enum: ['alta', 'media', 'bassa'] },
        },
      },
    },
    costiEccessivi: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['voce', 'suggerimento', 'risparmioStimato'],
        properties: {
          voce: { type: 'string', description: 'Cosa si può ottimizzare, massimo otto parole.' },
          suggerimento: { type: 'string' },
          risparmioStimato: {
            type: 'string',
            description:
              'Da cosa dipende il prezzo di questa voce e cosa lo farebbe scendere. Mai una cifra o una percentuale: un risparmio scritto è una promessa che nessuno ha verificato.',
          },
        },
      },
    },
    raccomandazioni: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['titolo', 'descrizione', 'priorita'],
        properties: {
          titolo: { type: 'string', description: 'Massimo otto parole.' },
          descrizione: { type: 'string' },
          priorita: { type: 'string', enum: ['alta', 'media', 'bassa'] },
        },
      },
    },
    valutazioneGlobale: {
      type: 'object',
      additionalProperties: false,
      required: ['punteggio', 'giudizio', 'sintesi'],
      properties: {
        punteggio: { type: 'integer', minimum: 1, maximum: 10 },
        giudizio: { type: 'string', description: "Titolo breve, es. 'Copertura buona con qualche lacuna'." },
        sintesi: { type: 'string', description: 'Due o tre frasi sull analisi complessiva.' },
      },
    },
  },
} as const

export async function POST(request: NextRequest) {
  const { ok, retryAfter } = await rateLimit(request, { limit: 3, windowMs: 60_000 })
  if (!ok) {
    return NextResponse.json(
      { error: 'Troppe richieste. Attendi qualche momento e riprova.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } },
    )
  }

  try {
    const body = await request.json()
    const { nome, email, pdfBase64, website } = body

    // Honeypot
    if (website) {
      return NextResponse.json({ error: 'Richiesta non valida' }, { status: 400 })
    }

    if (!nome || !email || !pdfBase64) {
      return NextResponse.json({ error: 'Dati mancanti' }, { status: 400 })
    }

    const nomeSafe = String(nome).trim().slice(0, 100)
    const emailSafe = String(email).trim().slice(0, 200)
    const b64 = String(pdfBase64)

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailSafe)) {
      return NextResponse.json({ error: 'Email non valida' }, { status: 400 })
    }

    if (b64.length > MAX_BASE64_LENGTH) {
      return NextResponse.json(
        { error: 'File troppo grande. Dimensione massima: 3 MB.' },
        { status: 400 },
      )
    }

    const message = await client.beta.messages.create({
      model: AI_MODELS.analysis,
      // Il tetto copre anche il thinking, acceso di default su Opus 5.
      max_tokens: 8192,
      output_config: {
        effort: 'medium',
        format: { type: 'json_schema', schema: ANALISI_SCHEMA },
      },
      betas: [FALLBACK_BETA],
      fallbacks: 'default',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'document',
              source: {
                type: 'base64',
                media_type: 'application/pdf',
                data: b64,
              },
            } satisfies BetaRequestDocumentBlock,
            {
              type: 'text',
              text: `Sei un analista assicurativo italiano. Analizza questa polizza per il cliente che l'ha caricata: onesto, concreto, niente giri di parole.

Note:
- Se un dato non è nel documento, usa null per i valori singoli e [] per gli elenchi
- Per le lacune, il metro sono le coperture standard del mercato italiano
- Il punteggio va da 1 (pessima copertura) a 10 (copertura ottima)
- Non scrivere cifre di risparmio: di' da cosa dipende il prezzo, non quanto si risparmierebbe`,
            },
          ],
        },
      ],
    })

    if (message.stop_reason === 'refusal') {
      console.error('analizza-polizza: rifiutata', message.stop_details?.category)
      return NextResponse.json(
        { error: "Non riesco ad analizzare questo documento. Chiamaci al +39 06 96883381." },
        { status: 422 },
      )
    }

    // Il primo blocco può essere il thinking: si cerca il testo per tipo.
    const content = message.content.find((b) => b.type === 'text')
    if (!content || content.type !== 'text') throw new Error('Risposta non valida')
    if (message.stop_reason === 'max_tokens') throw new Error('Risposta tagliata dal tetto di token')

    console.info(
      `[analizza-polizza] in=${message.usage.input_tokens} out=${message.usage.output_tokens}`,
    )

    const analysisData: unknown = JSON.parse(content.text)

    return NextResponse.json({ success: true, analysis: analysisData, nome: nomeSafe })
  } catch (error) {
    console.error('Errore analisi polizza:', error)
    return NextResponse.json(
      { error: "Errore durante l'analisi. Riprova o contattaci al +39 06 96883381." },
      { status: 500 },
    )
  }
}

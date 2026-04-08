import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import type { DocumentBlockParam } from '@anthropic-ai/sdk/resources/messages/messages'
import { rateLimit } from '@/lib/rateLimit'

export const runtime = 'nodejs'
export const maxDuration = 60

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// 3MB raw PDF → ~4MB base64 → safe under Vercel's 4.5MB body limit
const MAX_BASE64_LENGTH = 4_200_000

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

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2048,
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
            } satisfies DocumentBlockParam,
            {
              type: 'text',
              text: `Sei un esperto analista assicurativo italiano con 20 anni di esperienza nel mercato italiano. Analizza questa polizza assicurativa e fornisci un'analisi dettagliata e onesta.

Restituisci ESCLUSIVAMENTE un oggetto JSON valido (senza markdown, senza testo aggiuntivo, solo il JSON puro) con questa struttura:

{
  "compagnia": "nome compagnia assicurativa (o 'Non rilevato')",
  "tipoPolizza": "tipo di polizza (es. RCA, Casa, Vita, RC Professionale, Salute, Multiramo, ecc.)",
  "numPolizza": "numero polizza se presente (o null)",
  "scadenza": "data scadenza in formato dd/mm/yyyy (o null)",
  "premio": "premio annuo con simbolo euro (o null)",
  "coperture": [
    { "nome": "nome copertura", "massimale": "importo o descrizione massimale", "inclusa": true }
  ],
  "esclusioni": ["esclusione 1", "esclusione 2"],
  "lacune": [
    {
      "titolo": "titolo lacuna breve (max 8 parole)",
      "descrizione": "spiegazione chiara del rischio non coperto e delle conseguenze concrete per il cliente",
      "urgenza": "alta|media|bassa"
    }
  ],
  "costiEccessivi": [
    {
      "voce": "cosa potresti ottimizzare (max 8 parole)",
      "suggerimento": "come ridurre il costo o migliorare il rapporto qualità/prezzo",
      "risparmioStimato": "stima risparmio annuo (es. ~€100-200/anno)"
    }
  ],
  "raccomandazioni": [
    {
      "titolo": "titolo raccomandazione (max 8 parole)",
      "descrizione": "spiegazione dettagliata e beneficio concreto per il cliente",
      "priorita": "alta|media|bassa"
    }
  ],
  "valutazioneGlobale": {
    "punteggio": 7,
    "giudizio": "titolo breve del giudizio (es. 'Copertura buona con qualche lacuna')",
    "sintesi": "2-3 frasi di sintesi sull'analisi complessiva della polizza"
  }
}

Note:
- Se alcuni dati non sono presenti nel documento, usa null per valori singoli o [] per array
- Per le lacune, considera le coperture standard del mercato assicurativo italiano
- Per i costi eccessivi, confronta con i premi medi di mercato in Italia
- Il punteggio va da 1 (pessima copertura) a 10 (copertura ottima)
- Sii specifico e concreto, non generico`,
            },
          ],
        },
      ],
    })

    const content = message.content[0]
    if (content.type !== 'text') throw new Error('Risposta non valida')

    let analysisData: unknown
    try {
      const jsonStr = content.text.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim()
      analysisData = JSON.parse(jsonStr)
    } catch {
      const match = content.text.match(/\{[\s\S]*\}/)
      if (!match) throw new Error('JSON non trovato nella risposta')
      analysisData = JSON.parse(match[0])
    }

    return NextResponse.json({ success: true, analysis: analysisData, nome: nomeSafe })
  } catch (error) {
    console.error('Errore analisi polizza:', error)
    return NextResponse.json(
      { error: "Errore durante l'analisi. Riprova o contattaci al +39 06 96883381." },
      { status: 500 },
    )
  }
}

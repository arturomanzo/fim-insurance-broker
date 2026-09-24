import { NextRequest, NextResponse } from 'next/server'
import type Anthropic from '@anthropic-ai/sdk'
import { createFIMAStream } from '@/lib/anthropic'
import { salvaContatto } from '@/lib/fimaContatto'
import { rateLimit } from '@/lib/rateLimit'

export const runtime = 'nodejs'

/** Giri modello-strumento per richiesta. Uno strumento solo, quindi due bastano;
 *  il terzo copre un errore di validazione corretto al volo. */
const MAX_GIRI = 3

export async function POST(req: NextRequest) {
  // Diagnostica API key all'avvio
  const apiKey = process.env.ANTHROPIC_API_KEY ?? ''
  if (!apiKey) {
    console.error('FIMA: ANTHROPIC_API_KEY mancante')
    return NextResponse.json({ error: 'Configurazione mancante' }, { status: 500 })
  }
  if (!apiKey.startsWith('sk-ant-')) {
    console.error('FIMA: ANTHROPIC_API_KEY non valida (formato inatteso)')
    return NextResponse.json({ error: 'Configurazione non valida' }, { status: 500 })
  }

  try {
    const { ok, retryAfter } = await rateLimit(req, { limit: 40, windowMs: 60_000 })
    if (!ok) {
      return NextResponse.json(
        { error: 'Troppe richieste. Attendi qualche secondo e riprova.' },
        { status: 429, headers: { 'Retry-After': String(retryAfter) } },
      )
    }
    const body = await req.json()
    const { messages, pageContext } = body

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messaggi non validi' }, { status: 400 })
    }

    // Sanitize messages: only keep role and content, cap history at 30 turns
    const sanitizedMessages: Anthropic.Beta.BetaMessageParam[] = messages
      .filter((m: { role: string; content: string }) =>
        m.role === 'user' || m.role === 'assistant'
      )
      .slice(-30)
      .map((m: { role: 'user' | 'assistant'; content: string }) => ({
        role: m.role,
        content: String(m.content).slice(0, 4000),
      }))

    if (sanitizedMessages.length === 0) {
      return NextResponse.json({ error: 'Nessun messaggio valido' }, { status: 400 })
    }

    // Sanitize page context
    const sanitizedPageContext = pageContext
      ? String(pageContext).slice(0, 100).replace(/[^a-z0-9\-\/]/gi, '')
      : undefined

    // Prima prova a creare lo stream per catturare errori prima di inviare la risposta
    let anthropicStream
    try {
      anthropicStream = await createFIMAStream(sanitizedMessages, sanitizedPageContext)
    } catch (initError) {
      console.error('FIMA: Errore inizializzazione stream Anthropic:', initError)
      return NextResponse.json(
        { error: 'Errore di connessione al servizio AI' },
        { status: 500 }
      )
    }

    // Create streaming response
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const invia = (testo: string) =>
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ delta: testo })}\n\n`))
          let corrente = anthropicStream
          let scritto = false
          for (let giro = 1; giro <= MAX_GIRI; giro++) {
            // Il testo di un giro dopo lo strumento va a capo rispetto a quello di prima:
            // nel widget i giri finiscono nello stesso fumetto.
            let aCapo = scritto
            for await (const chunk of corrente) {
              if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
                if (aCapo) {
                  invia('\n\n')
                  aCapo = false
                }
                invia(chunk.delta.text)
                scritto = true
              }
            }

            // Un rifiuto dei classificatori arriva come turno riuscito senza testo:
            // senza questo il visitatore vedrebbe la chat restare in silenzio.
            const finale = await corrente.finalMessage()
            if (finale.stop_reason === 'refusal') {
              console.error('FIMA: richiesta rifiutata', finale.stop_details?.category)
              invia('Su questa richiesta non riesco a risponderti. Riprova a scrivermela in altro modo, oppure chiamaci allo 06 96883381.')
              break
            }

            const chiamate = finale.content.filter(
              (b): b is Anthropic.Beta.BetaToolUseBlock => b.type === 'tool_use',
            )
            if (finale.stop_reason !== 'tool_use' || chiamate.length === 0) break
            if (giro === MAX_GIRI) {
              invia('Non sono riuscito a registrare i tuoi dati. Puoi lasciarli qui: https://www.fimbroker.it/preventivo')
              break
            }

            // Il tool_result torna al modello, non al visitatore: è lui a dire
            // com'è andata, e se c'è un errore sa cosa chiedere di nuovo.
            const esiti: Anthropic.Beta.BetaToolResultBlockParam[] = []
            for (const c of chiamate) {
              const esito =
                c.name === 'salva_contatto'
                  ? await salvaContatto(c.input, { messaggi: sanitizedMessages, pagina: sanitizedPageContext })
                  : { ok: false as const, motivo: 'Strumento sconosciuto.' }
              esiti.push({
                type: 'tool_result',
                tool_use_id: c.id,
                content: JSON.stringify(esito),
                is_error: !esito.ok,
              })
            }
            sanitizedMessages.push({ role: 'assistant', content: finale.content })
            sanitizedMessages.push({ role: 'user', content: esiti })
            corrente = await createFIMAStream(sanitizedMessages, sanitizedPageContext)
          }

          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
        } catch (error) {
          console.error('FIMA: Stream error:', error)
          const errData = JSON.stringify({ error: 'Errore durante lo streaming' })
          controller.enqueue(encoder.encode(`data: ${errData}\n\n`))
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (error) {
    console.error('FIMA: Chat API error:', error)
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    )
  }
}

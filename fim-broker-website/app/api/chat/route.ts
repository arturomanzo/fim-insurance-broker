import { NextRequest, NextResponse } from 'next/server'
import { createFIMAStream } from '@/lib/anthropic'
import { rateLimit } from '@/lib/rateLimit'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  // Diagnostica API key all'avvio
  const apiKey = process.env.ANTHROPIC_API_KEY ?? ''
  if (!apiKey) {
    console.error('FIMA: ANTHROPIC_API_KEY mancante')
    return NextResponse.json({ error: 'Configurazione mancante' }, { status: 500 })
  }
  if (!apiKey.startsWith('sk-ant-')) {
    console.error('FIMA: ANTHROPIC_API_KEY non valida — primi 20 char:', apiKey.slice(0, 20))
    return NextResponse.json({ error: 'Configurazione non valida' }, { status: 500 })
  }

  const { ok, retryAfter } = await rateLimit(req, { limit: 40, windowMs: 60_000 })
  if (!ok) {
    return NextResponse.json(
      { error: 'Troppe richieste. Attendi qualche secondo e riprova.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } },
    )
  }

  try {
    const body = await req.json()
    const { messages, pageContext } = body

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messaggi non validi' }, { status: 400 })
    }

    // Sanitize messages: only keep role and content, cap history at 30 turns
    const sanitizedMessages = messages
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
          for await (const chunk of anthropicStream) {
            if (
              chunk.type === 'content_block_delta' &&
              chunk.delta.type === 'text_delta'
            ) {
              const data = JSON.stringify({ delta: chunk.delta.text })
              controller.enqueue(encoder.encode(`data: ${data}\n\n`))
            }
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

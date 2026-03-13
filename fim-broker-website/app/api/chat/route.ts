import { NextRequest, NextResponse } from 'next/server'
import { createFIMAStream } from '@/lib/anthropic'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { messages } = body

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messaggi non validi' }, { status: 400 })
    }

    // Sanitize messages: only keep role and content
    const sanitizedMessages = messages
      .filter((m: { role: string; content: string }) =>
        m.role === 'user' || m.role === 'assistant'
      )
      .map((m: { role: 'user' | 'assistant'; content: string }) => ({
        role: m.role,
        content: String(m.content).slice(0, 4000), // limit content length
      }))

    if (sanitizedMessages.length === 0) {
      return NextResponse.json({ error: 'Nessun messaggio valido' }, { status: 400 })
    }

    // Create streaming response
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const anthropicStream = await createFIMAStream(sanitizedMessages)

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
          console.error('Stream error:', error)
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
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'

interface PreventivoRequest {
  tipo: string
  nome: string
  cognome: string
  email: string
  telefono: string
  messaggio?: string
  oggetto?: string
  privacy: boolean
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function sanitize(value: unknown): string {
  return String(value ?? '').trim().slice(0, 1000)
}

export async function POST(req: NextRequest) {
  try {
    const body: PreventivoRequest = await req.json()

    // Validate required fields
    const nome = sanitize(body.nome)
    const cognome = sanitize(body.cognome)
    const email = sanitize(body.email)
    const telefono = sanitize(body.telefono)
    const tipo = sanitize(body.tipo)

    if (!nome || !cognome || !email || !telefono || !tipo) {
      return NextResponse.json(
        { error: 'Campi obbligatori mancanti' },
        { status: 400 }
      )
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Indirizzo email non valido' },
        { status: 400 }
      )
    }

    if (!body.privacy) {
      return NextResponse.json(
        { error: 'Consenso privacy obbligatorio' },
        { status: 400 }
      )
    }

    // In a real implementation, you would:
    // 1. Save to database (e.g., Firebase, PostgreSQL, etc.)
    // 2. Send confirmation email to the client
    // 3. Send notification email to the FIM team
    // 4. Integrate with CRM

    const preventivoData = {
      id: `FIM-${Date.now()}`,
      tipo,
      nome,
      cognome,
      email,
      telefono,
      messaggio: sanitize(body.messaggio),
      oggetto: sanitize(body.oggetto),
      timestamp: new Date().toISOString(),
      status: 'pending',
    }

    // Log for development (replace with actual storage in production)
    console.log('Nuova richiesta preventivo:', preventivoData)

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 100))

    return NextResponse.json(
      {
        success: true,
        message: 'Richiesta ricevuta correttamente. Ti contatteremo entro 24 ore lavorative.',
        id: preventivoData.id,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Preventivo API error:', error)
    return NextResponse.json(
      { error: 'Errore interno del server. Riprova o contattaci direttamente.' },
      { status: 500 }
    )
  }
}

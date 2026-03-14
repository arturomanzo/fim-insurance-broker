import { NextRequest, NextResponse } from 'next/server';

interface PreventivoRequest {
  nome: string;
  email: string;
  telefono: string;
  tipo_polizza: string;
  note?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: PreventivoRequest = await req.json();

    const { nome, email, telefono, tipo_polizza, note } = body;

    // Basic validation
    if (!nome || !email || !telefono || !tipo_polizza) {
      return NextResponse.json(
        { success: false, error: 'Campi obbligatori mancanti' },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Formato email non valido' },
        { status: 400 }
      );
    }

    // Log the request (in production, send email or save to DB)
    console.log('=== NUOVA RICHIESTA PREVENTIVO ===');
    console.log('Nome:', nome);
    console.log('Email:', email);
    console.log('Telefono:', telefono);
    console.log('Tipo Polizza:', tipo_polizza);
    console.log('Note:', note || 'Nessuna');
    console.log('Data:', new Date().toISOString());
    console.log('==================================');

    return NextResponse.json({
      success: true,
      message: 'Richiesta di preventivo ricevuta. Ti contatteremo al più presto.',
    });
  } catch (error) {
    console.error('Error processing preventivo request:', error);
    return NextResponse.json(
      { success: false, error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}

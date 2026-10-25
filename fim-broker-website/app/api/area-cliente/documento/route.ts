import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, SESSION_COOKIE } from '@/lib/clientAuth'
import { linkDocumento } from '@/lib/areaCliente'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.fimbroker.it'

/**
 * GET /api/area-cliente/documento?id=123 — il pulsante "Scarica" dell'Area Cliente.
 *
 * Il link firmato lo crea il gestionale al momento del clic e dura un minuto: nella
 * pagina non c'è mai un indirizzo del file che si possa girare o che resti valido.
 * Il gestionale controlla di nuovo che il documento stia su una polizza di questa
 * email, quindi cambiare l'id nell'indirizzo non apre i documenti di un altro.
 */
export async function GET(req: NextRequest) {
  const email = await verifyToken(req.cookies.get(SESSION_COOKIE)?.value ?? '')
  if (!email) return NextResponse.redirect(new URL('/area-cliente?expired=1', BASE_URL))

  const id = Number(req.nextUrl.searchParams.get('id'))
  const url = Number.isSafeInteger(id) && id > 0 ? await linkDocumento(email, id) : null
  if (!url) return NextResponse.redirect(new URL('/area-cliente/dashboard?documento=errore', BASE_URL))

  return NextResponse.redirect(url)
}

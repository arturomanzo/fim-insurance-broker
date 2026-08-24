import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

/**
 * Health check pubblico.
 *
 * Era irraggiungibile (405): non stava nella whitelist GET del middleware, che
 * blocca i metodi non previsti su /api/* (audit 13/08/2026). Aggiunto lì.
 *
 * L'inventario delle integrazioni configurate resta però dietro al
 * `CRON_SECRET`: da solo non espone valori, ma dire a chiunque *quali*
 * servizi sono collegati è una mappa gratis per chi cerca una superficie
 * d'attacco. Chi sonda da fuori riceve lo stato, chi ha la chiave riceve il
 * dettaglio.
 */
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET
  const header = request.headers.get('authorization')
  const authorized = Boolean(secret) && header === `Bearer ${secret}`

  return NextResponse.json(
    {
      status: 'ok',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version ?? '0.1.0',
      ...(authorized
        ? {
            env: {
              resend: !!process.env.RESEND_API_KEY,
              anthropic: !!process.env.ANTHROPIC_API_KEY,
              clientAuth: !!process.env.CLIENT_AUTH_SECRET,
              adminAuth: !!process.env.ADMIN_AUTH_SECRET,
              cron: !!process.env.CRON_SECRET,
            },
          }
        : {}),
    },
    {
      headers: {
        'Cache-Control': 'no-store',
        'X-Robots-Tag': 'noindex',
      },
    }
  )
}

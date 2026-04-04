import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET() {
  return NextResponse.json(
    {
      status: 'ok',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version ?? '0.1.0',
      env: {
        resend: !!process.env.RESEND_API_KEY,
        anthropic: !!process.env.ANTHROPIC_API_KEY,
        clientAuth: !!process.env.CLIENT_AUTH_SECRET,
        adminAuth: !!process.env.ADMIN_AUTH_SECRET,
        cron: !!process.env.CRON_SECRET,
      },
    },
    {
      headers: {
        'Cache-Control': 'no-store',
        'X-Robots-Tag': 'noindex',
      },
    }
  )
}

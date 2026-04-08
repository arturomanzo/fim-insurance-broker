/**
 * Renewal reminder cron job — GET /api/cron/reminder-rinnovi
 *
 * Called once per day (Vercel Cron or external scheduler).
 * Protected by CRON_SECRET environment variable (Bearer token).
 *
 * Tiers:
 *  60 days → standard informational email (template)
 *  30 days → AI-powered email: Claude analizza la polizza e genera una
 *             proposta personalizzata con 3 opzioni di rinnovo
 *   7 days → urgent template (speed over personalization)
 */
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getPoliciesExpiringInDays } from '@/lib/policyData'
import type { Policy } from '@/lib/policyData'
import { generateRenewalProposal, buildAIRenewalEmail } from '@/lib/renewalAgent'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const FIM_FROM = process.env.FIM_FROM_EMAIL || 'FIM Insurance Broker <noreply@fimbroker.it>'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.fimbroker.it'
const CRON_SECRET = process.env.CRON_SECRET || ''

// ── Standard template (60-day and 7-day) ──────────────────────────────────────

function buildReminderEmail(policy: Policy, daysLeft: number): string {
  const expiryDate = new Date(policy.dataScadenza).toLocaleDateString('it-IT', {
    day: '2-digit', month: 'long', year: 'numeric',
  })
  const urgency = daysLeft <= 7 ? '⚠️ Urgente: ' : '📬 '
  const headerColor = daysLeft <= 7 ? '#dc2626' : '#0f2d6b'
  const renewUrl = `${BASE_URL}/preventivo?tipo=${encodeURIComponent(policy.tipo)}`
  const dashUrl = `${BASE_URL}/area-cliente`

  return `<!DOCTYPE html><html lang="it"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="font-family:system-ui,sans-serif;background:#f8fafc;margin:0;padding:20px;">
  <div style="max-width:560px;margin:0 auto;background:white;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.07);">
    <div style="background:${headerColor};padding:28px 32px;">
      <h1 style="color:white;margin:0;font-size:19px;font-weight:900;">
        ${urgency}La tua polizza scade tra ${daysLeft} giorni
      </h1>
    </div>
    <div style="padding:32px;">
      <p style="font-size:15px;color:#1e293b;margin:0 0 16px;">Gentile <strong>${policy.clientName}</strong>,</p>
      <p style="font-size:14px;color:#475569;line-height:1.7;margin:0 0 20px;">
        Ti ricordiamo che la tua polizza <strong style="color:#0f2d6b;">${policy.tipo}</strong>
        (${policy.compagnia} — n. ${policy.numeroPolizza}) scadrà il
        <strong>${expiryDate}</strong>, tra <strong>${daysLeft} giorni</strong>.
      </p>

      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:16px;margin:0 0 24px;">
        <p style="margin:0 0 8px;font-size:13px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Riepilogo polizza</p>
        <table style="width:100%;font-size:13px;color:#475569;border-collapse:collapse;">
          <tr><td style="padding:4px 0;width:40%;">Tipo</td><td style="font-weight:600;color:#0f2d6b;">${policy.tipo}</td></tr>
          <tr><td style="padding:4px 0;">Compagnia</td><td style="font-weight:600;">${policy.compagnia}</td></tr>
          <tr><td style="padding:4px 0;">N. polizza</td><td>${policy.numeroPolizza}</td></tr>
          <tr><td style="padding:4px 0;">Scadenza</td><td style="font-weight:600;color:${daysLeft <= 7 ? '#dc2626' : '#ea580c'};">${expiryDate}</td></tr>
          <tr><td style="padding:4px 0;">Premio annuo</td><td>€${policy.premioAnnuo.toLocaleString('it-IT')}</td></tr>
        </table>
      </div>

      <p style="font-size:14px;color:#475569;margin:0 0 20px;">
        Per rinnovare o richiedere un preventivo aggiornato, clicca qui:
      </p>
      <div style="text-align:center;margin:0 0 24px;">
        <a href="${renewUrl}"
           style="display:inline-block;background:#00b4c8;color:white;padding:14px 36px;border-radius:10px;text-decoration:none;font-weight:700;font-size:15px;">
          Richiedi rinnovo →
        </a>
      </div>
      <p style="font-size:13px;color:#94a3b8;text-align:center;">
        Oppure accedi alla tua <a href="${dashUrl}" style="color:#0f2d6b;">Area Cliente</a>
        · Chiama: <a href="tel:+390696883381" style="color:#0f2d6b;">06 96883381</a>
      </p>
    </div>
    <div style="background:#0f2d6b;padding:16px 32px;">
      <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.4);text-align:center;">
        FIM Insurance Broker S.a.s.
        — <a href="${BASE_URL}/privacy-policy" style="color:rgba(255,255,255,0.4);">Privacy Policy</a>
      </p>
    </div>
  </div>
</body></html>`
}

// ── Cron handler ──────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  if (CRON_SECRET) {
    const auth = req.headers.get('authorization') ?? ''
    if (auth !== `Bearer ${CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  const REMINDER_DAYS = [60, 30, 7] as const
  const results: { days: number; sent: number; errors: number; aiGenerated?: number }[] = []

  for (const days of REMINDER_DAYS) {
    const policies = getPoliciesExpiringInDays(days)
    let sent = 0
    let errors = 0
    let aiGenerated = 0

    for (const policy of policies) {
      try {
        let html: string
        let subject: string

        if (days === 30) {
          // ── AI-powered personalized renewal proposal ──
          const proposal = await generateRenewalProposal(policy, days)

          if (proposal) {
            html = buildAIRenewalEmail(policy, days, proposal, BASE_URL)
            subject = `${policy.clientName}, la tua polizza ${policy.tipo} — 3 opzioni di rinnovo personalizzate`
            aiGenerated++
          } else {
            // Fallback to template if AI fails
            html = buildReminderEmail(policy, days)
            subject = `La tua polizza ${policy.tipo} scade tra ${days} giorni — FIM Insurance Broker`
          }
        } else {
          // ── Standard template for 60-day and 7-day ──
          html = buildReminderEmail(policy, days)
          subject = `La tua polizza ${policy.tipo} scade tra ${days} giorni — FIM Insurance Broker`
        }

        if (resend) {
          await resend.emails.send({
            from: FIM_FROM,
            to: [policy.clientEmail],
            subject,
            html,
          })
          sent++
        } else if (process.env.NODE_ENV !== 'production') {
          const aiLabel = days === 30 && aiGenerated > 0 ? ' [AI]' : ''
          console.log(
            `[DEV] Reminder ${days}d${aiLabel}: ${policy.clientEmail} — ${policy.tipo} (${policy.numeroPolizza})`,
          )
          sent++
        }
      } catch (err) {
        console.error(`Reminder error for ${policy.clientEmail} (${days}d):`, err)
        errors++
      }
    }

    const result: { days: number; sent: number; errors: number; aiGenerated?: number } = {
      days,
      sent,
      errors,
    }
    if (days === 30) result.aiGenerated = aiGenerated
    results.push(result)
  }

  return NextResponse.json({
    ok: true,
    date: new Date().toISOString().slice(0, 10),
    results,
  })
}

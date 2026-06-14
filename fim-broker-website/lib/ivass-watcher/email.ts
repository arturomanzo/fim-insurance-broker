/**
 * IVASS Watcher — email digest verso il compliance owner.
 *
 * Triggerata solo se ci sono item con `relevance` in {high, medium}.
 * Mittente: `FIM_FROM_EMAIL`. Destinatario: `WATCHER_ALERT_EMAIL`
 * (fallback su `FIM_EMAIL` → `info@fimbroker.it`).
 */
import { Resend } from 'resend'
import type { RssItem } from './rss'
import type { SourceId, Source } from './sources'
import type { TriageResult } from './triage'
import type { RecentRow } from './state'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const FROM = process.env.FIM_FROM_EMAIL || 'FIM Insurance Broker <noreply@fimbroker.it>'
const TO =
  process.env.WATCHER_ALERT_EMAIL ||
  process.env.FIM_EMAIL ||
  'info@fimbroker.it'

export interface DigestItem {
  source: Source
  item: RssItem
  triage: TriageResult
}

interface SendResult {
  sent: boolean
  to?: string
  error?: string
  /** true se siamo in dev senza API key e abbiamo solo loggato. */
  dryRun?: boolean
}

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function badge(rel: 'high' | 'medium'): string {
  const colors = {
    high: { bg: '#dc2626', label: 'URGENTE' },
    medium: { bg: '#ea580c', label: 'RILEVANTE' },
  }
  const c = colors[rel]
  return `<span style="display:inline-block;padding:3px 10px;background:${c.bg};color:white;font-size:10px;font-weight:700;border-radius:4px;letter-spacing:0.8px;">${c.label}</span>`
}

function itemBlock(d: DigestItem): string {
  const pub = d.item.pubDate
    ? d.item.pubDate.toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' })
    : '—'
  const rel = d.triage.relevance as 'high' | 'medium'
  const pages =
    d.triage.affectedPages.length > 0
      ? d.triage.affectedPages.map((p) => `<code style="background:#f1f5f9;padding:2px 6px;border-radius:3px;font-size:12px;">${esc(p)}</code>`).join(' · ')
      : '<em style="color:#64748b;">nessuna pagina del sito coinvolta</em>'
  const deadline = d.triage.deadline
    ? `<p style="margin:8px 0 0;font-size:13px;"><strong style="color:#dc2626;">⏰ Scadenza:</strong> ${esc(d.triage.deadline)}</p>`
    : ''
  const refs = d.triage.normativeRefs
    ? `<p style="margin:8px 0 0;font-size:12px;color:#64748b;"><strong>Riferimenti:</strong> ${esc(d.triage.normativeRefs)}</p>`
    : ''

  return `
<div style="border:1px solid #e2e8f0;border-radius:10px;padding:18px;margin:0 0 14px;background:white;">
  <div style="display:flex;gap:10px;align-items:center;margin:0 0 10px;">
    ${badge(rel)}
    <span style="font-size:12px;color:#64748b;">${esc(d.source.label)} · ${pub}</span>
  </div>
  <h3 style="margin:0 0 8px;font-size:16px;color:#0f2d6b;line-height:1.4;">
    <a href="${esc(d.item.link)}" style="color:#0f2d6b;text-decoration:none;">${esc(d.item.title)}</a>
  </h3>
  <p style="margin:0 0 10px;font-size:13px;color:#475569;line-height:1.6;">${esc(d.triage.summary)}</p>
  <p style="margin:8px 0 0;font-size:12px;color:#475569;"><strong>Pagine sito impattate:</strong> ${pages}</p>
  ${deadline}
  ${refs}
  <p style="margin:12px 0 0;">
    <a href="${esc(d.item.link)}" style="color:#00b4c8;font-size:12px;font-weight:600;text-decoration:none;">Leggi il testo originale →</a>
  </p>
</div>`
}

function buildHtml(digestDate: string, high: DigestItem[], medium: DigestItem[]): string {
  const totalHigh = high.length
  const totalMedium = medium.length

  const highSection =
    totalHigh > 0
      ? `<h2 style="margin:24px 0 12px;font-size:16px;color:#dc2626;text-transform:uppercase;letter-spacing:1px;">🚨 Urgenti (${totalHigh})</h2>${high.map(itemBlock).join('')}`
      : ''
  const mediumSection =
    totalMedium > 0
      ? `<h2 style="margin:24px 0 12px;font-size:16px;color:#ea580c;text-transform:uppercase;letter-spacing:1px;">📌 Rilevanti (${totalMedium})</h2>${medium.map(itemBlock).join('')}`
      : ''

  return `<!DOCTYPE html><html lang="it"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f8fafc;margin:0;padding:24px;">
  <div style="max-width:640px;margin:0 auto;">
    <div style="background:#0f2d6b;border-radius:12px 12px 0 0;padding:28px 32px;">
      <p style="margin:0;font-size:11px;color:#00b4c8;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">IVASS Watcher · Report giornaliero</p>
      <h1 style="margin:6px 0 0;color:white;font-size:22px;font-weight:900;">${totalHigh + totalMedium} novità normative rilevanti</h1>
      <p style="margin:6px 0 0;color:rgba(255,255,255,0.7);font-size:13px;">${esc(digestDate)}</p>
    </div>
    <div style="background:#f8fafc;padding:24px 8px;border-radius:0 0 12px 12px;border:1px solid #e2e8f0;border-top:none;">
      ${highSection}
      ${mediumSection}
      <div style="margin:24px 12px 0;padding:14px;background:white;border:1px dashed #cbd5e1;border-radius:8px;font-size:12px;color:#64748b;line-height:1.6;">
        <strong style="color:#0f2d6b;">Cosa fare ora.</strong> Per ciascuna voce contrassegnata "URGENTE",
        valuta se aprire una PR sul repo del sito per aggiornare le pagine indicate. Per le voci "RILEVANTE",
        verifica entro la fine del mese se richiedono adempimenti operativi (FAQ, contenuti commerciali, formazione).
        Voci di rilevanza "low" o "none" non generano email: vengono comunque tracciate in DB per audit.
      </div>
      <p style="margin:18px 12px 0;font-size:11px;color:#94a3b8;text-align:center;">
        Watcher automatico · FIM Insurance Broker · Cron giornaliero
      </p>
    </div>
  </div>
</body></html>`
}

function buildSubject(high: number, medium: number, date: string): string {
  if (high > 0) {
    return `[URGENTE × ${high}] Aggiornamenti normativi IVASS — ${date}`
  }
  return `Aggiornamenti normativi IVASS (${medium} rilevanti) — ${date}`
}

export async function sendDigest(items: DigestItem[]): Promise<SendResult> {
  const relevant = items.filter(
    (i) => i.triage.relevance === 'high' || i.triage.relevance === 'medium',
  )
  if (relevant.length === 0) {
    return { sent: false }
  }

  const high = relevant.filter((i) => i.triage.relevance === 'high')
  const medium = relevant.filter((i) => i.triage.relevance === 'medium')

  const dateStr = new Date().toLocaleDateString('it-IT', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
  const subject = buildSubject(high.length, medium.length, dateStr)
  const html = buildHtml(dateStr, high, medium)

  if (!resend) {
    // Dev fallback: log
    console.log(`[ivass-watcher] DRY-RUN email a ${TO}: "${subject}" (${relevant.length} item)`)
    return { sent: true, to: TO, dryRun: true }
  }

  try {
    await resend.emails.send({
      from: FROM,
      to: [TO],
      subject,
      html,
    })
    return { sent: true, to: TO }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[ivass-watcher] sendDigest error:', msg)
    return { sent: false, to: TO, error: msg }
  }
}

/** Esportato anche per uso in admin/test route — non strettamente necessario. */
export function getDestinationEmail(): string {
  return TO
}

// ── Heartbeat settimanale ─────────────────────────────────────────────────────

const REL_TAG: Record<string, { bg: string; label: string }> = {
  high: { bg: '#dc2626', label: 'URGENTE' },
  medium: { bg: '#ea580c', label: 'RILEVANTE' },
  low: { bg: '#64748b', label: 'minore' },
  none: { bg: '#94a3b8', label: 'non pertinente' },
}

function heartbeatRow(r: RecentRow): string {
  const tag = REL_TAG[r.relevance ?? 'none'] ?? REL_TAG.none
  const day = r.detected_at
    ? new Date(r.detected_at).toLocaleDateString('it-IT', { day: '2-digit', month: 'short' })
    : '—'
  return `
<tr>
  <td style="padding:8px 10px;border-bottom:1px solid #f1f5f9;font-size:11px;color:#94a3b8;white-space:nowrap;vertical-align:top;">${day}</td>
  <td style="padding:8px 10px;border-bottom:1px solid #f1f5f9;vertical-align:top;">
    <span style="display:inline-block;padding:2px 7px;background:${tag.bg};color:white;font-size:9px;font-weight:700;border-radius:3px;letter-spacing:0.5px;">${tag.label}</span>
    <a href="${esc(r.url)}" style="color:#0f2d6b;font-size:13px;text-decoration:none;margin-left:6px;">${esc(r.title)}</a>
  </td>
</tr>`
}

/**
 * Digest settimanale "heartbeat": inviato anche quando non c'è nulla di rilevante,
 * così il watcher non è mai silenzioso e resta un registro di audit. Tipicamente
 * schedulato il lunedì dal cron.
 */
export async function sendWeeklyHeartbeat(rows: RecentRow[]): Promise<SendResult> {
  const counts = rows.reduce(
    (acc, r) => { acc[r.relevance ?? 'none'] = (acc[r.relevance ?? 'none'] ?? 0) + 1; return acc },
    {} as Record<string, number>,
  )
  const dateStr = new Date().toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' })
  const subject = `IVASS Watcher · riepilogo settimanale (${rows.length} voci)`

  const summaryLine =
    rows.length === 0
      ? 'Nessuna nuova voce normativa negli ultimi 7 giorni. Il watcher è attivo e in ascolto.'
      : `${rows.length} voci rilevate negli ultimi 7 giorni — ` +
        `${counts.high ?? 0} urgenti · ${counts.medium ?? 0} rilevanti · ${counts.low ?? 0} minori · ${counts.none ?? 0} non pertinenti.`

  const table =
    rows.length > 0
      ? `<table style="width:100%;border-collapse:collapse;background:white;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">${rows.map(heartbeatRow).join('')}</table>`
      : ''

  const html = `<!DOCTYPE html><html lang="it"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f8fafc;margin:0;padding:24px;">
  <div style="max-width:640px;margin:0 auto;">
    <div style="background:#0f2d6b;border-radius:12px 12px 0 0;padding:28px 32px;">
      <p style="margin:0;font-size:11px;color:#00b4c8;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">IVASS Watcher · Riepilogo settimanale</p>
      <h1 style="margin:6px 0 0;color:white;font-size:20px;font-weight:900;">${esc(summaryLine)}</h1>
      <p style="margin:6px 0 0;color:rgba(255,255,255,0.7);font-size:13px;">Settimana al ${esc(dateStr)}</p>
    </div>
    <div style="background:#f8fafc;padding:24px 16px;border-radius:0 0 12px 12px;border:1px solid #e2e8f0;border-top:none;">
      ${table}
      <p style="margin:18px 4px 0;font-size:11px;color:#94a3b8;text-align:center;">
        Gli alert "URGENTE"/"RILEVANTE" arrivano comunque in tempo reale ogni giorno. Questo è solo il riepilogo di audit.
      </p>
    </div>
  </div>
</body></html>`

  if (!resend) {
    console.log(`[ivass-watcher] DRY-RUN heartbeat a ${TO}: "${subject}" (${rows.length} voci)`)
    return { sent: true, to: TO, dryRun: true }
  }
  try {
    await resend.emails.send({ from: FROM, to: [TO], subject, html })
    return { sent: true, to: TO }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[ivass-watcher] sendWeeklyHeartbeat error:', msg)
    return { sent: false, to: TO, error: msg }
  }
}

/** Identificatori espliciti delle fonti (utile per logging). */
export type { SourceId }

/**
 * Agente Rinnovi Intelligente
 *
 * Per il promemoria a 30 giorni, usa Claude per:
 * 1. Analizzare la polizza in scadenza
 * 2. Generare 3 opzioni di rinnovo personalizzate sul tipo di copertura
 * 3. Scrivere il testo dell'email come un consulente reale (non un template)
 *
 * Modello: AI_MODELS.draft (batch, costo basso).
 * Fallback al template standard se l'AI non risponde.
 */
import Anthropic from '@anthropic-ai/sdk'
import { AI_MODELS } from './ai-models'
import type { Policy } from '@/lib/policyData'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// ── Types ─────────────────────────────────────────────────────────────────────

export interface RenewalOption {
  titolo: string
  descrizione: string
  vantaggio: string
}

export interface RenewalProposal {
  intro: string           // 2-3 frasi di apertura personalizzate
  urgencyReason: string   // motivo specifico per agire subito
  options: RenewalOption[]
  closingNote: string     // chiusura calda e professionale
}

// ── HTML helpers ──────────────────────────────────────────────────────────────

function esc(s: unknown): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// ── AI proposal generation ────────────────────────────────────────────────────

// La forma la garantisce l'API: il prompt descrive solo cosa scrivere dentro.
const PROPOSTA_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['intro', 'urgencyReason', 'options', 'closingNote'],
  properties: {
    intro: { type: 'string' },
    urgencyReason: { type: 'string' },
    options: {
      type: 'array',
      // Il numero di elementi sta nella descrizione e nel controllo a valle:
      // l'API rifiuta i vincoli numerici dentro lo schema.
      description: 'Esattamente tre opzioni di rinnovo.',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['titolo', 'descrizione', 'vantaggio'],
        properties: {
          titolo: { type: 'string' },
          descrizione: { type: 'string' },
          vantaggio: { type: 'string' },
        },
      },
    },
    closingNote: { type: 'string' },
  },
} as const

export async function generateRenewalProposal(
  policy: Policy,
  daysLeft: number,
): Promise<RenewalProposal | null> {
  try {
    const message = await client.messages.create({
      model: AI_MODELS.draft,
      // Il tetto stretto tagliava il JSON in silenzio. Niente `effort`: Haiku 4.5
      // lo rifiuta con un 400.
      max_tokens: 4096,
      output_config: { format: { type: 'json_schema', schema: PROPOSTA_SCHEMA } },
      messages: [
        {
          role: 'user',
          content: `Sei un consulente assicurativo senior di FIM Insurance Broker — broker indipendente con accesso a 20 compagnie assicurative italiane.

Devi generare il contenuto testuale di un'email di rinnovo polizza personalizzata, scritta come la scriverebbe un consulente che conosce il cliente.

DATI POLIZZA IN SCADENZA:
- Nome cliente: ${policy.clientName}
- Tipo polizza: ${policy.tipo}
- Compagnia attuale: ${policy.compagnia}
- Premio annuo: €${policy.premioAnnuo.toLocaleString('it-IT')}
${policy.massimale ? `- Massimale: ${policy.massimale}` : ''}
${policy.note ? `- Note: ${policy.note}` : ''}
- Giorni alla scadenza: ${daysLeft}

Genera 3 opzioni di rinnovo specifiche per il tipo "${policy.tipo}", concrete e diverse fra loro.

Cosa scrivere in ogni campo:
- "intro": due o tre frasi di apertura. Il nome del cliente, la polizza, e un'osservazione pertinente alla copertura (l'auto porta il discorso sulla strada, la casa sul patrimonio). Apri come apriresti una mail a una persona che conosci, non con una formula di circolare.
- "urgencyReason": una frase su cosa rischia davvero se la polizza scade senza rinnovo, legata al tipo "${policy.tipo}" (per l'auto guidare scoperti è un reato; per la casa un sinistro resta a carico suo). Diretto.
- "options[0]": il rinnovo in continuità con ${policy.compagnia} — nessuna interruzione, nessuna burocrazia, storico del cliente preservato. Nel "vantaggio" quello che si ottiene restando (niente carenze, massimale storico confermato).
- "options[1]": un'estensione di copertura sensata per "${policy.tipo}" — cosa si aggiunge rispetto a oggi (kasko sull'auto, furto e alluvione sulla casa, LTC sulla vita).
- "options[2]": l'analisi di mercato che FIM può fare su "${policy.tipo}", confrontando le compagnie con cui lavora.
- "closingNote": una o due frasi che invitano a sentirsi per telefono o via email, col nome del cliente. Firma "Il tuo consulente FIM".

Non scrivere cifre di risparmio, percentuali o premi: quello che si ottiene lo si dice a voce, dopo aver guardato il mercato. Un numero in un'email è una promessa che nessuno ha ancora verificato.`,
        },
      ],
    })

    if (message.stop_reason === 'refusal' || message.stop_reason === 'max_tokens') {
      console.error('[renewalAgent] risposta inutilizzabile:', message.stop_reason)
      return null
    }

    const content = message.content.find((b) => b.type === 'text')
    if (!content || content.type !== 'text') return null

    const parsed = JSON.parse(content.text) as RenewalProposal

    // Basic validation
    if (!parsed.intro || !Array.isArray(parsed.options) || parsed.options.length < 3) return null
    parsed.options = parsed.options.slice(0, 3)

    return parsed
  } catch (err) {
    console.error('[renewalAgent] AI generation error:', err)
    return null
  }
}

// ── AI-powered email HTML ─────────────────────────────────────────────────────

export function buildAIRenewalEmail(
  policy: Policy,
  daysLeft: number,
  proposal: RenewalProposal,
  baseUrl: string,
): string {
  const expiryDate = new Date(policy.dataScadenza).toLocaleDateString('it-IT', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  const renewUrl = `${baseUrl}/preventivo?tipo=${encodeURIComponent(policy.tipo)}`
  const consultUrl = `${baseUrl}/prenota-consulenza`
  const dashUrl = `${baseUrl}/area-cliente`

  const optionsHtml = proposal.options
    .map(
      (opt, i) => `
    <div style="background:white;border:1.5px solid #e2e8f0;border-radius:10px;padding:18px;margin:0 0 12px;">
      <div style="display:flex;align-items:flex-start;gap:12px;">
        <div style="width:28px;height:28px;background:#0B1F3A;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:13px;font-weight:700;color:white;text-align:center;line-height:28px;">
          ${i + 1}
        </div>
        <div style="flex:1;">
          <p style="margin:0 0 5px;font-weight:700;color:#0B1F3A;font-size:14px;">${esc(opt.titolo)}</p>
          <p style="margin:0 0 8px;font-size:13px;color:#475569;line-height:1.6;">${esc(opt.descrizione)}</p>
          <div style="background:#f0fdf4;border-left:3px solid #16a34a;padding:6px 10px;border-radius:0 6px 6px 0;">
            <p style="margin:0;font-size:12px;color:#15803d;font-weight:600;">✓ ${esc(opt.vantaggio)}</p>
          </div>
        </div>
      </div>
    </div>`,
    )
    .join('')

  return `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
</head>
<body style="font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;margin:0;padding:20px;">
  <div style="max-width:580px;margin:0 auto;">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#060f1d,#132d52);padding:24px 32px;border-radius:12px 12px 0 0;">
      <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.5);letter-spacing:1.5px;text-transform:uppercase;font-weight:600;">FIM Insurance Broker</p>
      <h1 style="margin:8px 0 0;font-size:20px;color:white;font-weight:800;line-height:1.3;">
        La tua polizza ${esc(policy.tipo)} scade tra <span style="color:#2FA36B;">${daysLeft} giorni</span>
      </h1>
    </div>

    <!-- Urgency banner -->
    <div style="background:#ea580c;padding:10px 32px;">
      <p style="margin:0;font-size:13px;color:white;font-weight:600;">
        ⚠ ${esc(proposal.urgencyReason)}
      </p>
    </div>

    <!-- Body -->
    <div style="background:white;padding:32px;">

      <!-- AI-generated intro -->
      <p style="font-size:15px;color:#1e293b;line-height:1.7;margin:0 0 24px;">${esc(proposal.intro).replace(/\n/g, '<br>')}</p>

      <!-- Policy summary -->
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px 18px;margin:0 0 24px;">
        <p style="margin:0 0 8px;font-size:11px;color:#94a3b8;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;">La tua polizza attuale</p>
        <table style="width:100%;font-size:13px;color:#475569;border-collapse:collapse;">
          <tr><td style="padding:3px 0;width:38%;">Tipo</td><td style="font-weight:700;color:#0B1F3A;">${esc(policy.tipo)}</td></tr>
          <tr><td style="padding:3px 0;">Compagnia</td><td style="font-weight:600;">${esc(policy.compagnia)}</td></tr>
          <tr><td style="padding:3px 0;">N. polizza</td><td>${esc(policy.numeroPolizza)}</td></tr>
          <tr><td style="padding:3px 0;">Scadenza</td><td style="font-weight:700;color:#ea580c;">${esc(expiryDate)}</td></tr>
          <tr><td style="padding:3px 0;">Premio annuo</td><td style="font-weight:600;">€${policy.premioAnnuo.toLocaleString('it-IT')}</td></tr>
        </table>
      </div>

      <!-- Options -->
      <p style="font-size:14px;font-weight:700;color:#0B1F3A;margin:0 0 12px;">Le tue 3 opzioni</p>
      ${optionsHtml}

      <!-- CTAs -->
      <div style="margin:28px 0 20px;text-align:center;">
        <a href="${esc(renewUrl)}"
           style="display:inline-block;background:#2FA36B;color:white;padding:14px 32px;border-radius:10px;text-decoration:none;font-weight:800;font-size:15px;margin:0 6px 8px;">
          Rinnova ora →
        </a>
        <a href="${esc(consultUrl)}"
           style="display:inline-block;background:white;color:#0B1F3A;padding:14px 32px;border-radius:10px;text-decoration:none;font-weight:700;font-size:15px;border:2px solid #0B1F3A;margin:0 6px 8px;">
          Prenota consulenza
        </a>
      </div>

      <!-- AI closing note -->
      <p style="font-size:14px;color:#475569;line-height:1.7;margin:0 0 20px;">${esc(proposal.closingNote).replace(/\n/g, '<br>')}</p>

      <!-- Contact info -->
      <div style="border-top:1px solid #f1f5f9;padding-top:16px;font-size:12px;color:#94a3b8;text-align:center;">
        <a href="${esc(dashUrl)}" style="color:#0B1F3A;text-decoration:none;">Area Cliente</a>
        &nbsp;·&nbsp;
        <a href="tel:+390696883381" style="color:#0B1F3A;text-decoration:none;">06 96883381</a>
        &nbsp;·&nbsp;
        <a href="mailto:info@fimbroker.it" style="color:#0B1F3A;text-decoration:none;">info@fimbroker.it</a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background:#0B1F3A;padding:14px 32px;border-radius:0 0 12px 12px;">
      <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.35);text-align:center;">
        FIM Insurance Broker S.a.s. · Via Roma 41, Cisterna di Latina
        &nbsp;·&nbsp;
        <a href="${esc(baseUrl)}/privacy-policy" style="color:rgba(255,255,255,0.35);">Privacy Policy</a>
      </p>
    </div>

  </div>
</body>
</html>`
}

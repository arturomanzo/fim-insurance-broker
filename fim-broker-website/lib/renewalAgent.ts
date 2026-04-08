/**
 * Agente Rinnovi Intelligente
 *
 * Per il promemoria a 30 giorni, usa Claude per:
 * 1. Analizzare la polizza in scadenza
 * 2. Generare 3 opzioni di rinnovo personalizzate sul tipo di copertura
 * 3. Scrivere il testo dell'email come un consulente reale (non un template)
 *
 * Usa claude-haiku per efficienza cost/latency in contesti batch.
 * Fallback al template standard se l'AI non risponde.
 */
import Anthropic from '@anthropic-ai/sdk'
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

export async function generateRenewalProposal(
  policy: Policy,
  daysLeft: number,
): Promise<RenewalProposal | null> {
  try {
    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `Sei un consulente assicurativo senior di FIM Insurance Broker — broker indipendente con accesso a oltre 30 compagnie assicurative italiane.

Devi generare il contenuto testuale di un'email di rinnovo polizza personalizzata. Il cliente deve sentire che stai scrivendo TU, non un sistema automatico.

DATI POLIZZA IN SCADENZA:
- Nome cliente: ${policy.clientName}
- Tipo polizza: ${policy.tipo}
- Compagnia attuale: ${policy.compagnia}
- Premio annuo: €${policy.premioAnnuo.toLocaleString('it-IT')}
${policy.massimale ? `- Massimale: ${policy.massimale}` : ''}
${policy.note ? `- Note: ${policy.note}` : ''}
- Giorni alla scadenza: ${daysLeft}

Genera 3 opzioni di rinnovo SPECIFICHE per il tipo "${policy.tipo}". Le opzioni devono essere concrete e diverse tra loro — non generiche.

Rispondi SOLO con un JSON valido (nessun testo fuori dal JSON):

{
  "intro": "2-3 frasi di apertura personali. Menziona il nome del cliente, la polizza specifica, e un osservazione pertinente al tipo di copertura o alla situazione (es. se è auto, parla di sicurezza stradale; se è casa, parla di protezione del patrimonio). NON iniziare con 'Gentile'.",
  "urgencyReason": "1 frase specifica su cosa rischia concretamente se la polizza scade senza rinnovo — legata al tipo '${policy.tipo}' (es. per auto: guida senza copertura è reato; per casa: in caso di sinistro resterà senza indennizzo). Sii diretto.",
  "options": [
    {
      "titolo": "Rinnovo con continuità",
      "descrizione": "Descrizione concreta: rinnova con ${policy.compagnia} senza interruzione di copertura, zero burocrazia, storico cliente preservato",
      "vantaggio": "vantaggio specifico per '${policy.tipo}' che si ottiene mantenendo la continuità (es. no carenze, massimale storico confermato, ecc.)"
    },
    {
      "titolo": "Titolo opzione miglioramento (es. 'Copertura Completa' o 'Protezione Plus')",
      "descrizione": "Descrizione di un'estensione di copertura sensata per '${policy.tipo}' — cosa aggiungere rispetto all'attuale (es. per RCA: aggiungere kasko; per casa: aggiungere furto e alluvione; per vita: integrare LTC)",
      "vantaggio": "beneficio concreto e cifra indicativa se possibile"
    },
    {
      "titolo": "Titolo opzione ottimizzazione (es. 'Stesso Budget, Di Più')",
      "descrizione": "Come FIM può analizzare il mercato e trovare condizioni migliori per '${policy.tipo}' allo stesso premio o inferiore — confronto tra 30+ compagnie",
      "vantaggio": "stima risparmio medio o miglioramento copertura ottenibile nel mercato attuale"
    }
  ],
  "closingNote": "1-2 frasi calde che invitano al contatto diretto (telefono o email). Personalizza sul nome del cliente. Firma come 'Il tuo consulente FIM'."
}`,
        },
      ],
    })

    const content = message.content[0]
    if (content.type !== 'text') return null

    const jsonStr = content.text.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim()
    const parsed = JSON.parse(jsonStr) as RenewalProposal

    // Basic validation
    if (!parsed.intro || !Array.isArray(parsed.options) || parsed.options.length === 0) return null

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
        <div style="width:28px;height:28px;background:#0f2d6b;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:13px;font-weight:700;color:white;text-align:center;line-height:28px;">
          ${i + 1}
        </div>
        <div style="flex:1;">
          <p style="margin:0 0 5px;font-weight:700;color:#0f2d6b;font-size:14px;">${esc(opt.titolo)}</p>
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
    <div style="background:linear-gradient(135deg,#091d47,#1a4a9e);padding:24px 32px;border-radius:12px 12px 0 0;">
      <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.5);letter-spacing:1.5px;text-transform:uppercase;font-weight:600;">FIM Insurance Broker</p>
      <h1 style="margin:8px 0 0;font-size:20px;color:white;font-weight:800;line-height:1.3;">
        La tua polizza ${esc(policy.tipo)} scade tra <span style="color:#00b4c8;">${daysLeft} giorni</span>
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
          <tr><td style="padding:3px 0;width:38%;">Tipo</td><td style="font-weight:700;color:#0f2d6b;">${esc(policy.tipo)}</td></tr>
          <tr><td style="padding:3px 0;">Compagnia</td><td style="font-weight:600;">${esc(policy.compagnia)}</td></tr>
          <tr><td style="padding:3px 0;">N. polizza</td><td>${esc(policy.numeroPolizza)}</td></tr>
          <tr><td style="padding:3px 0;">Scadenza</td><td style="font-weight:700;color:#ea580c;">${esc(expiryDate)}</td></tr>
          <tr><td style="padding:3px 0;">Premio annuo</td><td style="font-weight:600;">€${policy.premioAnnuo.toLocaleString('it-IT')}</td></tr>
        </table>
      </div>

      <!-- Options -->
      <p style="font-size:14px;font-weight:700;color:#0f2d6b;margin:0 0 12px;">Le tue 3 opzioni</p>
      ${optionsHtml}

      <!-- CTAs -->
      <div style="margin:28px 0 20px;text-align:center;">
        <a href="${esc(renewUrl)}"
           style="display:inline-block;background:#00b4c8;color:white;padding:14px 32px;border-radius:10px;text-decoration:none;font-weight:800;font-size:15px;margin:0 6px 8px;">
          Rinnova ora →
        </a>
        <a href="${esc(consultUrl)}"
           style="display:inline-block;background:white;color:#0f2d6b;padding:14px 32px;border-radius:10px;text-decoration:none;font-weight:700;font-size:15px;border:2px solid #0f2d6b;margin:0 6px 8px;">
          Prenota consulenza
        </a>
      </div>

      <!-- AI closing note -->
      <p style="font-size:14px;color:#475569;line-height:1.7;margin:0 0 20px;">${esc(proposal.closingNote).replace(/\n/g, '<br>')}</p>

      <!-- Contact info -->
      <div style="border-top:1px solid #f1f5f9;padding-top:16px;font-size:12px;color:#94a3b8;text-align:center;">
        <a href="${esc(dashUrl)}" style="color:#0f2d6b;text-decoration:none;">Area Cliente</a>
        &nbsp;·&nbsp;
        <a href="tel:+390696883381" style="color:#0f2d6b;text-decoration:none;">06 96883381</a>
        &nbsp;·&nbsp;
        <a href="mailto:info@fimbroker.it" style="color:#0f2d6b;text-decoration:none;">info@fimbroker.it</a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background:#0f2d6b;padding:14px 32px;border-radius:0 0 12px 12px;">
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

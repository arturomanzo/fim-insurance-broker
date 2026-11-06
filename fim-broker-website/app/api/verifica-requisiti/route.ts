import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import type { BetaContentBlockParam } from '@anthropic-ai/sdk/resources/beta/messages/messages'
import { AI_MODELS, FALLBACK_BETA } from '@/lib/ai-models'
import { rateLimit } from '@/lib/rateLimit'
import { inviaLead } from '@/lib/codaLead'
import { pulisciCampagna } from '@/lib/campagna'
import {
  MAX_BASE64_TOTALE,
  VERIFICA_SCHEMA,
  normalizzaRisultato,
  riepilogoRequisiti,
  tipoLeadRequisiti,
  type RisultatoVerifica,
} from '@/lib/verificaRequisiti'

export const runtime = 'nodejs'
// Due PDF e il confronto: come analizza-polizza, il minuto non basta.
export const maxDuration = 300

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const ERRORE_GENERICO = "Errore durante la verifica. Riprova o contattaci al +39 06 96883381."

const ISTRUZIONI = `Sei il broker di FIM Insurance Broker che legge un documento per conto di un cliente, un'impresa o un professionista. Il primo PDF è il documento che chiede le polizze: bando, disciplinare, capitolato o contratto. Se c'è un secondo PDF, è la polizza che il cliente ha già.

Cosa fare:
- Elenca solo le polizze e le garanzie che il documento chiede davvero, con il riferimento all'articolo o alla pagina. Non aggiungere quelle che secondo te servirebbero: se ne vedi una utile e non richiesta, mettila nei prossimi passi.
- Per gli importi in percentuale, scrivi la percentuale e il calcolo sul valore che dà il documento. Se il valore manca, lascia la sola percentuale.
- Se c'è la polizza, confronta massimali, durata, beneficiario e clausole con quanto richiesto. Se non c'è, l'esito di ogni requisito è 'non_confrontato'.
- Le clausole poco chiare vanno nei punti dubbi, non interpretate a favore del cliente.
- Non citare norme che non sono nel documento. Non indicare premi né compagnie.
- Scrivi in italiano semplice, frasi brevi, come al telefono con un cliente.
- Se il documento non chiede nessuna polizza, lascia vuoti i requisiti e dillo nella sintesi.`

export async function POST(request: NextRequest) {
  const { ok, retryAfter } = await rateLimit(request, { limit: 3, windowMs: 60_000 })
  if (!ok) {
    return NextResponse.json(
      { error: 'Troppe richieste. Attendi qualche momento e riprova.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } },
    )
  }

  try {
    const body = await request.json()
    const { nome, email, telefono, documentoBase64, polizzaBase64, privacy, website, campagna } = body

    // Honeypot
    if (website) {
      return NextResponse.json({ error: 'Richiesta non valida' }, { status: 400 })
    }

    if (!nome || !email || !documentoBase64) {
      return NextResponse.json({ error: 'Dati mancanti' }, { status: 400 })
    }
    if (privacy !== true) {
      return NextResponse.json({ error: 'Serve il consenso al trattamento dei dati.' }, { status: 400 })
    }

    const nomeSafe = String(nome).trim().slice(0, 100)
    const emailSafe = String(email).trim().slice(0, 200)
    const telefonoSafe = String(telefono ?? '').replace(/[^\d+ ]/g, '').trim().slice(0, 20)
    const documento = String(documentoBase64)
    const polizza = polizzaBase64 ? String(polizzaBase64) : ''

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailSafe)) {
      return NextResponse.json({ error: 'Email non valida' }, { status: 400 })
    }

    if (documento.length + polizza.length > MAX_BASE64_TOTALE) {
      return NextResponse.json(
        { error: 'File troppo grandi. I due PDF insieme non devono superare i 3 MB.' },
        { status: 400 },
      )
    }

    const conPolizza = polizza.length > 0
    const contenuto: BetaContentBlockParam[] = [
      {
        type: 'document',
        title: 'Documento con i requisiti',
        source: { type: 'base64', media_type: 'application/pdf', data: documento },
      },
    ]
    if (conPolizza) {
      contenuto.push({
        type: 'document',
        title: 'Polizza del cliente',
        source: { type: 'base64', media_type: 'application/pdf', data: polizza },
      })
    }
    contenuto.push({ type: 'text', text: ISTRUZIONI })

    const message = await client.beta.messages.create({
      model: AI_MODELS.analysis,
      // Il tetto copre anche il thinking, acceso di default su Opus 5.
      max_tokens: 12000,
      output_config: {
        // `low`, come analizza-polizza: il lavoro è leggere, e il cliente aspetta.
        effort: 'low',
        format: { type: 'json_schema', schema: VERIFICA_SCHEMA },
      },
      betas: [FALLBACK_BETA],
      fallbacks: 'default',
      messages: [{ role: 'user', content: contenuto }],
    })

    if (message.stop_reason === 'refusal') {
      console.error('verifica-requisiti: rifiutata', message.stop_details?.category)
      return NextResponse.json(
        { error: 'Non riesco a leggere questo documento. Chiamaci al +39 06 96883381.' },
        { status: 422 },
      )
    }

    // Il primo blocco può essere il thinking: si cerca il testo per tipo.
    const testo = message.content.find((b) => b.type === 'text')
    if (!testo || testo.type !== 'text') throw new Error('Risposta non valida')
    if (message.stop_reason === 'max_tokens') throw new Error('Risposta tagliata dal tetto di token')

    console.info(
      `[verifica-requisiti] in=${message.usage.input_tokens} out=${message.usage.output_tokens} polizza=${conPolizza}`,
    )

    const risultato = normalizzaRisultato(JSON.parse(testo.text) as RisultatoVerifica, conPolizza)

    // Il lead va nel gestionale solo dopo una verifica riuscita, come in
    // analizza-polizza: un errore fa riprovare e creerebbe doppioni. inviaLead
    // non lancia mai, quindi il risultato arriva comunque.
    const [primoNome, ...restoNome] = nomeSafe.split(/\s+/)
    await inviaLead(
      {
        lead_id: `REQUISITI-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        nome: primoNome,
        cognome: restoNome.join(' ') || undefined,
        email: emailSafe,
        telefono: telefonoSafe || undefined,
        tipo: tipoLeadRequisiti(risultato),
        messaggio: riepilogoRequisiti(risultato, conPolizza, telefonoSafe || undefined),
        referrer: 'verifica-requisiti',
        campagna: pulisciCampagna(campagna),
      },
      'verifica-requisiti',
    )

    return NextResponse.json({ success: true, risultato, conPolizza, nome: nomeSafe })
  } catch (error) {
    console.error('Errore verifica requisiti:', error)
    return NextResponse.json({ error: ERRORE_GENERICO }, { status: 500 })
  }
}

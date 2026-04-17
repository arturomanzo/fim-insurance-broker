import type { Metadata } from 'next'
import Link from 'next/link'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'

export const metadata: Metadata = {
  title: 'Glossario Assicurativo — Tutti i Termini Spiegati in Modo Semplice',
  description:
    'Scopri il significato di franchigia, massimale, rivalsa, coassicurazione e altri termini assicurativi. Glossario gratuito curato dai broker FIM.',
  alternates: { canonical: '/glossario' },
  openGraph: {
    title: 'Glossario Assicurativo — FIM Insurance Broker',
    description: 'Tutti i termini assicurativi spiegati in modo chiaro. Franchigia, massimale, rivalsa e molto altro.',
    images: [{ url: '/api/og?title=Glossario+Assicurativo&tag=FIM+Insurance+Broker&sub=Tutti+i+termini+spiegati+in+modo+semplice', width: 1200, height: 630 }],
  },
}

const glossarySchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTermSet',
  name: 'Glossario Assicurativo FIM Insurance Broker',
  description: 'Definizioni dei principali termini assicurativi per privati e aziende.',
  url: 'https://www.fimbroker.it/glossario',
}

type Term = { term: string; definition: string; related?: string[] }
type Letter = { letter: string; terms: Term[] }

const glossary: Letter[] = [
  {
    letter: 'A',
    terms: [
      {
        term: 'Attestazione di Rischio',
        definition: 'Documento rilasciato dalla compagnia assicurativa che certifica la storia assicurativa del veicolo: classe di merito, eventuali sinistri negli ultimi 5 anni e altri dati utili per il calcolo del premio RC Auto. Segue il proprietario del veicolo, non la targa.',
        related: ['Bonus/Malus', 'Classe di Merito'],
      },
      {
        term: 'Assicurato',
        definition: 'La persona fisicao giuridica il cui rischio è coperto dalla polizza. Può coincidere o meno con il contraente (chi paga il premio) e con il beneficiario (chi riceve l\'indennizzo).',
        related: ['Contraente', 'Beneficiario'],
      },
      {
        term: 'Azione di Rivalsa',
        definition: 'Diritto della compagnia assicurativa di rivalersi sull\'assicurato per recuperare il risarcimento pagato al terzo danneggiato, nei casi previsti dal contratto (es. guida in stato di ebbrezza, polizza non in regola).',
        related: ['Rivalsa'],
      },
    ],
  },
  {
    letter: 'B',
    terms: [
      {
        term: 'Beneficiario',
        definition: 'Persona fisica o giuridica che ha diritto a ricevere la prestazione assicurativa (indennizzo o capitale) al verificarsi del sinistro. Nelle polizze vita può essere diverso dall\'assicurato e dal contraente.',
        related: ['Assicurato', 'Contraente'],
      },
      {
        term: 'Bonus/Malus',
        definition: 'Sistema di tariffazione RC Auto basato sulla storia sinistri del conducente. Ogni anno senza sinistri si guadagna un "bonus" (sconto sul premio). Ogni sinistro con responsabilità comporta un "malus" (aumento del premio e retrocessione di 2 classi di merito).',
        related: ['Attestazione di Rischio', 'Classe di Merito'],
      },
      {
        term: 'Broker Assicurativo',
        definition: 'Intermediario assicurativo indipendente che opera nell\'interesse esclusivo del cliente, analizzando il mercato e trovando la soluzione assicurativa più adatta. A differenza dell\'agente, il broker non è legato a nessuna compagnia specifica. Deve essere iscritto al RUI (Registro Unico degli Intermediari) tenuto da IVASS.',
        related: ['IVASS', 'RUI'],
      },
    ],
  },
  {
    letter: 'C',
    terms: [
      {
        term: 'Carenza',
        definition: 'Periodo iniziale dopo la stipula della polizza durante il quale la copertura non è ancora attiva o è ridotta. Tipica delle polizze salute (solitamente 30-90 giorni per le malattie, ma non per gli infortuni). Non si applica a RC Auto.',
        related: ['Franchigia', 'Scoperto'],
      },
      {
        term: 'Classe di Merito',
        definition: 'Nella RC Auto, scala da 1 (migliore) a 18 (peggiore) che determina il premio in base alla storia sinistri. Ogni anno senza sinistri si avanza di una classe verso la 1. Un sinistro con colpa fa retrocedere di 2 classi.',
        related: ['Bonus/Malus', 'Attestazione di Rischio'],
      },
      {
        term: 'Coassicurazione',
        definition: 'Situazione in cui più compagnie assicurative coprono lo stesso rischio, ciascuna per una percentuale del valore totale. Comune per rischi molto elevati (grandi imprese, opere d\'arte). Ogni compagnia risponde solo per la propria quota.',
        related: ['Massimale', 'Riassicurazione'],
      },
      {
        term: 'Condizioni di Polizza',
        definition: 'Insieme delle clausole contrattuali che regolano il rapporto tra assicurato e compagnia: cosa è coperto, cosa è escluso, massimali, franchigie, procedure di denuncia sinistro e altro. Suddivise in Condizioni Generali di Assicurazione (CGA) e Condizioni Particolari (personalizzate).',
        related: ['Esclusioni', 'Massimale', 'Franchigia'],
      },
      {
        term: 'Contraente',
        definition: 'Chi stipula il contratto di assicurazione e paga il premio. Può coincidere o meno con l\'assicurato (es. un genitore può essere contraente della polizza del figlio). Il contraente ha il diritto di recedere dal contratto.',
        related: ['Assicurato', 'Beneficiario'],
      },
    ],
  },
  {
    letter: 'D',
    terms: [
      {
        term: 'Denuncia di Sinistro',
        definition: 'Comunicazione formale con cui l\'assicurato notifica alla compagnia il verificarsi dell\'evento coperto dalla polizza. I termini per la denuncia sono indicati nelle condizioni di polizza (solitamente 3-30 giorni). Il ritardo nella denuncia può ridurre o azzerare il diritto all\'indennizzo.',
        related: ['Sinistro', 'Perizia'],
      },
      {
        term: 'Dichiarazione Precontrattuale',
        definition: 'Obbligo dell\'assicurato di comunicare alla compagnia, prima della stipula, tutte le circostanze rilevanti per la valutazione del rischio. Dichiarazioni false o reticenti possono rendere la polizza annullabile o ridurre l\'indennizzo.',
        related: ['Rischio Aggravato'],
      },
    ],
  },
  {
    letter: 'E',
    terms: [
      {
        term: 'Esclusioni',
        definition: 'Rischi o eventi espressamente non coperti dalla polizza, elencati nelle condizioni generali. Esempi comuni: guerre, atti dolosi dell\'assicurato, guida senza patente, danni da usura normale. Leggere attentamente le esclusioni è fondamentale prima di stipulare.',
        related: ['Condizioni di Polizza', 'Rischio'],
      },
    ],
  },
  {
    letter: 'F',
    terms: [
      {
        term: 'Franchigia',
        definition: 'Quota del danno che rimane a carico dell\'assicurato e non viene rimborsata dalla compagnia. Può essere assoluta (sotto una certa soglia non si rimborsa nulla, sopra si rimborsa solo l\'eccedenza) o relativa (sotto soglia nulla, sopra soglia rimborso totale). Scegliere una franchigia più alta abbassa il premio.',
        related: ['Scoperto', 'Massimale'],
      },
    ],
  },
  {
    letter: 'I',
    terms: [
      {
        term: 'Indennizzo',
        definition: 'Somma pagata dalla compagnia all\'assicurato o al terzo danneggiato a seguito di un sinistro coperto. Nelle polizze danni non può superare il danno effettivo subito (principio indennitario). Nelle polizze vita è invece un capitale predeterminato.',
        related: ['Sinistro', 'Massimale'],
      },
      {
        term: 'IVASS',
        definition: 'Istituto per la Vigilanza sulle Assicurazioni. Autorità pubblica italiana che vigila sul mercato assicurativo, protegge i consumatori e gestisce il Registro Unico degli Intermediari (RUI). Puoi verificare la regolarità di qualsiasi broker o agente sul sito ivass.it.',
        related: ['RUI', 'Broker Assicurativo'],
      },
    ],
  },
  {
    letter: 'K',
    terms: [
      {
        term: 'Kasko',
        definition: 'Copertura assicurativa auto che rimborsa i danni al proprio veicolo indipendentemente dalla responsabilità. La Kasko "completa" copre tutti i danni (anche colpa propria), la Kasko "parziale" o "Mini Kasko" copre solo eventi specifici (grandine, furto, incendio, danni da animali).',
        related: ['RC Auto', 'Bonus/Malus'],
      },
    ],
  },
  {
    letter: 'L',
    terms: [
      {
        term: 'Liquidazione del Sinistro',
        definition: 'Processo attraverso cui la compagnia valuta il danno (tramite perito) e determina l\'indennizzo da pagare. I tempi di liquidazione sono regolati per legge: 30 giorni per la RC Auto con CID firmato da entrambi, 60 giorni in assenza di accordo.',
        related: ['Sinistro', 'Perizia', 'Indennizzo'],
      },
    ],
  },
  {
    letter: 'M',
    terms: [
      {
        term: 'Massimale',
        definition: 'Limite massimo di indennizzo che la compagnia è tenuta a pagare per sinistro o per anno assicurativo. Superato il massimale, l\'assicurato risponde personalmente. Per la RC Auto il massimale minimo di legge è 6,45 milioni € per i danni alle persone e 1,3 milioni € per i danni alle cose.',
        related: ['Franchigia', 'Indennizzo'],
      },
    ],
  },
  {
    letter: 'P',
    terms: [
      {
        term: 'Perizia',
        definition: 'Valutazione tecnica del danno effettuata da un esperto (perito) nominato dalla compagnia assicurativa. Il perito stima il danno e determina la liquidazione. L\'assicurato può nominare un contro-perito se non è d\'accordo con la valutazione.',
        related: ['Liquidazione del Sinistro', 'Sinistro'],
      },
      {
        term: 'Polizza',
        definition: 'Documento contrattuale che formalizza il rapporto di assicurazione tra il contraente e la compagnia. Contiene i dati delle parti, il rischio assicurato, il premio, le condizioni generali e particolari, la durata e le garanzie incluse.',
        related: ['Condizioni di Polizza', 'Premio'],
      },
      {
        term: 'Premio',
        definition: 'Importo che il contraente paga alla compagnia in cambio della copertura assicurativa. Può essere pagato annualmente, semestralmente o mensilmente. Calcolato in base al rischio: più è elevato il rischio, più alto è il premio.',
        related: ['Polizza', 'Franchigia'],
      },
    ],
  },
  {
    letter: 'R',
    terms: [
      {
        term: 'RC Auto',
        definition: 'Responsabilità Civile Auto. Copertura obbligatoria per legge per tutti i veicoli a motore circolanti su suolo pubblico. Copre i danni causati a terzi (persone e cose) in caso di incidente. Non copre i danni al proprio veicolo.',
        related: ['Kasko', 'Bonus/Malus'],
      },
      {
        term: 'Riassicurazione',
        definition: 'Meccanismo con cui le compagnie assicurative cedono parte del rischio ad altri assicuratori (riassicuratori) per limitare la propria esposizione finanziaria. Non riguarda direttamente il cliente finale, ma garantisce la solvibilità delle compagnie.',
        related: ['Coassicurazione'],
      },
      {
        term: 'Rischio',
        definition: 'Possibilità che si verifichi un evento futuro e incerto che comporti un danno economico. È il concetto fondamentale su cui si basa l\'assicurazione: trasferire il rischio dall\'assicurato alla compagnia in cambio del pagamento di un premio.',
        related: ['Sinistro', 'Premio'],
      },
      {
        term: 'Rivalsa',
        definition: 'Diritto della compagnia di recuperare dall\'assicurato le somme pagate al terzo danneggiato, nei casi in cui il sinistro sia avvenuto in presenza di circostanze aggravanti (es. guida in stato di ebbrezza, assenza di revisione, veicolo non assicurato). Può riguardare anche i familiari conviventi.',
        related: ['RC Auto', 'Esclusioni'],
      },
      {
        term: 'RUI (Registro Unico Intermediari)',
        definition: 'Registro pubblico gestito da IVASS in cui sono iscritti tutti i soggetti autorizzati a esercitare l\'attività di intermediazione assicurativa in Italia: agenti, broker, subagenti e banche. FIM Insurance Broker è iscritta al RUI con numero B000405449.',
        related: ['IVASS', 'Broker Assicurativo'],
      },
    ],
  },
  {
    letter: 'S',
    terms: [
      {
        term: 'Scoperto',
        definition: 'Percentuale del danno che rimane a carico dell\'assicurato. Diverso dalla franchigia: lo scoperto è proporzionale al danno totale (es. 10% scoperto = l\'assicurato paga sempre il 10% del danno, qualunque sia l\'importo). Più comune nelle polizze salute.',
        related: ['Franchigia', 'Indennizzo'],
      },
      {
        term: 'Sinistro',
        definition: 'Evento dannoso previsto e coperto dalla polizza assicurativa. Al verificarsi del sinistro, l\'assicurato ha l\'obbligo di denunciarlo alla compagnia entro i termini previsti dal contratto.',
        related: ['Denuncia di Sinistro', 'Liquidazione del Sinistro', 'Perizia'],
      },
      {
        term: 'Sottoassicurazione',
        definition: 'Situazione in cui il valore assicurato è inferiore al valore reale del bene. In caso di sinistro, la compagnia rimborsa solo proporzionalmente (regola proporzionale): se l\'immobile vale 300.000€ ma è assicurato per 150.000€ (50%), in caso di danno da 60.000€ si ricevono solo 30.000€.',
        related: ['Massimale', 'Indennizzo'],
      },
    ],
  },
  {
    letter: 'V',
    terms: [
      {
        term: 'Valore a Nuovo',
        definition: 'Criterio di indennizzo che rimborsa il costo di sostituzione del bene danneggiato con uno nuovo equivalente, senza applicare alcuna deduzione per vetustà o deprezzamento. Alternativo al "valore venale" (valore di mercato al momento del sinistro). Più costoso come premio, ma garantisce un rimborso pieno.',
        related: ['Indennizzo', 'Sottoassicurazione'],
      },
    ],
  },
]

const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const presentLetters = new Set(glossary.map((g) => g.letter))

export default function GlossarioPage() {
  return (
    <div>
      <BreadcrumbSchema items={[{ name: 'Home', href: '/' }, { name: 'Glossario Assicurativo', href: '/glossario' }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(glossarySchema) }}
      />

      {/* Hero */}
      <section className="gradient-primary py-16 md:py-20">
        <div className="container-custom text-center">
          <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Risorse gratuite
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4">
            Glossario Assicurativo
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
            Tutti i termini del mondo assicurativo spiegati in modo chiaro e senza tecnicismi.
            Perché capire la tua polizza non dovrebbe essere un lavoro a tempo pieno.
          </p>
        </div>
      </section>

      {/* Alphabet index */}
      <section className="bg-white border-b border-gray-100 py-4 sticky top-16 md:top-20 z-30">
        <div className="container-custom">
          <div className="flex flex-wrap gap-1 justify-center">
            {allLetters.map((letter) =>
              presentLetters.has(letter) ? (
                <a
                  key={letter}
                  href={`#letter-${letter}`}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  {letter}
                </a>
              ) : (
                <span key={letter} className="w-8 h-8 flex items-center justify-center rounded-lg text-sm text-gray-300 cursor-default">
                  {letter}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* Glossary content */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-4xl">
          <div className="space-y-12">
            {glossary.map((group) => (
              <div key={group.letter} id={`letter-${group.letter}`} className="scroll-mt-28">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center text-white text-2xl font-black flex-shrink-0">
                    {group.letter}
                  </div>
                  <div className="h-px bg-gray-200 flex-1" />
                </div>
                <div className="space-y-4">
                  {group.terms.map((item) => (
                    <div key={item.term} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                      <h2 className="text-lg font-black text-primary mb-2">{item.term}</h2>
                      <p className="text-gray-600 text-sm leading-relaxed mb-3">{item.definition}</p>
                      {item.related && item.related.length > 0 && (
                        <div className="flex items-center flex-wrap gap-2">
                          <span className="text-xs text-gray-400 font-medium">Vedi anche:</span>
                          {item.related.map((rel) => (
                            <span key={rel} className="text-xs bg-primary/5 text-primary px-2.5 py-1 rounded-full font-medium">
                              {rel}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Missing term CTA */}
          <div className="mt-16 bg-white rounded-3xl border border-gray-100 p-8 text-center shadow-sm">
            <div className="text-3xl mb-3">🤔</div>
            <h3 className="text-xl font-black text-primary mb-2">Non trovi un termine?</h3>
            <p className="text-gray-600 text-sm mb-6 max-w-md mx-auto">
              Il glossario è in continuo aggiornamento. Chiedi a FIMA — il nostro assistente AI — o contattaci direttamente.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/contatti" className="btn-primary px-6 py-3">
                Contattaci
              </Link>
              <Link href="/preventivo" className="btn-outline px-6 py-3">
                Preventivo gratuito
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="gradient-primary py-12">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-black text-white mb-3">
            Hai capito i termini, ora trova la polizza giusta
          </h2>
          <p className="text-white/80 mb-6 text-sm max-w-lg mx-auto">
            I nostri broker ti spiegano ogni clausola e trovano la copertura più adatta al tuo profilo.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/quiz-polizza" className="btn-primary bg-accent hover:bg-accent-dark text-primary font-bold px-6 py-3">
              Quiz: che polizza mi serve?
            </Link>
            <Link href="/preventivo" className="btn-outline-white px-6 py-3">
              Preventivo gratuito
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import { EMAIL_RECLAMI, PEC } from '@/lib/contatti'

export const metadata: Metadata = {
  title: 'Reclami e Arbitro Assicurativo',
  description: 'Procedura reclami FIM Insurance Broker conforme al Reg. IVASS 40/2018 (mod. Provv. 163/2025): reclamo intermediario, reclamo impresa, ricorso all\'Arbitro Assicurativo operativo dal 15 gennaio 2026 (D.Lgs. 215/2024).',
  alternates: { canonical: '/reclami' },
}

const PEC_RECLAMI = PEC

const steps = [
  {
    n: 1,
    title: 'Reclamo all\'intermediario (FIM Insurance Broker)',
    when: 'Quando il reclamo riguarda il comportamento del broker: consulenza ricevuta, assistenza, gestione amministrativa della polizza, gestione del sinistro nella parte di nostra competenza, riservatezza dei dati.',
    how: [
      'PEC: fiminsurancebrokersas@pec.it',
      'Raccomandata A/R: Ufficio Reclami — FIM Insurance Broker S.a.s., Via Roma 41, 04012 Cisterna di Latina (LT)',
      'Email ordinaria: reclami@fimbroker.it (con conferma di ricezione)',
    ],
    time: 'Risposta entro 45 giorni dalla ricezione, ai sensi dell\'art. 7 del Reg. IVASS 40/2018.',
  },
  {
    n: 2,
    title: 'Reclamo all\'impresa di assicurazione',
    when: 'Quando il reclamo riguarda il comportamento della compagnia: condizioni contrattuali, quantificazione del premio, gestione e liquidazione del sinistro, applicazione clausole, rifiuto della copertura.',
    how: [
      'I recapiti dell\'Ufficio Reclami sono indicati nel DIP Aggiuntivo, nelle Condizioni di Assicurazione e nella quietanza/contratto.',
      'In caso di difficoltà a reperirli, contattaci: ti forniamo noi i riferimenti aggiornati della tua compagnia.',
    ],
    time: 'L\'impresa è tenuta a riscontrare entro 45 giorni dalla ricezione.',
  },
  {
    n: 3,
    title: 'Ricorso all\'Arbitro Assicurativo',
    when: 'Decorsi i 45 giorni senza riscontro o in caso di risposta non soddisfacente da parte dell\'impresa.',
    how: [
      'Portale ufficiale: arbitroassicurativo.it',
      'Ricorso gratuito, online, senza obbligo di assistenza legale.',
      'Termine: entro 12 mesi dalla data del reclamo presentato all\'impresa.',
      'La decisione dell\'Arbitro non è vincolante per il cliente, che resta libero di adire l\'Autorità Giudiziaria.',
    ],
    time: 'Procedura introdotta dal D.Lgs. 215/2024 in attuazione della Direttiva UE 2023/2225 e operativa dal 15 gennaio 2026.',
  },
] as const

const altRoutes = [
  {
    title: 'Segnalazione a IVASS',
    desc: 'Per violazioni della normativa di settore da parte di intermediari o imprese vigilate.',
    link: 'https://www.ivass.it/consumatori/reclami/',
    linkLabel: 'ivass.it/consumatori/reclami',
  },
  {
    title: 'Mediazione obbligatoria',
    desc: 'In materia di contratti assicurativi (D.Lgs. 28/2010), presso un Organismo di Mediazione iscritto al Ministero della Giustizia. Il ricorso preventivo all\'Arbitro Assicurativo assolve alla condizione di procedibilità.',
    link: 'https://www.giustizia.it/giustizia/it/mg_2_5_7.page',
    linkLabel: 'giustizia.it — Organismi di Mediazione',
  },
  {
    title: 'Autorità Giudiziaria Ordinaria',
    desc: 'Il cliente conserva sempre il diritto di adire il giudice competente; per il consumatore è competente il foro di residenza o domicilio.',
    link: null,
    linkLabel: null,
  },
] as const

export default function ReclamiPage() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <Card padding="lg">
            <p className="text-accent text-sm font-semibold tracking-wider uppercase mb-2">Trasparenza · Reg. IVASS 40/2018 mod. Provv. 163/2025</p>
            <h1 className="text-3xl md:text-4xl font-black text-primary mb-3">Reclami e Arbitro Assicurativo</h1>
            <p className="text-gray-600 leading-relaxed">
              Se ritieni di aver subito un disservizio da parte di FIM Insurance Broker o di una delle compagnie
              con cui hai sottoscritto una polizza per il nostro tramite, hai diritto a una procedura strutturata,
              gratuita e tempi certi di risposta. Dal 15 gennaio 2026 è operativo l&apos;<strong>Arbitro Assicurativo</strong>,
              il nuovo organismo di risoluzione alternativa delle controversie istituito dal D.Lgs. 215/2024.
            </p>
            <p className="text-gray-500 text-sm mt-4">Ultimo aggiornamento: Maggio 2026</p>
          </Card>

          {/* I 3 livelli */}
          <Card padding="lg">
            <h2 className="text-2xl font-bold text-primary mb-2">La procedura in 3 livelli</h2>
            <p className="text-gray-600 mb-6">
              La normativa prevede un percorso sequenziale: si parte dal reclamo a chi è ritenuto responsabile;
              se la risposta non è soddisfacente o non arriva entro 45 giorni, si sale al livello successivo.
            </p>
            <ol className="space-y-6">
              {steps.map((s) => (
                <li key={s.n} className="border-l-4 border-accent pl-5 py-1">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm flex-shrink-0">
                      {s.n}
                    </span>
                    <h3 className="text-lg font-semibold text-primary">{s.title}</h3>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    <strong>Quando.</strong> {s.when}
                  </p>
                  <div className="mb-3">
                    <p className="text-gray-700 text-sm font-semibold mb-1">Come presentarlo:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                      {s.how.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-gray-600 text-xs italic">{s.time}</p>
                </li>
              ))}
            </ol>
          </Card>

          {/* Cosa scrivere nel reclamo */}
          <Card padding="lg">
            <h2 className="text-2xl font-bold text-primary mb-4">Cosa indicare nel reclamo</h2>
            <p className="text-gray-700 mb-4">
              Per consentire un riscontro rapido e completo, ti chiediamo di includere nel reclamo le seguenti
              informazioni minime previste dal Regolamento IVASS 40/2018:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li><strong>Dati del reclamante:</strong> nome, cognome, codice fiscale, indirizzo, recapito telefonico ed email.</li>
              <li><strong>Riferimenti del rapporto:</strong> numero di polizza, compagnia, data di decorrenza; per i sinistri, numero pratica.</li>
              <li><strong>Oggetto del reclamo:</strong> descrizione chiara del fatto, data degli eventi rilevanti, soggetto a cui si attribuisce la responsabilità (intermediario o impresa).</li>
              <li><strong>Richiesta:</strong> cosa si chiede a titolo di risposta o ristoro.</li>
              <li><strong>Allegati:</strong> copia di documenti utili (polizza, corrispondenza precedente, perizie, fatture).</li>
              <li><strong>Sottoscrizione e copia documento d&apos;identità</strong> del reclamante.</li>
            </ul>
            <div className="mt-6 p-4 bg-primary/5 border border-primary/10 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong className="text-primary">Riservatezza.</strong> I dati personali contenuti nel reclamo sono trattati
                esclusivamente per la gestione della procedura, nel rispetto del Reg. UE 2016/679 (GDPR) e della nostra{' '}
                <Link href="/privacy-policy" className="text-primary underline hover:no-underline">Privacy Policy</Link>.
              </p>
            </div>
          </Card>

          {/* Canali di contatto FIM */}
          <Card padding="lg">
            <h2 className="text-2xl font-bold text-primary mb-4">Canali per reclami a FIM Insurance Broker</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
                <p className="text-xs uppercase tracking-wider text-accent font-semibold mb-1">PEC (canale preferenziale)</p>
                <a href={`mailto:${PEC_RECLAMI}`} className="text-primary font-medium hover:underline break-all">{PEC_RECLAMI}</a>
              </div>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Raccomandata A/R</p>
                <p className="text-sm text-gray-700">
                  Ufficio Reclami<br />
                  FIM Insurance Broker S.a.s.<br />
                  Via Roma 41, 04012 Cisterna di Latina (LT)
                </p>
              </div>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Email</p>
                <a href={`mailto:${EMAIL_RECLAMI}`} className="text-primary font-medium hover:underline">{EMAIL_RECLAMI}</a>
              </div>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Telefono</p>
                <a href="tel:+390696883381" className="text-primary font-medium hover:underline">+39 06 96883381</a>
                <p className="text-xs text-gray-500 mt-1">Il telefono non è valido come canale formale di reclamo: serve solo per informazioni.</p>
              </div>
            </div>
          </Card>

          {/* Vie alternative */}
          <Card padding="lg">
            <h2 className="text-2xl font-bold text-primary mb-4">Altre vie di tutela</h2>
            <p className="text-gray-700 mb-5">
              Oltre alla procedura di reclamo descritta sopra, il cliente può sempre attivare i seguenti strumenti:
            </p>
            <ul className="space-y-4">
              {altRoutes.map((r) => (
                <li key={r.title} className="border-l-4 border-gray-200 pl-4">
                  <h3 className="font-semibold text-primary mb-1">{r.title}</h3>
                  <p className="text-sm text-gray-700 mb-1">{r.desc}</p>
                  {r.link && r.linkLabel && (
                    <a href={r.link} target="_blank" rel="noopener noreferrer" className="text-sm text-accent-dark hover:underline">
                      {r.linkLabel} ↗
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </Card>

          {/* Riferimenti normativi */}
          <Card padding="lg">
            <h2 className="text-2xl font-bold text-primary mb-4">Riferimenti normativi</h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>D.Lgs. 7 settembre 2005, n. 209 — Codice delle Assicurazioni Private (artt. 183, 187, 187-bis).</li>
              <li>D.Lgs. 21 maggio 2018, n. 68 — Recepimento Direttiva (UE) 2016/97 (IDD).</li>
              <li>Regolamento IVASS n. 40 del 2 agosto 2018 — Disciplina dei requisiti e delle modalità di svolgimento dell&apos;attività di distribuzione assicurativa e riassicurativa, come modificato dal <strong>Provvedimento IVASS n. 163 del 2025</strong>.</li>
              <li>Regolamento IVASS n. 41 del 2 agosto 2018 — Disciplina degli obblighi di informazione e regole di comportamento, come modificato dal <strong>Provvedimento IVASS n. 163 del 2025</strong>.</li>
              <li>D.Lgs. 12 dicembre 2024, n. 215 — Istituzione e disciplina dell&apos;<strong>Arbitro Assicurativo</strong> (operativo dal 15 gennaio 2026).</li>
              <li>D.Lgs. 4 marzo 2010, n. 28 — Mediazione obbligatoria in materia civile e commerciale (compresi i contratti assicurativi).</li>
              <li>Reg. (UE) 2016/679 — GDPR.</li>
            </ul>
          </Card>

          {/* CTA */}
          <Card padding="lg" className="bg-gradient-to-br from-primary to-primary-dark text-white">
            <h2 className="text-2xl font-bold mb-3">Hai bisogno di aiuto prima di presentare un reclamo?</h2>
            <p className="text-white/80 mb-5">
              Spesso un&apos;incomprensione si risolve con una telefonata o un&apos;email. Prima di formalizzare un reclamo,
              contattaci: chiariamo subito la situazione e, se serve, ti accompagniamo nel percorso più adatto.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="tel:+390696883381" className="inline-flex items-center justify-center px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent-light transition-colors">
                Chiama +39 06 96883381
              </a>
              <Link href="/contatti" className="inline-flex items-center justify-center px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors">
                Scrivici dal form contatti
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

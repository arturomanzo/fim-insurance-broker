import type { Metadata } from 'next'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import FaqAccordion from '@/components/ui/FaqAccordion'
import LeadMagnet from '@/components/home/LeadMagnet'

export const metadata: Metadata = {
  title: 'Assicurazione Condominio — Globale Fabbricato e RC Amministratore | FIM',
  description:
    'Polizze condominiali complete: globale fabbricato, RC amministratore (L. 220/2012), ascensori, tutela legale e D&O. FIM Insurance Broker gestisce condomini a Roma e nel Lazio.',
}

const coverages = [
  {
    icon: '🏢',
    title: 'Globale Fabbricato',
    desc: 'La polizza fondamentale per ogni condominio: copre la struttura da incendio, scoppio, fulmine, esplosione, danni elettrici, RC verso terzi (persone che si fanno male nelle parti comuni) e danni da acqua. Obbligatoria nei regolamenti della maggior parte dei condomini.',
    price: 'da 400€/anno',
    tag: 'Base',
  },
  {
    icon: '👔',
    title: 'RC Amministratore',
    desc: 'Obbligatoria per legge dal 2013 (L. 220/2012): copre i danni patrimoniali causati ai condomini dall\'amministratore per errori, omissioni o negligenze nella gestione. Include difesa legale, anche per azioni infondate.',
    price: 'da 150€/anno',
    tag: 'Obbligatoria',
  },
  {
    icon: '🛗',
    title: 'Ascensori e Impianti',
    desc: 'RC specifica per danni causati dall\'ascensore a persone o cose, richiesta dalla normativa sugli impianti di sollevamento. Copre anche guasti meccanici, responsabilità verso passeggeri bloccati e spese di soccorso.',
    price: 'da 200€/anno',
    tag: 'Raccomandata',
  },
  {
    icon: '💧',
    title: 'Danni da Acqua Estesi',
    desc: 'Estensione della globale fabbricato per i danni da infiltrazione, rottura tubature e allagamenti: spesso inclusa, ma con franchigie e massimali variabili. Fondamentale per palazzi con impianti datati.',
    price: 'inclusa o in add.',
    tag: null,
  },
  {
    icon: '⚖️',
    title: 'Tutela Legale Condominiale',
    desc: 'Copre le spese legali del condominio per controversie con appaltatori, fornitori di servizi, condomini morosi e terzi. Consente di agire giudizialmente senza pesare sul fondo condominiale.',
    price: 'da 100€/anno',
    tag: null,
  },
  {
    icon: '🌊',
    title: 'Catastrofi Naturali',
    desc: 'Obbligatoria per le imprese dal 2025 (L. 17/2024), raccomandata per i condomini. Copre danni da terremoto, alluvione, frana e grandine ai beni comuni. Spesso esclusa dalle polizze standard.',
    price: 'da 80€/anno',
    tag: 'Obbligo dal 2025',
  },
]

const buildingTypes = [
  { name: 'Condomini residenziali', icon: '🏢' },
  { name: 'Piccoli stabili (< 8 unità)', icon: '🏘️' },
  { name: 'Palazzi di pregio storico', icon: '🏛️' },
  { name: 'Complessi con piscina/palestra', icon: '🏊' },
  { name: 'Edifici con locali commerciali', icon: '🏪' },
  { name: 'Nuove costruzioni', icon: '🏗️' },
  { name: 'Villette a schiera', icon: '🏡' },
  { name: 'Residence e hotel residence', icon: '🏨' },
]

const faqs = [
  {
    question: "La polizza globale fabbricato è obbligatoria per legge?",
    answer:
      "Non esiste un obbligo di legge generalizzato, ma la polizza incendio fabbricato è quasi sempre prevista dal regolamento condominiale e richiesta dalle banche per i mutui sulle singole unità. In pratica, un condominio senza copertura assicurativa è esposto a rischi enormi: in caso di incendio o crollo strutturale, tutti i condomini risponderebbero in proporzione alle quote millesimali, potenzialmente con il proprio patrimonio personale.",
  },
  {
    question: "La RC Amministratore è davvero obbligatoria?",
    answer:
      "Sì. La Legge 220/2012 (riforma del condominio) prevede che l'amministratore sia tenuto ad avere una polizza di RC professionale, a pena di revoca dall'incarico. La polizza deve coprire i danni cagionati nell'esercizio del mandato, con massimale adeguato. Molti amministratori hanno polizze insufficienti o con clausole limitative: è importante verificare i massimali e le esclusioni.",
  },
  {
    question: "Chi paga la polizza condominiale? Come si ripartisce il costo?",
    answer:
      "Le polizze condominiali (globale fabbricato, RC ascensore, ecc.) sono spese ordinarie di gestione condominiale: si ripartiscono tra i condomini in base alle quote millesimali della tabella generale. La RC Amministratore, invece, viene pagata o dal condominio come spesa di gestione (più comune) oppure direttamente dall'amministratore come costo professionale.",
  },
  {
    question: "La polizza copre anche i danni ai singoli appartamenti?",
    answer:
      "La globale fabbricato copre le parti comuni (scale, tetto, muri perimetrali, impianti centralizzati) e spesso anche i danni derivanti dalle parti comuni alle proprietà individuali (es. infiltrazioni dal tetto). Non copre i beni personali nelle singole unità abitative né i danni interni causati da eventi all'interno dell'appartamento stesso — per questo ogni condomino dovrebbe avere la propria polizza casa individuale.",
  },
  {
    question: "Come si gestisce un sinistro in un condominio assicurato da FIM?",
    answer:
      "In caso di sinistro, l'amministratore segnala il danno a FIM tramite email o telefono. FIM attiva la compagnia, coordina il sopralluogo del perito e segue l'istruttoria fino alla liquidazione. Il condominio non deve gestire direttamente la trattativa con la compagnia: ci pensiamo noi. Per i sinistri urgenti (es. allagamento, crollo) è disponibile un numero di assistenza H24.",
  },
]

export default function CondominiPage() {
  return (
    <div>
      {/* Hero */}
      <section className="gradient-primary py-16 md:py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full" />
        </div>
        <div className="container-custom relative">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
            <Link href="/soluzioni" className="hover:text-white transition-colors">Soluzioni</Link>
            <span>/</span>
            <span className="text-white/80">Condomini</span>
          </div>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-semibold mb-5">
              🏢 Soluzioni per amministratori e condomini
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Assicurazioni condominiali{' '}
              <span className="text-accent">complete</span>
              <br />
              gestite da un esperto
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              Un sinistro non gestito bene può diventare una lite condominiale che dura anni.
              FIM affianca amministratori e assemblee condominiali con polizze adeguate
              e assistenza diretta in caso di sinistro.
            </p>
            <div className="bg-white/10 border border-white/20 rounded-xl p-5 mb-8 max-w-2xl">
              <p className="text-white/90 text-sm">
                <strong className="text-accent">Attenzione</strong> — la RC Amministratore è obbligatoria per legge (L. 220/2012).
                Un amministratore privo di polizza è passibile di revoca dall&apos;incarico e risponde personalmente dei danni.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/preventivo" className="btn-primary text-lg px-8 py-4">
                Preventivo per il mio condominio
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a href="tel:+390696883381" className="btn-outline-white text-lg px-8 py-4">
                📞 06 96883381
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Building types */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="container-custom">
          <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6">
            Tipologie di edificio che gestiamo
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {buildingTypes.map((b) => (
              <div key={b.name} className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700">
                <span>{b.icon}</span>
                {b.name}
              </div>
            ))}
            <div className="flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-lg px-4 py-2 text-sm font-semibold text-accent">
              + altri
            </div>
          </div>
        </div>
      </section>

      {/* Coverages */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              Coperture disponibili
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
              Il pacchetto assicurativo<br />per ogni condominio
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dalle coperture obbligatorie alle estensioni facoltative: costruiamo il pacchetto più adatto alle caratteristiche del vostro edificio.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {coverages.map((cov) => (
              <Card key={cov.title} className="flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{cov.icon}</span>
                  <div className="text-right space-y-1">
                    <span className="text-xs font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-full block">
                      {cov.price}
                    </span>
                    {cov.tag && (
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full block ${
                        cov.tag === 'Obbligatoria' || cov.tag === 'Obbligo dal 2025'
                          ? 'bg-red-100 text-red-600'
                          : cov.tag === 'Base'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {cov.tag}
                      </span>
                    )}
                  </div>
                </div>
                <h3 className="font-bold text-primary mb-2">{cov.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-1">{cov.desc}</p>
              </Card>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-6">
            * I prezzi indicati sono orientativi per condomini medio-piccoli (10-20 unità). Il premio dipende dal numero di unità, dai valori a rischio e dalla zona geografica.
          </p>
        </div>
      </section>

      {/* Process + Package */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-accent/10 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
                Perché scegliere FIM per il condominio
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-primary mb-6">
                Un interlocutore unico<br />per tutto il condominio.
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                L&apos;amministratore non deve più gestire la trattativa con la compagnia o inseguire il liquidatore.
                FIM è il tramite tra il condominio e la compagnia assicuratrice: dalla stipula, ai rinnovi, fino alla gestione dei sinistri.
              </p>
              <div className="space-y-4">
                {[
                  { step: '01', title: 'Analisi dell\'edificio', desc: 'Valutiamo anno di costruzione, impianti, valore di ricostruzione, esposizioni specifiche (ascensori, piscine, locali commerciali).' },
                  { step: '02', title: 'Confronto tra compagnie', desc: 'Chiediamo preventivi a più compagnie specializzate nel ramo condominiale e presentiamo un confronto chiaro all\'assemblea.' },
                  { step: '03', title: 'Gestione documentale', desc: 'Forniamo all\'amministratore tutta la documentazione necessaria: attestati, condizioni, scadenzario polizze.' },
                  { step: '04', title: 'Assistenza sinistri', desc: 'In caso di danno, gestiamo la pratica end-to-end: denuncia, perizia, trattativa e liquidazione. Nessun costo aggiuntivo.' },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <span className="w-8 h-8 rounded-full bg-primary text-white text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                      {item.step}
                    </span>
                    <div>
                      <h3 className="font-bold text-primary mb-0.5">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <h3 className="text-xl font-black text-primary mb-2">Pacchetto base condominiale</h3>
              <p className="text-gray-500 text-sm mb-6">Stimato per un condominio residenziale di 15 unità, costruzione anni &apos;80, valore ricostruzione 1,5M€</p>
              <div className="space-y-3 mb-6">
                {[
                  { name: 'Globale fabbricato (incendio + RC)', price: '900€/anno' },
                  { name: 'RC Amministratore', price: '200€/anno' },
                  { name: 'RC Ascensore', price: '250€/anno' },
                  { name: 'Tutela legale condominiale', price: '120€/anno' },
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-5 h-5 bg-accent/10 text-accent rounded-full flex items-center justify-center text-xs font-bold">✓</span>
                      <span className="text-gray-700">{item.name}</span>
                    </div>
                    <span className="text-sm font-bold text-primary">{item.price}</span>
                  </div>
                ))}
              </div>
              <div className="bg-primary/5 rounded-xl p-4 mb-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary">Totale indicativo</span>
                  <span className="text-2xl font-black text-primary">da 1.470€/anno</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">ca. 98€/anno per unità abitativa</p>
              </div>
              <p className="text-xs text-gray-400 mb-4">Ripartizione millesimale: ogni condomino paga in proporzione alla propria quota</p>
              <Link href="/preventivo" className="btn-primary w-full text-center block">
                Preventivo per il mio condominio
              </Link>
            </div>
          </div>
        </div>
      </section>

      <LeadMagnet />

      {/* FAQ */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-primary mb-3">Domande frequenti</h2>
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-primary py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Il tuo condominio è adeguatamente assicurato?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Revisione gratuita delle polizze condominiali in essere. Identifichiamo gap e ottimizziamo i costi.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/prenota-consulenza" className="btn-primary text-lg px-8 py-4">
              Prenota Consulenza Gratuita
            </Link>
            <a href="tel:+390696883381" className="btn-outline-white text-lg px-8 py-4">
              📞 06 96883381
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

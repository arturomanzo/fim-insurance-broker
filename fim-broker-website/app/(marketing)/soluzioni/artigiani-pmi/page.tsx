import type { Metadata } from 'next'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import FaqSection from '@/components/ui/FaqSection'
import { artigianiPmiFaq } from '@/lib/faq/artigiani-pmi'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import LeadMagnet from '@/components/home/LeadMagnet'

export const metadata: Metadata = {
  title: 'Assicurazione Artigiani e PMI — Proteggi la tua Attività',
  description:
    'Polizze assicurative per artigiani, commercianti e PMI italiane. RC impresa, all-risk capannone, infortuni dipendenti, flotta aziendale. Preventivo gratuito in 24 ore.',
  openGraph: {
    images: [{ url: '/api/og?title=Artigiani+e+PMI&tag=Soluzioni&sub=RC+impresa%2C+all-risk+capannone%2C+infortuni+dipendenti%2C+flotta+aziendale.', width: 1200, height: 630 }],
  },
  twitter: {
    images: ['/api/og?title=Artigiani+e+PMI&tag=Soluzioni&sub=RC+impresa%2C+all-risk+capannone%2C+infortuni+dipendenti%2C+flotta+aziendale.'],
  },
}

const coverages = [
  {
    icon: '🏭',
    title: 'RC Impresa',
    desc: 'Responsabilità civile per danni causati a terzi durante l\'attività: un cliente che si fa male nel tuo negozio, un prodotto difettoso che causa danni. Protezione fondamentale per qualsiasi attività.',
    price: 'da 300€/anno',
    mandatory: false,
  },
  {
    icon: '🔥',
    title: 'All-Risk Capannone e Macchinari',
    desc: 'Copre struttura, attrezzature e stock da incendio, furto, allagamento ed eventi atmosferici. Per un artigiano o una PMI, fermare la produzione può significare perdere contratti e clienti.',
    price: 'da 500€/anno',
    mandatory: false,
  },
  {
    icon: '👷',
    title: 'Infortuni Dipendenti (Integrativa INAIL)',
    desc: 'L\'INAIL copre solo una parte degli infortuni sul lavoro. La polizza integrativa copre il gap: invalidità permanente, diaria da ricovero e rimborso spese mediche non riconosciute dall\'INAIL.',
    price: 'da 200€/dipendente',
    mandatory: false,
  },
  {
    icon: '🚚',
    title: 'Merci in Transito',
    desc: 'Copre le merci durante il trasporto, sia che usi mezzi propri che corrieri terzi. Un danno alle merci in consegna può significare perdere il cliente e pagare il risarcimento.',
    price: 'da 200€/anno',
    mandatory: false,
  },
  {
    icon: '🚗',
    title: 'Flotta Aziendale',
    desc: 'Gestione centralizzata di tutti i veicoli aziendali (auto, furgoni, camion) con condizioni vantaggiose rispetto a polizze individuali e unico interlocutore per tutti i sinistri.',
    price: 'da 600€/veicolo',
    mandatory: true,
  },
  {
    icon: '💻',
    title: 'Cyber Risk',
    desc: 'Un ransomware blocca i tuoi sistemi gestionali. Dati clienti rubati. Sanzioni GDPR. La cyber risk copre i costi di ripristino, le spese legali e i danni reputazionali. Ora essenziale anche per le PMI.',
    price: 'da 400€/anno',
    mandatory: false,
  },
  {
    icon: '⏸️',
    title: 'Interruzione di Esercizio',
    desc: 'Se un sinistro (incendio, alluvione) blocca la tua attività, questa polizza compensa il mancato guadagno durante il periodo di fermo. Spesso sottovalutata, può salvare l\'azienda.',
    price: 'inclusa in all-risk',
    mandatory: false,
  },
  {
    icon: '🏗️',
    title: 'Cantieri e CAR',
    desc: 'Per imprese edili e installatori: polizza CAR (Contractors All Risk) che copre i lavori in cantiere, i materiali e la responsabilità verso terzi durante i lavori.',
    price: 'su preventivo',
    mandatory: false,
  },
  {
    icon: '⚖️',
    title: 'Tutela Legale Aziende',
    desc: 'Copre le spese di avvocato, perito e CTU in caso di procedimenti penali (D.Lgs. 231/2001), controversie con dipendenti, fornitori o clienti, e azioni di responsabilità contro amministratori. Completa la RC proteggendo anche l\'imprenditore.',
    price: 'da 400€/anno',
    mandatory: false,
  },
]

const sectors = [
  { name: 'Elettricisti e Idraulici', icon: '⚡' },
  { name: 'Carpentieri e Falegnami', icon: '🔨' },
  { name: 'Meccanici e Carrozzerie', icon: '🔧' },
  { name: 'Bar e Ristoranti', icon: '🍕' },
  { name: 'Negozi e Commercio', icon: '🏪' },
  { name: 'Imprese Edili', icon: '🏗️' },
  { name: 'Trasportatori', icon: '🚚' },
  { name: 'Parrucchieri ed Estetisti', icon: '💇' },
  { name: 'Stampatori e Grafici', icon: '🖨️' },
  { name: 'Produzione Alimentare', icon: '🥗' },
  { name: 'Logistica e Magazzini', icon: '📦' },
  { name: 'IT e Software House', icon: '💻' },
]

export default function ArtigianiPmiPage() {
  return (
    <div>
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: '/' },
          { name: 'Soluzioni', href: '/soluzioni' },
          { name: 'Artigiani e PMI', href: '/soluzioni/artigiani-pmi' },
        ]}
      />
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
            <span className="text-white/80">Artigiani e PMI</span>
          </div>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-semibold mb-5">
              🏭 Soluzioni per piccole e medie imprese
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Proteggi la tua{' '}
              <span className="text-accent">attività</span>
              <br />
              senza spendere troppo
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              Un incendio, un incidente sul lavoro, una contestazione di un cliente:
              senza la giusta copertura, la tua PMI rischia di non riaprire il giorno dopo.
              FIM costruisce il pacchetto assicurativo su misura per la tua attività, confrontando 30+ compagnie.
            </p>
            {/* Pain point box */}
            <div className="bg-white/10 border border-white/20 rounded-xl p-5 mb-8 max-w-2xl">
              <p className="text-white/90 text-sm">
                <strong className="text-accent">Sapevi che</strong> — il 60% delle PMI italiane che subiscono un incendio non riapre entro 6 mesi?
                La polizza interruzione di esercizio è quella che più spesso salva le aziende, eppure è la meno conosciuta.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/preventivo" className="btn-primary text-lg px-8 py-4">
                Preventivo per la mia attività
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

      {/* Sectors */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="container-custom">
          <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6">
            Settori che proteggiamo
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {sectors.map((s) => (
              <div key={s.name} className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700">
                <span>{s.icon}</span>
                {s.name}
              </div>
            ))}
            <div className="flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-lg px-4 py-2 text-sm font-semibold text-accent">
              + altri settori
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
              Cosa possiamo coprire per te
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Non devi prendere tutto: analizziamo insieme i rischi reali della tua attività e costruiamo il pacchetto ottimale.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {coverages.map((cov) => (
              <Card key={cov.title} className="flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{cov.icon}</span>
                  <div className="text-right">
                    <span className="text-xs font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-full block">
                      {cov.price}
                    </span>
                    {cov.mandatory && (
                      <span className="text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full block mt-1">
                        obbligatoria
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
            * I prezzi indicati sono puramente orientativi e non costituiscono offerta contrattuale ai sensi del D.Lgs. 209/2005 (Codice delle Assicurazioni Private). Il premio effettivo è determinato dalla compagnia assicuratrice in base al settore di attività, fatturato e valori assicurati. FIM Insurance Broker opera come intermediario assicurativo indipendente iscritto al RUI IVASS.
          </p>

          {/* Tutela Legale spotlight */}
          <div className="mt-12 bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-8 md:p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full -translate-y-20 translate-x-20" />
            <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2">
                <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 rounded-full px-3 py-1 text-xs font-bold text-accent mb-4">
                  <span>⚖️</span>
                  NUOVO SERVIZIO
                </div>
                <h3 className="text-2xl md:text-3xl font-black mb-3">
                  RC + Tutela Legale = protezione a 360° dell&apos;imprenditore
                </h3>
                <p className="text-white/80 leading-relaxed mb-4">
                  La RC Azienda copre i danni che causi a terzi, ma non paga gli avvocati quando sei tu a dover difenderti:
                  un procedimento penale per reati colposi (sicurezza sul lavoro, ambientali), una verifica ex D.Lgs. 231/2001,
                  un contenzioso con un dipendente. La <strong className="text-accent">Tutela Legale Aziende</strong> completa
                  la copertura: avvocati, periti, CTU e consulenti pagati dalla compagnia.
                </p>
                <Link
                  href="/servizi/tutela-legale-aziende"
                  className="inline-flex items-center gap-2 text-accent font-semibold hover:text-white transition-colors"
                >
                  Scopri la Tutela Legale Aziende
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-accent flex-shrink-0">✓</span>
                  <span className="text-white/90">Tutela penale D.Lgs. 231/2001</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-accent flex-shrink-0">✓</span>
                  <span className="text-white/90">Danni patrimoniali (D&amp;O) amministratori e sindaci</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-accent flex-shrink-0">✓</span>
                  <span className="text-white/90">Controversie con dipendenti e fornitori</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-accent flex-shrink-0">✓</span>
                  <span className="text-white/90">Libera scelta dell&apos;avvocato di fiducia</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-accent/10 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
                Come lavoriamo
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-primary mb-6">
                Non ti vendiamo una polizza.<br />Ti costruiamo una protezione.
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                La maggior parte dei broker vende polizze standard. FIM parte dall&apos;analisi dei rischi reali della tua attività.
                Il risultato: nessuna copertura inutile, nessun gap pericoloso.
              </p>
              <div className="space-y-4">
                {[
                  { step: '01', title: 'Analisi dei rischi', desc: 'Capiamo la tua attività: settore, dipendenti, attrezzature, clienti. Identifichiamo le esposizioni reali.' },
                  { step: '02', title: 'Confronto offerte', desc: 'Chiediamo preventivi a 30+ compagnie partner. Selezioniamo le migliori per copertura e prezzo.' },
                  { step: '03', title: 'Proposta chiara', desc: 'Ti presentiamo un confronto leggibile: cosa copre, cosa non copre, quanto costa, differenze tra opzioni.' },
                  { step: '04', title: 'Supporto continuo', desc: 'Rinnoviamo e adattiamo le polizze al crescere della tua attività. Ti affianchiamo nei sinistri.' },
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
              <h3 className="text-xl font-black text-primary mb-2">Pacchetto base consigliato per PMI</h3>
              <p className="text-gray-500 text-sm mb-6">Stimato per attività con 1-5 dipendenti e fatturato fino a 500.000€</p>
              <div className="space-y-3 mb-6">
                {[
                  { name: 'RC Impresa', price: '400€/anno' },
                  { name: 'All-risk sede e attrezzature', price: '600€/anno' },
                  { name: 'Infortuni dipendenti (x2)', price: '400€/anno' },
                  { name: 'Interruzione di esercizio', price: 'inclusa' },
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
              <div className="bg-primary/5 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary">Totale indicativo</span>
                  <span className="text-2xl font-black text-primary">da 1.400€/anno</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">ca. 117€/mese per proteggere completamente la tua attività</p>
              </div>
              <Link href="/preventivo" className="btn-primary w-full text-center block">
                Richiedi il tuo preventivo
              </Link>
            </div>
          </div>
        </div>
      </section>

      <LeadMagnet />

      <FaqSection items={artigianiPmiFaq.items} cta={artigianiPmiFaq.cta} />

      {/* Second Opinion */}
      <section className="section-padding bg-primary/5 border-t border-primary/10">
        <div className="container-custom max-w-3xl text-center">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">Solo per PMI e artigiani</p>
          <h2 className="text-2xl font-bold text-primary mb-3">Hai già delle polizze? Scopri se ti coprono davvero</h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Inviaci i PDF dei tuoi contratti attuali. Un consulente FIM fa la <strong>Gap Analysis gratuita</strong>
            su RC, incendio, catastrofale e cyber — e ti dice dove sei scoperto, entro 48 ore.
          </p>
          <Link href="/seconda-opinione" className="btn-primary inline-block">
            Richiedi la Second Opinion gratuita →
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-primary py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            La tua attività è adeguatamente protetta?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Un&apos;analisi gratuita dei tuoi rischi aziendali. Nessun impegno, risposta in 24 ore.
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

import type { Metadata } from 'next'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import FaqSection from '@/components/ui/FaqSection'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import SinistriAIAssistant from '@/components/forms/SinistriAIAssistant'
import { sinistriFaq } from '@/lib/faq/sinistri'

export const metadata: Metadata = {
  title: 'Gestione Sinistri',
  description: 'FIM Insurance Broker ti affianca in ogni fase del sinistro: dalla denuncia alla liquidazione. Scopri come gestiamo i sinistri per te in modo rapido ed efficace.',
  openGraph: {
    title: 'Gestione Sinistri — FIM Insurance Broker',
    description: 'Non sei solo davanti al sinistro. FIM ti affianca dalla denuncia alla liquidazione.',
    images: [{ url: '/api/og?title=Gestione+Sinistri&tag=FIM+Insurance+Broker&sub=Ti+affianchiamo+dalla+denuncia+alla+liquidazione.', width: 1200, height: 630 }],
  },
}

const steps = [
  {
    num: '01',
    icon: '📞',
    title: 'Ci contatti subito',
    desc: 'Appena accade il sinistro, chiami il nostro numero dedicato o scriva su WhatsApp. Siamo disponibili per guidarti fin dal primo momento.',
    detail: 'Non aspettare giorni — ogni ora conta nella gestione di un sinistro.',
  },
  {
    num: '02',
    icon: '📋',
    title: 'Raccogliamo la documentazione',
    desc: 'Il nostro team raccoglie e verifica tutta la documentazione necessaria: foto, perizie, testimonianze, referti. Ti diciamo esattamente cosa serve.',
    detail: 'Documentazione incompleta è la causa principale dei ritardi nella liquidazione.',
  },
  {
    num: '03',
    icon: '📨',
    title: 'Denunciamo alla compagnia',
    desc: 'Presentiamo la denuncia del sinistro alla compagnia assicuratrice in modo corretto e tempestivo, usando il linguaggio tecnico che massimizza le possibilità di liquidazione.',
    detail: 'Ogni compagnia ha procedure diverse. Le conosciamo tutte.',
  },
  {
    num: '04',
    icon: '🤝',
    title: 'Trattiamo per te',
    desc: 'Monitoriamo l\'iter della pratica, rispondiamo alle richieste di integrazione e trattiamo direttamente con i liquidatori per ottenere il massimo riconoscimento.',
    detail: 'Siamo dalla tua parte — non dalla parte della compagnia.',
  },
  {
    num: '05',
    icon: '💰',
    title: 'Ottieni il rimborso',
    desc: 'Ti teniamo aggiornato sull\'esito della liquidazione e, se necessario, impugniamo le decisioni ingiuste della compagnia con perizie di parte e mediazione.',
    detail: 'Tempi medi di liquidazione: 15-45 giorni per sinistri semplici.',
  },
]

const sinistroTypes = [
  { icon: '🚗', title: 'RC Auto e Kasko', desc: 'Incidenti stradali, danni a terzi, furto veicolo, eventi atmosferici su auto.' },
  { icon: '🏠', title: 'Danni alla Casa', desc: 'Allagamenti, incendi, furti, danni da eventi atmosferici, RC condominiale.' },
  { icon: '⚕️', title: 'Infortuni e Salute', desc: 'Rimborso spese mediche, indennità da infortunio, diarie ospedaliere.' },
  { icon: '💼', title: 'RC Professionale', desc: 'Danni causati a clienti nell\'esercizio dell\'attività professionale.' },
  { icon: '🏭', title: 'Sinistri Aziendali', desc: 'Danni alla proprietà, interruzione dell\'attività, responsabilità civile.' },
  { icon: '🌪️', title: 'Catastrofi Naturali', desc: 'Alluvioni, terremoti, trombe d\'aria, grandine su immobili e attrezzature.' },
]

export default function SinistriPage() {
  return (
    <div>
      <BreadcrumbSchema items={[{ name: 'Home', href: '/' }, { name: 'Sinistri', href: '/sinistri' }]} />
      {/* Hero */}
      <section className="gradient-primary py-20 md:py-28">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="inline-block bg-white/10 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Gestione Sinistri
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              Non sei solo<br />davanti al sinistro.
            </h1>
            <p className="text-white/80 text-xl mb-8 leading-relaxed">
              Quando succede qualcosa di brutto, l&apos;ultima cosa di cui hai bisogno è trattare da solo con la compagnia assicuratrice. Ci pensiamo noi: dalla denuncia alla liquidazione.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:+390696883381"
                className="btn-primary bg-accent hover:bg-accent-dark text-primary font-bold px-8 py-4"
              >
                📞 Chiama ora: 06 96883381
              </a>
              <a
                href={`https://wa.me/393473312330?text=${encodeURIComponent('Ciao, ho un sinistro e ho bisogno di assistenza.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-white px-8 py-4"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Numeri */}
      <section className="bg-white py-10 border-b border-gray-100">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { num: '+500', label: 'Sinistri gestiti' },
              { num: '94%', label: 'Tasso di liquidazione' },
              { num: '< 24h', label: 'Presa in carico' },
              { num: '20+', label: 'Anni di esperienza' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-black text-primary">{s.num}</div>
                <div className="text-gray-500 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block bg-accent/10 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              Come funziona
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
              Il nostro processo<br />in 5 passi
            </h2>
          </div>
          <div className="space-y-6 max-w-3xl mx-auto">
            {steps.map((step) => (
              <div key={step.num} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center text-white font-black text-lg">
                  {step.num}
                </div>
                <Card padding="md" className="flex-1">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{step.icon}</span>
                    <div>
                      <h3 className="font-bold text-primary text-lg mb-1">{step.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-2">{step.desc}</p>
                      <p className="text-xs text-accent font-semibold">{step.detail}</p>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tipi di sinistro */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-primary mb-4">Gestiamo ogni tipo di sinistro</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dall&apos;incidente stradale al danno aziendale, abbiamo l&apos;esperienza per gestire qualsiasi situazione.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sinistroTypes.map((s) => (
              <Card key={s.title} padding="md" className="hover:shadow-md transition-shadow">
                <span className="text-3xl mb-3 block">{s.icon}</span>
                <h3 className="font-bold text-primary mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <FaqSection items={sinistriFaq.items} cta={sinistriFaq.cta} />

      {/* AI Claims Assistant */}
      <section className="section-padding">
        <div className="container-custom max-w-2xl">
          <div className="text-center mb-10">
            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              Nuovo
            </span>
            <h2 className="text-3xl font-black text-primary mb-3">Apri una pratica sinistro</h2>
            <p className="text-gray-600">
              Il nostro agente AI ti guida nella raccolta dei documenti giusti, pre-compila il modulo e notifica subito il team.
            </p>
          </div>
          <SinistriAIAssistant />
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-primary py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-black text-white mb-4">Hai un sinistro adesso?</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Non aspettare. Contattaci subito — ogni ora conta nella gestione di un sinistro.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:+390696883381" className="btn-primary bg-accent hover:bg-accent-dark text-primary font-bold px-8 py-4">
              📞 06 96883381
            </a>
            <Link href="/preventivo" className="btn-outline-white px-8 py-4">
              Non ho ancora una polizza FIM
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

import type { Metadata } from 'next'
import PolicyAnalyzer from '@/components/forms/PolicyAnalyzer'

export const metadata: Metadata = {
  title: 'Analizza la tua Polizza Gratis | FIM Insurance Broker',
  description:
    'Carica il PDF della tua polizza e scopri in 30 secondi cosa ti manca, dove paghi troppo e come migliorare la tua copertura. Gratis, senza impegno.',
  openGraph: {
    title: 'Analizza la tua Polizza Gratis — Report AI in 30 secondi',
    description:
      'Scopri le lacune della tua polizza, dove paghi troppo e come risparmiare. Analisi gratuita con intelligenza artificiale.',
    images: [{ url: '/api/og?title=Analizza+la+tua+Polizza+Gratis', width: 1200, height: 630 }],
  },
}

const HOW_IT_WORKS = [
  {
    step: '1',
    title: 'Carica il PDF',
    desc: 'Trascina o seleziona il documento della tua polizza attuale. Qualsiasi compagnia, qualsiasi tipo.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
  },
  {
    step: '2',
    title: 'L\'AI analizza tutto',
    desc: 'Il nostro agente AI legge ogni clausola, identifica le coperture, rileva le lacune e confronta con il mercato.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    step: '3',
    title: 'Ricevi il report',
    desc: 'Un report dettagliato con punteggio, lacune critiche, dove risparmi e raccomandazioni personalizzate.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
]

const TRUST_POINTS = [
  { label: 'Gratuito', desc: 'Nessun costo, nessun impegno' },
  { label: 'Sicuro', desc: 'Il PDF non viene salvato' },
  { label: 'Veloce', desc: 'Report pronto in 30 secondi' },
  { label: 'Esperto', desc: '30+ compagnie confrontate' },
]

const FAQS = [
  {
    q: 'Che tipo di polizze posso analizzare?',
    a: 'Qualsiasi polizza assicurativa italiana: auto (RCA, Kasko), casa, vita, salute, RC professionale, polizze aziendali, condomini. Il sistema riconosce automaticamente il tipo di polizza dal documento.',
  },
  {
    q: 'I miei dati e il documento sono al sicuro?',
    a: "Il PDF viene analizzato in tempo reale e non viene mai salvato sui nostri server. Solo nome ed email vengono conservati per permetterci di seguirti se richiedi un preventivo. Leggi la nostra Privacy Policy per tutti i dettagli.",
  },
  {
    q: "L'analisi è davvero gratuita?",
    a: "Sì, completamente gratuita. Non è richiesta la carta di credito né alcuna registrazione. L'obiettivo è mostrarti il valore di un broker assicurativo professionale.",
  },
  {
    q: 'Cosa succede dopo l\'analisi?',
    a: 'Ricevi il report immediatamente sullo schermo. Se lo desideri, puoi richiedere un preventivo gratuito o prenotare una consulenza con uno dei nostri esperti per migliorare la tua copertura.',
  },
]

export default function AnalizzaPolizzaPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="gradient-primary py-16 md:py-20 text-white">
        <div className="container-custom text-center">
          <span className="inline-block bg-white/10 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-5">
            Esclusivo · Gratis · Nessun competitor lo fa
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Scopri se la tua polizza<br />
            <span className="text-accent">ti sta costando troppo</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Carica il PDF della tua polizza attuale. In 30 secondi il nostro agente AI analizza
            coperture, lacune e prezzi — e ti dice esattamente cosa cambiare.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {TRUST_POINTS.map((t) => (
              <div key={t.label} className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>
                  <strong>{t.label}</strong> — {t.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-gray-50 py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs font-bold text-accent uppercase tracking-wide mb-1">
                    Step {item.step}
                  </p>
                  <h3 className="font-bold text-gray-800 mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main Analyzer ── */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-2xl">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">
            <div className="mb-6 text-center">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-primary">Analizza la tua polizza</h2>
              <p className="text-gray-500 text-sm mt-1">Carica il PDF e ottieni il report gratuito in 30 secondi</p>
            </div>
            <PolicyAnalyzer />
          </div>
        </div>
      </section>

      {/* ── What the report includes ── */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-primary mb-3">Cosa trovi nel report</h2>
          <p className="text-gray-500 mb-10 max-w-xl mx-auto">
            Un&apos;analisi completa che nessuna compagnia ti farà mai — perché non è nel loro interesse.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: '🔍', title: 'Coperture trovate', desc: 'Elenco completo di tutte le garanzie con massimali e franchigie' },
              { icon: '⚠️', title: 'Lacune critiche', desc: 'Rischi che non sei coperto e le conseguenze concrete in caso di sinistro' },
              { icon: '💶', title: 'Dove risparmi', desc: 'Voci dove paghi più del necessario con stima del risparmio annuo' },
              { icon: '📋', title: 'Esclusioni nascoste', desc: 'Le clausole limitanti che spesso vengono tralasciate' },
              { icon: '⭐', title: 'Punteggio polizza', desc: 'Un voto da 1 a 10 che sintetizza la qualità della tua copertura' },
              { icon: '→', title: 'Raccomandazioni', desc: 'Azioni concrete e prioritarie per migliorare la tua protezione' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl border border-gray-100 p-5 text-left">
                <span className="text-2xl">{item.icon}</span>
                <h3 className="font-bold text-gray-800 mt-2 mb-1">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-2xl">
          <h2 className="text-3xl font-bold text-primary text-center mb-8">Domande frequenti</h2>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.q} className="border border-gray-200 rounded-xl p-5">
                <h3 className="font-semibold text-gray-800 mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cross-link Second Opinion ── */}
      <section className="section-padding bg-primary/5 border-t border-primary/10">
        <div className="container-custom max-w-3xl text-center">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">Per PMI e professionisti</p>
          <h2 className="text-2xl font-bold text-primary mb-3">Hai più polizze da analizzare insieme?</h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            L&apos;analisi AI è ottima per una singola polizza. Se hai un portafoglio complesso — RC, incendio, cyber, catastrofale —
            richiedi la <strong>Second Opinion gratuita</strong>: un consulente FIM fa la Gap Analysis su tutte le tue coperture
            e ti ricontatta entro 48 ore.
          </p>
          <a href="/seconda-opinione" className="btn-primary inline-block">
            Richiedi la Second Opinion gratuita →
          </a>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="gradient-primary py-14 text-white text-center">
        <div className="container-custom max-w-xl">
          <h2 className="text-2xl font-bold mb-3">Preferisci parlare con un esperto?</h2>
          <p className="opacity-80 mb-6">
            I nostri consulenti analizzano la tua situazione gratuitamente e trovano la soluzione migliore tra 30+ compagnie.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/prenota-consulenza" className="btn-primary">
              Prenota consulenza gratuita
            </a>
            <a href="tel:+390696883381" className="btn-outline-white">
              Chiama ora: 06 96883381
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

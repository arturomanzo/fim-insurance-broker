import type { Metadata } from 'next'
import Link from 'next/link'
import VerificaRequisiti from '@/components/forms/VerificaRequisiti'
import { OG_BASE } from '@/lib/seo'
import { RICONTATTO } from '@/lib/tempi'

export const metadata: Metadata = {
  title: 'Verifica i requisiti assicurativi di un bando o contratto',
  description:
    'Carica il bando, il capitolato o il contratto: ti diciamo quali polizze e cauzioni chiede, con importi e scadenze, e cosa manca rispetto a quelle che hai. Gratis.',
  alternates: { canonical: '/verifica-requisiti' },
  openGraph: {
    ...OG_BASE,
    url: '/verifica-requisiti',
    title: 'Verifica i requisiti assicurativi — bandi, capitolati, contratti',
    description:
      'Garanzia provvisoria, definitiva, CAR, RC: cosa chiede il documento e cosa ti manca. Verifica gratuita con un broker dietro.',
    images: [{ url: '/api/og?title=Verifica+i+requisiti+assicurativi', width: 1200, height: 630 }],
  },
}

const PASSI = [
  {
    step: '1',
    title: 'Carica il documento',
    desc: 'Il bando, il disciplinare, il capitolato o il contratto che chiede le polizze. Se vuoi, anche la polizza che hai già.',
  },
  {
    step: '2',
    title: 'Leggiamo le clausole',
    desc: "L'intelligenza artificiale trova ogni garanzia richiesta, calcola gli importi e segna le clausole poco chiare.",
  },
  {
    step: '3',
    title: 'Ti arriva il preventivo',
    desc: `Vedi subito cosa ti manca. Noi ti scriviamo ${RICONTATTO} con un preventivo indicativo per coprirlo.`,
  },
]

const CASI = [
  {
    title: 'Gare pubbliche',
    desc: "Garanzia provvisoria con l'offerta, definitiva alla firma, polizze per l'anticipazione. Sbagliare l'importo o il beneficiario può costare l'esclusione.",
  },
  {
    title: 'Appalti e subappalti privati',
    desc: 'Il committente chiede CAR, RC verso terzi e dipendenti, a volte la decennale postuma: con quali massimali, e chi deve essere assicurato.',
  },
  {
    title: 'Professionisti con incarico',
    desc: "L'ente o il cliente ti chiede la RC professionale con un certo massimale e una certa retroattività. Vediamo se la tua basta.",
  },
  {
    title: 'Locazioni e forniture',
    desc: 'Contratti che chiedono una fideiussione o una polizza a garanzia: quanto deve valere e fino a quando.',
  },
]

const FAQS = [
  {
    q: 'Quanto vale una garanzia provvisoria in una gara pubblica?',
    a: "Di regola il 2 per cento del valore della procedura: la stazione appaltante può ridurla fino all'1 o portarla fino al 4 per cento, motivando (art. 106 del D.Lgs. 36/2023). La definitiva vale il 10 per cento dell'importo del contratto (art. 117). Quello che conta però è cosa scrive il tuo bando: lo leggiamo noi.",
  },
  {
    q: 'Devo per forza caricare anche la mia polizza?',
    a: 'No. Senza polizza ti diciamo cosa chiede il documento. Con la polizza ti diciamo anche cosa hai già e cosa manca.',
  },
  {
    q: 'I documenti restano da qualche parte?',
    a: 'No. I PDF vengono letti e scartati. Teniamo nome, email, telefono se lo lasci e la sintesi della verifica, per prepararti il preventivo. Dettagli nella Privacy Policy.',
  },
  {
    q: 'La verifica sostituisce il broker?',
    a: "No, gli fa risparmiare tempo. Prima che tu presenti l'offerta o firmi, un broker FIM ricontrolla requisiti e polizze con te.",
  },
]

export default function VerificaRequisitiPage() {
  return (
    <>
      <section className="gradient-primary py-16 md:py-20 text-white">
        <div className="container-custom text-center">
          <span className="inline-block bg-white/10 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-5">
            Gratis · Per imprese e professionisti
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Il bando chiede polizze?<br />
            <span className="text-accent">Ti diciamo quali, e cosa ti manca</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Carica il bando, il capitolato o il contratto. In circa un minuto vedi ogni garanzia richiesta, con importo,
            scadenza e articolo da cui viene. Se carichi anche la tua polizza, la confrontiamo.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PASSI.map((p) => (
              <div key={p.step} className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                  {p.step}
                </div>
                <div>
                  <h2 className="font-bold text-gray-800 mb-1">{p.title}</h2>
                  <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-2xl">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-primary">Verifica i requisiti</h2>
              <p className="text-gray-500 text-sm mt-1">Un documento obbligatorio, la polizza se ce l&apos;hai</p>
            </div>
            <VerificaRequisiti />
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-bold text-primary text-center mb-3">Quando serve</h2>
          <p className="text-gray-500 text-center mb-10 max-w-xl mx-auto">
            Ogni volta che qualcuno ti chiede una polizza per lavorare con lui.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {CASI.map((c) => (
              <div key={c.title} className="bg-white rounded-xl border border-gray-100 p-5">
                <h3 className="font-bold text-gray-800 mb-1">{c.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-2xl">
          <h2 className="text-3xl font-bold text-primary text-center mb-8">Domande frequenti</h2>
          <div className="space-y-4">
            {FAQS.map((f) => (
              <div key={f.q} className="border border-gray-200 rounded-xl p-5">
                <h3 className="font-semibold text-gray-800 mb-2">{f.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary/5 border-t border-primary/10">
        <div className="container-custom max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-primary mb-3">La cauzione te la facciamo noi</h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Garanzie provvisorie e definitive, cauzioni per anticipazioni e contratti: dalla pratica allo svincolo.
          </p>
          <Link href="/servizi/cauzioni-fideiussioni" className="btn-primary inline-block">
            Cauzioni e fideiussioni →
          </Link>
        </div>
      </section>
    </>
  )
}

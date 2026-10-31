import type { Metadata } from 'next'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { OG_BASE } from '@/lib/seo'
import Link from 'next/link'
import FaqSection from '@/components/ui/FaqSection'
import { calcolatoreRischiFaq } from '@/lib/faq/calcolatore-rischi'

const RiskCalculator = dynamic(() => import('@/components/calculator/RiskCalculator'), {
  loading: () => (
    <div className="flex items-center justify-center py-24">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        <p className="text-gray-500 text-sm">Caricamento calcolatore...</p>
      </div>
    </div>
  ),
})

// Titolo e H1 rivisti il 31/10/2026 sui dati di Search Console: "analisi del
// rischio gratuita" aveva 276 impressioni in posizione ~81 e la pagina aveva
// circa cento parole di testo oltre al quiz.
export const metadata: Metadata = {
  title: { absolute: 'Analisi del rischio assicurativo gratuita | FIM Broker' },
  description: 'Rispondi a poche domande e scopri quali coperture servono a te, alla tua famiglia o alla tua impresa. Gratuita e senza impegno: ti spieghiamo anche perché.',
  alternates: { canonical: '/calcolatore-rischi' },
  openGraph: {
    ...OG_BASE,
    url: '/calcolatore-rischi',
    title: 'Calcolatore Rischio Assicurativo Gratuito — FIM Insurance Broker',
    description: 'Analisi del rischio personalizzata in 2 minuti. Scopri quali coperture ti servono davvero.',
  },
}

export default function CalcolatoreRischiPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-primary py-16 md:py-20 overflow-hidden">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                Calcolatore del rischio · gratuito
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-white mb-4">
                Analisi del rischio assicurativo gratuita
              </h1>
              <p className="text-white/80 text-lg md:text-xl">
                Rispondi a 8 domande e scopri quali polizze ti servono davvero. Completamente gratuito, nessun impegno.
              </p>
              <div className="flex flex-wrap items-center gap-6 mt-6 text-white/70 text-sm">
                {['2 minuti', '100% gratuito', 'Analisi personalizzata', 'Nessun impegno'].map((label) => (
                  <span key={label} className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-accent-light" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {label}
                  </span>
                ))}
              </div>
            </div>
            <div className="hidden lg:flex justify-end">
              <div className="relative w-full max-w-lg aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/visual/pianificazione-strategica.jpg"
                  alt="Pianificazione strategica del rischio assicurativo con FIM"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-10">
            <RiskCalculator />
          </div>
        </div>
      </section>

      {/* Come funziona: testo leggibile da chi arriva da Google, sotto il quiz */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-black text-primary mb-6">
            Come funziona l&apos;analisi del rischio
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Un&apos;analisi del rischio assicurativo parte da una domanda semplice: cosa ti può succedere che non
              riusciresti a pagare da solo? Per una famiglia di solito è la casa, il reddito di chi lavora, la salute.
              Per un professionista è l&apos;errore che un cliente ti contesta. Per un&apos;impresa sono i danni a terzi,
              un incendio, un fermo dell&apos;attività, un attacco informatico.
            </p>
            <p>
              Il calcolatore ti fa scegliere il profilo e il settore, poi ti chiede alcune cose sulla tua situazione.
              Alla fine ti dà un punteggio da 0 a 100 e un elenco di coperture in ordine di priorità, ognuna con il
              motivo per cui te la suggerisce. È un primo orientamento: ti dice da dove cominciare, non quanto pagherai.
            </p>
          </div>

          <h2 className="text-2xl md:text-3xl font-black text-primary mt-12 mb-6">
            Dopo il calcolatore: le polizze che hai già
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Il passo che conta di più viene dopo. Quasi tutti hanno già qualche polizza, presa in momenti diversi
              da persone diverse. Le leggiamo per intero, condizioni generali comprese, e cerchiamo tre cose: i rischi
              che nessuna copre, le garanzie che paghi due volte e le clausole che al momento del sinistro possono
              ridurre o negare l&apos;indennizzo. Poi ti proponiamo solo quello che manca, con le offerte di più
              compagnie a confronto.
            </p>
            <p>
              Funziona così perché un broker non rappresenta nessuna compagnia. In più le regole sulla distribuzione
              assicurativa (IDD, recepita con il D.Lgs. 68/2018) chiedono a chi propone una polizza di partire dalle
              richieste e dalle esigenze del cliente.{' '}
              <Link href="/seconda-opinione" className="text-primary font-semibold hover:text-accent">
                Puoi mandarci le tue polizze da qui
              </Link>
              .
            </p>
          </div>

          <h2 className="text-2xl md:text-3xl font-black text-primary mt-12 mb-6">
            Perché è gratuita
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Per te l&apos;analisi non costa niente e non ti obbliga a nulla. Se decidi di assicurarti tramite noi, il
            compenso di FIM lo paga la compagnia con cui colloca il contratto. È il modo in cui lavorano i broker e lo
            trovi scritto nell&apos;informativa precontrattuale che ti consegniamo prima di qualunque proposta. Il premio
            lo decide la compagnia sui tuoi dati: noi ti mostriamo le alternative, la scelta resta tua.
          </p>
        </div>
      </section>

      <FaqSection items={calcolatoreRischiFaq.items} cta={calcolatoreRischiFaq.cta} />

      {/* Why trust us */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-center">
            {[
              { icon: '🔍', title: 'Analisi indipendente', desc: 'Non siamo legati a nessuna compagnia. Le nostre raccomandazioni sono basate solo sulle tue esigenze reali.' },
              { icon: '📋', title: 'Il mercato a confronto', desc: 'I nostri consulenti mettono a confronto le offerte di più compagnie per trovare quella giusta per te.' },
              { icon: '🛡️', title: 'Iscritti al RUI', desc: "FIM Insurance Broker è iscritta al RUI Sez. B n. B000405449 ed è soggetta alla vigilanza IVASS: l'iscrizione si verifica sul registro pubblico." },
            ].map((item) => (
              <div key={item.title} className="p-6">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-primary mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import Card from '@/components/ui/Card'

const CITY = 'Cisterna di Latina'
const SLUG = 'broker-assicurativo-cisterna-di-latina'

export const metadata: Metadata = {
  title: `Broker Assicurativo a ${CITY} — FIM Insurance Broker`,
  description: `Cerchi un broker assicurativo a ${CITY}? FIM Insurance Broker confronta 30+ compagnie per trovare la polizza giusta per te. Preventivo gratuito, consulenza personalizzata.`,
  openGraph: {
    images: [{ url: `/api/og?title=Broker+Assicurativo+a+${CITY}&tag=FIM+Insurance+Broker&sub=Confrontiamo+30%2B+compagnie.+Preventivo+gratuito.`, width: 1200, height: 630 }],
  },
  alternates: { canonical: `https://www.fimbroker.it/${SLUG}` },
}

const servizi = [
  { icon: '🚗', title: 'RC Auto e Moto', desc: `Polizze auto e moto al miglior prezzo per residenti a ${CITY} e provincia.` },
  { icon: '🏠', title: 'Assicurazione Casa', desc: 'Protezione completa per il tuo immobile: incendio, furto, calamità naturali.' },
  { icon: '❤️', title: 'Polizze Vita e Salute', desc: 'Coperture vita, infortuni e spese mediche per te e la tua famiglia.' },
  { icon: '🏢', title: 'Polizze Aziendali', desc: `RC professionale, cyber risk, D&O e welfare per aziende della provincia di ${CITY}.` },
  { icon: '🏗️', title: 'Condomini e Fabbricati', desc: 'Polizze globale fabbricati, RC condominio e copertura catastrofale.' },
  { icon: '⚖️', title: 'Tutela Legale', desc: 'Protezione legale per privati e professionisti in caso di controversie.' },
]

const vantaggi = [
  { icon: '🎯', title: 'Indipendenza totale', desc: `Non rappresentiamo nessuna compagnia: a ${CITY} lavoriamo solo per il tuo interesse.` },
  { icon: '📊', title: '30+ compagnie a confronto', desc: 'Generali, AXA, Allianz, UnipolSai, Zurich, Groupama e molte altre.' },
  { icon: '🤝', title: 'Consulente dedicato', desc: 'Un professionista che conosce il tuo nome, non un call center.' },
  { icon: '⚡', title: 'Gestione sinistri', desc: 'Ti seguiamo dalla denuncia alla liquidazione con tempi rapidi e assistenza completa.' },
]

export default function BrokerCisterna() {
  return (
    <div>
      {/* Hero */}
      <section className="gradient-primary py-16 md:py-24 text-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="inline-block bg-white/10 border border-white/20 text-sm px-4 py-1.5 rounded-full mb-4">
              📍 {CITY} e provincia
            </span>
            <h1 className="text-4xl md:text-5xl font-black mb-6">
              Broker assicurativo a <span className="text-accent">{CITY}</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              FIM Insurance Broker è il tuo broker assicurativo indipendente nella provincia di {CITY}.
              Confrontiamo le offerte di oltre 30 compagnie per trovare la polizza perfetta per te,
              al prezzo più competitivo del mercato.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/preventivo" className="btn-primary px-6 py-3">
                Preventivo Gratuito
              </Link>
              <a href="tel:+390696883381" className="btn-outline-white px-6 py-3">
                📞 06 96883381
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Servizi nella zona */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="inline-block bg-accent/10 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              I nostri servizi
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
              Assicurazioni a {CITY}: cosa possiamo fare per te
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Dalle polizze auto alle coperture aziendali, offriamo soluzioni complete per privati,
              famiglie, professionisti e PMI della provincia di {CITY}.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {servizi.map((s) => (
              <Card key={s.title} hover className="h-full">
                <div className="text-4xl mb-4" aria-hidden="true">{s.icon}</div>
                <h3 className="font-black text-primary text-lg mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Perché scegliere FIM */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
                Perché FIM
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-primary mb-6">
                Perché scegliere un broker indipendente a {CITY}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                La differenza tra un agente assicurativo e un broker è sostanziale: l&apos;agente
                lavora per la compagnia, il broker lavora per te. FIM Insurance Broker, con sede
                a Cisterna di Latina, serve clienti in tutta la provincia di {CITY} e nel Lazio
                con un approccio indipendente e trasparente.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Con oltre 20 anni di attività e 1.200+ polizze gestite, conosciamo il mercato
                assicurativo italiano come pochi altri. Il nostro obiettivo è semplice:
                la migliore copertura al miglior prezzo.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/chi-siamo" className="text-primary font-semibold hover:underline">
                  Scopri chi siamo →
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {vantaggi.map((v) => (
                <Card key={v.title} className="h-full">
                  <div className="text-3xl mb-3" aria-hidden="true">{v.icon}</div>
                  <h3 className="font-bold text-primary mb-1">{v.title}</h3>
                  <p className="text-gray-600 text-sm">{v.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Come raggiungerci */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-primary mb-4">
              Dove trovarci
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              La nostra sede è a Cisterna di Latina, facilmente raggiungibile da {CITY},
              Aprilia, Velletri e Latina, Aprilia, Velletri e tutto il comprensorio pontino. Offriamo anche consulenze telefoniche e in videocall.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center">
              <div className="text-3xl mb-3" aria-hidden="true">📍</div>
              <h3 className="font-bold text-primary mb-1">Sede</h3>
              <p className="text-gray-600 text-sm">Via Roma 41<br />04012 Cisterna di Latina (LT)</p>
            </Card>
            <Card className="text-center">
              <div className="text-3xl mb-3" aria-hidden="true">📞</div>
              <h3 className="font-bold text-primary mb-1">Telefono</h3>
              <p className="text-gray-600 text-sm">+39 06 96883381<br />Lun-Ven 9:30-13:00 / 15:30-18:30</p>
            </Card>
            <Card className="text-center">
              <div className="text-3xl mb-3" aria-hidden="true">📧</div>
              <h3 className="font-bold text-primary mb-1">Email</h3>
              <p className="text-gray-600 text-sm">info@fimbroker.it<br />Risposta entro 24 ore</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-primary py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-black text-white mb-4">
            Richiedi un preventivo gratuito a {CITY}
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Compila il modulo online o chiamaci. Entro 24 ore riceverai un preventivo personalizzato
            con le migliori offerte del mercato.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/preventivo" className="btn-primary text-lg px-8 py-4">
              Richiedi Preventivo
            </Link>
            <Link href="/prenota-consulenza" className="btn-outline-white text-lg px-8 py-4">
              Prenota Consulenza
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

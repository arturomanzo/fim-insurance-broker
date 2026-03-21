import type { Metadata } from 'next'
import ContactForm from '@/components/forms/ContactForm'
import Card from '@/components/ui/Card'

export const metadata: Metadata = {
  title: 'Contatti',
  description: 'Contatta FIM Insurance Broker. Siamo disponibili per consulenze telefoniche, via email o di persona nel nostro ufficio di Milano.',
}

const contactInfo = [
  {
    icon: '📍',
    title: 'Sede',
    lines: ['Via Roma 123', '20121 Milano MI'],
  },
  {
    icon: '📞',
    title: 'Telefono',
    lines: ['+39 02 1234567', 'Lun-Ven 9:00 - 18:00'],
    href: 'tel:+390212345678',
  },
  {
    icon: '📧',
    title: 'Email',
    lines: ['info@fimbroker.it', 'sinistri@fimbroker.it'],
    href: 'mailto:info@fimbroker.it',
  },
  {
    icon: '⏰',
    title: 'Orari',
    lines: ['Lun - Ven: 9:00 - 18:00', 'Sab: 9:00 - 13:00'],
  },
]

export default function ContattiPage() {
  return (
    <div>
      {/* Hero */}
      <section className="gradient-primary py-16 text-white">
        <div className="container-custom">
          <div className="max-w-2xl">
            <span className="inline-block bg-white/10 border border-white/20 text-sm px-4 py-1.5 rounded-full mb-4">
              Contatti
            </span>
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Siamo qui per <span className="text-accent">aiutarti</span>
            </h1>
            <p className="text-xl text-white/80">
              Hai domande sulle nostre polizze? Vuoi parlare con un consulente?
              Contattaci nel modo più comodo per te.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-black text-primary mb-6">Inviaci un messaggio</h2>
              <Card padding="lg">
                <ContactForm />
              </Card>
            </div>

            {/* Contact info */}
            <div className="space-y-4">
              {contactInfo.map((info) => (
                <Card key={info.title} className="flex items-start gap-4">
                  <span className="text-3xl flex-shrink-0">{info.icon}</span>
                  <div>
                    <h3 className="font-bold text-primary mb-1">{info.title}</h3>
                    {info.lines.map((line, i) => (
                      <p key={i} className="text-gray-600 text-sm">{line}</p>
                    ))}
                  </div>
                </Card>
              ))}

              {/* Map placeholder */}
              <Card padding="none" className="overflow-hidden">
                <div className="bg-gray-100 h-48 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="text-4xl mb-2">🗺️</div>
                    <p className="text-sm font-medium">Via Roma 123, Milano</p>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary text-sm hover:underline mt-1 block"
                    >
                      Apri in Google Maps →
                    </a>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency */}
      <section className="gradient-accent py-10">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-black text-primary mb-2">Emergenza sinistro?</h3>
              <p className="text-primary/70">
                Siamo disponibili anche fuori orario per le emergenze. Chiama il numero dedicato.
              </p>
            </div>
            <a
              href="tel:+390212345678"
              className="px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-light transition-colors whitespace-nowrap"
            >
              📞 Assistenza Sinistri 24/7
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

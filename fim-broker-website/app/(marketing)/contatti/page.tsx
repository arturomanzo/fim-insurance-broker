import type { Metadata } from 'next'
import ContactForm from '@/components/forms/ContactForm'
import Card from '@/components/ui/Card'

export const metadata: Metadata = {
  title: 'Contatti',
  description: 'Contatta FIM Insurance Broker. Siamo disponibili per consulenze telefoniche, via email o di persona nel nostro ufficio di Cisterna di Latina.',
  alternates: { canonical: '/contatti' },
  openGraph: {
    images: [{ url: '/api/og?title=Contatti&tag=FIM+Insurance+Broker&sub=Siamo+a+Cisterna+di+Latina.+Chiamaci%2C+scrivici+o+vieni+a+trovarci.', width: 1200, height: 630 }],
  },
  twitter: {
    images: ['/api/og?title=Contatti&tag=FIM+Insurance+Broker&sub=Siamo+a+Cisterna+di+Latina.+Chiamaci%2C+scrivici+o+vieni+a+trovarci.'],
  },
}

const contactInfo = [
  {
    icon: '📍',
    title: 'Sede',
    lines: ['Via Roma 41', '04012 Cisterna di Latina (LT)'],
  },
  {
    icon: '📞',
    title: 'Telefono',
    lines: ['+39 06 96883381', 'Fax: 06 45220215', 'Lun-Ven 9:30-13:00 / 15:30-18:30'],
    href: 'tel:+390696883381',
  },
  {
    icon: '📧',
    title: 'Email',
    lines: ['info@fimbroker.it'],
    href: 'mailto:info@fimbroker.it',
  },
  {
    icon: '⏰',
    title: 'Orari',
    lines: ['Lun - Ven: 9:30-13:00 / 15:30-18:30', 'Sab - Dom: Chiuso'],
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

              {/* Google Maps embed */}
              <Card padding="none" className="overflow-hidden">
                <iframe
                  src="https://maps.google.com/maps?q=Via+Roma,+41,+04012+Cisterna+di+Latina+LT,+Italy&output=embed&z=16"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="FIM Insurance Broker - Via Roma 41, Cisterna di Latina"
                />
                <div className="px-4 py-2 bg-gray-50 text-center">
                  <a
                    href="https://www.google.com/maps/place/Via+Roma,+41,+04012+Cisterna+di+Latina+LT/@41.5939662,12.8234096,17z"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-sm hover:underline"
                  >
                    Apri in Google Maps →
                  </a>
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
              href="tel:+390696883381"
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

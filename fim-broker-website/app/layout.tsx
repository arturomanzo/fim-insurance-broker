import type { Metadata } from 'next'
import './globals.css'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.fimbroker.it'

export const metadata: Metadata = {
  title: {
    default: 'FIM Insurance Broker | Soluzioni Assicurative Personalizzate',
    template: '%s | FIM Insurance Broker',
  },
  description:
    'FIM Insurance Broker offre soluzioni assicurative personalizzate per privati e aziende. Polizze auto, vita, casa, salute e rischi aziendali. Preventivo gratuito.',
  keywords: [
    'assicurazioni',
    'broker assicurativo',
    'polizze assicurative',
    'FIM Insurance',
    'preventivo assicurazione',
    'assicurazione auto',
    'assicurazione vita',
    'assicurazione azienda',
  ],
  metadataBase: new URL(BASE_URL),
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    siteName: 'FIM Insurance Broker',
    url: BASE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    site: '@fimbroker',
  },
  manifest: '/manifest.json',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['InsuranceAgency', 'LocalBusiness'],
  name: 'FIM Insurance Broker',
  legalName: 'FIM Insurance Broker S.r.l.',
  url: BASE_URL,
  logo: `${BASE_URL}/icon.svg`,
  image: `${BASE_URL}/opengraph-image`,
  description:
    'Broker assicurativo indipendente con oltre 20 anni di esperienza. Soluzioni assicurative personalizzate per privati e aziende.',
  telephone: '+390212345678',
  email: 'info@fimbroker.it',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Via Roma 123',
    addressLocality: 'Milano',
    addressRegion: 'MI',
    postalCode: '20121',
    addressCountry: 'IT',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 45.464664,
    longitude: 9.18854,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '09:00',
      closes: '13:00',
    },
  ],
  sameAs: [],
  areaServed: {
    '@type': 'Country',
    name: 'Italy',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servizi Assicurativi',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Assicurazione Auto' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Assicurazione Vita' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Assicurazione Casa' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Assicurazione Salute' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Polizze Aziendali' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Assicurazione Viaggio' } },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <head>
        {/* Preconnect riduce la latenza DNS+TLS per Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Caricamento non-blocking del font Inter */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,500;0,600;0,700;0,900;1,400&display=swap"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}

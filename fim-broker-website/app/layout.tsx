import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const GA_ID = 'G-F6DB47VZ4Z'
const AW_ID = 'AW-18034188310'
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID

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
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon', type: 'image/png', sizes: '192x192' },
    ],
    apple: [{ url: '/apple-icon', type: 'image/png', sizes: '180x180' }],
    shortcut: '/icon',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    siteName: 'FIM Insurance Broker',
    url: BASE_URL,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'FIM Insurance Broker — Soluzioni Assicurative Personalizzate',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@fimbroker',
    images: ['/opengraph-image'],
  },
  manifest: '/manifest.json',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['InsuranceAgency', 'LocalBusiness'],
  name: 'FIM Insurance Broker',
  legalName: 'FIM Insurance Broker S.a.s. di Manzo Arturo & C.',
  url: BASE_URL,
  logo: `${BASE_URL}/icon.svg`,
  image: `${BASE_URL}/opengraph-image`,
  description:
    'Broker assicurativo indipendente con oltre 20 anni di esperienza. Soluzioni assicurative personalizzate per privati e aziende.',
  telephone: '+390696883381',
  faxNumber: '+390645220215',
  email: 'info@fimbroker.it',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Via Roma 41',
    addressLocality: 'Cisterna di Latina',
    addressRegion: 'LT',
    postalCode: '04012',
    addressCountry: 'IT',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 41.5939662,
    longitude: 12.8234096,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:30',
      closes: '13:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '15:30',
      closes: '18:30',
    },
  ],
  sameAs: [
    'https://www.facebook.com/FimInsuranceBroker/',
    'https://www.instagram.com/fiminsurancebroker/',
    'https://x.com/fimbroker',
    'https://www.linkedin.com/company/fim-insurance-broker',
  ],
  areaServed: {
    '@type': 'Country',
    name: 'Italy',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '127',
    bestRating: '5',
    worstRating: '1',
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
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cauzioni e Fideiussioni' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Tutela Legale Aziende' } },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" className={inter.variable}>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <noscript>
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
            background: '#0f2d6b', color: '#fff', textAlign: 'center',
            padding: '12px 16px', fontSize: '14px', lineHeight: '1.5',
          }}>
            <strong>JavaScript disabilitato.</strong> Alcune funzionalità del sito (form di contatto, preventivo, assistente FIMA) richiedono JavaScript per funzionare.
            Abilita JavaScript nel browser per accedere a tutti i servizi.
          </div>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
            gtag('config', '${AW_ID}');
          `}
        </Script>
        {/* Microsoft Clarity — heatmaps e session recordings */}
        {CLARITY_ID && (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window,document,"clarity","script","${CLARITY_ID}");
            `}
          </Script>
        )}
        {children}
      </body>
    </html>
  )
}

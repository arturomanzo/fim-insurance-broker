import type { Metadata } from 'next'
import { Montserrat, Source_Serif_4 } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import CookieBanner from '@/components/ui/CookieBanner'
import ClarityLoader from '@/components/analytics/ClarityLoader'
import MetaPixelLoader from '@/components/analytics/MetaPixelLoader'
import { CONSENT_STORAGE_KEY, CONSENT_VERSION } from '@/lib/consent'

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-serif',
})

// GA4 e Google Ads ora sono gestiti DENTRO Google Tag Manager (GTM-T4LC5GFD)
// per evitare double-counting e centralizzare i tag marketing.
// Configurare i tag corrispondenti nella UI di GTM con gli ID:
//   - GA4: G-F6DB47VZ4Z
//   - Google Ads: AW-18034188310
const GTM_ID = 'GTM-T4LC5GFD'

// Consent Mode v2 (GDPR + ePrivacy) — eseguito PRIMA di GTM con uno
// <script> inline sincrono. Setta il default su "denied" per gli storage
// pubblicitari/analitici e legge l'eventuale consenso pregresso da
// localStorage ('fim-cookie-consent') per applicarlo subito, prima che
// GTM carichi i tag. Il CookieBanner aggiorna poi il consenso runtime.
const CONSENT_INIT_SCRIPT = `(function(){
  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);}
  window.gtag = gtag;

  gtag('consent', 'default', {
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'denied',
    'functionality_storage': 'granted',
    'security_storage': 'granted',
    'wait_for_update': 500
  });

  gtag('set', 'ads_data_redaction', true);
  gtag('set', 'url_passthrough', true);

  // Applica subito l'eventuale consenso pregresso salvato in localStorage.
  // Le due finalità sono indipendenti: gli storage pubblicitari seguono
  // 'marketing', mai la scelta complessiva. Un consenso di versione diversa
  // viene ignorato (resta tutto 'denied') e il banner tornerà a chiedere.
  try {
    var raw = localStorage.getItem('${CONSENT_STORAGE_KEY}');
    if (raw) {
      var c = JSON.parse(raw);
      if (c && c.version === ${CONSENT_VERSION}) {
        var marketingGranted = c.marketing === true;
        var analyticsGranted = c.analytics === true;
        gtag('consent', 'update', {
          'ad_storage': marketingGranted ? 'granted' : 'denied',
          'ad_user_data': marketingGranted ? 'granted' : 'denied',
          'ad_personalization': marketingGranted ? 'granted' : 'denied',
          'analytics_storage': analyticsGranted ? 'granted' : 'denied'
        });
      }
    }
  } catch(e) {}
})();`

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.fimbroker.it'

// Aggregate rating per lo schema LocalBusiness — abilita le stelle nei
// risultati di Google. Lasciato opzionale: viene incluso nello schema SOLO
// se entrambe le env sono valorizzate, così non rischiamo di pubblicare
// dati inventati (violazione delle linee guida Google).
// Aggiorna in `.env.production` con i valori reali del tuo Google Business
// Profile, es. NEXT_PUBLIC_REVIEW_RATING=4.9 e NEXT_PUBLIC_REVIEW_COUNT=187
const REVIEW_RATING = process.env.NEXT_PUBLIC_REVIEW_RATING
const REVIEW_COUNT = process.env.NEXT_PUBLIC_REVIEW_COUNT
const aggregateRating =
  REVIEW_RATING && REVIEW_COUNT
    ? {
        '@type': 'AggregateRating',
        ratingValue: REVIEW_RATING,
        reviewCount: REVIEW_COUNT,
        bestRating: '5',
        worstRating: '1',
      }
    : undefined

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: {
    // 56 caratteri — entro la soglia SERP
    default: 'FIM Insurance Broker | Polizze su misura, Roma e Lazio',
    template: '%s | FIM Insurance Broker',
  },
  // 154 caratteri — entro la soglia SERP di ~160
  description:
    'Broker assicurativo indipendente: polizze auto, vita, casa, salute e aziendali su misura. 30+ compagnie confrontate per te. Preventivo gratuito.',
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
  '@id': `${BASE_URL}/#organization`,
  name: 'FIM Insurance Broker',
  legalName: 'FIM Insurance Broker S.a.s. di Manzo Arturo & C.',
  alternateName: 'FIM Broker',
  slogan: 'Chiarezza in Azione — Architetti della Tua Sicurezza',
  url: BASE_URL,
  logo: `${BASE_URL}/icon.svg`,
  image: `${BASE_URL}/opengraph-image`,
  description:
    'Broker assicurativo indipendente con oltre 20 anni di esperienza. Soluzioni assicurative personalizzate per privati e aziende.',
  foundingDate: '2004',
  priceRange: '€€',
  // Identificativi pubblici (compliance IVASS / Camera di Commercio)
  identifier: [
    { '@type': 'PropertyValue', propertyID: 'IVASS-RUI', value: 'B000405449' },
    { '@type': 'PropertyValue', propertyID: 'VAT-IT', value: 'IT02637640596' },
    { '@type': 'PropertyValue', propertyID: 'REA', value: 'LT-187466' },
  ],
  // Aree di competenza dichiarate — segnale forte per Generative Engines
  // (ChatGPT/Claude/Perplexity) e Google AI Overviews quando devono
  // decidere se citare FIM su una query tematica.
  knowsAbout: [
    'Assicurazione RC Auto',
    'Polizza Kasko',
    'Assicurazione Vita',
    'Long Term Care (LTC)',
    'Temporanea Caso Morte (TCM)',
    'Assicurazione Casa',
    'Polizza Infortuni',
    'Assicurazione Salute integrativa',
    'RC Professionale',
    'Polizza D&O (Directors & Officers)',
    'Polizza Cyber Risk per PMI',
    'Polizza Catastrofale per imprese',
    'Cauzioni e Fideiussioni',
    'Tutela Legale Aziende',
    'Polizza Condominio',
    'Risk Management',
    'Welfare Aziendale',
    'Compliance IVASS',
    'Distribuzione assicurativa (IDD - D.Lgs 68/2018)',
  ],
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
    'https://www.linkedin.com/company/fim-insurance-broker-s-a-s-di-manzo-arturo-c/',
  ],
  // Aree servite: Paese + città chiave per local SEO
  areaServed: [
    { '@type': 'Country', name: 'Italy' },
    { '@type': 'AdministrativeArea', name: 'Lazio' },
    { '@type': 'City', name: 'Roma' },
    { '@type': 'City', name: 'Latina' },
    { '@type': 'City', name: 'Cisterna di Latina' },
    { '@type': 'City', name: 'Aprilia' },
  ],
  // Founder con credenziali — Person schema fondamentale per E-E-A-T su YMYL
  founder: {
    '@type': 'Person',
    name: 'Arturo Manzo',
    jobTitle: 'CEO & Insurance Broker',
    description:
      'Fondatore di FIM Insurance Broker, oltre 20 anni di esperienza nel brokeraggio assicurativo italiano. Specializzato in polizze aziendali complesse e risk management per PMI.',
    url: `${BASE_URL}/chi-siamo`,
    worksFor: { '@id': `${BASE_URL}/#organization` },
  },
  // AggregateRating: incluso solo se le env sono valorizzate (vedi sopra)
  ...(aggregateRating ? { aggregateRating } : {}),
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
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Risk Management' } },
    ],
  },
}

// WebSite schema — referenziato via `@id` da WebPage/Article in altre
// pagine (es. landing geo). Espone potenziale SearchAction se in futuro
// vorremo abilitare il sitelinks searchbox di Google.
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  url: BASE_URL,
  name: 'FIM Insurance Broker',
  inLanguage: 'it-IT',
  publisher: { '@id': `${BASE_URL}/#organization` },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" className={`${montserrat.variable} ${sourceSerif.variable}`}>
      <head>
        {/* Consent Mode v2 — DEVE essere eseguito PRIMA di GTM/GA per
            applicare il default "denied" agli storage pubblicitari/analitici.
            Inline <script> sincrono: viene eseguito al parse del documento,
            prima di qualsiasi tag iniettato da GTM. */}
        <script dangerouslySetInnerHTML={{ __html: CONSENT_INIT_SCRIPT }} />

        {/* Google Tag Manager — caricamento DIFFERITO per ridurre il TBT.
            gtm.js (~280 KB con GA4/Ads/Pixel) non viene iniettato all'avvio:
            parte al primo gesto dell'utente (scroll/click/tap/keydown/mousemove)
            oppure dopo 3,5s, qualunque evento avvenga prima — una sola volta.
            Le conversioni di chi interagisce restano tracciate; si toglie solo
            il costo dal critical path iniziale.
            Consent Mode v2 (CONSENT_INIT_SCRIPT sopra) resta sincrono e gira
            comunque PRIMA di GTM. Tag aggiuntivi (GA4 G-F6DB47VZ4Z, Google Ads
            AW-18034188310, Meta Pixel, ecc.) sono configurati DENTRO GTM. */}
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];function gtmLoad(){w[l].push(
{'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);}
var loaded=false;function trigger(){if(loaded)return;loaded=true;
['scroll','mousemove','touchstart','keydown','click'].forEach(function(e){
w.removeEventListener(e,trigger);});gtmLoad();}
['scroll','mousemove','touchstart','keydown','click'].forEach(function(e){
w.addEventListener(e,trigger,{once:true,passive:true});});
w.setTimeout(trigger,3500);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      </head>
      <body className={`${montserrat.className} min-h-screen flex flex-col`}>
        {/* Google Tag Manager (noscript) — deve stare immediatamente dopo <body> */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:text-primary focus:rounded-lg focus:shadow-lg focus:font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Vai al contenuto principale
        </a>
        <noscript>
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
            background: '#0B1F3A', color: '#fff', textAlign: 'center',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {/* GA4 (G-F6DB47VZ4Z) e Google Ads (AW-18034188310) sono ora gestiti
            DENTRO Google Tag Manager (GTM-T4LC5GFD) per evitare double-counting.
            Configura i tag corrispondenti nella UI di GTM. */}
        {/* Microsoft Clarity — caricato SOLO previo consenso analitico
            (vedi components/analytics/ClarityLoader.tsx). */}
        {children}
        {/* CookieBanner e ClarityLoader montati a livello root, così il
            banner è raggiungibile da OGNI pagina (anche legali/admin) e il
            consenso è revocabile ovunque tramite il link "Preferenze cookie"
            nel footer. */}
        <ClarityLoader />
        <MetaPixelLoader />
        <CookieBanner />
      </body>
    </html>
  )
}

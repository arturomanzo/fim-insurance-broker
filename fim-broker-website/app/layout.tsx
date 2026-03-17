import type { Metadata } from 'next'
import './globals.css'

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
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    siteName: 'FIM Insurance Broker',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  )
}

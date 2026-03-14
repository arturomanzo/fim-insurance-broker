import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FIMAWidget from '@/components/chatbot/FIMAWidget';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'FIM Insurance Broker – Intermediario Assicurativo',
    template: '%s | FIM Insurance Broker',
  },
  description:
    'FIM Insurance Broker è un intermediario assicurativo professionale iscritto al RUI Sez. B n. B000405449 con oltre 30 anni di esperienza. Sedi a Cisterna di Latina e Firenze.',
  keywords: [
    'assicurazioni',
    'broker assicurativo',
    'RCA',
    'polizze vita',
    'assicurazione casa',
    'rischi aziendali',
    'Cisterna di Latina',
    'Firenze',
  ],
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    siteName: 'FIM Insurance Broker',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <FIMAWidget />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 5000,
            style: {
              background: '#1a365d',
              color: '#ffffff',
              borderRadius: '8px',
            },
            success: {
              iconTheme: {
                primary: '#e8a838',
                secondary: '#1a365d',
              },
            },
          }}
        />
      </body>
    </html>
  );
}

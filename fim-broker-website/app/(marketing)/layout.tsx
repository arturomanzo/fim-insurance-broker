import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FIMAWidget from '@/components/chatbot/FIMAWidget'
import CookieBanner from '@/components/ui/CookieBanner'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FIMAWidget />
      <CookieBanner />
      <WhatsAppButton />
    </>
  )
}

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FIMAWidget from '@/components/chatbot/FIMAWidget'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1">{children}</main>
      <Footer />
      <FIMAWidget />
      <WhatsAppButton />
    </>
  )
}

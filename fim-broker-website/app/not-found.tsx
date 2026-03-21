import Link from 'next/link'
import FimLogo from '@/components/ui/FimLogo'

export default function NotFound() {
  return (
    <div className="min-h-screen gradient-primary flex flex-col items-center justify-center text-white px-4">
      <FimLogo variant="icon" theme="white" height={80} className="mb-8 opacity-80" />

      <div className="text-center max-w-lg">
        <p className="text-accent font-black text-8xl mb-4 leading-none">404</p>
        <h1 className="text-3xl font-black mb-4">Pagina non trovata</h1>
        <p className="text-white/70 text-lg mb-10">
          La pagina che stai cercando non esiste o è stata spostata.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/" className="btn-primary text-base px-8 py-3">
            Torna alla Home
          </Link>
          <Link href="/contatti" className="btn-outline-white text-base px-8 py-3">
            Contattaci
          </Link>
        </div>

        <div className="mt-12 flex flex-wrap gap-4 justify-center text-white/50 text-sm">
          <Link href="/servizi" className="hover:text-white transition-colors">Servizi</Link>
          <Link href="/preventivo" className="hover:text-white transition-colors">Preventivo</Link>
          <Link href="/chi-siamo" className="hover:text-white transition-colors">Chi Siamo</Link>
          <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
        </div>
      </div>
    </div>
  )
}

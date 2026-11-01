import Link from 'next/link'
import { ivassLatina } from '@/lib/osservatorio-data'

// Box per le landing locali della provincia di Latina: il dato IVASS sulla RC auto
// dell'Osservatorio, con la fonte nella stessa frase. Le cifre vengono da
// lib/osservatorio-data.ts, così sito, Osservatorio e landing dicono la stessa cosa.
const fmt = (n: number) => n.toLocaleString('it-IT', { minimumFractionDigits: 1, maximumFractionDigits: 1 })

export default function RcaProvinciaLatina({ citta }: { citta: string }) {
  const l = ivassLatina
  const differenza = Math.round(l.media - l.mediaItalia)
  // Il dato è provinciale: per Cisterna o Aprilia si dice di quale provincia fanno parte, non che vale per il comune.
  const inProvincia = citta === 'Latina' ? 'in provincia di Latina' : `in provincia di Latina, di cui fa parte ${citta},`
  return (
    <section className="py-10 bg-white">
      <div className="container-custom max-w-3xl">
        <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 md:p-8">
          <p className="text-xs font-bold text-accent uppercase tracking-widest mb-1">Quanto costa la RC auto qui</p>
          <h2 className="text-xl md:text-2xl font-black text-primary mb-3">
            {fmt(l.media)} € di media, {differenza} euro sopra l&apos;Italia
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Secondo le tavole IVASS sul {l.periodo}, {inProvincia} la RC auto delle autovetture costa in media{' '}
            {fmt(l.media)} euro, contro {fmt(l.mediaItalia)} euro in Italia: la provincia è {l.posizione}ª su {l.province}{' '}
            per premio medio. È una media: il tuo premio dipende da classe di merito, età, veicolo e garanzie.
          </p>
          <Link href="/osservatorio-prezzi" className="text-accent font-semibold text-sm underline">
            Vedi i dati del Lazio e per età nell&apos;Osservatorio →
          </Link>
        </div>
      </div>
    </section>
  )
}

const stats = [
  { value: '20+', label: 'Anni di esperienza', description: 'Sul mercato assicurativo italiano' },
  { value: '★★★★★', label: 'Clienti soddisfatti', description: 'Privati e aziende' },
  { value: 'Multi', label: 'Compagnie partner', description: 'Confrontiamo per voi' },
  { value: '98%', label: 'Clienti fedeli', description: 'Ci rinnovano ogni anno' },
]

export default function Stats() {
  return (
    <section className="py-12 gradient-logo">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-black text-white mb-1">{stat.value}</div>
              <div className="font-semibold text-white/90 text-sm md:text-base">{stat.label}</div>
              <div className="text-white/60 text-xs md:text-sm mt-1">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

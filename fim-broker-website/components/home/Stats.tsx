const stats = [
  { value: '30+', label: 'Anni di mestiere', description: 'Di famiglia, dal 1993' },
  { value: '4.9/5', label: 'Rating Google Reviews', description: '★★★★★ clienti soddisfatti' },
  { value: '20', label: 'Compagnie partner', description: 'Confrontiamo le migliori per te' },
]

export default function Stats() {
  return (
    <section className="py-12 gradient-logo">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
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

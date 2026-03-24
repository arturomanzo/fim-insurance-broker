const companies = [
  'Generali',
  'AXA',
  'UnipolSai',
  'Allianz',
  'Zurich',
  'HDI',
  'Groupama',
  'Reale Mutua',
  'Cattolica',
  'Aviva',
  'Ergo',
  'SACE',
]

export default function TrustedBrands() {
  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="container-custom">
        <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-8">
          Le compagnie che confrontiamo per te
        </p>
        <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4">
          {companies.map((name) => (
            <div
              key={name}
              className="px-5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:border-primary/30 hover:text-primary hover:bg-primary/5 transition-colors duration-200"
            >
              {name}
            </div>
          ))}
          <div className="px-5 py-2.5 bg-accent/10 border border-accent/30 rounded-lg text-sm font-semibold text-accent">
            + molte altre
          </div>
        </div>
      </div>
    </section>
  )
}

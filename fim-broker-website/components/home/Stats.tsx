const stats = [
  { value: '30+', label: 'Anni di esperienza', description: 'Nel settore assicurativo' },
  { value: '8', label: 'Rami assicurativi', description: 'Copertura completa' },
  { value: '4+', label: 'Compagnie partner', description: 'Leader di mercato' },
  { value: '2', label: 'Sedi operative', description: 'Latina e Firenze' },
];

export default function Stats() {
  return (
    <section className="bg-fim-primary py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-fim-accent mb-1">
                {stat.value}
              </div>
              <div className="text-white font-semibold text-sm sm:text-base">
                {stat.label}
              </div>
              <div className="text-blue-300 text-xs sm:text-sm mt-0.5">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

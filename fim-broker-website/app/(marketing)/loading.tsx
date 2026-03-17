export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      {/* Hero skeleton */}
      <div className="gradient-primary py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-4">
            <div className="h-5 w-48 bg-white/20 rounded-full" />
            <div className="h-14 w-3/4 bg-white/20 rounded-xl" />
            <div className="h-14 w-1/2 bg-white/20 rounded-xl" />
            <div className="h-6 w-2/3 bg-white/10 rounded-lg mt-4" />
            <div className="h-6 w-3/5 bg-white/10 rounded-lg" />
            <div className="flex gap-4 mt-8">
              <div className="h-14 w-44 bg-white/20 rounded-lg" />
              <div className="h-14 w-44 bg-white/10 rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12 space-y-3">
          <div className="h-5 w-32 bg-gray-200 rounded-full mx-auto" />
          <div className="h-10 w-72 bg-gray-200 rounded-xl mx-auto" />
          <div className="h-5 w-96 bg-gray-100 rounded-lg mx-auto" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-3">
              <div className="h-10 w-10 bg-gray-200 rounded-xl" />
              <div className="h-6 w-3/4 bg-gray-200 rounded-lg" />
              <div className="h-4 w-full bg-gray-100 rounded" />
              <div className="h-4 w-5/6 bg-gray-100 rounded" />
              <div className="h-4 w-4/6 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

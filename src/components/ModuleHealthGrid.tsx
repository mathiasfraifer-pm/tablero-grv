interface ModuleHealth {
  name: string
  errors: number
}

interface Props {
  modules: ModuleHealth[]
  title: string
  emptyMessage: string
  thresholdColor?: 'red' | 'green' | 'blue'
  threshold?: number
}

export default function ModuleHealthGrid({ modules, title, emptyMessage, thresholdColor = 'red', threshold = 10 }: Props) {
  const sorted = [...modules].sort((a, b) => b.errors - a.errors)

  return (
    <section className="mb-8">
      <h2 className="mb-4 text-lg font-semibold text-gray-700">{title}</h2>

      {sorted.length === 0 ? (
        <p className="text-sm text-gray-400">{emptyMessage}</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {sorted.map((mod) => {
            const highlight = mod.errors >= threshold
            const highlightClasses =
              thresholdColor === 'green' ? 'border-green-300 bg-green-50' :
              thresholdColor === 'blue'  ? 'border-blue-300 bg-blue-50' :
                                           'border-red-300 bg-red-50'
            const highlightText =
              thresholdColor === 'green' ? 'text-green-700' :
              thresholdColor === 'blue'  ? 'text-blue-700' :
                                           'text-red-700'
            return (
              <div
                key={mod.name}
                className={`rounded-xl border p-4 transition-colors ${
                  highlight ? highlightClasses : 'border-gray-200 bg-white'
                }`}
              >
                <p className={`text-3xl font-bold ${highlight ? highlightText : 'text-gray-800'}`}>
                  {mod.errors}
                </p>
                <p className={`mt-1 text-xs leading-tight ${highlight ? highlightText : 'text-gray-500'}`}>
                  {mod.name}
                </p>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}

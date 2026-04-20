interface ModuleHealth {
  name: string
  errors: number
}

interface Props {
  modules: ModuleHealth[]
  thresholdColor?: 'red' | 'green'
}

export default function ModuleHealthGrid({ modules, thresholdColor = 'red' }: Props) {
  const sorted = [...modules].sort((a, b) => b.errors - a.errors)

  return (
    <section className="mb-8">
      <h2 className="mb-4 text-lg font-semibold text-gray-100">
        Salud de módulos
        <span className="ml-2 text-sm font-normal text-gray-500">tickets tipo Error por módulo</span>
      </h2>

      {sorted.length === 0 ? (
        <p className="text-sm text-gray-600">No hay tickets de tipo Error con componente asignado.</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {sorted.map((mod) => {
            const highlight = mod.errors >= 10
            const highlightClasses = thresholdColor === 'green'
              ? 'border-green-800 bg-green-950'
              : 'border-red-800 bg-red-950'
            const highlightText = thresholdColor === 'green' ? 'text-green-400' : 'text-red-400'
            return (
              <div
                key={mod.name}
                className={`rounded-xl border p-4 transition-colors ${
                  highlight ? highlightClasses : 'border-gray-800 bg-gray-900'
                }`}
              >
                <p className={`text-3xl font-bold ${highlight ? highlightText : 'text-gray-100'}`}>
                  {mod.errors}
                </p>
                <p className={`mt-1 text-xs leading-tight ${highlight ? `${highlightText} opacity-80` : 'text-gray-400'}`}>
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

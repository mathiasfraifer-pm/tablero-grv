import { JiraIssue } from '@/lib/jira'

interface Props {
  title: string
  emptyMessage: string
  issues: JiraIssue[]
  jiraBaseUrl: string
}

export default function DeployedTicketsTable({ title, emptyMessage, issues, jiraBaseUrl }: Props) {
  const sorted = [...issues].sort((a, b) => {
    const compA = a.fields.components[0]?.name ?? ''
    const compB = b.fields.components[0]?.name ?? ''
    return compA.localeCompare(compB)
  })

  return (
    <section className="flex flex-col">
      <h2 className="mb-4 text-base font-semibold text-gray-100">
        {title}
        <span className="ml-2 text-sm font-normal text-gray-500">({sorted.length})</span>
      </h2>

      {sorted.length === 0 ? (
        <p className="text-sm text-gray-600">{emptyMessage}</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800 bg-gray-900 text-left text-xs uppercase tracking-wide text-gray-500">
                <th className="px-4 py-3 font-medium">Key</th>
                <th className="px-4 py-3 font-medium">Resumen</th>
                <th className="px-4 py-3 font-medium">Módulo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 bg-gray-950">
              {sorted.map((issue) => {
                const component = issue.fields.components[0]?.name ?? '—'
                return (
                  <tr key={issue.id} className="transition-colors hover:bg-gray-900">
                    <td className="whitespace-nowrap px-4 py-3">
                      <a
                        href={`${jiraBaseUrl}/browse/${issue.key}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-indigo-400 hover:text-indigo-300 hover:underline"
                      >
                        {issue.key}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-gray-300">{issue.fields.summary}</td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {component !== '—' ? (
                        <span className="rounded-full bg-gray-800 px-2.5 py-0.5 text-xs font-medium text-gray-300">
                          {component}
                        </span>
                      ) : (
                        <span className="text-gray-600">—</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

import { JiraIssue } from '@/lib/jira-utils'

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
      <h2 className="mb-4 text-base font-semibold text-gray-700">
        {title}
        <span className="ml-2 text-sm font-normal text-gray-400">({sorted.length})</span>
      </h2>

      {sorted.length === 0 ? (
        <p className="text-sm text-gray-400">{emptyMessage}</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
                <th className="px-4 py-3 font-medium">Key</th>
                <th className="px-4 py-3 font-medium">Resumen</th>
                <th className="px-4 py-3 font-medium">Módulo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {sorted.map((issue) => {
                const component = issue.fields.components[0]?.name ?? '—'
                return (
                  <tr key={issue.id} className="transition-colors hover:bg-gray-50">
                    <td className="whitespace-nowrap px-4 py-3">
                      <a
                        href={`${jiraBaseUrl}/browse/${issue.key}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-indigo-600 hover:text-indigo-500 hover:underline"
                      >
                        {issue.key}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{issue.fields.summary}</td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {component !== '—' ? (
                        <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
                          {component}
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
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

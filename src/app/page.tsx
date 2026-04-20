import { fetchAllIssues } from '@/lib/jira'
import DashboardTabs from '@/components/DashboardTabs'

export const revalidate = 300

async function getData() {
  try {
    const issues = await fetchAllIssues()
    return { issues, error: null }
  } catch (e) {
    return { issues: [], error: e instanceof Error ? e.message : 'Error al cargar datos' }
  }
}

export default async function HomePage() {
  const { issues, error } = await getData()

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center p-8">
        <div className="rounded-xl border border-red-900 bg-red-950 p-6 text-red-400 shadow">
          <p className="font-semibold text-red-300">Error al conectar con Jira</p>
          <p className="mt-1 text-sm">{error}</p>
          <p className="mt-3 text-xs text-red-600">
            Verifica las variables de entorno: JIRA_BASE_URL, JIRA_EMAIL, JIRA_API_TOKEN, JIRA_PROJECT_KEY
          </p>
        </div>
      </main>
    )
  }

  const bugIssues = issues.filter((i) => i.fields.issuetype.name === 'Error')
  const tareaIssues = issues.filter((i) => i.fields.issuetype.name === 'Tarea')
  const jiraBaseUrl = process.env.JIRA_BASE_URL!.replace(/\/$/, '')
  const now = new Date().toLocaleString('es-AR', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'America/Argentina/Buenos_Aires',
  })

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Jira Dashboard</h1>
          <p className="text-sm text-gray-500">
            Proyecto: <span className="font-medium text-gray-300">{process.env.JIRA_PROJECT_KEY}</span>
          </p>
        </div>
        <p className="text-xs text-gray-600">Actualizado: {now}</p>
      </div>

      <DashboardTabs bugIssues={bugIssues} tareaIssues={tareaIssues} jiraBaseUrl={jiraBaseUrl} />
    </main>
  )
}

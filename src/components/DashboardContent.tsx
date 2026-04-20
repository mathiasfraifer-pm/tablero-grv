'use client'

import { JiraIssue, processIssues } from '@/lib/jira-utils'
import StatsCard from './StatsCard'
import StatusChart from './StatusChart'
import PriorityChart from './PriorityChart'
import VelocityChart from './VelocityChart'
import DeployedTicketsTable from './DeployedTicketsTable'
import InProgressTicketsTable from './InProgressTicketsTable'
import ModuleHealthGrid from './ModuleHealthGrid'

interface Props {
  issues: JiraIssue[]
  jiraBaseUrl: string
  tab: 'incidentes' | 'evoluciones'
}

export default function DashboardContent({ issues, jiraBaseUrl, tab }: Props) {
  const data = processIssues(issues)

  const pendingCount = data.byStatus['Tareas por hacer'] ?? 0
  const inCourseTickets = issues.filter((i) => i.fields.status.name === 'En curso')
  const inCourseCount = inCourseTickets.length

  const deployedTickets = issues.filter(
    (i) =>
      i.fields.status.name === 'Listo para prod' &&
      i.fields.assignee?.displayName?.toLowerCase() === 'mathias fraifer',
  )
  const readyToDeployTickets = issues.filter(
    (i) =>
      i.fields.status.name === 'Listo para prod' &&
      i.fields.assignee?.displayName?.toLowerCase() !== 'mathias fraifer',
  )
  const readyToDeployCount = readyToDeployTickets.length
  const doneCount = data.byStatus['Finalizada'] ?? 0

  const priorityByPendingIssues = issues
    .filter((i) => i.fields.status.name === 'Tareas por hacer')
    .reduce<Record<string, number>>((acc, i) => {
      const p = i.fields.priority?.name ?? 'Sin prioridad'
      acc[p] = (acc[p] ?? 0) + 1
      return acc
    }, {})

  const moduleHealth = Object.entries(
    issues
      .filter((i) => i.fields.status.name === 'Tareas por hacer')
      .reduce<Record<string, number>>((acc, i) => {
        const comp = i.fields.components[0]?.name
        if (!comp) return acc
        acc[comp] = (acc[comp] ?? 0) + 1
        return acc
      }, {}),
  ).map(([name, errors]) => ({ name, errors }))

  return (
    <>
      {/* KPI Cards */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatsCard title="Tickets pendientes" value={pendingCount} color="yellow" />
        <StatsCard title="En curso" value={inCourseCount} color="blue" />
        <StatsCard title="Próximos a desplegar" value={readyToDeployCount} color="red" />
        <StatsCard title="Finalizados" value={doneCount} color="green" />
      </div>

      {/* In progress tickets */}
      <InProgressTicketsTable issues={inCourseTickets} jiraBaseUrl={jiraBaseUrl} />

      {/* Two ticket tables side by side */}
      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <DeployedTicketsTable
          title="Tickets próximos a desplegar en producción"
          emptyMessage='No hay tickets en "Listo para prod" pendientes.'
          issues={readyToDeployTickets}
          jiraBaseUrl={jiraBaseUrl}
        />
        <DeployedTicketsTable
          title="Tickets resueltos en el último deploy"
          emptyMessage='No hay tickets en "Listo para prod".'
          issues={deployedTickets}
          jiraBaseUrl={jiraBaseUrl}
        />
      </div>

      {/* Module health */}
      <ModuleHealthGrid modules={moduleHealth} thresholdColor={tab === 'evoluciones' ? 'green' : 'red'} />

      {/* Charts */}
      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <StatusChart data={data.byStatus} />
        <PriorityChart data={priorityByPendingIssues} />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <VelocityChart data={data.velocity} />
      </div>
    </>
  )
}

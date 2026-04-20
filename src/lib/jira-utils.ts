export interface JiraIssue {
  id: string
  key: string
  fields: {
    summary: string
    status: { name: string; statusCategory: { name: string } }
    priority: { name: string } | null
    assignee: { displayName: string; emailAddress: string } | null
    created: string
    resolutiondate: string | null
    updated: string
    issuetype: { name: string }
    components: { name: string }[]
  }
}

export interface DashboardData {
  total: number
  byStatus: Record<string, number>
  byPriority: Record<string, number>
  byAssignee: Record<string, number>
  velocity: { week: string; completed: number }[]
  issues: JiraIssue[]
}

export function processIssues(issues: JiraIssue[]): DashboardData {
  const byStatus: Record<string, number> = {}
  const byPriority: Record<string, number> = {}
  const byAssignee: Record<string, number> = {}
  const velocityMap: Record<string, number> = {}

  for (const issue of issues) {
    const { status, priority, assignee, resolutiondate } = issue.fields

    byStatus[status.name] = (byStatus[status.name] ?? 0) + 1

    const priorityName = priority?.name ?? 'Sin prioridad'
    byPriority[priorityName] = (byPriority[priorityName] ?? 0) + 1

    const assigneeName = assignee?.displayName ?? 'Sin asignar'
    byAssignee[assigneeName] = (byAssignee[assigneeName] ?? 0) + 1

    if (status.name === 'Finalizada' && resolutiondate) {
      const week = getWeekLabel(new Date(resolutiondate))
      velocityMap[week] = (velocityMap[week] ?? 0) + 1
    }
  }

  const velocity = Object.entries(velocityMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-12)
    .map(([week, completed]) => ({ week, completed }))

  return { total: issues.length, byStatus, byPriority, byAssignee, velocity, issues }
}

function getWeekLabel(date: Date): string {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() - d.getDay() + 1)
  return d.toISOString().split('T')[0]
}

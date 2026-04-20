export type { JiraIssue, DashboardData } from './jira-utils'
export { processIssues } from './jira-utils'

const JIRA_BASE_URL = process.env.JIRA_BASE_URL!.replace(/\/$/, '')
const JIRA_EMAIL = process.env.JIRA_EMAIL!
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN!
const JIRA_PROJECT_KEY = process.env.JIRA_PROJECT_KEY!

import type { JiraIssue } from './jira-utils'

function getAuthHeader() {
  const credentials = Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString('base64')
  return `Basic ${credentials}`
}

export async function fetchAllIssues(): Promise<JiraIssue[]> {
  const allIssues: JiraIssue[] = []
  const maxResults = 100
  let nextPageToken: string | undefined

  while (true) {
    const url = `${JIRA_BASE_URL}/rest/api/3/search/jql`

    const body: Record<string, unknown> = {
      jql: `project = ${JIRA_PROJECT_KEY} AND issuetype in ("Bug", "Task") ORDER BY created DESC`,
      maxResults,
      fields: ['summary', 'status', 'priority', 'assignee', 'created', 'resolutiondate', 'updated', 'issuetype', 'components'],
    }
    if (nextPageToken) body.nextPageToken = nextPageToken

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: getAuthHeader(),
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      next: { revalidate: 300 },
    })

    if (!response.ok) {
      const text = await response.text()
      throw new Error(`Jira API error: ${response.status} ${response.statusText} — ${text}`)
    }

    const data = await response.json()
    allIssues.push(...data.issues)

    if (!data.nextPageToken || data.issues.length < maxResults) break
    nextPageToken = data.nextPageToken
  }

  return allIssues
}

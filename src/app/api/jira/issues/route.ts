import { NextResponse } from 'next/server'
import { fetchAllIssues, processIssues } from '@/lib/jira'

export async function GET() {
  try {
    const issues = await fetchAllIssues()
    const data = processIssues(issues)
    return NextResponse.json(data)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desconocido'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

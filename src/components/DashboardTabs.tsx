'use client'

import { useState } from 'react'
import { JiraIssue } from '@/lib/jira-utils'
import DashboardContent from './DashboardContent'

interface Props {
  bugIssues: JiraIssue[]
  tareaIssues: JiraIssue[]
  jiraBaseUrl: string
}

type Tab = 'incidentes' | 'evoluciones'

export default function DashboardTabs({ bugIssues, tareaIssues, jiraBaseUrl }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('incidentes')

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: 'incidentes', label: 'Incidentes', count: bugIssues.length },
    { id: 'evoluciones', label: 'Evoluciones', count: tareaIssues.length },
  ]

  return (
    <div>
      {/* Tab bar */}
      <div className="mb-8 flex border-b border-gray-800">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'border-b-2 border-indigo-500 text-indigo-400'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {tab.label}
            <span className="ml-2 text-xs opacity-60">({tab.count})</span>
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'incidentes' ? (
        <DashboardContent issues={bugIssues} jiraBaseUrl={jiraBaseUrl} tab="incidentes" />
      ) : (
        <DashboardContent issues={tareaIssues} jiraBaseUrl={jiraBaseUrl} tab="evoluciones" />
      )}
    </div>
  )
}

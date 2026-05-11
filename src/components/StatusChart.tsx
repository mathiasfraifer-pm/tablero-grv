'use client'

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const ALLOWED_STATUSES: Record<string, string> = {
  'Tareas por hacer': '#94a3b8',
  'En curso':         '#eab308',
  'TEST':             '#8b5cf6',
  'Finalizada':       '#22c55e',
}

const tooltipStyle = {
  backgroundColor: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  color: '#111827',
}

interface Props {
  data: Record<string, number>
}

export default function StatusChart({ data }: Props) {
  const chartData = Object.entries(data)
    .filter(([name]) => name in ALLOWED_STATUSES)
    .map(([name, value]) => ({ name, value }))

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-base font-semibold text-gray-700">Tickets por Estado</h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
          >
            {chartData.map((entry) => (
              <Cell key={entry.name} fill={ALLOWED_STATUSES[entry.name]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => [value, 'Tickets']} contentStyle={tooltipStyle} />
          <Legend wrapperStyle={{ color: '#6b7280', fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

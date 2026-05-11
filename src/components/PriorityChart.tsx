'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer, CartesianGrid } from 'recharts'

const PRIORITY_COLORS: Record<string, string> = {
  'Bloqueante': '#dc2626',
  'Alta':       '#f97316',
  'Media':      '#eab308',
  'Baja':       '#22c55e',
  'Muy baja':   '#86efac',
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

const PRIORITY_ORDER = ['Bloqueante', 'Alta', 'Media', 'Baja', 'Muy baja']

export default function PriorityChart({ data }: Props) {
  const chartData = Object.entries(data)
    .sort(([a], [b]) => {
      const ai = PRIORITY_ORDER.indexOf(a)
      const bi = PRIORITY_ORDER.indexOf(b)
      return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi)
    })
    .map(([name, value]) => ({ name, value }))

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-base font-semibold text-gray-700">Tickets por Prioridad</h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={chartData} margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={{ stroke: '#e5e7eb' }} tickLine={false} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
          <Tooltip formatter={(v: number) => [v, 'Tickets']} contentStyle={tooltipStyle} cursor={{ fill: '#00000008' }} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {chartData.map((entry) => (
              <Cell key={entry.name} fill={PRIORITY_COLORS[entry.name] ?? '#6366f1'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

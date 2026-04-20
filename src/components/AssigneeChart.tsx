'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const tooltipStyle = {
  backgroundColor: '#1f2937',
  border: '1px solid #374151',
  borderRadius: '8px',
  color: '#f3f4f6',
}

interface Props {
  data: Record<string, number>
}

export default function AssigneeChart({ data }: Props) {
  const chartData = Object.entries(data)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 15)
    .map(([name, value]) => ({ name, value }))

  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900 p-5 shadow-sm">
      <h3 className="mb-4 text-base font-semibold text-gray-300">Carga por Asignado</h3>
      <ResponsiveContainer width="100%" height={Math.max(260, chartData.length * 36)}>
        <BarChart data={chartData} layout="vertical" margin={{ top: 4, right: 24, left: 8, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" horizontal={false} />
          <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <YAxis dataKey="name" type="category" width={130} tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <Tooltip formatter={(v: number) => [v, 'Tickets']} contentStyle={tooltipStyle} cursor={{ fill: '#ffffff08' }} />
          <Bar dataKey="value" fill="#6366f1" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

'use client'

import { XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Area, AreaChart } from 'recharts'

const tooltipStyle = {
  backgroundColor: '#1f2937',
  border: '1px solid #374151',
  borderRadius: '8px',
  color: '#f3f4f6',
}

interface Props {
  data: { week: string; completed: number }[]
}

export default function VelocityChart({ data }: Props) {
  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-gray-800 bg-gray-900 p-5 shadow-sm">
        <h3 className="mb-4 text-base font-semibold text-gray-300">Velocidad (tickets completados por semana)</h3>
        <p className="text-sm text-gray-600">Sin datos de tickets completados.</p>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900 p-5 shadow-sm">
      <h3 className="mb-4 text-base font-semibold text-gray-300">Velocidad (tickets completados por semana)</h3>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
          <defs>
            <linearGradient id="velocityGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
          <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <Tooltip formatter={(v: number) => [v, 'Completados']} contentStyle={tooltipStyle} cursor={{ stroke: '#374151' }} />
          <Area
            type="monotone"
            dataKey="completed"
            stroke="#6366f1"
            strokeWidth={2}
            fill="url(#velocityGradient)"
            dot={{ r: 4, fill: '#6366f1', strokeWidth: 0 }}
            activeDot={{ r: 6, fill: '#818cf8' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

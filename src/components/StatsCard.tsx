interface StatsCardProps {
  title: string
  value: number | string
  subtitle?: string
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'gray'
}

const colorMap = {
  blue: 'border-blue-500 bg-blue-50 text-blue-700',
  green: 'border-green-500 bg-green-50 text-green-700',
  yellow: 'border-yellow-500 bg-yellow-50 text-yellow-700',
  red: 'border-red-500 bg-red-50 text-red-700',
  gray: 'border-gray-400 bg-gray-100 text-gray-700',
}

export default function StatsCard({ title, value, subtitle, color = 'blue' }: StatsCardProps) {
  return (
    <div className={`rounded-xl border-l-4 p-5 shadow-sm ${colorMap[color]}`}>
      <p className="text-sm font-medium uppercase tracking-wide opacity-70">{title}</p>
      <p className="mt-1 text-4xl font-bold">{value}</p>
      {subtitle && <p className="mt-1 text-sm opacity-60">{subtitle}</p>}
    </div>
  )
}

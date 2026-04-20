interface StatsCardProps {
  title: string
  value: number | string
  subtitle?: string
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'gray'
}

const colorMap = {
  blue: 'border-blue-500 bg-blue-950 text-blue-300',
  green: 'border-green-500 bg-green-950 text-green-300',
  yellow: 'border-yellow-500 bg-yellow-950 text-yellow-300',
  red: 'border-red-500 bg-red-950 text-red-300',
  gray: 'border-gray-600 bg-gray-800 text-gray-300',
}

export default function StatsCard({ title, value, subtitle, color = 'blue' }: StatsCardProps) {
  return (
    <div className={`rounded-xl border-l-4 p-5 shadow-sm ${colorMap[color]}`}>
      <p className="text-sm font-medium uppercase tracking-wide opacity-60">{title}</p>
      <p className="mt-1 text-4xl font-bold">{value}</p>
      {subtitle && <p className="mt-1 text-sm opacity-50">{subtitle}</p>}
    </div>
  )
}

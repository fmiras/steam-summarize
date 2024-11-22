import { cn } from '@/lib/utils'

interface WeightIndicatorProps {
  weight: number
  className?: string
  variant?: 'positive' | 'negative'
}

export function WeightIndicator({ weight, className, variant = 'positive' }: WeightIndicatorProps) {
  const count = Math.round(Math.min(Math.max(weight, 0), 5))
  const items = Array.from({ length: count }, (_, i) => i)

  return (
    <div className="flex gap-0.5">
      {items.map((i) => (
        <div
          key={i}
          className={cn('h-2 w-2 rounded-none', className)}
          style={{
            backgroundColor: variant === 'positive' ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)',
            opacity: 0.4 + ((i + 1) / items.length) * 0.6,
          }}
        />
      ))}
    </div>
  )
}

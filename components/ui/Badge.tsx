'use client'

import { cn } from '@/lib/utils'

type BadgeVariant = 'available' | 'booked' | 'reserved' | 'gold' | 'default'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
  pulse?: boolean
}

const variantStyles: Record<BadgeVariant, string> = {
  available: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  booked: 'bg-red-100 text-red-800 border-red-200',
  reserved: 'bg-amber-100 text-amber-800 border-amber-200',
  gold: 'bg-amber-400 text-amber-900 border-amber-500',
  default: 'bg-gray-100 text-gray-700 border-gray-200',
}

export default function Badge({ variant = 'default', children, className, pulse }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border',
        variantStyles[variant],
        className
      )}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-current" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-current" />
        </span>
      )}
      {children}
    </span>
  )
}

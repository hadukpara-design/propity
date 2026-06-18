import Link from 'next/link'
import { cn } from '@/lib/utils'
import { gandaToSqft } from '@/lib/utils'
import type { Plot } from '@/types'
import Badge from '@/components/ui/Badge'
import { ArrowRight } from 'lucide-react'

interface PlotCardProps {
  plot: Plot
}

const statusConfig = {
  available: {
    card: 'bg-white border-emerald-200 hover:-translate-y-1 hover:shadow-xl hover:border-emerald-400 cursor-pointer',
    badge: 'available' as const,
  },
  booked: {
    card: 'bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed',
    badge: 'booked' as const,
  },
  reserved: {
    card: 'bg-amber-50 border-amber-200 opacity-80 cursor-default',
    badge: 'reserved' as const,
  },
}

export default function PlotCard({ plot }: PlotCardProps) {
  const config = statusConfig[plot.status]
  const sqft = plot.area_sqft ?? gandaToSqft(plot.ganda_size)

  const card = (
    <div className={cn(
      'border-2 rounded-xl p-4 transition-all duration-200 group',
      config.card
    )}>
      <div className="flex items-start justify-between mb-2">
        <span className="text-2xl font-bold text-[#1B4332] font-[family-name:var(--font-playfair)]">
          #{plot.plot_number}
        </span>
        <Badge variant={config.badge}>
          {plot.status.charAt(0).toUpperCase() + plot.status.slice(1)}
        </Badge>
      </div>

      <p className="text-sm font-semibold text-[#1A1A2E]">{plot.ganda_size} Ganda</p>
      <p className="text-xs text-[#5C5C72]">≈ {sqft.toLocaleString()} sq ft</p>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm font-bold text-[#C9A84C]">₹{plot.price_lakhs} L</span>
        {plot.status === 'available' && (
          <span className="text-xs text-[#1B4332] font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
            Book <ArrowRight className="w-3 h-3" />
          </span>
        )}
      </div>
    </div>
  )

  if (plot.status !== 'available') return card

  return (
    <Link href={`/book?plot=${plot.plot_number}`} className="block">
      {card}
    </Link>
  )
}

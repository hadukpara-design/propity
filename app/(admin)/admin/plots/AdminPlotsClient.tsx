'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import type { Plot, PlotStatus } from '@/types'
import { cn } from '@/lib/utils'

const STATUS_CYCLE: PlotStatus[] = ['available', 'reserved', 'booked']

const statusStyle: Record<PlotStatus, string> = {
  available: 'bg-emerald-100 border-emerald-300 text-emerald-800',
  reserved: 'bg-amber-100 border-amber-300 text-amber-800',
  booked: 'bg-red-100 border-red-300 text-red-800',
}

export default function AdminPlotsClient({ initialPlots }: { initialPlots: Plot[] }) {
  const [plots, setPlots] = useState(initialPlots)
  const [loading, setLoading] = useState<number | null>(null)

  async function cycleStatus(plot: Plot) {
    const currentIdx = STATUS_CYCLE.indexOf(plot.status)
    const nextStatus = STATUS_CYCLE[(currentIdx + 1) % STATUS_CYCLE.length]
    setLoading(plot.id)

    try {
      const res = await fetch('/api/plots', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: plot.id, status: nextStatus }),
      })
      if (!res.ok) throw new Error('Failed')
      setPlots(prev => prev.map(p => p.id === plot.id ? { ...p, status: nextStatus } : p))
      toast.success(`Plot #${plot.plot_number} → ${nextStatus}`)
    } catch {
      toast.error('Failed to update status')
    } finally {
      setLoading(null)
    }
  }

  const counts = {
    available: plots.filter(p => p.status === 'available').length,
    reserved: plots.filter(p => p.status === 'reserved').length,
    booked: plots.filter(p => p.status === 'booked').length,
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-6">
        {Object.entries(counts).map(([status, count]) => (
          <div key={status} className={cn('px-3 py-1.5 rounded-full text-xs font-semibold capitalize border', statusStyle[status as PlotStatus])}>
            {status}: {count}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2">
        {plots.map(plot => (
          <button
            key={plot.id}
            onClick={() => cycleStatus(plot)}
            disabled={loading === plot.id}
            title={`Plot #${plot.plot_number} — Click to change status`}
            className={cn(
              'p-3 rounded-xl border-2 text-left transition-all hover:scale-105 active:scale-95 disabled:opacity-50',
              statusStyle[plot.status]
            )}
          >
            <p className="font-bold text-sm">#{plot.plot_number}</p>
            <p className="text-xs opacity-70">{plot.ganda_size}G</p>
            <p className="text-xs font-medium mt-1 capitalize">{loading === plot.id ? '...' : plot.status.slice(0,4)}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

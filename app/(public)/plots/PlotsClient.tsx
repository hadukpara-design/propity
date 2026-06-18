'use client'

import { useState } from 'react'
import type { Plot, PlotStatus } from '@/types'
import PlotCard from '@/components/features/PlotCard'

type Filter = 'all' | PlotStatus

export default function PlotsClient({ initialPlots }: { initialPlots: Plot[] }) {
  const [filter, setFilter] = useState<Filter>('all')

  const filtered = filter === 'all' ? initialPlots : initialPlots.filter(p => p.status === filter)

  const counts = {
    all: initialPlots.length,
    available: initialPlots.filter(p => p.status === 'available').length,
    reserved: initialPlots.filter(p => p.status === 'reserved').length,
    booked: initialPlots.filter(p => p.status === 'booked').length,
  }

  const filters: { key: Filter; label: string; color: string }[] = [
    { key: 'all', label: 'All', color: 'bg-[#1B4332] text-white' },
    { key: 'available', label: 'Available', color: 'bg-emerald-600 text-white' },
    { key: 'reserved', label: 'Reserved', color: 'bg-amber-500 text-white' },
    { key: 'booked', label: 'Booked', color: 'bg-red-600 text-white' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map(({ key, label, color }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              filter === key ? color : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {label}
            <span className={`ml-2 px-1.5 py-0.5 rounded-full text-xs ${filter === key ? 'bg-white/20' : 'bg-gray-200'}`}>
              {counts[key]}
            </span>
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-6 text-xs">
        <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-emerald-200 border-2 border-emerald-400 inline-block" />Available — click to book</div>
        <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-amber-100 border-2 border-amber-300 inline-block" />Reserved</div>
        <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-gray-200 border-2 border-gray-300 inline-block" />Booked</div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-center text-[#5C5C72] py-20">No plots in this category.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {filtered.map(plot => (
            <PlotCard key={plot.id} plot={plot} />
          ))}
        </div>
      )}
    </div>
  )
}

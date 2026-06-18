'use client'

import { useState } from 'react'
import { formatDate } from '@/lib/utils'
import { Download, ChevronDown } from 'lucide-react'

type Booking = {
  id: number
  customer_name: string
  customer_phone: string
  customer_email: string | null
  customer_city: string | null
  plot_number: number
  booking_amount: number
  status: string
  created_at: string
  plots?: { ganda_size: number } | null
  message?: string | null
}

type FilterStatus = 'all' | 'confirmed' | 'pending' | 'cancelled'

export default function AdminBookingsClient({ bookings }: { bookings: Booking[] }) {
  const [filter, setFilter] = useState<FilterStatus>('all')
  const [expanded, setExpanded] = useState<number | null>(null)

  const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter)

  function exportCSV() {
    const headers = ['ID', 'Name', 'Phone', 'Email', 'City', 'Plot #', 'Ganda', 'Amount', 'Date', 'Status']
    const rows = filtered.map(b => [
      b.id, b.customer_name, b.customer_phone, b.customer_email ?? '',
      b.customer_city ?? '', b.plot_number, b.plots?.ganda_size ?? '',
      b.booking_amount, formatDate(b.created_at), b.status,
    ])
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `propity-bookings-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex gap-2">
          {(['all', 'confirmed', 'pending', 'cancelled'] as FilterStatus[]).map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-colors ${
                filter === s ? 'bg-[#1B4332] text-white' : 'bg-white border border-gray-200 text-[#5C5C72] hover:bg-gray-50'
              }`}
            >
              {s} {s === 'all' ? `(${bookings.length})` : `(${bookings.filter(b => b.status === s).length})`}
            </button>
          ))}
        </div>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 bg-white border border-gray-200 text-[#1A1A2E] text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Download className="w-3.5 h-3.5" /> Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-xs text-[#5C5C72] uppercase tracking-wider">
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">City</th>
                <th className="px-4 py-3 text-left">Plot</th>
                <th className="px-4 py-3 text-left">Size</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(b => (
                <>
                  <tr
                    key={b.id}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setExpanded(expanded === b.id ? null : b.id)}
                  >
                    <td className="px-4 py-3 text-[#5C5C72]">{b.id}</td>
                    <td className="px-4 py-3 font-medium">{b.customer_name}</td>
                    <td className="px-4 py-3">
                      <a href={`tel:${b.customer_phone}`} className="text-[#1B4332] hover:underline" onClick={e => e.stopPropagation()}>
                        {b.customer_phone}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-[#5C5C72]">{b.customer_city || '—'}</td>
                    <td className="px-4 py-3"><span className="bg-[#1B4332] text-white text-xs px-2 py-0.5 rounded-full">#{b.plot_number}</span></td>
                    <td className="px-4 py-3 text-[#5C5C72]">{b.plots?.ganda_size ?? '—'} G</td>
                    <td className="px-4 py-3 font-semibold text-[#C9A84C]">₹{(b.booking_amount / 100000).toFixed(0)}L</td>
                    <td className="px-4 py-3 text-[#5C5C72]">{formatDate(b.created_at)}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        b.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
                        b.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                      }`}>{b.status}</span>
                    </td>
                    <td className="px-4 py-3"><ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expanded === b.id ? 'rotate-180' : ''}`} /></td>
                  </tr>
                  {expanded === b.id && (
                    <tr key={`${b.id}-expanded`}>
                      <td colSpan={10} className="bg-gray-50 px-6 py-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div><p className="text-xs text-[#5C5C72]">Email</p><p className="font-medium">{b.customer_email || '—'}</p></div>
                          <div><p className="text-xs text-[#5C5C72]">Message</p><p className="font-medium">{b.message || '—'}</p></div>
                          <div><p className="text-xs text-[#5C5C72]">Booking Amount</p><p className="font-medium">₹{b.booking_amount.toLocaleString()}</p></div>
                          <div>
                            <p className="text-xs text-[#5C5C72] mb-1">Quick Contact</p>
                            <a
                              href={`https://wa.me/91${b.customer_phone}?text=Hi%20${encodeURIComponent(b.customer_name)}%2C%20regarding%20your%20plot%20%23${b.plot_number}%20booking%20at%20Propity%20Realty`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs bg-[#25D366] text-white px-2 py-1 rounded-lg font-semibold"
                            >
                              WhatsApp
                            </a>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={10} className="px-4 py-8 text-center text-[#5C5C72]">No bookings found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

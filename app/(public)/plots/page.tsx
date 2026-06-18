import { createClient, isSupabaseConfigured } from '@/lib/supabase/server'
import PlotsClient from './PlotsClient'
import type { Plot } from '@/types'

export const revalidate = 30

async function getPlots(): Promise<Plot[]> {
  if (!isSupabaseConfigured) return []
  try {
    const supabase = await createClient()
    const { data } = await supabase.from('plots').select('*').order('plot_number')
    return data ?? []
  } catch {
    return []
  }
}

export default async function PlotsPage() {
  const plots = await getPlots()

  const available = plots.filter(p => p.status === 'available').length
  const reserved  = plots.filter(p => p.status === 'reserved').length
  const booked    = plots.filter(p => p.status === 'booked').length

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-[#1B4332] pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#C9A84C] text-sm font-bold tracking-widest uppercase mb-2">17 Kani Township · Lembucherra, Agartala</p>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-white mb-2">
            Browse All 63 Plots
          </h1>
          <p className="text-white/60">Click any available plot to book instantly · 20-ft wide internal roads</p>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 mt-6">
            {[
              { label: 'Available', count: isSupabaseConfigured ? available : 63, color: 'bg-emerald-500' },
              { label: 'Reserved',  count: reserved,  color: 'bg-amber-500' },
              { label: 'Booked',    count: booked,    color: 'bg-red-500' },
              { label: 'Total',     count: 63,        color: 'bg-white/20' },
            ].map(({ label, count, color }) => (
              <div key={label} className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${color}`} />
                <span className="text-white font-bold">{count}</span>
                <span className="text-white/60 text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Site Plan */}
      <div className="bg-white border-b border-gray-100 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[#C9A84C] text-xs font-bold tracking-widest uppercase mb-1">Official Survey</p>
              <h2 className="text-xl font-bold text-[#1A1A2E]">Site Layout Plan</h2>
              <p className="text-xs text-[#5C5C72] mt-0.5">Total land: 17 Kani · Roads: 44 Ganda · Plots: 63</p>
            </div>
            <a
              href="/images/site-plan.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs bg-[#1B4332] text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-[#2D6A4F] transition-colors"
            >
              Open Full PDF ↗
            </a>
          </div>
          {/* Real site plan image */}
          <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
            <img
              src="/images/site-plan-img.png"
              alt="17 Kani Residential Township — Official Site Layout Plan with 63 Plots"
              className="w-full"
            />
          </div>
        </div>
      </div>

      <PlotsClient initialPlots={plots} />
    </div>
  )
}

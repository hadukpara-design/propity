import { createClient, isSupabaseConfigured } from '@/lib/supabase/server'
import BookingCard from '@/components/features/BookingCard'
import ProgressBar from '@/components/ui/ProgressBar'
import type { PublicBooking } from '@/types'

export const revalidate = 30

async function getData() {
  if (!isSupabaseConfigured) return { bookings: [], totalPlots: 63, bookedCount: 0, availableCount: 63 }
  try {
    const supabase = await createClient()
    const [bookingsRes, plotsRes] = await Promise.all([
      supabase
        .from('bookings')
        .select('customer_name, plot_number, customer_city, created_at')
        .eq('status', 'confirmed')
        .order('created_at', { ascending: false }),
      supabase.from('plots').select('status'),
    ])
    return {
      bookings: (bookingsRes.data ?? []) as PublicBooking[],
      totalPlots: plotsRes.data?.length ?? 63,
      bookedCount: plotsRes.data?.filter(p => p.status === 'booked').length ?? 0,
      availableCount: plotsRes.data?.filter(p => p.status === 'available').length ?? 63,
    }
  } catch {
    return { bookings: [], totalPlots: 63, bookedCount: 0, availableCount: 63 }
  }
}

export default async function BookingsPage() {
  const { bookings, totalPlots, bookedCount, availableCount } = await getData()

  return (
    <div className="min-h-screen bg-[#F8F5EF] pt-20">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-[#C9A84C] text-sm font-bold tracking-widest uppercase mb-2">Live Updates</p>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#1A1A2E] mb-2">
            Township Bookings
          </h1>
          <p className="text-[#5C5C72]">See who has already secured their plot</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Available', count: availableCount, color: 'text-emerald-600' },
            { label: 'Booked', count: bookedCount, color: 'text-red-600' },
            { label: 'Total Plots', count: totalPlots, color: 'text-[#1B4332]' },
          ].map(({ label, count, color }) => (
            <div key={label} className="bg-white rounded-xl p-4 text-center border border-gray-100 shadow-sm">
              <p className={`text-2xl font-bold ${color}`}>{count}</p>
              <p className="text-xs text-[#5C5C72] mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-8">
          <ProgressBar
            value={bookedCount}
            max={totalPlots}
            label="Township Fill Rate"
          />
        </div>

        {/* Bookings grid */}
        {bookings.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🏡</p>
            <h3 className="font-bold text-[#1A1A2E] text-xl mb-2">Be the first to book!</h3>
            <p className="text-[#5C5C72] mb-6">63 pristine plots await their owners.</p>
            <a href="/book" className="inline-block bg-[#1B4332] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#2D6A4F] transition-colors">
              Book Now →
            </a>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {bookings.map((booking, i) => (
              <BookingCard key={i} booking={booking} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

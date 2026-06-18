import { createAdminClient } from '@/lib/supabase/server'
import AdminNav from './AdminNav'
import Link from 'next/link'
import { BookOpen, CheckCircle2, IndianRupee, Home, TrendingUp, MessageSquare } from 'lucide-react'
import { formatDate } from '@/lib/utils'

async function getDashboardData() {
  const supabase = await createAdminClient()
  const today = new Date().toISOString().split('T')[0]

  const [bookingsRes, plotsRes, enquiriesRes, recentRes] = await Promise.all([
    supabase.from('bookings').select('status, booking_amount'),
    supabase.from('plots').select('status'),
    supabase.from('enquiries').select('created_at').gte('created_at', today),
    supabase.from('bookings').select('*, plots(ganda_size)').order('created_at', { ascending: false }).limit(10),
  ])

  const bookings = bookingsRes.data ?? []
  const plots = plotsRes.data ?? []
  const confirmed = bookings.filter(b => b.status === 'confirmed')
  const revenue = confirmed.length * 100000

  return {
    totalBookings: bookings.length,
    confirmedBookings: confirmed.length,
    revenue,
    availablePlots: plots.filter(p => p.status === 'available').length,
    bookedPlots: plots.filter(p => p.status === 'booked').length,
    enquiriesToday: enquiriesRes.data?.length ?? 0,
    recentBookings: recentRes.data ?? [],
  }
}

export default async function AdminDashboard() {
  const data = await getDashboardData()

  const stats = [
    { label: 'Total Bookings', value: data.totalBookings, icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Confirmed', value: data.confirmedBookings, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Revenue', value: `₹${(data.revenue / 100000).toFixed(0)}L`, icon: IndianRupee, color: 'text-[#C9A84C]', bg: 'bg-amber-50' },
    { label: 'Available Plots', value: data.availablePlots, icon: Home, color: 'text-[#1B4332]', bg: 'bg-[#1B4332]/10' },
    { label: 'Booked Plots', value: data.bookedPlots, icon: TrendingUp, color: 'text-red-600', bg: 'bg-red-50' },
    { label: "Enquiries Today", value: data.enquiriesToday, icon: MessageSquare, color: 'text-purple-600', bg: 'bg-purple-50' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1A1A2E] mb-6">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center mb-3`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <p className="text-2xl font-bold text-[#1A1A2E]">{value}</p>
            <p className="text-xs text-[#5C5C72] mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Recent bookings */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-[#1A1A2E]">Recent Bookings</h2>
          <Link href="/admin/bookings" className="text-[#1B4332] text-sm font-semibold hover:underline">View all →</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-xs text-[#5C5C72] uppercase tracking-wider">
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Plot</th>
                <th className="px-4 py-3 text-left">City</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.recentBookings.map((b: { id: number; customer_name: string; customer_phone: string; plot_number: number; customer_city?: string; created_at: string; status: string }) => (
                <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium">{b.customer_name}</td>
                  <td className="px-4 py-3 text-[#5C5C72]">{b.customer_phone}</td>
                  <td className="px-4 py-3"><span className="bg-[#1B4332] text-white text-xs px-2 py-0.5 rounded-full">#{b.plot_number}</span></td>
                  <td className="px-4 py-3 text-[#5C5C72]">{b.customer_city || '—'}</td>
                  <td className="px-4 py-3 text-[#5C5C72]">{formatDate(b.created_at)}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      b.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
                      b.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>{b.status}</span>
                  </td>
                </tr>
              ))}
              {data.recentBookings.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-[#5C5C72]">No bookings yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

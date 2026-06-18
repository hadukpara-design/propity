import { createAdminClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'
import AdminBookingsClient from './AdminBookingsClient'

async function getBookings() {
  const supabase = await createAdminClient()
  const { data } = await supabase
    .from('bookings')
    .select('*, plots(ganda_size)')
    .order('created_at', { ascending: false })
  return data ?? []
}

export default async function AdminBookingsPage() {
  const bookings = await getBookings()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#1A1A2E]">Bookings</h1>
        <span className="bg-[#1B4332] text-white text-sm font-bold px-3 py-1 rounded-full">{bookings.length} total</span>
      </div>
      <AdminBookingsClient bookings={bookings} />
    </div>
  )
}

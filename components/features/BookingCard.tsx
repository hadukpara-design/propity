import { MapPin, CheckCircle2 } from 'lucide-react'
import { anonymizeName, formatDate } from '@/lib/utils'
import type { PublicBooking } from '@/types'

export default function BookingCard({ booking }: { booking: PublicBooking }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-start gap-3 hover:shadow-md transition-shadow">
      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center">
        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="font-semibold text-[#1A1A2E] text-sm truncate">
            {anonymizeName(booking.customer_name)}
          </p>
          <span className="bg-[#1B4332] text-white text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
            Plot #{booking.plot_number}
          </span>
        </div>
        <div className="flex items-center gap-1 mt-1 text-xs text-[#5C5C72]">
          {booking.customer_city && (
            <>
              <MapPin className="w-3 h-3" />
              <span>{booking.customer_city}</span>
              <span className="mx-1">·</span>
            </>
          )}
          <span>{formatDate(booking.created_at)}</span>
        </div>
      </div>
    </div>
  )
}

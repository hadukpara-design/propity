import Link from 'next/link'
import { CheckCircle2, Phone, MessageCircle, ArrowRight } from 'lucide-react'

export default async function BookSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ name?: string; plot?: string }>
}) {
  const { name = 'Valued Customer', plot = '?' } = await searchParams

  return (
    <div className="min-h-screen bg-[#F8F5EF] flex items-center justify-center px-4 py-20">
      <div className="max-w-lg w-full text-center">
        {/* Checkmark */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center">
            <CheckCircle2 className="w-14 h-14 text-emerald-500" strokeWidth={1.5} />
          </div>
        </div>

        <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#1A1A2E] mb-2">
          Booking Confirmed!
        </h1>
        <p className="text-[#5C5C72] mb-8">
          Thank you, <strong>{decodeURIComponent(name)}</strong>. Your booking for{' '}
          <strong className="text-[#1B4332]">Plot #{plot}</strong> has been received.
        </p>

        {/* Booking summary */}
        <div className="bg-[#1B4332] rounded-2xl p-6 text-white mb-8 text-left">
          <div className="flex justify-between mb-4">
            <div>
              <p className="text-white/60 text-xs mb-1">Customer</p>
              <p className="font-bold">{decodeURIComponent(name)}</p>
            </div>
            <div className="text-right">
              <p className="text-white/60 text-xs mb-1">Plot Number</p>
              <p className="font-bold text-[#C9A84C] text-xl">#{plot}</p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-4 flex justify-end">
            <div className="text-right">
              <p className="text-white/60 text-xs mb-1">Status</p>
              <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">CONFIRMED</span>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-left">
          <p className="text-amber-800 text-sm font-semibold mb-1">⏰ What happens next?</p>
          <p className="text-amber-700 text-sm">Our team will call you within 2 hours at your registered number to guide you through the payment process.</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <a
            href="tel:8132953235"
            className="flex-1 flex items-center justify-center gap-2 bg-[#1B4332] text-white font-bold py-3 rounded-xl hover:bg-[#2D6A4F] transition-colors"
          >
            <Phone className="w-4 h-4" /> Call Us
          </a>
          <a
            href="https://wa.me/918132953235?text=Hi%2C%20I%20just%20booked%20a%20plot%20at%20Propity%20Realty"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-3 rounded-xl hover:bg-[#20BA5C] transition-colors"
          >
            <MessageCircle className="w-4 h-4" fill="currentColor" /> WhatsApp
          </a>
        </div>

        <div className="flex justify-center gap-6">
          <Link href="/bookings" className="text-[#1B4332] text-sm font-semibold hover:underline flex items-center gap-1">
            View All Bookings <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/" className="text-[#5C5C72] text-sm hover:underline">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}

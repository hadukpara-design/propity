import { createClient, isSupabaseConfigured } from '@/lib/supabase/server'
import BookingForm from '@/components/features/BookingForm'
import { Suspense } from 'react'
import type { Plot } from '@/types'
import { Shield, Phone } from 'lucide-react'

async function getAvailablePlots(): Promise<Plot[]> {
  if (!isSupabaseConfigured) return []
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('plots')
      .select('*')
      .eq('status', 'available')
      .order('plot_number')
    return data ?? []
  } catch {
    return []
  }
}

function BookingFormSkeleton() {
  return <div className="animate-pulse space-y-4">{[...Array(6)].map((_, i) => <div key={i} className="h-12 bg-gray-200 rounded-lg" />)}</div>
}

export default async function BookPage() {
  const availablePlots = await getAvailablePlots()

  return (
    <div className="min-h-screen bg-[#F8F5EF] pt-20">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-[#C9A84C] text-sm font-bold tracking-widest uppercase mb-2">Secure Your Plot</p>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#1A1A2E] mb-3">
            Book a Residential Plot
          </h1>
          <p className="text-[#5C5C72]">
            17 Kani Township · Laxmilunga · Agartala · Tripura
          </p>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {[
            { icon: Shield, text: '100% Secure' },
            { icon: Phone, text: 'Team calls in 2 hrs' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm text-[#5C5C72]">
              <Icon className="w-4 h-4 text-[#1B4332]" />
              {text}
            </div>
          ))}
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <Suspense fallback={<BookingFormSkeleton />}>
            <BookingForm availablePlots={availablePlots} />
          </Suspense>
        </div>

        {/* Footnote */}
        <p className="text-center text-xs text-[#5C5C72] mt-4">
          Need help? Call <a href="tel:8132953235" className="text-[#1B4332] font-semibold">+91 81329 53235</a>
        </p>
      </div>
    </div>
  )
}

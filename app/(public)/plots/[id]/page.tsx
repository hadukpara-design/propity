import { createClient } from '@/lib/supabase/server'
import { gandaToSqft } from '@/lib/utils'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Badge from '@/components/ui/Badge'
import { MapPin, Home, ArrowLeft, Phone, CheckCircle2 } from 'lucide-react'

export default async function PlotDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: plot } = await supabase
    .from('plots')
    .select('*')
    .eq('id', parseInt(id))
    .single()

  if (!plot) notFound()

  const sqft = plot.area_sqft ?? gandaToSqft(plot.ganda_size)

  return (
    <div className="min-h-screen bg-[#F8F5EF] pt-20">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Link href="/plots" className="inline-flex items-center gap-2 text-[#1B4332] text-sm font-medium mb-6 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Plots
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-[#1B4332] p-8 text-white">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[#C9A84C] text-sm font-semibold mb-1">17 Kani Township</p>
                <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold">Plot #{plot.plot_number}</h1>
                <div className="flex items-center gap-2 mt-2 text-white/70 text-sm">
                  <MapPin className="w-4 h-4" />
                  Laxmilunga, Agartala, Tripura — 799101
                </div>
              </div>
              <Badge variant={plot.status as 'available' | 'booked' | 'reserved'} className="text-sm px-3 py-1">
                {plot.status.charAt(0).toUpperCase() + plot.status.slice(1)}
              </Badge>
            </div>
          </div>

          <div className="p-8">
            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Size', value: `${plot.ganda_size} Ganda`, icon: Home },
                { label: 'Area', value: `${sqft.toLocaleString()} sq ft`, icon: Home },
                { label: 'Price', value: `₹${plot.price_lakhs} Lakhs`, icon: Home },
              ].map(({ label, value }) => (
                <div key={label} className="bg-[#F8F5EF] rounded-xl p-4">
                  <p className="text-xs text-[#5C5C72] mb-1">{label}</p>
                  <p className="font-bold text-[#1B4332]">{value}</p>
                </div>
              ))}
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <h3 className="font-semibold text-[#1A1A2E] mb-3">Nearby Amenities</h3>
              <div className="space-y-2">
                {[
                  '🏙️ 12 min to Agartala City Center',
                  '✈️ 13 min to Maharaja Bir Bikram Airport',
                  '🏨 Near Taj Vivanta 5-Star Hotel',
                  '🏏 Adjacent to upcoming IPL Stadium',
                  '📚 5 min to Lembucherra Education Hub',
                  '🛣️ Adjacent to Western Bypass (under construction)',
                  '🌿 Surrounded by tea gardens',
                  '🏘️ 20-ft wide internal roads',
                ].map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm text-[#5C5C72]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              {plot.status === 'available' ? (
                <Link
                  href={`/book?plot=${plot.plot_number}`}
                  className="flex-1 bg-[#C9A84C] text-[#1A1A2E] font-bold py-3 px-6 rounded-xl text-center text-lg hover:bg-[#E8C96A] transition-colors"
                >
                  Book This Plot →
                </Link>
              ) : (
                <button disabled className="flex-1 bg-gray-200 text-gray-400 font-bold py-3 px-6 rounded-xl text-center text-lg cursor-not-allowed">
                  {plot.status === 'booked' ? 'Already Booked' : 'Under Reservation'}
                </button>
              )}
              <a
                href="tel:8132953235"
                className="flex items-center justify-center gap-2 border-2 border-[#1B4332] text-[#1B4332] font-bold py-3 px-6 rounded-xl hover:bg-[#1B4332] hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" /> Call for Details
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

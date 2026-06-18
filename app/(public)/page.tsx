import { createClient, isSupabaseConfigured } from '@/lib/supabase/server'
import HeroSection from '@/components/sections/HeroSection'
import WhyInvestSection from '@/components/sections/WhyInvestSection'
import LandVsFlatSection from '@/components/sections/LandVsFlatSection'
import CTABand from '@/components/sections/CTABand'
import SectionHeader from '@/components/ui/SectionHeader'
import Image from 'next/image'

async function getAvailableCount() {
  if (!isSupabaseConfigured) return 63
  try {
    const supabase = await createClient()
    const { count } = await supabase
      .from('plots')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'available')
    return count ?? 63
  } catch {
    return 63
  }
}

export default async function HomePage() {
  const availableCount = await getAvailableCount()

  return (
    <div>
      <HeroSection availableCount={availableCount} />

      {/* Stats Band */}
      <div className="relative bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] py-12 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(201,168,76,0.3) 40px, rgba(201,168,76,0.3) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(201,168,76,0.3) 40px, rgba(201,168,76,0.3) 41px)' }}
        />
        <div className="relative max-w-5xl mx-auto">
          <p className="text-[#C9A84C] text-xs font-bold tracking-widest uppercase text-center mb-6">
            17 Kani (2,93,760 Sq. Feet) Residential Township
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-white">
            {[
              { num: '63', label: 'Residential Plots' },
              { num: '17 Kani', label: '2,93,760 Sq. Feet Total' },
              { num: '20 ft', label: 'Internal Road Width' },
              { num: '44 Ganda', label: 'Road Area Reserved' },
            ].map(({ num, label }) => (
              <div key={label}>
                <div className="text-[#C9A84C] font-bold text-2xl md:text-3xl font-[family-name:var(--font-playfair)]">{num}</div>
                <div className="text-white/60 text-xs mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <WhyInvestSection />

      {/* Location Map */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Location" title="Strategic Location — All Major Landmarks at a Glance" centered />
          <div className="mt-8 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <Image
              src="/images/location-map.png"
              alt="17 Kani Residential Township Location Map — Agartala, Tripura"
              width={1400} height={900}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Landmarks — real photos */}
      <section className="py-20 px-4 bg-[#F8F5EF]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Nearby Landmarks" title="Prime Growth Drivers" centered />
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            {/* Taj Vivanta */}
            <div className="rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/images/taj-vivanta.png"
                alt="Taj Vivanta 5-Star Hotel (Under Construction)"
                width={800} height={600}
                className="w-full h-auto"
              />
            </div>
            {/* IPL Stadium */}
            <div className="rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/images/ipl-stadium.png"
                alt="Upcoming IPL Stadium (Under Construction)"
                width={800} height={600}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Education Hub */}
      <section className="bg-white">
        <Image
          src="/images/education-hub.png"
          alt="Lembucherra Education Hub — Holy Cross, Rajarshi, Agriculture, Fisheries, ICFAI, Central Sanskrit University"
          width={1400} height={900}
          className="w-full h-auto block"
        />
      </section>

      {/* TUDA Master Plan — real image */}
      <section className="py-16 px-4 bg-[#F8F5EF]">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <Image
              src="/images/tuda-master-plan.png"
              alt="TUDA Laxmilunga Special Planning Area — 3D View of Draft Master Plan — Project: Agartala Satellite Town"
              width={1400} height={900}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      <LandVsFlatSection />
      <CTABand />
    </div>
  )
}

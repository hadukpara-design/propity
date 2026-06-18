import { CheckCircle2, MapPin, Trees, Building2 } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8F5EF] pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#C9A84C] text-sm font-bold tracking-widest uppercase mb-2">About the Project</p>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-[#1A1A2E] mb-4">
            17 Kani Residential Township
          </h1>
          <p className="text-[#5C5C72] text-lg max-w-2xl mx-auto">
            A thoughtfully planned residential community in the heart of Laxmilunga Special Planning Area, Agartala.
          </p>
        </div>

        {/* Project overview */}
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#1B4332]/10 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-[#1B4332]" />
            </div>
            <h2 className="text-xl font-bold text-[#1A1A2E]">Project Overview</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: 'Project Name', value: '17 Kani Residential Township' },
              { label: 'Location', value: 'Strategically located right beside the Western Bypass (under construction), Durgabari' },
              { label: 'Total Area', value: '17 Kani (2,93,760 Sq. Feet)' },
              { label: 'Total Plots', value: '63 Residential Plots' },
              { label: 'Plot Sizes', value: '2.77 Ganda to 20 Ganda' },
              { label: 'Booking Amount', value: '₹1,00,000 (Token)' },
              { label: 'Internal Road Width', value: '20-Foot Wide Internal Roads' },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col">
                <span className="text-xs text-[#5C5C72] uppercase tracking-wider mb-0.5">{label}</span>
                <span className="text-sm font-semibold text-[#1A1A2E]">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Why invest */}
        <div className="bg-[#1B4332] rounded-2xl p-8 text-white mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Trees className="w-6 h-6 text-[#C9A84C]" />
            <h2 className="text-xl font-bold">Investment Thesis</h2>
          </div>
          <div className="space-y-3">
            {[
              'Western Bypass construction will dramatically reduce travel time and boost land values',
              'Proximity to Lembucherra creates year-round rental demand from students and faculty',
              'TUDA approved planning area ensures structured, regulated development',
              'Tea garden surroundings provide peaceful, pollution-free living environment',
              'Limited supply (63 plots) with rapidly growing demand from Agartala\'s expansion',
              '3–4x capital appreciation expected within 5–7 years post-bypass completion',
              'Generational wealth — land never depreciates unlike apartments',
            ].map(point => (
              <div key={point} className="flex items-start gap-3 text-sm text-white/90">
                <CheckCircle2 className="w-4 h-4 text-[#C9A84C] mt-0.5 shrink-0" />
                {point}
              </div>
            ))}
          </div>
        </div>

        {/* Location advantages */}
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm mb-8">
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="w-5 h-5 text-[#1B4332]" />
            <h2 className="text-xl font-bold text-[#1A1A2E]">Strategic Location</h2>
          </div>
          <p className="text-[#5C5C72] text-sm leading-relaxed mb-4">
            Laxmilunga sits at the northwestern edge of Agartala&apos;s rapidly expanding urban footprint.
            The upcoming Western Bypass will transform this into a prime transit corridor,
            connecting the airport, city center, and the education hub in a single arterial road.
          </p>
          <p className="text-[#5C5C72] text-sm leading-relaxed">
            The TUDA Master Plan designates Laxmilunga as a Special Planning Area — meaning infrastructure
            investments (roads, utilities, parks) are already budgeted and in progress.
            Unlike unplanned townships, buyers here benefit from government-backed development.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/book"
            className="inline-block bg-[#C9A84C] text-[#1A1A2E] font-bold px-10 py-4 rounded-xl text-lg hover:bg-[#E8C96A] transition-colors"
          >
            Book Your Plot — ₹1,00,000
          </Link>
          <p className="mt-3 text-[#5C5C72] text-sm">Or call us: <a href="tel:8132953235" className="text-[#1B4332] font-semibold">+91 81329 53235</a></p>
        </div>
      </div>
    </div>
  )
}

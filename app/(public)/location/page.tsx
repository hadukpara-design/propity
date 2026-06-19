import { MapPin, Phone, Clock, Navigation, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default function LocationPage() {
  return (
    <div className="min-h-screen bg-[#F8F5EF] pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <p className="text-[#C9A84C] text-sm font-bold tracking-widest uppercase mb-2">Find Us</p>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#1A1A2E] mb-2">
            Location & Directions
          </h1>
          <p className="text-[#5C5C72]">Laxmilunga Special Planning Area, Agartala, Tripura</p>
        </div>

        {/* Location Map — from brochure */}
        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 mb-6">
          <img
            src="/images/location-map.png"
            alt="17 Kani Residential Township Location — Agartala, Tripura showing Airport, Taj Vivanta, IPL Stadium, Tripura University, Lembucherra Education Hub, Western Bypass Road"
            className="w-full"
          />
        </div>

        {/* Google Maps embed — exact pinned location */}
        <Link
          href="https://maps.app.goo.gl/4PNT8og4eDVAjmQ76"
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-2xl overflow-hidden shadow-lg border-2 border-[#C9A84C] mb-2 h-96 relative group"
        >
          <iframe
            src="https://maps.google.com/maps?q=23.91194,91.28083&hl=en&z=17&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, pointerEvents: 'none' }}
            loading="lazy"
            title="17 Kani Township Exact Location - Laxmilunga, Agartala"
          />
          {/* Click overlay */}
          <div className="absolute inset-0 flex items-end justify-center pb-6 bg-transparent group-hover:bg-black/10 transition-colors">
            <span className="inline-flex items-center gap-2 bg-[#1B4332] text-white font-bold px-5 py-2.5 rounded-xl shadow-lg text-sm">
              <MapPin className="w-4 h-4 text-[#C9A84C]" />
              Open in Google Maps
              <ExternalLink className="w-4 h-4 opacity-70" />
            </span>
          </div>
        </Link>
        <p className="text-center text-xs text-[#5C5C72] mb-10">📍 Click the map to open exact location</p>

        {/* Info cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            {
              icon: MapPin,
              title: 'Address',
              content: 'Laxmilunga Special Planning Area, Agartala, Tripura — 799101',
            },
            {
              icon: Clock,
              title: 'Site Visit Hours',
              content: 'Monday – Sunday\n9:00 AM to 6:00 PM',
            },
            {
              icon: Phone,
              title: 'Contact',
              content: '+91 81329 53235\nhadukpara@gmail.com',
              isPhone: true,
            },
            {
              icon: Navigation,
              title: 'Directions',
              content: 'From Agartala: Take Western Bypass direction, turn at Laxmilunga checkpoint.',
            },
          ].map(({ icon: Icon, title, content }) => (
            <div key={title} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <div className="w-9 h-9 rounded-lg bg-[#1B4332]/10 flex items-center justify-center mb-3">
                <Icon className="w-5 h-5 text-[#1B4332]" />
              </div>
              <h3 className="font-semibold text-[#1A1A2E] mb-1 text-sm">{title}</h3>
              <p className="text-[#5C5C72] text-xs whitespace-pre-line leading-relaxed">{content}</p>
            </div>
          ))}
        </div>

        {/* Distance table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="bg-[#1B4332] px-6 py-4">
            <h2 className="text-white font-bold text-lg">Nearby Landmarks & Distances</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {[
              { place: 'Agartala City Center', distance: '~12 min', km: '~8 km' },
              { place: 'Maharaja Bir Bikram Airport', distance: '~13 min', km: '~10 km' },
              { place: 'Taj Vivanta 5-Star Hotel (Under Construction)', distance: '~10 min', km: '~7 km' },
              { place: 'Lembucherra Education Hub', distance: '~5 min', km: '~3 km' },
              { place: 'Holy Cross College', distance: '~5 min', km: '~3.5 km' },
              { place: 'Rajarshi College', distance: '~6 min', km: '~4 km' },
              { place: 'Western Bypass (proposed)', distance: 'Adjacent', km: '<1 km' },
              { place: 'Upcoming IPL Stadium (Under Construction)', distance: '~8 min', km: '~5 km' },
            ].map(({ place, distance, km }) => (
              <div key={place} className="px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C9A84C] shrink-0" />
                  <span className="text-sm text-[#1A1A2E]">{place}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-[#5C5C72]">
                  <span>{km}</span>
                  <span className="bg-[#1B4332]/10 text-[#1B4332] font-semibold px-2 py-0.5 rounded-full">{distance}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

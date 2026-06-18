import { MapPin, Phone, Clock, Navigation } from 'lucide-react'

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

        {/* Google Maps embed */}
        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 mb-10 h-80">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3665.8!2d91.2798!3d23.9121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sLembucherra%2C%20Agartala%2C%20Tripura!5e0!3m2!1sen!2sin!4v1"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Propity Realty Location - Laxmilunga, Agartala"
          />
        </div>

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
              content: '+91 81329 53235\ninfo@propity.in',
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

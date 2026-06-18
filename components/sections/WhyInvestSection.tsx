import SectionHeader from '@/components/ui/SectionHeader'

const reasons = [
  { icon: '🏙️', title: '12 Min to Agartala Town', desc: 'Quick access to Agartala city center, markets, and government offices.' },
  { icon: '✈️', title: '13 Min to Airport', desc: 'Maharaja Bir Bikram Airport is just a short drive away.' },
  { icon: '🏨', title: 'Taj Vivanta 5-Star Hotel', desc: 'Under construction nearby — will be Agartala\'s premier 5-star hotel, boosting area prestige.' },
  { icon: '🏏', title: 'Upcoming IPL Stadium', desc: 'Under construction — major sports infrastructure driving real estate appreciation.' },
  { icon: '📚', title: '5 Min — Education Hub', desc: 'Lembucherra: Holy Cross, Rajarshi, Agriculture, Fisheries, ICFAI, Central Sanskrit University & more.' },
  { icon: '🛣️', title: 'Western Bypass Adjacent', desc: 'Strategically located right beside the Western Bypass (under construction) — major connectivity corridor.' },
  { icon: '🌿', title: 'Surrounded by Tea Garden', desc: 'Unique natural setting — lush tea gardens surround the township for a serene living environment.' },
  { icon: '🏘️', title: 'Laxmilunga Special Planning Area', desc: 'Part of TUDA\'s official master plan — structured, planned development with clear land-use zoning.' },
]

export default function WhyInvestSection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Why Invest Here"
          title="The Perfect Location for Your Future Home"
          subtitle="Laxmilunga sits at the convergence of Agartala's most exciting developments."
          centered
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="bg-[#F8F5EF] rounded-2xl p-6 border border-[#1B4332]/10 hover:border-[#1B4332]/30 hover:shadow-md transition-all group"
            >
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="font-bold text-[#1B4332] text-lg mb-2 font-[family-name:var(--font-montserrat)]">{title}</h3>
              <p className="text-[#5C5C72] text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

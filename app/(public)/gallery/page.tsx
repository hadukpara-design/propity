'use client'

import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const items = [
  {
    id: 1,
    src: '/images/aerial-land.png',
    label: 'Aerial View — 17 Kani Township',
    desc: 'Drone shot of the actual land with Western Bypass (Under Construction) visible. Tea gardens surrounding the site.',
    category: 'Site',
    type: 'image',
  },
  {
    id: 2,
    src: '/images/location-map.png',
    label: 'Location Map',
    desc: 'All major landmarks — Airport, Taj Vivanta, IPL Stadium, Tripura University, Lembucherra Education Hub, Western Bypass Road.',
    category: 'Maps',
    type: 'image',
  },
  {
    id: 3,
    src: '/images/site-plan-img.png',
    label: 'Official Site Layout Plan',
    desc: 'Survey drawing showing all 63 residential plots. Total land: 17 Kani. Roads: 44 Ganda.',
    category: 'Site Plan',
    type: 'image',
  },
  {
    id: 4,
    src: '/images/taj-vivanta.png',
    label: 'Taj Vivanta 5-Star Hotel',
    desc: 'Under Construction — Agartala\'s upcoming premier 5-star hotel located nearby on Western Bypass road.',
    category: 'Landmarks',
    type: 'image',
  },
  {
    id: 5,
    src: '/images/ipl-stadium.png',
    label: 'Upcoming IPL Stadium',
    desc: 'Under Construction — State-of-the-art cricket stadium driving massive real estate appreciation in the area.',
    category: 'Landmarks',
    type: 'image',
  },
  {
    id: 6,
    src: '/images/education-hub.png',
    label: 'Lembucherra Education Hub',
    desc: 'Holy Cross College, Rajarshi College, Agriculture College, Fisheries College, Central Sanskrit University, ICFAI University and several schools.',
    category: 'Education',
    type: 'image',
  },
  {
    id: 7,
    src: '/images/tuda-master-plan.png',
    label: 'TUDA Master Plan — Agartala Satellite Town',
    desc: 'Tripura Urban Planning & Development Authority — Laxmilunga Special Planning Area. 3D View of Draft Master Plan.',
    category: 'Master Plan',
    type: 'image',
  },
  {
    id: 8,
    src: '/images/land-vs-flat.png',
    label: 'Why Buy Land Instead of a Flat',
    desc: 'Plot: ₹30 Lakhs. House Construction: ₹30–40 Lakhs. 100% Land Ownership. 3X–4X appreciation after Western Bypass completion. Generational Wealth.',
    category: 'Investment',
    type: 'image',
  },
  {
    id: 9,
    src: '/images/brochure-cover.png',
    label: 'Project Brochure',
    desc: '17 Kani (2,93,760 Sq Feet) Residential Township — Strategically located right beside the Western Bypass (under construction).',
    category: 'Site',
    type: 'image',
  },
  {
    id: 10,
    src: '/images/book-cta.png',
    label: 'Book Your Dream Plot Today',
    desc: 'Only ₹1,00,000 to secure your plot. Call & WhatsApp: 8132953235. Prime Location. Wide Roads. Modern Infrastructure.',
    category: 'Info',
    type: 'image',
  },
]

const categories = ['All', ...Array.from(new Set(items.map(i => i.category)))]

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All' ? items : items.filter(i => i.category === activeCategory)

  const openLightbox = (id: number) => setLightbox(id)
  const closeLightbox = () => setLightbox(null)

  const currentIndex = lightbox !== null ? filtered.findIndex(i => i.id === lightbox) : -1
  const current = currentIndex >= 0 ? filtered[currentIndex] : null

  const prev = () => {
    if (currentIndex <= 0) setLightbox(filtered[filtered.length - 1].id)
    else setLightbox(filtered[currentIndex - 1].id)
  }
  const next = () => {
    if (currentIndex >= filtered.length - 1) setLightbox(filtered[0].id)
    else setLightbox(filtered[currentIndex + 1].id)
  }

  return (
    <div className="min-h-screen bg-[#F8F5EF] pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <p className="text-[#C9A84C] text-sm font-bold tracking-widest uppercase mb-2">Photo Gallery</p>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#1A1A2E] mb-2">
            Explore the Township
          </h1>
          <p className="text-[#5C5C72]">Click any image to view fullscreen</p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                activeCategory === cat
                  ? 'bg-[#1B4332] text-white'
                  : 'bg-white text-[#1B4332] border border-[#1B4332]/20 hover:border-[#1B4332]/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <button
              key={item.id}
              onClick={() => openLightbox(item.id)}
              className="group relative rounded-xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#C9A84C] bg-white shadow-sm"
            >
              <img
                src={item.src}
                alt={item.label}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                <p className="text-white text-xs font-semibold text-left">{item.label}</p>
                <p className="text-white/60 text-xs text-left">{item.category}</p>
              </div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">View</span>
              </div>
            </button>
          ))}
        </div>

        {/* Add more photos note */}
        <div className="mt-10 bg-white rounded-2xl border border-dashed border-[#1B4332]/30 p-6 text-center">
          <p className="text-[#5C5C72] text-sm">
            To add more photos or videos — copy image files to{' '}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono text-[#1B4332]">propity/public/images/</code>
            {' '}and add them to the list in{' '}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono text-[#1B4332]">app/(public)/gallery/page.tsx</code>
          </p>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && current && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-4 text-white p-2 rounded-full bg-white/10 hover:bg-white/20 z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="max-w-5xl w-full mx-16" onClick={e => e.stopPropagation()}>
            <img
              src={current.src}
              alt={current.label}
              className="w-full rounded-xl object-contain max-h-[75vh]"
            />
            <div className="flex justify-between items-start mt-4 px-1">
              <div>
                <p className="text-[#C9A84C] text-xs font-bold uppercase mb-1">{current.category}</p>
                <h3 className="text-white font-bold text-lg">{current.label}</h3>
                <p className="text-white/60 text-sm mt-1 max-w-xl">{current.desc}</p>
              </div>
              <div className="flex items-center gap-4 shrink-0 ml-4">
                <p className="text-white/40 text-sm">{currentIndex + 1} / {filtered.length}</p>
                <button onClick={closeLightbox} className="text-white/70 hover:text-white flex items-center gap-1 text-sm">
                  <X className="w-4 h-4" /> Close
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-4 text-white p-2 rounded-full bg-white/10 hover:bg-white/20 z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  )
}

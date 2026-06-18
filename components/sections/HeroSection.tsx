'use client'

import Link from 'next/link'
import { Phone, ArrowRight, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'

interface HeroSectionProps {
  availableCount: number
}

export default function HeroSection({ availableCount }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background — real aerial photo of the land */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.jpg"
          alt="17 Kani Residential Township — Aerial View"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay so text is readable */}
        <div className="absolute inset-0 bg-black/55" />
        {/* Gradient overlay bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#F8F5EF] to-transparent" />
      </div>

      {/* For Sale Badge */}
      <div className="absolute top-24 right-4 sm:right-8 z-10">
        <div className="flex items-center gap-2 bg-[#C9A84C] text-[#1A1A2E] px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#1A1A2E] animate-pulse" />
          FOR SALE
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <MapPin className="w-4 h-4 text-[#C9A84C]" />
            <span className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase">
              Laxmilunga · Agartala · Tripura
            </span>
          </div>

          {/* Tea Garden Badge */}
          <div className="inline-flex items-center gap-2 bg-[#C9A84C]/20 border border-[#C9A84C]/40 text-[#C9A84C] px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
            🌿 Surrounded by Tea Garden
          </div>

          <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl font-bold text-white leading-tight mb-4">
            17 Kani
            <br />
            <span className="text-[#C9A84C]">Residential Township</span>
          </h1>

          <p className="text-white/80 text-base font-semibold tracking-wide uppercase mb-2">
            2,93,760 Sq. Feet · 63 Plots
          </p>

          <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Strategically located right beside the <strong className="text-white">Western Bypass (under construction)</strong>.
            The Western Bypass will create a major connectivity corridor linking Lembucherra to Tripura University area,
            with the <strong className="text-white">Taj Vivanta 5-Star Hotel located in between</strong>.
          </p>

          {/* Stat chips */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              { label: '12 min', sub: 'Agartala' },
              { label: '13 min', sub: 'Airport' },
              { label: '5 min', sub: 'Lembucherra' },
              { label: '63', sub: 'Total Plots' },
            ].map(({ label, sub }) => (
              <div key={sub} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 text-center">
                <div className="text-[#C9A84C] font-bold text-lg">{label}</div>
                <div className="text-white/60 text-xs">{sub}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 bg-[#C9A84C] text-[#1A1A2E] font-bold px-8 py-4 rounded-xl text-lg hover:bg-[#E8C96A] transition-colors shadow-lg"
            >
              Book Your Plot <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/plots"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-white/20 transition-colors"
            >
              View Available Plots
              <span className="bg-[#C9A84C] text-[#1A1A2E] text-sm font-bold px-2 py-0.5 rounded-full">
                {availableCount}
              </span>
            </Link>
          </div>

          <div className="mt-6">
            <a
              href="tel:8132953235"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call: +91 81329 53235
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1">
          <motion.div
            className="w-1 h-2 bg-white/60 rounded-full"
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </div>
    </section>
  )
}

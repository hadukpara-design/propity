import Link from 'next/link'
import { Phone, MapPin, Mail, Home } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#1A1A2E] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#C9A84C] rounded-lg flex items-center justify-center">
                <Home className="w-4 h-4 text-[#1B4332]" strokeWidth={2.5} />
              </div>
              <span className="font-[family-name:var(--font-playfair)] text-xl font-bold text-white">Propity</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              17 Kani of premium residential land near Laxmilunga Special Planning Area, Agartala.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[['/', 'Home'], ['/plots', 'Browse Plots'], ['/book', 'Book a Plot'], ['/bookings', 'Bookings'], ['/location', 'Location'], ['/gallery', 'Gallery'], ['/blog', 'Blog'], ['/about', 'About']].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-[#C9A84C] transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Project Info */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Project</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>17 Kani Township</li>
              <li>63 Residential Plots</li>
              <li>Book at ₹1,00,000</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2 items-center">
                <Phone className="w-4 h-4 text-[#C9A84C] shrink-0" />
                <a href="tel:8132953235" className="hover:text-[#C9A84C] transition-colors">+91 81329 53235</a>
              </li>
              <li className="flex gap-2 items-center">
                <Mail className="w-4 h-4 text-[#C9A84C] shrink-0" />
                <a href="mailto:info@propity.in" className="hover:text-[#C9A84C] transition-colors">info@propity.in</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2025 Propity Realty. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-[#C9A84C] transition-colors">Privacy Policy</Link>
            <Link href="/about" className="hover:text-[#C9A84C] transition-colors">About Us</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

'use client'

import { MessageCircle } from 'lucide-react'

export default function WhatsAppFAB() {
  return (
    <a
      href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP || '918132953235'}?text=Hi%2C%20I%20am%20interested%20in%20Propity%20Realty%20plots%20in%20Laxmilunga%20Agartala`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-lg hover:bg-[#20BA5C] transition-all duration-200 hover:scale-105 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-5 h-5" fill="currentColor" />
      <span className="hidden sm:block text-sm font-semibold">WhatsApp</span>
    </a>
  )
}

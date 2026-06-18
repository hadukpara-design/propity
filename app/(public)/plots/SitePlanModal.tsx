'use client'

import { useState } from 'react'
import { X, ZoomIn } from 'lucide-react'

export default function SitePlanModal() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Thumbnail */}
      <div
        className="relative rounded-xl overflow-hidden border-2 border-[#1B4332]/20 cursor-zoom-in group"
        onClick={() => setOpen(true)}
      >
        <iframe
          src="/images/site-plan.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
          className="w-full h-64 md:h-96 pointer-events-none"
          title="Site Plan Layout"
        />
        {/* Zoom overlay */}
        <div className="absolute inset-0 bg-[#1B4332]/0 group-hover:bg-[#1B4332]/20 transition-colors flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2 shadow-lg">
            <ZoomIn className="w-4 h-4 text-[#1B4332]" />
            <span className="text-[#1B4332] text-sm font-bold">Click to zoom</span>
          </div>
        </div>
      </div>

      {/* Fullscreen modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <p className="font-bold text-[#1A1A2E] text-sm">Site Plan — 17 Kani Township, Lembucherra</p>
              <div className="flex items-center gap-2">
                <a
                  href="/images/site-plan.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-[#1B4332] text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-[#2D6A4F]"
                >
                  Download PDF
                </a>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
            <iframe
              src="/images/site-plan.pdf#toolbar=0&navpanes=0&view=FitH"
              className="w-full h-[75vh]"
              title="Site Plan Layout Fullscreen"
            />
          </div>
        </div>
      )}
    </>
  )
}

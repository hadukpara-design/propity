'use client'

import { useEffect, useRef, useState } from 'react'

interface ProgressBarProps {
  value: number
  max: number
  label?: string
  showPercent?: boolean
}

export default function ProgressBar({ value, max, label, showPercent = true }: ProgressBarProps) {
  const percent = Math.round((value / max) * 100)
  const [width, setWidth] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setWidth(percent), 100)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [percent])

  return (
    <div ref={ref} className="space-y-2">
      {label && (
        <div className="flex justify-between text-sm font-medium">
          <span>{label}</span>
          {showPercent && <span className="text-[#C9A84C] font-bold">{percent}%</span>}
        </div>
      )}
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${width}%`,
            background: 'linear-gradient(90deg, #1B4332, #2D6A4F)',
          }}
        />
      </div>
      <p className="text-xs text-[#5C5C72]">{value} of {max} plots booked</p>
    </div>
  )
}

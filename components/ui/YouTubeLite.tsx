'use client'

import { useState } from 'react'
import { Play } from 'lucide-react'
import { cn } from '@/lib/utils'

interface YouTubeLiteProps {
  id: string
  title: string
  vertical?: boolean
}

export default function YouTubeLite({ id, title, vertical = false }: YouTubeLiteProps) {
  const [playing, setPlaying] = useState(false)
  const [thumb, setThumb] = useState(`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`)

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl bg-black shadow-lg',
        vertical ? 'aspect-[9/16] mx-auto w-full max-w-sm' : 'aspect-video w-full'
      )}
    >
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 h-full w-full cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumb}
            alt=""
            loading="lazy"
            onError={() => setThumb(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`)}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#C9A84C] text-[#1A1A2E] shadow-xl transition-transform group-hover:scale-110 md:h-20 md:w-20">
            <Play className="ml-1 h-7 w-7 md:h-8 md:w-8" fill="currentColor" />
          </span>
          <span className="absolute inset-x-0 bottom-0 p-4 text-left text-sm font-semibold text-white md:text-base">
            {title}
          </span>
        </button>
      )}
    </div>
  )
}

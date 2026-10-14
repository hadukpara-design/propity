import YouTubeLite from '@/components/ui/YouTubeLite'
import { getPropertyVideos } from '@/lib/property-videos'
import { cn } from '@/lib/utils'

export default function VideoSection() {
  const videos = getPropertyVideos()
  if (videos.length === 0) return null

  return (
    <section aria-label="Property videos" className="pt-4 pb-10 md:py-14 px-4 bg-[#F8F5EF]">
      <div className="max-w-7xl mx-auto">
        <div
          className={cn(
            'grid gap-6',
            videos.length === 1 ? 'max-w-4xl mx-auto' : 'sm:grid-cols-2',
            videos.length > 2 && 'lg:grid-cols-3'
          )}
        >
          {videos.map(video => (
            <YouTubeLite key={video.id} id={video.id} title={video.title} vertical={video.vertical} />
          ))}
        </div>
      </div>
    </section>
  )
}

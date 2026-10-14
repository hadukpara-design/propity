export type PropertyVideo = {
  url: string
  title: string
}

// Add a YouTube link and a title for each video. Normal links, youtu.be links
// and Shorts links all work. While this list is empty the section stays hidden.
export const propertyVideos: PropertyVideo[] = []

export type ParsedVideo = {
  id: string
  title: string
  vertical: boolean
}

const VIDEO_ID = /^[A-Za-z0-9_-]{11}$/

export function parseYouTubeUrl(input: string): { id: string; vertical: boolean } | null {
  let url: URL
  try {
    url = new URL(input.trim())
  } catch {
    return null
  }

  const host = url.hostname.replace(/^(www\.|m\.)/, '')
  let id: string | null = null
  let vertical = false

  if (host === 'youtu.be') {
    id = url.pathname.slice(1).split('/')[0] || null
  } else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
    const [, kind, rest] = url.pathname.split('/')
    if (kind === 'watch') id = url.searchParams.get('v')
    else if (kind === 'shorts') { id = rest ?? null; vertical = true }
    else if (kind === 'embed' || kind === 'live' || kind === 'v') id = rest ?? null
  }

  return id && VIDEO_ID.test(id) ? { id, vertical } : null
}

export function getPropertyVideos(videos: PropertyVideo[] = propertyVideos): ParsedVideo[] {
  return videos.flatMap(video => {
    const parsed = parseYouTubeUrl(video.url)
    return parsed ? [{ ...parsed, title: video.title }] : []
  })
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Photo Gallery | 17 Kani Township, Laxmilunga, Agartala',
  description: 'Aerial views, site layout plans, and location maps of the 17 Kani Residential Township in Laxmilunga, Agartala.',
  keywords: ['17 Kani township photos', 'Laxmilunga site plan', 'Agartala plot gallery'],
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children
}

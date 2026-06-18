import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const now = new Date()

  return [
    { url: base, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${base}/plots`, lastModified: now, changeFrequency: 'hourly', priority: 0.9 },
    { url: `${base}/book`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/bookings`, lastModified: now, changeFrequency: 'hourly', priority: 0.7 },
    { url: `${base}/location`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/gallery`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ]
}

import { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/blog-posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://propity.in'
  const now = new Date()

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map(post => {
    const published = new Date(post.date)
    return {
      url: `${base}/blog/${post.slug}`,
      lastModified: Number.isNaN(published.getTime()) ? now : published,
      changeFrequency: 'monthly',
      priority: 0.5,
    }
  })

  return [
    { url: base, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${base}/plots`, lastModified: now, changeFrequency: 'hourly', priority: 0.9 },
    { url: `${base}/book`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/bookings`, lastModified: now, changeFrequency: 'hourly', priority: 0.7 },
    { url: `${base}/location`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${base}/gallery`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    ...blogEntries,
    { url: `${base}/privacy-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ]
}

import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const base = 'https://propity.in'
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/admin', '/login', '/api/'] },
    ],
    sitemap: `${base}/sitemap.xml`,
  }
}

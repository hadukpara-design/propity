import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  async redirects() {
    return [
      {
        source: '/blog/taj-vivanta-agartala-real-estate-impact',
        destination: '/blog/five-star-hotel-agartala-real-estate-impact',
        permanent: true,
      },
      // The site photos were shrunk and re-saved as JPEG; keep the old addresses working.
      ...[
        'aerial-land',
        'education-hub',
        'brochure-cover',
        'book-cta',
        'tuda-master-plan',
        'land-vs-flat',
        'five-star-hotel',
        'location-map',
        'site-plan-img',
      ].map(name => ({
        source: `/images/${name}.png`,
        destination: `/images/${name}.jpg`,
        permanent: true,
      })),
      {
        source: '/images/ipl-stadium.png',
        destination: '/images/ipl-stadium-under-construction.jpg',
        permanent: true,
      },
      {
        source: '/images/ipl-stadium.jpg',
        destination: '/images/ipl-stadium-under-construction.jpg',
        permanent: true,
      },
    ]
  },
}

export default nextConfig

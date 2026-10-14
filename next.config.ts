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
    ]
  },
}

export default nextConfig

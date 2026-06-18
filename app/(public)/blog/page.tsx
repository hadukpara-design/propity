import Link from 'next/link'
import { blogPosts } from '@/lib/blog-posts'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Propity Realty — Property Tips & Area News',
  description: 'Investment tips, area updates, and real estate insights for Agartala, Lembucherra, and Tripura.',
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#F8F5EF] pt-20">
      {/* Header */}
      <div className="bg-[#1B4332] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#C9A84C] text-xs font-bold tracking-widest uppercase mb-3">Propity Blog</p>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-white mb-4">
            Property Insights & Area News
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Investment tips, bypass updates, and real estate guides for Agartala and Lembucherra.
          </p>
        </div>
      </div>

      {/* Posts grid */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map(post => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Category bar */}
              <div className="bg-[#1B4332] px-5 py-2">
                <span className="text-[#C9A84C] text-xs font-bold tracking-widest uppercase">
                  {post.category}
                </span>
              </div>

              <div className="p-6">
                <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[#1A1A2E] mb-3 leading-snug group-hover:text-[#1B4332] transition-colors">
                  {post.title}
                </h2>
                <p className="text-[#5C5C72] text-sm leading-relaxed mb-5">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                  <span className="text-[#1B4332] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

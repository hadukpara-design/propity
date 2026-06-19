import { getBlogPost, blogPosts } from '@/lib/blog-posts'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, Phone } from 'lucide-react'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}
  return {
    title: `${post.title} | Propity Realty Blog`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const lines = post.content.trim().split('\n')

  return (
    <div className="min-h-screen bg-[#F8F5EF] pt-20">
      <div className="max-w-3xl mx-auto px-4 py-12">

        {/* Back */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-[#1B4332] font-semibold text-sm mb-8 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        {/* Header */}
        <div className="mb-8">
          <span className="inline-block bg-[#1B4332] text-[#C9A84C] text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4">
            {post.category}
          </span>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-[#1A1A2E] leading-tight mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 mb-10">
          <div className="prose prose-lg max-w-none">
            {lines.map((line, i) => {
              if (line.startsWith('## ')) return (
                <h2 key={i} className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#1A1A2E] mt-8 mb-4">{line.replace('## ', '')}</h2>
              )
              if (line.startsWith('### ')) return (
                <h3 key={i} className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[#1B4332] mt-6 mb-3">{line.replace('### ', '')}</h3>
              )
              if (line.startsWith('- ')) return (
                <li key={i} className="text-[#5C5C72] ml-4 mb-1">{line.replace('- ', '')}</li>
              )
              if (line.startsWith('| ') && line.includes('|')) return (
                <div key={i} className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse my-2">
                    <tbody>
                      <tr>
                        {line.split('|').filter(Boolean).map((cell, j) => (
                          <td key={j} className="border border-gray-200 px-3 py-2 text-[#1A1A2E]">{cell.trim()}</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              )
              if (line.trim() === '' || line.startsWith('|---')) return <div key={i} className="mb-2" />
              if (line.startsWith('*') && line.endsWith('*')) return (
                <p key={i} className="text-[#1B4332] font-semibold italic text-sm mt-6 border-l-4 border-[#C9A84C] pl-4">{line.replace(/\*/g, '')}</p>
              )
              return (
                <p key={i} className="text-[#5C5C72] leading-relaxed mb-3">{line}</p>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#1B4332] rounded-2xl p-6 md:p-8 text-center">
          <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-white mb-2">
            Interested in Buying a Plot?
          </h3>
          <p className="text-white/70 mb-6 text-sm">
            17 Kani Township · 63 Residential Plots · Laxmilunga, Agartala
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/book"
              className="bg-[#C9A84C] text-[#1A1A2E] font-bold px-6 py-3 rounded-xl hover:bg-[#E8C96A] transition-colors"
            >
              Book Your Plot →
            </Link>
            <a
              href="tel:8132953235"
              className="flex items-center gap-2 text-white border border-white/30 px-6 py-3 rounded-xl hover:bg-white/10 transition-colors font-semibold"
            >
              <Phone className="w-4 h-4" /> +91 81329 53235
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}

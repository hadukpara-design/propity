import { createAdminClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'
import { MessageSquare, Phone } from 'lucide-react'

async function getEnquiries() {
  const supabase = await createAdminClient()
  const { data } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false })
  return data ?? []
}

export default async function AdminEnquiriesPage() {
  const enquiries = await getEnquiries()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#1A1A2E]">Enquiries</h1>
        <span className="bg-[#1B4332] text-white text-sm font-bold px-3 py-1 rounded-full">{enquiries.length} total</span>
      </div>

      {enquiries.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center border border-gray-100">
          <MessageSquare className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-[#5C5C72]">No enquiries yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-xs text-[#5C5C72] uppercase tracking-wider">
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Source</th>
                <th className="px-4 py-3 text-left">Message</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {enquiries.map((e: { id: number; name: string; phone: string; email: string | null; source: string | null; message: string | null; created_at: string }) => (
                <tr key={e.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium">{e.name}</td>
                  <td className="px-4 py-3">
                    <a href={`tel:${e.phone}`} className="text-[#1B4332] hover:underline">{e.phone}</a>
                  </td>
                  <td className="px-4 py-3 text-[#5C5C72]">{e.email || '—'}</td>
                  <td className="px-4 py-3">
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">{e.source || 'website'}</span>
                  </td>
                  <td className="px-4 py-3 text-[#5C5C72] max-w-xs truncate">{e.message || '—'}</td>
                  <td className="px-4 py-3 text-[#5C5C72]">{formatDate(e.created_at)}</td>
                  <td className="px-4 py-3">
                    <a
                      href={`https://wa.me/91${e.phone}?text=Hi%20${encodeURIComponent(e.name)}%2C%20thank%20you%20for%20your%20interest%20in%20Propity%20Realty`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#25D366] text-white text-xs px-2 py-1 rounded-lg font-semibold inline-flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3" /> WhatsApp
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

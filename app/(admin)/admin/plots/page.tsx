import { createAdminClient } from '@/lib/supabase/server'
import AdminPlotsClient from './AdminPlotsClient'

async function getPlots() {
  const supabase = await createAdminClient()
  const { data } = await supabase.from('plots').select('*').order('plot_number')
  return data ?? []
}

export default async function AdminPlotsPage() {
  const plots = await getPlots()

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1A1A2E] mb-2">Manage Plots</h1>
      <p className="text-[#5C5C72] text-sm mb-6">Click any plot to change its status</p>
      <AdminPlotsClient initialPlots={plots} />
    </div>
  )
}

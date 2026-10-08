import { NextResponse } from 'next/server'
import { createClient as createSessionClient } from '@/lib/supabase/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const PUBLIC_COLUMNS = 'id, plot_number, ganda_size, area_sqft, status, price_lakhs'
const STATUSES = ['available', 'reserved', 'booked']

export async function GET() {
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json([])
  }

  const { createClient } = await import('@supabase/supabase-js')
  const supabase = createClient(supabaseUrl, supabaseKey)

  const { data, error } = await supabase
    .from('plots')
    .select(PUBLIC_COLUMNS)
    .order('plot_number')

  if (error) {
    console.error('Plots fetch error:', error)
    return NextResponse.json({ error: 'Failed to load plots' }, { status: 500 })
  }
  return NextResponse.json(data)
}

export async function PATCH(req: Request) {
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  }

  const session = await createSessionClient()
  const { data: { user } } = await session.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { id?: unknown; status?: unknown }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const { id, status } = body ?? {}
  if (!Number.isInteger(id) || typeof status !== 'string' || !STATUSES.includes(status)) {
    return NextResponse.json({ error: 'Invalid plot id or status' }, { status: 400 })
  }

  const { createClient } = await import('@supabase/supabase-js')
  const supabase = createClient(supabaseUrl, supabaseKey)

  const { data, error } = await supabase
    .from('plots')
    .update({ status })
    .eq('id', id as number)
    .select()
    .single()

  if (error) {
    console.error('Plot update error:', error)
    return NextResponse.json({ error: 'Failed to update plot' }, { status: 500 })
  }
  return NextResponse.json(data)
}

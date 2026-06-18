import { NextRequest, NextResponse } from 'next/server'
import { enquirySchema } from '@/lib/validations'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export async function POST(req: NextRequest) {
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  }

  try {
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(supabaseUrl, supabaseKey)

    const body = await req.json()
    const data = enquirySchema.parse(body)

    const { error } = await supabase.from('enquiries').insert({
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      message: data.message || null,
      source: data.source || 'website',
    })

    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}

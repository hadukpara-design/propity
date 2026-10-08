import { NextRequest, NextResponse } from 'next/server'
import { bookingSchema } from '@/lib/validations'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export async function POST(req: NextRequest) {
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: 'Database not configured. Please call us at +91 81329 53235 to book.' }, { status: 503 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const parsed = bookingSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Please check your details' }, { status: 400 })
  }
  const data = parsed.data

  try {
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Claim the plot in a single conditional update so two simultaneous
    // bookings can never both succeed for the same plot.
    const { data: claimed, error: claimError } = await supabase
      .from('plots')
      .update({ status: 'booked' })
      .eq('plot_number', data.plot_number)
      .eq('status', 'available')
      .select('id')

    if (claimError) throw claimError

    if (!claimed || claimed.length === 0) {
      const { data: existing } = await supabase
        .from('plots')
        .select('id')
        .eq('plot_number', data.plot_number)
        .maybeSingle()
      return existing
        ? NextResponse.json({ error: 'This plot is no longer available' }, { status: 409 })
        : NextResponse.json({ error: 'Plot not found' }, { status: 404 })
    }

    const plot = claimed[0]

    const { error: bookingError } = await supabase.from('bookings').insert({
      plot_id: plot.id,
      plot_number: data.plot_number,
      customer_name: data.customer_name,
      customer_phone: data.customer_phone,
      customer_email: data.customer_email || null,
      customer_city: data.customer_city || null,
      message: data.message || null,
      booking_amount: 100000,
      status: 'confirmed',
    })

    if (bookingError) {
      await supabase.from('plots').update({ status: 'available' }).eq('id', plot.id)
      throw bookingError
    }

    return NextResponse.json({ success: true, plot_number: data.plot_number })
  } catch (err: unknown) {
    console.error('Booking error:', err)
    return NextResponse.json(
      { error: 'Booking could not be completed. Please call us at +91 81329 53235.' },
      { status: 500 }
    )
  }
}

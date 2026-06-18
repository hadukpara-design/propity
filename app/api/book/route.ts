import { NextRequest, NextResponse } from 'next/server'
import { bookingSchema } from '@/lib/validations'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export async function POST(req: NextRequest) {
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: 'Database not configured. Please call us at +91 81329 53235 to book.' }, { status: 503 })
  }

  try {
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(supabaseUrl, supabaseKey)

    const body = await req.json()
    const data = bookingSchema.parse(body)

    const { data: plot, error: plotError } = await supabase
      .from('plots')
      .select('id, status, ganda_size')
      .eq('plot_number', data.plot_number)
      .single()

    if (plotError || !plot) {
      return NextResponse.json({ error: 'Plot not found' }, { status: 404 })
    }
    if (plot.status !== 'available') {
      return NextResponse.json({ error: 'This plot is no longer available' }, { status: 409 })
    }

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

    if (bookingError) throw bookingError

    const { error: updateError } = await supabase
      .from('plots')
      .update({ status: 'booked' })
      .eq('id', plot.id)

    if (updateError) throw updateError

    return NextResponse.json({ success: true, plot_number: data.plot_number })
  } catch (err: unknown) {
    console.error('Booking error:', err)
    const message = err instanceof Error ? err.message : 'Booking failed'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}

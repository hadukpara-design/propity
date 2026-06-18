import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { bookingSchema } from '@/lib/validations'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = bookingSchema.parse(body)

    // Check plot is still available
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

    // Insert booking
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

    // Update plot status to booked
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

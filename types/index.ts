export type PlotStatus = 'available' | 'booked' | 'reserved'
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled'
export type PlotFacing = 'north' | 'south' | 'east' | 'west' | 'corner'

export interface Plot {
  id: number
  plot_number: number
  ganda_size: number
  area_sqft: number | null
  status: PlotStatus
  price_lakhs: number
  facing: PlotFacing | null
  notes: string | null
  created_at: string
}

export interface Booking {
  id: number
  plot_id: number | null
  plot_number: number
  customer_name: string
  customer_phone: string
  customer_email: string | null
  customer_city: string | null
  message: string | null
  booking_amount: number
  status: BookingStatus
  booked_by: string | null
  created_at: string
  plots?: Plot
}

export interface Enquiry {
  id: number
  name: string
  phone: string
  email: string | null
  message: string | null
  source: string | null
  created_at: string
}

export interface PublicBooking {
  customer_name: string
  plot_number: number
  customer_city: string | null
  created_at: string
}

import { z } from 'zod'

export const bookingSchema = z.object({
  customer_name: z.string().min(2, 'Name must be at least 2 characters'),
  customer_phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  customer_email: z.string().email('Invalid email').optional().or(z.literal('')),
  customer_city: z.string().optional(),
  plot_number: z.number({ message: 'Please select a plot' }).int().positive(),
  message: z.string().optional(),
})

export const enquirySchema = z.object({
  name: z.string().min(2, 'Name required'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  message: z.string().optional(),
  source: z.string().optional(),
})

export type BookingFormData = z.infer<typeof bookingSchema>
export type EnquiryFormData = z.infer<typeof enquirySchema>

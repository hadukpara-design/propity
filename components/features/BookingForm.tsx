'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { bookingSchema, type BookingFormData } from '@/lib/validations'
import type { Plot } from '@/types'
import Button from '@/components/ui/Button'
import { IndianRupee, User, Phone, Mail, MapPin, MessageSquare, Home } from 'lucide-react'

interface BookingFormProps {
  availablePlots: Plot[]
}

export default function BookingForm({ availablePlots }: BookingFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const preselectedPlot = searchParams.get('plot')
  const [loading, setLoading] = useState(false)
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null)

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      plot_number: preselectedPlot ? parseInt(preselectedPlot) : undefined,
    },
  })

  const watchedPlotNumber = watch('plot_number')

  useEffect(() => {
    if (watchedPlotNumber) {
      const plot = availablePlots.find(p => p.plot_number === Number(watchedPlotNumber))
      setSelectedPlot(plot || null)
    }
  }, [watchedPlotNumber, availablePlots])

  useEffect(() => {
    if (preselectedPlot) {
      setValue('plot_number', parseInt(preselectedPlot))
    }
  }, [preselectedPlot, setValue])

  async function onSubmit(data: BookingFormData) {
    setLoading(true)
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await res.json()
      if (!res.ok) throw new Error(result.error || 'Booking failed')
      toast.success('Booking confirmed!')
      router.push(`/book/success?name=${encodeURIComponent(data.customer_name)}&plot=${data.plot_number}`)
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Booking summary */}
      {selectedPlot && (
        <div className="bg-[#1B4332] rounded-xl p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Home className="w-4 h-4 text-[#C9A84C]" />
            <span className="text-sm font-semibold text-[#C9A84C]">Selected Plot</span>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="text-xl font-bold">Plot #{selectedPlot.plot_number}</p>
              <p className="text-white/60 text-sm">{selectedPlot.ganda_size} Ganda</p>
            </div>
            <div className="text-right">
            </div>
          </div>
        </div>
      )}

      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-[#1A1A2E] mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            {...register('customer_name')}
            placeholder="Your full name"
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] text-sm"
          />
        </div>
        {errors.customer_name && <p className="text-red-500 text-xs mt-1">{errors.customer_name.message}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-[#1A1A2E] mb-1">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            {...register('customer_phone')}
            type="tel"
            placeholder="10-digit mobile number"
            maxLength={10}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] text-sm"
          />
        </div>
        {errors.customer_phone && <p className="text-red-500 text-xs mt-1">{errors.customer_phone.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-[#1A1A2E] mb-1">Email (optional)</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            {...register('customer_email')}
            type="email"
            placeholder="your@email.com"
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] text-sm"
          />
        </div>
      </div>

      {/* City */}
      <div>
        <label className="block text-sm font-medium text-[#1A1A2E] mb-1">City / Town (optional)</label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            {...register('customer_city')}
            placeholder="e.g. Agartala, Delhi, Kolkata"
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] text-sm"
          />
        </div>
      </div>

      {/* Plot selector */}
      <div>
        <label className="block text-sm font-medium text-[#1A1A2E] mb-1">
          Select Plot <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select
            {...register('plot_number', { valueAsNumber: true })}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] text-sm bg-white"
          >
            <option value="">Choose a plot (1–63)...</option>
            {availablePlots.length > 0
              ? availablePlots.map(p => (
                  <option key={p.id} value={p.plot_number}>
                    Plot #{p.plot_number} — {p.ganda_size} Ganda
                  </option>
                ))
              : Array.from({ length: 63 }, (_, i) => i + 1).map(n => (
                  <option key={n} value={n}>
                    Plot #{n}
                  </option>
                ))
            }
          </select>
        </div>
        {errors.plot_number && <p className="text-red-500 text-xs mt-1">{errors.plot_number.message}</p>}
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-[#1A1A2E] mb-1">Message (optional)</label>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <textarea
            {...register('message')}
            rows={3}
            placeholder="Any questions or preferences..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] text-sm resize-none"
          />
        </div>
      </div>

      {/* Info */}
      <div className="bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-lg p-3 flex items-start gap-2">
        <IndianRupee className="w-4 h-4 text-[#C9A84C] mt-0.5 shrink-0" />
        <p className="text-xs text-[#5C5C72]">
          Our team will contact you within 2 hours to guide you through the payment process.
        </p>
      </div>

      <Button type="submit" variant="gold" size="lg" disabled={loading} className="w-full">
        {loading ? 'Processing...' : 'Confirm Booking →'}
      </Button>
    </form>
  )
}

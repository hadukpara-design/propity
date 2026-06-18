import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  label?: string
  title: string
  subtitle?: string
  centered?: boolean
  light?: boolean
  className?: string
}

export default function SectionHeader({ label, title, subtitle, centered = false, light = false, className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-10', centered && 'text-center', className)}>
      {label && (
        <span className={cn(
          'inline-block text-xs font-bold tracking-[0.2em] uppercase mb-3 px-3 py-1 rounded-full',
          light ? 'text-[#C9A84C] bg-[#C9A84C]/10' : 'text-[#C9A84C] bg-[#C9A84C]/10'
        )}>
          {label}
        </span>
      )}
      <h2 className={cn(
        'text-3xl md:text-4xl font-bold leading-tight',
        light ? 'text-white' : 'text-[#1A1A2E]',
        'font-[family-name:var(--font-playfair)]'
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn('mt-3 text-base md:text-lg max-w-2xl', centered && 'mx-auto', light ? 'text-gray-300' : 'text-[#5C5C72]')}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

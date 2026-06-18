import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold'
  size?: 'sm' | 'md' | 'lg'
}

const variantStyles = {
  primary: 'bg-[#1B4332] text-white hover:bg-[#2D6A4F] focus:ring-[#1B4332]',
  secondary: 'bg-[#C9A84C] text-[#1A1A2E] hover:bg-[#E8C96A] focus:ring-[#C9A84C]',
  gold: 'bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] text-[#1A1A2E] font-bold hover:from-[#E8C96A] hover:to-[#C9A84C]',
  outline: 'border-2 border-[#1B4332] text-[#1B4332] hover:bg-[#1B4332] hover:text-white',
  ghost: 'text-[#1B4332] hover:bg-[#1B4332]/10',
}

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-8 py-3.5 text-lg',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'
export default Button

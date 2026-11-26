import { Loader2 } from 'lucide-react'

const VARIANTS = {
  primary: 'bg-pepper text-on-pepper hover:bg-pepper-hover',
  dark: 'bg-ink text-bg hover:opacity-90',
  secondary: 'bg-surface text-ink border border-line hover:border-ink',
  ghost: 'text-ink hover:bg-sunk',
}

const SIZES = {
  sm: 'h-9 px-3 text-sm gap-1.5',
  md: 'h-11 px-4 text-[15px] gap-2',
  lg: 'h-13 px-6 text-base gap-2',
}

export default function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  loading = false,
  className = '',
  children,
  disabled,
  ...props
}) {
  const isButton = Component === 'button'
  return (
    <Component
      className={`inline-flex items-center ${className.includes('justify-') ? '' : 'justify-center'} rounded-lg font-semibold whitespace-nowrap transition disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      disabled={isButton ? disabled || loading : undefined}
      type={isButton ? props.type ?? 'button' : undefined}
      {...props}
    >
      {loading && <Loader2 className="size-4 animate-spin" aria-hidden />}
      {children}
    </Component>
  )
}

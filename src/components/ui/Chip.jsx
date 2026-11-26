export default function Chip({ active = false, className = '', children, ...props }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={`h-10 shrink-0 rounded-full border px-4 text-sm font-medium transition-colors ${
        active
          ? 'border-ink bg-ink text-bg'
          : 'border-line bg-surface text-ink hover:border-ink/30'
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

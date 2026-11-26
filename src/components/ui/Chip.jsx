export default function Chip({ active = false, className = '', children, ...props }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={`inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg border px-3 text-sm font-medium transition-colors ${
        active ? 'border-ink bg-ink text-bg' : 'border-line bg-surface text-ink hover:border-ink'
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

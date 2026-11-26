const TONES = {
  neutral: 'bg-sunk text-ink',
  pepper: 'bg-pepper-soft text-pepper',
  leaf: 'bg-leaf-soft text-leaf',
  solid: 'bg-ink text-bg',
}

export default function Badge({ tone = 'neutral', icon: Icon, className = '', children }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold ${TONES[tone]} ${className}`}>
      {Icon && <Icon className="size-3.5" aria-hidden />}
      {children}
    </span>
  )
}

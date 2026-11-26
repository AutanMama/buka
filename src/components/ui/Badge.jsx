const TONES = {
  neutral: 'bg-sunk text-ink',
  pepper: 'bg-pepper-soft text-pepper',
  palm: 'bg-palm text-on-palm',
  leaf: 'bg-leaf-soft text-leaf',
}

export default function Badge({ tone = 'neutral', icon: Icon, className = '', children }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${TONES[tone]} ${className}`}
    >
      {Icon && <Icon className="size-3.5" aria-hidden />}
      {children}
    </span>
  )
}

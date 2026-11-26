import { motion } from 'framer-motion'
import { Bike, Check, ChefHat, ClipboardCheck, Home } from 'lucide-react'

const ICONS = { confirmed: ClipboardCheck, preparing: ChefHat, 'on-the-way': Bike, delivered: Home }

export default function TrackingTimeline({ stages, currentIndex }) {
  return (
    <ol className="space-y-0">
      {stages.map((stage, i) => {
        const done = i < currentIndex
        const current = i === currentIndex
        const Icon = done ? Check : ICONS[stage.id]
        const isLast = i === stages.length - 1
        return (
          <li key={stage.id} className="relative flex gap-4 pb-7 last:pb-0">
            {!isLast && (
              <span className="absolute top-10 bottom-0 left-5 w-0.5 -translate-x-1/2 bg-line" aria-hidden>
                <motion.span
                  className="block w-full bg-leaf"
                  initial={false}
                  animate={{ height: done ? '100%' : '0%' }}
                  transition={{ duration: 0.5 }}
                />
              </span>
            )}
            <span
              className={`relative grid size-10 shrink-0 place-items-center rounded-full transition-colors ${
                done ? 'bg-leaf text-surface' : current ? 'bg-pepper text-on-pepper' : 'bg-sunk text-muted'
              }`}
            >
              {current && !isLast && <span className="absolute inset-0 animate-ping rounded-full bg-pepper opacity-30" aria-hidden />}
              <Icon className="relative size-5" aria-hidden />
            </span>
            <div className="pt-1.5">
              <p className={`font-semibold ${!done && !current ? 'text-muted' : ''}`}>
                {stage.label}
                {current && <span className="sr-only"> (current step)</span>}
              </p>
              {(done || current) && <p className="text-sm text-muted">{stage.detail}</p>}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

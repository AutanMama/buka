import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, Trash2 } from 'lucide-react'

export default function QuantityStepper({ value, onIncrement, onDecrement, min = 0, label = 'item', size = 'md' }) {
  const height = size === 'sm' ? 'h-8' : 'h-11'
  const btn = size === 'sm' ? 'w-8' : 'w-11'
  const showTrash = min === 0 && value === 1

  return (
    <div className={`inline-flex items-center rounded-lg border border-line bg-surface ${height}`}>
      <button
        type="button"
        onClick={onDecrement}
        disabled={value <= min}
        aria-label={showTrash ? `Remove ${label}` : `Decrease ${label}`}
        className={`grid h-full ${btn} place-items-center rounded-l-lg text-ink hover:bg-sunk disabled:opacity-40`}
      >
        {showTrash ? <Trash2 className="size-4" /> : <Minus className="size-4" />}
      </button>
      <span className="relative w-7 overflow-hidden text-center text-sm font-semibold tabular-nums" aria-live="polite">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            className="block"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </span>
      <button
        type="button"
        onClick={onIncrement}
        aria-label={`Increase ${label}`}
        className={`grid h-full ${btn} place-items-center rounded-r-lg text-ink hover:bg-sunk`}
      >
        <Plus className="size-4" />
      </button>
    </div>
  )
}

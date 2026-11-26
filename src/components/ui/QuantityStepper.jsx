import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, Trash2 } from 'lucide-react'

export default function QuantityStepper({ value, onIncrement, onDecrement, min = 0, label = 'item', size = 'md' }) {
  const box = size === 'sm' ? 'h-8 text-sm' : 'h-10'
  const btn = size === 'sm' ? 'size-8' : 'size-10'
  const showTrash = min === 0 && value === 1

  return (
    <div className={`inline-flex items-center rounded-full bg-sunk ${box}`}>
      <button
        type="button"
        onClick={onDecrement}
        disabled={value <= min}
        aria-label={showTrash ? `Remove ${label}` : `Decrease ${label}`}
        className={`grid ${btn} place-items-center rounded-full text-ink hover:bg-line disabled:opacity-40`}
      >
        {showTrash ? <Trash2 className="size-4" /> : <Minus className="size-4" />}
      </button>
      <span className="relative w-7 overflow-hidden text-center font-semibold tabular-nums" aria-live="polite">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            className="block"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
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
        className={`grid ${btn} place-items-center rounded-full text-ink hover:bg-line`}
      >
        <Plus className="size-4" />
      </button>
    </div>
  )
}

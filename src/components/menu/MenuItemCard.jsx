import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import Photo from '../ui/Photo'
import QuantityStepper from '../ui/QuantityStepper'
import { formatPrice } from '../../lib/format'

export default function MenuItemCard({ item, quantity, disabled, onOpen, onQuickAdd, onChangeQuantity }) {
  const hasOptions = Boolean(item.options?.length)
  const showStepper = !hasOptions && quantity > 0

  return (
    <article
      className={`relative flex gap-4 rounded-card border bg-surface p-3 transition-colors ${
        quantity > 0 ? 'border-ink' : 'border-line hover:border-muted/50'
      }`}
    >
      <button type="button" onClick={onOpen} className="flex min-w-0 flex-1 flex-col items-start py-1 pl-1 text-left" aria-label={`View ${item.name}`}>
        <h4 className="font-semibold">
          {quantity > 0 && <span className="mr-1.5 text-pepper tabular-nums">{quantity}×</span>}
          {item.name}
        </h4>
        <p className="mt-1 line-clamp-2 text-sm text-muted">{item.description}</p>
        <p className="mt-auto flex items-center gap-2 pt-3 text-[15px] font-semibold">
          {formatPrice(item.price)}
          {item.popular && <span className="text-xs font-semibold text-pepper">Popular</span>}
        </p>
      </button>

      <div className="relative shrink-0">
        <Photo src={item.image} alt={item.name} className="size-28 rounded-lg sm:size-32" />
        <div className="absolute right-1.5 bottom-1.5">
          <AnimatePresence mode="wait" initial={false}>
            {showStepper ? (
              <motion.div key="stepper" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}>
                <div className="rounded-lg shadow-md">
                  <QuantityStepper
                    size="sm"
                    value={quantity}
                    label={item.name}
                    onIncrement={() => onChangeQuantity(quantity + 1)}
                    onDecrement={() => onChangeQuantity(quantity - 1)}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.button
                key="add"
                type="button"
                disabled={disabled}
                onClick={hasOptions ? onOpen : onQuickAdd}
                whileTap={{ scale: 0.88 }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                aria-label={`Add ${item.name}`}
                className="grid size-9 place-items-center rounded-lg bg-surface text-ink shadow-md hover:bg-sunk disabled:opacity-50"
              >
                <Plus className="size-5" strokeWidth={2.25} aria-hidden />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </article>
  )
}

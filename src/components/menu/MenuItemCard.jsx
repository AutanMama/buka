import { AnimatePresence, motion } from 'framer-motion'
import { Flame, Plus } from 'lucide-react'
import DishArt from './DishArt'
import Badge from '../ui/Badge'
import QuantityStepper from '../ui/QuantityStepper'
import { formatPrice } from '../../lib/format'

export default function MenuItemCard({ item, quantity, disabled, onOpen, onQuickAdd, onChangeQuantity }) {
  const hasOptions = Boolean(item.options?.length)
  const showStepper = !hasOptions && quantity > 0

  return (
    <article className="flex gap-4 rounded-card border border-line bg-surface p-3 sm:p-4">
      <button
        type="button"
        onClick={onOpen}
        className="flex min-w-0 flex-1 flex-col items-start text-left"
        aria-label={`View ${item.name}`}
      >
        {item.popular && (
          <Badge tone="pepper" icon={Flame} className="mb-2">
            Popular
          </Badge>
        )}
        <h4 className="font-semibold">{item.name}</h4>
        <p className="mt-1 line-clamp-2 text-sm text-muted">{item.description}</p>
        <p className="mt-auto pt-3 font-display text-lg font-semibold">
          {formatPrice(item.price)}
          {hasOptions && <span className="ml-1 font-sans text-xs font-normal text-muted">+ options</span>}
        </p>
      </button>

      <div className="relative shrink-0">
        <div className="grid size-28 place-items-center rounded-2xl bg-sunk sm:size-32">
          <DishArt kind={item.art} image={item.image} alt={item.name} className="size-24 sm:size-28" />
        </div>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
          <AnimatePresence mode="wait" initial={false}>
            {showStepper ? (
              <motion.div key="stepper" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }}>
                <div className="rounded-full bg-surface shadow-card">
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
                whileTap={{ scale: 0.9 }}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                aria-label={`Add ${item.name}`}
                className="flex h-9 items-center gap-1 rounded-full bg-pepper px-4 text-sm font-semibold text-on-pepper shadow-card hover:bg-pepper-hover disabled:opacity-50"
              >
                <Plus className="size-4" aria-hidden />
                {quantity > 0 ? quantity : 'Add'}
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </article>
  )
}

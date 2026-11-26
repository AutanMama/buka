import { motion } from 'framer-motion'
import DishArt from '../menu/DishArt'
import QuantityStepper from '../ui/QuantityStepper'
import { formatPrice } from '../../lib/format'

export default function CartLine({ line, onChangeQuantity, readOnly = false }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16, height: 0, marginTop: 0 }}
      transition={{ duration: 0.2 }}
      className="flex gap-3"
    >
      <div className="grid size-16 shrink-0 place-items-center rounded-2xl bg-sunk">
        <DishArt kind={line.art} className="size-13" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="font-semibold">
            {readOnly && <span className="text-muted">{line.quantity}× </span>}
            {line.name}
          </p>
          <p className="font-semibold tabular-nums">{formatPrice(line.unitPrice * line.quantity)}</p>
        </div>
        {line.details && <p className="mt-0.5 text-xs text-muted">{line.details}</p>}
        {line.note && <p className="mt-0.5 text-xs text-muted italic">“{line.note}”</p>}
        {!readOnly && (
          <div className="mt-2">
            <QuantityStepper
              size="sm"
              value={line.quantity}
              label={line.name}
              onIncrement={() => onChangeQuantity(line.quantity + 1)}
              onDecrement={() => onChangeQuantity(line.quantity - 1)}
            />
          </div>
        )}
      </div>
    </motion.li>
  )
}

import { motion } from 'framer-motion'
import Photo from '../ui/Photo'
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
      <Photo src={line.image} alt="" className="size-14 shrink-0 rounded-lg" />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[15px] font-medium">
            {readOnly && <span className="text-muted tabular-nums">{line.quantity}× </span>}
            {line.name}
          </p>
          <p className="text-[15px] font-medium tabular-nums">{formatPrice(line.unitPrice * line.quantity)}</p>
        </div>
        {line.details && <p className="mt-0.5 text-sm text-muted">{line.details}</p>}
        {line.note && <p className="mt-0.5 text-sm text-muted">Note: {line.note}</p>}
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

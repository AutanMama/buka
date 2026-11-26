import { AnimatePresence, motion } from 'framer-motion'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../lib/format'

// Sticky "View order" bar for phones, shown on menu pages.
export default function MobileCartBar({ restaurantId }) {
  const { restaurant, count, totals, openCart } = useCart()
  const visible = count > 0 && restaurant?.id === restaurantId

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg p-3 sm:hidden"
        >
          <button
            type="button"
            onClick={openCart}
            className="flex h-13 w-full items-center justify-between rounded-lg bg-pepper px-4 font-semibold text-on-pepper"
          >
            <span className="tabular-nums">
              {count} {count === 1 ? 'item' : 'items'}
            </span>
            View order
            <span className="tabular-nums">{formatPrice(totals.subtotal)}</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

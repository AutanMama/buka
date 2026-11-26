import { AnimatePresence, motion } from 'framer-motion'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../lib/format'

// Sticky "View cart" bar for phones, shown on menu pages.
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
          transition={{ type: 'spring', damping: 26, stiffness: 300 }}
          className="fixed inset-x-0 bottom-0 z-30 p-4 sm:hidden"
        >
          <button
            type="button"
            onClick={openCart}
            className="flex h-14 w-full items-center justify-between rounded-full bg-pepper px-5 font-semibold text-on-pepper shadow-2xl"
          >
            <span className="grid size-7 place-items-center rounded-full bg-on-pepper/20 text-sm">{count}</span>
            View cart
            <span className="tabular-nums">{formatPrice(totals.subtotal)}</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

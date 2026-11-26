import { motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../lib/format'

export default function CartButton() {
  const { count, totals, bump, openCart } = useCart()
  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={`Open cart, ${count} ${count === 1 ? 'item' : 'items'}`}
      className="flex h-10 items-center gap-2 rounded-lg bg-ink px-3.5 text-sm font-semibold text-bg"
    >
      <ShoppingBag className="size-4" aria-hidden />
      {count > 0 ? (
        <motion.span
          key={bump}
          initial={{ y: -6, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 22 }}
          className="tabular-nums"
        >
          {count}
          <span className="hidden sm:inline"> · {formatPrice(totals.subtotal)}</span>
        </motion.span>
      ) : (
        <span className="hidden sm:inline">Cart</span>
      )}
    </button>
  )
}

import { motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '../../context/CartContext'

export default function CartButton() {
  const { count, bump, openCart } = useCart()
  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={`Open cart, ${count} ${count === 1 ? 'item' : 'items'}`}
      className="relative flex h-10 items-center gap-2 rounded-full bg-ink px-4 text-sm font-semibold text-bg"
    >
      <ShoppingBag className="size-4" aria-hidden />
      <span className="hidden sm:inline">Cart</span>
      {count > 0 && (
        <motion.span
          key={bump}
          initial={{ scale: 0.6 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 15 }}
          className="grid min-w-5 place-items-center rounded-full bg-palm px-1.5 text-xs font-bold text-on-palm"
        >
          {count}
        </motion.span>
      )}
    </button>
  )
}

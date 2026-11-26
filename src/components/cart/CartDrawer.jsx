import { useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ShoppingBag, X } from 'lucide-react'
import CartLine from './CartLine'
import CartSummary from './CartSummary'
import Overlay from '../ui/Overlay'
import Button from '../ui/Button'
import EmptyState from '../ui/EmptyState'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../lib/format'

export default function CartDrawer() {
  const { isOpen, closeCart, restaurant, lines, totals, setQuantity, clear } = useCart()
  const navigate = useNavigate()

  function goTo(path) {
    closeCart()
    navigate(path)
  }

  return (
    <Overlay open={isOpen} onClose={closeCart} label="Your cart" variant="drawer">
      <header className="flex items-start justify-between border-b border-line px-5 py-4">
        <div>
          <h2 className="text-2xl">Your order</h2>
          {restaurant && <p className="mt-0.5 text-sm text-muted">{restaurant.name}</p>}
        </div>
        <button type="button" onClick={closeCart} aria-label="Close cart" className="grid size-10 place-items-center rounded-lg hover:bg-sunk">
          <X className="size-5" />
        </button>
      </header>

      {lines.length === 0 ? (
        <div className="flex flex-1 items-center justify-center">
          <EmptyState
            icon={ShoppingBag}
            title="Your cart is empty"
            action={
              <Button variant="secondary" onClick={() => goTo('/')}>
                Browse restaurants
              </Button>
            }
          >
            Add something from any restaurant to get started.
          </EmptyState>
        </div>
      ) : (
        <>
          <ul className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
            <AnimatePresence initial={false}>
              {lines.map((line) => (
                <CartLine key={line.key} line={line} onChangeQuantity={(q) => setQuantity(line.key, q)} />
              ))}
            </AnimatePresence>
            <li>
              <button type="button" onClick={clear} className="text-sm text-muted underline underline-offset-4 hover:text-ink">
                Clear cart
              </button>
            </li>
          </ul>
          <footer className="space-y-4 border-t border-line bg-surface px-5 py-5">
            <CartSummary totals={totals} />
            <Button size="lg" className="w-full justify-between" onClick={() => goTo('/checkout')}>
              <span>Go to checkout</span>
              <span className="tabular-nums">{formatPrice(totals.total)}</span>
            </Button>
          </footer>
        </>
      )}
    </Overlay>
  )
}

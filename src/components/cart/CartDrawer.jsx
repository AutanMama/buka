import { useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ShoppingBag, X } from 'lucide-react'
import CartLine from './CartLine'
import CartSummary from './CartSummary'
import Overlay from '../ui/Overlay'
import Button from '../ui/Button'
import EmptyState from '../ui/EmptyState'
import { useCart } from '../../context/CartContext'

export default function CartDrawer() {
  const { isOpen, closeCart, restaurant, lines, totals, setQuantity, clear } = useCart()
  const navigate = useNavigate()

  function goTo(path) {
    closeCart()
    navigate(path)
  }

  return (
    <Overlay open={isOpen} onClose={closeCart} label="Your cart" variant="drawer">
      <header className="flex items-center justify-between border-b border-line px-5 py-4">
        <div>
          <h2 className="text-xl font-bold">Your order</h2>
          {restaurant && <p className="text-sm text-muted">from {restaurant.name}</p>}
        </div>
        <button type="button" onClick={closeCart} aria-label="Close cart" className="grid size-10 place-items-center rounded-full hover:bg-sunk">
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
            Add something tasty from any restaurant to get started.
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
              <button type="button" onClick={clear} className="text-sm font-medium text-muted underline-offset-4 hover:text-ink hover:underline">
                Clear cart
              </button>
            </li>
          </ul>
          <footer className="space-y-4 border-t border-line bg-surface px-5 py-5">
            <CartSummary totals={totals} />
            <Button size="lg" className="w-full" onClick={() => goTo('/checkout')}>
              Go to checkout
            </Button>
          </footer>
        </>
      )}
    </Overlay>
  )
}

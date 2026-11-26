import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react'
import { cartTotals, describeSelections, lineKey, unitPrice } from '../lib/cart'
import { load, save } from '../lib/storage'

const CartContext = createContext(null)
const KEY = 'buka-cart-v2'

const EMPTY = { restaurant: null, lines: [] }

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      const { restaurant, line } = action
      // A cart holds one restaurant. Adding from another one starts fresh.
      const base = state.restaurant?.id === restaurant.id ? state : { restaurant, lines: [] }
      const existing = base.lines.find((l) => l.key === line.key)
      const lines = existing
        ? base.lines.map((l) => (l.key === line.key ? { ...l, quantity: l.quantity + line.quantity } : l))
        : [...base.lines, line]
      return { restaurant, lines }
    }
    case 'setQuantity': {
      const lines = state.lines
        .map((l) => (l.key === action.key ? { ...l, quantity: action.quantity } : l))
        .filter((l) => l.quantity > 0)
      return lines.length ? { ...state, lines } : EMPTY
    }
    case 'removeOne': {
      const target = state.lines.findLast((l) => l.itemId === action.itemId)
      if (!target) return state
      return reducer(state, { type: 'setQuantity', key: target.key, quantity: target.quantity - 1 })
    }
    case 'clear':
      return EMPTY
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, EMPTY, () => load(KEY, EMPTY))
  const [isOpen, setOpen] = useState(false)
  const [bump, setBump] = useState(0)

  useEffect(() => {
    save(KEY, state)
  }, [state])

  const addItem = useCallback((restaurant, item, { selections = {}, quantity = 1, note = '' } = {}) => {
    const { id, name, deliveryFee } = restaurant
    dispatch({
      type: 'add',
      restaurant: { id, name, deliveryFee },
      line: {
        key: lineKey(item.id, selections) + (note ? `|note:${note}` : ''),
        itemId: item.id,
        name: item.name,
        image: item.image,
        details: describeSelections(item, selections),
        note,
        unitPrice: unitPrice(item, selections),
        quantity,
      },
    })
    setBump((n) => n + 1)
  }, [])

  const setQuantity = useCallback((key, quantity) => dispatch({ type: 'setQuantity', key, quantity }), [])
  const removeOne = useCallback((itemId) => dispatch({ type: 'removeOne', itemId }), [])
  const clear = useCallback(() => dispatch({ type: 'clear' }), [])
  const openCart = useCallback(() => setOpen(true), [])
  const closeCart = useCallback(() => setOpen(false), [])

  const value = useMemo(() => {
    const count = state.lines.reduce((n, l) => n + l.quantity, 0)
    const totals = cartTotals(state.lines, state.restaurant?.deliveryFee ?? 0)
    const quantityOf = (itemId) => state.lines.filter((l) => l.itemId === itemId).reduce((n, l) => n + l.quantity, 0)
    return {
      ...state,
      count,
      totals,
      bump,
      isOpen,
      quantityOf,
      addItem,
      setQuantity,
      removeOne,
      clear,
      openCart,
      closeCart,
    }
  }, [state, bump, isOpen, addItem, setQuantity, removeOne, clear, openCart, closeCart])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}

import { load, save } from './storage'

const KEY = 'buka-orders'

export function saveOrder(order) {
  save(KEY, { ...load(KEY, {}), [order.id]: order })
}

export function findOrder(id) {
  return load(KEY, {})[id] ?? null
}

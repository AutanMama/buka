import { restaurants } from '../data/restaurants'
import { menus } from '../data/menus'

// Mock API. The delay is there so loading states are visible.
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const latency = () => 500 + Math.random() * 600

export async function getRestaurants() {
  await wait(latency())
  return restaurants
}

export async function getRestaurant(id) {
  await wait(latency())
  const restaurant = restaurants.find((r) => r.id === id)
  if (!restaurant) throw new Error('Restaurant not found')
  return { ...restaurant, menu: menus[id] ?? [] }
}

export async function placeOrder(order) {
  await wait(1200)
  return {
    ...order,
    id: `BK-${Date.now().toString(36).toUpperCase().slice(-6)}`,
    placedAt: Date.now(),
  }
}

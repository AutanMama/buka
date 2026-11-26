import { useEffect, useState } from 'react'

// Demo timings in seconds, shortened so the whole journey plays in about a minute.
export const STAGES = [
  { id: 'confirmed', label: 'Order confirmed', detail: 'The kitchen has your order.', at: 0 },
  { id: 'preparing', label: 'Preparing', detail: 'Your food is on the fire.', at: 8 },
  { id: 'on-the-way', label: 'Rider on the way', detail: 'Musa picked up your order.', at: 22 },
  { id: 'delivered', label: 'Delivered', detail: 'Enjoy your meal!', at: 60 },
]

const RIDE_START = STAGES[2].at
const RIDE_END = STAGES[3].at

export function useOrderTracking(placedAt) {
  const [now, setNow] = useState(() => Date.now())
  const elapsed = Math.max(0, (now - placedAt) / 1000)
  const done = elapsed >= RIDE_END

  useEffect(() => {
    if (done) return
    const timer = setInterval(() => setNow(Date.now()), 250)
    return () => clearInterval(timer)
  }, [done])

  const stageIndex = STAGES.reduce((idx, stage, i) => (elapsed >= stage.at ? i : idx), 0)
  const rideProgress = Math.min(1, Math.max(0, (elapsed - RIDE_START) / (RIDE_END - RIDE_START)))
  const secondsLeft = Math.max(0, Math.ceil(RIDE_END - elapsed))

  return { stageIndex, stage: STAGES[stageIndex], rideProgress, secondsLeft, done }
}

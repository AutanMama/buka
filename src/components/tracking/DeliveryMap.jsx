import { Bike, Home, Store } from 'lucide-react'

// Route from the kitchen to the customer, in SVG coordinates.
const ROUTE = [
  [60, 210],
  [60, 140],
  [170, 140],
  [170, 70],
  [340, 70],
]

const BLOCKS = [
  [80, 160, 70, 60],
  [190, 90, 60, 40],
  [190, 160, 130, 60],
  [270, 90, 50, 40],
  [10, 20, 140, 100],
  [190, 10, 160, 40],
  [340, 90, 50, 130],
]

function pointAlong(route, t) {
  const segments = route.slice(1).map((p, i) => {
    const [x1, y1] = route[i]
    return { from: route[i], to: p, length: Math.hypot(p[0] - x1, p[1] - y1) }
  })
  const total = segments.reduce((sum, s) => sum + s.length, 0)
  let remaining = t * total
  for (const s of segments) {
    if (remaining <= s.length) {
      const k = s.length ? remaining / s.length : 0
      return [s.from[0] + (s.to[0] - s.from[0]) * k, s.from[1] + (s.to[1] - s.from[1]) * k]
    }
    remaining -= s.length
  }
  return route[route.length - 1]
}

function Pin({ x, y, icon: Icon, className }) {
  return (
    <foreignObject x={x - 18} y={y - 18} width="36" height="36">
      <div className={`grid size-9 place-items-center rounded-full border-2 border-surface shadow-card ${className}`}>
        <Icon className="size-4" aria-hidden />
      </div>
    </foreignObject>
  )
}

export default function DeliveryMap({ progress, riding }) {
  const [rx, ry] = pointAlong(ROUTE, progress)
  const path = ROUTE.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ')

  return (
    <div className="overflow-hidden rounded-card border border-line bg-surface">
      <svg viewBox="0 0 400 230" className="block w-full" role="img" aria-label={`Delivery map, rider ${Math.round(progress * 100)}% of the way`}>
        <rect width="400" height="230" className="fill-sunk" />
        {BLOCKS.map(([x, y, w, h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} rx="8" className={i === 4 ? 'fill-leaf-soft' : 'fill-bg'} />
        ))}
        <path d={path} fill="none" className="stroke-line" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d={path} fill="none" className="stroke-pepper" strokeWidth="3" strokeDasharray="2 8" strokeLinecap="round" />
        <Pin x={ROUTE[0][0]} y={ROUTE[0][1]} icon={Store} className="bg-ink text-bg" />
        <Pin x={ROUTE.at(-1)[0]} y={ROUTE.at(-1)[1]} icon={Home} className="bg-leaf text-surface" />
        {riding && <Pin x={rx} y={ry} icon={Bike} className="bg-pepper text-on-pepper" />}
      </svg>
    </div>
  )
}

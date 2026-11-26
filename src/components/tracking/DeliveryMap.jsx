import { Bike, Home, Store } from 'lucide-react'

// Route from the kitchen to the customer, in SVG coordinates.
const ROUTE = [
  [70, 205],
  [70, 135],
  [190, 135],
  [190, 65],
  [345, 65],
]

const STREETS = [
  'M0 135 H400',
  'M0 65 H400',
  'M70 0 V230',
  'M190 0 V230',
  'M300 0 V230',
  'M0 205 H400',
]

const PARKS = [[85, 150, 90, 40]]

function pointAlong(route, t) {
  const segments = route.slice(1).map((p, i) => ({ from: route[i], to: p, length: Math.hypot(p[0] - route[i][0], p[1] - route[i][1]) }))
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

function routeLength(route) {
  return route.slice(1).reduce((sum, p, i) => sum + Math.hypot(p[0] - route[i][0], p[1] - route[i][1]), 0)
}

function Pin({ x, y, icon: Icon, className }) {
  return (
    <foreignObject x={x - 16} y={y - 16} width="32" height="32">
      <div className={`grid size-8 place-items-center rounded-full border-2 border-surface shadow-md ${className}`}>
        <Icon className="size-4" aria-hidden />
      </div>
    </foreignObject>
  )
}

export default function DeliveryMap({ progress, riding }) {
  const [rx, ry] = pointAlong(ROUTE, progress)
  const path = ROUTE.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ')
  const length = routeLength(ROUTE)

  return (
    <div className="overflow-hidden rounded-card border border-line">
      <svg viewBox="0 0 400 230" className="block w-full" role="img" aria-label={`Delivery map, rider ${Math.round(progress * 100)}% of the way`}>
        <rect width="400" height="230" className="fill-sunk" />
        {PARKS.map(([x, y, w, h]) => (
          <rect key={x} x={x} y={y} width={w} height={h} rx="4" className="fill-leaf-soft" />
        ))}
        {STREETS.map((d) => (
          <path key={d} d={d} className="stroke-surface" strokeWidth="12" fill="none" />
        ))}
        <path d={path} fill="none" className="stroke-muted/40" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d={path}
          fill="none"
          className="stroke-pepper"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={length}
          strokeDashoffset={length * (1 - progress)}
        />
        <Pin x={ROUTE[0][0]} y={ROUTE[0][1]} icon={Store} className="bg-ink text-bg" />
        <Pin x={ROUTE.at(-1)[0]} y={ROUTE.at(-1)[1]} icon={Home} className="bg-surface text-ink" />
        {riding && <Pin x={rx} y={ry} icon={Bike} className="bg-pepper text-on-pepper" />}
      </svg>
    </div>
  )
}

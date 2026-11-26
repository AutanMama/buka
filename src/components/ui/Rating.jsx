import { Star } from 'lucide-react'

export default function Rating({ value, count }) {
  return (
    <span className="inline-flex items-center gap-1 text-sm font-semibold">
      <Star className="size-3.5 fill-star text-star" aria-hidden />
      {value.toFixed(1)}
      {count != null && <span className="font-normal text-muted">({count.toLocaleString()})</span>}
      <span className="sr-only">out of 5</span>
    </span>
  )
}

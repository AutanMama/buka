import { ChevronDown, Clock, Truck } from 'lucide-react'
import Chip from '../ui/Chip'
import { SORT_OPTIONS } from '../../data/restaurants'

export default function FilterBar({ filters, setFilter }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <label className="relative">
        <span className="sr-only">Sort by</span>
        <select
          value={filters.sort}
          onChange={(e) => setFilter('sort', e.target.value)}
          className="h-9 appearance-none rounded-lg border border-line bg-surface pr-8 pl-3 text-sm font-medium text-ink hover:border-ink focus:border-ink focus:outline-none"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-muted" aria-hidden />
      </label>
      <Chip active={filters.open} onClick={() => setFilter('open', !filters.open)}>
        <Clock className="size-4" aria-hidden /> Open now
      </Chip>
      <Chip active={filters.free} onClick={() => setFilter('free', !filters.free)}>
        <Truck className="size-4" aria-hidden /> Free delivery
      </Chip>
    </div>
  )
}

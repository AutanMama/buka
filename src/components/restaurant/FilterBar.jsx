import { useEffect, useState } from 'react'
import { Search, X } from 'lucide-react'
import Chip from '../ui/Chip'
import { CUISINES, SORT_OPTIONS } from '../../data/restaurants'

function SearchInput({ value, onChange }) {
  const [text, setText] = useState(value)

  // Keep in sync when filters are reset from outside.
  useEffect(() => {
    setText(value)
  }, [value])

  // Debounce so the URL isn't rewritten on every keystroke.
  useEffect(() => {
    if (text === value) return
    const id = setTimeout(() => onChange(text), 250)
    return () => clearTimeout(id)
  }, [text, value, onChange])

  return (
    <label className="relative block flex-1">
      <span className="sr-only">Search restaurants</span>
      <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted" aria-hidden />
      <input
        type="search"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search jollof, suya, Calabar Pot…"
        className="h-12 w-full rounded-full border border-line bg-surface pr-11 pl-12 text-ink placeholder:text-muted focus:border-pepper focus:outline-none"
      />
      {text && (
        <button
          type="button"
          onClick={() => setText('')}
          aria-label="Clear search"
          className="absolute top-1/2 right-2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-muted hover:bg-sunk"
        >
          <X className="size-4" />
        </button>
      )}
    </label>
  )
}

function Toggle({ checked, onChange, children }) {
  return (
    <Chip active={checked} onClick={() => onChange(!checked)}>
      {children}
    </Chip>
  )
}

export default function FilterBar({ filters, setFilter }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <SearchInput value={filters.q} onChange={(v) => setFilter('q', v)} />
        <label className="relative">
          <span className="sr-only">Sort by</span>
          <select
            value={filters.sort}
            onChange={(e) => setFilter('sort', e.target.value)}
            className="h-12 w-full appearance-none rounded-full border border-line bg-surface pr-10 pl-5 text-sm font-medium text-ink focus:border-pepper focus:outline-none sm:w-56"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.id} value={o.id}>
                Sort: {o.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute top-1/2 right-5 -translate-y-1/2 text-muted" aria-hidden>
            ▾
          </span>
        </label>
      </div>

      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 no-scrollbar sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filters">
        {CUISINES.map((c) => (
          <Chip key={c.id} active={filters.cuisine === c.id} onClick={() => setFilter('cuisine', c.id)}>
            {c.label}
          </Chip>
        ))}
        <span className="mx-1 w-px shrink-0 self-stretch bg-line" aria-hidden />
        <Toggle checked={filters.open} onChange={(v) => setFilter('open', v)}>
          Open now
        </Toggle>
        <Toggle checked={filters.free} onChange={(v) => setFilter('free', v)}>
          Free delivery
        </Toggle>
      </div>
    </div>
  )
}

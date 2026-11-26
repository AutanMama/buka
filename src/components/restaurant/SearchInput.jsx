import { useEffect, useState } from 'react'
import { Search, X } from 'lucide-react'

export default function SearchInput({ value, onChange }) {
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
    <label className="relative block">
      <span className="sr-only">Search restaurants and dishes</span>
      <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted" aria-hidden />
      <input
        type="search"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search for a restaurant or dish"
        className="h-13 w-full rounded-xl border border-line bg-sunk pr-12 pl-12 text-[15px] text-ink placeholder:text-muted focus:border-ink focus:bg-surface focus:outline-none"
      />
      {text && (
        <button
          type="button"
          onClick={() => setText('')}
          aria-label="Clear search"
          className="absolute top-1/2 right-2.5 grid size-8 -translate-y-1/2 place-items-center rounded-md text-muted hover:bg-line"
        >
          <X className="size-4" />
        </button>
      )}
    </label>
  )
}

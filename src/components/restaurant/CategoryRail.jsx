import { LayoutGrid } from 'lucide-react'
import Photo from '../ui/Photo'

export default function CategoryRail({ categories, active, onSelect }) {
  return (
    <div className="-mx-5 overflow-x-auto px-4 no-scrollbar sm:-mx-1 sm:px-0" role="group" aria-label="Cuisine">
      <ul className="flex gap-5 p-1">
        {categories.map((c) => {
          const isActive = active === c.id
          return (
            <li key={c.id}>
              <button
                type="button"
                aria-pressed={isActive}
                onClick={() => onSelect(c.id)}
                className="group flex w-[72px] flex-col items-center gap-2"
              >
                <span
                  className={`grid size-[72px] place-items-center overflow-hidden rounded-full ring-2 ring-offset-2 ring-offset-bg transition ${
                    isActive ? 'ring-pepper' : 'ring-transparent group-hover:ring-line'
                  }`}
                >
                  {c.image ? (
                    <Photo src={c.image} alt="" className="size-full rounded-full" />
                  ) : (
                    <span className="grid size-full place-items-center rounded-full bg-sunk">
                      <LayoutGrid className="size-6 text-ink" strokeWidth={1.75} aria-hidden />
                    </span>
                  )}
                </span>
                <span className={`text-sm ${isActive ? 'font-semibold text-ink' : 'text-muted'}`}>{c.label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

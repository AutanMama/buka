import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

// Horizontal tabs on small screens, a sticky side list from `lg` up.
export default function MenuTabs({ categories, active, onSelect }) {
  const listRef = useRef(null)

  useEffect(() => {
    const list = listRef.current
    const el = list?.querySelector(`[data-id="${CSS.escape(active)}"]`)
    if (!list || !el || list.scrollWidth <= list.clientWidth) return
    list.scrollTo({ left: el.offsetLeft - list.clientWidth / 2 + el.clientWidth / 2, behavior: 'smooth' })
  }, [active])

  return (
    <nav
      aria-label="Menu categories"
      className="sticky top-16 z-30 -mx-4 border-b border-line bg-bg px-4 sm:mx-0 sm:px-0 lg:top-24 lg:border-0 lg:bg-transparent"
    >
      <p className="mb-3 hidden text-xs font-semibold tracking-wider text-muted uppercase lg:block">Menu</p>
      <ul ref={listRef} className="flex gap-6 overflow-x-auto no-scrollbar lg:flex-col lg:gap-1">
        {categories.map((name) => {
          const isActive = name === active
          return (
            <li key={name} data-id={name} className="relative shrink-0">
              <button
                type="button"
                onClick={() => onSelect(name)}
                aria-current={isActive ? 'true' : undefined}
                className={`relative py-3.5 text-[15px] whitespace-nowrap transition-colors lg:w-full lg:rounded-lg lg:px-3 lg:py-2 lg:text-left ${
                  isActive ? 'font-semibold text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="menu-tab"
                    className="absolute inset-x-0 -bottom-px h-0.5 bg-ink lg:inset-0 lg:h-auto lg:rounded-lg lg:bg-sunk"
                    transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                  />
                )}
                <span className="relative">{name}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

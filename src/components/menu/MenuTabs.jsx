import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function MenuTabs({ categories, active, onSelect }) {
  const listRef = useRef(null)

  // Keep the active tab visible on small screens.
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-id="${active}"]`)
    if (el) el.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
  }, [active])

  return (
    <nav className="sticky top-16 z-30 -mx-4 border-b border-line bg-bg/90 px-4 backdrop-blur-md sm:mx-0 sm:px-0" aria-label="Menu categories">
      <ul ref={listRef} className="flex gap-1 overflow-x-auto py-2 no-scrollbar">
        {categories.map((name) => {
          const isActive = name === active
          return (
            <li key={name} data-id={name}>
              <button
                type="button"
                onClick={() => onSelect(name)}
                aria-current={isActive ? 'true' : undefined}
                className={`relative h-10 rounded-full px-4 text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive ? 'text-bg' : 'text-muted hover:text-ink'
                }`}
              >
                {isActive && (
                  <motion.span layoutId="menu-tab" className="absolute inset-0 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
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

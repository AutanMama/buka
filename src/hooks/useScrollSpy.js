import { useEffect, useState } from 'react'

// Tracks which section is under the sticky header while scrolling.
export default function useScrollSpy(ids, offset = 140) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    if (!ids.length) return
    setActive(ids[0])
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.dataset.section)
      },
      { rootMargin: `-${offset}px 0px -55% 0px` },
    )
    ids.forEach((id) => {
      const el = document.querySelector(`[data-section="${CSS.escape(id)}"]`)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids, offset])

  return [active, setActive]
}

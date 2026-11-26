import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

const DEFAULTS = { q: '', cuisine: 'all', sort: 'recommended', open: false, free: false }

// Filters live in the URL so results can be shared and survive a refresh.
export function useRestaurantFilters() {
  const [params, setParams] = useSearchParams()

  const filters = useMemo(
    () => ({
      q: params.get('q') ?? DEFAULTS.q,
      cuisine: params.get('cuisine') ?? DEFAULTS.cuisine,
      sort: params.get('sort') ?? DEFAULTS.sort,
      open: params.get('open') === '1',
      free: params.get('free') === '1',
    }),
    [params],
  )

  const setFilter = useCallback(
    (key, value) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          const isDefault = value === DEFAULTS[key] || value === '' || value === false
          if (isDefault) next.delete(key)
          else next.set(key, value === true ? '1' : value)
          return next
        },
        { replace: true },
      )
    },
    [setParams],
  )

  const reset = useCallback(() => setParams({}, { replace: true }), [setParams])

  const activeCount = ['cuisine', 'open', 'free', 'q'].filter((k) => filters[k] !== DEFAULTS[k]).length

  return { filters, setFilter, reset, activeCount }
}

export function applyFilters(list, { q, cuisine, sort, open, free }) {
  const term = q.trim().toLowerCase()
  const result = list.filter(
    (r) =>
      (cuisine === 'all' || r.cuisine === cuisine) &&
      (!open || r.isOpen) &&
      (!free || r.deliveryFee === 0) &&
      (!term || `${r.name} ${r.tagline} ${r.area}`.toLowerCase().includes(term)),
  )

  const sorters = {
    rating: (a, b) => b.rating - a.rating,
    fastest: (a, b) => a.etaMin - b.etaMin,
    fee: (a, b) => a.deliveryFee - b.deliveryFee,
    recommended: (a, b) => Number(b.isOpen) - Number(a.isOpen) || b.rating * Math.log(b.reviews) - a.rating * Math.log(a.reviews),
  }
  return [...result].sort(sorters[sort] ?? sorters.recommended)
}

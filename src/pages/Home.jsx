import { useMemo } from 'react'
import { AnimatePresence } from 'framer-motion'
import { SearchX, WifiOff } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'
import HomeHero from '../components/restaurant/HomeHero'
import FilterBar from '../components/restaurant/FilterBar'
import RestaurantCard from '../components/restaurant/RestaurantCard'
import RestaurantCardSkeleton from '../components/restaurant/RestaurantCardSkeleton'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import useAsync from '../hooks/useAsync'
import { applyFilters, useRestaurantFilters } from '../hooks/useRestaurantFilters'
import { getRestaurants } from '../lib/api'

export default function Home() {
  const { status, data, retry } = useAsync(getRestaurants, [])
  const { filters, setFilter, reset, activeCount } = useRestaurantFilters()
  const results = useMemo(() => (data ? applyFilters(data, filters) : []), [data, filters])

  return (
    <PageTransition>
      <HomeHero />
      <FilterBar filters={filters} setFilter={setFilter} />

      <div className="mt-8 mb-4 flex items-baseline justify-between">
        <h2 className="text-2xl font-bold">Restaurants near you</h2>
        {status === 'success' && (
          <p className="text-sm text-muted" aria-live="polite">
            {results.length} {results.length === 1 ? 'place' : 'places'}
            {activeCount > 0 && (
              <>
                {' · '}
                <button type="button" onClick={reset} className="font-semibold text-pepper hover:underline">
                  Clear filters
                </button>
              </>
            )}
          </p>
        )}
      </div>

      {status === 'error' && (
        <EmptyState icon={WifiOff} title="Couldn’t load restaurants" action={<Button onClick={retry}>Try again</Button>}>
          Check your connection and try again.
        </EmptyState>
      )}

      {status === 'success' && results.length === 0 && (
        <EmptyState icon={SearchX} title="No matches" action={<Button variant="secondary" onClick={reset}>Clear filters</Button>}>
          Nothing fits those filters right now. Try another cuisine or turn off a filter.
        </EmptyState>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-busy={status === 'loading'}>
        {status === 'loading' && Array.from({ length: 6 }, (_, i) => <RestaurantCardSkeleton key={i} />)}
        <AnimatePresence mode="popLayout">
          {status === 'success' && results.map((r) => <RestaurantCard key={r.id} restaurant={r} />)}
        </AnimatePresence>
      </div>
    </PageTransition>
  )
}

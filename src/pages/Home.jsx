import { useMemo } from 'react'
import { AnimatePresence } from 'framer-motion'
import { SearchX, WifiOff } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'
import CategoryRail from '../components/restaurant/CategoryRail'
import FilterBar from '../components/restaurant/FilterBar'
import SearchInput from '../components/restaurant/SearchInput'
import RestaurantCard from '../components/restaurant/RestaurantCard'
import RestaurantCardSkeleton from '../components/restaurant/RestaurantCardSkeleton'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import useAsync from '../hooks/useAsync'
import { applyFilters, useRestaurantFilters } from '../hooks/useRestaurantFilters'
import { CUISINES } from '../data/restaurants'
import { getRestaurants } from '../lib/api'

function greeting(hour = new Date().getHours()) {
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function Home() {
  const { status, data, retry } = useAsync(getRestaurants, [])
  const { filters, setFilter, reset, activeCount } = useRestaurantFilters()
  const results = useMemo(() => (data ? applyFilters(data, filters) : []), [data, filters])
  const cuisineLabel = CUISINES.find((c) => c.id === filters.cuisine)?.label

  return (
    <PageTransition>
      <section className="pt-8 sm:pt-12">
        <p className="text-muted">{greeting()}</p>
        <h1 className="mt-1 text-4xl sm:text-6xl">What are you eating today?</h1>
        <div className="mt-6 max-w-2xl">
          <SearchInput value={filters.q} onChange={(v) => setFilter('q', v)} />
        </div>
      </section>

      <section className="mt-8">
        <CategoryRail categories={CUISINES} active={filters.cuisine} onSelect={(id) => setFilter('cuisine', id)} />
      </section>

      <div className="mt-10 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl">{filters.cuisine === 'all' ? 'All restaurants' : cuisineLabel}</h2>
          {status === 'success' && (
            <p className="mt-1 text-sm text-muted" aria-live="polite">
              {results.length} {results.length === 1 ? 'place' : 'places'} delivering to Wuse 2
              {activeCount > 0 && (
                <>
                  {' · '}
                  <button type="button" onClick={reset} className="font-medium text-ink underline underline-offset-4">
                    Clear filters
                  </button>
                </>
              )}
            </p>
          )}
        </div>
        <FilterBar filters={filters} setFilter={setFilter} />
      </div>

      {status === 'error' && (
        <EmptyState icon={WifiOff} title="Couldn’t load restaurants" action={<Button onClick={retry}>Try again</Button>}>
          Check your connection and try again.
        </EmptyState>
      )}

      {status === 'success' && results.length === 0 && (
        <EmptyState
          icon={SearchX}
          title="No matches"
          action={
            <Button variant="secondary" onClick={reset}>
              Clear filters
            </Button>
          }
        >
          Nothing fits those filters right now. Try another cuisine or turn off a filter.
        </EmptyState>
      )}

      <div className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3" aria-busy={status === 'loading'}>
        {status === 'loading' && Array.from({ length: 6 }, (_, i) => <RestaurantCardSkeleton key={i} />)}
        <AnimatePresence mode="popLayout">
          {status === 'success' && results.map((r) => <RestaurantCard key={r.id} restaurant={r} />)}
        </AnimatePresence>
      </div>
    </PageTransition>
  )
}

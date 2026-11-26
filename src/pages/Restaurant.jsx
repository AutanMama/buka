import { useCallback, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UtensilsCrossed } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'
import RestaurantBanner, { RestaurantBannerSkeleton } from '../components/restaurant/RestaurantBanner'
import MenuTabs from '../components/menu/MenuTabs'
import MenuItemCard from '../components/menu/MenuItemCard'
import MenuSkeleton from '../components/menu/MenuSkeleton'
import ItemSheet from '../components/menu/ItemSheet'
import MobileCartBar from '../components/cart/MobileCartBar'
import Button from '../components/ui/Button'
import ConfirmDialog from '../components/ui/ConfirmDialog'
import EmptyState from '../components/ui/EmptyState'
import { useCart } from '../context/CartContext'
import useAsync from '../hooks/useAsync'
import useScrollSpy from '../hooks/useScrollSpy'
import { getRestaurant } from '../lib/api'

function sectionFor(name) {
  return document.querySelector(`[data-section="${CSS.escape(name)}"]`)
}

export default function Restaurant() {
  const { id } = useParams()
  const { status, data: restaurant, retry } = useAsync(() => getRestaurant(id), [id])
  const cart = useCart()
  const [openItem, setOpenItem] = useState(null)
  const [pending, setPending] = useState(null)

  const categories = useMemo(() => restaurant?.menu.map((s) => s.category) ?? [], [restaurant])
  const [activeTab, setActiveTab] = useScrollSpy(categories)

  const selectTab = useCallback(
    (name) => {
      setActiveTab(name)
      sectionFor(name)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    },
    [setActiveTab],
  )

  // Adding from a second restaurant asks first, because the cart holds one restaurant.
  function add(item, options) {
    if (cart.restaurant && cart.restaurant.id !== restaurant.id && cart.count > 0) {
      setPending({ item, options })
      return
    }
    cart.addItem(restaurant, item, options)
    setOpenItem(null)
  }

  function confirmSwitch() {
    cart.clear()
    cart.addItem(restaurant, pending.item, pending.options)
    setPending(null)
    setOpenItem(null)
  }

  if (status === 'error') {
    return (
      <PageTransition>
        <EmptyState
          icon={UtensilsCrossed}
          title="We couldn’t find that restaurant"
          action={
            <Button variant="secondary" onClick={retry}>
              Try again
            </Button>
          }
        >
          It may have moved or the link is wrong.
        </EmptyState>
      </PageTransition>
    )
  }

  if (status === 'loading') {
    return (
      <PageTransition>
        <RestaurantBannerSkeleton />
        <MenuSkeleton />
      </PageTransition>
    )
  }

  const closed = !restaurant.isOpen

  return (
    <PageTransition>
      <RestaurantBanner restaurant={restaurant} />

      <div className="mt-8">
        <MenuTabs categories={categories} active={activeTab} onSelect={selectTab} />
        {restaurant.menu.map((section) => (
          <section key={section.category} data-section={section.category} className="scroll-mt-32 pt-8">
            <h2 className="mb-4 text-2xl font-bold">{section.category}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {section.items.map((item) => {
                const quantity = cart.restaurant?.id === restaurant.id ? cart.quantityOf(item.id) : 0
                return (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    disabled={closed}
                    quantity={quantity}
                    onOpen={() => setOpenItem(item)}
                    onQuickAdd={() => add(item)}
                    onChangeQuantity={(q) => (q > quantity ? add(item) : cart.removeOne(item.id))}
                  />
                )
              })}
            </div>
          </section>
        ))}
      </div>

      <ItemSheet item={openItem} disabled={closed} onAdd={(options) => add(openItem, options)} onClose={() => setOpenItem(null)} />

      <ConfirmDialog
        open={Boolean(pending)}
        title="Start a new order?"
        confirmLabel="Start new order"
        onConfirm={confirmSwitch}
        onCancel={() => setPending(null)}
      >
        Your cart has items from <strong className="text-ink">{cart.restaurant?.name}</strong>. Starting an order from{' '}
        {restaurant.name} will clear it.
      </ConfirmDialog>

      <MobileCartBar restaurantId={restaurant.id} />
      <div className="h-20 sm:hidden" aria-hidden />
    </PageTransition>
  )
}

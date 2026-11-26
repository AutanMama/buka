import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Phone, ReceiptText } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'
import DeliveryMap from '../components/tracking/DeliveryMap'
import TrackingTimeline from '../components/tracking/TrackingTimeline'
import OrderSummary from '../components/checkout/OrderSummary'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import { STAGES, useOrderTracking } from '../hooks/useOrderTracking'
import { findOrder } from '../lib/orders'

function StatusHeadline({ done, stage, secondsLeft }) {
  if (done) return <>Delivered. Enjoy your meal!</>
  if (stage.id === 'on-the-way') return <>Arriving in {secondsLeft}s</>
  return <>{stage.label}…</>
}

function Tracker({ order }) {
  const { stageIndex, stage, rideProgress, secondsLeft, done } = useOrderTracking(order.placedAt)
  const riding = stage.id === 'on-the-way'

  return (
    <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1fr_380px]">
      <div className="space-y-6">
        <section className="rounded-card border border-line bg-surface p-5 sm:p-6">
          <p className="text-sm font-semibold text-muted">Order {order.id}</p>
          <motion.h1
            key={done ? 'done' : stage.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-4xl"
            aria-live="polite"
          >
            <StatusHeadline done={done} stage={stage} secondsLeft={secondsLeft} />
          </motion.h1>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-sunk">
            <motion.div
              className="h-full rounded-full bg-pepper"
              initial={false}
              animate={{ width: `${((stageIndex + (riding ? rideProgress : 0)) / (STAGES.length - 1)) * 100}%` }}
              transition={{ ease: 'linear', duration: 0.25 }}
            />
          </div>
        </section>

        <DeliveryMap progress={done ? 1 : rideProgress} riding={riding} />

        <section className="flex items-center gap-4 rounded-card border border-line bg-surface p-5">
          <div className="grid size-12 place-items-center rounded-full bg-sunk text-lg font-semibold text-ink">M</div>
          <div className="flex-1">
            <p className="font-semibold">Musa Abdullahi</p>
            <p className="text-sm text-muted">Your rider · Bajaj Boxer · ABJ 482 KL</p>
          </div>
          <Button variant="secondary" size="sm" aria-label="Call rider" disabled={done}>
            <Phone className="size-4" aria-hidden /> Call
          </Button>
        </section>
      </div>

      <div className="space-y-6">
        <section className="rounded-card border border-line bg-surface p-5 sm:p-6">
          <h2 className="mb-5 text-2xl">Progress</h2>
          <TrackingTimeline stages={STAGES} currentIndex={done ? STAGES.length : stageIndex} />
        </section>
        <OrderSummary restaurantName={order.restaurant.name} lines={order.lines} totals={order.totals}>
          {done && (
            <Button as={Link} to={`/restaurants/${order.restaurant.id}`} variant="secondary" className="mt-5 w-full">
              Order again
            </Button>
          )}
        </OrderSummary>
      </div>
    </div>
  )
}

export default function OrderTracking() {
  const { id } = useParams()
  const order = useMemo(() => findOrder(id), [id])

  return (
    <PageTransition>
      {order ? (
        <Tracker order={order} />
      ) : (
        <EmptyState
          icon={ReceiptText}
          title="Order not found"
          action={
            <Button as={Link} to="/">
              Back to restaurants
            </Button>
          }
        >
          We couldn’t find that order on this device.
        </EmptyState>
      )}
    </PageTransition>
  )
}

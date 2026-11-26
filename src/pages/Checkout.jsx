import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Banknote, CreditCard, Landmark, ShoppingBag } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'
import CheckoutSection from '../components/checkout/CheckoutSection'
import ChoiceCard from '../components/checkout/ChoiceCard'
import OrderSummary from '../components/checkout/OrderSummary'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import TextField from '../components/ui/TextField'
import { useCart } from '../context/CartContext'
import { placeOrder } from '../lib/api'
import { formatPrice } from '../lib/format'
import { saveOrder } from '../lib/orders'
import { validateCheckout } from '../lib/validation'

const SLOTS = ['12:00 – 12:30', '12:30 – 13:00', '13:00 – 13:30', '18:00 – 18:30', '18:30 – 19:00']

const PAYMENTS = [
  { value: 'card', icon: CreditCard, title: 'Card', description: 'Visa, Mastercard or Verve. Pay on the next screen.' },
  { value: 'transfer', icon: Landmark, title: 'Bank transfer', description: 'We’ll show account details after you order.' },
  { value: 'cash', icon: Banknote, title: 'Cash on delivery', description: 'Please have the exact amount ready.' },
]

const INITIAL = { name: '', phone: '', address: '', landmark: '', when: 'now', slot: '', payment: 'card' }

export default function Checkout() {
  const { restaurant, lines, totals, clear } = useCart()
  const navigate = useNavigate()
  const formRef = useRef(null)
  const [values, setValues] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const set = (key) => (eventOrValue) => {
    const value = eventOrValue?.target ? eventOrValue.target.value : eventOrValue
    setValues((v) => ({ ...v, [key]: value }))
    if (errors[key]) {
      setErrors((current) => {
        const next = { ...current }
        delete next[key]
        return next
      })
    }
  }

  async function submit(event) {
    event.preventDefault()
    const found = validateCheckout(values)
    setErrors(found)
    if (Object.keys(found).length) {
      requestAnimationFrame(() => formRef.current?.querySelector('[aria-invalid="true"]')?.focus())
      return
    }
    setSubmitting(true)
    const order = await placeOrder({ restaurant, lines, totals, customer: values })
    saveOrder(order)
    clear()
    navigate(`/orders/${order.id}`, { replace: true })
  }

  if (!lines.length) {
    return (
      <PageTransition>
        <EmptyState
          icon={ShoppingBag}
          title="Nothing to check out yet"
          action={
            <Button as={Link} to="/">
              Find something to eat
            </Button>
          }
        >
          Your cart is empty. Add a few dishes and come back here.
        </EmptyState>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="pt-6">
        <Link to={`/restaurants/${restaurant.id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-ink">
          <ArrowLeft className="size-4" aria-hidden /> Back to {restaurant.name}
        </Link>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Checkout</h1>
      </div>

      <form ref={formRef} onSubmit={submit} noValidate className="mt-6 grid items-start gap-6 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <CheckoutSection step={1} title="Delivery details">
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="Full name" autoComplete="name" value={values.name} onChange={set('name')} error={errors.name} />
              <TextField
                label="Phone number"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder="e.g. 0803 123 4567"
                value={values.phone}
                onChange={set('phone')}
                error={errors.phone}
                hint="The rider will call when they arrive."
              />
              <TextField
                className="sm:col-span-2"
                label="Street address"
                autoComplete="street-address"
                placeholder="e.g. 12 Aminu Kano Crescent, Wuse 2"
                value={values.address}
                onChange={set('address')}
                error={errors.address}
              />
              <TextField
                className="sm:col-span-2"
                label="Landmark (optional)"
                placeholder="e.g. Opposite Banex Plaza, blue gate"
                value={values.landmark}
                onChange={set('landmark')}
              />
            </div>
          </CheckoutSection>

          <CheckoutSection step={2} title="Delivery time">
            <div className="grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Delivery time">
              <ChoiceCard name="when" value="now" checked={values.when === 'now'} onChange={set('when')} title="As soon as possible" description="About 30 minutes" />
              <ChoiceCard name="when" value="later" checked={values.when === 'later'} onChange={set('when')} title="Schedule for later" description="Pick a 30-minute slot" />
            </div>
            {values.when === 'later' && (
              <div className="mt-4">
                <p className="mb-2 text-sm font-semibold">Today</p>
                <div className="flex flex-wrap gap-2">
                  {SLOTS.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      aria-pressed={values.slot === slot}
                      onClick={() => set('slot')(slot)}
                      className={`h-10 rounded-full border px-4 text-sm font-medium ${
                        values.slot === slot ? 'border-ink bg-ink text-bg' : 'border-line hover:border-ink/30'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
                {errors.slot && (
                  <p className="mt-2 text-sm font-medium text-pepper" role="alert">
                    {errors.slot}
                  </p>
                )}
              </div>
            )}
          </CheckoutSection>

          <CheckoutSection step={3} title="Payment">
            <div className="grid gap-3" role="radiogroup" aria-label="Payment method">
              {PAYMENTS.map((p) => (
                <ChoiceCard key={p.value} name="payment" checked={values.payment === p.value} onChange={set('payment')} {...p} />
              ))}
            </div>
          </CheckoutSection>
        </div>

        <OrderSummary restaurantName={restaurant.name} lines={lines} totals={totals}>
          <Button type="submit" size="lg" className="mt-5 w-full" loading={submitting}>
            {submitting ? 'Placing order…' : `Place order · ${formatPrice(totals.total)}`}
          </Button>
          <p className="mt-3 text-center text-xs text-muted">This is a demo. No real order or payment is made.</p>
        </OrderSummary>
      </form>
    </PageTransition>
  )
}

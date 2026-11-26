import CartLine from '../cart/CartLine'
import CartSummary from '../cart/CartSummary'

export default function OrderSummary({ restaurantName, lines, totals, children }) {
  return (
    <aside className="rounded-card border border-line bg-surface p-5 sm:p-6 lg:sticky lg:top-24">
      <h2 className="text-xl font-bold">Order summary</h2>
      <p className="text-sm text-muted">from {restaurantName}</p>
      <ul className="my-5 space-y-4">
        {lines.map((line) => (
          <CartLine key={line.key} line={line} readOnly />
        ))}
      </ul>
      <div className="border-t border-line pt-4">
        <CartSummary totals={totals} />
      </div>
      {children}
    </aside>
  )
}

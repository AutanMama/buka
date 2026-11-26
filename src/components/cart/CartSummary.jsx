import { formatPrice } from '../../lib/format'

function Row({ label, value, strong, accent }) {
  return (
    <div className={`flex justify-between ${strong ? 'pt-3 text-lg font-semibold' : 'text-sm text-muted'}`}>
      <dt>{label}</dt>
      <dd className={`tabular-nums ${accent ? 'font-medium text-leaf' : ''}`}>{value}</dd>
    </div>
  )
}

export default function CartSummary({ totals }) {
  return (
    <dl className="space-y-2">
      <Row label="Subtotal" value={formatPrice(totals.subtotal)} />
      <Row label="Delivery" value={totals.delivery === 0 ? 'Free' : formatPrice(totals.delivery)} accent={totals.delivery === 0} />
      <Row label="Service fee" value={formatPrice(totals.serviceFee)} />
      <div className="border-t border-line">
        <Row label="Total" value={formatPrice(totals.total)} strong />
      </div>
    </dl>
  )
}

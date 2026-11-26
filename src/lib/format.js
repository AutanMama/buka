const naira = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  maximumFractionDigits: 0,
})

export const formatPrice = (amount) => naira.format(amount)

export const formatFee = (amount) => (amount === 0 ? 'Free delivery' : `${formatPrice(amount)} delivery`)

export const formatEta = ({ etaMin, etaMax }) => `${etaMin}–${etaMax} min`

export const priceLevel = (level) => '₦'.repeat(level)

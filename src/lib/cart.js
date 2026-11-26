export const SERVICE_FEE_RATE = 0.05
export const SERVICE_FEE_CAP = 1000

// Same item with the same options = same line, so quantities merge.
export function lineKey(itemId, selections = {}) {
  const parts = Object.keys(selections)
    .sort()
    .map((group) => `${group}:${[].concat(selections[group]).sort().join('+')}`)
  return [itemId, ...parts].join('|')
}

export function unitPrice(item, selections = {}) {
  const extras = (item.options ?? []).reduce((sum, group) => {
    const picked = [].concat(selections[group.id] ?? [])
    return sum + group.choices.filter((c) => picked.includes(c.id)).reduce((s, c) => s + c.price, 0)
  }, 0)
  return item.price + extras
}

export function describeSelections(item, selections = {}) {
  return (item.options ?? [])
    .flatMap((group) => {
      const picked = [].concat(selections[group.id] ?? [])
      return group.choices.filter((c) => picked.includes(c.id)).map((c) => c.label)
    })
    .join(', ')
}

export function cartTotals(lines, deliveryFee = 0) {
  const subtotal = lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0)
  const serviceFee = lines.length ? Math.min(Math.round(subtotal * SERVICE_FEE_RATE), SERVICE_FEE_CAP) : 0
  const delivery = lines.length ? deliveryFee : 0
  return { subtotal, serviceFee, delivery, total: subtotal + serviceFee + delivery }
}

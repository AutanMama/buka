const NG_PHONE = /^(\+234|0)[789][01]\d{8}$/

export function validateCheckout(values) {
  const errors = {}
  if (values.name.trim().length < 2) errors.name = 'Enter your full name.'
  if (!NG_PHONE.test(values.phone.replace(/[\s-]/g, ''))) errors.phone = 'Enter a valid Nigerian number, e.g. 0803 123 4567.'
  if (values.address.trim().length < 6) errors.address = 'Enter a street address the rider can find.'
  if (values.when === 'later' && !values.slot) errors.slot = 'Pick a delivery time.'
  return errors
}

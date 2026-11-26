import { useState } from 'react'
import { X } from 'lucide-react'
import OptionGroup from './OptionGroup'
import Overlay from '../ui/Overlay'
import Button from '../ui/Button'
import Photo from '../ui/Photo'
import QuantityStepper from '../ui/QuantityStepper'
import { unitPrice } from '../../lib/cart'
import { formatPrice } from '../../lib/format'

function defaultSelections(item) {
  return Object.fromEntries(
    (item.options ?? []).map((g) => [g.id, g.type === 'single' && g.required ? g.choices[0].id : g.type === 'single' ? null : []]),
  )
}

function ItemSheetBody({ item, disabled, onAdd, onClose }) {
  const [selections, setSelections] = useState(() => defaultSelections(item))
  const [quantity, setQuantity] = useState(1)
  const [note, setNote] = useState('')

  const total = unitPrice(item, selections) * quantity

  function submit(event) {
    event.preventDefault()
    onAdd({ selections, quantity, note: note.trim() })
  }

  return (
    <form onSubmit={submit} className="flex min-h-0 flex-1 flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="relative">
          <Photo src={item.image} alt={item.name} priority className="aspect-[16/10]" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3 right-3 grid size-10 place-items-center rounded-lg bg-surface text-ink shadow-sm"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="space-y-5 p-5 sm:p-6">
          <div>
            <h2 className="text-3xl">{item.name}</h2>
            <p className="mt-2 text-muted">{item.description}</p>
            <p className="mt-3 text-lg font-semibold">{formatPrice(item.price)}</p>
          </div>

          {item.options?.map((group) => (
            <OptionGroup
              key={group.id}
              group={group}
              value={selections[group.id]}
              onChange={(value) => setSelections((s) => ({ ...s, [group.id]: value }))}
            />
          ))}

          <label className="block border-t border-line pt-5">
            <span className="font-semibold">Note for the kitchen</span>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              maxLength={120}
              placeholder="e.g. no onions, extra pepper"
              className="mt-3 w-full resize-none rounded-lg border border-line bg-surface px-3.5 py-3 text-sm placeholder:text-muted/70 focus:border-ink focus:outline-none"
            />
          </label>
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-line bg-surface p-4 sm:px-6">
        <QuantityStepper
          value={quantity}
          min={1}
          label={item.name}
          onIncrement={() => setQuantity((q) => q + 1)}
          onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
        />
        <Button type="submit" size="lg" className="flex-1 justify-between" disabled={disabled}>
          {disabled ? (
            'Restaurant closed'
          ) : (
            <>
              <span>Add to order</span>
              <span className="tabular-nums">{formatPrice(total)}</span>
            </>
          )}
        </Button>
      </div>
    </form>
  )
}

export default function ItemSheet({ item, disabled, onAdd, onClose }) {
  return (
    <Overlay open={Boolean(item)} onClose={onClose} label={item?.name ?? 'Item'}>
      {item && <ItemSheetBody key={item.id} item={item} disabled={disabled} onAdd={onAdd} onClose={onClose} />}
    </Overlay>
  )
}

import { Check } from 'lucide-react'
import { formatPrice } from '../../lib/format'

export default function OptionGroup({ group, value, onChange }) {
  const isSingle = group.type === 'single'
  const picked = [].concat(value ?? [])

  function toggle(choiceId) {
    if (isSingle) return onChange(choiceId)
    onChange(picked.includes(choiceId) ? picked.filter((id) => id !== choiceId) : [...picked, choiceId])
  }

  return (
    <fieldset className="border-t border-line pt-5">
      <legend className="flex w-full items-baseline justify-between">
        <span className="font-semibold">{group.label}</span>
        <span className="text-xs text-muted">{group.required ? 'Required · pick one' : 'Optional'}</span>
      </legend>
      <div className="mt-2 divide-y divide-line">
        {group.choices.map((choice) => {
          const checked = picked.includes(choice.id)
          return (
            <label key={choice.id} className="flex cursor-pointer items-center gap-3 py-3">
              <input
                type={isSingle ? 'radio' : 'checkbox'}
                name={group.id}
                checked={checked}
                onChange={() => toggle(choice.id)}
                className="peer sr-only"
              />
              <span
                className={`grid size-5 shrink-0 place-items-center border-2 transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-pepper ${
                  isSingle ? 'rounded-full' : 'rounded'
                } ${checked ? 'border-ink bg-ink text-bg' : 'border-line'}`}
                aria-hidden
              >
                {checked && (isSingle ? <span className="size-2 rounded-full bg-bg" /> : <Check className="size-3.5" strokeWidth={3} />)}
              </span>
              <span className="flex-1 text-[15px]">{choice.label}</span>
              {choice.price > 0 && <span className="text-sm text-muted">+{formatPrice(choice.price)}</span>}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

export default function ChoiceCard({ name, value, checked, onChange, icon: Icon, title, description }) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-colors ${
        checked ? 'border-pepper bg-pepper-soft' : 'border-line bg-surface hover:border-ink/30'
      }`}
    >
      <input type="radio" name={name} value={value} checked={checked} onChange={() => onChange(value)} className="peer sr-only" />
      <span
        className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border-2 peer-focus-visible:outline-2 peer-focus-visible:outline-pepper ${
          checked ? 'border-pepper' : 'border-line'
        }`}
        aria-hidden
      >
        {checked && <span className="size-2.5 rounded-full bg-pepper" />}
      </span>
      <span className="flex-1">
        <span className="flex items-center gap-2 font-semibold">
          {Icon && <Icon className="size-4 text-muted" aria-hidden />}
          {title}
        </span>
        {description && <span className="mt-0.5 block text-sm text-muted">{description}</span>}
      </span>
    </label>
  )
}

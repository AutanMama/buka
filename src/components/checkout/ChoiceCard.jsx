export default function ChoiceCard({ name, value, checked, onChange, icon: Icon, title, description }) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
        checked ? 'border-ink ring-1 ring-ink' : 'border-line hover:border-muted/60'
      }`}
    >
      <input type="radio" name={name} value={value} checked={checked} onChange={() => onChange(value)} className="peer sr-only" />
      {Icon && <Icon className="mt-0.5 size-5 shrink-0 text-ink" strokeWidth={1.75} aria-hidden />}
      <span className="flex-1">
        <span className="block font-medium">{title}</span>
        {description && <span className="mt-0.5 block text-sm text-muted">{description}</span>}
      </span>
      <span
        className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border-2 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-pepper ${
          checked ? 'border-ink bg-ink' : 'border-line'
        }`}
        aria-hidden
      >
        {checked && <span className="size-2 rounded-full bg-bg" />}
      </span>
    </label>
  )
}

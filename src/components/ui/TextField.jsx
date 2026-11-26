import { useId } from 'react'

export default function TextField({ label, error, hint, multiline = false, className = '', ...props }) {
  const id = useId()
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined
  const Input = multiline ? 'textarea' : 'input'

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      <Input
        id={id}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy}
        rows={multiline ? 2 : undefined}
        className={`w-full rounded-lg border bg-surface px-3.5 text-ink placeholder:text-muted/70 focus:outline-none focus:ring-3 ${
          multiline ? 'resize-none py-3' : 'h-11'
        } ${error ? 'border-pepper focus:ring-pepper/20' : 'border-line focus:border-ink focus:ring-ink/10'}`}
        {...props}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-pepper">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="mt-1.5 text-sm text-muted">
            {hint}
          </p>
        )
      )}
    </div>
  )
}

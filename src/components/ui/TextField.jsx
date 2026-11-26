import { useId } from 'react'

export default function TextField({ label, error, hint, multiline = false, className = '', ...props }) {
  const id = useId()
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined
  const Input = multiline ? 'textarea' : 'input'

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
        {label}
      </label>
      <Input
        id={id}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy}
        rows={multiline ? 2 : undefined}
        className={`w-full rounded-2xl border bg-sunk px-4 text-ink placeholder:text-muted focus:outline-none ${
          multiline ? 'resize-none py-3' : 'h-12'
        } ${error ? 'border-pepper' : 'border-transparent focus:border-pepper'}`}
        {...props}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-pepper">
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

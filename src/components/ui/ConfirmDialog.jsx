import Overlay from './Overlay'
import Button from './Button'

export default function ConfirmDialog({ open, title, children, confirmLabel, onConfirm, onCancel }) {
  return (
    <Overlay open={open} onClose={onCancel} label={title}>
      <div className="p-6">
        <h2 className="text-2xl">{title}</h2>
        <div className="mt-2 text-sm text-muted">{children}</div>
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={onCancel}>
            Keep current cart
          </Button>
          <Button onClick={onConfirm}>{confirmLabel}</Button>
        </div>
      </div>
    </Overlay>
  )
}

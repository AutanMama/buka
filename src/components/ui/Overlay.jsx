import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'

const PANELS = {
  // Bottom sheet on phones, centred dialog from `sm` up.
  dialog: {
    wrapper: 'items-end justify-center sm:items-center sm:p-6',
    panel: 'w-full max-h-[92dvh] rounded-t-[28px] sm:max-w-lg sm:rounded-card',
    motion: { initial: { y: 40, opacity: 0 }, animate: { y: 0, opacity: 1 }, exit: { y: 40, opacity: 0 } },
  },
  drawer: {
    wrapper: 'justify-end',
    panel: 'h-full w-full max-w-md',
    motion: { initial: { x: '100%' }, animate: { x: 0 }, exit: { x: '100%' } },
  },
}

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

export default function Overlay({ open, onClose, label, variant = 'dialog', children }) {
  const panelRef = useRef(null)
  const config = PANELS[variant]

  useEffect(() => {
    if (!open) return
    const previous = document.activeElement
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    panelRef.current?.querySelector(FOCUSABLE)?.focus()

    function onKey(event) {
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab' || !panelRef.current) return
      const nodes = [...panelRef.current.querySelectorAll(FOCUSABLE)].filter((n) => !n.disabled)
      if (!nodes.length) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
      previous?.focus?.()
    }
  }, [open, onClose])

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className={`fixed inset-0 z-50 flex ${config.wrapper}`}>
          <motion.div
            className="absolute inset-0 bg-black/45"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            className={`relative flex flex-col overflow-hidden bg-surface shadow-2xl ${config.panel}`}
            {...config.motion}
            transition={{ type: 'spring', damping: 32, stiffness: 340 }}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

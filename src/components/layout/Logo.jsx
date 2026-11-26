import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2" aria-label="Buka home">
      <svg viewBox="0 0 32 32" className="size-8" aria-hidden>
        <rect width="32" height="32" rx="9" className="fill-brand" />
        <path d="M7 15h18a9 9 0 0 1-18 0Z" className="fill-brand-cream" />
        <path d="M12 11c0-2 2-2 2-4M17 11c0-2 2-2 2-4" className="stroke-brand-palm" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
      <span className="font-display text-2xl font-bold tracking-tight">buka</span>
    </Link>
  )
}

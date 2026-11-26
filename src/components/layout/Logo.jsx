import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <Link to="/" aria-label="Buka home" className="display text-[28px] leading-none tracking-tight">
      buka<span className="text-brand">.</span>
    </Link>
  )
}

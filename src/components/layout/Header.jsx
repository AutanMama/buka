import { MapPin } from 'lucide-react'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'
import CartButton from '../cart/CartButton'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
        <Logo />
        <span className="ml-2 hidden items-center gap-1.5 rounded-full bg-sunk px-3 py-1.5 text-sm text-muted md:inline-flex">
          <MapPin className="size-4 text-pepper" aria-hidden />
          Delivering to <strong className="font-semibold text-ink">Wuse 2, Abuja</strong>
        </span>
        <div className="ml-auto flex items-center gap-1">
          <ThemeToggle />
          <CartButton />
        </div>
      </div>
    </header>
  )
}

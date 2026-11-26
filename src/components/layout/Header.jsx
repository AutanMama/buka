import { ChevronDown, MapPin } from 'lucide-react'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'
import CartButton from '../cart/CartButton'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Logo />
        <button type="button" className="hidden items-center gap-2 text-left md:flex">
          <MapPin className="size-4 text-pepper" aria-hidden />
          <span className="text-sm leading-tight">
            <span className="block text-xs text-muted">Deliver to</span>
            <span className="flex items-center gap-1 font-semibold">
              Wuse 2, Abuja <ChevronDown className="size-3.5" aria-hidden />
            </span>
          </span>
        </button>
        <div className="ml-auto flex items-center gap-1">
          <ThemeToggle />
          <CartButton />
        </div>
      </div>
    </header>
  )
}

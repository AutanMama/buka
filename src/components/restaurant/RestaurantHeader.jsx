import { Link } from 'react-router-dom'
import { ArrowLeft, Clock, MapPin, Tag, Truck } from 'lucide-react'
import Photo from '../ui/Photo'
import Rating from '../ui/Rating'
import Skeleton from '../ui/Skeleton'
import { formatEta, formatFee } from '../../lib/format'

export function RestaurantHeaderSkeleton() {
  return (
    <div className="pt-4 sm:pt-6">
      <Skeleton className="aspect-[16/9] rounded-card sm:aspect-[3/1]" />
      <Skeleton className="mt-6 h-9 w-72" />
      <Skeleton className="mt-3 h-4 w-96 max-w-full" />
      <Skeleton className="mt-4 h-4 w-64" />
    </div>
  )
}

function Meta({ icon: Icon, children }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <Icon className="size-4 text-muted" aria-hidden />
      {children}
    </span>
  )
}

export default function RestaurantHeader({ restaurant }) {
  return (
    <section className="pt-4 sm:pt-6">
      <div className="relative">
        <Photo src={restaurant.cover} alt="" priority className="aspect-[16/9] rounded-card sm:aspect-[3/1]" />
        <Link
          to="/"
          aria-label="Back to all restaurants"
          className="absolute top-3 left-3 grid size-10 place-items-center rounded-lg bg-surface text-ink shadow-sm hover:bg-sunk"
        >
          <ArrowLeft className="size-5" aria-hidden />
        </Link>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-4xl sm:text-5xl">{restaurant.name}</h1>
          {!restaurant.isOpen && <span className="rounded-md bg-sunk px-2 py-1 text-xs font-semibold">Closed · opens 8:00</span>}
        </div>
        <p className="text-muted">{restaurant.tagline}</p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <Rating value={restaurant.rating} count={restaurant.reviews} />
          <Meta icon={Clock}>{formatEta(restaurant)}</Meta>
          <Meta icon={Truck}>{formatFee(restaurant.deliveryFee)}</Meta>
          <Meta icon={MapPin}>{restaurant.area}, Abuja</Meta>
        </div>
      </div>

      {restaurant.promo && (
        <p className="mt-5 flex items-center gap-2 rounded-lg border border-pepper/30 bg-pepper-soft px-4 py-3 text-sm font-medium text-pepper">
          <Tag className="size-4" aria-hidden /> {restaurant.promo}
        </p>
      )}
    </section>
  )
}

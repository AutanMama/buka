import { Link } from 'react-router-dom'
import { ArrowLeft, Bike, Clock, MapPin, Tag } from 'lucide-react'
import DishArt from '../menu/DishArt'
import Badge from '../ui/Badge'
import Rating from '../ui/Rating'
import Skeleton from '../ui/Skeleton'
import { bannerFor } from './banner'
import { formatEta, formatFee } from '../../lib/format'

export function RestaurantBannerSkeleton() {
  return (
    <div className="pt-6">
      <Skeleton className="h-52 rounded-card sm:h-64" />
      <div className="mt-6 space-y-3">
        <Skeleton className="h-9 w-72" />
        <Skeleton className="h-4 w-96 max-w-full" />
        <Skeleton className="h-4 w-64" />
      </div>
    </div>
  )
}

export default function RestaurantBanner({ restaurant }) {
  const banner = bannerFor(restaurant.banner)
  return (
    <section className="pt-6">
      <div className={`relative h-52 overflow-hidden rounded-card sm:h-64 ${banner.tint}`}>
        <Link
          to="/"
          className="absolute top-4 left-4 z-10 inline-flex h-10 items-center gap-2 rounded-full bg-surface px-4 text-sm font-semibold shadow-card"
        >
          <ArrowLeft className="size-4" aria-hidden /> All restaurants
        </Link>
        <DishArt kind={banner.art} className="absolute -right-10 -bottom-24 size-80 drop-shadow-xl sm:right-10 sm:size-96" />
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-3xl font-bold sm:text-4xl">{restaurant.name}</h1>
            {restaurant.isOpen ? <Badge tone="leaf">Open now</Badge> : <Badge>Closed · opens 8am</Badge>}
          </div>
          <p className="mt-2 text-muted">{restaurant.tagline}</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
          <Rating value={restaurant.rating} count={restaurant.reviews} />
          <span className="inline-flex items-center gap-1">
            <Clock className="size-4" aria-hidden /> {formatEta(restaurant)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Bike className="size-4" aria-hidden /> {formatFee(restaurant.deliveryFee)}
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-4" aria-hidden /> {restaurant.area}
          </span>
        </div>
      </div>
      {restaurant.promo && (
        <p className="mt-4 flex items-center gap-2 rounded-2xl bg-palm-soft px-4 py-3 text-sm font-medium">
          <Tag className="size-4 text-pepper" aria-hidden /> {restaurant.promo}
        </p>
      )}
    </section>
  )
}

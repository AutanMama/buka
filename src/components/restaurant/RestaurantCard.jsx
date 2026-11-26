import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Bike, Clock } from 'lucide-react'
import DishArt from '../menu/DishArt'
import Badge from '../ui/Badge'
import Rating from '../ui/Rating'
import { bannerFor } from './banner'
import { formatEta, formatFee, priceLevel } from '../../lib/format'

export default function RestaurantCard({ restaurant }) {
  const { id, name, tagline, area, rating, reviews, deliveryFee, isOpen, promo } = restaurant
  const banner = bannerFor(restaurant.banner)

  return (
    <motion.article layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <Link
        to={`/restaurants/${id}`}
        className="group block overflow-hidden rounded-card border border-line bg-surface shadow-card transition-transform hover:-translate-y-0.5"
      >
        <div className={`relative h-40 overflow-hidden ${banner.tint}`}>
          <DishArt
            kind={banner.art}
            className="absolute -right-6 -bottom-10 size-48 drop-shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3"
          />
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {promo && <Badge tone="palm">{promo}</Badge>}
            {!isOpen && <Badge>Closed · opens 8am</Badge>}
          </div>
        </div>

        <div className="space-y-2 p-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg leading-snug font-semibold">{name}</h3>
            <Rating value={rating} />
          </div>
          <p className="line-clamp-1 text-sm text-muted">{tagline}</p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-sm text-muted">
            <span className="inline-flex items-center gap-1">
              <Clock className="size-4" aria-hidden />
              {formatEta(restaurant)}
            </span>
            <span className={`inline-flex items-center gap-1 ${deliveryFee === 0 ? 'font-medium text-leaf' : ''}`}>
              <Bike className="size-4" aria-hidden />
              {formatFee(deliveryFee)}
            </span>
            <span>
              {priceLevel(restaurant.priceLevel)} · {area}
            </span>
          </div>
          <span className="sr-only">{reviews} reviews</span>
        </div>
      </Link>
    </motion.article>
  )
}

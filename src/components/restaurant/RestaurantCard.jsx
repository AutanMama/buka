import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Photo from '../ui/Photo'
import Rating from '../ui/Rating'
import { formatEta, formatFee, priceLevel } from '../../lib/format'

export default function RestaurantCard({ restaurant }) {
  const { id, name, tagline, area, rating, reviews, deliveryFee, isOpen, promo, cover } = restaurant

  return (
    <motion.article layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <Link to={`/restaurants/${id}`} className="group block">
        <div className="relative">
          <Photo
            src={cover}
            alt=""
            className="aspect-[16/10] rounded-card"
            imgClassName={`transition-transform duration-500 group-hover:scale-[1.03] ${isOpen ? '' : 'grayscale'}`}
          />
          {!isOpen && (
            <div className="absolute inset-0 grid place-items-center rounded-card bg-black/45">
              <span className="text-sm font-semibold text-white">Closed · opens 8:00</span>
            </div>
          )}
          {promo && isOpen && (
            <span className="absolute bottom-3 left-3 rounded-md bg-pepper px-2 py-1 text-xs font-semibold text-on-pepper">{promo}</span>
          )}
        </div>

        <div className="mt-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-[17px] font-semibold">{name}</h3>
            <p className="truncate text-sm text-muted">{tagline}</p>
          </div>
          <Rating value={rating} />
        </div>
        <p className="mt-1.5 text-sm text-muted">
          {formatEta(restaurant)}
          <span className="mx-1.5">·</span>
          <span className={deliveryFee === 0 ? 'font-medium text-leaf' : ''}>{formatFee(deliveryFee)}</span>
          <span className="mx-1.5">·</span>
          {priceLevel(restaurant.priceLevel)} · {area}
        </p>
        <span className="sr-only">{reviews} reviews</span>
      </Link>
    </motion.article>
  )
}

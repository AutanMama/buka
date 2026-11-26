import { motion } from 'framer-motion'
import DishArt from '../menu/DishArt'

const FLOATING = [
  { kind: 'rice', className: 'top-2 right-28 size-40', delay: 0 },
  { kind: 'suya', className: 'top-24 right-0 size-32', delay: 0.1 },
  { kind: 'zobo', className: 'top-36 right-44 size-20', delay: 0.2 },
]

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden py-10 sm:py-14">
      <div className="max-w-xl">
        <p className="text-sm font-semibold tracking-wide text-pepper uppercase">Abuja’s local kitchens</p>
        <h1 className="mt-3 text-4xl leading-[1.05] font-bold sm:text-6xl">
          Real food from the buka <span className="text-pepper">down the road.</span>
        </h1>
        <p className="mt-4 max-w-md text-lg text-muted">
          Jollof, suya, Calabar soups and cold zobo, delivered hot in about 30 minutes.
        </p>
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-96 lg:block" aria-hidden>
        {FLOATING.map(({ kind, className, delay }) => (
          <motion.div
            key={kind}
            className={`absolute ${className}`}
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay, type: 'spring', stiffness: 120, damping: 14 }}
          >
            <DishArt kind={kind} className="size-full drop-shadow-xl" />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

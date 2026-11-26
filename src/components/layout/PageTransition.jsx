import { motion } from 'framer-motion'

export default function PageTransition({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="mx-auto w-full max-w-6xl px-4 sm:px-6"
    >
      {children}
    </motion.main>
  )
}

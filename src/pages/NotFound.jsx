import { Link } from 'react-router-dom'
import PageTransition from '../components/layout/PageTransition'
import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <PageTransition>
      <div className="flex flex-col items-start py-24">
        <p className="display text-[120px] text-pepper sm:text-[180px]">404</p>
        <h1 className="mt-2 text-4xl">This plate is empty.</h1>
        <p className="mt-3 text-muted">The page you’re looking for doesn’t exist or has moved.</p>
        <Button as={Link} to="/" variant="dark" className="mt-8">
          Back to restaurants
        </Button>
      </div>
    </PageTransition>
  )
}

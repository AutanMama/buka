import { Link } from 'react-router-dom'
import PageTransition from '../components/layout/PageTransition'
import DishArt from '../components/menu/DishArt'
import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <PageTransition>
      <div className="flex flex-col items-center py-20 text-center">
        <DishArt kind="stew" className="size-40 opacity-60" />
        <h1 className="mt-6 text-4xl font-bold">This plate is empty</h1>
        <p className="mt-2 text-muted">The page you’re looking for doesn’t exist.</p>
        <Button as={Link} to="/" className="mt-6">
          Back to restaurants
        </Button>
      </div>
    </PageTransition>
  )
}

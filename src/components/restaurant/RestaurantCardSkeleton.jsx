import Skeleton from '../ui/Skeleton'

export default function RestaurantCardSkeleton() {
  return (
    <div>
      <Skeleton className="aspect-[16/10] rounded-card" />
      <div className="mt-3 flex justify-between gap-6">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-5 w-10" />
      </div>
      <Skeleton className="mt-2 h-4 w-5/6" />
      <Skeleton className="mt-2 h-4 w-3/5" />
    </div>
  )
}

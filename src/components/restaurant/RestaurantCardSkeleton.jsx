import Skeleton from '../ui/Skeleton'

export default function RestaurantCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-card border border-line bg-surface">
      <Skeleton className="h-40 rounded-none" />
      <div className="space-y-3 p-4">
        <div className="flex justify-between gap-6">
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-5 w-10" />
        </div>
        <Skeleton className="h-4 w-5/6" />
        <div className="flex gap-3 pt-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  )
}

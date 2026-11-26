import Skeleton from '../ui/Skeleton'

export default function MenuSkeleton() {
  return (
    <div className="mt-8 space-y-6">
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-10 w-24 rounded-full" />
        ))}
      </div>
      <Skeleton className="h-7 w-32" />
      <div className="grid gap-4 md:grid-cols-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex gap-4 rounded-card border border-line bg-surface p-4">
            <div className="flex-1 space-y-3">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="mt-4 h-6 w-20" />
            </div>
            <Skeleton className="size-28 rounded-2xl sm:size-32" />
          </div>
        ))}
      </div>
    </div>
  )
}

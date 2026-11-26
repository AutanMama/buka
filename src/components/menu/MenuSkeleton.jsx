import Skeleton from '../ui/Skeleton'

export default function MenuSkeleton() {
  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-[180px_1fr]">
      <div className="flex gap-4 lg:flex-col lg:gap-3">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-6 w-24" />
        ))}
      </div>
      <div>
        <Skeleton className="h-7 w-32" />
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4 rounded-card border border-line p-3">
              <div className="flex-1 space-y-2.5 py-1">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="mt-4 h-5 w-20" />
              </div>
              <Skeleton className="size-28 rounded-lg sm:size-32" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

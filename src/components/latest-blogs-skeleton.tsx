import { Skeleton, SkeletonText } from "@/components/ui/skeleton";

export function LatestBlogsSkeleton() {
  return (
    <section className="py-4 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="my-4 md:my-10 flex flex-col md:gap-2 items-center justify-center">
          <Skeleton className="h-8 w-56 mb-2" />
          <Skeleton className="h-4 w-80" />
        </div>

        <div className="w-full md:container md:w-360 md:p-4">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              {/* Mobile Card Skeleton */}
              <div className="md:hidden mb-4">
                <div className="bg-card dark:bg-gray-900/50 rounded-xl overflow-hidden shadow-lg border border-border/50">
                  <Skeleton className="w-full aspect-video" />
                  <div className="p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-3 w-3 rounded-full" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-3/4" />
                    <SkeletonText lines={2} />
                    <Skeleton className="h-4 w-24 mt-2" />
                  </div>
                </div>
              </div>

              {/* Desktop Card Skeleton */}
              <div className="hidden md:block my-4 dark:bg-gray-950 bg-gray-50 dark:border-gray-800 border rounded-md pl-4">
                <div className="py-4 flex justify-center items-center gap-2">
                  <Skeleton className="h-36 w-60 rounded-l-lg" />
                  <div className="grow px-3 space-y-3">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-6 w-3/4" />
                    <SkeletonText lines={2} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

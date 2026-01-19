import { Skeleton, SkeletonCard, SkeletonText } from "@/components/ui/skeleton";

export default function HomeLoading() {
  return (
    <>
      {/* Hero Section Skeleton */}
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-neutral-900 dark:to-neutral-900 flex items-center justify-center relative w-full overflow-hidden">
        <div className="relative z-0 w-full max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div className="space-y-6">
              <Skeleton className="h-8 w-48 rounded-full" />
              <Skeleton className="h-14 w-72" />
              <Skeleton className="h-10 w-96" />
              <SkeletonText lines={3} className="max-w-lg" />
              <div className="flex gap-8 py-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="text-center space-y-2">
                    <Skeleton className="h-8 w-12 mx-auto" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                <Skeleton className="h-12 w-36 rounded-md" />
                <Skeleton className="h-12 w-40 rounded-md" />
              </div>
            </div>
            {/* Right side - Code Editor Skeleton */}
            <div className="hidden lg:block">
              <div className="w-full max-w-xl rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 shadow-2xl">
                <div className="px-4 py-2 flex items-center gap-2 border-b bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700">
                  <div className="flex gap-2 mr-4">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <div className="flex gap-1">
                    <Skeleton className="h-6 w-20 rounded-t-md" />
                    <Skeleton className="h-6 w-16 rounded-t-md" />
                    <Skeleton className="h-6 w-18 rounded-t-md" />
                  </div>
                </div>
                <div className="p-4 h-[350px] bg-white dark:bg-neutral-900">
                  <SkeletonText lines={12} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Blogs Section Skeleton */}
      <section className="py-4 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="my-4 md:my-10 flex flex-col md:gap-2 items-center justify-center">
            <Skeleton className="h-10 w-64 mb-2" />
            <Skeleton className="h-6 w-96" />
          </div>
          <div className="md:container md:w-360 sm:p-4 space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="my-2 border-b md:my-4 md:border md:rounded-md md:pl-4 py-4"
              >
                <div className="flex flex-wrap md:flex-nowrap gap-4 items-center">
                  <Skeleton className="h-40 w-60 rounded-md" />
                  <div className="flex-1 space-y-3 px-3">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-6 w-3/4" />
                    <SkeletonText lines={2} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section Skeleton */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="my-4 md:my-10 flex flex-col md:gap-2 items-center justify-center">
            <Skeleton className="h-10 w-72 mb-2" />
            <Skeleton className="h-6 w-80" />
          </div>
          <div className="flex flex-wrap md:justify-center justify-between">
            {[1, 2, 3].map((i) => (
              <div key={i} className="md:p-4 md:w-1/3 flex justify-center my-2">
                <SkeletonCard className="max-w-sm w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section Skeleton */}
      <section className="py-8 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="my-4 md:my-10 flex flex-col md:gap-2 items-center justify-center">
            <Skeleton className="h-10 w-48 mb-2" />
            <Skeleton className="h-6 w-64" />
          </div>
          <div className="flex justify-center gap-4 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-80 p-6 rounded-xl border border-gray-200 dark:border-gray-800"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
                <SkeletonText lines={3} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

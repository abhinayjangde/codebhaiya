import { Skeleton, SkeletonText } from "@/components/ui/skeleton";

export default function BlogPostLoading() {
  return (
    <div className="dark:bg-background relative flex justify-center py-3 px-2 sm:py-5 sm:px-4 bg-gray-50 md:p-4 lg:p-12 md:flex">
      <div className="w-full max-w-5xl">
        <div className="bg-white dark:bg-black rounded-lg shadow-md p-4 sm:p-6 lg:p-10 z-20 relative">
          {/* Post Title Skeleton */}
          <div className="flex justify-center mb-4">
            <Skeleton className="h-10 w-3/4" />
          </div>

          {/* Post Metadata Skeleton */}
          <div className="flex pt-5 items-center mb-6 flex-col md:flex-row md:justify-start border-b pb-4">
            <div className="flex justify-center items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex items-center gap-2 mt-3 md:mt-0 md:ml-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="space-y-6">
            <SkeletonText lines={4} />
            <Skeleton className="h-64 w-full rounded-lg" />
            <SkeletonText lines={5} />
            <SkeletonText lines={4} />
            <Skeleton className="h-48 w-full rounded-lg" />
            <SkeletonText lines={6} />
          </div>
        </div>

        {/* Thank You Section Skeleton */}
        <div className="dark:bg-background py-3 sm:py-5 bg-gray-50">
          <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 sm:p-6 lg:p-10">
            <SkeletonText lines={2} />
          </div>
        </div>

        {/* Comments Section Skeleton */}
        <div className="dark:bg-background py-3 sm:py-5 bg-gray-50">
          <div className="max-w-5xl mx-auto bg-white dark:bg-black rounded-lg shadow-md p-4 sm:p-6 lg:p-10">
            <Skeleton className="h-8 w-40 mb-6" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3 p-4 border rounded-lg">
                  <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="flex gap-2 items-center">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                    <SkeletonText lines={2} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

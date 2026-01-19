import { Skeleton, SkeletonText } from "@/components/ui/skeleton";

export default function MatrixCourseLoading() {
  return (
    <>
      <div className="min-h-screen w-full dark:bg-background bg-white dark:bg-grid-white/[0.1] bg-grid-black/[0.1] pb-10">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-background bg-white mask-[radial-gradient(ellipse_at_center,transparent_100%,black)]"></div>

        {/* Top Course Thumbnail Skeleton */}
        <div className="pt-10 sm:pt-28 flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-10 px-4 sm:px-6">
          <div className="flex flex-col justify-center items-start gap-4 w-full lg:w-160 dark:text-white">
            <Skeleton className="h-10 w-64 rounded-full" />
            <Skeleton className="h-12 w-full max-w-lg" />
            <SkeletonText lines={4} className="w-full" />

            <div className="mt-6 sm:mt-10 w-full">
              <Skeleton className="h-6 w-72 mb-4" />
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <Skeleton className="h-12 w-full sm:w-80 lg:w-96 rounded-md" />
                <Skeleton className="h-12 w-24 rounded-md" />
              </div>
            </div>
          </div>

          <div className="w-full sm:w-auto p-4 flex justify-center">
            <div className="w-full max-w-sm rounded-xl overflow-hidden shadow-lg dark:bg-black/50 bg-white/80">
              <Skeleton className="h-48 w-full" />
              <div className="px-4 sm:px-6 py-4 space-y-3">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-6 w-3/4" />
                <SkeletonText lines={3} />
              </div>
              <div className="px-4 sm:px-6 pt-2 pb-4">
                <Skeleton className="h-10 w-32 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum Section Skeleton */}
      <div className="w-full pb-10 dark:bg-background bg-white">
        <div className="flex items-center justify-center gap-4 py-6 sm:py-10">
          <Skeleton className="h-10 w-40" />
        </div>
        <div className="px-4 sm:px-6 max-w-6xl mx-auto">
          <div className="bg-slate-100 dark:bg-black/70 rounded-lg p-4 sm:p-6">
            <div className="w-full flex flex-col items-center justify-center gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="w-full border-b border-gray-200 dark:border-gray-700 py-4"
                >
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-5 w-5 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section Skeleton */}
      <div className="w-full pb-10 dark:bg-background bg-white">
        <div className="flex items-center justify-center gap-4 py-6 sm:py-10 px-4">
          <Skeleton className="h-10 w-72" />
        </div>
        <div className="px-4 sm:px-6 max-w-6xl mx-auto">
          <div className="bg-slate-100 dark:bg-black/70 rounded-lg p-4 sm:p-6">
            <div className="w-full flex flex-col items-center justify-center gap-3">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div
                  key={i}
                  className="w-full border-b border-gray-200 dark:border-gray-700 py-4"
                >
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-5 w-64" />
                    <Skeleton className="h-5 w-5 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

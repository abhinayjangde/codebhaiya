import { Skeleton, SkeletonText } from "@/components/ui/skeleton";

export default function PythonCourseLoading() {
  return (
    <>
      <div className="min-h-screen w-full dark:bg-background bg-white dark:bg-grid-white/[0.1] bg-grid-black/[0.1] pb-10">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-dark bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_100%,black)]"></div>

        {/* Top Course Thumbnail Skeleton */}
        <div className="pt-10 sm:pt-28 flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-10 px-4 sm:px-6">
          <div className="flex flex-col justify-center items-start gap-4 w-full lg:w-[40rem] dark:text-white">
            <Skeleton className="h-10 w-64 rounded-full" />
            <Skeleton className="h-12 w-full max-w-md" />
            <SkeletonText lines={5} className="w-full" />

            <div className="mt-6 sm:mt-10 w-full">
              <Skeleton className="h-6 w-64 mb-4" />
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <Skeleton className="h-12 w-full sm:w-80 lg:w-96 rounded-md" />
                <Skeleton className="h-12 w-24 rounded-md" />
              </div>
            </div>
          </div>

          <div className="w-full sm:w-auto p-4 flex justify-center">
            <div className="w-full max-w-sm rounded-2xl overflow-hidden shadow-lg dark:bg-black/50 bg-white/80">
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

      {/* Course Review Section Skeleton */}
      <section className="text-gray-600 dark:text-white dark:bg-dark body-font relative">
        <div className="container px-4 sm:px-5 py-12 sm:py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-8 sm:mb-12">
            <Skeleton className="h-8 w-48 mx-auto mb-4" />
            <Skeleton className="h-5 w-96 mx-auto" />
          </div>
          <div className="w-full lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-full sm:w-1/2">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-10 w-full rounded" />
                </div>
              </div>
              <div className="p-2 w-full sm:w-1/2">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-10 w-full rounded" />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-32 w-full rounded" />
                </div>
              </div>
              <div className="p-2 w-full flex justify-center">
                <Skeleton className="h-12 w-32 rounded" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

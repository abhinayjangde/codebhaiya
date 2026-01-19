import { Skeleton, SkeletonText } from "@/components/ui/skeleton";

export default function BlogsLoading() {
  return (
    <div className="flex flex-col justify-center items-center sm:h-full w-full min-h-screen dark:bg-background bg-white">
      <Skeleton className="h-10 w-48 mb-8 mt-4" />
      <div className="md:container md:w-360 sm:p-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="my-2 md:my-4 md:dark:bg-gray-950 md:bg-gray-50 dark:border-gray-800 md:border md:rounded-md md:pl-4 border-b"
          >
            <div className="py-2 md:py-4 flex flex-wrap justify-center items-center md:justify-center md:items-center md:flex-nowrap gap-2">
              <Skeleton className="h-40 w-80 sm:w-full md:w-60 rounded-md" />
              <div className="md:grow mx-3 md:px-3 space-y-3 flex-1">
                <Skeleton className="hidden md:block h-4 w-48" />
                <Skeleton className="h-6 w-3/4" />
                <SkeletonText lines={2} className="hidden md:block" />
                <Skeleton className="h-4 w-32 md:hidden" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

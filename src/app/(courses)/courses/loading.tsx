import { Skeleton, SkeletonText } from "@/components/ui/skeleton";

export default function CoursesLoading() {
  return (
    <div className="h-full md:h-full w-full dark:bg-background bg-white flex items-center justify-center md:py-10 px-5">
      <div className="container mx-auto md:my-14 my-10">
        <div className="my-4 md:my-10 flex flex-col md:gap-2 items-center justify-center">
          <Skeleton className="h-10 w-72 mb-2" />
          <Skeleton className="h-6 w-96" />
        </div>
        <div className="flex flex-wrap md:justify-center justify-between">
          {[1, 2, 3].map((i) => (
            <div key={i} className="md:p-4 md:w-1/3 flex justify-center my-2">
              <div className="max-w-sm w-full rounded-2xl overflow-hidden shadow-lg dark:bg-black/50 bg-white/80">
                <Skeleton className="h-48 w-full" />
                <div className="px-6 py-4 md:h-72 lg:h-64 xl:h-52 space-y-3">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-6 w-3/4" />
                  <SkeletonText lines={3} />
                </div>
                <div className="px-6 pt-4 pb-6">
                  <Skeleton className="h-10 w-32 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { Skeleton, SkeletonText, SkeletonCard } from "@/components/ui/skeleton";

export default function CreatorProfileLoading() {
  return (
    <div className="min-h-screen dark:bg-background py-8 bg-gray-50 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white dark:bg-black/30 rounded-xl shadow-md p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Skeleton className="h-32 w-32 rounded-full" />
            <div className="flex-1 text-center md:text-left space-y-3">
              <Skeleton className="h-8 w-48 mx-auto md:mx-0" />
              <Skeleton className="h-5 w-64 mx-auto md:mx-0" />
              <div className="flex justify-center md:justify-start gap-4 pt-2">
                <div className="text-center">
                  <Skeleton className="h-6 w-12 mx-auto" />
                  <Skeleton className="h-4 w-16 mt-1" />
                </div>
                <div className="text-center">
                  <Skeleton className="h-6 w-12 mx-auto" />
                  <Skeleton className="h-4 w-20 mt-1" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="bg-white dark:bg-black/30 rounded-xl shadow-md p-8">
          <Skeleton className="h-8 w-36 mb-6" />
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

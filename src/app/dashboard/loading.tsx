import { Skeleton, SkeletonCard, SkeletonText } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen dark:bg-background py-5 bg-gray-50 md:p-4 lg:p-12">
      <div className="max-w-5xl mx-auto bg-white dark:bg-black/30 rounded-lg shadow-md p-6 lg:p-10 z-0 relative">
        <div className="flex justify-center border-b pb-4 mb-6">
          <Skeleton className="h-10 w-40" />
        </div>

        <Skeleton className="h-6 w-48 mb-8" />

        <div className="grid gap-6">
          <section>
            <Skeleton className="h-8 w-36 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

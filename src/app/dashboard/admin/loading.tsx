import { Skeleton, SkeletonTable } from "@/components/ui/skeleton";

export default function AdminDashboardLoading() {
  return (
    <div className="min-h-screen dark:bg-background py-5 bg-gray-50 p-4 lg:py-8">
      <div className="max-w-full bg-white dark:bg-black/30 rounded-lg shadow-md p-6 lg:p-8 z-0 relative">
        <div className="border-b pb-4 mb-6">
          <Skeleton className="h-10 w-52" />
        </div>

        <div className="space-y-8">
          <div>
            <Skeleton className="h-8 w-36 mb-4" />
            <SkeletonTable rows={5} columns={4} />
          </div>

          <div>
            <Skeleton className="h-8 w-36 mb-4" />
            <SkeletonTable rows={5} columns={4} />
          </div>
        </div>
      </div>
    </div>
  );
}

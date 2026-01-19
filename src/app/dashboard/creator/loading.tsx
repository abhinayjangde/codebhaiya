import { Skeleton, SkeletonTable } from "@/components/ui/skeleton";

export default function CreatorDashboardLoading() {
  return (
    <div className="min-h-screen dark:bg-background py-5 bg-gray-50 md:p-4 lg:p-12">
      <div className="max-w-5xl mx-auto bg-white dark:bg-black/30 rounded-lg shadow-md p-6 lg:p-10 z-0 relative">
        <div className="flex justify-center border-b pb-4 mb-6">
          <Skeleton className="h-10 w-52" />
        </div>

        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-10 w-36 rounded-md" />
        </div>

        <SkeletonTable rows={5} columns={4} />
      </div>
    </div>
  );
}

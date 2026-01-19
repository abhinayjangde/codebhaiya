import { Skeleton, SkeletonText } from "@/components/ui/skeleton";

export default function ContactLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background px-4 py-12">
      <div className="w-full max-w-2xl p-8 space-y-6 bg-white dark:bg-black/30 rounded-xl shadow-lg">
        <div className="text-center space-y-2">
          <Skeleton className="h-10 w-48 mx-auto" />
          <Skeleton className="h-5 w-80 mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-32 w-full rounded-md" />
        </div>

        <Skeleton className="h-12 w-full rounded-md" />

        <div className="pt-6 border-t space-y-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-5 w-48" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-5 w-40" />
          </div>
        </div>
      </div>
    </div>
  );
}

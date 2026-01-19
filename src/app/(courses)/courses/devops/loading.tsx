import { Skeleton } from "@/components/ui/skeleton";

export default function DevOpsCourseLoading() {
  return (
    <div className="min-h-screen w-full dark:bg-background bg-white flex items-center justify-center">
      <Skeleton className="h-8 w-48" />
    </div>
  );
}

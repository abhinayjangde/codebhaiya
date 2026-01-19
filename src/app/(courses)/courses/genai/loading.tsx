import { Skeleton } from "@/components/ui/skeleton";

export default function GenAICourseLoading() {
  return (
    <div className="min-h-screen w-full dark:bg-background bg-white flex items-center justify-center">
      <Skeleton className="h-8 w-48" />
    </div>
  );
}

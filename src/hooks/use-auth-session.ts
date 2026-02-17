import { authClient } from "@/lib/auth-client";

export function useAuthSession() {
  const { data: session, isPending, refetch } = authClient.useSession();

  return {
    session,
    user: session?.user,
    isLoading: isPending,
    isAuthenticated: !!session,
    refetch,
  };
}

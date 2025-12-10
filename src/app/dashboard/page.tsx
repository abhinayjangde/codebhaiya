import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LikeWithPost {
  id: string;
  createdAt: Date;
  post: {
    slug: string;
    title: string;
    excerpt: string | null;
  };
}

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const user = session.user;

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { role: true },
  });

  const role = dbUser?.role;

  if (role === "ADMIN") {
    redirect("/dashboard/admin");
  }

  if (role === "CREATOR") {
    redirect("/dashboard/creator");
  }

  const userData = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      likes: {
        include: {
          post: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return (
    <div className="min-h-screen dark:bg-background py-5 bg-gray-50 md:p-4 lg:p-12">
      <div className="max-w-screen-lg mx-auto bg-white dark:bg-black/[0.3] rounded-lg shadow-md p-6 lg:p-10 z-0 relative">
        <h1 className="text-center text-xl md:text-3xl justify-center lg:text-4xl font-semibold text-gray-800 dark:text-white mb-1 flex border-b pb-2">
          Dashboard
        </h1>

        <p className="text-muted-foreground mb-8">Welcome back, {user.name}</p>

        <div className="grid gap-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Liked Posts</h2>
            {userData?.likes.length === 0 ? (
              <p className="text-muted-foreground">
                You haven't liked any posts yet.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userData?.likes.map((like: LikeWithPost) => (
                  <Link
                    href={`/blog/${like.post.slug}`}
                    key={like.id}
                    className="hover:no-underline"
                  >
                    <Card className="h-full hover:shadow-md transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg line-clamp-2">
                          {like.post.title}
                        </CardTitle>
                        <div className="text-xs text-muted-foreground">
                          Liked on{" "}
                          {new Date(like.createdAt).toLocaleDateString()}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {like.post.excerpt || "Read more..."}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

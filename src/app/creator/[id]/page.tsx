import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featuredImg: string | null;
  tags: string[];
  createdAt: Date;
}

export default async function CreatorProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      profile: true,
      posts: {
        where: { published: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!user) {
    notFound();
  }

  return (
    <div className="min-h-screen dark:bg-background py-5 bg-gray-50 md:p-4 lg:p-12">
      <div className="max-w-screen-lg mx-auto bg-white dark:bg-black/[0.3] rounded-lg shadow-md p-6 lg:p-10 z-0 relative">
        <h1 className="text-center text-xl md:text-3xl justify-center lg:text-4xl font-semibold text-gray-800 dark:text-white mb-1 flex border-b pb-2">
          {user.name}
        </h1>

        <div className="flex flex-col items-center mb-12 text-center">
          <Avatar className="w-32 h-32 mb-4">
            <AvatarImage src={user.image || ""} />
            <AvatarFallback className="text-4xl">{user.name[0]}</AvatarFallback>
          </Avatar>
          <p className="text-muted-foreground mt-2 max-w-lg">
            {user.profile?.bio || "No bio available."}
          </p>
          <div className="mt-4 flex gap-4 text-sm text-muted-foreground">
            <span>{user.posts.length} Posts</span>
            <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Posts by {user.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {user.posts.map((post: Post) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.id}
              className="hover:no-underline"
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-200 flex flex-col">
                {post.featuredImg && (
                  <div className="w-full h-48 overflow-hidden rounded-t-xl">
                    <img
                      src={post.featuredImg}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <div className="text-sm text-muted-foreground mt-2">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground line-clamp-3">
                    {post.excerpt ||
                      post.content.replace(/<[^>]*>?/gm, "").slice(0, 150) +
                      "..."}
                  </p>
                </CardContent>
                <CardFooter className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </CardFooter>
              </Card>
            </Link>
          ))}
          {user.posts.length === 0 && (
            <div className="col-span-full text-center py-10">
              <p className="text-muted-foreground">
                This user hasn't published any posts yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

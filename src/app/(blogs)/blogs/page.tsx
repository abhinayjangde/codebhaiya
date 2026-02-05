import prisma from "@/lib/prisma";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { BlogSearch } from "@/components/blog/blog-search";
import { Suspense } from "react";

interface PostWithAuthor {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featuredImg: string | null;
  createdAt: Date;
  author: {
    name: string | null;
    image: string | null;
  };
}

export const metadata = {
  title: "Blogs - CodeBhaiya",
  description: "Read the latest articles on web development, tech, and more.",
};

interface BlogsPageProps {
  searchParams: Promise<{ search?: string }>;
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const { search } = await searchParams;
  const searchQuery = search || "";

  const posts = await prisma.post.findMany({
    where: {
      published: true,
      ...(searchQuery && {
        OR: [
          { title: { contains: searchQuery, mode: "insensitive" } },
          { content: { contains: searchQuery, mode: "insensitive" } },
          { excerpt: { contains: searchQuery, mode: "insensitive" } },
        ],
      }),
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  return (
    <div className="flex flex-col justify-center items-center sm:h-full w-full min-h-screen dark:bg-background bg-white ">
      <h2 className="sm:text-4xl text-2xl font-medium title-font uppercase mt-6">
        Latest Blogs
      </h2>
      <h6 className="font-semibold text-sm md:text-lg text-center opacity-75 mt-2 mb-4">
        Blogs are a great way to share your knowledge and experiences with
        others.
      </h6>

      <Suspense
        fallback={
          <div className="w-full max-w-md h-11 bg-muted/50 rounded-md animate-pulse mx-auto mb-8" />
        }
      >
        <BlogSearch />
      </Suspense>

      {searchQuery && (
        <p className="text-muted-foreground mb-4">
          Showing results for:{" "}
          <span className="font-semibold text-foreground">
            &quot;{searchQuery}&quot;
          </span>
        </p>
      )}

      <div className="w-full px-4 md:container md:w-360 md:p-4">
        {posts.map((post: PostWithAuthor) => (
          <Link key={post.id} href={`blog/${post.slug}`} className="block">
            {/* Mobile Card Design */}
            <div className="md:hidden mb-4">
              <div className="bg-card dark:bg-gray-900/50 rounded-xl overflow-hidden shadow-lg border border-border/50 hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                {post.featuredImg && (
                  <div className="relative w-full aspect-video">
                    <Image
                      className="object-cover w-full h-full"
                      src={post.featuredImg}
                      alt={post.title}
                      width={400}
                      height={225}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <span className="font-medium text-primary">
                      {post.author.name}
                    </span>
                    <span>•</span>
                    <span>
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold dark:text-white text-gray-900 mb-2 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {post.excerpt ||
                      post.content.replace(/<[^>]*>?/gm, "").slice(0, 100) +
                        "..."}
                  </p>
                  <div className="mt-3 flex items-center text-primary text-sm font-medium">
                    Read more
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Layout (unchanged) */}
            <div className="hidden md:block my-4 dark:bg-gray-950 bg-gray-50 dark:border-gray-800 border rounded-md pl-4">
              <div className="py-4 flex justify-center items-center gap-2">
                {post.featuredImg && (
                  <Image
                    className="object-contain object-center rounded-l-lg w-60"
                    src={post.featuredImg}
                    alt={post.title}
                    width={1280}
                    height={720}
                  />
                )}
                <div className="grow px-3">
                  <div className="flex flex-row mr-4 text-sm">
                    <span className="dark:text-gray-300 text-black underline">
                      {post.author.name} |{" "}
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <h2 className="text-2xl font-semibold dark:text-white text-black title-font mb-2">
                    {post.title}
                  </h2>
                  <p className="leading-relaxed dark:text-gray-300 text-black">
                    {post.excerpt ||
                      post.content.replace(/<[^>]*>?/gm, "").slice(0, 150) +
                        "..."}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
        {posts.length === 0 && (
          <div className="col-span-full text-center py-20">
            <p className="text-xl text-muted-foreground">
              {searchQuery
                ? `No blogs found matching "${searchQuery}". Try a different search term.`
                : "No posts found yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

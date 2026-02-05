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
      <h1 className="text-4xl font-bold mb-8 text-center mt-4">Latest Blogs</h1>

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

      <div className="md:container md:w-360 sm:p-4">
        {posts.map((post: PostWithAuthor) => (
          <div
            key={post.id}
            className="my-2 md:my-4 md:dark:bg-gray-950 md:bg-gray-50 dark:border-gray-800 md:border md:rounded-md md:pl-4 border-b"
          >
            <div className="">
              <div className="py-2 md:py-4 flex flex-wrap justify-center items-center md:justify-center md:items-center md:flex-nowrap gap-2">
                {post.featuredImg && (
                  <Image
                    className="object-contain w-80 sm:w-full object-center rounded-md md:rounded-l-lg md:w-60"
                    src={post.featuredImg}
                    alt={post.title}
                    width={1280}
                    height={720}
                  />
                )}
                <Link
                  href={`blog/${post.slug}`}
                  className="md:grow mx-3 md:px-3"
                >
                  <div className="flex flex-row mr-4 text-sm">
                    <span className="hidden md:block dark:text-gray-300 text-black underline ">
                      {post.author.name} |{" "}
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <h2 className="sm:text-2xl mx-4 md:mx-auto font-semibold text-xl dark:text-white text-black title-font mb-2">
                    {post.title}
                  </h2>
                  <p className="hidden md:block leading-relaxed dark:text-gray-300 text-black">
                    {post.excerpt ||
                      post.content.replace(/<[^>]*>?/gm, "").slice(0, 150) +
                        "..."}
                  </p>
                  <span className="md:hidden mx-4 dark:text-gray-300 text-black">
                    By {post.author.name}
                  </span>
                </Link>
              </div>
              {/* <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div> */}
            </div>
          </div>
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

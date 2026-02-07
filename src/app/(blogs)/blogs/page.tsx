import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { BlogSearch } from "@/components/blog/blog-search";
import { Pagination } from "@/components/ui/pagination";
import { Suspense } from "react";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

const POSTS_PER_PAGE = 10;

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

// Dynamic metadata for SEO
export async function generateMetadata({
  searchParams,
}: BlogsPageProps): Promise<Metadata> {
  const { search, page } = await searchParams;
  const currentPage = parseInt(page || "1", 10);

  const baseTitle = "Blogs - CodeBhaiya";
  const title =
    currentPage > 1 ? `${baseTitle} - Page ${currentPage}` : baseTitle;

  const description = search
    ? `Search results for "${search}" - CodeBhaiya blogs`
    : "Read the latest articles on web development, tech, and more.";

  return {
    title,
    description,
    // Pagination SEO best practice: canonical URL without page param for page 1
    alternates: {
      canonical: currentPage === 1 ? "/blogs" : `/blogs?page=${currentPage}`,
    },
  };
}

interface BlogsPageProps {
  searchParams: Promise<{ search?: string; page?: string }>;
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const { search, page } = await searchParams;
  const searchQuery = search || "";
  const requestedPage = parseInt(page || "1", 10);

  // Validate page number is a positive integer
  if (isNaN(requestedPage) || requestedPage < 1) {
    redirect("/blogs");
  }

  // Build shared where clause to avoid duplication
  const whereClause = {
    published: true,
    ...(searchQuery && {
      OR: [
        { title: { contains: searchQuery, mode: "insensitive" as const } },
        { content: { contains: searchQuery, mode: "insensitive" as const } },
        { excerpt: { contains: searchQuery, mode: "insensitive" as const } },
      ],
    }),
  };

  // Best Practice: Parallel database queries for better performance
  const [totalPosts, posts] = await Promise.all([
    prisma.post.count({ where: whereClause }),
    prisma.post.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      skip: (requestedPage - 1) * POSTS_PER_PAGE,
      take: POSTS_PER_PAGE,
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    }),
  ]);

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  // Handle invalid page numbers (e.g., page 5 when only 3 pages exist)
  if (requestedPage > totalPages && totalPages > 0) {
    redirect(
      searchQuery
        ? `/blogs?search=${searchQuery}&page=${totalPages}`
        : `/blogs?page=${totalPages}`
    );
  }

  // Ensure currentPage is valid
  const currentPage = Math.max(1, Math.min(requestedPage, totalPages || 1));

  return (
    <div className="flex flex-col justify-center items-center sm:h-full w-full min-h-screen dark:bg-background bg-white">
      <h1 className="sm:text-4xl text-2xl font-medium title-font uppercase mt-6">
        Latest Blogs
      </h1>
      <p className="font-semibold text-sm md:text-lg text-center opacity-75 mt-2 mb-4">
        Blogs are a great way to share your knowledge and experiences with
        others.
      </p>

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
          {totalPosts > 0 && (
            <span className="ml-2">
              ({totalPosts} {totalPosts === 1 ? "result" : "results"})
            </span>
          )}
        </p>
      )}

      <main className="w-full px-4 md:container md:w-360 md:p-4">
        {/* Blog Posts List */}
        <ul className="list-none p-0 m-0" role="list" aria-label="Blog posts">
          {posts.map((post: PostWithAuthor) => (
            <li key={post.id}>
              <Link href={`blog/${post.slug}`} className="block">
                {/* Mobile Card Design */}
                <article className="md:hidden mb-4">
                  <div className="bg-card dark:bg-gray-900/50 rounded-xl overflow-hidden shadow-lg border border-border/50 hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                    {post.featuredImg && (
                      <div className="relative w-full aspect-video">
                        <Image
                          className="object-cover w-full h-full"
                          src={post.featuredImg}
                          alt={`Featured image for ${post.title}`}
                          width={400}
                          height={225}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                      </div>
                    )}
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <span className="font-medium text-primary">
                          {post.author.name}
                        </span>
                        <span aria-hidden="true">•</span>
                        <time dateTime={post.createdAt.toISOString()}>
                          {new Date(post.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </time>
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
                          aria-hidden="true"
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
                </article>

                {/* Desktop Layout */}
                <article className="hidden md:block my-4 dark:bg-gray-950 bg-gray-50 dark:border-gray-800 border rounded-md pl-4">
                  <div className="py-4 flex justify-center items-center gap-2">
                    {post.featuredImg && (
                      <Image
                        className="object-contain object-center rounded-l-lg w-60"
                        src={post.featuredImg}
                        alt={`Featured image for ${post.title}`}
                        width={1280}
                        height={720}
                        loading="lazy"
                      />
                    )}
                    <div className="grow px-3">
                      <div className="flex flex-row mr-4 text-sm">
                        <span className="dark:text-gray-300 text-black underline">
                          {post.author.name} |{" "}
                          <time dateTime={post.createdAt.toISOString()}>
                            {new Date(post.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </time>
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
                </article>
              </Link>
            </li>
          ))}
        </ul>

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="col-span-full text-center py-20">
            <p className="text-xl text-muted-foreground">
              {searchQuery
                ? `No blogs found matching "${searchQuery}". Try a different search term.`
                : "No posts found yet."}
            </p>
            {searchQuery && (
              <Link
                href="/blogs"
                className="inline-block mt-4 text-primary hover:underline"
              >
                Clear search and view all blogs
              </Link>
            )}
          </div>
        )}

        {/* Pagination Component */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalPosts}
          itemsPerPage={POSTS_PER_PAGE}
          baseUrl="/blogs"
          searchParams={searchQuery ? { search: searchQuery } : {}}
        />
      </main>
    </div>
  );
}

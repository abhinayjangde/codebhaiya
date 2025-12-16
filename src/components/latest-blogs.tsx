import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

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

export default async function LatestBlogs() {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
    include: {
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="py-4 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="my-4 md:my-10 flex flex-col md:gap-2 items-center justify-center text-black dark:text-white">
          <h2 className="sm:text-4xl text-2xl font-medium title-font uppercase">
            Latest from the Blog
          </h2>
          <h6 className="font-semibold text-sm md:text-lg text-center opacity-75">
            Blogs are a great way to share your knowledge and experiences with
            others.
          </h6>
        </div>

        <div className="md:container md:w-360] sm:p-4">
          {posts.map((post: PostWithAuthor) => (
            <div
              key={post.id}
              className="my-2 border-b md:my-4 md:dark:bg-gray-950 md:bg-gray-50 dark:border-gray-800 md:border md:rounded-md md:pl-4"
            >
              <div className="">
                <div className="py-2 md:py-4 flex flex-wrap justify-center items-center md:justify-center md:items-center md:flex-nowrap gap-2">
                  {post.featuredImg && (
                    <Image
                      className="object-contain rounded-md w-80 sm:w-full object-center md:rounded-l-lg md:w-60"
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
                    <h2 className="sm:text-2xl md:text-xl md:mx-auto font-semibold text-xl dark:text-white text-black title-font mb-2">
                      {post.title}
                    </h2>
                    <p className="hidden md:block leading-relaxed dark:text-gray-300 text-black">
                      {post.excerpt ||
                        post.content.replace(/<[^>]*>?/gm, "").slice(0, 150) +
                          "..."}
                    </p>
                    <span className="md:hidden mx-1 dark:text-gray-300 text-black">
                      By {post.author.name}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
          {posts.length === 0 && (
            <div className="col-span-full text-center py-20">
              <p className="text-xl text-muted-foreground">
                No posts found yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

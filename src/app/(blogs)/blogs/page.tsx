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

export const metadata = {
  title: "Blogs - CodeBhaiya",
  description: "Read the latest articles on web development, tech, and more.",
};

export default async function BlogsPage() {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
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
      <div className="md:container md:w-[90rem] sm:p-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="my-2 md:my-4 md:dark:bg-gray-950 md:bg-gray-50 dark:border-gray-800 md:border md:rounded-md md:pl-4"
          >
            <div className="">
              <div className="py-2 md:py-4 flex flex-wrap justify-center items-center md:justify-center md:items-center md:flex-nowrap gap-2">
                {post.featuredImg && (
                  <Image
                    className="object-contain w-80 sm:w-full object-center md:rounded-l-lg md:w-60"
                    src={post.featuredImg}
                    alt={post.title}
                    width={1280}
                    height={720}
                  />
                )}
                <Link
                  href={`blog/${post.slug}`}
                  className="md:flex-grow mx-3 md:px-3"
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
            <p className="text-xl text-muted-foreground">No posts found yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

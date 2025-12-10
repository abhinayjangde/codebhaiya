import prisma from "@/lib/prisma";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

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
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight">
            Latest from the Blog
          </h2>
          <Link href="/blogs">
            <Button variant="ghost" className="gap-2">
              View all <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="md:container md:w-[90rem] sm:p-4">
          {posts.map((post: PostWithAuthor) => (
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

import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import CommentSection from "@/components/blog/comment-section";
import FloatingActionButtons from "@/components/blog/floating-action-buttons";
import CodeBlockRenderer from "@/components/blog/code-block-renderer";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineRead } from "react-icons/ai";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} - CodeBhaiya`,
    description: post.excerpt,
  };
}

// Helper function to calculate reading time
function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const textContent = content.replace(/<[^>]*>/g, ""); // Strip HTML tags
  const wordCount = textContent.split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
      likes: session?.user
        ? {
            where: {
              userId: session.user.id,
            },
          }
        : false,
    },
  });

  if (!post) {
    notFound();
  }

  // Increment view count (simple implementation, ideally should be debounced or handled separately)
  await prisma.post.update({
    where: { id: post.id },
    data: { views: { increment: 1 } },
  });

  const isLiked = post.likes.length > 0;
  const readingTime = calculateReadingTime(post.content);

  return (
    <div className="dark:bg-background py-5 bg-gray-50 md:p-4 lg:p-12">
      <div className="max-w-screen-lg mx-auto bg-white dark:bg-black/[0.3] rounded-lg shadow-md p-6 lg:p-10 z-0 relative">
        <h1 className="text-center text-xl md:text-3xl justify-center lg:text-4xl font-semibold text-gray-800 dark:text-white mb-1 flex">
          {post.title}
        </h1>

        <div className="flex pt-5 items-center mb-6 flex-col md:flex-row md:justify-start border-b pb-2">
          <div className="image flex justify-center items-center">
            <div className="h-8 w-8 mb-1 overflow-hidden rounded-full">
              <Link
                href={`/author/${post.author.id}`}
                className="block w-full h-full"
              >
                <Image
                  alt={post.author.name}
                  src={
                    post.author.image ||
                    "https://avatars.githubusercontent.com/u/64852930?v=4"
                  }
                  className="w-full h-full object-cover"
                  width={100}
                  height={100}
                />
              </Link>
            </div>
            <Link
              href={`/author/${post.author.id}`}
              className="text-sm text-slate-900 dark:text-white transition ease-in-out duration-150 mx-2"
            >
              {post.author.name}
            </Link>
          </div>
          <div className="rest flex mt-3 md:mt-0">
            <span className="mx-1 hidden font-bold dark:text-gray-400 text-slate-500 md:block">
              ·
            </span>
            <span className="text-sm dark:text-gray-400 text-gray-500 mx-2">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="mx-1 hidden font-bold dark:text-gray-400 text-slate-500 md:block">
              ·
            </span>
            <span className="text-sm dark:text-gray-400 text-gray-500 flex mx-2">
              <AiOutlineRead className="w-[1.3rem] h-[1.3rem] mr-2" />
              {readingTime}
            </span>
          </div>
        </div>

        {post.featuredImg && (
          <div className="w-full h-[400px] overflow-hidden rounded-xl mb-8">
            <Image
              src={post.featuredImg}
              alt={post.title}
              className="w-full h-full object-cover"
              width={1200}
              height={400}
            />
          </div>
        )}

        <CodeBlockRenderer htmlContent={post.content} />

        {/* Floating Action Buttons - Desktop Only */}
        <FloatingActionButtons postId={post.id} isLiked={isLiked} />
      </div>
      {/* Thank You Section */}
      <div className="dark:bg-background py-5 bg-gray-50 md:p-4">
        <div className="max-w-screen-lg mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 lg:p-10">
          <p>Thank you for reading our blog!</p>
          <p>
            We have a{" "}
            <a
              className="underline"
              href="https://discord.com/invite/CxPBRSZut7"
              target="_blank"
            >
              Discord community
            </a>{" "}
            where you can ask questions and get help from the community.
          </p>
        </div>
      </div>
      {/* Comments Section */}
      <div className="dark:bg-background py-5 bg-gray-50 md:p-4">
        <div className="max-w-screen-lg mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 lg:p-10">
          <h2 className="text-2xl font-bold mb-6">
            Comments ({post._count.comments})
          </h2>
          <CommentSection postId={post.id} />
        </div>
      </div>
    </div>
  );
}

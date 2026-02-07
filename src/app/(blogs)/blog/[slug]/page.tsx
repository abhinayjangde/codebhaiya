import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import CommentSection from "@/components/blog/comment-section";
import FloatingActionButtons from "@/components/blog/floating-action-buttons";
import CodeBlockRenderer from "@/components/blog/code-block-renderer";
import MarkdownRenderer from "@/components/blog/markdown-renderer";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineRead } from "react-icons/ai";
import BlogPostWrapper from "@/components/blog/blog-post-wrapper";
import TldrChips from "@/components/blog/tldr-chips";

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

  const isLiked = Array.isArray(post.likes) && post.likes.length > 0;
  const readingTime = calculateReadingTime(post.content);

  return (
    <div className="dark:bg-background relative flex justify-center py-3 px-2 sm:py-5 sm:px-4 bg-gray-50 md:p-4 lg:p-12 md:flex">
      <div className="w-full max-w-5xl">
        <BlogPostWrapper postId={post.id}>
          <div className="bg-white dark:bg-black rounded-lg shadow-md p-4 sm:p-6 lg:p-10 z-20 relative">
            {/* Post Title  */}
            <h1 className="text-center text-lg sm:text-xl md:text-3xl justify-center lg:text-4xl font-semibold text-gray-800 dark:text-white mb-1 flex leading-tight">
              {post.title}
            </h1>

            {/* Post Metadata Section */}

            <div className="flex pt-5 items-center mb-6 flex-col md:flex-row md:justify-start border-b pb-2">
              <div className="image flex justify-center items-center">
                <div className="h-8 w-8 mb-1 overflow-hidden rounded-full">
                  <Link
                    href={`/author/${post.author.id}`}
                    className="block w-full h-full"
                  >
                    <Image
                      alt={post.author.name}
                      src={post.author.image || "/images/avatar.png"}
                      className="w-full h-full object-cover"
                      width={100}
                      height={100}
                    />
                  </Link>
                </div>
                <Link
                  href={`/creator/${post.author.id}`}
                  className="text-sm text-slate-900 dark:text-white transition ease-in-out duration-150 mx-2"
                >
                  {post.author.name}
                </Link>
              </div>
              <div className="rest justify-center items-center flex mt-3 md:mt-0">
                <span className="mx-1 hidden font-bold dark:text-gray-400 text-slate-500 md:block">
                  ·
                </span>

                <span className="text-sm dark:text-gray-400 text-gray-500 mx-2">
                  Last Updated{" "}
                  {new Date(post.updatedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
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

            {/* TL;DR and Explain Code Chips */}
            <TldrChips postId={post.id} existingSummary={post.summary} />

            {post.video && (
              <iframe
                className="hidden md:block mt-2"
                width="940"
                height="540"
                src={post.video}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            )}

            {/* Content Rendering - Conditional based on format */}
            {post.contentFormat === "MARKDOWN" ? (
              <MarkdownRenderer content={post.content} />
            ) : (
              <CodeBlockRenderer htmlContent={post.content} />
            )}

            {/* Floating Action Buttons - Desktop sidebar + Mobile bottom bar */}
            <FloatingActionButtons
              postId={post.id}
              video={post.video}
              isLiked={isLiked}
            />
          </div>
          {/* Thank You Section */}
          <div className="dark:bg-background py-3 sm:py-5 bg-gray-50">
            <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 sm:p-6 lg:p-10">
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
          <div className="dark:bg-background py-3 sm:py-5 bg-gray-50">
            <div className="max-w-5xl mx-auto bg-white dark:bg-black rounded-lg shadow-md p-4 sm:p-6 lg:p-10">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                Comments ({post._count.comments})
              </h2>
              <CommentSection postId={post.id} />
            </div>
          </div>
        </BlogPostWrapper>
      </div>
    </div>
  );
}

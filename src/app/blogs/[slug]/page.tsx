import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Need to check if Avatar exists
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle } from "lucide-react";
import CommentSection from "@/components/blog/comment-section"; // Will create this next
import LikeButton from "@/components/blog/like-button"; // Will create this next

interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
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
            likes: session?.user ? {
                where: {
                    userId: session.user.id
                }
            } : false
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

    return (
        <div className="container mx-auto py-10 max-w-4xl">
            {post.featuredImg && (
                <div className="w-full h-[400px] overflow-hidden rounded-xl mb-8">
                    <img
                        src={post.featuredImg}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src={post.author.image || ""} />
                            <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-medium">{post.author.name}</p>
                            <p className="text-sm text-muted-foreground">
                                {new Date(post.createdAt).toLocaleDateString()} · {post.views} views
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <LikeButton postId={post.id} initialLikes={post._count.likes} initialIsLiked={isLiked} />
                    </div>
                </div>
            </div>

            <div
                className="prose prose-lg dark:prose-invert max-w-none mb-12"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="border-t pt-8">
                <h2 className="text-2xl font-bold mb-6">Comments ({post._count.comments})</h2>
                <CommentSection postId={post.id} />
            </div>
        </div>
    );
}

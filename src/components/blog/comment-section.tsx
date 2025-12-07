"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Comment {
    id: string;
    content: string;
    createdAt: string;
    author: {
        name: string;
        image: string | null;
    };
}

interface CommentSectionProps {
    postId: string;
}

export default function CommentSection({ postId }: CommentSectionProps) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetchComments();
    }, [postId]);

    const fetchComments = async () => {
        try {
            const res = await fetch(`/api/posts/${postId}/comments`);
            if (res.ok) {
                const data = await res.json();
                setComments(data);
            }
        } catch (error) {
            console.error("Failed to fetch comments", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        setIsLoading(true);
        try {
            const res = await fetch(`/api/posts/${postId}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content: newComment }),
            });

            if (res.status === 401) {
                toast.error("Please login to comment");
                router.push("/login");
                return;
            }

            if (!res.ok) {
                throw new Error("Failed to post comment");
            }

            const comment = await res.json();
            // Optimistically add comment (or just refetch)
            // Since we need author details which might not be fully in response if we just return the created comment object from prisma create
            // We'll just refetch for simplicity or append if the API returns included author
            fetchComments();
            setNewComment("");
            toast.success("Comment posted");
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <form onSubmit={handleSubmit} className="space-y-4">
                <Textarea
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    disabled={isLoading}
                />
                <div className="flex justify-end">
                    <Button type="submit" disabled={isLoading || !newComment.trim()}>
                        {isLoading ? "Posting..." : "Post Comment"}
                    </Button>
                </div>
            </form>

            <div className="space-y-6">
                {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-4">
                        <Avatar>
                            <AvatarImage src={comment.author.image || ""} />
                            <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                                <p className="font-medium text-sm">{comment.author.name}</p>
                                <p className="text-xs text-muted-foreground">
                                    {new Date(comment.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <p className="text-sm text-muted-foreground">{comment.content}</p>
                        </div>
                    </div>
                ))}
                {comments.length === 0 && (
                    <p className="text-center text-muted-foreground py-4">No comments yet. Be the first to share your thoughts!</p>
                )}
            </div>
        </div>
    );
}

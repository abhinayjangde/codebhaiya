"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface LikeButtonProps {
    postId: string;
    initialLikes: number;
    initialIsLiked: boolean;
}

export default function LikeButton({ postId, initialLikes, initialIsLiked }: LikeButtonProps) {
    const [likes, setLikes] = useState(initialLikes);
    const [isLiked, setIsLiked] = useState(initialIsLiked);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLike = async () => {
        setIsLoading(true);
        // Optimistic update
        const newIsLiked = !isLiked;
        setIsLiked(newIsLiked);
        setLikes((prev) => (newIsLiked ? prev + 1 : prev - 1));

        try {
            const res = await fetch(`/api/posts/${postId}/like`, {
                method: "POST",
            });

            if (res.status === 401) {
                toast.error("Please login to like posts");
                router.push("/login");
                // Revert
                setIsLiked(!newIsLiked);
                setLikes((prev) => (!newIsLiked ? prev + 1 : prev - 1));
                return;
            }

            if (!res.ok) {
                throw new Error("Failed to like post");
            }

            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
            // Revert
            setIsLiked(!newIsLiked);
            setLikes((prev) => (!newIsLiked ? prev + 1 : prev - 1));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button variant="ghost" size="sm" onClick={handleLike} disabled={isLoading}>
            <Heart className={`h-5 w-5 mr-1 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
            {likes}
        </Button>
    );
}

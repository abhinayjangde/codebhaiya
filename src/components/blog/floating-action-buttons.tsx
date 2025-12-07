"use client";

import { AiOutlineLike } from "react-icons/ai";
import { PiShareFat } from "react-icons/pi";
import { MdPictureAsPdf } from "react-icons/md";
import { toast } from "sonner";

interface FloatingActionButtonsProps {
  postId: string;
  isLiked: boolean;
}

export default function FloatingActionButtons({
  postId,
  isLiked,
}: FloatingActionButtonsProps) {
  const handleLike = async () => {
    try {
      const res = await fetch(`/api/posts/${postId}/like`, {
        method: "POST",
      });
      if (res.ok) {
        toast.success("Post liked!");
      }
    } catch (error) {
      toast.error("Failed to like post");
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  const handleDownloadPdf = () => {
    toast("PDF download coming soon!");
  };

  return (
    <div className="hidden md:block absolute top-0 -right-14 px-2 mx-2 bg-white text-black dark:text-white dark:bg-gray-900 rounded-lg shadow-md">
      <AiOutlineLike
        onClick={handleLike}
        title="I like this"
        className={`text-2xl my-4 cursor-pointer hover:text-blue-500 transition-colors ${
          isLiked ? "text-blue-500" : ""
        }`}
      />
      <PiShareFat
        onClick={handleShare}
        title="Share"
        className="text-2xl my-4 cursor-pointer hover:text-blue-500 transition-colors"
      />
      <MdPictureAsPdf
        onClick={handleDownloadPdf}
        title="Download PDF"
        className="text-2xl my-4 cursor-pointer hover:text-blue-500 transition-colors"
      />
    </div>
  );
}

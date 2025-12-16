"use client";

import { AiOutlineLike } from "react-icons/ai";
import { PiShareFat } from "react-icons/pi";
import { MdPictureAsPdf } from "react-icons/md";
import { PiChatTeardropBold } from "react-icons/pi";
import { toast } from "sonner";
import { useChat } from "./chat-context";
import { FaYoutube } from "react-icons/fa6";
import Link from "next/link";

interface FloatingActionButtonsProps {
  postId: string;
  isLiked: boolean;
  video: string | null;
}

export default function FloatingActionButtons({
  postId,
  isLiked,
  video,
}: FloatingActionButtonsProps) {
  // handle like count
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

  // handle share
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  // hanlde download pdf
  const handleDownloadPdf = () => {
    // TODO: i have to implement this functionality
    toast("PDF download coming soon!");
  };

  // hanlde toggle chat
  const { toggleChat } = useChat();

  const toggleChatComponent = () => {
    toggleChat();
  };
  return (
    <div className="hidden md:block absolute top-0 -right-14 px-2 mx-2 bg-white text-black dark:text-white dark:bg-gray-900 rounded-lg shadow-md">
      <PiChatTeardropBold
        onClick={toggleChatComponent}
        title="Chat with post"
        className={`text-2xl my-4 cursor-pointer hover:text-blue-500 transition-colors`}
      />
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
      {video !== null && (
        <Link href={video} target="_blank">
          <FaYoutube
            title="Watch Video"
            className="text-2xl my-4 cursor-pointer"
          />
        </Link>
      )}
    </div>
  );
}

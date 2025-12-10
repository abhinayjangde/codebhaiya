"use client";

import React from "react";
import { ChatProvider, useChat } from "./chat-context";
import ChatInterface from "./chat-interface";

interface BlogPostWrapperProps {
  children: React.ReactNode;
  postId: string;
}

function BlogPostContent({ children, postId }: BlogPostWrapperProps) {
  const { isChatOpen } = useChat();

  return (
    <>
      <div className="max-w-5xl mx-auto relative group">
        {/* Desktop Chat Interface - slides in from left */}
        <div
          className={`hidden md:block absolute top-0 w-[500px] h-[700px] bg-white dark:bg-black rounded-lg shadow-md lg:p-4 z-0 transition-all duration-700 ease-in-out ${isChatOpen ? "-left-[310px] opacity-100" : "left-0 opacity-0 -z-10"
            }`}
        >
          <ChatInterface postId={postId} />
        </div>
        <div
          className={`relative z-20 w-full transition-all duration-500 ease-in-out ${isChatOpen ? "md:translate-x-[200px]" : ""
            }`}
        >
          {children}
        </div>
      </div>

      {/* Mobile Chat Interface - Full screen overlay */}
      {isChatOpen && (
        <div className="md:hidden fixed inset-0 z-100 bg-white dark:bg-black">
          <ChatInterface postId={postId} />
        </div>
      )}
    </>
  );
}

export default function BlogPostWrapper({
  children,
  postId,
}: BlogPostWrapperProps) {
  return (
    <ChatProvider>
      <BlogPostContent postId={postId}>{children}</BlogPostContent>
    </ChatProvider>
  );
}

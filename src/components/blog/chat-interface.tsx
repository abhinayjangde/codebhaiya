"use client";

import { useChat } from "@ai-sdk/react";
import { UIMessage } from "ai";
import { useEffect, useRef, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";

interface ChatInterfaceProps {
  postId: string;
}

export default function ChatInterface({ postId }: ChatInterfaceProps) {
  const { messages, sendMessage, status } = useChat({
    api: "/api/chat",
    onError: (error: Error) => {
      console.error("Chat error:", error);
    },
  });

  const isLoading = status === "streaming" || status === "pending";
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput("");

    await sendMessage({ text: userMessage });
  };

  return (
    <div className="flex flex-col h-full text-sm">
      <div className="flex bg-black/60 dark:bg-white/20 p-4 rounded-t-lg -mx-6 -mt-6 lg:-mx-10 lg:-mt-10 mb-4 items-center justify-between">
        <h3 className="text-white font-semibold text-lg">Chat with Post</h3>
      </div>

      <div
        className="flex-1 overflow-y-auto mb-4 space-y-4 pr-1 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600"
        ref={scrollRef}
      >
        {messages.length === 0 && (
          <div className="text-center text-gray-600 dark:text-gray-300 mt-10">
            <p>Ask anything about this post!</p>
          </div>
        )}
        {messages.map((m: UIMessage) => (
          <div
            key={m.id}
            className={`flex ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] rounded-lg p-3 ${
                m.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-sm"
              }`}
            >
              {m.parts.map((part, i) => {
                if (part.type === "text") {
                  return (
                    <p key={`${m.id}-${i}`} className="whitespace-pre-wrap">
                      {part.text}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
              <span className="animate-pulse">Thinking...</span>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <input
          className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          value={input}
          placeholder="Type your question..."
          onChange={handleInputChange}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500 disabled:opacity-50 transition-colors"
        >
          <AiOutlineSend className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}

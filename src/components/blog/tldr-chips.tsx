"use client";

import { useState } from "react";
import { FiZap, FiCode, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useChat } from "./chat-context";

interface TldrChipsProps {
  postId: string;
  existingSummary?: string | null;
}

export default function TldrChips({ postId, existingSummary }: TldrChipsProps) {
  const [summary, setSummary] = useState<string | null>(
    existingSummary || null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toggleChat } = useChat();

  const handleTldrClick = async () => {
    // If summary exists, just toggle expansion
    if (summary) {
      setIsExpanded(!isExpanded);
      return;
    }

    // Fetch summary from API
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate summary");
      }

      const data = await response.json();
      setSummary(data.summary);
      setIsExpanded(true);
    } catch (err) {
      setError("Failed to generate TL;DR. Please try again.");
      console.error("TL;DR error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExplainClick = () => {
    toggleChat();
  };

  return (
    <div className="my-4">
      {/* Chips Container */}
      <div className="flex flex-wrap gap-2">
        {/* TL;DR Chip */}
        <button
          onClick={handleTldrClick}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-blue-500 to-blue-600 text-white text-sm font-medium shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiZap className="w-4 h-4" />
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Generating...
            </span>
          ) : (
            <>
              TL;DR
              {summary &&
                (isExpanded ? (
                  <FiChevronUp className="w-4 h-4" />
                ) : (
                  <FiChevronDown className="w-4 h-4" />
                ))}
            </>
          )}
        </button>

        {/* Explain this Code Chip */}
        <button
          onClick={handleExplainClick}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-purple-500 to-purple-600 text-white text-sm font-medium shadow-md hover:shadow-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200"
        >
          <FiCode className="w-4 h-4" />
          Explain this post
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Summary Content - Animated reveal */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded && summary
            ? "max-h-96 opacity-100 mt-4"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <FiZap className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                TL;DR
              </h4>
              <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                {summary}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

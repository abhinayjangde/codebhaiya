"use client";

import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import type { Components } from "react-markdown";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Add copy buttons to code blocks after render
  useEffect(() => {
    if (!containerRef.current) return;

    const preElements = containerRef.current.querySelectorAll("pre");

    preElements.forEach((pre) => {
      // Skip if already processed
      if (pre.querySelector(".copy-button")) return;

      // Get language from code element class
      const codeElement = pre.querySelector("code");
      const languageMatch = codeElement?.className.match(/language-(\w+)/);
      const language = languageMatch ? languageMatch[1] : "";

      // Style the pre element as wrapper
      pre.style.position = "relative";
      pre.classList.add("code-block-wrapper");

      // Create language label
      if (language) {
        const languageLabel = document.createElement("span");
        languageLabel.className = "language-label";
        languageLabel.textContent = language;
        pre.insertBefore(languageLabel, pre.firstChild);
      }

      // Create copy button
      const copyButton = document.createElement("button");
      copyButton.className = "copy-button";
      copyButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        <span style="margin-left: 4px">Copy</span>
      `;
      copyButton.style.display = "flex";
      copyButton.style.alignItems = "center";

      copyButton.addEventListener("click", async () => {
        const code = codeElement?.textContent || pre.textContent || "";
        try {
          await navigator.clipboard.writeText(code);
          copyButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span style="margin-left: 4px">Copied!</span>
          `;
          copyButton.classList.add("copied");

          setTimeout(() => {
            copyButton.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              <span style="margin-left: 4px">Copy</span>
            `;
            copyButton.classList.remove("copied");
          }, 2000);
        } catch (err) {
          console.error("Failed to copy:", err);
        }
      });

      pre.appendChild(copyButton);
    });
  }, [content]);

  // Custom components for ReactMarkdown
  const components: Components = {
    // Add target="_blank" to links
    a: ({ href, children, ...props }) => (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    ),
  };

  return (
    <div
      ref={containerRef}
      className="leading-relaxed text-dark dark:text-gray-100 prose prose-sm sm:prose-base md:prose-lg dark:prose-invert max-w-none prose-img:rounded-lg prose-headings:scroll-mt-20"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

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
    // Headings with explicit bold and size styling
    h1: ({ children, ...props }) => (
      <h1
        className="text-3xl sm:text-4xl font-bold mt-8 mb-4 text-foreground"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2
        className="text-2xl sm:text-3xl font-bold mt-6 mb-3 text-foreground"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3
        className="text-xl sm:text-2xl font-bold mt-5 mb-2 text-foreground"
        {...props}
      >
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4
        className="text-lg sm:text-xl font-bold mt-4 mb-2 text-foreground"
        {...props}
      >
        {children}
      </h4>
    ),
    h5: ({ children, ...props }) => (
      <h5
        className="text-base sm:text-lg font-bold mt-3 mb-1 text-foreground"
        {...props}
      >
        {children}
      </h5>
    ),
    h6: ({ children, ...props }) => (
      <h6
        className="text-sm sm:text-base font-bold mt-2 mb-1 text-foreground"
        {...props}
      >
        {children}
      </h6>
    ),
    // Paragraphs with proper spacing
    p: ({ children, ...props }) => (
      <p className="my-4 leading-7" {...props}>
        {children}
      </p>
    ),
    // Lists with proper spacing
    ul: ({ children, ...props }) => (
      <ul className="list-disc list-inside my-4 space-y-2" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="list-decimal list-inside my-4 space-y-2" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="my-1" {...props}>
        {children}
      </li>
    ),
    // Blockquotes
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="border-l-4 border-primary pl-4 my-4 italic text-muted-foreground"
        {...props}
      >
        {children}
      </blockquote>
    ),
    // Add target="_blank" to links
    a: ({ href, children, ...props }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline hover:text-primary/80"
        {...props}
      >
        {children}
      </a>
    ),
    // Strong/Bold text
    strong: ({ children, ...props }) => (
      <strong className="font-bold" {...props}>
        {children}
      </strong>
    ),
    // Emphasis/Italic text
    em: ({ children, ...props }) => (
      <em className="italic" {...props}>
        {children}
      </em>
    ),
  };

  return (
    <div
      ref={containerRef}
      className="leading-relaxed text-dark dark:text-gray-100 prose prose-sm sm:prose-base md:prose-lg dark:prose-invert max-w-none prose-img:rounded-lg prose-headings:scroll-mt-20 prose-headings:font-bold prose-h1:text-3xl sm:prose-h1:text-4xl prose-h2:text-2xl sm:prose-h2:text-3xl prose-h3:text-xl sm:prose-h3:text-2xl prose-h4:text-lg sm:prose-h4:text-xl prose-p:my-4 prose-p:leading-7 prose-li:my-1"
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

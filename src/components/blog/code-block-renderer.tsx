"use client";

import { useEffect, useRef, useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockRendererProps {
  htmlContent: string;
}

export default function CodeBlockRenderer({
  htmlContent,
}: CodeBlockRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Find all pre elements and add copy buttons
    const preElements = containerRef.current.querySelectorAll("pre");

    preElements.forEach((pre) => {
      // Skip if already processed
      if (pre.parentElement?.classList.contains("code-block-wrapper")) return;

      // Create wrapper
      const wrapper = document.createElement("div");
      wrapper.className = "code-block-wrapper";

      // Get language from code element class
      const codeElement = pre.querySelector("code");
      const languageMatch = codeElement?.className.match(/language-(\w+)/);
      const language = languageMatch ? languageMatch[1] : "";

      // Create language label
      if (language) {
        const languageLabel = document.createElement("span");
        languageLabel.className = "language-label";
        languageLabel.textContent = language;
        wrapper.appendChild(languageLabel);
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

      // Wrap the pre element
      pre.parentNode?.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);
      wrapper.appendChild(copyButton);
    });
  }, [htmlContent]);

  return (
    <div
      ref={containerRef}
      className="leading-relaxed text-dark dark:text-gray-100 prose prose-lg dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}

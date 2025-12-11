"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import MarkdownRenderer from "@/components/blog/markdown-renderer";
import {
  Bold,
  Italic,
  Link as LinkIcon,
  Image as ImageIcon,
  Code,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Eye,
  Edit3,
} from "lucide-react";

interface MarkdownEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function MarkdownEditor({
  content,
  onChange,
}: MarkdownEditorProps) {
  const [showPreview, setShowPreview] = useState(false);

  const insertMarkdown = useCallback(
    (before: string, after: string = "", placeholder: string = "") => {
      const textarea = document.getElementById(
        "markdown-textarea"
      ) as HTMLTextAreaElement;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = content.substring(start, end);
      const textToInsert = selectedText || placeholder;

      const newContent =
        content.substring(0, start) +
        before +
        textToInsert +
        after +
        content.substring(end);

      onChange(newContent);

      // Set cursor position after insertion
      setTimeout(() => {
        textarea.focus();
        const newCursorPos =
          start + before.length + textToInsert.length + after.length;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }, 0);
    },
    [content, onChange]
  );

  const toolbarButtons = [
    {
      icon: Bold,
      action: () => insertMarkdown("**", "**", "bold text"),
      title: "Bold",
    },
    {
      icon: Italic,
      action: () => insertMarkdown("*", "*", "italic text"),
      title: "Italic",
    },
    {
      icon: Code,
      action: () => insertMarkdown("`", "`", "code"),
      title: "Inline Code",
    },
    { type: "divider" },
    {
      icon: Heading1,
      action: () => insertMarkdown("# ", "", "Heading 1"),
      title: "Heading 1",
    },
    {
      icon: Heading2,
      action: () => insertMarkdown("## ", "", "Heading 2"),
      title: "Heading 2",
    },
    {
      icon: Heading3,
      action: () => insertMarkdown("### ", "", "Heading 3"),
      title: "Heading 3",
    },
    { type: "divider" },
    {
      icon: List,
      action: () => insertMarkdown("- ", "", "list item"),
      title: "Bullet List",
    },
    {
      icon: ListOrdered,
      action: () => insertMarkdown("1. ", "", "list item"),
      title: "Numbered List",
    },
    {
      icon: Quote,
      action: () => insertMarkdown("> ", "", "quote"),
      title: "Quote",
    },
    { type: "divider" },
    {
      icon: LinkIcon,
      action: () => insertMarkdown("[", "](url)", "link text"),
      title: "Link",
    },
    {
      icon: ImageIcon,
      action: () => insertMarkdown("![", "](image-url)", "alt text"),
      title: "Image",
    },
  ];

  return (
    <div className="w-full border border-input rounded-md overflow-hidden">
      {/* Toolbar */}
      <div className="bg-muted/50 border-b border-input p-2 flex flex-wrap gap-1 items-center">
        {toolbarButtons.map((button, index) =>
          button.type === "divider" ? (
            <div key={index} className="w-px h-6 bg-border mx-1" />
          ) : (
            <Button
              key={index}
              type="button"
              variant="ghost"
              size="sm"
              onClick={button.action}
              title={button.title}
              className="h-8 w-8 p-0"
            >
              {button.icon && <button.icon className="h-4 w-4" />}
            </Button>
          )
        )}

        {/* Code Block Insert */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() =>
            insertMarkdown("\n```javascript\n", "\n```\n", "// your code here")
          }
          title="Code Block"
          className="h-8 px-2 text-xs"
        >
          {"</>"}
        </Button>

        <div className="flex-grow" />

        {/* Preview Toggle */}
        <Button
          type="button"
          variant={showPreview ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setShowPreview(!showPreview)}
          className="h-8 px-3 gap-2"
        >
          {showPreview ? (
            <Edit3 className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
          {showPreview ? "Edit" : "Preview"}
        </Button>
      </div>

      {/* Editor / Preview Area */}
      <div className="min-h-[400px] bg-background">
        {showPreview ? (
          <div className="p-4 min-h-[400px]">
            <MarkdownRenderer
              content={
                content || "*No content yet. Start writing some markdown!*"
              }
            />
          </div>
        ) : (
          <textarea
            id="markdown-textarea"
            value={content}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Write your markdown content here...

# Example Heading

This is a paragraph with **bold** and *italic* text.

## Code Example

```javascript
function hello() {
  console.log('Hello, World!');
}
```

- Bullet point 1
- Bullet point 2

> A blockquote

[Link text](https://example.com)"
            className="w-full min-h-[400px] p-4 bg-background text-foreground font-mono text-sm resize-none focus:outline-none"
          />
        )}
      </div>
    </div>
  );
}

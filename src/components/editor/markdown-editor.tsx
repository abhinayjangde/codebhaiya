"use client";

import { useState, useCallback, useRef } from "react";
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
  Loader2,
  Upload,
} from "lucide-react";
import { toast } from "sonner";

interface MarkdownEditorProps {
  content: string;
  onChange: (content: string) => void;
  userId?: string;
  postId?: string;
}

export default function MarkdownEditor({
  content,
  onChange,
  userId,
  postId,
}: MarkdownEditorProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadImage = useCallback(
    async (file: File): Promise<string | null> => {
      if (!file.type.startsWith("image/")) {
        toast.error("Only image files are allowed");
        return null;
      }

      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        toast.error("File size must be less than 5MB");
        return null;
      }

      setIsUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);

        const url = postId
          ? `/api/upload/post-image?postId=${postId}`
          : `/api/upload/post-image`;

        const response = await fetch(url, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Upload failed");
        }

        const data = await response.json();
        toast.success("Image uploaded successfully");
        return data.url;
      } catch (error) {
        console.error("Upload error:", error);
        toast.error(
          error instanceof Error ? error.message : "Failed to upload image"
        );
        return null;
      } finally {
        setIsUploading(false);
      }
    },
    [postId]
  );

  const insertAtCursor = useCallback(
    (text: string) => {
      const textarea = textareaRef.current;
      if (!textarea) {
        onChange(content + text);
        return;
      }

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const newContent =
        content.substring(0, start) + text + content.substring(end);

      onChange(newContent);

      // Set cursor position after insertion
      setTimeout(() => {
        textarea.focus();
        const newCursorPos = start + text.length;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }, 0);
    },
    [content, onChange]
  );

  const insertMarkdown = useCallback(
    (before: string, after: string = "", placeholder: string = "") => {
      const textarea = textareaRef.current;
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

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer?.files;
      if (!files || files.length === 0) return;

      const imageFile = Array.from(files).find((file) =>
        file.type.startsWith("image/")
      );
      if (!imageFile) {
        toast.error("Please drop an image file");
        return;
      }

      const url = await uploadImage(imageFile);
      if (url) {
        insertAtCursor(`\n![Image](${url})\n`);
      }
    },
    [uploadImage, insertAtCursor]
  );

  const handlePaste = useCallback(
    async (e: React.ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      const imageItem = Array.from(items).find(
        (item) => item.type.indexOf("image") !== -1
      );
      if (!imageItem) return;

      const file = imageItem.getAsFile();
      if (!file) return;

      e.preventDefault();

      const url = await uploadImage(file);
      if (url) {
        insertAtCursor(`![Image](${url})`);
      }
    },
    [uploadImage, insertAtCursor]
  );

  const handleFileSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const url = await uploadImage(file);
      if (url) {
        insertAtCursor(`\n![Image](${url})\n`);
      }

      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [uploadImage, insertAtCursor]
  );

  const triggerFileUpload = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

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
      action: triggerFileUpload,
      title: "Upload Image (or drag & drop)",
      loading: isUploading,
    },
  ];

  return (
    <div
      className={`w-full border border-input rounded-md overflow-hidden relative ${isDragging ? "ring-2 ring-primary ring-offset-2" : ""}`}
    >
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
              disabled={button.loading}
            >
              {button.loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                button.icon && <button.icon className="h-4 w-4" />
              )}
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

        <div className="grow" />

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
      <div
        className="min-h-[400px] bg-background relative"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
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
            ref={textareaRef}
            id="markdown-textarea"
            value={content}
            onChange={(e) => onChange(e.target.value)}
            onPaste={handlePaste}
            placeholder="Write your markdown content here...

Drag & drop images directly into this editor, or paste from clipboard!

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

        {/* Drag overlay */}
        {isDragging && (
          <div className="absolute inset-0 bg-primary/10 border-2 border-dashed border-primary rounded-md flex items-center justify-center pointer-events-none z-10">
            <div className="bg-background/90 px-4 py-2 rounded-md shadow-lg flex items-center gap-2">
              <Upload className="h-4 w-4 text-primary" />
              <p className="text-sm font-medium text-primary">
                Drop image here to upload
              </p>
            </div>
          </div>
        )}

        {/* Upload loading overlay */}
        {isUploading && (
          <div className="absolute inset-0 bg-background/50 flex items-center justify-center rounded-md z-20">
            <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-md shadow-lg">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Uploading image...</span>
            </div>
          </div>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}

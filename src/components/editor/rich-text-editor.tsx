"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  Undo,
  Link as LinkIcon,
  Image as ImageIcon,
  Code,
  FileCode,
  Loader2,
} from "lucide-react";
import { useCallback, useState, useRef } from "react";
import { toast } from "sonner";

// Create lowlight instance with common languages
const lowlight = createLowlight(common);

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  editable?: boolean;
  userId?: string;
  postId?: string;
}

// Language selection dropdown for code blocks
const LANGUAGES = [
  { value: "", label: "Plain Text" },
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "c", label: "C" },
  { value: "cpp", label: "C++" },
  { value: "csharp", label: "C#" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
  { value: "swift", label: "Swift" },
  { value: "kotlin", label: "Kotlin" },
  { value: "sql", label: "SQL" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "json", label: "JSON" },
  { value: "yaml", label: "YAML" },
  { value: "bash", label: "Bash" },
  { value: "markdown", label: "Markdown" },
];

interface ToolbarProps {
  editor: Editor | null;
  onImageUpload: () => void;
  isUploading: boolean;
}

const Toolbar = ({ editor, onImageUpload, isUploading }: ToolbarProps) => {
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  if (!editor) {
    return null;
  }

  const addImageByUrl = useCallback(() => {
    const url = window.prompt("Image URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const insertCodeBlock = useCallback(
    (language: string) => {
      editor.chain().focus().toggleCodeBlock({ language }).run();
      setShowLanguageMenu(false);
    },
    [editor]
  );

  return (
    <div className="border border-input bg-transparent rounded-t-md p-2 flex flex-wrap gap-2 items-center">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "bg-muted" : ""}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "bg-muted" : ""}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "bg-muted" : ""}
      >
        <Strikethrough className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-border mx-1" />

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "bg-muted" : ""}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "bg-muted" : ""}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "bg-muted" : ""}
      >
        <Quote className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-border mx-1" />

      {/* Inline Code Button */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "bg-muted" : ""}
        title="Inline Code"
      >
        <Code className="h-4 w-4" />
      </Button>

      {/* Code Block Button with Language Selection */}
      <div className="relative">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setShowLanguageMenu(!showLanguageMenu)}
          className={editor.isActive("codeBlock") ? "bg-muted" : ""}
          title="Code Block"
        >
          <FileCode className="h-4 w-4" />
        </Button>

        {/* Language dropdown */}
        {showLanguageMenu && (
          <div className="absolute top-full left-0 mt-1 z-50 bg-background border border-input rounded-md shadow-lg max-h-60 overflow-y-auto w-40">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.value}
                type="button"
                onClick={() => insertCodeBlock(lang.value)}
                className="w-full text-left px-3 py-2 text-sm hover:bg-muted transition-colors"
              >
                {lang.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="w-px h-6 bg-border mx-1" />

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={setLink}
        className={editor.isActive("link") ? "bg-muted" : ""}
      >
        <LinkIcon className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onImageUpload}
        disabled={isUploading}
        title="Upload Image (or drag & drop)"
      >
        {isUploading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <ImageIcon className="h-4 w-4" />
        )}
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={addImageByUrl}
        title="Insert Image URL"
        className="text-xs px-2"
      >
        URL
      </Button>
      <div className="grow" />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <Undo className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <Redo className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default function RichTextEditor({
  content,
  onChange,
  editable = true,
  userId,
  postId,
}: RichTextEditorProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
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

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false, // Disable default code block as we use CodeBlockLowlight
      }),
      Link.configure({
        openOnClick: false,
      }),
      Image,
      Placeholder.configure({
        placeholder: "Write something amazing... (drag & drop images here)",
      }),
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: "javascript",
      }),
    ],
    content,
    editable,
    immediatelyRender: false, // Fix SSR hydration mismatch
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] p-4 border border-t-0 border-input rounded-b-md bg-background",
      },
      handleDrop: (view, event, slice, moved) => {
        if (moved) return false;

        const files = event.dataTransfer?.files;
        if (!files || files.length === 0) return false;

        const imageFile = Array.from(files).find((file) =>
          file.type.startsWith("image/")
        );
        if (!imageFile) return false;

        event.preventDefault();

        uploadImage(imageFile).then((url) => {
          if (url && editor) {
            // Get drop position
            const coordinates = view.posAtCoords({
              left: event.clientX,
              top: event.clientY,
            });

            if (coordinates) {
              editor
                .chain()
                .focus()
                .insertContentAt(coordinates.pos, {
                  type: "image",
                  attrs: { src: url },
                })
                .run();
            } else {
              editor.chain().focus().setImage({ src: url }).run();
            }
          }
        });

        return true;
      },
      handlePaste: (view, event) => {
        const items = event.clipboardData?.items;
        if (!items) return false;

        const imageItem = Array.from(items).find(
          (item) => item.type.indexOf("image") !== -1
        );
        if (!imageItem) return false;

        const file = imageItem.getAsFile();
        if (!file) return false;

        event.preventDefault();

        uploadImage(file).then((url) => {
          if (url && editor) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        });

        return true;
      },
    },
  });

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const url = await uploadImage(file);
      if (url && editor) {
        editor.chain().focus().setImage({ src: url }).run();
      }

      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [editor, uploadImage]
  );

  const triggerFileUpload = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div
      className={`w-full relative ${isDragging ? "ring-2 ring-primary ring-offset-2 rounded-md" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {editable && (
        <Toolbar
          editor={editor}
          onImageUpload={triggerFileUpload}
          isUploading={isUploading}
        />
      )}
      <EditorContent editor={editor} />

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Drag overlay */}
      {isDragging && (
        <div className="absolute inset-0 bg-primary/10 border-2 border-dashed border-primary rounded-md flex items-center justify-center pointer-events-none z-10">
          <div className="bg-background/90 px-4 py-2 rounded-md shadow-lg">
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
  );
}

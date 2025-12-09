"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RichTextEditor from "./rich-text-editor";
import MarkdownEditor from "./markdown-editor";
import { toast } from "sonner";
import { FileText, Code2 } from "lucide-react";

type EditorMode = "richtext" | "markdown";

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  featuredImg: z.string().optional(),
  tags: z.string().optional(), // Comma separated string for input
  published: z.boolean().optional(),
  contentFormat: z.enum(["HTML", "MARKDOWN"]).optional(),
});

type PostFormData = z.infer<typeof postSchema>;

interface PostEditorProps {
  initialData?: {
    id?: string;
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    featuredImg?: string;
    tags?: string[];
    published?: boolean;
    contentFormat?: "HTML" | "MARKDOWN";
  };
}

export default function PostEditor({ initialData }: PostEditorProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Determine initial editor mode based on content format
  const initialMode: EditorMode =
    initialData?.contentFormat === "MARKDOWN" ? "markdown" : "richtext";
  const [editorMode, setEditorMode] = useState<EditorMode>(initialMode);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      excerpt: initialData?.excerpt || "",
      content: initialData?.content || "",
      featuredImg: initialData?.featuredImg || "",
      tags: initialData?.tags?.join(", ") || "",
      published: initialData?.published || false,
      contentFormat: initialData?.contentFormat || "HTML",
    },
  });

  const content = watch("content");
  const title = watch("title");

  // Auto-generate slug from title if slug is empty
  const generateSlug = () => {
    const currentSlug = watch("slug");
    if (!currentSlug && title) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setValue("slug", slug);
    }
  };

  // Handle editor mode switch
  const handleModeSwitch = (mode: EditorMode) => {
    if (mode === editorMode) return;

    // Warn about content format change if there's content
    if (content && content.trim().length > 0) {
      const confirmed = window.confirm(
        mode === "markdown"
          ? "Switching to Markdown mode will clear any rich text formatting. Are you sure?"
          : "Switching to Rich Text mode may not preserve all markdown formatting. Are you sure?"
      );
      if (!confirmed) return;

      // Clear content when switching modes to avoid format conflicts
      setValue("content", "");
    }

    setEditorMode(mode);
    setValue("contentFormat", mode === "markdown" ? "MARKDOWN" : "HTML");
  };

  const onSubmit = async (data: PostFormData) => {
    setIsSubmitting(true);
    try {
      const formattedData = {
        ...data,
        tags: data.tags
          ? data.tags
              .split(",")
              .map((t) => t.trim())
              .filter((t) => t.length > 0)
          : [],
        contentFormat: editorMode === "markdown" ? "MARKDOWN" : "HTML",
      };

      console.log("Sending data:", formattedData);

      const url = initialData?.id
        ? `/api/posts/${initialData.id}`
        : "/api/posts";
      const method = initialData?.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("Server error response:", errorData);
        throw new Error(
          errorData.error ||
            errorData.details?.[0]?.message ||
            "Failed to save post"
        );
      }

      const post = await res.json();
      toast.success("Post saved successfully");
      router.push(`/blogs/${post.slug}`);
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 max-w-4xl mx-auto py-10"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          {initialData?.id ? "Edit Post" : "Create New Post"}
        </h1>
        <div className="flex gap-4">
          <Button
            type="submit"
            variant="outline"
            onClick={() => setValue("published", false)}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Draft"}
          </Button>
          <Button
            type="submit"
            onClick={() => setValue("published", true)}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            {...register("title")}
            placeholder="Post title"
            onBlur={generateSlug}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" {...register("slug")} placeholder="post-url-slug" />
          {errors.slug && (
            <p className="text-red-500 text-sm">{errors.slug.message}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Input
            id="excerpt"
            {...register("excerpt")}
            placeholder="Short description"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="featuredImg">Featured Image URL</Label>
          <Input
            id="featuredImg"
            {...register("featuredImg")}
            placeholder="https://..."
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="tags">Tags (comma separated)</Label>
          <Input
            id="tags"
            {...register("tags")}
            placeholder="react, nextjs, tutorial"
          />
        </div>

        <div className="grid gap-2">
          {/* Editor Mode Toggle */}
          <div className="flex items-center justify-between">
            <Label>Content</Label>
            <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
              <Button
                type="button"
                variant={editorMode === "richtext" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => handleModeSwitch("richtext")}
                className="gap-2 h-8"
              >
                <FileText className="h-4 w-4" />
                Rich Text
              </Button>
              <Button
                type="button"
                variant={editorMode === "markdown" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => handleModeSwitch("markdown")}
                className="gap-2 h-8"
              >
                <Code2 className="h-4 w-4" />
                Markdown
              </Button>
            </div>
          </div>

          {/* Conditional Editor Rendering */}
          {editorMode === "richtext" ? (
            <RichTextEditor
              content={content}
              onChange={(value) => setValue("content", value)}
            />
          ) : (
            <MarkdownEditor
              content={content}
              onChange={(value) => setValue("content", value)}
            />
          )}
          {errors.content && (
            <p className="text-red-500 text-sm">{errors.content.message}</p>
          )}
        </div>
      </div>
    </form>
  );
}

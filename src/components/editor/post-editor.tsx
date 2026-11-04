"use client";

import { useEffect, useRef, useState } from "react";
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
import ImageUpload from "../image-upload";
import MarkdownRenderer from "@/components/blog/markdown-renderer";
import { Textarea } from "@/components/ui/textarea";

type EditorMode = "richtext" | "markdown";

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  featuredImg: z.string().optional(),
  video: z.string().optional(),
  category: z.string().optional(),
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
    video?: string;
    category?: string;
    tags?: string[];
    published?: boolean;
    contentFormat?: "HTML" | "MARKDOWN";
  };
  userId?: string;
}

export default function PostEditor({ initialData, userId }: PostEditorProps) {
  const router = useRouter();
  const [submittingAction, setSubmittingAction] = useState<
    "draft" | "publish" | null
  >(null);

  // Determine initial editor mode based on content format
  const initialMode: EditorMode =
    initialData?.contentFormat === "MARKDOWN" ? "markdown" : "richtext";
  const [editorMode, setEditorMode] = useState<EditorMode>(initialMode);
  const [preview, setPreview] = useState(false);
  const [saveState, setSaveState] = useState("Unsaved changes");
  const [slugEdited, setSlugEdited] = useState(Boolean(initialData?.slug));
  const savedRef = useRef("");

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
      video: initialData?.video || "",
      category: initialData?.category || "",
      tags: initialData?.tags?.join(", ") || "",
      published: initialData?.published || false,
      contentFormat: initialData?.contentFormat || "HTML",
    },
  });

  const content = watch("content");
  const title = watch("title");
  const slug = watch("slug");
  const excerpt = watch("excerpt") || "";
  const snapshot = watch();
  const snapshotKey = JSON.stringify(snapshot);

  useEffect(() => {
    const draftKey = `post-draft:${initialData?.id || "new"}`;
    const timer = window.setTimeout(() => {
      try {
        localStorage.setItem(draftKey, snapshotKey);
        if (snapshotKey !== savedRef.current) setSaveState("Saved locally");
      } catch { /* Storage may be unavailable. */ }
    }, 700);
    return () => window.clearTimeout(timer);
  }, [snapshotKey, initialData?.id]);

  useEffect(() => {
    const beforeUnload = (event: BeforeUnloadEvent) => {
      if (snapshotKey !== savedRef.current && snapshotKey !== JSON.stringify(initialData || {})) {
        event.preventDefault();
        event.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", beforeUnload);
    return () => window.removeEventListener("beforeunload", beforeUnload);
  }, [snapshotKey, initialData]);

  // Auto-generate slug from title if slug is empty
  useEffect(() => {
    if (!slugEdited) {
      const generated = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setValue("slug", generated, { shouldDirty: true });
    }
  }, [title, slugEdited, setValue]);

  // Handle editor mode switch
  const handleModeSwitch = (mode: EditorMode) => {
    if (mode === editorMode) return;

    if (content.trim()) { toast.error("To avoid losing formatting, choose the current editor mode for this post."); return; }

    setEditorMode(mode);
    setValue("contentFormat", mode === "markdown" ? "MARKDOWN" : "HTML");
  };

  const onSubmit = async (data: PostFormData, action: "draft" | "publish") => {
    setSubmittingAction(action);
    try {
      const formattedData = {
        ...data,
        published: action === "publish",
        tags: data.tags
          ? data.tags
              .split(",")
              .map((t) => t.trim())
              .filter((t) => t.length > 0)
          : [],
        video: data.video || null,
        category: data.category || null,
        contentFormat: editorMode === "markdown" ? "MARKDOWN" : "HTML",
      };


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
        let errorMessage = "Failed to save post";
        try {
          const errorData = await res.json();
          console.error("Server error response:", errorData);
          errorMessage =
            errorData.error ||
            (Array.isArray(errorData.details)
              ? errorData.details[0]?.message
              : typeof errorData.details === "string"
                ? errorData.details
                : null) ||
            errorMessage;
        } catch {
          const rawText = await res.text().catch(() => "");
          console.error("Non-JSON server error response:", rawText);
          errorMessage = rawText || `Server error (${res.status})`;
        }
        throw new Error(errorMessage);
      }

      const { data: post } = await res.json();
      savedRef.current = JSON.stringify({ ...data, published: action === "publish" });
      setSaveState("Saved");
      toast.success(action === "publish" ? "Post published" : "Draft saved");
      if (action === "publish") router.push(`/blog/${post.slug}`);
      else if (!initialData?.id) router.replace(`/dashboard/creator/${post.id}/edit`);
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setSubmittingAction(null);
    }
  };

  return (
    <form
      onSubmit={(event) => { event.preventDefault(); void handleSubmit((data) => onSubmit(data, "publish"))(event); }}
      className="space-y-8 max-w-4xl mx-auto py-10"
    >
      <div className="sticky top-0 z-30 flex justify-between items-center gap-3 bg-background/95 py-3 border-b">
        <h1 className="md:text-3xl font-bold">
          {initialData?.id ? "Edit Post" : "Create New Post"}
        </h1>
        <div className="flex gap-4">
          <span className="hidden sm:inline self-center leading-none text-sm text-muted-foreground">{saveState}</span>
          <Button type="button" variant="outline" onClick={() => void handleSubmit((data) => onSubmit(data, "draft"))()}
            disabled={submittingAction !== null}
          >
            {submittingAction === "draft" ? "Saving..." : "Save Draft"}
          </Button>
          <Button type="button" onClick={() => void handleSubmit((data) => onSubmit(data, "publish"))()}
            disabled={submittingAction !== null}
          >
            {submittingAction === "publish" ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            {...register("title")}
            placeholder="Post title"
            maxLength={120}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>
        <p className="text-xs text-muted-foreground">{title.length}/120 characters</p>
        <div className="grid gap-2">
          <div className="flex justify-between"><Label htmlFor="excerpt">Short description</Label><span className="text-xs text-muted-foreground">{excerpt.length}/240</span></div>
          <Textarea id="excerpt" maxLength={240} {...register("excerpt")} placeholder="A short summary shown to readers" />
        </div>
        <div className="grid gap-2">
          <div className="flex justify-between items-center"><Label>Write your post</Label><Button type="button" variant="outline" size="sm" onClick={() => setPreview(!preview)}>{preview ? "Continue editing" : "Preview post"}</Button></div>
          {preview ? <article className="prose dark:prose-invert max-w-none rounded-md border p-6 min-h-[300px]"><h1>{title || "Untitled post"}</h1>{editorMode === "markdown" ? <MarkdownRenderer content={content} /> : <div dangerouslySetInnerHTML={{ __html: content }} />}</article> : editorMode === "richtext" ? <RichTextEditor content={content} onChange={(value) => setValue("content", value)} userId={userId} postId={initialData?.id} /> : <MarkdownEditor content={content} onChange={(value) => setValue("content", value)} userId={userId} postId={initialData?.id} />}
          {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
        </div>
        <details className="rounded-md border p-4">
          <summary className="cursor-pointer font-medium">Post details</summary>
          <div className="grid gap-4 pt-4">
        <div className="grid gap-2">
          <Label htmlFor="slug">URL slug</Label>
          <Input id="slug" {...register("slug", { onChange: () => setSlugEdited(true) })} placeholder="post-url-slug" />
          {errors.slug && <p className="text-red-500 text-sm">{errors.slug.message}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="featuredImg">Featured Image</Label>
          <ImageUpload
            value={watch("featuredImg") || ""}
            onChange={(url) => setValue("featuredImg", url)}
            onRemove={() => setValue("featuredImg", "")}
            disabled={submittingAction !== null}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="video">Video Link (YouTube/Vimeo)</Label>
          <Input
            id="video"
            {...register("video")}
            placeholder="https://youtube.com/watch?v=..."
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            {...register("category")}
            placeholder="Technology, Lifestyle, Tutorial..."
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

        <div className="flex items-center gap-2 border-t pt-4">
          <span className="text-sm text-muted-foreground">Editor:</span>
          <Button type="button" variant={editorMode === "richtext" ? "secondary" : "ghost"} size="sm" onClick={() => handleModeSwitch("richtext")}><FileText className="h-4 w-4 mr-2" />Rich Text</Button>
          <Button type="button" variant={editorMode === "markdown" ? "secondary" : "ghost"} size="sm" onClick={() => handleModeSwitch("markdown")}><Code2 className="h-4 w-4 mr-2" />Markdown</Button>
          </div>
          </div>
        </details>
      </div>
    </form>
  );
}

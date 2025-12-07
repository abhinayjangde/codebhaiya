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
import { toast } from "sonner";

const postSchema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required"),
    excerpt: z.string().optional(),
    content: z.string().min(1, "Content is required"),
    featuredImg: z.string().optional(),
    tags: z.string().optional(), // Comma separated string for input
    published: z.boolean().optional(),
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
    };
}

export default function PostEditor({ initialData }: PostEditorProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    const onSubmit = async (data: PostFormData) => {
        setIsSubmitting(true);
        try {
            const formattedData = {
                ...data,
                tags: data.tags ? data.tags.split(",").map((t) => t.trim()) : [],
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
                throw new Error("Failed to save post");
            }

            const post = await res.json();
            toast.success("Post saved successfully");
            router.push(`/blogs/${post.slug}`);
            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-4xl mx-auto py-10">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">{initialData?.id ? "Edit Post" : "Create New Post"}</h1>
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
                    {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input id="slug" {...register("slug")} placeholder="post-url-slug" />
                    {errors.slug && <p className="text-red-500 text-sm">{errors.slug.message}</p>}
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Input id="excerpt" {...register("excerpt")} placeholder="Short description" />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="featuredImg">Featured Image URL</Label>
                    <Input id="featuredImg" {...register("featuredImg")} placeholder="https://..." />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input id="tags" {...register("tags")} placeholder="react, nextjs, tutorial" />
                </div>

                <div className="grid gap-2">
                    <Label>Content</Label>
                    <RichTextEditor
                        content={content}
                        onChange={(value) => setValue("content", value)}
                    />
                    {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
                </div>
            </div>
        </form>
    );
}

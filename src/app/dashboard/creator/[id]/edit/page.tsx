import PostEditor from "@/components/editor/post-editor";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/login");
    }

    const user = session.user;
    // @ts-ignore
    if (user.role !== "CREATOR" && user.role !== "ADMIN") {
        redirect("/dashboard");
    }

    const { id } = await params;

    const post = await prisma.post.findUnique({
        where: { id },
    });

    if (!post) {
        notFound();
    }

    // @ts-ignore
    if (post.authorId !== user.id && user.role !== "ADMIN") {
        redirect("/dashboard");
    }

    return (
        <div className="container mx-auto">
            <PostEditor
                initialData={{
                    ...post,
                    tags: post.tags,
                    excerpt: post.excerpt || undefined,
                    featuredImg: post.featuredImg || undefined,
                }}
            />
        </div>
    );
}
